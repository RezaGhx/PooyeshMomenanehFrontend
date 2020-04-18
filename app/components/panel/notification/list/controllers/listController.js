listController.$inject = ["panel.notification.listServices"];

function listController(listServices){

    var self = this;

}

module.exports = ngModule => {

	ngModule.controller('panel.notification.listController', listController);

};