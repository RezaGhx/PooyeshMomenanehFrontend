import completeRequestRouting from './completeRequest.routes';

const completeRequestModule = angular.module('completeRequestModule', []);

completeRequestModule.config(completeRequestRouting);

export default completeRequestModule;