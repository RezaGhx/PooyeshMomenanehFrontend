warrantyChooseCommitteeController.$inject = ["$state", "$resource"];

function warrantyChooseCommitteeController(state, resource) {
  var self = this;

  self.$onInit = function() {
    let warrantyId = self.warrantyId;

    let warrantyChooseCommitteeDetailsServices = resource(
      `${apiWarranty}/WarrantyRequests/bailOption`
    );
    let warrantyGetCommitteeDetailsServices = resource(
      `${apiWarranty}/WarrantyRequests/${warrantyId}/bailOptions`
    );

    const getWarrantyBail = function() {
      self.promiseLoading = warrantyGetCommitteeDetailsServices
        .get({})
        .$promise.then(
          response => {
            self.bail = response.content;
          },
          errResponse => {
            console.log("error");
          }
        );
    };
    getWarrantyBail();

    self.submitWarrantyBail = function(form, bailId) {
      if (form.$valid) {
        let parameter = {
          warrantyRequestId: warrantyId,
          selectedBailOptionId: bailId
        };
        warrantyChooseCommitteeDetailsServices
          .save({}, parameter)
          .$promise.then(
            response => {
              state.go("panel.dashboard");
              iziToast.show({
                message: response.message,
                theme: "light",
                color: "green"
              });
            },
            errResponse => {
              console.log("error");
            }
          );
      } else {
        iziToast.show({
          message: "لطفا یکی از موارد را انتخاب کنید",
          theme: "light",
          color: "red"
        });
      }
    };
  };
}

export { warrantyChooseCommitteeController };
