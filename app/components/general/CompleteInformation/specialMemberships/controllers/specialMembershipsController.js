specialMembershipsController.$inject = [
  "general.completeInformation.specialMembershipsServices",
  "$state"
];

function specialMembershipsController(specialMembershipsServices, state) {
  var self = this;

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
  self.information = {
    parkInfo: {
      name: self.typeOfFormation[0].key
    }
  };

  // حوزه فناوری
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

  const memberships = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "special-memberships"
    };
    specialMembershipsServices.get(query).$promise.then(
      response => {
        self.information = response.content;
        self.information.knowledgeBaseInfo.dateBeingKnowledgeBase = null;
        self.information.knowledgeBaseInfo.expirationDate = null;
      },
      errResponse => {}
    );
  };

  memberships();

  self.submit = function(information, form) {
    if (form.$valid && information != null) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "special-memberships"
      };

      self.promiseLoading = specialMembershipsServices
        .update(parameter, information)
        .$promise.then(
          response => {
            information = {};
            form.$setUntouched();
            form.$setPristine();
            // iziToast.show({
            //   message: response.message,
            //   theme: "light",
            //   color: "green"
            // });

            state.go("panel.dashboard");
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
      state.go("panel.dashboard");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "general.completeInformation.specialMembershipsController",
    specialMembershipsController
  );
};
