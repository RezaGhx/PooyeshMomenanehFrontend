uploadDocumentsController.$inject = [
    "panel.warranty.request.uploadDocumentsServices",
    "Upload",
    "$state",
    "$auth"
];

function uploadDocumentsController(
    uploadDocumentsServices,
    upload,
    state,
    auth
) {
    var self = this;

    self.download = apiFileManagerGet + "/?id=";
    let id = auth.user().id;
    self.document = {};

    const getDocumentCompany = function () {
        let query = {
            type: "LegalPersons",
            id: "self",
            routeParams: "Documents",
            serviceType: 1
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
                getDocumentCompany();

                // document = {};
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

    self.uploadLogo = function (file, type, index) {
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
                        self.document.ServiceType = 1;
                        // imageHandler(self.company.DocumentType, self.company.AttachmentId);
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

    console.log(self.company);

    const checkDocuments = function (documents) {
       
        let directorSign = documents.filter(x => x.attachment == null || x.isExpired);
        return directorSign.length;
    };

    self.submit = function (company) {
        if (checkDocuments(company) > 0) {
            return iziToast.show({
                message: "لطفا تمامی مدارک را بارگزاری کنید",
                theme: "light",
                color: "red"
            });
        } else {
            state.go("panel.warranty.request.warrantyInformation");
        }
    };
}

module.exports = ngModule => {
    ngModule.controller(
        "panel.warranty.request.uploadDocumentsController",
        uploadDocumentsController
    );
};
