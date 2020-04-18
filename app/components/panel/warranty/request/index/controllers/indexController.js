indexController.$inject = ["panel.warranty.request.indexServices", "$state","$rootScope"];

function indexController(indexServices, state,rootScope) {

    var self = this;
    // let id = rootScope.claims.id;
    self.state = state;

    const progressItem = [
        {
            title: "اطلاعات شرکت",
            stateName: "panel.warranty.request.companyInformation",
            backEndVarable: "baseInfo"
        },
        {},
        {
            title: "اطلاعات ثبتی",
            stateName: "panel.warranty.request.registryInformation",
            backEndVarable: "registrationInfo"
        },
        {},
        {
            title: "اطلاعات دانش بنیان",
            stateName: "panel.warranty.request.KnowledgeInformation",
            backEndVarable: "knowledgeBaseInfo"
        },
        {},
        {
            title: "بارگذاری اسناد",
            stateName: "panel.warranty.request.uploadDocuments",
            backEndVarable: "documents"
        },
        {},
        {
            title: "اطلاعات ضمانت نامه",
            stateName: "panel.warranty.request.warrantyInformation",
            backEndVarable: ""
        },
        {},
        {
            title: "ثبت درخواست",
            stateName: "panel.warranty.request.requestInformation",
            backEndVarable: ""
        },
    ];

    const stateHandler = function (progressItem) {
        for (let i = 0; i < progressItem.length; i++) {
            if (progressItem[i].needToComplete == true) {
                state.go(progressItem[i].stateName);
                break;
            }
        }
    }
    self.progressItem = progressItem;

    // state.go("panel.warranty.request.companyInformation");


    // const companyBaseInfo = function () {
    //     let query = {
    //         type: "LegalPersons",
    //         id: id,
    //         routeParams: "warranty-request-information-completion-status"

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
}

module.exports = ngModule => {

    ngModule.controller('panel.warranty.request.indexController', indexController);

};