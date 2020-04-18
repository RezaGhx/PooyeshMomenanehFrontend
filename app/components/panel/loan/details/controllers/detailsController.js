detailsController.$inject = [
  "panel.loan.detailsServices",
  "$rootScope",
  "$stateParams",
  "Upload",
  "$auth",
  "$state",
  "loanTypeFactoryEnum",
  "leasingCustomerTypeEnum",
  "$scope"
];

function detailsController(
  detailsServices,
  rootScope,
  stateParams,
  upload,
  auth,
  state,
  loanTypeFactoryEnum,
  leasingCustomerTypeEnum,
  scope
) {
  var self = this;
  let user = auth.user();

  self.states = [
    {
      description: "در انتظار اختصاص کارشناس",
      name: "PendingForAssignExpert",
      value: 0
    },

    {
      description: "در انتظار بررسی اولیه اطلاعات توسط کارشناس",
      name: "PendingForCheckSellerInfoByExpert",
      value: 5
    },
    {
      description: "در انتظار ویرایش اطلاعات فروشنده توسط فروشنده",
      name: "PendingForEditSellerInfoBySeller",
      id: 10
    },
    
      {description: "در انتظار تایید درخواست توسط خریدار",
      name: "PendingForConfirmBuyerInfoByBuyer",
      id: 15
    },
    {
      description: "در انتظار بررسی اولیه اطلاعات خریدار توسط کارشناس",
      name: "PendingForCheckBuyerInfoByExpert",
      id: 20
    },
    {
      description: "در انتظار ویرایش اطلاعات خرید توسط خریدار",
      name: "PendingForEditBuyerInfoByBuyer",
      id: 25
    },
    {
      description: "در انتظار بررسی ثانویه درخواست توسط مدیر تجاری سازی",
      name: "PendingForManagerReview",
      id: 30
    },
    {
      description: "در انتظار ثبت گزارش ارزیابی",
      name: "PendingForSubmitAssessmentReport",
      id: 35
    },
    {
      description: "در انتظار بررسی گزارش ارزیابی",
      name: "PendingForReviewAssessmentReport",
      id: 40
    },
    {
      description: "در انتظار ویرایش گزارش ارزیابی توسط کارشناس ارزیابی",
      name: "PendingForEditAssessmentReport",
      id: 45
    },
    {
      description: "رد درخواست لیزینگ",
      name: "RejectedByManager",
      id: 50
    },
    {
      description: "در انتظار ثبت مصوبه کمیته",
      name: "PendingForSubmitCommitteeApproval",
      id: 55
    },
    {
      description: "در انتظار بررسی شرایط مصوبه کمیته",
      name: "PendingForSuggestBail",
      id: 60
    },
    {
      description: "در انتظار ثبت تضامین توسط مشتری",
      name: "PendingForSendingDocuments",
      id: 65
    },
    {
      description: "در انتظار بررسی تضامین توسط کارشناس",
      name: "PendingForReviewDocuments",
      id: 70
    },
    {
      description: "در انتظار بررسی تضامین",
      name: "PendingForReviewSuggestedBail",
      id: 72
    },
    {
      description: "در انتظار بارگذاری قرارداد توسط کارشناس",
      name: "PendingForUploadContractByExpert",
      id: 75
    },
    {
      description: "در انتظار امضای قرارداد توسط خریدار",
      name: "PendingForSubmitSignedContractByBuyer", id: 80
    },
    {
      description: "در انتظار بررسی قرارداد امضا شده خریدار توسط حقوقی",
      name: "PendingForSignedContractReview", id: 85
    },
    {
      description: "در انتظار ارسال مدارک مورد نیاز پرداخت توسط فروشنده",
      name: "PendingForSendPaymentDocumentsBySeller", id: 90
    },
    {
      description: "در انتظار بررسی مدارک مورد نیاز برای پرداخت توسط فروشنده",
      name: "PendingForSentPaymentDocumentsReview", id: 95
    },
    {
      description: "در انتظار ارسال به حسابداری",
      name: "PendingForSendToAccounting", id: 100
    },
    {
      description: "در انتظار تایید نهایی توسط مالی",
      name: "PendingForFinalApprove", id: 105
    },
    {
      description: "تایید نهایی توسط مالی",
      name: "FinalApproved", id: 110
    }
  ];

  self.requestId = stateParams.id;
  self.requestType = stateParams.type;
  console.log(self.requestId, self.requestType);
  let goToDashboard = function () {
    state.go("panel.dashboard");
  };

  scope.$on("currentStatus", function (event, data) {
    console.log(data)
    console.log(self.details)
    if(self.requestType==4){
      self.leasingDetails.currentState = data;
    }else{
      self.details.currentState.status = data;
    }
    
  });

  self.selectedBail = {};
  scope.$on("child1", function (event, data) {
    self.selectedBail = data;
  });

  self.loanInformation = {};
  self.loanInformation.loanRequestId = self.requestId; //id of request from url
  self.loanInformation.loanRequestType = self.requestType;
  self.loanInformation.EstateBailInfo = {
    EstateEvidence: {
      Attachment: null
    },
    OwnerDocuments: {
      Attachment: null
    }
  };

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
            self.loanInformation.EstateBailInfo.EstateEvidence.Attachment =
              response.data[0].fileName;
          },
          function (resp) {
            self.information = {};
          },
          function (evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
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
            self.loanInformation.EstateBailInfo.OwnerDocuments.Attachment =
              response.data[0].fileName;
          },
          function (resp) {
            self.information = {};
          },
          function (evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
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

  if (self.requestType != 4) {
    const getLoanDetails = function () {
      let query = {
        type: "legal-persons",
        id: "self",
        routeParams: "loan-requests",
        routeParams2: self.requestId
      };
      self.promiseLoading = detailsServices.get(query).$promise.then(
        response => {
          self.details = response.content;                    
        },
        errResponse => {
          console.log("error");
        }
      );
    };
    getLoanDetails();
  };


  if (self.requestType == 4) {
    // self.vendor = {};
    // let leasingId = dataStore.getData();
    // console.log(leasingId);
    // self.vendor = leasingId;

    const getLeasingDetails = function () {
      let query = {
        type: "leasing-requests",
        id: self.requestId
      }
      self.promiseLoading = detailsServices.getLeasing(query).$promise.then(
        response => {
         
          self.leasingDetails = response;          
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
  }


  if (self.requestType != 4) {
  const getCommitteeApproval = function () {
    let query = {
      type: "loan-requests",
      id: self.requestId,
      routeParams2: "committee-approval"
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        self.committeeApproval = response.content;
      },
      errResponse => {
        console.log("error");
      }
    );
  };
  getCommitteeApproval();
};

  //self.submitCommittee = function(form) {
  //	if (form.$valid && self.committee) {

  //	}
  //}

  //تضامین پیشنهادی و شرایط
  // دریافت کل وثایق و تضامین 
  // const getLoanBail = function() {
  //   let query = {
  //     type: "loan-requests",
  //     id: self.requestId,
  //     routeParams: "committee-approval"
  //   };
  //   self.promiseLoading = detailsServices.get(query).$promise.then(
  //     response => {
  //       self.bail = response.content;
  //     },
  //     errResponse => {
  //       console.log("error");
  //     }
  //   );
  // };
  // getLoanBail();
  // self.selectedBail = {};
  // self.selectBail = function(form) {
  //   if (form.$valid) {
  //     self.details.currentState.status = 41;
  //     self.selectedBail = JSON.parse(self.selectedBail);
  //   } else {
  //     iziToast.show({
  //       message: "لطفا یکی از موارد را انتخاب کنید",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  //تضامین پیشنهادی و شرایط

  self.submitloanBail = function (form, bailId) {
    if (form.$valid) {
      let query = {
        type: "applicantloanRequest",
        routeParams: "selectBailOption"
      };
      let parameter = {
        loanRequestId: self.requestId,
        selectedBailOptionId: bailId
      };
      detailsServices.create(query, parameter).$promise.then(
        response => {
          goToDashboard();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
        },
        errResponse => {
          console.log("error");
        }
      );
    } else {
      iziToast.show({
        message: "لطفا یکی از موارد را انتخاب کنید",
        theme: "light",
        color: "red"
      });
    }
  };

  //قرارداد تسهیلات فی ما بین
  // دانلود قرارداد تنظیم شده
  // self.getContractFile = function() {
  //   let promise1 = new Promise(function(resolve, reject) {
  //     var url = `${apiLoan}/loan-requests/${self.requestId}/contract`;
  //     var req = new XMLHttpRequest();
  //     req.open("GET", url, true);
  //     req.setRequestHeader("Content-Type", "application/json");
  //     req.setRequestHeader("Authorization", "Bearer " + user.auth_token);
  //     req.responseType = "blob";
  //     req.onload = function(event) {
  //       if (req.status === 200) {
  //         resolve(req.response);
  //       } else {
  //         reject(req.response);
  //       }
  //     };
  //     req.send();
  //   });
  //   return promise1
  //     .then(function(value) {
  //       var blob = value;
  //       var link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = "contract.pdf";
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //     })
  //     .catch(reason => {
  //       iziToast.show({
  //         message: "فایل مورد نظر یافت نشد.",
  //         theme: "light",
  //         color: "red"
  //       });
  //     });
  // };
  //آپلود قرارداد امضاء شده
  // self.uploadContractFile = function(file) {
  //   if (file.length > 0) {
  //     upload
  //       .upload({
  //         url: apiFileManagerPost,
  //         data: {
  //           file: file
  //         }
  //       })
  //       .then(
  //         function(response) {
  //           self.contractFile = response.data[0].fileName;
  //           sendContractFile(self.contractFile);
  //         },
  //         function(resp) {
  //           self.contractFile = {};
  //         },
  //         function(evt) {
  //           var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
  //           if (progressPercentage < 100) {
  //             self.loadingShow = true;
  //           } else {
  //             self.loadingShow = false;
  //           }
  //           console.log(progressPercentage);
  //         }
  //       );
  //   }
  // };
  // const sendContractFile = function(contract) {
  //   let query = {
  //     type: "legal-persons",
  //     id: "self",
  //     routeParams: "loan-requests",
  //     routeParams2: self.requestId,
  //     routeParams3: "signed-contract"
  //   };
  //   let parameter = {
  //     Attachment: contract
  //   };
  //   detailsServices.create(query, parameter).$promise.then(
  //     response => {
  //       goToDashboard();
  //     },
  //     errResponse => {
  //       console.log("error");
  //     }
  //   );
  // };
  //قرارداد تسهیلات فی ما بین

  //دانلود فایل قرارداد نهایی
  const finalContractFile = function (contractId) {
    let promise1 = new Promise(function (resolve, reject) {
      var url = `${rootScope.download}${contractId}`;
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
    promise1
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
        console.log(reason);

        iziToast.show({
          message: "فایل مورد نظر یافت نشد.",
          theme: "light",
          color: "red"
        });
      });
  };

  self.finalContractFile = function () {
    let query = {
      type: "applicantloanRequest",
      id: self.requestId,
      routeParams: "signedContract"
    };
    self.promiseLoading = detailsServices.get(query).$promise.then(
      response => {
        finalContractFile(response.content);
      },
      errResponse => {
        console.log("error");
      }
    );
  };

  //بارگذاری مدارک وثایق و تضامین

  // self.sectionsHandler = function(id) {
  //   return self.selectedBail.bails.includes(id);
  // };
  // //فرآیند بارگزاری وثایق و تضامین
  // self.company = {
  //   amount: "",
  //   selectedBailId: "",
  //   bails: [2, 3],
  //   chequeInfo: {},
  //   estateInfo: {
  //     mortgagors: []
  //   },
  //   chequeWithGuarantorInfo: {
  //     chequeInfo: {},
  //     individualGuarantors: [],
  //     legalGuarantors: []
  //   }
  // };
  // // self.ProstitutesTable = [];
  // // const getProstitutesInformation = async function() {
  // //   let query = {
  // //     type: "",
  // //     id: ""
  // //   };
  // //   self.promiseLoadingProstitutesTable = await detailsServices
  // //     .get(query)
  // //     .$promise.then(
  // //       response => {
  // //         let items = response.content;
  // //         items.forEach(item => {
  // //           self.ProstitutesTable.push(item);
  // //         });
  // //       },
  // //       errResponse => {
  // //         console.log("error");
  // //       }
  // //     );
  // // };
  // // getProstitutesInformation();

  // self.uploadChequeInfo = function(file) {
  //   if (file.length > 0) {
  //     upload
  //       .upload({
  //         url: apiFileManagerPost,
  //         data: {
  //           file: file
  //         }
  //       })
  //       .then(
  //         function(response) {
  //           self.company.chequeInfo.Attachment = response.data[0].fileName;
  //         },
  //         function(resp) {
  //           self.information = {};
  //         },
  //         function(evt) {
  //           var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
  //           if (progressPercentage < 100) {
  //             self.loadingShow = true;
  //           } else {
  //             self.loadingShow = false;
  //           }
  //           console.log(progressPercentage);
  //         }
  //       );
  //   }
  // };
  // self.uploadEstateInfo = function(file) {
  //   if (file.length > 0) {
  //     upload
  //       .upload({
  //         url: apiFileManagerPost,
  //         data: {
  //           file: file
  //         }
  //       })
  //       .then(
  //         function(response) {
  //           self.company.estateInfo.Attachment = response.data[0].fileName;
  //         },
  //         function(resp) {
  //           self.information = {};
  //         },
  //         function(evt) {
  //           var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
  //           if (progressPercentage < 100) {
  //             self.loadingShow = true;
  //           } else {
  //             self.loadingShow = false;
  //           }
  //           console.log(progressPercentage);
  //         }
  //       );
  //   }
  // };
  //ضامن های حقیقی و حقوقی
  // self.companyDir = {
  //   individualMembers: [],
  //   legalMembers: []
  // };

  // self.legalMember = {
  //   directorMembers: []
  // };

  // self.pushToList = function(item, form) {
  //   if (form.$valid) {
  //     let board = angular.copy(item);
  //     self.company.chequeWithGuarantorInfo.individualGuarantors.push(board);
  //     self.individualMember = {};
  //     form.$setUntouched();
  //     form.$setPristine();
  //   } else {
  //     iziToast.show({
  //       message: "فرم را تکمیل کنید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  // self.pushToListLegal = function(item, form) {
  //   if (form.$valid) {
  //     let board = angular.copy(item);
  //     self.company.chequeWithGuarantorInfo.legalGuarantors.push(board);
  //     self.legalMember = {};
  //     form.$setUntouched();
  //     form.$setPristine();
  //   } else {
  //     iziToast.show({
  //       message: "فرم را تکمیل کنید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  // self.pushToListMortgagors = function(item, form) {
  //   if (form.$valid) {
  //     let board = angular.copy(item);
  //     self.company.estateInfo.mortgagors.push(board);
  //     self.estateInfo.mortgagors = {};
  //     form.$setUntouched();
  //     form.$setPristine();
  //   } else {
  //     iziToast.show({
  //       message: "فرم را تکمیل کنید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };

  // self.uploadDocumentAttachment = function(file) {
  //   if (file.length > 0) {
  //     upload
  //       .upload({
  //         url: apiFileManagerPost,
  //         data: {
  //           file: file
  //         }
  //       })
  //       .then(
  //         function(response) {
  //           console.log("Ok");
  //           self.loanInformation.attachment = response.data[0].fileName;
  //         },
  //         function(resp) {
  //           console.log("NOk");
  //           self.loanInformation.attachment = null;
  //         },
  //         function(evt) {
  //           var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
  //           if (progressPercentage < 100) {
  //             self.loadingShow = true;
  //           } else {
  //             self.loadingShow = false;
  //           }
  //         }
  //       );
  //   }
  // };

  // self.send = async function(information) {
  //   self.loanInformation.IndividualGuarantorBailInfo =
  //     self.companyDir.individualMembers;
  //   self.loanInformation.LegalGuarantorBailInfo = self.companyDir.legalMembers;
  //   if (
  //     self.loanInformation.IndividualGuarantorBailInfo.length > 0 ||
  //     self.loanInformation.LegalGuarantorBailInfo.length > 0
  //   ) {
  //     let parameter = {
  //       type: "BailInfo",
  //       id: "fill"
  //     };
  //     await detailsServices.update(parameter, information).$promise.then(
  //       response => {
  //         goToDashboard();

  //         iziToast.show({
  //           message: response.message,
  //           theme: "light",
  //           color: "green"
  //         });
  //       },
  //       errResponse => {
  //         iziToast.show({
  //           message: errResponse.data.message,
  //           theme: "light",
  //           color: "red"
  //         });
  //         console.log("error");
  //       }
  //     );
  //   } else {
  //     return iziToast.show({
  //       message: "حداقل یک ضامن باید وارد کنید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  // self.backToSelectedBail = function() {
  //   self.details.currentState.status = 40;
  // };
  // self.submitBails = async function(item, form) {
  //   let individualMembersForm = angular
  //     .element("[name='individualMembersForm']")
  //     .controller("form");
  //   let legalMembers = angular
  //     .element("[name='legalMembers']")
  //     .controller("form");
  //   let prmoMembers = angular
  //     .element("[name='prmoMembers']")
  //     .controller("form");

  //   if (individualMembersForm != undefined) {
  //     form.$removeControl(individualMembersForm);
  //   }
  //   if (legalMembers != undefined) {
  //     form.$removeControl(legalMembers);
  //   }
  //   if (prmoMembers != undefined) {
  //     form.$removeControl(prmoMembers);
  //   }

  //   if (form.$valid) {
  //     let parameter = {
  //       type: "legal-persons",
  //       id: "self",
  //       routeParams: "loan-requests",
  //       routeParams2: self.requestId,
  //       routeParams3: "suggested-bails"
  //     };

  //     item.amount = self.selectedBail.approvedAmount;
  //     item.selectedBailId = self.selectedBail.id;
  //     item.bails = self.selectedBail.bails;
  //     item.chequeWithGuarantorInfo.chequeInfo = item.chequeInfo;

  //     await detailsServices.create(parameter, item).$promise.then(
  //       response => {
  //         iziToast.show({
  //           message: response.message,
  //           theme: "light",
  //           color: "green"
  //         });
  //         state.go("panel.dashboard");
  //       },
  //       errResponse => {
  //         iziToast.show({
  //           message: errResponse.data.message,
  //           theme: "light",
  //           color: "red"
  //         });
  //         console.log("error");
  //       }
  //     );
  //   } else {
  //     iziToast.show({
  //       message: "فرم را تکمیل کنید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  //بارگذاری مدارک وثایق و تضامین

  self.editInformation = function (loanType, loanId) {
    state.go("panel.loan.editRequest.directorsInformation", {
      // type: loanTypeFactoryEnum(loanType),
      type: stateParams.type,
      id: loanId
    });
  };

  self.editLeasing = function (loanType, loanId) {
    state.go("panel.loan.editRequest.requestData", {
      // type: loanTypeFactoryEnum(loanType),
      type: stateParams.type,
      id: self.leasingDetails.leasingRequestFolderId
    });
  };

  self.buyerApproval = function (loanType, loanId) {
    state.go("panel.loan.buyerApproval.requestData", {
      // type: loanTypeFactoryEnum(loanType),
      type: stateParams.type,
      id: self.leasingDetails.leasingRequestFolderId
    });
  };

  // //مشاهده کاربرگ و آپلود
  // self.downloadTemplate = function() {
  //   let promise1 = new Promise(function(resolve, reject) {
  //     var url = `${apiLoan}/loan-requests/${self.requestId}/work-sheet/template`;
  //     var req = new XMLHttpRequest();
  //     req.open("GET", url, true);
  //     req.setRequestHeader("Content-Type", "application/json");
  //     req.setRequestHeader("Authorization", "Bearer " + user.auth_token);
  //     req.responseType = "blob";
  //     req.onload = function(event) {
  //       if (req.status === 200) {
  //         resolve(req.response);
  //       } else {
  //         reject(req.response);
  //       }
  //     };
  //     req.send();
  //   });
  //   return promise1
  //     .then(function(value) {
  //       var blob = value;
  //       var link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = "worksheetTemplate.docx";
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //     })
  //     .catch(reason => {
  //       iziToast.show({
  //         message: "فایل مورد نظر یافت نشد.",
  //         theme: "light",
  //         color: "red"
  //       });
  //     });
  // };

  //کاربرگ
  // self.worksheetAttachment = null;
  // self.worksheetAttachmentFileName = "";
  // self.uploadWorksheetAttachment = function(file) {
  //   if (file.length > 0) {
  //     upload
  //       .upload({
  //         url: apiFileManagerPost,
  //         data: {
  //           file: file
  //         }
  //       })
  //       .then(
  //         function(response) {
  //           console.log("Ok");
  //           self.worksheetAttachment = response.data[0].fileName;
  //         },
  //         function(resp) {
  //           console.log("NOk");
  //           self.worksheetAttachment = null;
  //         },
  //         function(evt) {
  //           var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
  //           if (progressPercentage < 100) {
  //             self.loadingShow = true;
  //           } else {
  //             self.loadingShow = false;
  //           }
  //         }
  //       );
  //   }
  // };

  // self.submitWorksheet = function() {
  //   if (self.worksheetAttachment != null) {
  //     let command = {
  //       description: "توضیحات",
  //       workSheet: self.worksheetAttachment
  //     };

  //     let parameter = {
  //       type: "loan-requests",
  //       id: self.requestId,
  //       routeParams: "work-sheet"
  //     };

  //     detailsServices.update(parameter, command).$promise.then(
  //       response => {
  //         iziToast.show({
  //           message: response.message,
  //           theme: "light",
  //           color: "green"
  //         });
  //         state.go("panel.dashboard");
  //       },
  //       errResponse => {
  //         iziToast.show({
  //           message: errResponse.data.message,
  //           theme: "light",
  //           color: "red"
  //         });
  //       }
  //     );
  //   } else {
  //     iziToast.show({
  //       message: "فایل کاربرگ را آپلود نمایید.",
  //       theme: "light",
  //       color: "red"
  //     });
  //   }
  // };
  //کاربرگ
}

module.exports = ngModule => {
  ngModule.controller("panel.loan.detailsController", detailsController);
};
