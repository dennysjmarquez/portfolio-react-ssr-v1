import React from 'react';

import { Link, useHistory } from 'react-router-dom';

const LinkTo = React.memo(function LinkTo({ to, className, children }) {
	const history = useHistory();

	const onClick = event => {
		event.preventDefault();
		event.stopPropagation();

		if (to === history.location.pathname) {
			return;
		}

		history.push({ pathname: to });
	};

	return (
		<Link to={to} className={className} onClick={onClick}>
			{children}
		</Link>
	);
});

export default LinkTo;
