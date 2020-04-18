import { loanSuggestedBailController } from "./loanSuggestedBail.controller";

const bindings = {
  loanId: "<"
};

const loanSuggestedBailComponent = {
  template: require("./loanSuggestedBail.html"),
  controller: loanSuggestedBailController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component("loanSuggestedBailComponent", loanSuggestedBailComponent);
};
