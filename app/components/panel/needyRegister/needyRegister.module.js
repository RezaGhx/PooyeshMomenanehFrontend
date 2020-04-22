import needyRegisterRouting from './needyRegister.routes';

const needyRegisterModule = angular.module('needyRegisterModule', []);

needyRegisterModule.config(needyRegisterRouting);

export default needyRegisterModule;