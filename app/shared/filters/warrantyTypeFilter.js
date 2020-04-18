function warrantyTypeFilter() {
    return function (value) {
        let type;
        switch (value) {
            case 0:
                type = 'شرکت در مناقصه'
                break;
            case 1:
                type = 'پیش پرداخت قرارداد'
                break;
            case 2:
                type = 'حسن انجام تعهدات'
                break;
            case 3:
                type = 'اعتباری'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter("warrantyTypeFilter", warrantyTypeFilter);
};