function personTypeFilter() {
  return function(value) {
    let type;
    switch (value) {
      case 1:
        type = "حقیقی";
        break;
      case 2:
        type = "حقوقی";
        break;
      default:
        break;
    }
    return type;
  };
}
module.exports = ngModule => {
  ngModule.filter("personTypeFilter", personTypeFilter);
};
