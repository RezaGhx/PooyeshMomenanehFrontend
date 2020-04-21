import jahadiRegisterRouting from './jahadiRegister.routes';

const jahadiRegisterModule = angular.module('jahadiRegisterModule', []);

jahadiRegisterModule.config(jahadiRegisterRouting);

export default jahadiRegisterModule;