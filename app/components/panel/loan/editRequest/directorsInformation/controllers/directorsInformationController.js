directorsInformationController.$inject = [
  "editRequest.directorsInformationServices",
  "$state",
  "$stateParams"
];

function directorsInformationController(directorsInformationServices, state, stateParams) {
  var self = this;
  self.type = stateParams.type;
  
  self.member = {
    shareholderInfo: []
  };
  self.company = {
    directorMembers: []
  };
  self.companyMember = {
    shareholdersMembers: []
  };
  // self.company.directorMembers = [];

  // self.company.directorMembers.shareholderInfo = [];
  // self.companyMember.shareholdersMembers = [];

  self.positionEnum = [
    {
      key: "مدیر عامل",
      value: "مدیر عامل"
    },
    {
      key: "رئیس هئیت مدیره",
      value: "رئیس هئیت مدیره"
    },
    {
      key: "عضو هیئت مدیره",
      value: "عضو هیئت مدیره"
    },
    {
      key: "نائب رئیس هیئت مدیره",
      value: "نائب رئیس هیئت مدیره"
    }
  ];

  const getDirectorMembers = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "director-members"
    };

    self.promiseLoading = directorsInformationServices.get(query).$promise.then(
      response => {
        self.company.directorMembers = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getDirectorMembers();

  const getShareholders = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "shareholders"
    };

    self.promiseLoading = directorsInformationServices.get(query).$promise.then(
      response => {
        self.companyMember.shareholdersMembers = response.content;
        // self.tableParamsLoan.reload();
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getShareholders();

  const getLegalShareholders = function () {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "shareholders",
      routeParams2: "legal",
      routeParams3: "names"
    };

    self.promiseLoading = directorsInformationServices.get(query).$promise.then(
      response => {
        self.legalShareholders = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };
  getLegalShareholders();

  self.pushToList = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "director-members"
      };

      await directorsInformationServices.create(parameter, board).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          getDirectorMembers();
          form.$setUntouched();
          form.$setPristine();
          self.member = {};
          // self.tableParamsLoan.reload();
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "green"
          });
          console.log("error");
        }
      );
    } else {
      iziToast.show({
        message: "فرم را تکمیل کنید.",
        theme: "light",
        color: "red"
      });
    }
  };
  self.deleteItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "director-members",
      routeParams2: item.id
    };
    await directorsInformationServices.remove(parameter).$promise.then(
      data => {
        self.company.directorMembers.splice(
          self.company.directorMembers.indexOf(item),
          1
        );
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("fail deleteItem");
      }
    );
  };
  self.pushToListShareholders = async function (item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "shareholders"
      };

      await directorsInformationServices.create(parameter, board).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          getLegalShareholders();
          getShareholders();
          form.$setUntouched();
          form.$setPristine();
          self.memberShareholders = {};
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "green"
          });
          console.log("error");
        }
      );
    } else {
      iziToast.show({
        message: "فرم را تکمیل کنید.",
        theme: "light",
        color: "red"
      });
    }
  };
  self.deleteShareholdersItem = async function (item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "shareholders",
      routeParams2: item.id
    };
    await directorsInformationServices.remove(parameter).$promise.then(
      data => {
        self.companyMember.shareholdersMembers.splice(
          self.companyMember.shareholdersMembers.indexOf(item),
          1
        );
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("fail deleteItem");
      }
    );
  };

  self.goToNextStep = function () {
    if (
      self.type == 4 &&
      self.company.directorMembers.length > 0 &&
      self.companyMember.shareholdersMembers.length > 0
    ) {
      state.go("panel.loan.editRequest.uploadDocuments");
    }
    if (
      self.type != 4 &&
      self.company.directorMembers.length > 0 &&
      self.companyMember.shareholdersMembers.length > 0
    ) {
      state.go("panel.loan.editRequest.loanInformation");
    } else {
      if (self.type != 4) {
        iziToast.show({
          message: "فرم را تکمیل کنید.",
          theme: "light",
          color: "red"
        });
      }
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "editRequest.directorsInformationController",
    directorsInformationController
  );
};
