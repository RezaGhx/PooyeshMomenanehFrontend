paymentStatusController.$inject = [
  "panel.warranty.paymentStatusServices",
  "$stateParams",
  "$location"
];

function paymentStatusController(paymentStatusServices, stateParams, location) {
  var self = this;
  self.bankImage = require("../../../../../shared/images/bank-logo.svg");

  self.id = stateParams.id;
  self.saleOrderId = location.search();

  self.onlinePayment = async function() {
    let parameter = {
      type: "warrantyRequest",
      id: self.id,
      routeParams: "online-payment-verification"
    };
    let command = {
      amount: self.saleOrderId.Amount,
      trackingCode: self.saleOrderId.SaleOrderId,
      token: self.saleOrderId.Token
    };

    await paymentStatusServices.create(parameter, command).$promise.then(
      response => {
        $("body").append(response.content);
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
      }
    );
  };
  self.onlinePayment();
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.warranty.paymentStatusController",
    paymentStatusController
  );
};
