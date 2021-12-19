const firebaseAdmin = require('firebase-admin');
// Path del Archivo de configuración para poder conectar con firebase "json Cuentas de servicio serviceAccountKey "
const serviceAccount = require('../config/firebase-config.json');

const initialize = (callback, req = {}) => {
	const { query, params } = req;

	if (!firebaseAdmin.apps.length) {
		firebaseAdmin.initializeApp({
			credential: firebaseAdmin.credential.cert(serviceAccount),
			databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
		});
	}

	const db = firebaseAdmin.database();
	const ref = db.ref('portfolio/boards');

	ref.once('value', snapshot => {
		const pins = [];
		const cates = snapshot.val();
		const portfolio = {};
		let boardsData = {};
		Object.keys(cates).forEach(cate => (boardsData = { ...boardsData, ...cates[cate] }));

		portfolio.boards = { all: { name: 'Mostrar todos', pins: [] }, ...boardsData };

		Object.keys(portfolio.boards).forEach(key => pins.push(...portfolio.boards[key].pins));

		const data = { boards: portfolio.boards, pins };

		callback(data);
	}).then(() => {});
};

module.exports = {
	initialize,
};
