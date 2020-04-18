profileRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function profileRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/profile/index");

  $stateProvider

    .state("panel.profile", {
      //   abstract: true,
      url: "/profile",

      template: `<section id="profile" class="my-5">
<ui-view></ui-view>
</section>`
    })
    .state("panel.profile.changePassword", {
      url: "/changePassword",

      controller: "panel.profile.changePasswordController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./changePassword/views/index.html");

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
              let module = require("./changePassword/changePassword.module");

              $ocLazyLoad.load({
                name: "panel.profile.changePasswordModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    }) /*endOfResolve*/;
}

export default profileRouting;
