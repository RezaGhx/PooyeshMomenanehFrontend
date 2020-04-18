import ticketingRouting from './ticketing.routes';

const ticketingModule = angular.module('ticketingModule', []);

ticketingModule.config(ticketingRouting);

export default ticketingModule;