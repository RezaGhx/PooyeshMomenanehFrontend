loanWorksheetController.$inject = [
    "$state",
    "$resource",
    "Upload",
    "$rootScope"
];

function loanWorksheetController(state, resource, upload, rootScope) {
    var self = this;

    self.$onInit = function () {
        let loanId = self.loanId;

        let loanWorksheetDetailsServices = resource(
            `${apiLoan}/loan-requests/${loanId}/work-sheet`,
            {},
            {
                update: {
                    method: "PUT"
                }
            }
        );
        let loanDownloadWorksheetDetailsServices = resource(
            `${apiLoan}/loan-requests/${loanId}/work-sheet/template`
        );

        //مشاهده کاربرگ و آپلود
        self.downloadServiceSheet = function () {
            loanDownloadWorksheetDetailsServices.get({}).$promise.then(
                response => {
                    let fileId = response.content;                    
                    window.open(rootScope.download + fileId, "_blank");
                },
                errResponse => {
                    iziToast.show({
                        message: errResponse.data.message,
                        theme: "light",
                        color: "red"
                    });
                }
            );
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

                loanWorksheetDetailsServices.update({}, command).$promise.then(
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
}

export { loanWorksheetController };
