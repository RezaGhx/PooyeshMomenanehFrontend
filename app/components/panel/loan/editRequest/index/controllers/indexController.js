indexController.$inject = ["editRequest.indexServices", "$state", "dataStore", "$stateParams"];

function indexController(indexServices, state, dataStore, stateParams) {
  var self = this;
  // let id = rootScope.claims.id;
  self.state = state;
  self.type = stateParams.type

  const progressItem = [
    // {
    //   title: "اطلاعات شرکت",
    //   stateName: "panel.loan.editRequest.companyInformation",
    //   backEndVarable: "baseInfo"
    // },
    // {},
    // {
    //   title: "اطلاعات ثبتی",
    //   stateName: "panel.loan.editRequest.registryInformation",
    //   backEndVarable: "registrationInfo"
    // },
    // {},
    {
      title: "هیئت مدیره و سهامداران",
      stateName: "panel.loan.editRequest.directorsInformation",
      name: "registryInformation"
    },
    {},
    {
      title: "اطلاعات تسهیلات",
      stateName: "panel.loan.editRequest.loanInformation",
      backEndVarable: ""
    },
    {},
    {
      title: "بارگذاری اسناد",
      stateName: "panel.loan.editRequest.uploadDocuments",
      name: "uploadDocuments"
    },
    {},
    {
      title: "اطلاعات دانش بنیان",
      stateName: "panel.loan.editRequest.KnowledgeInformation",
      backEndVarable: "knowledgeBaseInfo"
    },
    {},
    {
      title: "اطلاعات لیزینگ",
      stateName: "panel.loan.editRequest.requestData",
      name: "requestData"
    },
    {},
    {
      title: "ارسال درخواست",
      stateName: "panel.loan.editRequest.requestInformation",
      backEndVarable: ""
    }
  ];

  const stateHandler = function(progressItem) {
    for (let i = 0; i < progressItem.length; i++) {
      if (progressItem[i].needToComplete == true) {
        state.go(progressItem[i].stateName);
        break;
      }
    }
  };
  self.progressItem = progressItem;

  if (self.type == 4) {
    progressItem.splice(2,2);
  }

  if (self.type != 4) {
    progressItem.splice(8,2);
  }

  // state.go("panel.loan.request.companyInformation");

  // const companyBaseInfo = function () {
  //     let query = {
  //         type: "LegalPersons",
  //         id: id,
  //         routeParams: "loan-request-information-completion-status"

  //     };
  //     indexServices.get(query).$promise.then(response => {
  //         const entries = Object.entries(JSON.parse(angular.toJson(response)));
  //         // entries.forEach(entries => {
  //         //     let item = progressItem.find(function (element) {
  //         //         return element.backEndVarable == entries[0];
  //         //     });
  //         //     item.needToComplete = entries[1];
  //         // });
  //         self.progressItem = progressItem;
  //         // stateHandler(progressItem);
  //     }, errResponse => {
  //     });
  // };
  // companyBaseInfo();

    dataStore.removeData("loanReq");

}

module.exports = ngModule => {
  ngModule.controller("editRequest.indexController", indexController);
};
