import panelRouting from "./panel.routes";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";
import needyRegisterModule from "./needyRegister/needyRegister.module";
import jahadiPanelModule from "./jahadiPanel/jahadiPanel.module";

const panelModule = angular.module("panelModule", [
  "jahadiRegisterModule",
  "needyRegisterModule",
  "jahadiPanelModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
