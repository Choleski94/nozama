import React from 'react';

import {
	TECH_COLORS,
	TASK_OPTIONS,
	MARKER_OPTIONS,
	EQUIPMENT_OPTIONS,
} from '../../constants';

import { onlyUniqueByKey, sortAlphabeticallyByKey } from '../';

const useMapOptions = (jobData) => {

	const markerOptions = React.useMemo(() => (
		MARKER_OPTIONS
	), [MARKER_OPTIONS]);

	const taskOptions = React.useMemo(() => (
		TASK_OPTIONS
	), [TASK_OPTIONS]);

	const equipmentOptions = React.useMemo(() => (
		EQUIPMENT_OPTIONS
	), [EQUIPMENT_OPTIONS]);

	const [ techOptions, statusOptions, dispatchZoneOptions ] = React.useMemo(() => {
		let [ techElts, statusElts, dispatchZoneElts ] = [[], [], []];

		// Check if we have data.
		if (!jobData.length) jobData;

		// Step 0: Populate respective options.
		const jobCountElts = jobData.map((currentJob) => currentJob.length);

		for (let countIdx = 0; countIdx < jobCountElts.length; countIdx++) {

			const count = jobCountElts[countIdx];

			for (let count = 0; count < jobCountElts[countIdx]; count++) {
				const { category, techs_assigned, status } = jobData[countIdx][count];

				// Populate techs options. 
				if (techs_assigned.length) {
					techElts.push(...techs_assigned.map(({ id, first_name, last_name }) => ({
						'value': id,
						'color': TECH_COLORS[String(id)],
						'label': `${first_name} ${last_name}`,
					})));
				}

				// Populate status options.
				statusElts.push({ 'value': status, 'label': status });

				// Populate status options.
				dispatchZoneElts.push({ 'value': category, 'label': category });
			}
		}

		return [
			techElts.filter(onlyUniqueByKey('value')),
			statusElts.filter(onlyUniqueByKey('value')),
			dispatchZoneElts.filter(onlyUniqueByKey('value')).sort(sortAlphabeticallyByKey('value')),
		];
	}, [ (jobData || []).length]);

	return {
		techOptions,
		taskOptions,
		markerOptions,
		statusOptions,
		equipmentOptions,
		dispatchZoneOptions,
	};
};

export default useMapOptions;
