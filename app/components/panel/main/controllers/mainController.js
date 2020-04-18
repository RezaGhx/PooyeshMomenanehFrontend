mainController.$inject = ["panel.mainServices", "$state"];

function mainController(mainServices, state) {
  var self = this;

  const getRequestList = function() {
    let query = {
      type: "legal-person",
      id: "self",
      routeParams: "customer-services-report"
      // routeParams: "inprogress-services"
    };
    self.promiseLoading = mainServices.get(query).$promise.then(
      response => {
        self.request = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };
  // console.log(self.request)
  getRequestList();

  self.goToLoan = function(currentStatus, loanId, loanType) {
    state.go("panel.loan.details", {
      type: loanType,
      id: loanId
    });
  };
}

module.exports = ngModule => {
  ngModule.controller("panel.mainController", mainController);
};
