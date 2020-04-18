detailsServices.$inject = ["$resource"];

function detailsServices($resource) {
	return $resource(
		`${apiWarranty}/:type/:id/:routeParams/:routeParams2`,
		{
			id: "@id",
			type: "@type",
			routeParams: "@routeParams",
			routeParams2: "@routeParams2",
			routeParams3: "@routeParams3"
		},
		{
			query: { method: "GET", isArray: true },
			getDirector: {
				method: "GET",
				url: `${apiGetWay}/:type/:id/:routeParams/:routeParams2`
			},

			create: {
				method: "POST"
			},
			sendDocument: {
				method: "POST",
				url: `${apiGetWay}/:type/:id/:routeParams/:routeParams2/:routeParams3`
			},

			get: { method: "GET" },

			remove: { method: "DELETE" },

			update: {
				method: "PUT"
			}
		}
	);
}

module.exports = ngModule => {
	ngModule.factory("panel.warranty.detailsServices", detailsServices);
};
