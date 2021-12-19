import React from 'react';
import universal from 'react-universal-component';

// Components - Paginas
const Portfolio = universal(() => import('../pages/portfolio'), { ignoreBabelRename: true });
const NotFound = universal(() => import('../pages/notFound'), { ignoreBabelRename: true });
const Contacto = universal(() => import('../pages/contacto'), { ignoreBabelRename: true });

// Rutas
const routePortafolio = {
	// El componente se cargar según el path
	component: <Portfolio />,

	// Nombre del fichero que se va a llamar para sacar
	// la data que se le va a pasar al componente
	getInitialData: 'portfolio',
};

const routerPaths = [
	{ path: '/portafolio', ...routePortafolio },
	{ path: '/contacto', component: <Contacto />, getInitialData: 'contacto' },
	{ path: '/', redirect: 'portafolio' },
	{ path: '**', component: <NotFound /> },
];

export default routerPaths;
