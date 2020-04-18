function salesTypeFilter() {
  return function(value) {
    let type;

    switch (value) {
      case 1:
        type = "فاکتوری";
        break;
      case 2:
        type = "قرارداد";
        break;
      default:
        break;
    }
    return type;
  };
}
module.exports = ngModule => {
  ngModule.filter("salesTypeFilter", salesTypeFilter);
};
