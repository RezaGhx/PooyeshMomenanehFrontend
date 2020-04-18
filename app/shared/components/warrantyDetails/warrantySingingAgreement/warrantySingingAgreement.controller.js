warrantySingingAgreementController.$inject = [
    "$state",
    "$resource",
    "Upload",
    "$auth",
    "$rootScope"
];

function warrantySingingAgreementController(state, resource, upload, auth, rootScope) {
    var self = this;

    self.$onInit = function () {
        let warrantyId = self.warrantyId;

        let warrantySendContractDetailsServices = resource(
            `${apiWarranty}/WarrantyRequests/${warrantyId}/signedContract`
        );

        let warrantySingingAgreementDetailsServices = resource(
            `${apiGetWay}/LegalPersons/self/:routeParams`,
            {
                routeParams: "@routeParams",
                routeParams2: "@routeParams2",
                routeParams3: "@routeParams3"
            }
        );

        let warrantySingingAgreementDetailsServicesUpload = resource(
            `${apiGetWay}/LegalPersons/self/director-members/:directorId/sign-evidence`,
            {
                directorId: "@directorId"
            }
        );

        let user = auth.user();

        self.getContractFile = function () {
            let promise1 = new Promise(function (resolve, reject) {
                var url = `${apiWarranty}/warrantyRequests/${warrantyId}/pdf-contract`;
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
                    link.download = "report.pdf";
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

        //آپلود قرارداد امضاء شده
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
        //بارگزاری امضای اعضای هئیت مدیره
        const getDirectorDocuments = function () {
            let query = {
                routeParams: "director-members"
            };

            self.promiseLoading = warrantySingingAgreementDetailsServices
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

            warrantySingingAgreementDetailsServicesUpload
                .save(parameter, command)
                .$promise.then(
                    response => {
                        iziToast.show({
                            message: response.message,
                            theme: "light",
                            color: "green"
                        });},
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

        self.sendContractFile = function (contract) {
            
            if (!contract) {
                rootScope.hideModal("sendContractConfirmModal");
                return iziToast.show({
                    message: "بارگذاری تصویر قرارداد الزامی میباشد.",
                    theme: "light",
                    color: "red"
                });
            }

            if (checkDirectorSignValidation(self.directorDocuments) > 0) {
                rootScope.hideModal("sendContractConfirmModal");
                return iziToast.show({
                    message: "لطفا تمامی تصاویر گواهی امضا را بارگذاری نمایید",
                    theme: "light",
                    color: "red"
                });
            }

            let parameter = {
                Attachment: contract,
                Id: warrantyId
            };
            warrantySendContractDetailsServices.save({}, parameter).$promise.then(
                response => {
                    rootScope.hideModal("sendContractConfirmModal");
                    state.go("panel.dashboard");
                },
                errResponse => {
                    rootScope.hideModal("sendContractConfirmModal");
                    console.log("error");
                }
            );
        };
    };
}

export { warrantySingingAgreementController };
