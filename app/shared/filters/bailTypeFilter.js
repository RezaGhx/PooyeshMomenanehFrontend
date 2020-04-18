function bailTypeFilter() {
	return function (value) {
		let type;
		switch (value) {
			case 1:
				type = 'چک';
				break;
			case 2:
				type = 'چک با ضامن';
				break;
			case 3:
				type = 'ملک';
				break;
			case 4:
				type = 'آورده نقدی';
				break;
			default:
				break;
		}
		return type;
	};
}
module.exports = ngModule => {
	ngModule.filter('bailTypeFilter', bailTypeFilter);
};