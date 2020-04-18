import requestRouting from './request.routes';

const requestModule = angular.module('requestModule', []);

requestModule.config(requestRouting);

export default requestModule;