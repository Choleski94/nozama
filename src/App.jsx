import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import routes from '@constants/routes';
// import themes from '@components/themes';
// import { fetchUser } from '@store/actions/user';
import { withEscapeKeyListener } from '@utils/hocs';
// import { selectUser } from '@store/selectors/user';
import { getLocale, constructLocale } from '@locales';
// import { selectLocaleSettings } from '@store/selectors/settings';
// const theme = 'light';

const Nozama = () => {
	// const dispatch = useDispatch();

	// const { id: userId } = useSelector(selectUser);
	// const localeISO = constructLocale(useSelector(selectLocaleSettings));

	// const localeMessage = getLocale(localeISO);

	// React.useEffect(() => {
	// 	dispatch(fetchUser(userId));
	// }, []);

	return (
		// <ThemeProvider theme={themes[theme]}>
			// <IntlProvider key={localeISO} locale={localeISO} messages={localeMessage}>
				<Routes>
					{(routes.map(({ slug, element: Component, path }) => (
						<Route 
							key={slug} path={path} 
							element={<Component />} 
						/>
					)))}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			// </IntlProvider>
		// </ThemeProvider>
	);
}

export default withEscapeKeyListener(Nozama);
