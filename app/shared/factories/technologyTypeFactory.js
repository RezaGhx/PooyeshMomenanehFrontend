function technologyTypeFactory() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
                type = 'نفت و گاز'
                break;ks
            case 2:
                type = 'مخابرات'
                break;
            case 3:
                type = 'الکترونیک'
                break;
            case 4:
                type = 'مکانیک پیشرفته'
                break;
            case 5:
                type = 'هوا فضا'
                break;
            case 6:
                type = 'فناوری اطلاعات'
                break;
            case 7:
                type = 'نانو'
                break;
            case 8:
                type = 'پزشکی و دارو'
                break;
            case 9:
                type = 'رباتیک'
                break;
            case 10:
                type = 'سایر'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.factory("technologyTypeFactory", technologyTypeFactory);
};