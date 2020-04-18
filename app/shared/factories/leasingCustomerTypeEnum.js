function leasingCustomerTypeEnum() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
                type = "Seller";
                break;
            case 2:
                type = "Buyer";
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("leasingCustomerTypeEnum", leasingCustomerTypeEnum);
};
