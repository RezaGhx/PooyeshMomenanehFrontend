function jalaliDateFilter() {
  return function(inputDate, format) {
    if (inputDate) {
      var date = moment(inputDate, "jYYYY/jM/jD HH:mm:ss")
        .locale("fa")
        .format(format);
      return date;
    }
    return "invalid Date";
  };
}
module.exports = ngModule => {
  ngModule.filter("jalaliDateFilter", jalaliDateFilter);
};
