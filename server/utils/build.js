const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const clientConfigProd = require('../../webpack/client.prod');
const serverConfigProd = require('../../webpack/server.prod');

webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
	const clientStats = stats.toJson().children[0];

	const writeOutClientStats = fs.createWriteStream(path.resolve(__dirname, '../../buildServer/clientStats.json'));

	writeOutClientStats.write(JSON.stringify(clientStats), () => {
		console.log('Success build');
	});
});
