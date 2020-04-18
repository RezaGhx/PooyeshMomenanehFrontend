detailsController.$inject = ["panel.archive.detailsServices", "$stateParams"];

function detailsController(detailsServices, stateParams) {
  var self = this;
  let id = stateParams.id;
  self.getDetails = function() {
    let query = {
      type: "persons",
      id: "self",
      routeParams: "archives",
      routeParams2: "warranties",
      routeParams3: id
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        self.details = response.content;
      },
      errResponse => {
        console.log("ERror MACro");
      }
    );
  };

  self.getDetails();
}

module.exports = ngModule => {
  ngModule.controller("panel.archive.detailsController", detailsController);
};
