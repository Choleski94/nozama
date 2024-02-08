import React from 'react';

import {
	CALL_TECH_TITLE,
	CALL_DIRECTION_IN,
	CALL_DIRECTION_OUT,
	CALL_STATUS_NO_ANSWER,
} from '../../constants';

const useCallCount = (callData = []) => {
	const totalCallCount = React.useMemo(() => (
		callData.length
	), [callData]);

	const outboundCallCount = React.useMemo(() => (
		callData.filter(({ direction }) => {
			return direction === CALL_DIRECTION_OUT
		}).length
	), [callData]);

	const noAnswerCallCount = React.useMemo(() => (
		callData.filter(({ status }) => {
			return status === CALL_STATUS_NO_ANSWER
		}).length
	), [callData]);

	const inboundCallCount = React.useMemo(() => (
		totalCallCount - (outboundCallCount + noAnswerCallCount)
	), [callData]);

	const techInboundCallCount = React.useMemo(() => (
		callData.filter(({ direction, phoneTitle1, phoneTitle2 }) => {
			return direction === CALL_DIRECTION_IN && (
				phoneTitle1.includes(CALL_TECH_TITLE) || phoneTitle2.includes(CALL_TECH_TITLE)
			)
		}).length
	), [callData]);

	const techOutboundCallCount = React.useMemo(() => (
		callData.filter(({ direction, calledTitle1, calledTitle2 }) => {
			return direction === CALL_DIRECTION_OUT && (
				calledTitle1.includes(CALL_TECH_TITLE) || calledTitle2.includes(CALL_TECH_TITLE)
			)
		}).length
	), [callData]);

	const techNoAnswerCallCount = React.useMemo(() => (
		callData.filter(({ status, phoneTitle1, phoneTitle2 }) => {
			return status === CALL_STATUS_NO_ANSWER && (
				phoneTitle1.includes(CALL_TECH_TITLE) || phoneTitle2.includes(CALL_TECH_TITLE)
			)
		}).length
	), [callData]);

	const cxNoAnswerCallCount = React.useMemo(() => (
		noAnswerCallCount - techNoAnswerCallCount
	), [callData]);

	return {
		totalCallCount,
		inboundCallCount,
		outboundCallCount,
		noAnswerCallCount,
		cxNoAnswerCallCount,
		techInboundCallCount,
		techOutboundCallCount,
		techNoAnswerCallCount,
	};
};

export default useCallCount;
