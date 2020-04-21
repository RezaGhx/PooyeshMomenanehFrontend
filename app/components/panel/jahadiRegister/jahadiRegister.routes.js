jahadiRegisterRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function jahadiRegisterRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.jahadiRegister", {
            abstract: true,
            url: "/jahadiRegister",
            template : "<ui-view id='jahadiRegister'></ui-view>",
            // controller: "jahadiRegister.indexController",
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
        .state("panel.jahadiRegister.list", {
            url: "/list",

			controller: "panel.jahadiRegister.listController",

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
								name: "panel.jahadiRegister.listModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.jahadiRegister.new", {
            url: "/new",

			controller: "panel.jahadiRegister.newController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./new/views/index.html");

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
                            let module = require("./new/new.module");

                            $ocLazyLoad.load({
								name: "panel.jahadiRegister.newModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.jahadiRegister.details", {
            url: "/:id/details",

			controller: "panel.jahadiRegister.detailsController",

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
								name: "panel.jahadiRegister.detailsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })  /*endOfResolve*/;
}

export default jahadiRegisterRouting;