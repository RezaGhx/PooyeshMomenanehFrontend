gettingStartServices.$inject = ["$resource"];

function gettingStartServices($resource){

        return $resource(`${apiGetWay}/:type/:id`, {id: '@id',type: '@type'}, {

            query: { method: "GET", isArray: true },

            create: { method: "POST"},

            get: { method: "GET"},

            remove: { method: "DELETE"},

            update: { method: "PUT"}

        });

}

module.exports = ngModule => {

	ngModule.factory('panel.warranty.gettingStartServices', gettingStartServices);

};