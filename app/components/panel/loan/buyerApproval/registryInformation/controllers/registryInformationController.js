registryInformationController.$inject = [
  "buyerApproval.registryInformationServices",
  "$state",
  "dateFactory",
  "ProvinceFactory",
  "CityFactory"
];

function registryInformationController(
  registryInformationServices,
  state,
  dateFactory,
  ProvinceFactory,
  CityFactory
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
  console.log(self.dateLimit);

  self.company = {};

  var ProvinceGet = function() {
    self.Province = ProvinceFactory.get();
  };
  ProvinceGet();
  self.CityGet = async function(item) {
    let resultCity = await CityFactory.get().find(o => o[item]);
    self.city = resultCity[item];
  };

  const getCompany = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "registration-info"
    };

    registryInformationServices.get(query).$promise.then(
      response => {
        self.company = response.content;
        self.CityGet(self.company.province);
        self.company.registerDate = dateFactory.persianCalenderFormat(
          response.content.registerDate,
          "YYYY/MM/DD"
        );
        self.company.newsPaperDate = dateFactory.persianCalenderFormat(
          response.content.newsPaperDate,
          "YYYY/MM/DD"
        );
        if (self.company.fund == 0) {
          self.company.fund = null;
        }
      },
      errResponse => {
        console.log("ERror MACro");
      }
    );
  };

  getCompany();

  self.submit = function(company, form) {
    if (form.$valid) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "registration-info"
      };

      registryInformationServices.update(parameter, company).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });

          state.go("panel.loan.buyerApproval.directorsInformation");
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
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "buyerApproval.registryInformationController",
    registryInformationController
  );
};
