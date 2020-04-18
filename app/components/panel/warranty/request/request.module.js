import requestRouting from './request.routes';

const requestModule = angular.module('warranty.requestModule', []);

requestModule.config(requestRouting);

export default requestModule;