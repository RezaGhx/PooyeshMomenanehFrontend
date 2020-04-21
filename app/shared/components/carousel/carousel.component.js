import {
    carouselController
} from "./carousel.controller";

const bindings = {
    someOutput: '&'
}

const carouselComponent = {
    template: require('./carousel.html'),
    controller: carouselController,
    controllerAs: 'self',
    bindings: bindings
}


module.exports = ngModule => {
    ngModule.component('carouselComponent', carouselComponent);
};