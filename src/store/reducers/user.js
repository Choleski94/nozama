import * as actionTypes from '../types';

export const userState = {
	id: null,
	email: null,
	phone: null,
	token: null,
	loading: false,
	lastName: null,
	firstName: null,
	isOnboarded: true,
	workspaces: [],
};

const userReducer = (state = userState, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGGED_IN:
			return { ...state, ...action.user };
		case actionTypes.USER_LOGGED_OUT:
			return { ...userState };
		case actionTypes.USER_FETCHED:
			return { ...state, ...action.user };
		case actionTypes.FAILED_REQUEST:
			return userState;
		default:
			return state;
	}
};

export default userReducer;
