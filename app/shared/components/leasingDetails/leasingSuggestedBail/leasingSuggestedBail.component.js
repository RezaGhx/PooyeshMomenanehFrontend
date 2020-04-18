import { leasingSuggestedBailController } from "./leasingSuggestedBail.controller";

const bindings = {
  leasingId: "<"
};

const leasingSuggestedBailComponent = {
  template: require("./leasingSuggestedBail.html"),
  controller: leasingSuggestedBailController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component("leasingSuggestedBailComponent", leasingSuggestedBailComponent);
};
