import { matchPath } from 'react-router-dom';
import routerPaths from '../../router';

function searchPath(path) {
	const matchingRoute = routerPaths.find(route => matchPath(path, { exact: true, ...route }));
	const match = matchPath(path, matchingRoute);

	if (match) {
		return matchingRoute.redirect
			? { redirect: matchingRoute.redirect }
			: {
					page: matchingRoute.component,
					getInitialData: matchingRoute.getInitialData || null,
					params: match.params,
					statusCode: 200,
			  };
	}

	let notFoundPage = null;
	let getInitialData = null;

	try {
		notFoundPage = routerPaths['**'].component;
		getInitialData = routerPaths['**'].getInitialData;
	} catch (e) {
		/* Error */
	}

	return {
		page: notFoundPage,
		getInitialData,
		statusCode: 404,
	};
}

export const routerCurrentPath = path => searchPath(path);
