function loanTypeFilter() {
  return function(value) {
    let type;
    switch (value) {
      case "WorkingCapital":
        type = "سرمایه در گردش";
        break;
      case "Prototyping":
        type = "نمونه سازی";
        break;
      case "IndustrialProduction":
        type = "تولید صنعتی";
        break;
      case "Leasing":
        type = "لیزینگ";
        break;
      default:
        break;
    }
    return type;
  };
}
module.exports = ngModule => {
  ngModule.filter("loanTypeFilter", loanTypeFilter);
};
