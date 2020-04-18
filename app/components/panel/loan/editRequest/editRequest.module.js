import editRequestRouting from './editRequest.routes';

const editRequestModule = angular.module('editRequestModule', []);

editRequestModule.config(editRequestRouting);

export default editRequestModule;