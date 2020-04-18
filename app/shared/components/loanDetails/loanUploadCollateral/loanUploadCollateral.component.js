import { loanUploadCollateralController } from "./loanUploadCollateral.controller";

const bindings = {
  loanId: "<",
  selectedBail: "<"
};

const loanUploadCollateralComponent = {
  template: require("./loanUploadCollateral.html"),
  controller: loanUploadCollateralController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "loanUploadCollateralComponent",
    loanUploadCollateralComponent
  );
};
