import React, { useEffect, useState } from 'react';

const { IS_CLIENT } = process.env;
const Hydrate = React.memo(function Hydrate({ children }) {
	const [state, setState] = useState({ isMounted: false });

	useEffect(() => {
		setState({ isMounted: true });
	}, []);

	// Evita el Warning: Did not expect server HTML
	return IS_CLIENT && state.isMounted === false ? <div suppressHydrationWarning /> : children;
});

export default Hydrate;
