import React from 'react';
import { Route } from 'react-router-dom';
import { routerCurrentPath } from '../utils/routertPath';

const { IS_CLIENT } = process.env;
const Main = React.memo(function Main({ data, page, history }) {
	return (
		<Route
			render={() => {
				const currentPath = routerCurrentPath(history.location.pathname);
				const { getInitialData } = currentPath;
				const currentData = IS_CLIENT
					? window[`__DATA_INI${getInitialData ? `_${getInitialData.toUpperCase()}` : ''}__`]
					: data;

				if (IS_CLIENT && getInitialData && !currentData) {
					return window.location.reload();
				}

				const component = page || currentPath.page;

				return React.isValidElement(component) ? React.cloneElement(component, { data: currentData }) : null;
			}}
		/>
	);
});

export default Main;
