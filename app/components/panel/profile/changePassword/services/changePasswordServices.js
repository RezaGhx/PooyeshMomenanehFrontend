changePasswordServices.$inject = ["$resource"];

function changePasswordServices($resource) {

	return $resource(`${apiSecurity}:type/:id/:routeParams/:state`, { id: '@id', type: '@type', routeParams: '@routeParams', state: '@state' }, {

		query: { method: "GET", isArray: true },

		create: { method: "POST" },

		get: { method: "GET" },

		remove: { method: "DELETE" },

		update: { method: "PUT" }

	});

}

module.exports = ngModule => {

	ngModule.factory('panel.profile.changePasswordServices', changePasswordServices);

};