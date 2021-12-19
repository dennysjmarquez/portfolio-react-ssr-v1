import NodeCache from 'node-cache';
import { serverConfig } from 'Server/constant';

const cacheEnable = serverConfig.nodeCache.enabled;

export const serverCache = {
	...(cacheEnable
		? new NodeCache({
				stdTTL: serverConfig.nodeCache.expire,
				checkperiod: serverConfig.nodeCache.expire * 0.2,
				useClones: false,
		  })
		: {}),
	parse: str => {
		let hash = 0;
		let chr;
		if (str.length === 0) {
			return hash;
		}
		for (let i = 0; i < str.length; i++) {
			chr = str.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
		}
		hash = Math.abs(hash) >> 0;
		return `cacheID_${hash.toString(16).substring(0, 5).replace('-', 'c')}`;
	},
	cacheEnable,
};
