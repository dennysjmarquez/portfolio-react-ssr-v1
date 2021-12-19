/**
 *
 * Global constants file
 *
 */

module.exports = {
	clientConfig: {
		output: {
			publicPath: '/',
			path: 'static',
		},
	},
	serverConfig: {
		nodeCache: {
			expire: 18000, // <-- ttl 30 minutes
			enabled: true,
		},
	},
};
