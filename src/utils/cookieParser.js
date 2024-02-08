const cookieParser = (cookieString) => {

	if (cookieString === '') {
		return {};
	}

	return cookieString.split(';').reduce((cookieObj, pair) => {
		const [key, value] = pair.split('=').map(item => decodeURIComponent(item.trim()));
		cookieObj[key] = value;
		return cookieObj;
	}, {});
};

export default cookieParser;
