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
		.state("panel.dashboard", {
			url: "/dashboard",

			controller: "panel.dashboardController",

			controllerAs: "self",

			templateProvider: [
				"$q",
				$q => {
					return $q(resolve => {
						require.ensure([], () => {
							let template = require("./dashboard/views/index.html");

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
							let module = require("./dashboard/dashboard.module");

							$ocLazyLoad.load({
								name: "dashboardModule"
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
