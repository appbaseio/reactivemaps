const _ = require("lodash");

export function Bearing(lat1, lng1, lat2, lng2) {
	function _toRad(deg) {
		return deg * Math.PI / 180;
	}

	function _toDeg(rad) {
		return rad * 180 / Math.PI;
	}
	const dLon = _toRad(lng2 - lng1);
	const y = Math.sin(dLon) * Math.cos(_toRad(lat2));
	const x = Math.cos(_toRad(lat1)) * Math.sin(_toRad(lat2)) - Math.sin(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.cos(dLon);
	const brng = _toDeg(Math.atan2(y, x));
	return ((brng + 360) % 360);
}

// append stream boolean flag and also start time of stream
export function streamDataModify(rawData, res, appbaseField) {
	if (res.data) {
		res.data.stream = true;
		res.data.streamStart = new Date();
		if (res.data._deleted) {
			const hits = rawData.hits.hits.filter(hit => hit._id !== res.data._id);
			rawData.hits.hits = hits;
		} else {
			const prevData = rawData.hits.hits.filter(hit => hit._id === res.data._id);
			if (prevData && prevData.length) {
				const preCord = prevData[0]._source[appbaseField];
				const newCord = res.data._source[appbaseField];
				res.data.angleDeg = Bearing(preCord.lat, preCord.lon, newCord.lat, newCord.lon);
			}
			const hits = rawData.hits.hits.filter(hit => hit._id !== res.data._id);
			rawData.hits.hits = hits;
			rawData.hits.hits.push(res.data);
		}
	}
	return {
		rawData,
		res,
		streamFlag: true
	};
}

// tranform the raw data to marker data
export function setMarkersData(data, appbaseField) {
	if (data && data.hits && data.hits.hits) {
		let markersData = data.hits.hits.map((hit, index) => {
			hit._source.mapPoint = identifyGeoData(hit._source[appbaseField]);
			return hit;
		});
		markersData = markersData.filter((hit, index) => hit._source.mapPoint && !(hit._source.mapPoint.lat === 0 && hit._source.mapPoint.lng === 0));
		markersData = sortByDistance(markersData);
		markersData = markersData.map((marker) => {
			marker.showInfo = false;
			return marker;
		});
		return markersData;
	}
	return [];
}

// centrialize the map
// calculate the distance from each marker to other marker,
// summation of all the distance and sort by distance in ascending order
export function sortByDistance(data) {
	let modifiedData = data.map((record) => {
		record.distance = findDistance(data, record);
		return record;
	});
	modifiedData = _.orderBy(modifiedData, "distance");
	return modifiedData;
}

export function findDistance(data, record) {
	record.distance = 0;
	const modifiednData = data.map((to) => {
		record.distance += getDistance(record._source.mapPoint.lat, record._source.mapPoint.lng, to._source.mapPoint.lat, to._source.mapPoint.lng);
	});

	function getDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1); // deg2rad below
		const dLon = deg2rad(lon2 - lon1);
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
	return record.distance;
}

export function identifyGeoData(input) {
	const type = Object.prototype.toString.call(input);
	let convertedGeo = null;
	if (type === "[object Object]" && input.hasOwnProperty("lat") && input.hasOwnProperty("lon")) {
		convertedGeo = {
			lat: Number(input.lat),
			lng: Number(input.lon)
		};
	} else if (type === "[object Array]" && input.length === 2) {
		convertedGeo = {
			lat: Number(input[1]),
			lng: Number(input[0])
		};
	}
	return convertedGeo;
}

export function afterChannelResponse(res, rawData, appbaseField, oldMarkersData) {
	const data = res.data;
	let markersData;
	const response = {
		streamFlag: false,
		newData: [],
		currentData: []
	};
	if (res.mode === "streaming") {
		response.channelMethod = "streaming";
		const modData = streamDataModify(rawData, res, appbaseField);
		rawData = modData.rawData;
		res = modData.res;
		response.streamFlag = true;
		markersData = setMarkersData(rawData, appbaseField);
		response.currentData = oldMarkersData;
		res.data._source.mapPoint = identifyGeoData(res.data._source[appbaseField]);
		response.newData = res.data;
	} else if (res.mode === "historic") {
		response.channelMethod = "historic";
		response.queryStartTime = res.startTime;
		rawData = data;
		markersData = setMarkersData(data, appbaseField);
		response.newData = markersData;
	}
	response.rawData = rawData;
	response.markersData = markersData;
	return response;
}

export const validation = {
	defaultZoom(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 20) {
			return new Error("zoom value should be an integer between 0 and 20.");
		}
	},
	validCenter(props, propName, componentName) {
		if (isNaN(props[propName])) {
			return new Error(`${propName} value must be number`);
		}
		if (propName === "lat" && (props[propName] < -90 || props[propName] > 90)) {
			return new Error(`${propName} value should be between -90 and 90.`);
		} else if (propName === "lng" && (props[propName] < -180 || props[propName] > 180)) {
			return new Error(`${propName} value should be between -180 and 180.`);
		}
	},
	fromValidation(props, propName, componentName) {
		if (props[propName] < 0) {
			return new Error(`${propName} value should be greater than or equal to 0.`);
		}
	},
	streamTTL(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 1000) {
			return new Error(`${propName} should be a positive integer between 0 and 1000, counted in seconds for a streaming update to be visible.`);
		}
	},
	popoverTTL(props, propName, componentName) {
		if (props[propName] < 0.1 || props[propName] > 60) {
			return new Error(`${propName} should be a positive integer between 1 and 60, counted in seconds for a popover to be visible.`);
		}
	}
};

export const normalizeCenter = (center) => {
	if(center && center.lon) {
		center.lng = center.lon
	}
	return center;
}

export const normalizeProps = (props) => {
	const propsCopy = _.clone(props);
	if(propsCopy.defaultCenter) {
		propsCopy.defaultCenter = normalizeCenter(propsCopy.defaultCenter);
	}
	if(propsCopy.center) {
		propsCopy.center = normalizeCenter(propsCopy.center);
	}
	return propsCopy;
}

export const mapPropsStyles = (styles, comp, height) => {
	let stylesCopy = JSON.parse(JSON.stringify(styles));
	let finalStyles;
	if(comp === "component") {
		finalStyles = stylesCopy;
	}
	else if(comp === "map") {
		finalStyles = {
			height: stylesCopy.height ? stylesCopy.height : height
		};
	}
	return finalStyles;
}

export const setupOrReact = (react, reactAnd) => {
	if (react && react.or) {
		if (typeof react.or === "string") {
			react.or = [react.or];
			react.or = react.or.concat(reactAnd);
		} else if (_.isArray(react.or)) {
			react.or = react.or.concat(reactAnd);
		} else if (_.isObject(react.or)) {
			react.or = setupReact(react.or, reactAnd);
		}
	} else {
		react.or = reactAnd;
	}
	return react;
}