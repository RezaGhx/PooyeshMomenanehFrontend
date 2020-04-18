leasingSigningContractController.$inject = [
    "$state",
    "$resource",
    "$auth",
    "Upload",
    "$stateParams"
];

function leasingSigningContractController(state, resource, auth, upload, stateParams) {
    var self = this;
    self.download = apiFileManagerGet + "/?id=";
    console.log(apiFileManagerGet);
    let attachmentId;
    self.$onInit = function () {
        let leasingId = stateParams.id;

        let leasingFacilityContractDetailsServices = resource(
            `${apiLeasing}/legal-persons/self/leasing-requests/${leasingId}/signed-contract`
        );

        let leasingContractFileService = resource(
            `${apiLeasing}/leasing-requests/${leasingId}`
        );

        let DirectorMembersSignsService = resource(
            `${apiGetWay}/LegalPersons/self/:routeParams`,
            {
                routeParams: "@routeParams",
                routeParams2: "@routeParams2",
                routeParams3: "@routeParams3"
            }
        );

        let DirectorMembersSignsUploadServices = resource(
            `${apiGetWay}/LegalPersons/self/director-members/:directorId/sign-evidence`,
            {
                directorId: "@directorId"
            }
        );

        const getLeasingDetails = function () {
            self.promiseLoading = leasingContractFileService.get({}).$promise.then(
                response => {
                    self.vendor = response;
                },
                errResponse => {
                    iziToast.show({
                        message: errResponse.data.message,
                        theme: "light",
                        color: "red"
                    });
                }
            )
        };
        getLeasingDetails();

        //بارگزاری امضای اعضای هئیت مدیره
        const getDirectorDocuments = function () {
            let query = {
                routeParams: "director-members"
            };

            self.promiseLoading = DirectorMembersSignsService
                .get(query)
                .$promise.then(
                    response => {
                        self.directorDocuments = response.content;
                    },
                    errResponse => {
                        console.log("error");
                    }
                );
        };

        getDirectorDocuments();

        self.uploadDirector = function (file, index, directorId) {
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
                            let attachmentId = response.data[0].fileName;
                            uploadDirectorDocuments(attachmentId, directorId);
                        },
                        function (resp) {
                            self.directorDocuments[index].attachment = null;
                        },
                        function (evt) {
                            var progressPercentage = parseInt(
                                (100.0 * evt.loaded) / evt.total
                            );
                            if (progressPercentage < 100) {
                                self.directorDocuments[index].loadingShow = true;
                            } else {
                                self.directorDocuments[index].loadingShow = false;
                            }
                        }
                    );
            }
        };

        let uploadDirectorDocuments = function (attachment, directorId) {
            let parameter = {
                directorId: directorId,
            };

            let command = {
                attachment: attachment
            };

            DirectorMembersSignsUploadServices
                .save(parameter, command)
                .$promise.then(
                    response => {
                        iziToast.show({
                            message: response.message,
                            theme: "light",
                            color: "green"
                        });
                    },
                    errResponse => {
                        iziToast.show({
                            message: errResponse.data.message,
                            theme: "light",
                            color: "red"
                        });
                        console.log("error");
                    }
                );
        };
        const checkDirectorSignValidation = function (documents) {
            let directorSign = documents.filter(x => x.signEvidence == null);
            return directorSign.length;
        };


        self.uploadContractFile = function (file) {
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
                            self.contractFile = response.data[0].fileName;
                            // sendContractFile(self.contractFile);
                        },
                        function (resp) {
                            self.contractFile = {};
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
                            console.log(progressPercentage);
                        }
                    );
            }
        };


        //دانلود قرارداد تنظیم شده
        let user = auth.user();
        self.getContractFile = function () {
            let command = { fileUri: `${apiFileManagerGet}/${attachmentId}` }
            let promise1 = new Promise(function (resolve, reject) {
                var url = `${gateway}/fileConverter/files/doc/convert/pdf`;
                var req = new XMLHttpRequest();
                req.open("POST", url, true);
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
                req.send(JSON.stringify(command));
            });
            return promise1
                .then(function (value) {
                    var blob = value;
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "contract.pdf";
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

        self.sendContractFile = function (contract) {

            if (contract != null) {
                let parameter = {
                    attachment: contract
                };

                if (contract) {
                    leasingFacilityContractDetailsServices.save({}, parameter).$promise.then(
                        response => {
                            state.go("panel.dashboard");
                        },
                        errResponse => {
                            console.log("error");
                        }
                    );
                }


            } else {
                iziToast.show({
                    message: "تصویر قرارداد امضاء شده را بارگذاری نمایید.",
                    theme: "light",
                    color: "red"
                });
            }
        };
    };

    self.$onChanges = function ({ attachment }) {
        if (angular.isDefined(attachment)) {
            if (attachment.currentValue) {
                attachmentId = attachment.currentValue;
            }
        }
    };
}

export { leasingSigningContractController };
