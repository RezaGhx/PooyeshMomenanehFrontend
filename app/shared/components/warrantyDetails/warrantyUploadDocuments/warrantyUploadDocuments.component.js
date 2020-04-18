import { warrantyUploadDocumentsController } from "./warrantyUploadDocuments.controller";

const bindings = {
  warrantyId: "<"
};

const warrantyUploadDocumentsComponent = {
  template: require("./warrantyUploadDocuments.html"),
  controller: warrantyUploadDocumentsController,
  controllerAs: "self",
  bindings: bindings
};

module.exports = ngModule => {
  ngModule.component(
    "warrantyUploadDocumentsComponent",
    warrantyUploadDocumentsComponent
  );
};
