requestDataController.$inject = [
	"buyerApproval.requestDataServices",
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
	let requestId = stateParams.id;
	console.log(requestId);
	self.vendor = {};

	// self.introducerGroup = [
	// 	{
	// 		value: 1,
	// 		key: "معاونت علمی و فناوری ریاست جمهوری"
	// 	},
	// 	{
	// 		value: 2,
	// 		key: "صندوق نوآوری و شکوفایی"
	// 	},
	// 	{
	// 		value: 3,
	// 		key: "پارک فناوری پردیس"
	// 	},
	// 	{
	// 		value: 4,
	// 		key: "صندوق توسعه فناوری های نوین"
	// 	},
	// 	{
	// 		value: 0,
	// 		key: "سایر"
	// 	}
	// ];

	const getLeasingData = function () {
		self.vendor = dataStore.getData("leasingReq");
		// if (!angular.equals({}, self.loan) == false) {
		// 	getLeasingInfo();
		// }
	};
	getLeasingData();

	const getLeasingInfo = function () {
		let query = {
			type: "leasing-requests",
			id: requestId
		}
		self.promiseLoading = requestDataServices.getLeasing(query).$promise.then(
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
	getLeasingInfo();

	self.submit = function (vendor, form) {
		// if (form.$valid) {
		vendor.type = type;
		dataStore.setData("leasingReq", vendor);
		state.go("panel.loan.buyerApproval.requestData");
		// } else {
		//   iziToast.show({
		// 	message: "فرم را تکمیل کنید",
		// 	theme: "light",
		// 	color: "red"
		//   });
		// }
	  };


	self.submit = function (vendor) {
		let query = {
			type: "legal-persons",
			id: "self",
			routeParams: "leasing-requests",
		}
		requestDataServices.update(query, vendor).$promise.then(
			response => {
				iziToast.show({
					message: response.message,
					theme: "light",
					color: "green"
				});
				var test = response.content;
				dataStore.setData("leasingId", { test });
				state.go("panel.loan.buyerApproval.requestInformation");
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
	// submitInformation(self.leasingRequestFolder);

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
		"buyerApproval.requestDataController",
		requestDataController
	);
};
