function dateFromNow() {
    return function (inputDate) {
        if (inputDate) {
            var date = moment(inputDate, "jYYYY/jM/jD HH:mm").locale('fa').fromNow();
            return date;
        }
        return "invalid Date";
    };
}
module.exports = ngModule => {
    ngModule.filter("dateFromNow", dateFromNow);
};