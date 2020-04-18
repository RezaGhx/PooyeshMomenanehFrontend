companyInformationController.$inject = [
  "completeRequest.companyInformationServices",
  "$state",
  "Upload"
];

function companyInformationController(companyInformationServices, state,upload) {
  var self = this;

  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  self.company.directorMembers = [];

  const getDirectorMember = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Assets"
    };

    self.promiseLoading = companyInformationServices.get(query).$promise.then(
      response => {
        self.company.directorMembers = response.content;
      },
      errResponse => {
        console.log("ERror MACro");
      }
    );
  };

  getDirectorMember();

  self.pushToList = function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Assets"
      };
      
      companyInformationServices.create(parameter, board).$promise.then(
        response => {
          getDirectorMember();
          form.$setUntouched();
          form.$setPristine();
          self.assets = {};
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
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

  self.goToNextStep = function () {
    state.go("panel.loan.completeRequest.humanResourceInformation");

    // if (self.company.directorMembers.length > 0) {
    //   state.go("panel.loan.completeRequest.directorsInformation");
    // } else {
    //   iziToast.show({
    //     message: "فرم را تکمیل کنید.",
    //     theme: "light",
    //     color: "red"
    //   });
    // }
  };

  self.deleteItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Assets",
      routeParams2: item.id
    };
    await companyInformationServices.remove(parameter).$promise.then(
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

  self.uploadDocumentAttachment = function (file) {
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
            self.assets.attachment = response.data[0].fileName;
          },
          function (resp) {
            console.log("NOk");
            self.assets.attachment = null;
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
}

module.exports = ngModule => {
  ngModule.controller(
    "completeRequest.companyInformationController",
    companyInformationController
  );
};
