import axios from 'axios';

import config from '@config';

const setAuthorizationHeader = (token = null) => {
	if (token) {
		axios.defaults.baseURL = config.api.base_url;
		axios.defaults.headers.common.authorization = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common.authorization;
	}
};

export default setAuthorizationHeader;

