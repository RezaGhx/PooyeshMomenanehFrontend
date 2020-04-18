detailsController.$inject = [
  "panel.warranty.detailsServices",
  "$rootScope",
  "$stateParams",
  "Upload",
  "$auth"
];

function detailsController(
  detailsServices,
  rootScope,
  stateParams,
  upload,
  auth
) {
  var self = this;
  let user = auth.user();

  self.requestId = stateParams.id;

  // جزئیات یک ضمانت نامه
  const getWarrantyDetails = function() {
    let query = {
      type: "warrantyRequests",
      id: "self",
      routeParams: self.requestId
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        self.details = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  
  };
  getWarrantyDetails();

  // دریافت اطلاعات تکمیلی نسبت به وثائق
  const getFurtherInformationBail = function() {
    let query = {
      type: "warrantyRequests",
      id: self.requestId,
      routeParams: "bailinfos"
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        self.documents = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };
  getFurtherInformationBail();

  //دانلود فایل قرارداد نهایی
  const finalContractFile = function(contractId) {
    let promise1 = new Promise(function(resolve, reject) {
      var url = `${rootScope.download}${contractId}`;
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("Authorization", "Bearer " + user.auth_token);
      req.responseType = "blob";
      req.onload = function(event) {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(req.response);
        }
      };
      req.send();
    });
    promise1
      .then(function(value) {
        var blob = value;
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "report.pdf";
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(reason => {
        console.log(reason);

        iziToast.show({
          message: "فایل مورد نظر یافت نشد.",
          theme: "light",
          color: "red"
        });
      });
  };

  self.finalContractFile = function() {
    let query = {
      type: "warrantyRequests",
      id: self.requestId,
      routeParams: "signedContract"
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        finalContractFile(response.content);
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  //بارگذاری تصویر گواهی امضای صاحبان امضا
  const getSighRightMembers = function() {
    let query = {
      type: "LegalPersons",
      id: self.requestId,
      routeParams: "Documents",
      serviceType: 1
    };

    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        self.sightRightFile = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  getSighRightMembers();

  self.uploadLogo = function(file, type, index) {
    if (file.length > 0) {
      upload
        .upload({
          url: apiFileManagerPost,
          data: {
            file: file
          }
        })
        .then(
          function(response) {
            self.sightRightFile.Attachment = response.data[0].fileName;
            self.sightRightFile.TypeId = type;
            self.sightRightFile.ServiceType = 1;
          },
          function(resp) {
            self.sightRightFile = {};
          },
          function(evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            if (progressPercentage < 100) {
              self.sightRightFile[index].loadingShow = true;
            } else {
              self.sightRightFile[index].loadingShow = false;
            }
          }
        );
    }
  };
}

module.exports = ngModule => {
  ngModule.controller("panel.warranty.detailsController", detailsController);
};
