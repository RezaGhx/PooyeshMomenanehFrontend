requestRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function requestRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.loan.buyerApproval", {
            // abstract: true,
            url: "/buyerApproval/:type/:id",
            params: {
                type: { squash: true, value: null },
                id: { squash: true, value: null }
            },
            controller: "buyerApproval.indexController",
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
                                name: "indexModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.buyerApproval.companyInformation", {
            url: "/companyInformation",

            controller: "buyerApproval.companyInformationController",

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
                                name: "companyInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.buyerApproval.registryInformation", {
            url: "/registryInformation",

            controller: "buyerApproval.registryInformationController",

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
                                name: "registryInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.buyerApproval.KnowledgeInformation", {
            url: "/KnowledgeInformation",

            controller: "buyerApproval.KnowledgeInformationController",

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
                                name: "KnowledgeInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.buyerApproval.uploadDocuments", {
            url: "/uploadDocuments",

            controller: "buyerApproval.uploadDocumentsController",

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
                                name: "uploadDocumentsModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.buyerApproval.requestInformation", {
            url: "/requestInformation",

            controller: "buyerApproval.requestInformationController",

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
                                name: "requestInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })  
        .state("panel.loan.buyerApproval.requestData", {
            url: "/requestData",

            controller: "buyerApproval.requestDataController",

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
                                name: "requestDataModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })  
        .state("panel.loan.buyerApproval.directorsInformation", {
            url: "/directorsInformation",
      
            controller: "buyerApproval.directorsInformationController",
      
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
      
                  require.ensure([], function() {
                    let module = require("./directorsInformation/directorsInformation.module");
      
                    $ocLazyLoad.load({
                      name: "directorsInformationModule"
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