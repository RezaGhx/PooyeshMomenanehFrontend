needyAddRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function needyAddRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.needyAdd", {
            abstract: true,
            url: "/needyAdd",
            template : "<ui-view id='needyAdd'></ui-view>",
            // controller: "needyAdd.indexController",
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
        .state("panel.needyAdd.personalInfo", {
            url: "/personalInfo",

			controller: "panel.needyAdd.personalInfoController",

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
								name: "panel.needyAdd.personalInfoModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.needyAdd.needInfo", {
            url: "/needInfo",

			controller: "panel.needyAdd.needInfoController",

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
								name: "panel.needyAdd.needInfoModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        // .state("panel.needyAdd.needInfo", {
        //     url: "/needInfo",

		// 	controller: "panel.needyAdd.needInfoController",

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
		// 						name: "panel.needyAdd.needInfoModule"
        //                     });

        //                     deferred.resolve(module);
        //                 });

        //                 return deferred.promise;
        //             }
        //         ]
        //     }
        // })
        /*endOfResolve*/;
}

export default needyAddRouting;