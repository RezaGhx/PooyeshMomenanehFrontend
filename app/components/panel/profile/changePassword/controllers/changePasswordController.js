changePasswordController.$inject = ["panel.profile.changePasswordServices", "$auth", "$state"];

function changePasswordController(changePasswordServices, auth, state) {

	var self = this;
	self.changePassword = {};
	self.userId = auth.user().id;
	self.submit = function (command, form) {
		if (form.$valid) {

			let query = {
				type: "accounts",
				routeParams: "password",
				state: "change"
			};

			changePasswordServices.update(query, command).$promise.then(
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
				message: "فرم را به درستی پر نمایید",
				theme: "light",
				color: "red"
			});
		}
	};

}

module.exports = ngModule => {

	ngModule.controller('panel.profile.changePasswordController', changePasswordController);

};