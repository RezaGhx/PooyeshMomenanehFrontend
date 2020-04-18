import 'bootstrap/js/dist/modal';
import { log } from 'util';

AppController.$inject = ["$state", "$rootScope", "$auth"];

function AppController(state, rootScope, auth) {

    var self = this;

    self.title = projectTitle;

    self.state = state;
    rootScope.download = apiFileManagerGet + "/?id=";


    self.logout = function() {
        auth.logOut();
    };

    rootScope.hideModal = function(modalId) {
        $(`#${modalId}`).modal('hide');
        $("body").removeClass("modal-open");
        $(".modal").removeClass("show");
        $(".modal-backdrop").remove();
    };

}


module.exports = ngModule => {
    ngModule.controller('AppController', AppController);
};