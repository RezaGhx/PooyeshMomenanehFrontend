function loanIntroducerFilter() {
    return function (value) {
        let type;
        switch (value) {
            case 1:
                type = 'معاونت علمی و فناوری ریاست جمهوری'
                break;
            case 2:
                type = 'صندوق نوآوری و شکوفایی'
                break;
            case 3:
                type = 'پارک فناوری پردیس'
                break;
            case 4:
                type = 'صندوق توسعه فناوری های نوین'
                break;
            default:
                break;
        }
        return type;
    };
}
module.exports = ngModule => {
    ngModule.filter("loanIntroducerFilter", loanIntroducerFilter);
};