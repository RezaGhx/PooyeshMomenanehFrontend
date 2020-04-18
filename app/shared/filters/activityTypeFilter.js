function activityTypeFilter() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
            type = 'تولیدی'
            break;
            case 2:
                type = 'توزیعی'
                break;
            case 3:
                type = 'بازرگانی داخلی'
                break;
            case 4:
                type = 'بازرگانی خارجی'
                break;
            case 5:
                type = 'آزمایشگاهی/ تحقیقاتی'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter('activityTypeFilter', activityTypeFilter);
};