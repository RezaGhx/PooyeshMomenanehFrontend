loanSuggestedBailController.$inject = ["$state", "$resource", "$scope"];

function loanSuggestedBailController(state, resource, scope) {
  var self = this;

  self.$onInit = function () {
    let loanId = self.loanId;
    let loanSuggestedBailDetailsServices = resource(
      `${apiLoan}/loan-requests/${loanId}/committee-approval`
    );

    let loanSelectedScenarioDetailsServices = resource(`${apiLoan}/loan-requests/${loanId}/suggested-bails/latest/scenario`);


    const getSelectedBail = function () {
      self.promiseLoading = loanSelectedScenarioDetailsServices
        .get({})
        .$promise.then(
          response => {
            self.selectedBail = JSON.stringify(response.content);
          },
          errResponse => {
            console.log("error");
          }
        );
    };

    const getLoanBail = function () {
      self.promiseLoading = loanSuggestedBailDetailsServices
        .get({})
        .$promise.then(
          response => {
            self.bail = response.content;
            getSelectedBail();
          },
          errResponse => {
            console.log("error");
          }
        );
    };
    getLoanBail();

    self.selectBail = function (form) {
      if (form.$valid) {
        let currentStatus = 41;
        scope.$emit("currentStatus", currentStatus);
        let selectedBail = JSON.parse(self.selectedBail);
        scope.$emit("child1", selectedBail);
      } else {
        iziToast.show({
          message: "لطفا یکی از موارد را انتخاب کنید",
          theme: "light",
          color: "red"
        });
      }
    };
  };
}

export { loanSuggestedBailController };
