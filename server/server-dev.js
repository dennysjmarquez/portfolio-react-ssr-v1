require('colors');
const webpack = require('webpack');
const http = require('http');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../webpack/client.dev');
const serverConfig = require('../webpack/server.dev');

const normalizePort = port => parseInt(port, 10);

const PORT = normalizePort(process.env.PORT || 5000);

const { publicPath } = clientConfig.output;
const app = express();

const done = () => {
	const server = http.createServer(app);

	server.listen(PORT, error => {
		if (error) {
			return console.error(error);
		}
		console.log();
		console.log('##############################');
		console.log('###### DEVELOPMENT MODE ######');
		console.log('##############################');
		console.log();
		console.log(`BUILD COMPLETE -- Listening @ http://localhost:${PORT}`.magenta);
	});
};

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options = {
	publicPath,
	stats: { colors: true },
};
const devMiddleware = webpackDevMiddleware(compiler, options);

app.use(devMiddleware);


app.use(webpackHotMiddleware(clientCompiler));

// Monta el servidor document.js en el primer y único endpoind
app.use(webpackHotServerMiddleware(compiler));

devMiddleware.waitUntilValid(done);
