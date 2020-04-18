import loanRouting from './loan.routes';

import { requestModule } from "./request/request.module";
import { completeRequestModule } from "./completeRequest/completeRequest.module";
import { editRequestModule } from "./editRequest/editRequest.module";
import { buyerApprovalModule } from "./buyerApproval/buyerApproval.module";
const loanModule = angular.module('loanModule', ["requestModule", "completeRequestModule","editRequestModule","buyerApprovalModule"]);

loanModule.config(loanRouting);

export default loanModule;