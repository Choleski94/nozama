import React from 'react';

const useNetwork = () => {
	const [ isOnline, setNetwork ] = React.useState(typeof window !== 'undefined' ? window.navigator.onLine : false);
	
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setNetwork(window.navigator.onLine);
		}
	}, [ window, window.navigator.onLine ]);

	return [isOnline];
}

export default useNetwork;
