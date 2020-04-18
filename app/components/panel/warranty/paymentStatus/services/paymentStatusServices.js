paymentStatusServices.$inject = ["$resource"];

function paymentStatusServices($resource) {
  return $resource(
    `${apiWarranty}/:type/:id/:routeParams/:routeParams2`,
    {
      id: "@id",
      type: "@type",
      routeParams: "@routeParams",
      routeParams2: "@routeParams2"
    },
    {
      query: { method: "GET", isArray: true },

      create: { method: "POST" },

      get: { method: "GET" },

      remove: { method: "DELETE" },

      update: { method: "PUT" }
    }
  );
}

module.exports = ngModule => {
	ngModule.factory("panel.warranty.paymentStatusServices", paymentStatusServices);
};
