warrantyInformationController.$inject = [
	"panel.warranty.request.warrantyInformationServices",
	"$stateParams",
	"warrantyTypeFactory",
	"Upload",
	"dataStore",
	"$state"
];

function warrantyInformationController(
	warrantyInformationServices,
	stateParams,
	warrantyTypeFactory,
	upload,
	dataStore,
	state
) {
	var self = this;
	let type = stateParams.type;
	self.type = stateParams.type;

	self.company = {};
	self.selectedEmployerStatus = false;
	self.employersList = [];

	const getWarrantyData = function () {
		self.company = dataStore.getData();
		console.log(self.company);
	};
	getWarrantyData();
	self.company.warrantyType = warrantyTypeFactory(type);

	self.download = apiFileManagerGet + "/?id=";

	//اتوکامپیلیت برای نام کارفرما
	const getEmployers = function (searchText) {
		let query = {
			type: "Employers",
			routePart: "Name",
			hascontract: true,
			search: searchText
		};
		if (searchText) {
			warrantyInformationServices.get(query).$promise.then(function (response) {
				self.employersList = response.content;
			});
		}
	};

	self.employerListHandler = function (searchText) {
		let selectedEmployer = self.employersList.find(
			employer => employer.name == searchText
		);
		if (selectedEmployer) {
			self.selectedEmployerStatus = true;
		} else {
			getEmployers(searchText);
			self.selectedEmployerStatus = false;
		}
	};

	self.uploadLogo = function (file, name) {
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
						self.company[name] = response.data[0].fileName;
						console.log(self.company.name);
					},
					function (resp) {
						self.company[name] = null;
					},
					function (evt) {
						var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
						self.loadingShow = {};
						if (progressPercentage < 100) {
							self.loadingShow[name] = true;
						} else {
							self.loadingShow[name] = false;
						}
						console.log(progressPercentage);
					}
				);
		}
	};

	self.submit = function (company, form) {
		
		if (form.$valid) {
			if (self.type == "tender") {
				if (!angular.isUndefined(company.logoFile)) {
					dataStore.setData("warrantyReq", company);
					state.go("panel.warranty.request.requestInformation");
				} else {
					iziToast.show({
						message: "فایل آگهی مناقصه را آپلود نمایید",
						theme: "light",
						color: "red"
					});
				}
			}

			if (self.type == "prepaidContract") {
				if (!angular.isUndefined(company.contractImageAttachment)) {
					dataStore.setData("warrantyReq", company);
					state.go("panel.warranty.request.requestInformation");
				} else {
					iziToast.show({
						message: "فایل تصویر قرارداد را آپلود نمایید",
						theme: "light",
						color: "red"
					});
				}
			}

			if (self.type == "goodFulfillmentOfObligations") {
				if (!angular.isUndefined(company.fulfillContractImageAttachment)) {
					dataStore.setData("warrantyReq", company);
					state.go("panel.warranty.request.requestInformation");
				} else {
					iziToast.show({
						message: "فایل تصویر قرارداد را آپلود نمایید",
						theme: "light",
						color: "red"
					});
				}
			}

			if (self.type == "credit") {
				if (!angular.isUndefined(company.contractDraftAttachment)) {
					if (!angular.isUndefined(company.logoFilecr)) {
						dataStore.setData("warrantyReq", company);
						state.go("panel.warranty.request.requestInformation");
					} else {
						iziToast.show({
							message: "فایل تصویر تاییدیه بانک را آپلود نمایید",
							theme: "light",
							color: "red"
						});
					}
					
				} else {
					iziToast.show({
						message: "فایل تصویر قرارداد را آپلود نمایید",
						theme: "light",
						color: "red"
					});
				}
			}

			//else {
			//	dataStore.setData("warrantyReq", company);
			//	state.go("panel.warranty.request.requestInformation");
			//}
		} else {
			iziToast.show({
				message: "فرم را تکمیل کنید",
				theme: "light",
				color: "red"
			});
		}
	};
}

module.exports = ngModule => {
	ngModule.controller(
		"panel.warranty.request.warrantyInformationController",
		warrantyInformationController
	);
};
