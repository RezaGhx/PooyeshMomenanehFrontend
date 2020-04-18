import { warrantyChooseCommitteeController } from "./warrantyChooseCommittee.controller";

const bindings = {
  warrantyId: "<"
};

const warrantyChooseCommitteeComponent = {
  template: require("./warrantyChooseCommittee.html"),
  controller: warrantyChooseCommitteeController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "warrantyChooseCommitteeComponent",
    warrantyChooseCommitteeComponent
  );
};
