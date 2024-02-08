import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { isAuthenticated } from '@store/selectors/user';

const withPrivateRouter = (Component) => {
	const WithPrivateRouter = ({ ...rest }) => {
		const isAuth = useSelector(isAuthenticated);

		return (
			isAuth ? (
				<Component {...rest} />
			) : <Navigate replace to="/" />
		);
	};

	WithPrivateRouter.defaultName = 'WithPrivateRouter';
	
	return WithPrivateRouter;
};

export default withPrivateRouter;
