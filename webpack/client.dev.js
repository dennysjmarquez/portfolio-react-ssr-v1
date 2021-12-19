const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { clientConfig } = require('../server/constant');

module.exports = {
	name: 'client',
	target: 'web',
	devtool: 'inline-source-map',
	mode: 'development',
	entry: [
		'babel-polyfill',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		path.resolve(__dirname, '../index.js'),
	],
	output: {
		filename: '[name].chunk.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, `../${clientConfig.output.path}`),
		publicPath: clientConfig.output.publicPath,
	},
	cache: false,
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(css)$/,
				resolve: { extensions: ['.scss', '.css'] },
				use: [
					'style-loader',
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
			filename: '[name].chunk.css',
		}),
		new WriteFilePlugin(),
		new ExtractCssChunks(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				IS_CLIENT: JSON.stringify(true),
			},
		}),
		new CopyWebpackPlugin([{ from: 'public' }]),
	],
};
