import React from 'react';

import {
	CALL_STATUS_OPTIONS,
	OPTION_MISSING_REASON,
	OPTION_MISSING_OUTCOME,
	CALL_DIRECTION_OPTIONS,
	CALL_SALES_LEAD_OPTIONS,
} from '../../constants';

import { onlyUniqueByKey, sortAlphabeticallyByKey } from '../';

const useCallOptions = (callData) => {

	const statusOptions = React.useMemo(() => (
		CALL_STATUS_OPTIONS
	), [CALL_STATUS_OPTIONS]);

	const salesLeadOptions = React.useMemo(() => (
		CALL_SALES_LEAD_OPTIONS
	), [CALL_SALES_LEAD_OPTIONS]);

	const directionOptions = React.useMemo(() => (
		CALL_DIRECTION_OPTIONS
	), [CALL_DIRECTION_OPTIONS]);

	const [ userOptions, reasonOptions, outcomeOptions ] = React.useMemo(() => {
		let [ userElts, reasonElts, outcomeElts ] = [[], [], []];

		if (!callData || !callData.length) return [ userElts, reasonElts, outcomeElts ];

		// Step 0: Populate respective options.
		// const callCount = callData.length;
		const callCountElts = callData.map((currentCall) => currentCall.length);

		for (let countIdx = 0; countIdx < callCountElts.length; countIdx++) {

			const { routedToUser, reason, outcome } = callData[countIdx];

			// Populate users options. 
			if (routedToUser && routedToUser.length) {
				userElts.push({ 'value': routedToUser, 'label': routedToUser });
			}

			// Populate reasons options.
			if (reason && reason.length) {
				reasonElts.push({ 'value': reason, 'label': reason });
			}

			// Populate status options.
			if (outcome && outcome.length) {
				outcomeElts.push({ 'value': outcome, 'label': outcome });
			}
		}

		const sortedUserElts = userElts.filter(onlyUniqueByKey('value')).sort(sortAlphabeticallyByKey('value'));
		const sortedReasonElts = reasonElts.filter(onlyUniqueByKey('value')).sort(sortAlphabeticallyByKey('value'));
		const sortedOutcomeElts = outcomeElts.filter(onlyUniqueByKey('value')).sort(sortAlphabeticallyByKey('value'));

		/* Add missing option(s) */
		sortedReasonElts.push({ 'value': '', 'label': OPTION_MISSING_REASON });
		sortedOutcomeElts.push({ 'value': '', 'label': OPTION_MISSING_OUTCOME });

		return [
			sortedUserElts,
			sortedReasonElts,
			sortedOutcomeElts,
		];
	}, [ callData ]);

	return {
		userOptions,
		statusOptions,
		reasonOptions,
		outcomeOptions,
		directionOptions,
		salesLeadOptions,
	};
};

export default useCallOptions;
