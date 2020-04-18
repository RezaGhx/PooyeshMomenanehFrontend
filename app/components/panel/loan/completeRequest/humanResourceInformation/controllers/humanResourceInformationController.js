humanResourceInformationController.$inject = [
  "completeRequest.humanResourceInformationServices",
  "NgTableParams",
  "$state",
  "Upload"
];

function humanResourceInformationController(
  humanResourceInformationServices,
  NgTableParams,
  state,
  upload
) {
  var self = this;

  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  self.company.directorMembers = [];

  self.uploadMember = function(file) {
    if (file.length > 0) {
      self.uploadPromise = upload
        .upload({
          url: `${apiGetWay}/legalPersons/self/employees/excel/import`,
          data: {
            formFile: file[0]
          }
        })
        .then(
          function(response) {
            getDirectorMember();
          },
          function(resp) {
            iziToast.show({
              message: resp.data.message,
              theme: "light",
              color: "red"
            });
          },
          function(evt) {
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
  const getDirectorMember = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Employees",
      page: 1,
      pageSize: 2000
    };

    self.promiseLoading = humanResourceInformationServices
      .get(query)
      .$promise.then(
        response => {
          self.company.directorMembers = response.content;
        },
        errResponse => {
          console.log("error");
        }
      );
  };

  getDirectorMember();

  self.pushToList = function(item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Employees"
      };
      humanResourceInformationServices.create(parameter, board).$promise.then(
        response => {
          getDirectorMember();
          form.$setUntouched();
          form.$setPristine();
          self.member = {};
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
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
  self.deleteItem = async function(item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Employees",
      routeParams2: item.id
    };
    await humanResourceInformationServices.remove(parameter).$promise.then(
      data => {
        self.company.directorMembers.splice(
          self.company.directorMembers.indexOf(item),
          1
        );
      },
      errResponse => {
        console.log("fail deleteItem");
      }
    );
  };

  self.goToNextStep = function() {
    state.go("panel.loan.completeRequest.licenseInformation");

    // if (self.company.directorMembers.length > 0) {
    //   state.go("panel.loan.completeRequest.licenseInformation");
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
    "completeRequest.humanResourceInformationController",
    humanResourceInformationController
  );
};
