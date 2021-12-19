import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Hydrate from 'Core/components/Hydrate';
import App from './App';

const history = createBrowserHistory();
const { IS_CLIENT } = process.env;

if (IS_CLIENT) {
	history.location = window.location;
}

const render = App =>
	ReactDOM.hydrate(
		<AppContainer>
			<BrowserRouter forceRefresh>
				<Hydrate>
					<App history={history} />
				</Hydrate>
			</BrowserRouter>
		</AppContainer>,
		document.getElementById('root')
	);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./App.jsx', () => {
		const Main = require('./App').default;
		render(Main);
	});
}

render(App);
