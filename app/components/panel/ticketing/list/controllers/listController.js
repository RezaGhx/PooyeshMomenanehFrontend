listController.$inject = ["panel.ticketing.listServices"];

function listController(listServices) {
  var self = this;

  self.page = 1;
  self.pageSize = 5;
  self.finalPage;
  self.tickets = {};

  self.ticketTypeEnum = [
    {
      value: "-1",
      key: "موضوع تیکت"
    },
    {
      value: "0",
      key: "فنی"
    },
    {
      value: "1",
      key: "مالی"
    },
    {
      value: "2",
      key: "سایر"
    }
  ];
  self.ticketType = self.ticketTypeEnum[0].value;

  self.priorityEnum = [
    {
      value: "-1",
      key: "اولویت"
    },
    {
      value: "0",
      key: "کم"
    },
    {
      value: "1",
      key: "متوسط"
    },
    {
      value: "2",
      key: "زیاد"
    }
  ];

  self.priority = self.priorityEnum[0].value;

  let finalPageHandler = function() {
    let total = self.tickets.totalRecord;
    let pageSize = self.pageSize;
    self.finalPage = Math.floor(total / pageSize) + 1;
  };
  self.nextPage = function() {
    self.page = ++self.page;
    self.getTickets();
  };

  self.previousPage = function() {
    self.page = --self.page;
    self.getTickets();
  };

  self.getTickets = function() {
    let query = {
      type: "persons",
      id: "self",
      routeParams: "tickets",
      PageSize: self.pageSize,
      page: self.page,
      priority: self.priority,
      ticketType: self.ticketType,
      search: self.search
    };
    self.promiseLoading = listServices.get(query).$promise.then(
      response => {
        self.tickets = response.content;
        finalPageHandler();
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  self.getTickets();
}

module.exports = ngModule => {
  ngModule.controller("panel.ticketing.listController", listController);
};
