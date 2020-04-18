gettingStartController.$inject = ["panel.warranty.gettingStartServices"];

function gettingStartController(gettingStartServices) {
  var self = this;
  self.warrantyGuide = warrantyGuide;
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.warranty.gettingStartController",
    gettingStartController
  );
};
