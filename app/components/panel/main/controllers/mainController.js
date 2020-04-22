mainController.$inject = ["panel.mainServices", "$state"];

function mainController(mainServices, state) {
  var self = this;

  self.admin = {};

  const getRequestList = function () {
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

  self.goToLoan = function (currentStatus, loanId, loanType) {
    state.go("panel.loan.details", {
      type: loanType,
      id: loanId
    });
  };

  self.goAdminPanel = function () {
    if (
      self.admin.username == "admin" &&
      self.admin.password > "123456"
    ) {
      state.go("general.completeInformation.specialMemberships");
    } else {
      iziToast.show({
        message: "اطلاعات وارد شده صحیح نمیباشد",
        theme: "light",
        color: "red"
      });
    }
  };
}

module.exports = ngModule => {
  ngModule.controller("panel.mainController", mainController);
};
