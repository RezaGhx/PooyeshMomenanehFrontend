import generalRouting from "./general.routes";
import completeInformationModule from "./CompleteInformation/completeInformation.module";

const generalModule = angular.module("generalModule", [
  "completeInformationModule"
]);

generalModule.config(generalRouting);

export default generalModule;
