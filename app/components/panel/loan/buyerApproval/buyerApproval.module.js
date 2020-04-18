import buyerApprovalRouting from './buyerApproval.routes';

const buyerApprovalModule = angular.module('buyerApprovalModule', []);

buyerApprovalModule.config(buyerApprovalRouting);

export default buyerApprovalModule;