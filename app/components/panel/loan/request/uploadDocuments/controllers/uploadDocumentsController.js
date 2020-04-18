uploadDocumentsController.$inject = [
    "panel.loan.request.uploadDocumentsServices",
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
	console.log(self.type);

    self.document = {};

    const getDocumentCompany = function () {
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
                console.log("error");
            }
        );
    };

    getDocumentCompany();

    const sendDocument = function (document) {
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

  // const request = function() {
  //   let parameter = {
  //     id: id
  //   };

  //   uploadDocumentsServices
  //     .sendRequest(parameter, {})
  //     .$promise.then(response => {
  //       iziToast.show(
  //         {
  //           message: response.message,
  //           theme: "light",
  //           color: "green"
  //         },
  //         errResponse => {
  //           console.log("error");
  //         }
  //       );
  //     });
  // };
  const checkValidation = function (documents) {
    let emptyDocument = documents.filter(
        x => x.attachment == null || x.isExpired
    );
    return emptyDocument.length;
};
  self.submit = function(documents) {
    if (checkValidation(documents) > 0) {
      iziToast.show({
        message: "لطفا تمامی مدارک را بارگزاری کنید",
        theme: "light",
        color: "red"
      });
    }
    // if (self.type == "Leasing") {
      else {
      // request();
      state.go("panel.loan.request.KnowledgeInformation");
    }
  //   else {
  //   request();
  //   state.go("panel.loan.request.loanInformation");
  // }
  };
    self.uploadLogo = function (file, type, index, typeTitle) {
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
                        self.document.Attachment = response.data[0].fileName;
                        self.document.TypeId = type;
                        self.document.ServiceType = 2;
                        self.document.typeTitle = typeTitle;
                        sendDocument(self.document);
                    },
                    function (resp) {
                        self.document = {};
                    },
                    function (evt) {
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

        
}

module.exports = ngModule => {
    ngModule.controller(
        "panel.loan.request.uploadDocumentsController",
        uploadDocumentsController
    );
};
