listController.$inject = ["panel.archive.listServices", "NgTableParams"];

function listController(listServices, NgTableParams) {
  var self = this;
  console.log("al");
  const SPENDING_THRESHOLD = 200;
  const TAX_RATE = 0.08;
  const PHONE_PRICE = 99.99;
  const ACCESSORY_PRICE = 9.99;
  var bank_balance = 303.91;
  var amount = 0;

  function calculateTax(amount) {
    return amount * TAX_RATE;
  }

  function formatAmount(amount) {
    return "$" + amount.toFixed(2);
  }

  while (amount < bank_balance) {
    amount = amount + PHONE_PRICE;
    if (amount < SPENDING_THRESHOLD) {
      amount = amount + ACCESSORY_PRICE;
    }
  }

  amount = amount + calculateTax(amount);
  console.log("your purchase" + formatAmount(amount));

  if (amount > bank_balance) {
    console.log("you can't afford this purchase");
  }

  self.pageIndex = 1;
  self.pageSize = 5;
  self.finalPage;
  self.warranties = {};

  self.warrantiesTypeEnum = [
    {
      value: "-1",
      key: "نوع پرونده ها"
    },
    {
      value: "0",
      key: "شرکت در مناقصه"
    },
    {
      value: "1",
      key: "پیش پرداخت قرارداد"
    },
    {
      value: "2",
      key: "حسن انجام تعهدات/کار"
    },
    {
      value: "3",
      key: "اعتباری"
    }
  ];
  self.warrantiesType = self.warrantiesTypeEnum[0].value;

  self.statusEnum = [
    {
      value: "-1",
      key: "وضعیت"
    },
    {
      value: "82",
      key: "صادر شده"
    },
    {
      value: "100",
      key: "باطل شده"
    }
  ];

  self.status = self.statusEnum[0].value;

  let finalPageHandler = function() {
    let total = self.warranties.totalRecord;
    let pageSize = self.pageSize;
    self.finalPage = Math.floor(total / pageSize) + 1;
  };
  self.nextPage = function() {
    self.pageIndex = ++self.pageIndex;
    self.getArchivesList();
  };

  self.previousPage = function() {
    self.pageIndex = --self.pageIndex;
    self.getArchivesList();
  };

  self.getArchivesList = function() {
    let query = {
      type: "persons",
      id: "self",
      routeParams: "archives",
      routeParams2: "warranties",
      PageSize: self.pageSize,
      PageIndex: self.pageIndex,
      stateFilter: self.status,
      warrantyTypeFilter: self.warrantiesType,
      search: self.search
    };
    self.promiseLoading = listServices.get(query).$promise.then(
      response => {
        self.warranties = response.content;
        finalPageHandler();
      },
      errResponse => {
        console.log("ERror MACro");
      }
    );
  };

  self.getArchivesList();

  self.tableParams = new NgTableParams(
    {},
    {
      dataset: self.information,
      page: 1,
      count: 5,
      counts: []
    }
  );
}

module.exports = ngModule => {
  ngModule.controller("panel.archive.listController", listController);
};
