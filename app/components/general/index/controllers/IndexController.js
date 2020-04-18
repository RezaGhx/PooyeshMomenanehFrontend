IndexController.$inject = ["general.IndexServices", "$auth", "$state", "$http"];

function IndexController(IndexServices, auth, state, http) {

    var self = this;

    let user = auth.user();
    self.user = {
        name: user.name,
        logo: user.logo
    }

    self.logout = function () {
        auth.logOut();
    };

   

};
module.exports = ngModule => {

    ngModule.controller('general.indexController', IndexController);

};