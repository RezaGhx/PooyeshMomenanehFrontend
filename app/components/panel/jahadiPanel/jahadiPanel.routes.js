jahadiPanelRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function jahadiPanelRouting($urlRouterProvider, $stateProvider) {
    // $urlRouterProvider.otherwise("/jahadiPanel/index");

    $stateProvider

        .state("panel.jahadiPanel", {
            abstract: true,
            // url: "/jahadiPanel",
            // template : "<ui-view id='jahadiPanel'></ui-view>",
            controller: "panel.IndexController",
			controllerAs: "self",
            // controller: "jahadiPanel.indexController",
            // controllerAs: "self",

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
                                name: "indexModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.jahadiPanel.dashboard", {
            url: "/jahadiPanel/dashboard",

			controller: "panel.jahadiPanel.dashboardController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./dashboard/views/index.html");

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
                            let module = require("./dashboard/dashboard.module");

                            $ocLazyLoad.load({
								name: "panel.jahadiPanel.dashboardModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        }) /*endOfResolve*/;
}

export default jahadiPanelRouting;