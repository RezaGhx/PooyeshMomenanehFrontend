contractHistoryInformationController.$inject = [
  "completeRequest.contractHistoryInformationServices",
  "NgTableParams",
  "$state"
];

function contractHistoryInformationController(
  contractHistoryInformationServices,
  NgTableParams,
  state
) {
  var self = this;
  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  self.company.contract = [];

  const getContract = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Sales"
    };

    self.promiseLoading = contractHistoryInformationServices
      .get(query)
      .$promise.then(
        response => {
          self.company.contract= response.content;
          // self.tableParamsLoan.reload();
        },
        errResponse => {
          console.log("ERror MACro");
        }
      );
  };

  getContract();

  self.pushToList = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Sales"
      };

      await contractHistoryInformationServices
        .create(parameter, board)
        .$promise.then(
          response => {
            iziToast.show({
              message: response.message,
              theme: "light",
              color: "green"
            });
            getContract();
            form.$setUntouched();
            form.$setPristine();
            self.member = {};
            // self.tableParamsLoan.reload();
          },
          errResponse => {
            console.log("ERror MACro");
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

  self.deleteItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Sales",
      routeParams2: item.id
    };
    await contractHistoryInformationServices.remove(parameter).$promise.then(data => {
      self.company.contract.splice(self.company.contract.indexOf(item), 1);
    }, errResponse => {
      console.log("fail deleteItem");
    });
  }

  self.goToNextStep = function () {
    if (self.company.contract.length > 0) {
      state.go("panel.loan.completeRequest.uploadDocuments");
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
    "completeRequest.contractHistoryInformationController",
    contractHistoryInformationController
  );
};
