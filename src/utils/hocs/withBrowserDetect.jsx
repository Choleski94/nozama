import React from 'react';

import useBrowserDetect from '../hooks/useBrowserDetect';

const withBrowserDetect = (Component) => {
	const WithBrowserDetect = ({ ...rest }) => {
		const { browser, version, OS, language } = useBrowserDetect();

		const [ready, setReady] = React.useState(false);

		React.useEffect(() => {
			setReady(true);
		}, []);

		const props = React.useMemo(() => ({
			browser,
			version,
			OS,
			language,
			rest
		}), [browser, version, OS, language]);

		return ready ? <Component {...props} /> : null;
	};

	WithBrowserDetect.defaultName = 'WithBrowserDetect';
	
	return WithBrowserDetect;
};

export default withBrowserDetect;
