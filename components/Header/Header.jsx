import React from 'react';
import { Link } from 'react-router-dom';

// Component Styles
import './css/Header.css';
import { useLocation } from 'react-router';
import classNames from 'classnames';
// import LinkTo from "../../core/components/LinkTo";


const Header = React.memo(function Header() {
	const location = useLocation();
	const url = location.pathname;

	return (
		<header className="header">
			<nav className="navbar navbar-expand-md navbar-dark fixed-lg-top bg-dark">
				<span className="brand">Dennys J Marquez</span>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						<li className={classNames('nav-item', { active: url === '/portafolio' })}>
							<Link to="/portafolio" className="nav-link">
								Portafolio
							</Link>
						</li>
						<li className={classNames('nav-item', { active: url === '/404' })}>
							<Link to="/404" className="nav-link">
								Error 404
							</Link>
						</li>
						<li className={classNames('nav-item', { active: url === '/contacto' })}>
							<Link to="/contacto" className="nav-link">
								contacto
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
});

export default Header;
