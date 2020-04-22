needyRegisterRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function needyRegisterRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.needyRegister", {
            abstract: true,
            url: "/needyRegister",
            template : "<ui-view id='needyRegister'></ui-view>",
            // controller: "needyRegister.indexController",
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
        .state("panel.needyRegister.personalInfo", {
            url: "/personalInfo",

			controller: "panel.needyRegister.personalInfoController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./personalInfo/views/index.html");

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
                            let module = require("./personalInfo/personalInfo.module");

                            $ocLazyLoad.load({
								name: "panel.needyRegister.personalInfoModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.needyRegister.needInfo", {
            url: "/needInfo",

			controller: "panel.needyRegister.needInfoController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./needInfo/views/index.html");

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
                            let module = require("./needInfo/needInfo.module");

                            $ocLazyLoad.load({
								name: "panel.needyRegister.needInfoModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        // .state("panel.needyRegister.needInfo", {
        //     url: "/needInfo",

		// 	controller: "panel.needyRegister.needInfoController",

        //     controllerAs: "self",

        //     templateProvider: [
        //         "$q",
        //         $q => {
        //             return $q(resolve => {
        //                 require.ensure([], () => {
        //                     let template = require("./needInfo/views/index.html");

        //                     resolve(template);
        //                 });
        //             });
        //         }
        //     ],

        //     resolve: {
        //         Lazyload: [
        //             "$q",
        //             "$ocLazyLoad",
        //             ($q, $ocLazyLoad) => {
        //                 let deferred = $q.defer();

        //                 require.ensure([], function () {
        //                     let module = require("./needInfo/needInfo.module");

        //                     $ocLazyLoad.load({
		// 						name: "panel.needyRegister.needInfoModule"
        //                     });

        //                     deferred.resolve(module);
        //                 });

        //                 return deferred.promise;
        //             }
        //         ]
        //     }
        // })
        .state("panel.needyRegister.verification", {
            url: "/verification",

			controller: "panel.needyRegister.verificationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./verification/views/index.html");

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
                            let module = require("./verification/verification.module");

                            $ocLazyLoad.load({
								name: "panel.needyRegister.verificationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        }) /*endOfResolve*/;
}

export default needyRegisterRouting;