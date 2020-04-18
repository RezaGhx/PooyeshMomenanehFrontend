listController.$inject = ["panel.warranty.listServices"];

function listController(listServices){

    var self = this;

}

module.exports = ngModule => {

	ngModule.controller('panel.warranty.listController', listController);

};