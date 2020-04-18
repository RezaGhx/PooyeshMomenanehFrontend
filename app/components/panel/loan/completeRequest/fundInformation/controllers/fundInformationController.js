fundInformationController.$inject = [
  "completeRequest.fundInformationServices",
  "$state"
];

function fundInformationController(fundInformationServices, state) {
  var self = this;
  self.company = {};

  const getFinanceInfo = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "finance-info"
    };

    self.promiseLoading = fundInformationServices.get(query).$promise.then(
      response => {
        self.company = response.content;
        if (self.company.totalDebtsFromCurrentLoans == 0) {
          self.company.totalDebtsFromCurrentLoans = null;
        }
        if (self.company.totalWarrantiesAmount == 0) {
          self.company.totalWarrantiesAmount = null;
        }
        if (self.company.totalLoansAmount == 0) {
          self.company.totalLoansAmount = null;
        }
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getFinanceInfo();

  self.submit = async function(company, form) {
    if (form.$valid) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "finance-info"
      };

      await fundInformationServices.update(parameter, company).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          form.$setUntouched();
          form.$setPristine();
          state.go("panel.loan.completeRequest.historyInformation");
        },
        errResponse => {
          console.log("error");
        }
      );
    } else {
      iziToast.show({
        message: "فرم را تکمیل کنید.",
        theme: "light",
        color: "red"
      });
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "completeRequest.fundInformationController",
    fundInformationController
  );
};
