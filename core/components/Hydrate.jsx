import React, { useEffect, useState } from 'react';

const Hydrate = React.memo(function Hydrate({ children }) {
	const [state, setState] = useState({ isMounted: false });

	useEffect(() => {
		setState({ isMounted: true });
	}, []);

	// Evita el Warning: Did not expect server HTML, isMounted
	// hace que renderice el Fron-end con el html del servidor es una copia exacta,
	return state.isMounted === false ? <div suppressHydrationWarning /> : children;
});

export default Hydrate;
