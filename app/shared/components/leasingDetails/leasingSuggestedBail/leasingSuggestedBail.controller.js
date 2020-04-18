leasingSuggestedBailController.$inject = ["$state", "$resource", "$scope", "$stateParams", "$rootScope"];

function leasingSuggestedBailController(state, resource, scope, stateParams, rootScope) {
  var self = this;

  self.$onInit = function () {
    let leasingId = stateParams.id;
    console.log(leasingId);

    let leasingSuggestedBailDetailsServices = resource(
      `${apiLeasing}/leasing-requests/${leasingId}/committee-approval`,
      {
        routeParams: "@routeParams"
      },
      {
        update: {
          method: "PUT"
        }
      }
    );

    let leasingSelectedScenarioDetailsServices = resource(`${apiLeasing}/leasing-requests/${leasingId}/suggested-bails/latest/scenario`);

    let protestService = resource(
      `${apiLeasing}/leasing-requests/${leasingId}/committee-approval/protest`,
      {},
      {
        update: {
          method: "PATCH"
        }
      }
    );

		const getSelectedBail = function () {	
			self.promiseLoading = leasingSelectedScenarioDetailsServices	
				.get({})	
				.$promise.then(	
					response => {	
						self.selectedBail = JSON.stringify(response.content);	
					},	
					errResponse => {	
						console.log("error");	
					}	
				);	
		};

    const getLoanBail = function () {	
			self.promiseLoading = leasingSuggestedBailDetailsServices	
				.get({})	
				.$promise.then(	
					response => {	
						self.bail = response.content;	
						getSelectedBail();	
					},	
					errResponse => {	
						console.log("error");	
					}	
				);	
		};	
		getLoanBail();


    self.selectBail = function (form) {	
			if (form.$valid) {

        let currentStatus = 42;	
        
        scope.$emit("currentStatus", currentStatus);
        let selectedBail = JSON.parse(self.selectedBail);	
				scope.$emit("child1", selectedBail);
			} else {	
				iziToast.show({	
					message: "لطفا یکی از موارد را انتخاب کنید",	
					theme: "light",	
					color: "red"
				});	
			}	
		};


    self.protestLeasing = function (initialReview) {
      let command = {
        description: self.initialReview.description
      };

      return protestService.update(initialReview, command)
        .$promise.then(
          response => {
            iziToast.show({
              message: response.message,
              theme: "light",
              color: "green"
            });
            rootScope.hideModal("protest");
            state.go("panel.servicesManagement.loanList");
          },
          errResponse => {
            iziToast.show({
              message: errResponse.data.message,
              theme: "light",
              color: "red"
            });
            console.log("ERror MACro");
          }
        );
    };


  };
}

export { leasingSuggestedBailController };
