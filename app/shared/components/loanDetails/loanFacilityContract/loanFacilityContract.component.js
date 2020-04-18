import { loanFacilityContractController } from "./loanFacilityContract.controller";

const bindings = {
  loanId: "<",
  attachment: "<"
};

const loanFacilityContractComponent = {
  template: require("./loanFacilityContract.html"),
  controller: loanFacilityContractController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "loanFacilityContractComponent",
    loanFacilityContractComponent
  );
};
