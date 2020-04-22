needyListRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function needyListRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.needyList", {
            abstract: true,
            url: "/needyList",
            template : "<ui-view id='needyList'></ui-view>",
            // controller: "needyList.indexController",
            // controllerAs: "self",

            // templateProvider: [
            //     "$q",
            //     $q => {
            //         return $q(resolve => {
            //             require.ensure([], () => {
            //                 let template = require("./index/views/index.html");

            //                 resolve(template);
            //             });
            //         });
            //     }
            // ],

            // resolve: {
            //     Lazyload: [
            //         "$q",
            //         "$ocLazyLoad",
            //         ($q, $ocLazyLoad) => {
            //             let deferred = $q.defer();

            //             require.ensure([], function () {
            //                 let module = require("./index/index.module");

            //                 $ocLazyLoad.load({
            //                     name: "indexModule"
            //                 });

            //                 deferred.resolve(module);
            //             });

            //             return deferred.promise;
            //         }
            //     ]
            // }
        })
        .state("panel.needyList.dashboard", {
            url: "/dashboard",

			controller: "panel.needyList.dashboardController",

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
								name: "panel.needyList.dashboardModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        }) /*endOfResolve*/;
}

export default needyListRouting;