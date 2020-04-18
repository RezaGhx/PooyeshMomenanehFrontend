indexController.$inject = ["buyerApproval.indexServices", "$state", "dataStore", "$stateParams"];

function indexController(indexServices, state, dataStore, stateParams) {
  var self = this;
  // let id = rootScope.claims.id;
  self.state = state;
  self.type = stateParams.type

  const progressItem = [

    {
      title: "اطلاعات لیزینگ",
      stateName: "panel.loan.buyerApproval.requestData",
      name: "requestData"
    },
    {},
    {
      title: "اطلاعات شرکت",
      stateName: "panel.loan.buyerApproval.companyInformation",
      name: "baseInfo"
    },
    {},
    {
      title: "اطلاعات ثبتی",
      stateName: "panel.loan.buyerApproval.registryInformation",
      name: "registrationInfo"
    },
    {},
    {
      title: "هیئت مدیره و سهامداران",
      stateName: "panel.loan.buyerApproval.directorsInformation",
      name: "registryInformation"
    },
    {},
    {
      title: "بارگذاری اسناد",
      stateName: "panel.loan.buyerApproval.uploadDocuments",
      name: "uploadDocuments"
    },
    {},
    {
      title: "اطلاعات دانش بنیان",
      stateName: "panel.loan.buyerApproval.KnowledgeInformation",
      name: "knowledgeBaseInfo"
    },
    {},
    {
      title: "ارسال درخواست",
      stateName: "panel.loan.buyerApproval.requestInformation",
      name: "requestInformation"
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
  //         //         return element.name == entries[0];
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
  ngModule.controller("buyerApproval.indexController", indexController);
};
