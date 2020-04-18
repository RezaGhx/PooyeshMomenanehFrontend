function leasingCustomerType() {
    return function(value) {
      let type;
      switch (value) {
        case "Seller":
          type = "فروشنده";
          break;
        case "Buyer":
          type = "خریدار";
          break;
        default:
          break;
      }
      return type;
    };
  }
  module.exports = ngModule => {
    ngModule.filter("leasingCustomerType", leasingCustomerType);
  };
  