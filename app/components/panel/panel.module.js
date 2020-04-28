import panelRouting from "./panel.routes";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";
import needyRegisterModule from "./needyRegister/needyRegister.module";
import jahadiPanelModule from "./jahadiPanel/jahadiPanel.module";
import needyAddModule from "./needyAdd/needyAdd.module";

const panelModule = angular.module("panelModule", [
  "jahadiRegisterModule",
  "needyRegisterModule",
  "jahadiPanelModule",
  "needyAddModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
