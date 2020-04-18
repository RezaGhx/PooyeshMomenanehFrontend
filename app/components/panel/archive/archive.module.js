import archiveRouting from './archive.routes';

const archiveModule = angular.module('archiveModule', []);

archiveModule.config(archiveRouting);

export default archiveModule;