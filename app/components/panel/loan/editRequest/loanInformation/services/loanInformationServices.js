loanInformationServices.$inject = ["$resource"];

function loanInformationServices($resource) {

    return $resource(`${apiLoan}/:type/:id/:routeParams/:routeParams2/:routeParams3`, {
        id: '@id',
        type: '@type',
        routeParams: '@routeParams',
        routeParams2: '@routeParams2',
        routeParams3: '@routeParams3',
    }, {

        query: {
            method: "GET",
            isArray: true
        },

        create: {
            method: "POST"
        },

        get: {
            method: "GET"
        },

        remove: {
            method: "DELETE"
        },

        update: {
            method: "PUT"
        }

    });

}

module.exports = ngModule => {

    ngModule.factory('editRequest.loanInformationServices', loanInformationServices);

};