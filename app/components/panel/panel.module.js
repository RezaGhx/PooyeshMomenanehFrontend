import panelRouting from "./panel.routes";
import notificationModule from "./notification/notification.module";
import warrantyModule from "./warranty/warranty.module";
import loanModule from "./loan/loan.module";
import profileModule from "./profile/profile.module";
import ticketingModule from "./ticketing/ticketing.module";
import archiveModule from "./archive/archive.module";
import basicAssessmentModule from "./basicAssessment/basicAssessment.module";

const panelModule = angular.module("panelModule", [
  "warrantyModule",
  "loanModule",
  "notificationModule",
  "profileModule",
  "ticketingModule",
  "archiveModule",
  "star-rating",
  "basicAssessmentModule"
]);

panelModule.config(panelRouting);

export default panelModule;
