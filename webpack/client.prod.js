const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { clientConfig } = require('../server/constant');

module.exports = {
	name: 'client',
	target: 'web',
	devtool: 'source-map',
	entry: ['babel-polyfill', path.resolve(__dirname, '../index.js')],
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, `../${clientConfig.output.path}`),
		publicPath: clientConfig.output.publicPath,
	},
	stats: 'verbose',
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
	mode: 'production',
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: ['.js', '.jsx', '.css', '.styl'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
		}),
		new ExtractCssChunks(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				IS_CLIENT: JSON.stringify(true),
			},
		}),
		new webpack.HashedModuleIdsPlugin(),
		new CopyWebpackPlugin([{ from: 'public' }]),
	],
};
