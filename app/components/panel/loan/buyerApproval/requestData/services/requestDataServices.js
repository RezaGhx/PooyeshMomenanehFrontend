requestDataServices.$inject = ["$resource"];

function requestDataServices($resource) {

    return $resource(`${apiLeasing}/:type/:id/:routeParams`, {
        id: '@id',
        type: '@type',
        routeParams: '@routeParams'
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
        },

        getLeasing: {
            method: "GET",
            url: `${apiLeasing}/:type/:id/:routeParams`
        },

        submitLeasing: {
            method: "PUT",
            url: `${apiLeasing}/:type/:id/:routeParams`
        },

    });

}

module.exports = ngModule => {

    ngModule.factory('buyerApproval.requestDataServices', requestDataServices);

};