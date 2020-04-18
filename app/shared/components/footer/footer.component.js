import {
    footerController
} from "./footer.controller";

const bindings = {
    someOutput: '&'
}

const footerComponent = {
    template: require('./footer.html'),
    controller: footerController,
    controllerAs: 'self',
    bindings: bindings
}


module.exports = ngModule => {
    ngModule.component('footerComponent', footerComponent);
};