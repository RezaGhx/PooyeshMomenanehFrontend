function serviceTypeFactory() {
    return function (value) {
        let type;
        switch (value) {
            case '':
            type = 0
            break;
            case '':
                type = 1
                break;
            case '':
                type = 2
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("serviceTypeFactory", serviceTypeFactory);
};