function companyTypeFilter() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
            type = 'سهامی خاص'
            break;
            case 2:
                type = 'مسئولیت محدود'
                break;
            case 3:
                type = 'سهامی عام'
                break;
            case 4:
                type = 'تعاونی'
                break;
            case 5:
                type = 'تضامینی'
                break;
            case 6:
                type = 'موسسه غیر تجاری'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter("companyTypeFilter", companyTypeFilter);
};