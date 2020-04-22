import panelRouting from "./panel.routes";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";
import needyRegisterModule from "./needyRegister/needyRegister.module";

const panelModule = angular.module("panelModule", [
  "jahadiRegisterModule",
  "needyRegisterModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
