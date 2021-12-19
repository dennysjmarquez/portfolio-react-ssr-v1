const sampleDatabase = require('./sampleDatabase.json');

const initialize = (callback, req = {}) => {
	const { query, params } = req;

	const pins = [];
	const portfolio = {};
	let boardsData = {};
	const cates = sampleDatabase.boards;

	Object.keys(cates).forEach(cate => (boardsData = { ...boardsData, ...cates[cate] }));

	portfolio.boards = { all: { name: 'Mostrar todos', pins: [] }, ...boardsData };

	Object.keys(portfolio.boards).forEach(key => pins.push(...portfolio.boards[key].pins));

	const data = { boards: portfolio.boards, pins };

	callback(data);
};

module.exports = {
	initialize,
};
