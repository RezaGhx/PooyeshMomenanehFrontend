import { warrantyWorksheetController } from "./warrantyWorksheet.controller";

const bindings = {
  warrantyId: "<",
  descript: "<"
};

const warrantyWorksheetComponent = {
  template: require("./warrantyWorksheet.html"),
  controller: warrantyWorksheetController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component("warrantyWorksheetComponent", warrantyWorksheetComponent);
};
