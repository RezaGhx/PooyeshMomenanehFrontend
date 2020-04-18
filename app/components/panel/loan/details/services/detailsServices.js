detailsServices.$inject = ["$resource"];

function detailsServices($resource) {

  return $resource(
    `${apiLoan}/:type/:id/:routeParams/:routeParams2/:routeParams3`,
    {
      id: "@id",
      type: "@type",
      routeParams: "@routeParams",
      routeParams2: "@routeParams2",
      routeParams2: "@routeParams3"
    },
    {
      query: { method: "GET", isArray: true },

      create: {
        method: "POST"
      },

      get: {
        method: "GET"
      },

      remove: {
        method: "DELETE"
      },

      update: {
        method: "PUT"
      },
      
      getLeasing: {
        method: "GET",
        url: `${apiLeasing}/:type/:id/:routeParams`
      },

      submitLeasing: {
        method: "PUT",
        url: `${apiLeasing}/:type/:id/:routeParams`
      },
    }
  );
}

module.exports = ngModule => {

  ngModule.factory('panel.loan.detailsServices', detailsServices);

};