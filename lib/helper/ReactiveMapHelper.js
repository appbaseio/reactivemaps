"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Bearing = Bearing;
exports.streamDataModify = streamDataModify;
exports.setMarkersData = setMarkersData;
exports.sortByDistance = sortByDistance;
exports.findDistance = findDistance;
exports.identifyGeoData = identifyGeoData;
exports.afterChannelResponse = afterChannelResponse;
var _ = require("lodash");

function Bearing(lat1, lng1, lat2, lng2) {
	function _toRad(deg) {
		return deg * Math.PI / 180;
	}

	function _toDeg(rad) {
		return rad * 180 / Math.PI;
	}
	var dLon = _toRad(lng2 - lng1);
	var y = Math.sin(dLon) * Math.cos(_toRad(lat2));
	var x = Math.cos(_toRad(lat1)) * Math.sin(_toRad(lat2)) - Math.sin(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.cos(dLon);
	var brng = _toDeg(Math.atan2(y, x));
	return (brng + 360) % 360;
}

// append stream boolean flag and also start time of stream
function streamDataModify(rawData, res, appbaseField) {
	if (res.data) {
		res.data.stream = true;
		res.data.streamStart = new Date();
		if (res.data._deleted) {
			var hits = rawData.hits.hits.filter(function (hit) {
				return hit._id !== res.data._id;
			});
			rawData.hits.hits = hits;
		} else {
			var prevData = rawData.hits.hits.filter(function (hit) {
				return hit._id === res.data._id;
			});
			if (prevData && prevData.length) {
				var preCord = prevData[0]._source[appbaseField];
				var newCord = res.data._source[appbaseField];
				res.data.angleDeg = Bearing(preCord.lat, preCord.lon, newCord.lat, newCord.lon);
			}
			var _hits = rawData.hits.hits.filter(function (hit) {
				return hit._id !== res.data._id;
			});
			rawData.hits.hits = _hits;
			rawData.hits.hits.push(res.data);
		}
	}
	return {
		rawData: rawData,
		res: res,
		streamFlag: true
	};
}

// tranform the raw data to marker data
function setMarkersData(data, appbaseField) {
	if (data && data.hits && data.hits.hits) {
		var markersData = data.hits.hits.map(function (hit, index) {
			hit._source.mapPoint = identifyGeoData(hit._source[appbaseField]);
			return hit;
		});
		markersData = markersData.filter(function (hit, index) {
			return hit._source.mapPoint && !(hit._source.mapPoint.lat === 0 && hit._source.mapPoint.lng === 0);
		});
		markersData = sortByDistance(markersData);
		markersData = markersData.map(function (marker) {
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
function sortByDistance(data) {
	var modifiedData = data.map(function (record) {
		record.distance = findDistance(data, record);
		return record;
	});
	modifiedData = _.orderBy(modifiedData, "distance");
	return modifiedData;
}

function findDistance(data, record) {
	record.distance = 0;
	var modifiednData = data.map(function (to) {
		record.distance += getDistance(record._source.mapPoint.lat, record._source.mapPoint.lng, to._source.mapPoint.lat, to._source.mapPoint.lng);
	});

	function getDistance(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
	return record.distance;
}

function identifyGeoData(input) {
	var type = Object.prototype.toString.call(input);
	var convertedGeo = null;
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

function afterChannelResponse(res, rawData, appbaseField, oldMarkersData) {
	var data = res.data;
	var markersData = void 0;
	var response = {
		streamFlag: false,
		newData: [],
		currentData: []
	};
	if (res.mode === "streaming") {
		response.channelMethod = "streaming";
		var modData = streamDataModify(rawData, res, appbaseField);
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

var validation = exports.validation = {
	defaultZoom: function defaultZoom(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 20) {
			return new Error("zoom value should be an integer between 0 and 20.");
		}
	},
	validCenter: function validCenter(props, propName, componentName) {
		if (isNaN(props[propName])) {
			return new Error(propName + " value must be number");
		}
		if (propName === "lat" && (props[propName] < -90 || props[propName] > 90)) {
			return new Error(propName + " value should be between -90 and 90.");
		} else if (propName === "lng" && (props[propName] < -180 || props[propName] > 180)) {
			return new Error(propName + " value should be between -180 and 180.");
		}
	},
	fromValidation: function fromValidation(props, propName, componentName) {
		if (props[propName] < 0) {
			return new Error(propName + " value should be greater than or equal to 0.");
		}
	},
	streamTTL: function streamTTL(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 1000) {
			return new Error(propName + " should be a positive integer between 0 and 1000, counted in seconds for a streaming update to be visible.");
		}
	},
	popoverTTL: function popoverTTL(props, propName, componentName) {
		if (props[propName] < 0.1 || props[propName] > 60) {
			return new Error(propName + " should be a positive integer between 1 and 60, counted in seconds for a popover to be visible.");
		}
	}
};

var normalizeCenter = exports.normalizeCenter = function normalizeCenter(center) {
	if (center && center.lon) {
		center.lng = center.lon;
	}
	return center;
};

var normalizeProps = exports.normalizeProps = function normalizeProps(props) {
	var propsCopy = JSON.parse(JSON.stringify(props));
	if (propsCopy.defaultCenter) {
		propsCopy.defaultCenter = normalizeCenter(propsCopy.defaultCenter);
	}
	if (propsCopy.center) {
		propsCopy.center = normalizeCenter(propsCopy.center);
	}
	return propsCopy;
};

var mapPropsStyles = exports.mapPropsStyles = function mapPropsStyles(styles, comp, height) {
	var stylesCopy = JSON.parse(JSON.stringify(styles));
	var finalStyles = void 0;
	if (comp === "component") {
		finalStyles = stylesCopy;
	} else if (comp === "map") {
		finalStyles = {
			height: stylesCopy.height ? stylesCopy.height : height
		};
	}
	return finalStyles;
};