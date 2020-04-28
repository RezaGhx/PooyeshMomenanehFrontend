import needyAddRouting from './needyAdd.routes';

const needyAddModule = angular.module('needyAddModule', []);

needyAddModule.config(needyAddRouting);

export default needyAddModule;