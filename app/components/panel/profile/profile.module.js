import profileRouting from './profile.routes';


const profileModule = angular.module('profileModule', []);

profileModule.config(profileRouting);

export default profileModule;