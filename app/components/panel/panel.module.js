import panelRouting from "./panel.routes";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";

const panelModule = angular.module("panelModule", [
  "jahadiRegisterModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
