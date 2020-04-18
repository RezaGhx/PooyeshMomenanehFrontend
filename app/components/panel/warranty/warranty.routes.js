warrantyRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function warrantyRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/warranty/index");

  $stateProvider

    .state("panel.warranty", {
      abstract: true,
      url: "/warranty",

      template: `<section id="warranty" class="my-5">
      <ui-view></ui-view>
  </section>`
    })
    .state("panel.warranty.gettingStart", {
      url: "/gettingStart",

      controller: "panel.warranty.gettingStartController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./gettingStart/views/index.html");

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
              let module = require("./gettingStart/gettingStart.module");

              $ocLazyLoad.load({
                name: "panel.warranty.gettingStartModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.warranty.details", {
      url: "/:id/details",

      controller: "panel.warranty.detailsController",

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

            require.ensure([], function() {
              let module = require("./details/details.module");

              $ocLazyLoad.load({
                name: "panel.warranty.detailsModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("panel.warranty.paymentStatus", {
      url: "/paymentStatus/:id",

      controller: "panel.warranty.paymentStatusController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./paymentStatus/views/index.html");

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
              let module = require("./paymentStatus/paymentStatus.module");

              $ocLazyLoad.load({
                name: "panel.warranty.paymentStatusModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    }) /*endOfResolve*/;
}

export default warrantyRouting;
