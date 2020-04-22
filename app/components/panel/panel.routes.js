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
		})
		// .state("panel.jahadiRegister", {
		// 	url: "/jahadiRegister",

		// 	controller: "panel.jahadiRegisterController",

		// 	controllerAs: "self",

		// 	templateProvider: [
		// 		"$q",
		// 		$q => {
		// 			return $q(resolve => {
		// 				require.ensure([], () => {
		// 					let template = require("./jahadiRegister/views/index.html");

		// 					resolve(template);
		// 				});
		// 			});
		// 		}
		// 	],

		// 	resolve: {
		// 		Lazyload: [
		// 			"$q",
		// 			"$ocLazyLoad",
		// 			($q, $ocLazyLoad) => {
		// 				let deferred = $q.defer();

		// 				require.ensure([], function () {
		// 					let module = require("./jahadiRegister/jahadiRegister.module");

		// 					$ocLazyLoad.load({
		// 						name: "jahadiRegisterModule"
		// 					});

		// 					deferred.resolve(module);
		// 				});

		// 				return deferred.promise;
		// 			}
		// 		]
		// 	}
		// })
		// .state("panel.needyList", {
		// 	url: "/needyList",

		// 	controller: "panel.needyListController",

		// 	controllerAs: "self",

		// 	templateProvider: [
		// 		"$q",
		// 		$q => {
		// 			return $q(resolve => {
		// 				require.ensure([], () => {
		// 					let template = require("./needyList/views/index.html");

		// 					resolve(template);
		// 				});
		// 			});
		// 		}
		// 	],

		// 	resolve: {
		// 		Lazyload: [
		// 			"$q",
		// 			"$ocLazyLoad",
		// 			($q, $ocLazyLoad) => {
		// 				let deferred = $q.defer();

		// 				require.ensure([], function () {
		// 					let module = require("./needyList/needyList.module");

		// 					$ocLazyLoad.load({
		// 						name: "needyListModule"
		// 					});

		// 					deferred.resolve(module);
		// 				});

		// 				return deferred.promise;
		// 			}
		// 		]
		// 	}
		// })
		// .state("panel.needyRegister", {
		// 	url: "/needyRegister",

		// 	controller: "panel.needyRegisterController",

		// 	controllerAs: "self",

		// 	templateProvider: [
		// 		"$q",
		// 		$q => {
		// 			return $q(resolve => {
		// 				require.ensure([], () => {
		// 					let template = require("./needyRegister/views/index.html");

		// 					resolve(template);
		// 				});
		// 			});
		// 		}
		// 	],

		// 	resolve: {
		// 		Lazyload: [
		// 			"$q",
		// 			"$ocLazyLoad",
		// 			($q, $ocLazyLoad) => {
		// 				let deferred = $q.defer();

		// 				require.ensure([], function () {
		// 					let module = require("./needyRegister/needyRegister.module");

		// 					$ocLazyLoad.load({
		// 						name: "needyRegisterModule"
		// 					});

		// 					deferred.resolve(module);
		// 				});

		// 				return deferred.promise;
		// 			}
		// 		]
		// 	}
		// }) /*endOfResolve*/;
}

export default panelRouting;
