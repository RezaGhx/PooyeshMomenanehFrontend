loanInformationController.$inject = [
  "editRequest.loanInformationServices",
  "$stateParams",
  "dataStore",
  "$state"
];

function loanInformationController(
  loanInformationServices,
  stateParams,
  dataStore,
  state
) {
  var self = this;
  let type = stateParams.type;
  let requestId = stateParams.id;
  self.loan = {};
  // console.log(requestId);

  const getLoanInfo = async function () {
    let parameter = {
      type: "legal-persons",
      id: "self",
      routeParams: "loan-requests",
      routeParams2: requestId,
      routeParams3: "loan-request-info"
    };

    await loanInformationServices.get(parameter).$promise.then(
      response => {
        self.loan = response.content;
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("fail createYear");
      }
    );
  }

  const getLoanData = function () {
    self.loan = dataStore.getData("loanReq");
    if (!angular.equals({}, self.loan) == false) {
      getLoanInfo();
    }
  };
  getLoanData();





  self.submit = function (loan, form) {
    if (form.$valid) {
      loan.type = type;
      dataStore.setData("loanReq", loan);
      state.go("panel.loan.editRequest.uploadDocuments");
    } else {
      iziToast.show({
        message: "فرم را تکمیل کنید",
        theme: "light",
        color: "red"
      });
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "editRequest.loanInformationController",
    loanInformationController
  );
};
