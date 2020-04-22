import needyListRouting from './needyList.routes';

const needyListModule = angular.module('needyListModule', []);

needyListModule.config(needyListRouting);

export default needyListModule;