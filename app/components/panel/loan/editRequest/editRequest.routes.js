requestRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function requestRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/request/index");

    $stateProvider

        .state("panel.loan.editRequest", {
            // abstract: true,
            url: "/editRequest/:type/:id",
            params: {
                type: { squash: true, value: null },
                id: { squash: true, value: null }
            },
            controller: "editRequest.indexController",
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
        .state("panel.loan.editRequest.companyInformation", {
            url: "/companyInformation",

            controller: "editRequest.companyInformationController",

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
        .state("panel.loan.editRequest.registryInformation", {
            url: "/registryInformation",

            controller: "editRequest.registryInformationController",

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
        .state("panel.loan.editRequest.KnowledgeInformation", {
            url: "/KnowledgeInformation",

            controller: "editRequest.KnowledgeInformationController",

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
        .state("panel.loan.editRequest.uploadDocuments", {
            url: "/uploadDocuments",

            controller: "editRequest.uploadDocumentsController",

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
        .state("panel.loan.editRequest.loanInformation", {
            url: "/loanInformation",

            controller: "editRequest.loanInformationController",

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
                                name: "loanInformationModule"
                            });

                            deferred.resolve(module);
                        });

                        return deferred.promise;
                    }
                ]
            }
        })
        .state("panel.loan.editRequest.requestInformation", {
            url: "/requestInformation",

            controller: "editRequest.requestInformationController",

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
        .state("panel.loan.editRequest.requestData", {
            url: "/requestData",

            controller: "editRequest.requestDataController",

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
        .state("panel.loan.editRequest.directorsInformation", {
            url: "/directorsInformation",
      
            controller: "editRequest.directorsInformationController",
      
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