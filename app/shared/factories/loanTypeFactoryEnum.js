function loanTypeFactoryEnum() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
                type = "WorkingCapital";
                break;
            case 2:
                type = "Prototyping";
                break;
            case 3:
                type = "IndustrialProduction";
                break;
            case 4:
                type = "Leasing";
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("loanTypeFactoryEnum", loanTypeFactoryEnum);
};
