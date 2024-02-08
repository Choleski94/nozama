import api from '@api';
import setAuthorizationHeader from '@utils/setAuthorizationHeader';

import * as actionTypes from '../types';

export const userLoggedIn = user => ({
	type: actionTypes.USER_LOGGED_IN,
	user
});

export const userLoggedOut = user => ({
	type: actionTypes.USER_LOGGED_OUT,
	user
});

// TODO
export const activate = (credentials) => (dispatch) => (
	api.auth.signin(credentials).then((user) => {
		const authToken = user.token;

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('tigadoJWT', authToken);
		}

		setAuthorizationHeader(authToken);
		dispatch(userLoggedIn(user));
	})
);

export const signin = (credentials) => (dispatch) => (
	api.auth.signin(credentials).then((user) => {
		const authToken = user.token;

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('tigadoJWT', authToken);
		}

		setAuthorizationHeader(authToken);
		dispatch(userLoggedIn(user));
	})
);

export const signup = (credentials) => (dispatch) => (
	api.auth.signup(credentials).then((user)  => {
		const authToken = user.token;

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('tigadoJWT', authToken);
		}

		setAuthorizationHeader(authToken);
		dispatch(userLoggedIn(user));
	})
);

export const logout = () => (dispatch) => (
	api.auth.logout().then(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('tigadoJWT');
		}

		dispatch(userLoggedOut());
	}).catch(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('tigadoJWT');
		}

		dispatch(userLoggedOut());
	})
);
