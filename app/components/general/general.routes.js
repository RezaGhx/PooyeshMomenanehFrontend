generalRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function generalRouting($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("general", {
        abstract: true,
        url: "/general",
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
    });
    /*endOfResolve*/
}

export default generalRouting;