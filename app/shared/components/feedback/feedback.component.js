import {
    feedbackController
} from "./feedback.controller";

const bindings = {
    requestId: '<'
}

const feedbackComponent = {
    template: require('./feedback.html'),
    controller: feedbackController,
    controllerAs: 'self',
    bindings: bindings
}


module.exports = ngModule => {
    ngModule.component('feedbackComponent', feedbackComponent);
};