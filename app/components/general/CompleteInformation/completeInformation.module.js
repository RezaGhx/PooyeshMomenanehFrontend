import completeInformationRouting from "./completeInformation.routes";

const completeInformationModule = angular.module(
  "completeInformationModule",
  []
);

completeInformationModule.config(completeInformationRouting);

export default completeInformationModule;
