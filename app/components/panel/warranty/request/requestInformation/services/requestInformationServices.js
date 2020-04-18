requestInformationServices.$inject = ["$resource"];

function requestInformationServices($resource) {
  return $resource(
    `${apiGetWay}/:type/:id/:routeParams`,
    {
      id: "@id",
      type: "@type",
      routeParams: "@routeParams"
    },
    {
      query: {
        method: "GET",
        isArray: true
      },

      create: {
        method: "POST"
      },
      createWarranty: {
        method: "POST",
        url: `${apiWarranty}/warrantyRequests`
      },

      get: {
        method: "GET"
      },

      remove: {
        method: "DELETE"
      },

      update: {
        method: "PUT"
      }
    }
  );
}

module.exports = ngModule => {
  ngModule.factory(
    "panel.warranty.request.requestInformationServices",
    requestInformationServices
  );
};
