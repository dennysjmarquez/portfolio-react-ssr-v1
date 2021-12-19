import React from 'react';

// bootstrap Css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import { Helmet } from 'react-helmet';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import Main from 'Core/components/Main';

class App extends React.Component {
	render() {
		const { data, page, history } = this.props;

		return (
			<>
				<Helmet>
					<title>
						Dennys J Marquez | Desarrollador Web Senior Full Front-End ➤ JavaScript ES6 / Angular - TypeScript /
						React - React Native / LitElement / Vue.js / Nex.js / HTML5 CSS3 Sass 🔥
					</title>
				</Helmet>

				<Header />

				<div className="d-flex flex-column min-vh-100">
					<main role="main" className="flex-grow-1 main">
						<div className="blok-0">
							<div className="title-1">Desarrollador Web Senior Full Front-End ➤</div>

							<div className="title-2">
								<span>JavaScript ES6</span> / <span>Angular - TypeScript</span> /{' '}
								<span>React - React Native</span> / <span>LitElement</span> / <span>Vue.js</span> /{' '}
								<span>Nex.js</span> / <span>HTML5 CSS3 Sass</span>
								<img
									src="/assets/images/fireEmo.png"
									style={{ width: '28px', marginLeft: '6px', marginBottom: '5px' }}
									alt=""
								/>
							</div>
						</div>

						<div className="blok-1">
							<Main data={data} page={page} history={history} />
						</div>
					</main>

					<Footer />
				</div>
			</>
		);
	}
}

export default App;
