function knowledgeBaseTypeFilter() {
  return function(value) {
    let type;
    switch (value) {
      case 1:
        type = "صنعتی";
        break;
      case 2:
        type = "خدماتی";
        break;
      default:
        break;
    }
    return type;
  };
}
module.exports = ngModule => {
  ngModule.filter("knowledgeBaseTypeFilter", knowledgeBaseTypeFilter);
};
