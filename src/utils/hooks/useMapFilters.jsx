import React from 'react';

import {
	TECH_COLORS,
	TASK_OPTIONS,
	MARKER_TYPES,
	MARKER_OPTIONS,
	PART_LOCATIONS,
	TECHS_LOCATIONS,
	PRIORITY_OPTIONS,
	OFFICE_LOCATIONS,
	DISPATCH_ZONE_OPTIONS,
} from '@constants';

import { onlyUnique, is2dArray, shareAtLeastOneElement, getEquipmentProps } from '../';

const useMapFilters = ({
	jobData,
	markers,
	filterTechs,
	filterZones,
	filterTasks,
	filterMarkers,
	filterStatuses,
	filterEquipments,
}, flatten = false) => {
	let res = [];

	const filteredPartMarkers = React.useMemo(() => PART_LOCATIONS.map(({ name, lat, lng }) => ({
		id: name, lat, lng, 
		type: MARKER_TYPES.PART,
		color: '#00FFFF',
		hoverValue: name,
		value: (
			<i className="fa fa-shopping-cart" />
		),
	})), [PART_LOCATIONS]);

	const filteredOfficeMarkers = React.useMemo(() => OFFICE_LOCATIONS.map(({ name, lat, lng }) => ({
		id: name, lat, lng, 
		type: MARKER_TYPES.OFFICE,
		color: '#39FF14',
		hoverValue: name,
		value: (
			<i className="fa fa-flag" />
		),
	})), [OFFICE_LOCATIONS]);

	const filteredByTechElts = React.useMemo(() => {
		// Check if we want to filter by techs
		if (!jobData.length || !filterTechs?.length) return jobData;

		return jobData.map((currentJobData) => currentJobData.filter(({ techs_assigned }) => {
			// Validate job is assigned.
			if (techs_assigned?.length) {
				return shareAtLeastOneElement(
					techs_assigned.map(({ id }) => id), 
					filterTechs
				);
			}
			return true;
		}));
	}, [ jobData, filterTechs]);

	const filteredByZoneElts = React.useMemo(() => {
		// Check if we want to filter by zones.
		if (!filteredByTechElts.length || !filterZones?.length) return filteredByTechElts;

		return filteredByTechElts.map((currentFilteredByTech) => currentFilteredByTech.filter(({ category }) => 
			category?.length && filterZones.includes(category)
		));
	}, [ filteredByTechElts, filterZones]);

	const filteredByStatusElts = React.useMemo(() => {
		// Check if we want to filter by statuses.
		if (!filteredByZoneElts.length || !filterStatuses?.length) return filteredByZoneElts;

		return filteredByZoneElts.map((currentFilteredByZone) => currentFilteredByZone.filter(({ status }) => 
			status?.length && filterStatuses.includes(status)
		));
	}, [ filteredByZoneElts, filterStatuses]);

	const filteredByEquipmentElts = React.useMemo(() => {
		// Check if we want to filter by equipments.
		if (!filteredByStatusElts.length || !filterEquipments?.length) return filteredByStatusElts;

		return filteredByStatusElts.map((currentFilteredByStatus) => currentFilteredByStatus.filter(({ equipment }) => {
			const equipmentTypeElts = equipment.map(({ type }) => {
				const { categoryType } = getEquipmentProps(type);
				return categoryType || type;
			});
			return (equipmentTypeElts.length) ? shareAtLeastOneElement(filterEquipments, equipmentTypeElts) : true
		}));
	}, [ filteredByStatusElts, filterEquipments]);

	const [ filteredJobIdElts, filteredTechIdElts, filteredTechMarkerElts ] = React.useMemo(() => {
		const arrySize = filteredByEquipmentElts?.length;

		// Check if we have data of valid length.
		if (!arrySize) {
			return [[], [], []];
		}

		let [ jobIdElts, techIdElts ] = [ new Array(arrySize).fill([]), new Array(arrySize).fill([])];

		filteredByEquipmentElts?.forEach((currentFilteredByEquipment, arrIdx) => {
			let [ tmpJobIdElts, tmpTechIdElts] = [[], []];

			currentFilteredByEquipment.forEach(({ id,  techs_assigned }) => {
				tmpJobIdElts.push(String(id));
				tmpTechIdElts.push(...techs_assigned.map(({ id }) => id));
			});

			jobIdElts[arrIdx] = tmpJobIdElts;
			techIdElts[arrIdx] = tmpTechIdElts;
		});
	
		const techMarkerElts = techIdElts.map((currentTechIds = []) => currentTechIds.filter(onlyUnique).map((id) => ({
		 	id, type: MARKER_TYPES.TECH,
		 	color: TECH_COLORS[String(id)],
		 	value: (
		 		<i className="fa fa-home" />
		 	),
		 	...TECHS_LOCATIONS[String(id)]
		 })));

		return [ jobIdElts, techIdElts, techMarkerElts ];
	}, [filteredByEquipmentElts]);

	const jobCountByTechIdElts = React.useMemo(() => {
		const jobCountByTechIdArr = [];

		// Check if we have data of valid length.
		if (!filteredTechIdElts.length) return filteredTechIdElts;

		filteredTechIdElts.map((currentFilteredTechId = []) => {
			const jobCountByTechIdObj = {};

			currentFilteredTechId.forEach((element) => {
				const currentElement = String(element);
				if (jobCountByTechIdObj[currentElement]) {
					jobCountByTechIdObj[currentElement]++;
				} else {
					jobCountByTechIdObj[currentElement] = 1;
				}
			});

			jobCountByTechIdArr.push(jobCountByTechIdObj);
		});

		return jobCountByTechIdArr;
	}, [filteredTechIdElts]);

	const filteredJobMarkerElts = React.useMemo(() => {
		const arrySize = markers?.length;

		if (!arrySize) return markers;

		let jobMarkerElts = new Array(arrySize).fill([]);

		markers.forEach((currentMarker, markerIdx) => {
			let tmpJobMarkerElts = [];
			currentMarker.forEach((payload, jobIdx) => {
				const currentFJIds = filteredJobIdElts[markerIdx];
				if (currentFJIds.includes(String(payload?.id))) {
					tmpJobMarkerElts.push(payload);
				}
			})
			jobMarkerElts[markerIdx] = tmpJobMarkerElts;
		});

		return jobMarkerElts;
	}, [filteredJobIdElts, markers]);

	const finalFilterObj = {
		jobs: filteredByEquipmentElts,
		jobCounts: jobCountByTechIdElts,
		partMarkers: filteredPartMarkers,
		jobMarkers: filteredJobMarkerElts,
		techMarkers: filteredTechMarkerElts,
		officeMarkers: filteredOfficeMarkers,
	};

	return !flatten ? finalFilterObj : Object.keys(finalFilterObj).reduce((agg, key) => {
		const tmpValue = finalFilterObj[key];
		const hasDimension = is2dArray(tmpValue);
		return Object.assign(agg, {
			[key]: hasDimension ? tmpValue.flat() : tmpValue
		});
	}, {});
};

export default useMapFilters;
