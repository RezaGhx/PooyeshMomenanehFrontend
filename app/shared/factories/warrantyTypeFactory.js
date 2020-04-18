function warrantyTypeFactory() {
    return function (value) {
        let type;
        switch (value) {
            case 'tender':
                type = 0
                break;
            case 'prepaidContract':
                type = 1
                break;
            case 'goodFulfillmentOfObligations':
                type = 2
                break;
            case 'credit':
                type = 3
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("warrantyTypeFactory", warrantyTypeFactory);
};