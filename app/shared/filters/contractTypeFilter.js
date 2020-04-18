function contractTypeFilter() {
  return function(value) {
    let type;
    switch (value) {
      case 1:
        type = "جعاله";
        break;
      case 2:
        type = "قرض الحسنه";
        break;
      case 3:
        type = "فروش اقساطی";
        break;
      default:
        break;
    }
    return type;
  };
}
module.exports = ngModule => {
  ngModule.filter("contractTypeFilter", contractTypeFilter);
};
