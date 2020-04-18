function loanNumTypeFilter() {
    return function(value) {
      let type;
      switch (value) {
        case "1":
          type = "سرمایه در گردش";
          break;
        case "2":
          type = "نمونه سازی";
          break;
        case "3":
          type = "تولید صنعتی";
          break;
        case "4":
          type = "لیزینگ";
          break;
        default:
          break;
      }
      return type;
    };
  }
  module.exports = ngModule => {
    ngModule.filter("loanNumTypeFilter", loanNumTypeFilter);
  };
  