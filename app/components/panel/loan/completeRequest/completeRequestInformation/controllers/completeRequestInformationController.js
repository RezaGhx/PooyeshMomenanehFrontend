completeRequestInformationController.$inject = [
    "completeRequest.completeRequestInformationServices",
    "NgTableParams",
    "dataStore",
    "$state",
    "$auth"
];

function completeRequestInformationController(
    completeRequestInformationServices,
    NgTableParams,
    dataStore,
    state,
    auth
) {
    var self = this;
    let id = auth.user().id;
    self.company = {};

    self.company = {
        directorMembers: []
    };

    let pp = function (directorMembers) {
        self.tableParams = new NgTableParams({}, {
            dataset: directorMembers,
            page: 1,
            count: 5,
            counts: []
        });
    };

    self.warrantyInformation = {};
    const getWarrantyData = function () {
        self.warrantyInformation = dataStore.getData();
    };
    getWarrantyData();

    const getCompanyInformation = function () {
        let query = {
            type: "LegalPersons",
            id: id,
            routeParams: "base-info"
        };

        completeRequestInformationServices.get(query).$promise.then(
            response => {
                self.company.info = response.content;
            },
            errResponse => {
                console.log("error");
            }
        );
    };

    getCompanyInformation();

    const getRegistryInformation = function () {
        let query = {
            type: "LegalPersons",
            id: id,
            routeParams: "registration-info"
        };

        completeRequestInformationServices.get(query).$promise.then(
            response => {
                self.company.registry = response.content;
                // let directorMembers = response.content.directorMembers;
                // pp(directorMembers)
            },
            errResponse => {
                console.log("error");
            }
        );
    };

    getRegistryInformation();

    const getKnowledge = function () {
        let query = {
            type: "LegalPersons",
            id: id,
            routeParams: "special-memberships"
        };

        completeRequestInformationServices.get(query).$promise.then(
            response => {
                self.company.knowledge = response.content;
                console.log(self.company.knowledge);

            },
            errResponse => {
                console.log("error");
            }
        );
    };

    getKnowledge();


    const getDirectorMember = function () {
        let query = {
          type: "LegalPersons",
          id: id,
          routeParams: "director-members"
        };
    
        self.promiseLoading =  completeRequestInformationServices.get(query).$promise.then(
          response => {
            let directorMembers = response.content;
            pp(directorMembers);
            // directorMembers.forEach(member => {
            //   self.companyDir.directorMembers.push(member);
            // });
            self.tableParams.reload();
          },
          errResponse => {
            console.log("error");
          }
        );
      };
    
      getDirectorMember();

    self.submit = async function(company, form) {
        console.log(self.company);
    
        if (form.$valid) {
          let parameter = {
            type: "WarrantycompleteRequest",
            id: 'self',
            routeParams: "warranty-completeRequest"
          };
    
         await completeRequestInformationServices.create(parameter, company).$promise.then(
            response => {
              company = {};
              form.$setUntouched();
              form.$setPristine();
              // iziToast.show({
              //   message: response.message,
              //   theme: "light",
              //   color: "green"
              // });
    
              state.go("panel.dashboard");
            },
            errResponse => {
              iziToast.show({
                message: errResponse.data.message,
                theme: "light",
                color: "red"
              });
              console.log("fail createYear");
            }
          );
        } else {
          
        }
      };
}

module.exports = ngModule => {
    ngModule.controller(
        "completeRequest.completeRequestInformationController",
        completeRequestInformationController
    );
};