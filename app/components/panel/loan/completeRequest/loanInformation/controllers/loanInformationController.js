loanInformationController.$inject = ["completeRequest.loanInformationServices", "$stateParams", "warrantyTypeFactory", "Upload", "dataStore", "$state"];

function loanInformationController(loanInformationServices, stateParams, warrantyTypeFactory, upload, dataStore, state) {

  var self = this;
  let type = stateParams.type;
  self.company = {};


  self.company.warrantyType = warrantyTypeFactory(type);
  console.log(self.type);





  self.download = apiFileManagerGet + '/?id=';

  self.uploadLogo = function (file, name) {
    console.log(name);
    
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
            self.company[name] = response.data[0].fileName;
            console.log(self.company.name);
            
          },
          function (resp) {
            self.company = {};
          },
          function (evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            self.loadingShow= {};
            if (progressPercentage < 100) {
              self.loadingShow[name] = true;
            } else {
              self.loadingShow[name] = false;
            }
            console.log(progressPercentage);
          }
        );
    }
  };




  self.submit = function (company, form) {



    if (form.$valid) {
      delete company.logoFilece; 
      delete company.logoFilecr; 
      delete company.logoFile; 
      dataStore.setData("warrantyReq", company);
      // let parameter = {
      //   type: "WarrantycompleteRequest",
      //   id: "self",
      //   routeParams: "warranty-completeRequest"
      // };

      // loanInformationServices.create(parameter, company).$promise.then(
      //   response => {
      //     company = {};
      //     form.$setUntouched();
      //     form.$setPristine();
      //     // iziToast.show({
      //     //   message: response.message,
      //     //   theme: "light",
      //     //   color: "green"
      //     // });

          state.go("panel.warranty.completeRequest.completeRequestInformation");
      //   },
      //   errResponse => {
      //     iziToast.show({
      //       message: errResponse.data.message,
      //       theme: "light",
      //       color: "red"
      //     });
      //     console.log("fail createYear");
      //   }
      // );
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

  ngModule.controller('completeRequest.loanInformationController', loanInformationController);

};