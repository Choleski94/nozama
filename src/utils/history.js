import { createBrowserHistory } from 'history';

const getHistory = () => {
	let res = {};

	if (typeof window !== 'undefined') {
		res = createBrowserHistory();
	}

	return res;
}

const history = getHistory();

export default history;
