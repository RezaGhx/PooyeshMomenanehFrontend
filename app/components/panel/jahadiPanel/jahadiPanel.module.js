import jahadiPanelRouting from './jahadiPanel.routes';

const jahadiPanelModule = angular.module('jahadiPanelModule', []);

jahadiPanelModule.config(jahadiPanelRouting);

export default jahadiPanelModule;