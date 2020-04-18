warrantyFactureController.$inject = ["$state", "$resource", "Upload"];

function warrantyFactureController(state, resource, upload) {
  var self = this;

  self.$onInit = function() {
    let warrantyId = self.warrantyId;

    let warrantyFactureDetailsServices = resource(
      `${apiWarranty}/WarrantyRequests/${warrantyId}/:routeParams`,
      {
        routeParams: "@routeParams"
      }
    );

    //لیست پرداختی های آنلاین و غیرآنلاین
    const getPaymentInformation = function() {
      let query = {
        routeParams: "payments"
      };

      self.promiseLoading = warrantyFactureDetailsServices
        .get(query)
        .$promise.then(
          response => {
            self.paymentInformation = response;
          },
          errResponse => {
            console.log("error");
          }
        );
    };

    getPaymentInformation();

    let callBackUrl =
      location.origin + location.pathname + "#!/warranty/paymentStatus/";
    self.submitOnline = function(amount, form) {
      if (form.$valid) {
        var command = {
          Amount: Number(amount),
          CallBackUrl: callBackUrl + warrantyId
        };

        let parameter = {
          routeParams: "online-payment"
        };

        warrantyFactureDetailsServices.save(parameter, command).$promise.then(
          response => {
            window.location.href = response.link;
          },
          errResponse => {
            iziToast.show({
              message: errResponse.data.message,
              theme: "light",
              color: "red"
            });
          }
        );
      } else {
        iziToast.show({
          message: "لطفا فرم را تکمیل کنید و سپس اقدام به ثبت فرمایید",
          theme: "light",
          color: "red"
        });
      }
    };

    //پرداخت غیرآنلاین
    self.offline = {};
    self.offlineAttachment = function(file) {
      if (file.length > 0) {
        upload
          .upload({
            url: apiFileManagerPost,
            data: {
              file: file
            }
          })
          .then(
            function(response) {
              self.offline.Attachment = response.data[0].fileName;
            },
            function(resp) {
              self.offline.Attachment = {};
            },
            function(evt) {
              var progressPercentage = parseInt(
                (100.0 * evt.loaded) / evt.total
              );
              if (progressPercentage < 100) {
                self.loadingShow = true;
              } else {
                self.loadingShow = false;
              }
            }
          );
      }
    };
    self.submitOfflinePay = function(offlinePay, form) {
      if (form.$valid) {
        if (
          self.offline.Attachment == {} ||
          self.offline.Attachment == undefined
        ) {
          return iziToast.show({
            message: "لطفا فیش واریزی را بارگزاری کنید.",
            theme: "light",
            color: "red"
          });
        }
        let parameter = {
          routeParams: "payment-type"
        };

        warrantyFactureDetailsServices
          .save(parameter, offlinePay)
          .$promise.then(
            response => {
              offlinePay = {};
              form.$setUntouched();
              form.$setPristine();
              iziToast.show({
                message: response.message,
                theme: "light",
                color: "green"
              });
              $("#exampleModal").modal("hide");
              $(".modal-backdrop").remove();
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
        iziToast.show({
          message: "لطفا فرم را تکمیل کنید و سپس اقدام به ثبت فرمایید",
          theme: "light",
          color: "red"
        });
      }
    };
  };
}

export { warrantyFactureController };
