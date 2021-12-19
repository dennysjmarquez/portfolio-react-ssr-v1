const initialize = (callback, req = {}) => {
	const { query, params } = req;

	callback({
		dataContacto: true,
	});
};

module.exports = {
	initialize,
};
