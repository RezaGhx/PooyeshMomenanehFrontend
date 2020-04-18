furtherInformationController.$inject = [
  "general.completeInformation.furtherInformationServices",
  "$state",
  "dateFactory"
];

function furtherInformationController(
  furtherInformationServices,
  state,
  dateFactory
) {
  var self = this;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  self.today1 = yyyy + "/" + mm + "/" + dd;
  self.dateLimit = dateFactory.convertPersianCalender(
    self.today1,
    "YYYY/MM/DD"
  );

  const companyBaseInfo = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Identity-information"
    };
    self.promiseLoading = furtherInformationServices.get(query).$promise.then(
      response => {
        self.information = response.content;
        self.information.registerDate = dateFactory.persianCalenderFormat(
          self.information.registerDate,
          "YYYY/MM/DD"
        );
      },
      errResponse => {}
    );
  };

  companyBaseInfo();

  self.submit = function(information, form) {
    if (form.$valid && information != null) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "Identity-information"
      };

      furtherInformationServices.update(parameter, information).$promise.then(
        response => {
          information = {};
          form.$setUntouched();
          form.$setPristine();
          // iziToast.show({
          //   message: response.message,
          //   theme: "light",
          //   color: "green"
          // });

          state.go("general.completeInformation.specialMemberships");
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
      state.go("general.completeInformation.specialMemberships");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "general.completeInformation.furtherInformationController",
    furtherInformationController
  );
};
