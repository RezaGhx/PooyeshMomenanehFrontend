requestInformationServices.$inject = ["$resource"];

function requestInformationServices($resource) {
  return $resource(`${apiGetWay}/:type/:id/:routeParams/:routeParams2/:routeParams3`, {
    id: '@id',
    type: '@type',
    routeParams: '@routeParams',
    routeParams2: '@routeParams2',
    routeParams3: '@routeParams3',
  },
    {
      query: {
        method: "GET",
        isArray: true
      },

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
        method: "PUT",
        url: `${apiLoan}/:type/:id/:routeParams/:routeParams2/:routeParams3`
      },
      
      getLeasing: {
        method: "GET",
        url: `${apiLeasing}/:type/:id/:routeParams`
      },

      submitLeasing: {
        method: "PATCH",
        url: `${apiLeasing}/:type/:id/:routeParams`
      },
    }
  );
}

module.exports = ngModule => {
  ngModule.factory(
    "buyerApproval.requestInformationServices",
    requestInformationServices
  );
};
