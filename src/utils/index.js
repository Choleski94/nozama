export const getYear = () => {
	const d = new Date();
	return d.getFullYear();
}

export const isEven = (n = 0) => n % 2 == 0;

export const isBoolean = val => !!val === val;

export const hasObjectKey = (data = {}) => Boolean(
	Object.keys(data || {}).length
);

export const trimString = (str = '') => String(str || '').trim();

export const filterData = (payload = [], filterKeys = [], query = '') => (
	payload.filter((data, index, self) => {
		const values = filterKeys.map((key) => (
			key.split('.').reduce((obj, propertyName) => (
				obj && obj[propertyName]
			), data)
		));

		const stringValue = values.join('').toLowerCase();

		return (
			stringValue.includes(query.toLowerCase()) && 
			self.findIndex((item) => item === data) === index
		);
	})
);

export const sortAlphabeticallyByKey = (key) => (a, b) => a[key].localeCompare(b[key]);

export const onlyUnique = (item, index, arr) => arr.findIndex(val => val === item) === index;

export const shareAtLeastOneElement = (arr1, arr2) => arr1.map(elem => arr2.includes(elem)).includes(true);

export const onlyUniqueByKey = (key) => (item, index, arr) => arr.findIndex(obj => obj[key] === item[key]) === index;

export const onlyDuplicateByKey = (key) => (item, index, arr) => arr.findIndex(obj => obj[key] === item[key]) !== index;

export default {
	isEven,
	getYear,
	isBoolean,
	onlyUnique,
	filterData,
	trimString,
	hasObjectKey,
	onlyUniqueByKey,
	shareAtLeastOneElement,
	sortAlphabeticallyByKey,
}
