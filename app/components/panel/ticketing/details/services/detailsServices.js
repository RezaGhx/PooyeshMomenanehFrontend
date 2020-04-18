detailsServices.$inject = ["$resource"];

function detailsServices($resource) {


    return $resource(`${apiGetWay}/:type/:id/:routeParams/:ticketId/:action`, {
        id: '@id',
        type: '@type',
        routeParams: '@routeParams',
        ticketId: '@ticketId',
        action : '@action' 
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

	ngModule.factory('panel.ticketing.detailsServices', detailsServices);

};