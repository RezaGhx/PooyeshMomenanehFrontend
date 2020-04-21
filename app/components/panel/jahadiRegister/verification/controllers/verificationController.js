verificationController.$inject = [
  "panel.jahadiRegister.verificationServices",
  "$scope",
  "$stateParams",
  "$state"
];

function verificationController(
  verificationServices,
  $scope,
  stateParams,
  state
) {
  var self = this;
  let id = stateParams.id;

  self.verify = async function() {
    let parameter = {
      type: "Accounts",
      id: id,
      routeParams: "verificationCode",
      routeParams2: "verify"
    };

    await verificationServices.create(parameter, { userId: id }).$promise.then(
      response => {
        self.phone = response.phone;
        // iziToast.show({
        //   message: response.message,
        //   theme: "light",
        //   color: "green"
        // });
      },
      errResponse => {
        // console.log("dasdasd");
        // iziToast.show({
        //   message: errResponse.data.message,
        //   theme: "light",
        //   color: "red"
        // });
        // console.log("fail dasdasd");
      }
    );
  };

  self.resend = async function() {
    let parameter = {
      type: "Accounts",
      id: id,
      routeParams: "verificationCode",
      routeParams2: "resend"
    };

    await verificationServices.create(parameter, { userId: id }).$promise.then(
      response => {
        self.phone = response.phone;
        // iziToast.show({
        //   message: response.message,
        //   theme: "light",
        //   color: "green"
        // });
      },
      errResponse => {
        // iziToast.show({
        //   message: errResponse.data.message,
        //   theme: "light",
        //   color: "red"
        // });
        // console.log("fail dsadasd");
      }
    );
  };
  // self.resend();

  self.verification = function() {
    $scope.otpInput.onDone();
  };

  $scope.otpInput = {
    size: 6,
    type: "text",
    onDone: function(value) {
      let parameter = {
        type: "Accounts",
        id: id,
        routeParams: "verificationCode",
        routeParams2: "verify"
      };
      verificationServices.create(parameter, {
        code: value,
        userId: id
      }).$promise.then(
        response => {
          // iziToast.show({
          //     message: response.message,
          //     theme: 'light',
          //     color: 'green',
          // });
          state.go("Authentication.Login");
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
          console.log("fail dffffffffff");
        }
      );
    }
    // onChange: function (value) {
    //     console.log(value);
    // }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.jahadiRegister.verificationController",
    verificationController
  );
};
