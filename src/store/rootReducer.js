import { combineReducers } from 'redux';

import appReducer, { appState } from './reducers/app';
import userReducer, { userState } from './reducers/user';

// Combine all states.
export const preloadedState = {
	app: appState,
	user: userState,
};

// Combine all reducers.
const rootReducer = combineReducers({
	app: appReducer,
	user: userReducer,
});

export default rootReducer;
