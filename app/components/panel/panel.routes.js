panelRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function panelRouting($urlRouterProvider, $stateProvider) {
	//   $urlRouterProvider.otherwise("/panel");

	$stateProvider
		.state("panel", {
			abstract: true,
			// url: "/panel",
			controller: "panel.IndexController",
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
							let module = require("./index/Index.module");

							$ocLazyLoad.load({
								name: "IndexModule"
							});

							deferred.resolve(module);
						});

						return deferred.promise;
					}
				]
			}
		})
		.state("panel.main", {
			url: "/main",

			controller: "panel.mainController",

			controllerAs: "self",

			templateProvider: [
				"$q",
				$q => {
					return $q(resolve => {
						require.ensure([], () => {
							let template = require("./main/views/index.html");

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
							let module = require("./main/main.module");

							$ocLazyLoad.load({
								name: "mainModule"
							});

							deferred.resolve(module);
						});

						return deferred.promise;
					}
				]
			}
		}) /*endOfResolve*/;
}

export default panelRouting;
