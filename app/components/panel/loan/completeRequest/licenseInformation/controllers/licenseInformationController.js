licenseInformationController.$inject = [
  "completeRequest.licenseInformationServices",
  "$state",
  "$stateParams",
  "Upload"
];

function licenseInformationController(
  licenseInformationServices,
  state,
  stateParams,
  upload
) {
  var self = this;

  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  self.company.license = [];
  let type = stateParams.type;

  const getLicense = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Licenses"
    };

    self.promiseLoading = licenseInformationServices.get(query).$promise.then(
      response => {
        self.company.license = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getLicense();

  self.uploadDocumentAttachment = function (file, index) {
    if (file.length > 0) {
      upload
        .upload({
          url: apiFileManagerPost,
          data: {
            file: file
          }
        })
        .then(
          function (response) {
            console.log("Ok");
            self.member.attachment = response.data[0].fileName;
          },
          function (resp) {
            console.log("NOk");
            self.member.attachment = null;
          },
          function (evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            if (progressPercentage < 100) {
              self.loadingShow = true;
            } else {
              self.loadingShow = false;
            }
          }
        );
    }
  };
  // self.tableParams = new NgTableParams({}, {
  //   dataset: self.company.directorMembers,
  //   page: 1,
  //   count: 5,
  //   counts: []
  // });

  self.pushToList = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Licenses"
      };

      await licenseInformationServices.create(parameter, board).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          getLicense();
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

  self.deleteItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Licenses",
      routeParams2: item.id
    };
    await licenseInformationServices.remove(parameter).$promise.then(data => {
      self.company.license.splice(self.company.license.indexOf(item), 1);
    }, errResponse => {
      console.log("fail deleteItem");
    });
  }

  self.checkTypeLoan = function () {
    if (type == "WorkingCapital") {
      state.go("panel.loan.completeRequest.fundInformation");
    } else {
      state.go("panel.loan.completeRequest.historyInformation");
    }
    // if (self.company.license.length > 0) {
    //   if (type == "WorkingCapital") {
    //     state.go("panel.loan.completeRequest.fundInformation");
    //   } else {
    //     state.go("panel.loan.completeRequest.historyInformation");
    //   }
    // } else {
    //   iziToast.show({
    //     message: "فرم را تکمیل کنید.",
    //     theme: "light",
    //     color: "red"
    //   });
    // }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "completeRequest.licenseInformationController",
    licenseInformationController
  );
};
