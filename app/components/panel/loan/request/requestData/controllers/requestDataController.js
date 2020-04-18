requestDataController.$inject = [
	"panel.loan.request.requestDataServices",
	"$stateParams",
	"dataStore",
	"$state",
	"Upload",
	"$auth",
];

function requestDataController(
	requestDataServices,
	stateParams,
	dataStore,
	state,
	upload,
	auth,
) {
	var self = this;
	self.download = apiFileManagerGet + "/?id=";
	self.state = state;
	self.type = stateParams.type;
	console.log(self.type);
	self.id = auth.user().id;
	console.log(self.id);
	self.vendor = {};

	const getLeasingData = function () {
		self.vendor = dataStore.getData("leasingReq");
	};
	getLeasingData();

	self.vendor.type = self.type;

	self.submit = function (vendor, form) {
		// if (form.$valid) {
		dataStore.setData("leasingReq", vendor);
		state.go("panel.loan.request.requestInformation");
		// } else {
		// 	iziToast.show({
		// 		message: "فرم را تکمیل کنید",
		// 		theme: "light",
		// 		color: "red"
		// 	});
		// }
	};

	self.uploadBuyerDocuments = function (file) {
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
						self.vendor.buyerDocuments = response.data[0].fileName;
					},
					function (resp) {
						console.log("NOk");
						self.vendor.buyerDocuments = null;
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
						console.log("Ok");
						self.vendor.contractFile = response.data[0].fileName;
					},
					function (resp) {
						console.log("NOk");
						self.vendor.contractFile = null;
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

	self.uploadBuyerIntroduceLetter = function (file) {
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
						self.vendor.buyerIntroduceLetter = response.data[0].fileName;
					},
					function (resp) {
						console.log("NOk");
						self.vendor.buyerIntroduceLetter = null;
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

	self.uploadBuyerWorksheetAttachment = function (file) {
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
						self.vendor.buyerWorksheetAttachment = response.data[0].fileName;
					},
					function (resp) {
						console.log("NOk");
						self.vendor.buyerWorksheetAttachment = null;
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

	self.uploadSellerWorksheetAttachment = function (file) {
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
						self.vendor.sellerWorksheetAttachment = response.data[0].fileName;
					},
					function (resp) {
						console.log("NOk");
						self.vendor.sellerWorksheetAttachment = null;
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
}

module.exports = ngModule => {
	ngModule.controller(
		"panel.loan.request.requestDataController",
		requestDataController
	);
};
