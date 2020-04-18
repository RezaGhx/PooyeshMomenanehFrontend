import { loanWorksheetController } from "./loanWorksheet.controller";

const bindings = {
  loanId: "<"
};

const loanWorksheetComponent = {
  template: require("./loanWorksheet.html"),
  controller: loanWorksheetController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component("loanWorksheetComponent", loanWorksheetComponent);
};
