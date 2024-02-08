import React from 'react';

import { filterData } from '../';

const parseDirection = (dir = '') => {
	let res = '';

	switch(dir) {
		case 'in':
			res = 'Inbound Calls';
			break;
		case 'out':
			res = 'Outbound Calls';
			break;
		default:
			res = 'N/A';
	}

	return res;
};

const useCallUserStatistics = ({
	callData, 
	userOptions, reasonOptions, 
	statusOptions, directionOptions,
	outcomeOptions, salesLeadOptions, 
}) => {
	const filteredStatuses = React.useMemo(() => statusOptions.map(({ value }) => 
		filterData(callData, ['status'], value)
	), [callData]);

	const filteredDirections = React.useMemo(() => directionOptions.map(({ value }) => 
		filterData(callData, ['direction'], value)
	), [callData]);

	const filteredReasons = React.useMemo(() => reasonOptions.map(({ value }) => 
		filterData(callData, ['reason'], value)
	), [callData]);

	const filteredOutcomes = React.useMemo(() => outcomeOptions.map(({ value }) => 
		filterData(callData, ['outcome'], value)
	), [callData]);

	/* Rows */
	const statusRows = React.useMemo(() => filteredStatuses.map((payload, sIdx) => {
		let total = 0;

		const userStatuses = userOptions.reduce((agg, { value }) => {
			const userTotal = ([
				...filterData(payload, ['phoneTitle1'], value),
				...filterData(payload, ['routedToUser'], value)
			]).length;

			total += userTotal;

			return Object.assign(agg, {
				name: statusOptions[sIdx].label,
				[value]: userTotal,
			});
		}, {});

		return { total, ...userStatuses };
	}), [filteredStatuses]);

	const directionRows = React.useMemo(() => filteredDirections.map((payload, dIdx) => {
		let total = 0;

		const userDirections = userOptions.reduce((agg, { value }) => {
			const userTotal = ([
				...filterData(payload, ['phoneTitle1'], value),
				...filterData(payload, ['routedToUser'], value)
			]).length;

			total += userTotal;

			return Object.assign(agg, {
				name: parseDirection(directionOptions[dIdx].label),
				[value]: userTotal,
			});
		}, {});

		return { total, ...userDirections };
	}), [filteredDirections]);

	const reasonRows = React.useMemo(() => filteredReasons.map((payload, rIdx) => {
		let total = 0;

		const userReasons = userOptions.reduce((agg, { value }) => {
			const userTotal = ([
				...filterData(payload, ['phoneTitle1'], value),
				...filterData(payload, ['routedToUser'], value)
			]).length;

			total += userTotal;

			return Object.assign(agg, {
				name: reasonOptions[rIdx].label,
				[value]: userTotal,
			});
		}, {});

		return { total, ...userReasons };
	}), [filteredReasons]);

	const outcomeRows = React.useMemo(() => filteredOutcomes.map((payload, oIdx) => {
		let total = 0;

		const userOutcomes = userOptions.reduce((agg, { value }) => {
			const userTotal = ([
				...filterData(payload, ['phoneTitle1'], value),
				...filterData(payload, ['routedToUser'], value)
			]).length;

			total += userTotal;

			return Object.assign(agg, {
				name: outcomeOptions[oIdx].label,
				[value]: userTotal,
			});
		}, {});

		return { total, ...userOutcomes };
	}), [filteredOutcomes]);

	return [ ...outcomeRows, ...reasonRows, ...directionRows, ...statusRows ];
};

export default useCallUserStatistics;
