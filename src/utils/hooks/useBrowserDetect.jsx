import React from 'react';

// mobile
const isMobile = (navigator) => {
	const match = {
		Android: () => navigator.userAgent.match(/Android/i),
		Opera: () => navigator.userAgent.match(/Opera Mini/i),
		Windows: () => navigator.userAgent.match(/IEMobile/i),
		iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
		BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
		any: () =>
			isMobile(navigator).Android() ||
			isMobile(navigator).BlackBerry() ||
			isMobile(navigator).iOS() ||
			isMobile(navigator).Opera() ||
			isMobile(navigator).Windows(),
	};

	return match;
};

const dataBrowser = (navigator) => [
	{
		string: navigator.userAgent,
		subString: 'Chrome',
		identity: 'Chrome'
	},
	{
		string: navigator.userAgent,
		subString: 'OmniWeb',
		versionSearch: 'OmniWeb/',
		identity: 'OmniWeb'
	},
	{
		string: navigator.vendor,
		subString: 'Apple',
		identity: 'Safari',
		versionSearch: 'Version'
	},
	{
		prop: window.opera,
		identity: 'Opera',
		versionSearch: 'Version'
	},
	{
		string: navigator.vendor,
		subString: 'iCab',
		identity: 'iCab'
	},
	{
		string: navigator.vendor,
		subString: 'KDE',
		identity: 'Konqueror'
	},
	{
		string: navigator.userAgent,
		subString: 'Firefox',
		identity: 'Firefox'
	},
	{
		string: navigator.vendor,
		subString: 'Camino',
		identity: 'Camino'
	},
	{
		// For newer Netscapes (6+)
		string: navigator.userAgent,
		subString: 'Netscape',
		identity: 'Netscape'
	},
	{
		string: navigator.userAgent,
		subString: 'MSIE',
		identity: 'Explorer',
		versionSearch: 'MSIE'
	},
	{
		string: navigator.userAgent,
		subString: 'Gecko',
		identity: 'Mozilla',
		versionSearch: 'rv'
	},
	{
		// For older Netscapes (4-)
		string: navigator.userAgent,
		subString: 'Mozilla',
		identity: 'Netscape',
		versionSearch: 'Mozilla'
	}
];

const dataOS = (navigator) => [
	{
		string: navigator.platform,
		subString: 'Win',
		identity: 'Windows'
	},
	{
		string: navigator.platform,
		subString: 'Mac',
		identity: 'Mac'
	},
	{
		string: navigator.userAgent,
		subString: 'iPhone',
		identity: 'iPhone/iPod'
	},
	{
		string: navigator.platform,
		subString: 'Linux',
		identity: 'Linux'
	}
];

class BrowserDetect {
	constructor(navigator = {}) {
		this.init(navigator);
	}

	init(navigator) {
		this.OS = this.searchString(dataOS(navigator)) || 'an unknown OS';
		this.browser = this.searchString(dataBrowser(navigator)) || 'An unknown browser';
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
	}

	searchString(data = []) {
		for (var i = 0; i < data.length; i += 1) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) !== -1) {
					return data[i].identity;
				}
			} else if (dataProp) {
				return data[i].identity;
			}
		}
	}

	searchVersion(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}
		return parseFloat(
			dataString.substring(index + this.versionSearchString.length + 1)
		);
	}
}

const useBrowserDetect = () => {
	const [browserInfo, setBrowserInfo] = React.useState({
		OS: 'unknown',
		browser: 'unknown',
		version: 'unknown',
		language: 'unknown',
	});

	React.useEffect(() => {
		const detect = () => {
			if (typeof window === 'undefined') return;

			const browserDetect = new BrowserDetect(window.navigator);

			const OS = browserDetect.OS || 'unknown';
			const browser = browserDetect.browser || 'unknown';
			const version = browserDetect.version || 'unknown';
			const language = window.navigator.language || window.navigator.userLanguage || 'unknown';

			setBrowserInfo({ browser, version, OS, language });
		};

		detect();

		// Update the browser info on language change
		window.addEventListener('languagechange', detect);

		return () => {
			window.removeEventListener('languagechange', detect);
		};
	}, []);

	return browserInfo;
}

export default useBrowserDetect;

