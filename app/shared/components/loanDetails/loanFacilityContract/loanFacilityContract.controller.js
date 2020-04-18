loanFacilityContractController.$inject = [
    "$state",
    "$resource",
    "$auth",
    "Upload",
    "dateFactory"
];

function loanFacilityContractController(state, resource, auth, upload, dateFactory) {
    var self = this;
    let attachmentId;
    self.$onInit = function () {
        let loanId = self.loanId;
        let loanFacilityContractDetailsServices = resource(
            `${apiLoan}/legal-persons/self/loan-requests/${loanId}/signed-contract`
        );

        let loanAttchmentFileServices = resource(
            `${gateway}/fileConverter/files/doc/convert/pdf`
        );

        let suggestedBailsServices = resource(
			`${apiLoan}/legal-persons/self/loan-requests/${loanId}/suggested-bails/latest`
        );

        const getSuggestedBails = async function () {
            await suggestedBailsServices.get().$promise.then(
                response => {                    
                    self.company = response.content;
                    if (response.content.chequeWithGuarantorInfo) {
                        self.company.chequeInfo =
                            response.content.chequeWithGuarantorInfo.chequeInfo;
                        delete self.company.chequeWithGuarantorInfo.chequeInfo;
                    } else {
                        self.company.chequeInfo = response.content.chequeInfo;
                    }                    

                    if (self.company.chequeInfo) {
                        self.company.chequeInfo.date = dateFactory.persianCalenderFormat(
                            self.company.chequeInfo.date,
                            "YYYY/MM/DD"
                        );
                    }
                    console.log(self.company.chequeInfo)
                },
                errResponse => {
                    console.log("error", errResponse.data);
                }
            );
        };
        getSuggestedBails();


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

                if (self.company.chequeInfo) {
                    if (self.company.chequeInfo.attachment) {
                        parameter.chequeInfo = {
                            attachment: self.company.chequeInfo.attachment
                        };

                        loanFacilityContractDetailsServices.save({}, parameter).$promise.then(
                            response => {
                                state.go("panel.dashboard");
                            },
                            errResponse => {
                                console.log("error");
                            }
                        );
                    } else {
                        iziToast.show({
                            message: "تصویر چک را بارگذاری نمایید.",
                            theme: "light",
                            color: "red"
                        });
                    }
                } else {
                    loanFacilityContractDetailsServices.save({}, parameter).$promise.then(
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

        self.backToSelectedBail = function () {
            let currentStatus = 40;
            scope.$emit("currentStatus", currentStatus);
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

        self.uploadChequeInfo = function (file) {
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
                            self.company.chequeInfo.attachment = response.data[0].fileName;
                        },
                        function (resp) {
                            self.company.chequeInfo.attachment = null;
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
    };

    self.$onChanges = function ({ attachment }) {
        if (angular.isDefined(attachment)) {
            if (attachment.currentValue) {
                attachmentId = attachment.currentValue;
            }
        }
    };
}

export { loanFacilityContractController };
