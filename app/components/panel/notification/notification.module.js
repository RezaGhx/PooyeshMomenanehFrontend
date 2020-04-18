import notificationRouting from './notification.routes';


const notificationModule = angular.module('notificationModule', []);

notificationModule.config(notificationRouting);

export default notificationModule;