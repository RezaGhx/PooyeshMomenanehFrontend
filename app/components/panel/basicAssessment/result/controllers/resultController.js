resultController.$inject = ["panel.basicAssessment.resultServices", "$state"];

function resultController(resultServices, state) {
  var self = this;

  self.BasicAssessmentResult = {};

  const getBasicAssessmentResult = async function() {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "initial-assessment"
    };
    await resultServices.get(parameter).$promise.then(
      response => {
        self.basicAssessmentResult = response.content;
      },
      errResponse => {
        state.go("panel.basicAssessment.request");
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("ERror MACro");
      }
    );
  };
  getBasicAssessmentResult();
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.basicAssessment.resultController",
    resultController
  );
};
