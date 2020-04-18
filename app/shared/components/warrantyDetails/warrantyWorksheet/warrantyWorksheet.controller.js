warrantyWorksheetController.$inject = [
  "$state",
  "$resource",
  "Upload",
  "$auth"
];

function warrantyWorksheetController(state, resource, upload, auth) {
  var self = this;
  self.Managementmessage;

  self.$onInit = function () {
    let warrantyId = self.warrantyId;
    console.log(self.mydescript);
    let warrantyWorksheetDetailsServices = resource(
      `${apiWarranty}/WarrantyRequests/${warrantyId}/worksheet`
    );

    let user = auth.user();

    self.downloadTemplate = function () {
      let promise1 = new Promise(function (resolve, reject) {
        var url = `${apiWarranty}/warrantyRequests/worksheet/template`;
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + user.auth_token);
        req.responseType = "blob";
        req.onload = function (event) {
          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject(req.response);
          }
        };
        req.send();
      });
      return promise1
        .then(function (value) {
          var blob = value;
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "worksheetTemplate.docx";
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch(reason => {
          iziToast.show({
            message: "فایل مورد نظر یافت نشد.",
            theme: "light",
            color: "red"
          });
        });
    };

    self.worksheetAttachment = null;
    self.worksheetAttachmentFileName = "";
    self.uploadWorksheetAttachment = function (file) {
      if (file.length > 0) {
        upload
          .upload({
            url: apiFileManagerPost,
            data: {
              file: file
            }
          })
          .then(
            function (response) {
              console.log("Ok");
              self.worksheetAttachment = response.data[0].fileName;
            },
            function (resp) {
              console.log("NOk");
              self.worksheetAttachment = null;
            },
            function (evt) {
              var progressPercentage = parseInt(
                (100.0 * evt.loaded) / evt.total
              );
              if (progressPercentage < 100) {
                self.loadingShow = true;
              } else {
                self.loadingShow = false;
              }
            }
          );
      }
    };

    self.submitWorksheet = function () {
      if (self.worksheetAttachment != null) {
        let command = {
          workSheet: self.worksheetAttachment
        };

        warrantyWorksheetDetailsServices.save({}, command).$promise.then(
          response => {
            iziToast.show({
              message: response.message,
              theme: "light",
              color: "green"
            });
            state.go("panel.dashboard");
          },
          errResponse => {
            iziToast.show({
              message: errResponse.data.message,
              theme: "light",
              color: "red"
            });
          }
        );
      } else {
        iziToast.show({
          message: "فایل کاربرگ را آپلود نمایید.",
          theme: "light",
          color: "red"
        });
      }
    };
  };

  self.$onChanges = function ({ descript }) {
    if (angular.isDefined(descript)) {
      if (descript.currentValue) {
        self.Managementmessage = descript.currentValue;
      }
    }
  };

 
  
}

export { warrantyWorksheetController };
