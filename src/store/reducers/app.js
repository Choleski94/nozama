import * as actionTypes from '../types';

export const appState = {
	loading: false,
	isPrime: false,
};

const appReducer = (state = appState, action) => {
	switch (action.type) {
		case actionTypes.APP_LOADING:
			return { ...state, ...action.app };
		case actionTypes.APP_PRIME_TOGGLED:
			return { ...state, isPrime: !state.isPrime };
		default:
			return state;
	}
};

export default appReducer;
