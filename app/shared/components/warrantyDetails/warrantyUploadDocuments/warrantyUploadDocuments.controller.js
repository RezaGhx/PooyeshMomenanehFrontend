warrantyUploadDocumentsController.$inject = [
    "$state",
    "$resource",
    "Upload",
    "NgTableParams"
];

function warrantyUploadDocumentsController(
    state,
    resource,
    upload,
    NgTableParams
) {
    var self = this;
    self.legalMember = {
        signRights:[]
    };
    self.$onInit = function () {
        let warrantyId = self.warrantyId;

        let warrantyUploadDocumentsDetailsServices = resource(
            `${apiWarranty}/WarrantyRequests/${warrantyId}/:routeParams`,
            {
                routeParams: "@routeParams"
            },
            {
                update: {
                    method: "PUT"
                }
            }
        );
        // self.estateInfo = {
        //     // mortgagors: []
        //     // estateEvidenceAttachment: null,
        //     // ownerDocumentsAttachment: null
        // };
        self.companyDir = {
            individualMembers: [],
            legalMembers: []
        };


        self.warrantyInformation = {};
        self.warrantyInformation.WarrantyRequestId = warrantyId;
        self.warrantyInformation.estateBailInfo = {
            mortgagors: [],
            estateEvidenceAttachment: null,
            ownerDocumentsAttachment: null
        };

        const getSelectedBail = function () {
            let query = {
                routeParams: "selectedBail"
            };
            self.promiseLoading = warrantyUploadDocumentsDetailsServices
                .get(query)
                .$promise.then(
                    response => {
                        self.selectedBail = response.content;
                    },
                    errResponse => {
                        console.log("error");
                    }
                );
        };
        getSelectedBail();


        const getBailInfo = function () {
            let query = {
                routeParams: "bailInfos"
            };
            self.promiseLoading = warrantyUploadDocumentsDetailsServices
                .get(query)
                .$promise.then(
                    response => {
                        if (response.content.chequeWithGuarantorBailInfo != null) {
                            self.companyDir.individualMembers = response.content.chequeWithGuarantorBailInfo.individualGuarantor;
                            self.companyDir.legalMembers = response.content.chequeWithGuarantorBailInfo.legalGuarantor;
                            self.warrantyInformation.attachment = response.content.chequeWithGuarantorBailInfo.attachment;
                        } else {
                            self.companyDir.individualMembers = [];
                            self.companyDir.legalMembers = [];
                            self.warrantyInformation.attachment = null;
                        }


                        if (response.content.estateBailInfo != null) {
                            self.warrantyInformation.estateBailInfo.estateEvidenceAttachment = response.content.estateBailInfo.estateAttachment;
                            self.warrantyInformation.estateBailInfo.ownerDocumentsAttachment = response.content.estateBailInfo.ownerAttachment;
                            self.warrantyInformation.estateBailInfo = response.content.estateBailInfo;
                            self.warrantyInformation.estateBailInfo.mortgagors = response.content.estateBailInfo.mortgagors;
                        }

                        // self.tableParamsIndividualMembers = new NgTableParams(
                        //     {},
                        //     {
                        //         dataset: self.companyDir.individualMembers,
                        //         page: 1,
                        //         count: 5,
                        //         counts: []
                        //     }
                        // );
                        // self.tableParamsIndividualMembers.reload();

                        // self.tableParamsLegalMembers = new NgTableParams(
                        //     {},
                        //     {
                        //         dataset: self.companyDir.legalMembers,
                        //         page: 1,
                        //         count: 5,
                        //         counts: []
                        //     }
                        // );
                        // self.tableParamsLegalMembers.reload();

                        // self.tableParamsMortgagorsMembers = new NgTableParams(
                        //     {},
                        //     {
                        //         dataset: self.warrantyInformation.estateBailInfo.mortgagors,
                        //         page: 1,
                        //         count: 5,
                        //         counts: []
                        //     }
                        // );
                        // self.tableParamsMortgagorsMembers.reload();

                    },
                    errResponse => {
                        console.log("error");
                    }
                );
        };
        getBailInfo();

        self.uploadLogoEstateEvidence = function (file) {
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
                            self.warrantyInformation.estateBailInfo.estateEvidenceAttachment = response.data[0].fileName;
                        },
                        function (resp) {
                            self.warrantyInformation.estateBailInfo.estateEvidenceAttachment = null;
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

        self.uploadLogoOwnerDocuments = function (file) {

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

                            self.warrantyInformation.estateBailInfo.ownerDocumentsAttachment = response.data[0].fileName;

                        },
                        function (resp) {
                            self.warrantyInformation.estateBailInfo.ownerDocumentsAttachment = null;
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
        
        self.tableParamsIndividualMembers = new NgTableParams(
            {},
            {
                dataset: self.companyDir.individualMembers,
                page: 1,
                count: 5,
                counts: []
            }
        );
        
        self.tableParamsLegalMembers = new NgTableParams(
            {},
            {
                dataset: self.companyDir.legalMembers,
                page: 1,
                count: 5,
                counts: []
            }
        );

        self.tableParamsMortgagorsMembers = new NgTableParams(
            {},
            {
                dataset: self.warrantyInformation.estateBailInfo.mortgagors,
                page: 1,
                count: 5,
                counts: []
            }
        );

        self.pushToListIndividual = function (item, form) {

            if (form.$valid) {
                let board = angular.copy(item);
                self.companyDir.individualMembers.push(board);
                self.tableParamsIndividualMembers.reload();
                self.individualMember = {};
                form.$setUntouched();
                form.$setPristine();
            } else {
                iziToast.show({
                    message: "لطفا فرم را به درستی پر نمایید.",
                    theme: "light",
                    color: "red"
                });
            }

        };

        self.pushToListLegal = function (item, form) {

            if (form.$valid) {
                let board = angular.copy(item);
                self.companyDir.legalMembers.push(board);
                self.tableParamsLegalMembers.reload();
                self.legalMember = {
                    signRights:[]
                };
                form.$setUntouched();
                form.$setPristine();
            }
            else {
                iziToast.show({
                    message: "لطفا فرم را به درستی پر نمایید.",
                    theme: "light",
                    color: "red"
                });
            }
        };

        self.pushToListMortgagors = function (item, form) {

            if (form.$valid) {
                let board = angular.copy(item);
                self.warrantyInformation.estateBailInfo.mortgagors.push(board);
                self.tableParamsMortgagorsMembers.reload();
                self.warrantyInformation.estateBailInfo.mortgagor = {};
                form.$setUntouched();
                form.$setPristine();
            } else {
                iziToast.show({
                    message: "لطفا فرم را به درستی پر نمایید.",
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
                            self.warrantyInformation.attachment = response.data[0].fileName;
                        },
                        function (resp) {
                            console.log("NOk");
                            self.warrantyInformation.attachment = null;
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

            information.individualGuarantorBailInfo = self.companyDir.individualMembers;
            information.legalGuarantorBailInfo = self.companyDir.legalMembers;
            information.estateBailInfo = self.warrantyInformation.estateBailInfo;

            if (
                (((information.individualGuarantorBailInfo.length > 0 || information.legalGuarantorBailInfo.length > 0) && information.attachment && self.selectedBail.needGaurantorInfo)) ||
                (self.selectedBail.needEstateInfo && information.estateBailInfo.mortgagors.length > 0)
            ) {
                // console.log(information);
                    let parameter = {
                        routeParams: "bailInfo"
                    };
                    await warrantyUploadDocumentsDetailsServices
                        .update(parameter, information)
                        .$promise.then(
                            response => {

                                state.go("panel.dashboard");

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

        self.removeIndividualMembersList = function (item) {
            self.companyDir.individualMembers.splice(self.companyDir.individualMembers.indexOf(item), 1);
            self.tableParamsIndividualMembers.reload();
        };

        self.removeLegalMembersList = function (item) {
            self.companyDir.legalMembers.splice(self.companyDir.legalMembers.indexOf(item), 1);
            self.tableParamsLegalMembers.reload();
        };

        self.removeMortgagorsMembersList = function (item) {
            self.warrantyInformation.estateBailInfo.mortgagors.splice(self.warrantyInformation.estateBailInfo.mortgagors.indexOf(item), 1);
            self.tableParamsMortgagorsMembers.reload();
        };

    };
}

export { warrantyUploadDocumentsController };
