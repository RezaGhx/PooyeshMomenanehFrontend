function isStartupTypeFilter() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
                type = 'نوپا'
                break;
            case 2:
                type = 'غیر نوپا'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter("isStartupTypeFilter", isStartupTypeFilter);
};