let logo = require("../../../images/sandogh_logo.svg");

logoUploadController.$inject = [
  "general.completeInformation.logoUploadServices",
  "Upload",
  "$state",
  "$auth",
  "$scope"
];

function logoUploadController(logoUploadServices, upload, state, auth, scope) {
  var self = this;

  self.information = {};
  // self.download = apiFileManagerGet + "/?id=";
  const logo = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "logo"
    };
    self.promiseLoading = logoUploadServices.get(query).$promise.then(
      response => {
        self.information.logoFile = response.content;
      },
      errResponse => {}
    );
  };

  logo();

  self.uploadLogo = function(file) {
    if (file.length > 0) {
      upload
        .upload({
          url: apiFileManagerPost,
          data: {
            file: file
          }
        })
        .then(
          function(response) {
            self.information.logoId = response.data[0].fileName;
          },
          function(resp) {
            self.information = {};
            // self.information.logoId = null;
          },
          function(evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            if (progressPercentage < 100) {
              self.loadingShow = true;
            } else {
              self.loadingShow = false;
            }
            console.log(progressPercentage);
          }
        );
    }
  };
  const logoChangeHandler = function(logoId) {
    let tokenData = auth.user();
    tokenData.logo = logoId;
    auth.signIn(tokenData, false);
    scope.$root.$broadcast("logoId", logoId);
  };

  self.submit = function(information, form) {
    if (form.$valid && self.information.logoId != null) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "logo"
      };

      logoUploadServices
        .update(parameter, {
          attachment: information.logoId
        })
        .$promise.then(
          response => {
            logoChangeHandler(information.logoId);
            information = {};
            form.$setUntouched();
            form.$setPristine();
            // iziToast.show({
            //   message: response.message,
            //   theme: "light",
            //   color: "green"
            // });

            state.go("general.completeInformation.furtherInformation");
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
    } else {
      state.go("general.completeInformation.furtherInformation");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "general.completeInformation.logoUploadController",
    logoUploadController
  );
};
