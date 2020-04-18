archiveRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function archiveRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.archive", {
            abstract: true,
            url: "/archive",
            template : "<ui-view id='archive'></ui-view>",
            // controller: "archive.indexController",
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
        .state("panel.archive.list", {
            url: "/list",

			controller: "panel.archive.listController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./list/views/index.html");

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
                            let module = require("./list/list.module");

                            $ocLazyLoad.load({
								name: "panel.archive.listModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.archive.details", {
            url: "/:id/details",

			controller: "panel.archive.detailsController",

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
								name: "panel.archive.detailsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })  /*endOfResolve*/;
}

export default archiveRouting;