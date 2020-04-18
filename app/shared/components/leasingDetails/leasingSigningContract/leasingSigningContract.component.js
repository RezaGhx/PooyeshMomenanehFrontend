import { leasingSigningContractController } from "./leasingSigningContract.controller";

const bindings = {
  leasingId: "<",
  attachment: "<"
};

const leasingSigningContractComponent = {
  template: require("./leasingSigningContract.html"),
  controller: leasingSigningContractController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "leasingSigningContractComponent",
    leasingSigningContractComponent
  );
};
