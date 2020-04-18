directorsInformationServices.$inject = ["$resource"];

function directorsInformationServices($resource) {

    return $resource(`${apiGetWay}/:type/:id/:routeParams/:routeParams2/:routeParams3`, { id: '@id', type: '@type', routeParams: '@routeParams', routeParams2: '@routeParams2', routeParams3: '@routeParams3' }, {

        query: { method: "GET", isArray: true },

        create: { method: "POST" },

        get: { method: "GET" },

        remove: { method: "DELETE" },

        update: { method: "PUT" }

    });

}

module.exports = ngModule => {

    ngModule.factory('completeRequest.directorsInformationServices', directorsInformationServices);

};