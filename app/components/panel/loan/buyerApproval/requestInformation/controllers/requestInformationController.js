requestInformationController.$inject = [
  "buyerApproval.requestInformationServices",
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
        state.go("panel.loan.buyerApproval.loanInformation");
      }
      self.loan = loanData;
    };
    getLoanData();
  }

  if (self.type == 4) {
    // self.vendor = {};
    // const getLoanData = function () {
    //   let leasingData = dataStore.getData("leasingReq");
    //   let notLoanDate = !Object.keys(leasingData).length;
    //   if (notLoanDate) {
    //     state.go("panel.loan.buyerApproval.requestData");
    //   }
    //   self.vendor = leasingData;
    // };
    // getLoanData();
    self.vendor = {};
    let leasingId = dataStore.getData();
    console.log(leasingId);
    self.vendor = leasingId;

    const getLeasingData = function () {
      let query = {
        type: "leasing-requests",
        id: requestId
      }
      self.promiseLoading = requestInformationServices.getLeasing(query).$promise.then(
        response => {
          self.vendor = response;
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
        }
      )
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
        console.log("ERror MACro");
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
        console.log("ERror MACro");
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
        console.log("ERror MACro");
      }
    );
  };

  getKnowledge();

    // console.log(id);
		self.submit = async function (vendor, form) {

				let query = {
					type: "leasing-requests",
					id: requestId,
					routeParams: "confirm-buyerInfo-by-buyer",
				}

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
		};
}

module.exports = ngModule => {
  ngModule.controller(
    "buyerApproval.requestInformationController",
    requestInformationController
  );
};
