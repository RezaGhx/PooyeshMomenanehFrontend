requestRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function requestRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.loan.request", {
            // abstract: true,
            url: "/request/:type/:leasingCustomerType",
            params: {
                type: {
                    squash: true,
                    value: "1"
                },
                leasingCustomerType: {
                    squash: true,
                    value: null
                }
            },
            controller: "panel.loan.request.indexController",
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
                                name: "panel.loan.request.indexModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.companyInformation", {
            url: "/companyInformation",

            controller: "panel.loan.request.companyInformationController",

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
                                name: "panel.loan.request.companyInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.registryInformation", {
            url: "/registryInformation",

            controller: "panel.loan.request.registryInformationController",

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
                                name: "panel.loan.request.registryInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.KnowledgeInformation", {
            url: "/KnowledgeInformation",

            controller: "panel.loan.request.KnowledgeInformationController",

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
                                name: "panel.loan.request.KnowledgeInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.uploadDocuments", {
            url: "/uploadDocuments",

            controller: "panel.loan.request.uploadDocumentsController",

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
                                name: "panel.loan.request.uploadDocumentsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.loanInformation", {
            url: "/loanInformation",

            controller: "panel.loan.request.loanInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./loanInformation/views/index.html");

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
                            let module = require("./loanInformation/loanInformation.module");

                            $ocLazyLoad.load({
                                name: "panel.loan.request.loanInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.requestInformation", {
            url: "/requestInformation",

            controller: "panel.loan.request.requestInformationController",

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
                                name: "panel.loan.request.requestInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.requestData", {
            url: "/requestData",

            controller: "panel.loan.request.requestDataController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./requestData/views/index.html");

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
                            let module = require("./requestData/requestData.module");

                            $ocLazyLoad.load({
                                name: "panel.loan.request.requestDataModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.request.directorsInformation", {
            url: "/directorsInformation",

            controller: "panel.loan.request.directorsInformationController",

            controllerAs: "self",

            templateProvider: [
                "$q",
                $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let template = require("./directorsInformation/views/index.html");

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
                            let module = require("./directorsInformation/directorsInformation.module");

                            $ocLazyLoad.load({
                                name: "panel.loan.request.directorsInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        }) /*endOfResolve*/;
}

export default requestRouting;