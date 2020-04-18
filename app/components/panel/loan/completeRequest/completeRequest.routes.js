completeRequestRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function completeRequestRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/completeRequest/index");

  $stateProvider

    .state("panel.loan.completeRequest", {
      // abstract: true,
      url: "/completeRequest/:type/:id",
      params: {
        type: { squash: true, value: null },
        id: { squash: true, value: null }
      },
      controller: "completeRequest.indexController",
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

            require.ensure([], function() {
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
    .state("panel.loan.completeRequest.companyInformation", {
      url: "/companyInformation",

      controller: "completeRequest.companyInformationController",

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

            require.ensure([], function() {
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
    .state("panel.loan.completeRequest.humanResourceInformation", {
      url: "/humanResourceInformation",

      controller: "completeRequest.humanResourceInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./humanResourceInformation/views/index.html");

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
              let module = require("./humanResourceInformation/humanResourceInformation.module");

              $ocLazyLoad.load({
                name: "humanResourceInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.loan.completeRequest.historyInformation", {
      url: "/historyInformation",

      controller: "completeRequest.historyInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./historyInformation/views/index.html");

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
              let module = require("./historyInformation/historyInformation.module");

              $ocLazyLoad.load({
                name: "historyInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.loan.completeRequest.contractHistoryInformation", {
      url: "/contractHistoryInformation",

      controller: "completeRequest.contractHistoryInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./contractHistoryInformation/views/index.html");

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
              let module = require("./contractHistoryInformation/contractHistoryInformation.module");

              $ocLazyLoad.load({
                name: "contractHistoryInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.loan.completeRequest.licenseInformation", {
      url: "/licenseInformation",

      controller: "completeRequest.licenseInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./licenseInformation/views/index.html");

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
              let module = require("./licenseInformation/licenseInformation.module");

              $ocLazyLoad.load({
                name: "licenseInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.loan.completeRequest.uploadDocuments", {
      url: "/uploadDocuments",

      controller: "completeRequest.uploadDocumentsController",

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

            require.ensure([], function() {
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
    .state("panel.loan.completeRequest.fundInformation", {
      url: "/fundInformation",

      controller: "completeRequest.fundInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./fundInformation/views/index.html");

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
              let module = require("./fundInformation/fundInformation.module");

              $ocLazyLoad.load({
                name: "fundInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    }) /*endOfResolve*/;
}

export default completeRequestRouting;
