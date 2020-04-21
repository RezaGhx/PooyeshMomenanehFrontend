serviceInfoController.$inject = ["panel.jahadiRegister.serviceInfoServices", "Upload", "$state"];

function serviceInfoController(serviceInfoServices, upload, state) {
  var self = this;

  self.ticket = {};

  $(document).ready(function() {
    $('.service-type').click(function() {
      $(this).toggleClass("selected-service-type");
    });
  });

  self.ticketTypeEnum = [
    {
      value: "0",
      key: "فنی"
    },
    {
      value: "1",
      key: "مالی"
    },
    {
      value: "2",
      key: "سایر"
    }
  ];
  self.ticket.ticketType = self.ticketTypeEnum[0].value;

  self.uploadLogo = function (file) {
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
            self.ticket.attachment = response.data[0].fileName;
          },
          function (resp) {
            self.ticket = {};
          },
          function (evt) {
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

  self.submit = function (ticket, form) {
    if (form.$valid) {
      delete ticket.logoFile;
      let parameter = {
        type: "persons",
        id: "self",
        routeParams: "tickets"
      };

      serviceInfoServices.create(parameter, ticket).$promise.then(
        response => {
          ticket = {};
          form.$setUntouched();
          form.$setPristine();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });

          state.go("panel.jahadiRegister.list");
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
      //   state.go("general.completeInformation.specialMemberships");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller("panel.jahadiRegister.serviceInfoController", serviceInfoController);
};
