const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const res = p => path.resolve(__dirname, p);

const nodeModules = res('../node_modules');
const entry = res('../server/document.js');
const output = res('../buildServer');

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
	.readdirSync(nodeModules)
	.filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
	.reduce((externals, mod) => {
		externals[mod] = `commonjs ${mod}`;
		return externals;
	}, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
	name: 'server',
	devtool: 'source-map',
	target: 'node',
	mode: 'development',
	entry: ['regenerator-runtime/runtime.js', entry],
	externals,
	output: {
		path: output,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
							exportOnlyLocals: true,
						},
					},
					{
						loader: 'stylus-loader',
					},
				],
			},

			{
				test: /\.(scss|css)$/,
				resolve: { extensions: ['.scss', '.css'] },
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {},
					},
					'resolve-url-loader?sourceMap',
					'sass-loader?sourceMap',
				],
			},
		],
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: ['.js', '.jsx', '.css', '.styl'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new WriteFilePlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				IS_CLIENT: JSON.stringify(false),
				REACT_APP_FIREBASE_DATABASEURL: JSON.stringify(''),
			},
		}),
		new webpack.HashedModuleIdsPlugin(),
	],
};
