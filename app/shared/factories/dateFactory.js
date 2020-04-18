function dateFactory() {
  /**
   * convert georgia dateTime to persian dateTime
   * with custom format.
   * @param inputDate you should pass dateTime value for convert.
   * @param format When pass inputDate, sync format of dateTime with this argument.
   * @returns {string}
   */
  function convertPersianCalender(inputDate, format) {
    if (inputDate) {
      var date = moment(inputDate)
        .locale("fa")
        .format(format);
      return date;
    }
  }

  /**
   * format persian dateTime to persian dateTime
   * with custom format.
   * @param inputDate you should pass dateTime value for format.
   * @param format When pass inputDate, sync format of dateTime with this argument.
   * @returns {string}
   */
  function persianCalenderFormat(inputDate, format) {
    if (inputDate) {
      console.log(inputDate);

      var date = moment(inputDate).format(format);
      console.log(date);

      return date;
    }
  }

  function georgiaCalender(inputDate, format) {
    if (inputDate) {
      var date = moment(inputDate).format(format);
      return date;
    }
  }
  //public API for work with dateTime
  return {
    georgiaCalender: georgiaCalender,
    convertPersianCalender: convertPersianCalender,
    persianCalenderFormat: persianCalenderFormat
  };
}
module.exports = ngModule => {
  ngModule.factory("dateFactory", dateFactory);
};
