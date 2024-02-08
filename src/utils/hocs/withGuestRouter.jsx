import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { isAuthenticated } from '@store/selectors/user';

const withGuestRouter = (Component) => {
	const WithGuestRouter = ({ ...rest }) => {
		const isAuth = useSelector(isAuthenticated);

		return (
			!isAuth ? (
				<Component {...rest} />
			) : (
				<Navigate replace to="/dashboard" />
			)
		);
	};

	WithGuestRouter.defaultName = 'WithGuestRouter';
	
	return WithGuestRouter;
};

export default withGuestRouter;
