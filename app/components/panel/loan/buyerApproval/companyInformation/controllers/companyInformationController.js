companyInformationController.$inject = ["buyerApproval.companyInformationServices", "Upload", "$state", "$auth", "activityTypeFactory", "$scope", "companyTypeFactory", "ProvinceFactory", "CityFactory"];

function companyInformationController(companyInformationServices, upload, state, auth, activityTypeFactory, scope, companyTypeFactory, ProvinceFactory, CityFactory) {

  var self = this;

  self.company = {};
  self.download = apiFileManagerGet + '/?id=';
  self.company.legalPersonId = auth.user().id;



  var ProvinceGet = function () {
    self.Province = ProvinceFactory.get();
  }
  ProvinceGet();
  self.CityGet = async function (item) {
    let resultCity = await CityFactory.get().find(o => o[item]);
    self.city = resultCity[item];
  }

  const getCompany = function () {
    let query = {
      type: "LegalPersons",
      id: self.company.legalPersonId,
      routeParams: "base-info",
    };

    self.promiseLoading = companyInformationServices.get(query).$promise.then(response => {
      self.company = response.content;
      self.CityGet(self.company.contactInfo.province);

      if (self.company.companyRegistrationType == 0) {
        self.company.companyRegistrationType = null;
      }
      if (self.company.activityType == 0) {
        self.company.activityType = null;
      }

    }, errResponse => {
      console.log('error');

    });
  };

  getCompany();

  const logoChangeHandler = function (logoId) {
    let tokenData = auth.user();
    tokenData.logo = logoId;
    auth.signIn(tokenData, false);
    scope.$root.$broadcast("logoId", logoId);
  }


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
            self.company.logo = response.data[0].fileName;
          },
          function (resp) {
            self.company.logo = {};
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


  self.submit = function (company, form) {
    delete company.logoFile;
    if (form.$valid) {
      if (company.logo == undefined || company.logo == null) {
        return iziToast.show({
          message: 'نشان شرکت را بارگزاری کنید.',
          theme: "light",
          color: "red"
        });
      }
      let parameter = {
        type: "LegalPersons",
        id: self.company.legalPersonId,
        routeParams: "base-info"
      };

      companyInformationServices.update(parameter, company).$promise.then(
        response => {
          company = {};
          form.$setUntouched();
          form.$setPristine();
          logoChangeHandler(self.company.logo)
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          state.go("panel.loan.buyerApproval.registryInformation");
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
      iziToast.show({
        message: 'فرم را تکمیل کنید',
        theme: "light",
        color: "red"
      });
    }
  };

}

module.exports = ngModule => {

  ngModule.controller('buyerApproval.companyInformationController', companyInformationController);

};