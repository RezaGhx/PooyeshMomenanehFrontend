completeInformationRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function completeInformationRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("general.completeInformation", {
      abstract: true,
      url: "/completeInformation",

      template: `<section id="completeInformation" class="d-flex justify-content-center">
             <main class="main-content text-center col-12 col-sm-9 col-md-6">
              <div class="guides">
                 <a class="level" ui-sref="general.completeInformation.logoUpload" ui-sref-active="active">
            1
                 </a>
                  <a class="level mx-3" ui-sref="general.completeInformation.furtherInformation" ui-sref-active="active">
            2
                   </a>
                 <a class="level" ui-sref="general.completeInformation.specialMemberships" ui-sref-active="active">
            3
                        </a>
                       </div>
             <ui-view></ui-view>
           </main>
      </section>`
    })
    .state("general.completeInformation.logoUpload", {
      url: "/logoUpload",

      controller: "general.completeInformation.logoUploadController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./logoUpload/views/index.html");

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
              let module = require("./logoUpload/logoUpload.module");

              $ocLazyLoad.load({
                name: "logoUploadModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("general.completeInformation.furtherInformation", {
      url: "/furtherInformation",

      controller: "general.completeInformation.furtherInformationController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./furtherInformation/views/index.html");

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
              let module = require("./furtherInformation/furtherInformation.module");

              $ocLazyLoad.load({
                name: "furtherInformationModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    })
    .state("general.completeInformation.specialMemberships", {
      url: "/specialMemberships",

      controller: "general.completeInformation.specialMembershipsController",

      controllerAs: "self",

      templateProvider: [
        "$q",
        $q => {
          return $q(resolve => {
            require.ensure([], () => {
              let template = require("./specialMemberships/views/index.html");

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
              let module = require("./specialMemberships/specialMemberships.module");

              $ocLazyLoad.load({
                name: "specialMembershipsModule"
              });

              deferred.resolve(module);
            });

            return deferred.promise;
          }
        ]
      }
    }) /*endOfResolve*/;
}

export default completeInformationRouting;
