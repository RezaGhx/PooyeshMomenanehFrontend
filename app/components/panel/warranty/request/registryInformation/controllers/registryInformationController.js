registryInformationController.$inject = [
  "panel.warranty.request.registryInformationServices",
  "NgTableParams",
  "$state",
  "dateFactory",
  "$auth",
  "ProvinceFactory",
  "CityFactory"
];

function registryInformationController(
  registryInformationServices,
  NgTableParams,
  state,
  dateFactory,
  auth,
  ProvinceFactory,
  CityFactory
) {
  var self = this;
  let id = auth.user().id;
  self.company = {};
  self.company.registerDate = "1398/07/09";

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
  self.companyDir = {
    directorMembers: []
  };

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

  var ProvinceGet = function() {
    self.Province = ProvinceFactory.get();
  };
  ProvinceGet();
  self.CityGet = async function(item) {
    let resultCity = await CityFactory.get().find(o => o[item]);
    self.city = resultCity[item];
  };

  self.tableParams = new NgTableParams(
    {},
    {
      dataset: self.companyDir.directorMembers,
      page: 1,
      count: 5,
      counts: []
    }
  );

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
        console.log("error");
      }
    );
  };

  getCompany();

  const getDirectorMember = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "director-members"
    };

    self.promiseLoading = registryInformationServices.get(query).$promise.then(
      response => {
        let directorMembers = response.content;
        directorMembers.forEach(member => {
          self.companyDir.directorMembers.push(member);
        });
        self.tableParams.reload();
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getDirectorMember();

  self.pushToList = function(item, form) {
    if (form.$valid) {
      let board = angular.copy(item);
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "director-members"
      };

      registryInformationServices.create(parameter, item).$promise.then(
        response => {
          self.companyDir.directorMembers.push(board);
          self.member = {};
          form.$setUntouched();
          form.$setPristine();
          self.tableParams.reload();
          // iziToast.show({
          //   message: response.message,
          //   theme: "light",
          //   color: "green"
          // });

          // state.go("panel.warranty.request.KnowledgeInformation");
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
        message: "فرم را تکمیل کنید.",
        theme: "light",
        color: "red"
      });
    }
  };

  const boardMembersHasSignRighthHandler = function(directorMembers) {
    const directorMembersFiltered = directorMembers.filter(
      member => member.hasSignRight == true
    );
    return directorMembersFiltered.length > 0 ? false : true;
  };

  self.deleteItem = async function(item) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "director-members",
      routeParams2: item.id
    };
    await registryInformationServices.remove(parameter).$promise.then(
      data => {
        self.companyDir.directorMembers.splice(
          self.companyDir.directorMembers.indexOf(item),
          1
        );
        self.tableParams.reload();
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

  self.submit = function(company, form, directorForm) {
    form.$removeControl(directorForm);

    if (form.$valid) {
      if (boardMembersHasSignRighthHandler(self.tableParams.data)) {
        return iziToast.show({
          message: "شما حداقل باید یک هیئت مدیره دارای حق امضا وارد نمایید.",
          theme: "light",
          color: "red"
        });
      }
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "registration-info"
      };

      registryInformationServices.update(parameter, company).$promise.then(
        response => {
          company = {};
          form.$setUntouched();
          form.$setPristine();
          // iziToast.show({
          //   message: response.message,
          //   theme: "light",
          //   color: "green"
          // });

          state.go("panel.warranty.request.KnowledgeInformation");
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
      // state.go("general.completeInformation.specialMemberships");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.warranty.request.registryInformationController",
    registryInformationController
  );
};
