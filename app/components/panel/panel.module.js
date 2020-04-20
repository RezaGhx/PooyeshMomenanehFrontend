import panelRouting from "./panel.routes";
import notificationModule from "./notification/notification.module";
import ticketingModule from "./ticketing/ticketing.module";

const panelModule = angular.module("panelModule", [
  "notificationModule",
  "ticketingModule",
  "star-rating",
]);

panelModule.config(panelRouting);

export default panelModule;
