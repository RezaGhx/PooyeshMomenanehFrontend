function genderFilter() {
    return function (value) {
        value = parseInt(value);
        let type;
        switch (value) {
            case 1:
                type = 'زن'
                break;
            case 2:
                type = 'مرد'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter('genderFilter', genderFilter);
};