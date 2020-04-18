uploadDocumentsController.$inject = [
  "buyerApproval.uploadDocumentsServices",
  "Upload",
  "$state",
  "$auth",
  "$stateParams"
];

function uploadDocumentsController(
  uploadDocumentsServices,
  upload,
  state,
  auth,
  stateParams
) {
  var self = this;

  self.download = apiFileManagerGet + "/?id=";
  let id = stateParams.id;
  self.type = stateParams.type;

  self.document = {};

  const getDocumentCompany = function() {
    let query = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Documents",
      serviceType: 2
    };

    self.promiseLoading = uploadDocumentsServices.get(query).$promise.then(
      response => {
        self.company = response.content;
      },
      errResponse => {
        console.log("ERror MACro");
      }
    );
  };

  getDocumentCompany();

  const sendDocument = function(document) {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "Documents"
    };

    uploadDocumentsServices.create(parameter, document).$promise.then(
      response => {
        document = {};
        getDocumentCompany();
        // form.$setUntouched();
        // form.$setPristine();
        // iziToast.show({
        //   message: response.message,
        //   theme: "light",
        //   color: "green"
        // });
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("fail createYear");
      }
    );
  };

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
            self.document.Attachment = response.data[0].fileName;
            self.document.TypeId = type;
            self.document.ServiceType = 2;
            sendDocument(self.document);
          },
          function(resp) {
            self.document = {};
          },
          function(evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            if (progressPercentage < 100) {
              self.company[index].loadingShow = true;
            } else {
              self.company[index].loadingShow = false;
            }
          }
        );
    }
    console.log(self.company);
  };

  const checkValidation = function(documents) {
    let emptyDocument = documents.filter(x => x.attachment == null);
    return emptyDocument.length;
  };

  const request = function() {
    let parameter = {
      id: id
    };

    uploadDocumentsServices
      .sendRequest(parameter, {})
      .$promise.then(response => {
        iziToast.show(
          {
            message: response.message,
            theme: "light",
            color: "green"
          },
          errResponse => {
            console.log("ERror MACro");
          }
        );
      });
  };

  self.submit = function(documents) {
    if (checkValidation(documents) > 0) {
      iziToast.show({
        message: "لطفا تمامی مدارک را بارگزاری کنید",
        theme: "light",
        color: "red"
      });
    } else {
      // request();
      state.go("panel.loan.buyerApproval.KnowledgeInformation");
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "buyerApproval.uploadDocumentsController",
    uploadDocumentsController
  );
};
