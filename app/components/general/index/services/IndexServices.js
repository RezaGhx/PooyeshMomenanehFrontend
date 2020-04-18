IndexServices.$inject = ["$resource"];

function IndexServices($resource) {

    return $resource(`${apiGetWay}/:type/:id/:routePart`, { id: '@id', type: '@type',routePart:'@routePart' }, {

        query: { ignoreLoadingBar: true, method: "GET", isArray: true },

        create: { ignoreLoadingBar: true, method: "POST" },

        get: { ignoreLoadingBar: true, method: "GET" },

        remove: { ignoreLoadingBar: true, method: "DELETE" },

        update: { ignoreLoadingBar: true, method: "PUT" }

    });
    

}

module.exports = ngModule => {

    ngModule.factory('general.IndexServices', IndexServices);

};