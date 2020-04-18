IndexController.$inject = ["panel.IndexServices", "$scope", "$state", "$auth"];

function IndexController(IndexServices, scope, state, auth) {

    var self = this;

    self.state = state;
    let user = auth.user();
    self.user = {
        name: user.name,
        logo: user.logo
    }

    scope.$on("logoId", function (event, data) {
        self.user.logo = data;
    }); 
    
    self.logout = function () {
        auth.logOut();
    };

};

module.exports = ngModule => {

    ngModule.controller('panel.IndexController', IndexController);

};