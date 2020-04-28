needyDetailsController.$inject = ["panel.jahadiPanel.needyDetailsServices", "Upload", "$state", "$timeout"];

function needyDetailsController(needyDetailsServices, upload, state, timeout) {
  var self = this;

  self.ticket = {};
  self.ticket.priority = "2";

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

      needyDetailsServices.create(parameter, ticket).$promise.then(
        response => {
          ticket = {};
          form.$setUntouched();
          form.$setPristine();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });

          state.go("panel.jahadiPanel.list");
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

  // تایم

  // initialise and get the current date
  self.currentDate = moment(new Date())
    .locale("fa")
    .format("dddd jDD MMM jYYYY");

  let currentTime = moment(new Date())
    .locale("fa")
    .format("mm : H"); // get the current time
  self.clock = currentTime; // initialise the time variable
  self.tickInterval = 1000; //ms

  let tick = function () {
    let currentTime = moment(new Date())
      .locale("fa")
      .format("mm : H"); // get the current time
    self.clock = currentTime;
    timeout(tick, self.tickInterval); // reset the timer
  };

  // Start the timer
  timeout(tick, self.tickInterval);
}

module.exports = ngModule => {
  ngModule.controller("panel.jahadiPanel.needyDetailsController", needyDetailsController);
};
