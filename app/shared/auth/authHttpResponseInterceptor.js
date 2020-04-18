authHttpResponseInterceptor.$inject = ["$q"];

function authHttpResponseInterceptor($q) {
	return {
		// response: function (response) {
		// 	if (response.status === 401) {
		// 		console.log("Response 401");
		// 		location.href = location.origin;
		// 	}
		// 	return response || $q.when(response);
		// },
		// responseError: function (rejection) {
		// 	if (rejection.status === 401) {
		// 		console.log("Response Error 401", rejection);
		// 		location.href = location.origin;
		// 	}
		// 	return $q.reject(rejection);
		// }
	};

}
module.exports = ngModule => {
	ngModule.factory('authHttpResponseInterceptor', authHttpResponseInterceptor);
};