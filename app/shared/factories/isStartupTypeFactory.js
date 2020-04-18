function isStartupTypeFactory() {
    return function (value) {
        let type;
        switch (value) {
            case true:
                type = 'نوپا'
                break;
            case false:
                type = 'غیر نوپا'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("isStartupTypeFactory", isStartupTypeFactory);
};