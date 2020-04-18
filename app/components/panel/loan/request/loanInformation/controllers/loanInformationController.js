loanInformationController.$inject = [
	"panel.loan.request.loanInformationServices",
	"$stateParams",
	"Upload",
	"dataStore",
	"$state"
];

function loanInformationController(
	loanInformationServices,
	stateParams,
	upload,
	dataStore,
	state
) {
	var self = this;
	let type = stateParams.type;
	self.loan = {};

	const getLoanData = function () {
		self.loan = dataStore.getData("loanReq");
	};
	getLoanData();

	self.loan.type = type;

	self.submit = function (loan, form) {
		if (form.$valid) {
			dataStore.setData("loanReq", loan);
			state.go("panel.loan.request.uploadDocuments");
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
		"panel.loan.request.loanInformationController",
		loanInformationController
	);
};
