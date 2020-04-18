indexController.$inject = [
  "completeRequest.indexServices",
  "$state",
  "$rootScope",
  "$stateParams"
];

function indexController(indexServices, state, rootScope, stateParams) {
  var self = this;
  let type = stateParams.type;

  self.state = state;

  const progressItem = [
    {
      title: "دارایی های شرکت",
      stateName: "panel.loan.completeRequest.companyInformation",
      name: "companyInformation"
    },
    {},
    {
      title: "نیروی انسانی",
      stateName: "panel.loan.completeRequest.humanResourceInformation",
      name: "knowledgeBaseInfo"
    },
    {},
    // {
    //     title: "بارگذاری اسناد",
    //     stateName: "panel.loan.completeRequest.uploadDocuments",
    //     name: "documents"
    // },
    // {},
    {
      title: "مجوز ها و استاندارد ها",
      stateName: "panel.loan.completeRequest.licenseInformation",
      name: "licenseInformation"
    },
    {},
    {
      title: "اطلاعات مالی شرکت",
      stateName: "panel.loan.completeRequest.fundInformation",
      name: "fundInformation",
      notShow: true
    },
    { notShow: true },
    {
      title: "سوابق خدمات",
      stateName: "panel.loan.completeRequest.historyInformation",
      name: "historyInformation"
    },
    {},
    {
      title: "سوابق فروش و قراردادها",
      stateName: "panel.loan.completeRequest.contractHistoryInformation",
      name: "contractHistoryInformation"
    },
    {},
    {
      title: "بارگذاری اسناد",
      stateName: "panel.loan.completeRequest.uploadDocuments",
      name: "uploadDocuments"
    }
  ];

  const stateShowHandler = function() {
    var found = progressItem.filter(x => x.notShow == true);
    found.forEach(element => {
      element.notShow = false;
    });
  };

  if (type == "WorkingCapital") {
    stateShowHandler();
  }

  self.progressItem = progressItem;

  // state.go("panel.loan.completeRequest.companyInformation");

  // const companyBaseInfo = function () {
  //     let query = {
  //         type: "LegalPersons",
  //         id: id,
  //         routeParams: "loan-completeRequest-information-completion-status"

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
}

module.exports = ngModule => {
  ngModule.controller("completeRequest.indexController", indexController);
};
