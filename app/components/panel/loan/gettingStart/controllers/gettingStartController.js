gettingStartController.$inject = ["panel.loan.gettingStartServices","$rootScope"];

function gettingStartController(gettingStartServices,rootScope) {
  var self = this;
  //دریافت راهنمای تسهیلات
  self.loanGuide = loanGuide;
  rootScope.hideModal("leasingModal")


}

// rootScope.hideModal()

module.exports = ngModule => {
  ngModule.controller(
    "panel.loan.gettingStartController",
    gettingStartController
  );
 
};



