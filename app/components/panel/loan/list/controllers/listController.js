listController.$inject = ["loan.listServices"];

function listController(listServices){

    var self = this;

}

module.exports = ngModule => {

    ngModule.controller('loan.listController', listController);

};