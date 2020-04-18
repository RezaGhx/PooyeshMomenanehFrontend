import { warrantyFactureController } from "./warrantyFacture.controller";

const bindings = {
  warrantyId: "<"
};

const warrantyFactureComponent = {
  template: require("./warrantyFacture.html"),
  controller: warrantyFactureController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component("warrantyFactureComponent", warrantyFactureComponent);
};
