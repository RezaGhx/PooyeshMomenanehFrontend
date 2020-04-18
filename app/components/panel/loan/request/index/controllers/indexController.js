indexController.$inject = ["panel.loan.request.indexServices", "$state", "dataStore", "$stateParams"];

function indexController(indexServices, state, dataStore, stateParams) {
  var self = this;
  // let id = rootScope.claims.id;
  self.state = state;
  self.type = stateParams.type;
  console.log(self.type);



  const progressItem = [
    {
      title: "اطلاعات شرکت",
      stateName: "panel.loan.request.companyInformation",
      name: "baseInfo",
    },
    {},
    {
      title: "اطلاعات ثبتی",
      stateName: "panel.loan.request.registryInformation",
      name: "registrationInfo",
    },
    {},
    {
      title: "هیئت مدیره و سهامداران",
      stateName: "panel.loan.request.directorsInformation",
      name: "registryInformation",
    },
    {},
    {
      title: "اطلاعات تسهیلات",
      stateName: "panel.loan.request.loanInformation",
      name: "",
      notShow: false
    },
    // {},
    {notShow: false},
    {
      title: "بارگذاری اسناد",
      stateName: "panel.loan.request.uploadDocuments",
      name: "uploadDocuments",
    },
    {},
    {
      title: "اطلاعات دانش بنیان",
      stateName: "panel.loan.request.KnowledgeInformation",
      name: "knowledgeBaseInfo",
    },
    {},
    {
      title: "اطلاعات لیزینگ",
      stateName: "panel.loan.request.requestData",
      name: "requestData",
    },
    {},
    {
      title: "ارسال درخواست",
      stateName: "panel.loan.request.requestInformation",
      name: "",
    }
  ];
  
  if (self.type == "Leasing") {
    progressItem.splice(6,2);
  }

  if (self.type != "Leasing") {
    progressItem.splice(12,2);
  }

  const stateHandler = function(progressItem) {
    for (let i = 0; i < progressItem.length; i++) {
      if (progressItem[i].needToComplete == true) {
        state.go(progressItem[i].stateName);
        break;
      }
    }
  };
  self.progressItem = progressItem;

  const stateShowHandler = function() {
    var found = progressItem.filter(x => x.notShow == false);
    found.forEach(element => {
      element.notShow = true;
    });
  };

  if (self.type=="Leasing") {
    stateShowHandler();
  }

  // const stateShowHandlerWhenLeasing = function() {
  //   var found = progressItem.filter(x => x.leasing == false);
  //   found.forEach(element => {
  //     element.leasing = true;
  //   });
  // };

  // if (type == "Leasing") {
  //   stateShowHandlerWhenLeasing();
  // }

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
	ngModule.controller("panel.loan.request.indexController", indexController);
};
