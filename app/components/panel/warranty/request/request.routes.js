requestRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function requestRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.warranty.request", {
            // abstract: true,
            url: "/request/:type",
            params: {
                type: { squash: true, value: null }
            },
			controller: "panel.warranty.request.indexController",
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
								name: "panel.warranty.request.indexModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.companyInformation", {
            url: "/companyInformation",

			controller: "panel.warranty.request.companyInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./companyInformation/views/index.html");

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
                            let module = require("./companyInformation/companyInformation.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.companyInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.registryInformation", {
            url: "/registryInformation",

			controller: "panel.warranty.request.registryInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./registryInformation/views/index.html");

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
                            let module = require("./registryInformation/registryInformation.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.registryInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.KnowledgeInformation", {
            url: "/KnowledgeInformation",

			controller: "panel.warranty.request.KnowledgeInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./KnowledgeInformation/views/index.html");

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
                            let module = require("./KnowledgeInformation/KnowledgeInformation.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.KnowledgeInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.uploadDocuments", {
            url: "/uploadDocuments",

			controller: "panel.warranty.request.uploadDocumentsController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./uploadDocuments/views/index.html");

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
                            let module = require("./uploadDocuments/uploadDocuments.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.uploadDocumentsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.warrantyInformation", {
            url: "/warrantyInformation",

			controller: "panel.warranty.request.warrantyInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./warrantyInformation/views/index.html");

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
                            let module = require("./warrantyInformation/warrantyInformation.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.warrantyInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.warranty.request.requestInformation", {
            url: "/requestInformation",

			controller: "panel.warranty.request.requestInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./requestInformation/views/index.html");

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
                            let module = require("./requestInformation/requestInformation.module");

                            $ocLazyLoad.load({
								name: "panel.warranty.request.requestInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })   /*endOfResolve*/;
}

export default requestRouting;