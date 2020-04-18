import basicAssessmentRouting from './basicAssessment.routes';

const basicAssessmentModule = angular.module('basicAssessmentModule', []);

basicAssessmentModule.config(basicAssessmentRouting);

export default basicAssessmentModule;