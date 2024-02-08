import api from '@api';
import setAuthorizationHeader from '@utils/setAuthorizationHeader';

import * as actionTypes from '../types';

export const userFetched = user => ({
	type: actionTypes.USER_FETCHED,
	user
});

export const fetchUser = (userId) => (dispatch) => (
	api.user.fetchUser(userId).then((user) => {
		dispatch(userFetched(user));
	})
);
