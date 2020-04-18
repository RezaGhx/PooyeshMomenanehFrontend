uploadDocumentsServices.$inject = ["$resource"];

function uploadDocumentsServices($resource) {
  return $resource(
    `${apiGetWay}/:type/:id/:routeParams/:routeParams2/:routeParams3`,
    {
      id: "@id",
      type: "@type",
      routeParams: "@routeParams",
      routeParams2: "@routeParams2",
      routeParams3: "@routeParams3"
    },
    {
      query: { method: "GET", isArray: true },

      create: { method: "POST" },

      get: { method: "GET" },

      remove: { method: "DELETE" },

      update: { method: "PUT" },
      sendRequest: {
        method: "PUT",
        url: `${apiLoan}/legal-persons/self/loan-requests/:id/complete-information`
      }
    }
  );
}

module.exports = ngModule => {
  ngModule.factory("buyerApproval.uploadDocumentsServices", uploadDocumentsServices);
};
