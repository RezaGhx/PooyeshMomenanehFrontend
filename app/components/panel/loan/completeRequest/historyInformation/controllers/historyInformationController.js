historyInformationController.$inject = [
  "completeRequest.historyInformationServices",
  "$state",
  "$auth",
  "$stateParams"
];

function historyInformationController(historyInformationServices, state, auth, stateParams) {
  var self = this;

  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  self.company.legalPersonId = auth.user().id;
  self.company.warranty = [];
  self.company.loan = [];

  // self.tableParamsLoan = new NgTableParams(
  //   {},
  //   {
  //     dataset: self.company.loan,
  //     page: 1,
  //     count: 5,
  //     counts: []
  //   }
  // );
  // self.tableParamsWarranty = new NgTableParams(
  //   {},
  //   {
  //     dataset: self.company.warranty,
  //     page: 1,
  //     count: 5,
  //     counts: []
  //   }
  // );

  const getLoan = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Received-loans"
    };

    self.promiseLoading = historyInformationServices.get(query).$promise.then(
      response => {
        self.company.loan = response.content;
        // self.tableParamsLoan.reload();
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getLoan();

  const getWarranty = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "ReceivedWarranties"
    };

    self.promiseLoading = historyInformationServices.get(query).$promise.then(
      response => {
        self.company.warranty = response.content;
        // self.tableParams.reload();
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getWarranty();

  self.pushToListLoan = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Received-loans"
      };

      await historyInformationServices.create(parameter, board).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          self.company.loan.push(board);
          form.$setUntouched();
          form.$setPristine();
          self.member = {};
          // self.tableParamsLoan.reload();
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
  self.deleteLoanItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Received-loans",
      routeParams2: item.id
    };
    await historyInformationServices.remove(parameter).$promise.then(data => {
      self.company.loan.splice(self.company.loan.indexOf(item), 1);
    }, errResponse => {
      console.log("fail deleteItem");
    });
  }
  self.pushToListWarranty = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "ReceivedWarranties"
      };

      await historyInformationServices.create(parameter, board).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          self.company.warranty.push(board);
          form.$setUntouched();
          form.$setPristine();
          self.warranty = {};
          // self.tableParamsLoan.reload();
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
  self.deleteWarrantyItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "ReceivedWarranties",
      routeParams2: item.id
    };
    await historyInformationServices.remove(parameter).$promise.then(data => {
      self.company.warranty.splice(self.company.warranty.indexOf(item), 1);
    }, errResponse => {
      console.log("fail deleteItem");
    });
  }

  let type = stateParams.type;
  self.goToBackStep = function () {
    if (type == "WorkingCapital") {
      state.go("panel.loan.completeRequest.fundInformation");
    }
    else {
      state.go("panel.loan.completeRequest.licenseInformation");
    }
  };
  self.goToNextStep = function () {
    state.go("panel.loan.completeRequest.contractHistoryInformation");
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "completeRequest.historyInformationController",
    historyInformationController
  );
};
