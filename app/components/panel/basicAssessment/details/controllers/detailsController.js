detailsController.$inject = [
  "panel.basicAssessment.detailsServices",
  "$stateParams"
];

function detailsController(detailsServices, stateParams) {
  var self = this;
  self.requestId = stateParams.id;
  self.information = {};

  const getCurrentState = async function() {
    let parameter = {
      type: "assessment-requests",
      id: self.requestId,
      routeParams: "general-info"
    };
    await detailsServices.get(parameter).$promise.then(
      response => {
        self.requestInfo = response.content;
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("ERror MACro");
      }
    );
  };
  getCurrentState();
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.basicAssessment.detailsController",
    detailsController
  );
};
