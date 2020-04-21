import panelRouting from "./panel.routes";
import notificationModule from "./notification/notification.module";
import ticketingModule from "./ticketing/ticketing.module";
import jahadiRegisterModule from "./jahadiRegister/jahadiRegister.module";

const panelModule = angular.module("panelModule", [
  "notificationModule",
  "ticketingModule",
  "jahadiRegisterModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
