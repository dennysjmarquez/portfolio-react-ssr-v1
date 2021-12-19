import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { routerCurrentPath } from 'Core/utils/routertPath';
import { serverCache } from 'Core/utils/cache';

import App from '../App';

export default ({ clientStats }) =>
	(req, res) => {
		clearChunks();

		// Carga la información  de la ruta, y redirige si esta especificado
		// en el path de la ruta el el archivo de rotas
		const path = routerCurrentPath(req.url);
		if (path.redirect) {
			return res.redirect(308, path.redirect);
		}

		const { getInitialData } = path;
		const helmet = Helmet.renderStatic();
		const history = createMemoryHistory({
			initialEntries: [req.url],
		});

		const resSend = data => {
			const main = ReactDOMServer.renderToStaticMarkup(
				<StaticRouter location={req.url}>
					<div>
						<App data={data} history={history} page={path.page} />
					</div>
				</StaticRouter>
			);

			const chunkNames = flushChunkNames();
			const { js, styles } = flushChunks(clientStats, {
				chunkNames,
			});

			let scriptInit = ``;
			scriptInit += `window.__DATA_INI${getInitialData ? `_${getInitialData.toUpperCase()}` : ''}__ = ${JSON.stringify(
				getInitialData && data ? data : {}
			)}`;

			const MyDocument = `<!doctype html>
<html lang='es'>
   <head>
      <meta charset='utf-8'>
      <base href='/'/>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0'>
      <meta property='og:image' content='https://raw.githubusercontent.com/dennysjmarquez/portfolio/gh-pages/Qbasic.jpg'>
      <meta name='description' content='Página oficial de Dennys Jose Marquez Reyes | Portafolio Web Developer FrontEnd ➤ JavaScript ES6 / Angular / React / React Native / LitElement / Vue.js / HTML5 CSS3 Sass'/>
      <meta name='keywords' content='Dennys-Jose-Marquez-Reyes, dennysjmarquez, dennys-j-marquez, portafolio, portfolio, Web-Developer, Desarrollador-web, Venezuela, FrontEnd, Front-End, HTML, CSS, XML, JavaScript, TypeScript, Vue.js, Angular, React, LitElement, React-Native'>
      <meta name='author' content='Dennys Jose Marquez Reyes'>
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'>
      <link rel='icon' href='/favicon.ico' type='image/x-icon'>
      ${styles}
   </head>
   <body>
      <div id='root'>${main}</div>
      <script>${scriptInit}</script>
      ${js}
      <script src='https://code.jquery.com/jquery-3.5.1.slim.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'></script>
   </body>
</html>
`;

			return res.status(path.statusCode).send(MyDocument);
		};

		// Se accede al archivo especificado mediante el nombre en la prop getInitialData de la
		// ruta asociada a la página que se está cargando esto hace que se cargue una data de inicio
		try {
			if (!path.getInitialData) {
				return resSend(null);
			}

			const cacheEntry = serverCache.cacheEnable ? serverCache.parse(req.url) : null;
			const getNewData = () => {
				require(`./database/getInitialData/${path.getInitialData}`).initialize(
					data => {
						if (serverCache.cacheEnable) {
							serverCache.set(cacheEntry, data);
						}
						resSend(data);
					},
					{
						query: req.query || {},
						params: path.params || {},
					}
				);
			};

			if (serverCache.cacheEnable && serverCache.has(cacheEntry)) {
				const data = serverCache.get(cacheEntry);
				resSend(data);
			} else {
				getNewData();
			}
		} catch (e) {
			console.log(e);
			resSend(null);
		}
	};
