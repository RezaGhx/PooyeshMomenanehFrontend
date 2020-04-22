import panelRouting from "./panel.routes";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";
import needyRegisterModule from "./needyRegister/needyRegister.module";
import needyListModule from "./needyList/needyList.module";

const panelModule = angular.module("panelModule", [
  "jahadiRegisterModule",
  "needyRegisterModule",
  "needyListModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
