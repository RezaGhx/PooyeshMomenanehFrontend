notificationRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function notificationRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/notification/index");

  $stateProvider

    .state("panel.notification", {
      //   abstract: true,
      url: "/notification",

      template: `<section id="notification" class="my-5">
<ui-view></ui-view>
</section>`
    })
    .state("panel.notification.list", {
      url: "/list",

      controller: "panel.notification.listController",

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

            require.ensure([], function() {
              let module = require("./list/list.module");

              $ocLazyLoad.load({
                name: "panel.notification.listModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    }) /*endOfResolve*/;
}

export default notificationRouting;
