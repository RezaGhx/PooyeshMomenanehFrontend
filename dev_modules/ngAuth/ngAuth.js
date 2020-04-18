"use strict";

var CryptoJS = require("crypto-js");
(function () {
  var _0x57df = ["U29vcmFuLkNv"];
  (function (_0xac2abd, _0x34e58a) {
    var _0x4b2302 = function (_0x25c116) {
      while (--_0x25c116) {
        _0xac2abd["push"](_0xac2abd["shift"]());
      }
    };
    _0x4b2302(++_0x34e58a);
  })(_0x57df, 0x156);
  var _0x4237 = function (_0x47331b, _0x1d465e) {
    _0x47331b = _0x47331b - 0x0;
    var _0x45da0c = _0x57df[_0x47331b];
    if (_0x4237["RAdqGQ"] === undefined) {
      (function () {
        var _0x2fa0bc = function () {
          var _0x8340db;
          try {
            _0x8340db = Function(
              "return\x20(function()\x20" +
              "{}.constructor(\x22return\x20this\x22)(\x20)" +
              ");"
            )();
          } catch (_0xda2140) {
            _0x8340db = window;
          }
          return _0x8340db;
        };
        var _0x7ab2c3 = _0x2fa0bc();
        var _0x112f9b =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        _0x7ab2c3["atob"] ||
          (_0x7ab2c3["atob"] = function (_0x26b59e) {
            var _0x1d5ed8 = String(_0x26b59e)["replace"](/=+$/, "");
            for (
              var _0x317e6c = 0x0,
              _0xfdb98e,
              _0xd16f54,
              _0x401802 = 0x0,
              _0x9843 = "";
              (_0xd16f54 = _0x1d5ed8["charAt"](_0x401802++));
              ~_0xd16f54 &&
                ((_0xfdb98e =
                  _0x317e6c % 0x4 ? _0xfdb98e * 0x40 + _0xd16f54 : _0xd16f54),
                  _0x317e6c++ % 0x4)
                ? (_0x9843 += String["fromCharCode"](
                  0xff & (_0xfdb98e >> ((-0x2 * _0x317e6c) & 0x6))
                ))
                : 0x0
            ) {
              _0xd16f54 = _0x112f9b["indexOf"](_0xd16f54);
            }
            return _0x9843;
          });
      })();
      _0x4237["xLczGn"] = function (_0x24efcc) {
        var _0x3b0320 = atob(_0x24efcc);
        var _0x334499 = [];
        for (
          var _0x380680 = 0x0, _0x529161 = _0x3b0320["length"];
          _0x380680 < _0x529161;
          _0x380680++
        ) {
          _0x334499 +=
            "%" +
            ("00" + _0x3b0320["charCodeAt"](_0x380680)["toString"](0x10))[
              "slice"
            ](-0x2);
        }
        return decodeURIComponent(_0x334499);
      };
      _0x4237["FnIztu"] = {};
      _0x4237["RAdqGQ"] = !![];
    }
    var _0x41bdf3 = _0x4237["FnIztu"][_0x47331b];
    if (_0x41bdf3 === undefined) {
      _0x45da0c = _0x4237["xLczGn"](_0x45da0c);
      _0x4237["FnIztu"][_0x47331b] = _0x45da0c;
    } else {
      _0x45da0c = _0x41bdf3;
    }
    return _0x45da0c;
  };
  const SECRETKEY = _0x4237("0x0");

  var ngAuth = angular.module("ngAuth", [
    "permission",
    "permission.ui",
    "ngCookies",
    "ui.router"
  ]);

  ngAuth.config([
    "$httpProvider",
    "$stateProvider",
    function ($httpProvider, $stateProvider) {
      console.debug("ng-auth: callback routes registered.");
    }
  ]);

  ngAuth.service("authService", [
    "$cookies",
    "PermPermissionStore",
    "$urlRouter",
    "$state",
    "$timeout",
    function ($cookies, PermPermissionStore, urlRouter, $state, $timeout) {
      var service = this;

      service.uiRouterSync = function () {
        // Once permissions are set-up
        // kick-off router and start the application rendering
        urlRouter.sync();
        // Also enable router to listen to url changes
        urlRouter.listen();
      };

      //After SignIn And SignOut Action Handler 
      service.signHandler = function (signAction, target) {
        if (signAction == "state") {
          $timeout(function () {
            $state.go(target);
          }, 500);
        }
        else if (signAction == "href") {
          location.href = target;
        }
        else {
          throw new Error(
            "signAction in config have a problem"
          );
        }
      };

      service.pageStateNameHandler = function (action, roles, config) {
        if (roles) {

          let userRoles = roles.split(",");
          let allRoles = config.roles;

          if (userRoles.length == 1) {
            let userRole = {};
            for (let i = 0; i < allRoles.length; i++) {
              if (userRoles[i] != null) {
                userRole = allRoles.find(
                  state => state.roleName === userRoles[i]
                );
              }
            }
            if (action == "signIn") {
              service.signHandler(config.signAction, userRole.afterSignIn)
            } else if (action == "logOut") {
              service.signHandler(config.signAction, userRole.afterLogOut)
            } else {
              throw new Error(
                "pageStateNameHandler need one action for input function"
              );
            }
          } else if (userRoles.length >= 1) {

            let multiRole = allRoles.find(
              state => state.roleName === "multiRole"
            );
            if (action == "signIn") {
              service.signHandler(config.signAction, multiRole.afterSignIn)
            } else if (action == "logOut") {
              service.signHandler(config.signAction, multiRole.afterLogOut)
            } else {
              throw new Error(
                "pageStateNameHandler need one action for input function"
              );
            }
          } else {
            let defaultState = allRoles.find(
              state => state.roleName === "defaultState"
            );
            if (action == "signIn") {
              service.signHandler(config.signAction, defaultState.afterSignIn)
            } else if (action == "logOut") {
              service.signHandler(config.signAction, defaultState.afterLogOut)
            } else {
              throw new Error(
                "pageStateNameHandler need one action for input function"
              );
            }
          }
        }
      };

      service.permissionHandler = function (action) {
        PermPermissionStore.clearStore();
        if (action == "signIn") {
          let authData = service.getAuthData();
          let userRoles = authData.roles;
          var permissions = ["authorized", userRoles];
          PermPermissionStore.defineManyPermissions(
            permissions,
            /*@ngInject*/ function (permissionName) {
              return permissions.includes(permissionName);
            }
          );
        } else if (action == "logOut") {
          PermPermissionStore.definePermission("anonymous", function () {
            return true;
          });
        } else {
          throw new Error(
            "permissionHandler need one action for input function"
          );
        }
      };

      service.saveAuthData = function (authData) {
        let rawAuthData = authData;
        var encryptAuthData = CryptoJS.AES.encrypt(
          JSON.stringify(rawAuthData),
          SECRETKEY
        ).toString();
        let expires_in = rawAuthData.expires_in;
        let date = new Date();
        date.setTime(date.getTime() + expires_in * 1000);
        let expires = date.toGMTString();
        $cookies.putObject("authData", encryptAuthData, {
          expires: expires
        });
      };

      service.hasValidToken = function () {
        var authData = service.getAuthData();
        if (!authData) return false;

        var now = Date.now();
        // var issuedAtMSec = claims.iat * 1000;
        var expiresAtMSec = new Date().getTime() + authData.expires_in * 1000;
        // var marginMSec = 1000 * 60 * 5; // 5 Minutes

        // Substract margin, because browser time could be a bit in the past
        // if (issuedAtMSec - marginMSec > now) {
        //     console.log('oidc-connect: Token is not yet valid!')
        //     return false
        // }

        if (expiresAtMSec < now) {

          return false;
        }


        return true;
      };

      service.notAuthorized = function (authData, config) {
        let allRoles = config.roles;
        if (!authData) {
          let afterLogOut = allRoles.find(
            state => state.roleName === "defaultState"
          ).afterLogOut;
          return afterLogOut;
        }
        if (authData.roles) {

          let userRoles = authData.roles.split(",");

          if (userRoles.length == 1) {
            let userRole = {};
            for (let i = 0; i < allRoles.length; i++) {
              if (userRoles[i] != null) {
                userRole = allRoles.find(
                  state => state.roleName === userRoles[i]
                );
              }
            }
            return userRole.afterSignIn;
          }
          else if (userRoles.length >= 1) {
            let multiRole = allRoles.find(
              state => state.roleName === "multiRole"
            );
            return multiRole.afterSignIn;
          } else {
            throw new Error(
              "User Not Any Role"
            );
          }
        }
      };

      service.getAuthData = function () {
        let authData = $cookies.getObject("authData");
        if (authData) {
          var bytesAuthData = CryptoJS.AES.decrypt(authData, SECRETKEY);
          var decryptedAuthData = JSON.parse(
            bytesAuthData.toString(CryptoJS.enc.Utf8)
          );
          return decryptedAuthData;
        } else {
          return false;
        }
      };

      service.clearAuthData = function () {
        $cookies.remove("authData");
      };
    }
  ]);

  ngAuth.provider("$auth", [
    "$stateProvider",
    function ($stateProvider) {
      // Default configuration
      var config = {
        withPermission: false,
        signAction: "state",
        roles: null
      };

      return {
        // Service configuration
        configure: function (params) {
          angular.extend(config, params);
        },

        // Service itself
        $get: [
          "$q",
          "authService",
          function ($q, authService) {
            if (!config.roles || !Array.isArray(config.roles)) {
              throw new Error(
                "roles is a required field and should be is Array."
              );
            }

            var init = function () {
              let authData = authService.getAuthData();
              if (authData) {
                if (config.withPermission) {
                  authService.permissionHandler("signIn");
                  authService.uiRouterSync();
                }
              } else {
                startLogout();
              }
            };

            var startSignIn = function (authData) {
              authService.saveAuthData(authData);
              if (config.withPermission) {
                authService.permissionHandler("signIn");
                authService.uiRouterSync();
              }
              authService.pageStateNameHandler(
                "signIn",
                authData.roles,
                config
              );
            };

            var startLogout = function () {
              let authData = authService.getAuthData();
              authService.clearAuthData();
              if (config.withPermission) {
                authService.permissionHandler("logOut");
                authService.uiRouterSync();
              }
              authService.pageStateNameHandler("logOut", authData.roles, config);
            };

            var updateRole = function (newRoleName) {
              let authData = authService.getAuthData();
              authData.roles = newRoleName;
              authService.saveAuthData(authData);
              authService.permissionHandler("signIn");
              authService.uiRouterSync();
              authService.pageStateNameHandler(
                "signIn",
                authData.roles,
                config
              );
            };

            var notAuthorized = function () {
              let authData = authService.getAuthData();
              return authService.notAuthorized(authData, config);
            };

            init();

            return {
              config: config,

              isAuthenticated: function () {
                return authService.hasValidToken();
              },

              notAuthorized: function () {
                return notAuthorized();
              },

              signIn: function (authData) {
                startSignIn(authData);
              },

              logOut: function () {
                startLogout();
              },

              user: function () {
                return authService.getAuthData();
              },

              updateRole: function (newRoleName) {
                if (!newRoleName) {
                  throw new Error(
                    "newRoleName is a required field For updateRole()"
                  );
                }
                else {
                  updateRole(newRoleName);
                }
              }
            };
          }
        ]
      };
    }
  ]);
})();
