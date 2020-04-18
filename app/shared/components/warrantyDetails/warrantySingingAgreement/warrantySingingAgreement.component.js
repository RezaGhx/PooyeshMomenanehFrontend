import { warrantySingingAgreementController } from "./warrantySingingAgreement.controller";

const bindings = {
  warrantyId: "<"
};

const warrantySingingAgreementComponent = {
  template: require("./warrantySingingAgreement.html"),
  controller: warrantySingingAgreementController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "warrantySingingAgreementComponent",
    warrantySingingAgreementComponent
  );
};
