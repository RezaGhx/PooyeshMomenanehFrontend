function dataStore() {
  let storedData, newData;
  let temporaryData = {

  };

  return {
    getData: getData,
    setData: setData,
    updateData: updateData,
    removeData: removeData
  };

  function getData() {
    return temporaryData;
    // return JSON.parse(storedData);
  }

  /**
   * @param {string} storeName The string
   * @param {object} value The object
   */
  function setData(storeName, value) {

    if (typeof value === "object") {
      // newData = JSON.stringify(value);
      // temporaryData["value"];
      Object.assign(temporaryData, value)
    } else {
      throw new Error("Set Data ");
    }
  }
 
  function updateData(storeName, value) {
    storedData = getData(storeName);
    newData = Object.assign(storedData, value);
    setData(storeName, newData);
  }

  function removeData(storeName) {
    temporaryData = {};
  }
}

module.exports = ngModule => {
  ngModule.factory("dataStore", dataStore);
};