import { leasingUploadCollateralController } from "./leasingUploadCollateral.controller";

const bindings = {
  leasingId: "<",
  selectedBail: "<"
};

const leasingUploadCollateralComponent = {
  template: require("./leasingUploadCollateral.html"),
  controller: leasingUploadCollateralController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "leasingUploadCollateralComponent",
    leasingUploadCollateralComponent
  );
};
