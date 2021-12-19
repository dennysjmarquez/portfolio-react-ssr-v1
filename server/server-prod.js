require('colors');
const compression = require('compression');
const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

const handleErrorsMiddleware = require('./middlewares/handleErrors');

const oneYear = 365 * 24 * 60 * 60 * 1000;

const { clientConfig } = require('./constant');
const serverRender = require('../buildServer/main.js').default;

const clientStats = require(path.resolve(__dirname, '../buildServer/clientStats.json'));

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const { publicPath } = clientConfig.output;
const outputPath = path.resolve(__dirname, `../${clientConfig.output.path}`);

app.use(compression());
app.use(publicPath, express.static(outputPath, { maxAge: oneYear }));
app.use(serverRender({ clientStats }));

// Control de errores
app.use(handleErrorsMiddleware);

const server = http.createServer(app);

server.listen(PORT, error => {
	if (error) {
		return console.error(error);
	}
	console.log();
	console.log('##############################');
	console.log('####### PRODUCTION MODE ######');
	console.log('##############################');
	console.log();
	console.log(`RUN - Listening @ http://localhost:${PORT}`.magenta);
});
