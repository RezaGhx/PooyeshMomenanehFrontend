requestInformationController.$inject = [
  "editRequest.requestInformationServices",
  "dataStore",
  "$state",
  "$auth",
  "$stateParams"
];

function requestInformationController(
  requestInformationServices,
  dataStore,
  state,
  auth,
  stateParams
) {
  var self = this;
  let id = auth.user().id;
  let requestId = stateParams.id;
  self.type = stateParams.type;

  self.company = {};

  if (self.type != 4) {
    self.loan = {};
    const getLoanData = function () {
      let loanData = dataStore.getData("loanReq");
      let notLoanDate = !Object.keys(loanData).length;
      if (notLoanDate) {
        state.go("panel.loan.editRequest.loanInformation");
      }
      self.loan = loanData;
    };
    getLoanData();
  }

  if (self.type == 4) {
    self.vendor = {};
    const getLeasingData = function () {
      let leasingData = dataStore.getData("leasingReq");
      let notLeasingDate = !Object.keys(leasingData).length;
      if (notLeasingDate) {
        state.go("panel.loan.editRequest.requestData");
      }
      self.vendor = leasingData;
    };
    getLeasingData();
  }

  const getCompanyInformation = function () {
    let query = {
      type: "LegalPersons",
      id: id,
      routeParams: "base-info"
    };
    requestInformationServices.get(query).$promise.then(
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

    requestInformationServices.get(query).$promise.then(
      response => {
        self.company.registry = response.content;
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

    requestInformationServices.get(query).$promise.then(
      response => {
        self.company.knowledge = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getKnowledge();

  if (self.type != 4) {
    self.submit = async function (loan, form) {
      if (form.$valid) {
        let parameter = {
          type: "legal-persons",
          id: "self",
          routeParams: "loan-requests",
          routeParams2: requestId,
          routeParams3: "loan-request-info"
        };

        await requestInformationServices.update(parameter, loan).$promise.then(
          response => {
            dataStore.removeData("loanReq");
            iziToast.show({
              message: response.message,
              theme: "light",
              color: "green"
            });
            state.go("panel.dashboard", {
              type: self.loan.type,
              id: response.content
            });
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

	if (self.type == 4) {
		self.submit = async function (vendor, form) {
			// if (form.$valid) {
				let query = {
					type: "legal-persons",
					id: "self",
					routeParams: "leasing-requests",
				}
				console.log(vendor);
				console.log(self.vendor);

				await requestInformationServices.submitLeasing(query, vendor).$promise.then(
					response => {
						dataStore.removeData("leasingReq");
						iziToast.show({
							message: response.message,
							theme: "light",
							color: "green"
						});
						state.go("panel.dashboard", {
							type: self.vendor.type,
							id: response.content
						});
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
			// }
		};
	}
}

module.exports = ngModule => {
  ngModule.controller(
    "editRequest.requestInformationController",
    requestInformationController
  );
};
