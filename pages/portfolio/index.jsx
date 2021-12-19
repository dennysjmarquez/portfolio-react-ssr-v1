import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Mascot from 'Components/common/Mascot';
import './css/portfolio.css';

const boardINI = 'all';

const Portfolio = React.memo(function Portfolio(props) {
	const [pins, setPins] = useState(props.data?.pins || []);
	const [loading, setLoading] = useState(true);
	const [boardActive, setBoardActive] = useState(boardINI);
	const boardName = useRef('Mostrar todos');

	const boards = props?.data?.boards;

	useEffect(() => {
		setLoading(false);
		return () => {};
	}, []);

	useEffect(() => {
		if (!loading) {
			ReactTooltip.rebuild();
		}
	});

	const gePinsForBoard = board => {
		const { data } = props;
		const { boards } = data;

		window.scrollTo({ top: 0, behavior: 'smooth' });
		setBoardActive(board);

		if (!data || !boards[board]) {
			return;
		}

		let pins = [];

		boardName.current = boards[board].name || '';

		if (board === 'all') {
			Object.keys(boards).forEach(key => {
				pins.push(...boards[key].pins);
			});
		} else {
			pins = boards[board].pins;
		}

		setPins(pins);
		setLoading(false);
	};

	return (
		<>
			<div className="portfolio">
				<div className="portfolio-header">
					<ul className="blok-skill-tags">
						{boards &&
							Object.keys(boards).map(key => {
								const { name } = boards[key];

								return (
									<li
										key={key}
										onClick={() => gePinsForBoard(key)}
										className={classNames({ active: boardActive === key })}
									>
										<div className="skill">
											{key !== 'all' && (
												<img
													className="imag-skill"
													src={`/assets/images/skill-icons/${key}.svg`}
													alt={name}
												/>
											)}

											<span>{name}</span>
										</div>
									</li>
								);
							})}
					</ul>
					<div className="title-3">
						<div>Portafolio</div>

						<Mascot />
					</div>
				</div>

				<div className="container-1">
					{loading && (
						<div className="loader">
							<span />
						</div>
					)}

					<div className={classNames('container-content', { hide: loading })}>
						{pins?.length ? (
							<>
								<small className="small-skill-tags">
									Mostrando: <span>"{pins.length}"</span> proyectos filtrados por:{' '}
									<span>"{boardName.current}"</span>
								</small>

								<div className="container-fluid">
									<div className="card-columns">
										{pins.map((item, index) => {
											const { image, link, title, noIcon, board } = item;

											return (
												<div className="card animated fadeIn" key={index}>
													<a href={link} target="_blank" rel="noreferrer">
														<div
															className="card-img-wrap"
															data-tip="Ver más"
															data-text-color="#ffffff"
														>
															<div className="card-img">
																<img src={image} className="card-img-top" alt={title} />
															</div>
														</div>
													</a>

													<div className="card-body">
														{!noIcon && (
															<img
																className="imag-skill"
																src={`./assets/images/skill-icons/${board}.svg`}
																alt={board}
															/>
														)}
														<p className="card-t">{title}</p>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
			<ReactTooltip place="top" effect="float" multiline className="tooltip-1" />
		</>
	);
});

export default Portfolio;
