leasingUploadCollateralController.$inject = [
    "$state",
    "$resource",
    "Upload",
    "$scope",
    "dateFactory",
    "$stateParams"
];

function leasingUploadCollateralController(
    state,
    resource,
    upload,
    scope,
    dateFactory,
    stateParams
) {
    var self = this;

    self.$onInit = function () {
        let leasingId = stateParams.id;
        let selectedBail = self.selectedBail;
        self.isFirst = true;
        //فرآیند بارگزاری وثایق
        self.company = {
            amount: "",
            selectedBailId: "",
            bails: [2, 3],
            chequeInfo: {
                isRejected: false
            },
            estateInfo: {
                mortgagors: [],
                isRejected: false
            },
            chequeWithGuarantorInfo: {
                chequeInfo: {
                    attachment: ""
                },
                individualGuarantors: [],
                legalGuarantors: [],
                isRejected: false
            }
        };

        let leasingUploadCollateralDetailsServices = resource(
            `${apiLeasing}/legal-persons/self/leasing-requests/${leasingId}/suggested-bails/:routeParams`,
            {
                routeParams: "@routeParams"
            },
            {
                update: {
                    method: "PUT"
                }
            }
        );

        let suggestedBailsServices = resource(
            `${apiLeasing}/legal-persons/self/leasing-requests/${leasingId}/suggested-bails/latest`
        );

        const getSuggestedBails = async function () {
            await suggestedBailsServices.get().$promise.then(
                response => {
                    self.isFirst = false;
                    self.company = response.content;
                    if (response.content.chequeWithGuarantorInfo) {
                        self.company.chequeInfo =
                            response.content.chequeWithGuarantorInfo.chequeInfo;
                        delete self.company.chequeWithGuarantorInfo.chequeInfo;
                    } else {
                        self.company.chequeInfo = response.content.chequeInfo;
                    }

                    if (self.company.estateInfo == null) {
                        self.company.estateInfo = {
                            mortgagors: [],
                            isRejected: false
                        };
                    }

                    if (self.company.chequeInfo) {
                        self.company.chequeInfo.date = dateFactory.persianCalenderFormat(
                            self.company.chequeInfo.date,
                            "YYYY/MM/DD"
                        );
                    }
                },
                errResponse => {
                    self.isFirst = true;
                    console.log("error", errResponse.data);
                }
            );
        };
        getSuggestedBails();

        scope.$on("parent1w", function (event, data) {
            self.selectedBail = data;
        });

        self.sectionsHandler = function (id) {
            return self.selectedBail.bails.includes(id);
        };

        // self.ProstitutesTable = [];
        // const getProstitutesInformation = async function() {
        //   let query = {
        //     type: "",
        //     id: ""
        //   };
        //   self.promiseLoadingProstitutesTable = await detailsServices
        //     .get(query)
        //     .$promise.then(
        //       response => {
        //         let items = response.content;
        //         items.forEach(item => {
        //           self.ProstitutesTable.push(item);
        //         });
        //       },
        //       errResponse => {
        //         console.log("error");
        //       }
        //     );
        // };
        // getProstitutesInformation();

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

        self.uploadChequeForGuarantor = function (file) {
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
                            self.company.chequeWithGuarantorInfo.chequeInfo.attachment = response.data[0].fileName;
                        },
                        function (resp) {
                            self.company.chequeWithGuarantorInfo.chequeInfo.attachment = null;
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

        self.uploadEstateInfo = function (file) {
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
                            self.company.estateInfo.attachment = response.data[0].fileName;
                        },
                        function (resp) {
                            self.company.estateInfo.attachment = null;
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

        self.companyDir = {
            individualMembers: [],
            legalMembers: []
        };

        self.legalMember = {
            directorMembers: []
        };

        self.pushToList = function (item, form) {
            if (form.$valid) {
                let board = angular.copy(item);
                self.company.chequeWithGuarantorInfo.individualGuarantors.push(board);
                self.individualMember = {};
                form.$setUntouched();
                form.$setPristine();
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };
        self.pushToListLegal = function (item, form) {
            if (form.$valid) {
                let board = angular.copy(item);
                self.company.chequeWithGuarantorInfo.legalGuarantors.push(board);
                self.legalMember = {};
                form.$setUntouched();
                form.$setPristine();
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };
        self.pushToListMortgagors = function (item, form) {
            if (form.$valid) {
                let board = angular.copy(item);
                self.company.estateInfo.mortgagors.push(board);
                self.estateInfo.mortgagors = {};
                form.$setUntouched();
                form.$setPristine();
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };

        self.uploadDocumentAttachment = function (file) {
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
                            self.company.chequeWithGuarantorInfo.documentsAttachment =
                                response.data[0].fileName;
                        },
                        function (resp) {
                            console.log("NOk");
                            self.company.chequeWithGuarantorInfo.documentsAttachment = null;
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

        self.send = async function (information) {
            self.loanInformation.IndividualGuarantorBailInfo =
                self.companyDir.individualMembers;
            self.loanInformation.LegalGuarantorBailInfo =
                self.companyDir.legalMembers;
            if (
                self.loanInformation.IndividualGuarantorBailInfo.length > 0 ||
                self.loanInformation.LegalGuarantorBailInfo.length > 0
            ) {
                let parameter = {
                    type: "BailInfo",
                    id: "fill"
                };
                await detailsServices.update(parameter, information).$promise.then(
                    response => {
                        goToDashboard();

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
            } else {
                return iziToast.show({
                    message: "حداقل یک ضامن باید وارد کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };
        self.backToSelectedBail = function () {
            let currentStatus = "PendingForReviewSuggestedBail";
            scope.$emit("currentStatus", currentStatus);
        };

        self.submitBails = async function (item, form) {
            let individualMembersForm = angular
                .element("[name='individualMembersForm']")
                .controller("form");
            let legalMembers = angular
                .element("[name='legalMembers']")
                .controller("form");
            let prmoMembers = angular
                .element("[name='prmoMembers']")
                .controller("form");

            if (individualMembersForm != undefined) {
                form.$removeControl(individualMembersForm);
            }
            if (legalMembers != undefined) {
                form.$removeControl(legalMembers);
            }
            if (prmoMembers != undefined) {
                form.$removeControl(prmoMembers);
            }

            if (form.$valid) {
                item.amount = self.selectedBail.approvedAmount;
                item.selectedBailId = self.selectedBail.id;
                item.bails = self.selectedBail.bails;
                if (item.chequeWithGuarantorInfo) {
                    item.chequeWithGuarantorInfo.chequeInfo = item.chequeInfo;
                }

                await leasingUploadCollateralDetailsServices.save({}, item).$promise.then(
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
                        console.log("error");
                    }
                );
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };

        self.removeFromList = function (item, list) {
            list.splice(list.indexOf(item), 1);
        };

        self.submitEditEstate = async function (item, form) {
            let individualMembersForm = angular
                .element("[name='individualMembersForm']")
                .controller("form");
            let legalMembers = angular
                .element("[name='legalMembers']")
                .controller("form");
            let prmoMembers = angular
                .element("[name='prmoMembers']")
                .controller("form");

            if (individualMembersForm != undefined) {
                form.$removeControl(individualMembersForm);
            }
            if (legalMembers != undefined) {
                form.$removeControl(legalMembers);
            }
            if (prmoMembers != undefined) {
                form.$removeControl(prmoMembers);
            }

            if (form.$valid) {
                //item.estateInfo.selectedBailId = self.selectedBail.id;                

                let params = {
                    routeParams: "estate"
                }
                await leasingUploadCollateralDetailsServices.update(params, item.estateInfo).$promise.then(
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
                        console.log("error");
                    }
                );
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };

        self.submitEditGuarantor = async function (item, form) {
            let individualMembersForm = angular
                .element("[name='individualMembersForm']")
                .controller("form");
            let legalMembers = angular
                .element("[name='legalMembers']")
                .controller("form");
            let prmoMembers = angular
                .element("[name='prmoMembers']")
                .controller("form");

            if (individualMembersForm != undefined) {
                form.$removeControl(individualMembersForm);
            }
            if (legalMembers != undefined) {
                form.$removeControl(legalMembers);
            }
            if (prmoMembers != undefined) {
                form.$removeControl(prmoMembers);
            }

            if (form.$valid) {
                //item.chequeWithGuarantorInfo.selectedBailId = self.selectedBail.id;

                let params = {
                    routeParams: "guarantor"
                }
                await leasingUploadCollateralDetailsServices.update(params, item.chequeWithGuarantorInfo).$promise.then(
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
                        console.log("error");
                    }
                );
            } else {
                iziToast.show({
                    message: "فرم را تکمیل کنید.",
                    theme: "light",
                    color: "red"
                });
            }
        };

        // self.submitEditCheque = async function (item, form) {

        //     if (self.company.chequeInfo.attachment) {
        //         //item.chequeWithGuarantorInfo.selectedBailId = self.selectedBail.id;

        //         let params = {
        //             routeParams: "cheque"
        //         }
        //         await leasingUploadCollateralDetailsServices.update(params, item.chequeWithGuarantorInfo).$promise.then(
        //             response => {
        //                 iziToast.show({
        //                     message: response.message,
        //                     theme: "light",
        //                     color: "green"
        //                 });
        //                 state.go("panel.dashboard");
        //             },
        //             errResponse => {
        //                 iziToast.show({
        //                     message: errResponse.data.message,
        //                     theme: "light",
        //                     color: "red"
        //                 });
        //                 console.log("error");
        //             }
        //         );
        //     } else {
        //         iziToast.show({
        //             message: "فرم را تکمیل کنید.",
        //             theme: "light",
        //             color: "red"
        //         });
        //     }
        // };
    };
}

export { leasingUploadCollateralController };
