'use strict';

(function () {

    var eventPrefix = 'oidcauth:';

    var unauthorizedEvent = eventPrefix + 'unauthorized';
    var tokenExpiredEvent = eventPrefix + 'tokenExpired';
    var tokenMissingEvent = eventPrefix + 'tokenMissing';
    var tokenExpiresSoonEvent = eventPrefix + 'tokenExpires';

    var loggedInEvent = eventPrefix + 'loggedIn';
    var loggedOutEvent = eventPrefix + 'loggedOut';

    var silentRefreshStartedEvent = eventPrefix + 'silentRefreshStarted';
    var silentRefreshSuceededEvent = eventPrefix + 'silentRefreshSucceded';
    var silentRefreshFailedEvent = eventPrefix + 'silentRefreshFailed';
    var silentRefreshTimeoutEvent = eventPrefix + 'silentRefreshTimeout';

    // Module registrarion
    var oidcmodule = angular.module('oidc-angular', ['base64', 'ngCookies', 'ui.router']);

    oidcmodule.config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {

        // Register callback route
        $stateProvider.
            state("auth",
                {
                    abstract: true,
                    url: "/auth",
                    template: "<ui-view id='auth'></ui-view>"
                }).
            state("auth.callback", {
                url: "/callback/{data}",
                template: '',
                controller: ['$auth', '$stateParams', function ($auth, $stateParams) {
                    console.debug('oidc-angular: handling login-callback');
                    $auth.handleSignInCallback($stateParams.data);
                }]
            }).
            state("auth.clear", {
                url: "/clear",
                template: '',
                controller: ['$auth', function ($auth) {
                    console.debug('oidc-angular: handling logout-callback');
                    $auth.handleSignOutCallback();
                }]
            });

        console.debug('oidc-angular: callback routes registered.')
    }]);


    oidcmodule.service('tokenService', ['$base64', '$cookies', function ($base64, $cookies) {

        var service = this;

        var sanitize = function (base64data) {

            // Pad lenght to comply with the standard
            while (base64data.length % 4 !== 0) {
                base64data += "=";
            }

            // convert to base64 from base64url
            base64data = base64data.replace('_', '/');
            base64data = base64data.replace('-', '+');

            return base64data;
        };

        service.getPayloadFromRawToken = function (raw) {
            var tokenParts = raw.split(".");
            return tokenParts[1];
        };

        service.deserializeClaims = function (raw) {
            var claimsBase64 = sanitize(raw);
            var claimsJson = decodeURIComponent(escape($base64.decode(claimsBase64)));
            var claims = JSON.parse(claimsJson);
            return claims;
        };

        service.convertToClaims = function (id_token) {
            var payload = service.getPayloadFromRawToken(id_token);
            var claims = service.deserializeClaims(payload);
            return claims;
        };

        service.saveToken = function (id_token, access_token) {
            var idClaims = service.convertToClaims(id_token);
            $cookies.putObject('accessToken', access_token, { expires: new Date(idClaims.exp * 1000) });
            $cookies.putObject('idToken', id_token, { expires: new Date(idClaims.exp * 1000) });
            $cookies.putObject('cached-claims', idClaims, { expires: new Date(idClaims.exp * 1000) });
        };

        service.hasToken = function () {

            var claims = service.allClaims();

            if (!(claims && claims.hasOwnProperty("iat") && claims.hasOwnProperty('exp'))) {
                return false;
            }

            return true;
        };

        service.hasValidToken = function () {
            if (!this.hasToken()) return false;

            var claims = service.allClaims();

            var now = Date.now();
            var issuedAtMSec = claims.iat * 1000;
            var expiresAtMSec = claims.exp * 1000;
            var marginMSec = 1000 * 60 * 5; // 5 Minutes

            // Substract margin, because browser time could be a bit in the past
            if (issuedAtMSec - marginMSec > now) {
                console.log('oidc-connect: Token is not yet valid!')
                return false
            }

            if (expiresAtMSec < now) {
                console.log('oidc-connect: Token has expired!')
                return false;
            }

            return true;
        }

        service.allClaims = function () {
            var cachedClaims = $cookies.getObject('cached-claims');
            if (!cachedClaims) {
                var id_token = service.getIdToken();

                if (id_token) {
                    var claims = service.convertToClaims(id_token);

                    var idClaims = service.convertToClaims(id_token);
                    $cookies.putObject('cached-claims', idClaims);

                    return claims;
                }
            }

            return cachedClaims;
        };

        service.getIdToken = function () {
            return $cookies.getObject('idToken');
        };

        service.clearTokens = function () {
            $cookies.remove('cached-claims');
            $cookies.remove('idToken');
            $cookies.remove('accessToken');
        }
    }]);

    oidcmodule.provider("$auth", ['$stateProvider', function ($stateProvider) {

        // Default configuration
        var config = {
            basePath: null,
            clientId: null,
            apiUrl: '/api/',
            responseType: 'id_token',
            scope: "openid profile",
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + window.location.pathname + '#!/auth/callback/',
            logoutUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + window.location.pathname + '#!/auth/clear',
            state: "",
            authorizationEndpoint: 'connect/authorize',
            revocationEndpoint: 'connect/revocation',
            endSessionEndpoint: 'connect/endsession',
            advanceRefresh: 300,
            enableRequestChecks: false,
            stickToLastKnownIdp: false
        };

        return {

            // Service configuration
            configure: function (params) {
                angular.extend(config, params);
            },

            // Service itself
            $get: ['$q', '$document', '$rootScope', '$cookies', '$location', 'tokenService', function ($q, $document, $rootScope, $cookies, $location, tokenService) {

                var init = function () {

                    if ($cookies.getObject('logoutActive')) {
                        $cookies.remove('logoutActive');

                        tokenService.clearTokens();
                    }

                    if ($cookies.getObject('refreshRunning')) {
                        $cookies.remove('refreshRunning');
                    }
                };

                var createLoginUrl = function (nonce, state) {

                    var hasPathDelimiter = config.basePath.endsWith('/');
                    var appendChar = (hasPathDelimiter) ? '' : '/';

                    var currentClaims = tokenService.allClaims();
                    if (currentClaims) {
                        var idpClaimValue = currentClaims["idp"];
                    }

                    var baseUrl = config.basePath + appendChar;
                    var url = baseUrl + config.authorizationEndpoint
                        + "?response_type="
                        + encodeURIComponent(config.responseType)
                        + "&client_id="
                        + encodeURIComponent(config.clientId)
                        + "&state="
                        + encodeURIComponent(state || config.state)
                        + "&redirect_uri="
                        + encodeURIComponent(config.redirectUri)
                        + "&scope="
                        + encodeURIComponent(config.scope)
                        + "&nonce="
                        + encodeURIComponent(nonce);

                    if (config.stickToLastKnownIdp && idpClaimValue) {
                        url = url + "&acr_values="
                            + encodeURIComponent("idp:" + idpClaimValue);
                    }

                    return url;
                };

                var createLoginUrlTo = function (nonce, destinationConfig) {

                    var hasPathDelimiter = config.basePath.endsWith('/');
                    var appendChar = (hasPathDelimiter) ? '' : '/';

                    var currentClaims = tokenService.allClaims();
                    if (currentClaims) {
                        var idpClaimValue = currentClaims["idp"];
                    }

                    var baseUrl = config.basePath + appendChar;
                    var url = baseUrl + config.authorizationEndpoint
                        + "?response_type="
                        + encodeURIComponent(destinationConfig.responseType)
                        + "&client_id="
                        + encodeURIComponent(destinationConfig.clientId)
                        + "&state="
                        + encodeURIComponent("" || destinationConfig.state)
                        + "&redirect_uri="
                        + encodeURIComponent(destinationConfig.redirectUri)
                        + "&scope="
                        + encodeURIComponent(destinationConfig.scope)
                        + "&nonce="
                        + encodeURIComponent(nonce);

                    if (config.stickToLastKnownIdp && idpClaimValue) {
                        url = url + "&acr_values="
                            + encodeURIComponent("idp:" + idpClaimValue);
                    }

                    return url;
                };

                var createLogoutUrl = function (signOutUrl) {

                    var idToken = tokenService.getIdToken();

                    var hasPathDelimiter = config.basePath.endsWith('/');
                    var appendChar = (hasPathDelimiter) ? '' : '/';

                    var baseUrl = config.basePath + appendChar;
                    var url = baseUrl + config.endSessionEndpoint
                        + "?id_token_hint="
                        + encodeURIComponent(idToken)
                        + "&post_logout_redirect_uri="
                        + encodeURIComponent(signOutUrl || config.logoutUri)
                        + "&state="
                        + encodeURIComponent(config.state)
                        + "&r=" + Math.random();
                    return url;
                }

                var startImplicitFlow = function (localRedirect) {

                    $cookies.putObject('localRedirect', localRedirect);

                    var url = createLoginUrl(random());
                    window.location.replace(url);
                };

                var startImplicitFlowTo = function (config) {
                    var url = createLoginUrlTo(random(), config);
                    window.location.replace(url);
                };

                var startLogout = function (signOutUrl) {
                    var url = createLogoutUrl(signOutUrl);
                    $cookies.putObject('logoutActive', true);
                    window.location.replace(url);
                };


                var startSelfLogout = function (logoutUri) {
                    window.location.replace(logoutUri);
                };

                var handleImplicitFlowCallback = function (id_token, access_token) {

                    tokenService.saveToken(id_token, access_token);

                    var localRedirect = $cookies.getObject('localRedirect');

                    if (localRedirect) {
                        var redirectTo = localRedirect.hash.substring(1);
                        $cookies.remove('localRedirect');

                        $location.path(redirectTo);
                    }
                    else {
                        $location.path('/');
                    }

                    $rootScope.$broadcast(loggedInEvent);
                    return true;
                };

                var handleSilentRefreshCallback = function (newIdToken, newAccessToken) {

                    $cookies.remove('refreshRunning');

                    var currentIdToken = tokenService.getIdToken();
                    var currentClaims = tokenService.allClaims();

                    var newClaims = tokenService.convertToClaims(newIdToken)

                    if (currentClaims.exp && newClaims.exp && newClaims.exp > currentClaims.exp) {

                        tokenService.saveToken(newIdToken, newAccessToken);

                        $rootScope.$broadcast(silentRefreshSuceededEvent);
                    }
                    else {
                        $rootScope.$broadcast(silentRefreshFailedEvent);
                    }
                };

                var trySilentRefresh = function () {

                    if ($cookies.getObject('refreshRunning')) {
                        return;
                    }

                    $cookies.putObject('refreshRunning', true);

                    $rootScope.$broadcast(silentRefreshStartedEvent);

                    var url = createLoginUrl(random(), 'refresh');

                    var html = "<iframe src='" + url + "' height='400' width='100%' id='oauthFrame' style='display:none;visibility:hidden;'></iframe>";
                    var elem = angular.element(html);

                    $document.find("body").append(elem);

                    setTimeout(function () {

                        if ($cookies.getObject('refreshRunning')) {
                            $rootScope.$broadcast(silentRefreshTimeoutEvent);
                            $cookies.remove('refreshRunning');
                        }

                        $document.find("#oauthFrame").remove();
                    }, 5000);
                };


                var handleSignInCallback = function (data) {

                    if (!data && window.location.hash.indexOf("#") === 0) {
                        data = window.location.hash.substr(16)
                    }

                    var fragments = {}
                    if (data) {
                        fragments = parseQueryString(data);
                    }
                    else {
                        throw Error("Unable to process callback. No data given!");
                    }

                    console.debug("oidc-angular: Processing callback information", data);

                    var access_token = fragments['access_token'];
                    var id_token = fragments['id_token'];
                    var state = fragments['state'];

                    if (access_token) {
                        if (state === 'refresh') {
                            handleSilentRefreshCallback(id_token, access_token);
                        }
                        else {
                            handleImplicitFlowCallback(id_token, access_token);
                        }
                    }
                };

                var handleSignOutCallback = function () {

                    $cookies.remove('logoutActive');

                    tokenService.clearTokens();

                    $location.path('/');

                    $rootScope.$broadcast(loggedOutEvent);
                };

                var tokenIsValidAt = function (date) {
                    var claims = tokenService.allClaims();

                    var expiresAtMSec = claims.exp * 1000;

                    if (date <= expiresAtMSec) {
                        return true;
                    }

                    return false;
                }

                var validateExpirity = function () {
                    if (!tokenService.hasToken()) return;
                    if (!tokenService.hasValidToken()) return;

                    var now = Date.now();

                    if (!tokenIsValidAt(now + config.advanceRefresh)) {
                        $rootScope.$broadcast(tokenExpiresSoonEvent);
                        trySilentRefresh();
                    }
                };

                init();

                return {
                    config: config,

                    handleSignInCallback: handleSignInCallback,

                    handleSignOutCallback: handleSignOutCallback,

                    validateExpirity: validateExpirity,

                    isAuthenticated: function () {
                        return tokenService.hasValidToken();
                    },

                    isAuthenticatedIn: function (milliseconds) {
                        return tokenService.hasValidToken() && tokenIsValidAt(new Date().getTime() + milliseconds);
                    },

                    signIn: function (localRedirect) {
                        startImplicitFlow(localRedirect);
                    },

                    signInTo: function (config) {
                        startImplicitFlowTo(config);
                    },

                    signOut: function () {
                        startLogout();
                    },

                    signOutTo: function (signOutUrl) {
                        startLogout(signOutUrl);
                    },


                    logOut: function (logoutUri) {
                        startSelfLogout(logoutUri);
                    },

                    silentRefresh: function () {
                        trySilentRefresh();
                    }

                };
            }]
        };
    }]);

    /* Helpers & Polyfills */
    function parseQueryString(queryString) {
        var data = {}, pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

        if (queryString === null) {
            return data;
        }

        pairs = queryString.split("&");

        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf("=");

            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            } else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }

            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);

            if (key.substr(0, 1) === '/')
                key = key.substr(1);

            data[key] = value;
        }

        return data;
    };

    /* Random Nonce */
    function random() {
        var guidHolder = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
        var hex = '0123456789abcdef';
        var r = 0;
        var guidResponse = "";
        for (var i = 0; i < guidHolder.length; i++) {
            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                // each x and y needs to be random
                r = Math.random() * 16 | 0;
            }

            if (guidHolder[i] === 'x') {
                guidResponse += hex[r];
            } else if (guidHolder[i] === 'y') {
                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                r |= 0x8; // set pos 3 to 1 as 1???
                guidResponse += hex[r];
            } else {
                guidResponse += guidHolder[i];
            }
        }
        return guidResponse;
    }

    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        };
    }

})();






!function(){"use strict";angular.module("base64",[]).constant("$base64",function(){var r="=",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function n(r,n){var e=t.indexOf(r.charAt(n));if(-1==e)throw"Cannot decode base64";return e}function e(r,t){var n=r.charCodeAt(t);if(n>255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";return n}return{encode:function(n){if(1!=arguments.length)throw"SyntaxError: Not enough arguments";var a,h,o=[],c=(n=""+n).length-n.length%3;if(0==n.length)return n;for(a=0;a<c;a+=3)h=e(n,a)<<16|e(n,a+1)<<8|e(n,a+2),o.push(t.charAt(h>>18)),o.push(t.charAt(h>>12&63)),o.push(t.charAt(h>>6&63)),o.push(t.charAt(63&h));switch(n.length-c){case 1:h=e(n,a)<<16,o.push(t.charAt(h>>18)+t.charAt(h>>12&63)+r+r);break;case 2:h=e(n,a)<<16|e(n,a+1)<<8,o.push(t.charAt(h>>18)+t.charAt(h>>12&63)+t.charAt(h>>6&63)+r)}return o.join("")},decode:function(t){var e,a,h,o=(t=""+t).length;if(0==o)return t;if(o%4!=0)throw"Cannot decode base64";e=0,t.charAt(o-1)==r&&(e=1,t.charAt(o-2)==r&&(e=2),o-=4);var c=[];for(a=0;a<o;a+=4)h=n(t,a)<<18|n(t,a+1)<<12|n(t,a+2)<<6|n(t,a+3),c.push(String.fromCharCode(h>>16,h>>8&255,255&h));switch(e){case 1:h=n(t,a)<<18|n(t,a+1)<<12|n(t,a+2)<<6,c.push(String.fromCharCode(h>>16,h>>8&255));break;case 2:h=n(t,a)<<18|n(t,a+1)<<12,c.push(String.fromCharCode(h>>16))}return c.join("")}}}())}();