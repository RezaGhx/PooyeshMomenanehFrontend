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
        method: "POST",
          url: `${apiLoan}/:type/:id/:routeParams`
      },

      get: {
        method: "GET"
      },
      
      getLeasing: {
        method: "GET",
        url: `${apiLeasing}/:type/:id/:routeParams`
      },

      submitLeasing: {
        method: "PUT",
        url: `${apiLeasing}/:type/:id/:routeParams`
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
    "panel.loan.request.requestInformationServices",
    requestInformationServices
  );
};
