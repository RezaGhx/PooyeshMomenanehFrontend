loanRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function loanRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/loan/index");

    $stateProvider

        .state("panel.loan", {
            abstract: true,
            url: "/loan",

			controller: "panel.loan.indexController",
            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./index/views/index.html");

                            resolve(template);
                        });
                    });
                }
            ],

            resolve: {
                Lazyload: [
                    "$q",
                    "$ocLazyLoad",
                    ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();

                        require.ensure([], function () {
                            let module = require("./index/index.module");

                            $ocLazyLoad.load({
								name: "panel.loan.indexModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.gettingStart", {
            url: "/gettingStart",

			controller: "panel.loan.gettingStartController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./gettingStart/views/index.html");

                            resolve(template);
                        });
                    });
                }
            ],

            resolve: {
                Lazyload: [
                    "$q",
                    "$ocLazyLoad",
                    ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();

                        require.ensure([], function () {
                            let module = require("./gettingStart/gettingStart.module");

                            $ocLazyLoad.load({
								name: "panel.loan.gettingStartModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.details", {
            url: "/:type/:id/details",

			controller: "panel.loan.detailsController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./details/views/index.html");

                            resolve(template);
                        });
                    });
                }
            ],

            resolve: {
                Lazyload: [
                    "$q",
                    "$ocLazyLoad",
                    ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();

                        require.ensure([], function () {
                            let module = require("./details/details.module");

                            $ocLazyLoad.load({
								name: "panel.loan.detailsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        }) /*endOfResolve*/;
}

export default loanRouting;