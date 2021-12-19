import React from 'react';
import './css/notFound.css';
import { Helmet } from 'react-helmet';

const NotFound = React.memo(() => (
	<>
		<Helmet>
			<title>Dennys J Marquez | 404 - PAGE NOT FOUND</title>
		</Helmet>

		<div className="notFound_container">
			<span>404 - PAGE NOT FOUND</span>
		</div>
	</>
));

export default NotFound;
