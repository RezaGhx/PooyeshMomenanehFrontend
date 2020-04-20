footerController.$inject = [
  "$stateParams",
  "$state",
  "Upload",
  "$rootScope",
  "$resource"
];

function footerController(
  stateParams,
  state,
  upload,
  rootScope,
  resource
) {
  var self = this;

  let sendContactUsService = resource(
    `${apiLeasing}/leasing-requests/${leasingId}/committee-approval/payment-sources`,
  );

  self.sendContactUs = function (form) {
    if (form.$valid) {
      let command = {
        firstName: self.member.firstName,
        lastName: self.member.lastName,
        description: self.member.description,
      };

      sendContactUsService.create(command).$promise.then(
        response => {
          parentForm.$setUntouched();
          parentForm.$setPristine();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
        }
      );
    } else {
      iziToast.show({
        message: "فرم را به درستی تکمیل نمایید",
        theme: "light",
        color: "red"
      });
    }
  };

}

export {
  footerController
};