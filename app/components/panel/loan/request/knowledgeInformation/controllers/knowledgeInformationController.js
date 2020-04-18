KnowledgeInformationController.$inject = [
  "panel.loan.request.KnowledgeInformationServices",
  "Upload",
  "$state",
  "$auth",
  "dataStore",
  "dateFactory",
  "$stateParams"
];

function KnowledgeInformationController(
  KnowledgeInformationServices,
  upload,
  state,
  auth,
  dataStore,
  dateFactory,
  stateParams
) {
  var self = this;
  self.type = stateParams.type;
  console.log(self.type);
  self.company = {};
  self.download = apiFileManagerGet + "/?id=";
  let id = auth.user().id;
  console.log(id);
  self.typeOfFormation = [
    { key: "پارک فناوری پردیس", value: 0 },
    { key: "پارک علم و فناوری اردبیل", value: 1 },
    { key: "شهرک علمی و تحقیقاتی اصفهان", value: 2 },
    { key: "پارک علم و فناوری شیخ بهائی اصفهان", value: 3 },
    { key: "پارک علم و فناوری البرز", value: 4 },
    { key: "پارک علم و فناوری ارتباطات و فناوری اطلاعات(ICT)", value: 5 },
    { key: "پارک علم و فناوری ایلام", value: 6 },
    { key: "پارک علم و فناوری آذربایجان شرقی", value: 7 },
    { key: "پارک علم و فناوری آذربایجان غربی", value: 8 },
    { key: "پارک علم وفناوری خلیج فارس (بوشهر)", value: 9 },
    { key: "پارک علم و فناوری دانشگاه تربیت مدرس", value: 10 },
    { key: "پارک علم و فناوری دانشگاه تهران", value: 11 },
    { key: "پارک علم و فناوری دانشگاه صنعتی شریف", value: 12 },
    { key: "پارک علم و فناوری دانشگاه آزاد اسلامی", value: 13 },
    {
      key:
        "پارک علم و فناوری دانشگاه علوم پزشکی و خدمات بهداشتی و درمانی ایران",
      value: 14
    },
    { key: "پارک علم و فناوری دانشگاه شهید بهشتی", value: 15 },
    { key: "پارک علم و فناوری های نرم و صنایع فرهنگی", value: 16 },
    { key: "پارک علم و فناوری چهارمحال و بختیاری", value: 17 },
    { key: "پارک علم و فناوری خراسان جنوبی", value: 18 },
    { key: "پارک علم و فناوری خراسان رضوی", value: 19 },
    { key: "پارک علم و فناوری خراسان شمالی", value: 20 },
    { key: "پارک علم و فناوری خوزستان", value: 21 },
    {
      key: "پارک علم و فناوری دانشگاه تحصیلات تکمیلی علوم پایه زنجان",
      value: 22
    },
    { key: "پارک علم و فناوری دانشگاه شهید بهشتی", value: 23 },
    { key: "پارک علم و فناوری های نرم و صنایع فرهنگی", value: 24 },
    { key: "پارک علم و فناوری خراسان جنوبی", value: 25 },
    { key: "پارک علم و فناوری خراسان رضوی", value: 26 },
    { key: "پارک علم و فناوری خراسان شمالی", value: 27 },
    { key: "پارک علم و فناوری خوزستان", value: 28 },
    {
      key: "پارک علم و فناوری دانشگاه تحصیلات تکمیلی علوم پایه زنجان",
      value: 29
    },
    { key: "پارک علم و فناوری زنجان", value: 30 },
    { key: "پارک علم و فناوری دانشگاه سمنان", value: 31 },
    { key: "پارک علم و فناوری سمنان", value: 32 },
    { key: "پارک علم و فناوری سیستان و بلوچستان", value: 33 },
    { key: "پارک علم و فناوری فارس", value: 34 },
    { key: "پارک علم وفناوری قزوین", value: 35 },
    { key: "پارک علم و فناوری قم", value: 36 },
    { key: "پارک علم و فناوری کردستان", value: 37 },
    {
      key:
        "پارک علم و فناوریدانشگاه تحصیلات تکمیلی صنعتی و فناوری پیشرفته کرمان",
      value: 38
    },
    { key: "پارک علم و فناوری جهاد دانشگاهی کرمانشاه", value: 39 },
    { key: "پارک علم و فناوری کهگیلویه و بویراحمد", value: 40 },
    { key: "پارک علم و فناوری گلستان", value: 41 },
    { key: "پارک علم و فناوری گیلان", value: 42 },
    { key: "پارک علم و فناوری لرستان", value: 43 },
    { key: "پارک علم و فناوری مازندران", value: 44 },
    { key: "پارک علم و فناوری مرکزی", value: 45 },
    { key: "پارک زیست فناوری خلیج فارس (قشم)", value: 46 },
    { key: "پارک علم و فناوری همدان", value: 47 },
    { key: "پارک علم و فناوری یزد", value: 48 }
  ];

  self.technologyTypeEnum = [
    {
      value: 1,
      key: "نفت و گاز"
    },
    {
      value: 2,
      key: "مخابرات"
    },
    {
      value: 3,
      key: "الکترونیک"
    },
    {
      value: 4,
      key: "مکانیک پیشرفته"
    },
    {
      value: 5,
      key: "هوا فضا"
    },
    {
      value: 6,
      key: "فناوری اطلاعات"
    },
    {
      value: 7,
      key: "نانو"
    },
    {
      value: 8,
      key: "پزشکی و دارو"
    },
    // {
    //   value: 8,
    //   key: "تجهیزات"
    // },
    {
      value: 9,
      key: "رباتیک"
    },
    {
      value: 10,
      key: "سایر"
    }
  ];

  // حوزه کاری
  self.knowledgeBaseTypeEnum = [
    {
      value: 1,
      key: "صنعتی"
    },
    {
      value: 2,
      key: "خدماتی"
    }
  ];

  self.company = {
    parkInfo: {
      name: self.typeOfFormation[0].key
    }
  };

  if (self.type != "Leasing") {
    const getLoanData = function () {
      let loanData = dataStore.getData("loanReq");
      if (self.type == "Leasing") {
        let notLoanDate = !Object.keys(loanData).length;
        if (notLoanDate) {
          state.go("panel.loan.request.loanInformation");
        }
      }
      self.introducer = loanData.introducer;
    };
    getLoanData();
  }

  const getCompany = function () {
    let query = {
      type: "LegalPersons",
      id: id,
      routeParams: "special-memberships"
    };

    self.promiseLoading = KnowledgeInformationServices.get(query).$promise.then(
      response => {
        self.company = response.content;
        if (self.company.knowledgeBaseInfo.technologyType == 0) {
          self.company.knowledgeBaseInfo.technologyType = null;
        }
        if (self.company.knowledgeBaseInfo.knowledgeBaseType == 0) {
          self.company.knowledgeBaseInfo.knowledgeBaseType = null;
        }
        if (self.company.knowledgeBaseInfo.companyStatus == 0) {
          self.company.knowledgeBaseInfo.companyStatus = null;
        }
        self.company.knowledgeBaseInfo.dateBeingKnowledgeBase = dateFactory.persianCalenderFormat(
          response.content.knowledgeBaseInfo.dateBeingKnowledgeBase,
          "YYYY/MM/DD"
        );
        self.company.knowledgeBaseInfo.expirationDate = dateFactory.persianCalenderFormat(
          response.content.knowledgeBaseInfo.expirationDate,
          "YYYY/MM/DD"
        );

        // self.company.companyStatus = isStartupTypeFactory(self.company.companyStatus);
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getCompany();

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
            self.company.parkInfo.establishmentAttachment =
              response.data[0].fileName;
          },
          function (resp) {
            self.company = {};
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
      if (
        self.company.isInPark &&
        self.company.parkInfo.establishmentAttachment == null
      ) {
        return iziToast.show({
          message: "در صورتی که در پارک مستقر هستید تصویر را بارگزاری کنید",
          theme: "light",
          color: "red"
        });
      }

      if (
        !self.company.isKnowledgeBase &&
        !self.company.isInPark &&
        !self.company.isCreative &&
        self.introducer == 2
      ) {
        return $("#exampleModal").modal("show");
      }

      let parameter = {
        type: "LegalPersons",
        id: id,
        routeParams: "special-memberships"
      };

      KnowledgeInformationServices.update(parameter, company).$promise.then(
        response => {
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          if (self.type != 'Leasing') {
            state.go("panel.loan.request.requestInformation");
          }
          else if (self.type == 'Leasing') {
            state.go("panel.loan.request.requestData")
          }
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
      //   state.go("general.completeInformation.specialMemberships");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.loan.request.KnowledgeInformationController",
    KnowledgeInformationController
  );
};
