import { warrantyExtendedController } from "./warrantyExtended.controller";

const bindings = {
  warrantyId: "<"
};

const warrantyExtendedComponent = {
    template: require("./warrantyExtended.html"),
    controller: warrantyExtendedController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
    ngModule.component("warrantyExtendedComponent", warrantyExtendedComponent);
};
