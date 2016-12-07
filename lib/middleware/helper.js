'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setConfigObject = setConfigObject;
exports.getMapStyle = getMapStyle;

var _require = require('fbemitter');

var EventEmitter = _require.EventEmitter;
var sensorEmitter = exports.sensorEmitter = new EventEmitter();
var appbaseRef = exports.appbaseRef = void 0;
var appbaseConfig = exports.appbaseConfig = void 0;
function setConfigObject(config) {
	exports.appbaseConfig = appbaseConfig = config.appbase;
	// appbaseRef = new Appbase({
	// 	url: 'https://scalr.api.appbase.io',
	// 	appname: config.appbase.appname,
	// 	username: config.appbase.username,
	// 	password: config.appbase.password
	// });
	return appbaseRef;
};
var mapStyles = exports.mapStyles = [{
	key: 'Standard',
	value: require('../helper/map-styles/Standard.js')
}, {
	key: 'Blue Essence',
	value: require('../helper/map-styles/BlueEssence.js')
}, {
	key: 'Blue Water',
	value: require('../helper/map-styles/BlueWater.js')
}, {
	key: 'Flat Map',
	value: require('../helper/map-styles/FlatMap.js')
}, {
	key: 'Light Monochrome',
	value: require('../helper/map-styles/LightMonochrome.js')
}, {
	key: 'Midnight Commander',
	value: require('../helper/map-styles/MidnightCommander.js')
}, {
	key: 'Unsaturated Browns',
	value: require('../helper/map-styles/UnsaturatedBrowns.js')
}];
function getMapStyle(styleName) {
	var selectedStyle = mapStyles.filter(function (style) {
		return style.key === styleName;
	});
	if (selectedStyle.length) {
		return selectedStyle[0].value;
	} else {
		return null;
	}
}
var watchForDependencyChange = exports.watchForDependencyChange = function watchForDependencyChange(depends, previousSelectedSensor, cb, channelId) {
	var self = this;
	var selectedSensor = {};
	// check if depend object already exists
	var checkDependExists = function checkDependExists(depend) {
		if (!previousSelectedSensor.hasOwnProperty(depend)) {
			previousSelectedSensor[depend] = '';
		}
	};
	// apply depend changes when new value received
	var applyDependChange = function applyDependChange(depends, depend) {
		if (selectedSensor[depend] && _typeof(selectedSensor[depend]) === 'object') {
			previousSelectedSensor[depend] = JSON.parse(JSON.stringify(selectedSensor[depend]));
		} else {
			previousSelectedSensor[depend] = selectedSensor[depend];
		}
		if (!depends[depend].doNotExecute) {
			cb(depend, channelId);
		}
	};

	// initialize the process
	var init = function init() {
		for (var depend in depends) {
			checkDependExists(depend);
			if (_typeof(selectedSensor[depend]) === 'object') {
				if (JSON.stringify(selectedSensor[depend]) !== JSON.stringify(previousSelectedSensor[depend])) {
					applyDependChange(depends, depend);
				}
			} else {
				if (selectedSensor[depend] !== previousSelectedSensor[depend]) {
					applyDependChange(depends, depend);
				}
			}
		}
	};

	sensorEmitter.addListener('sensorChange', function (data) {
		selectedSensor = data;
		init();
	});
};

function selectedSensorFn() {
	var self = this;
	this.selectedSensor = {};
	this.sensorInfo = {};
	this.sortInfo = {};

	// Get
	var get = function get(prop, obj) {
		if (obj) {
			return self[obj][prop];
		} else {
			if (prop) {
				return self.selectedSensor[prop];
			} else {
				return self.selectedSensor;
			}
		}
	};

	// Set
	var set = function set(obj) {
		var isExecuteUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		self.selectedSensor[obj.key] = obj.value;
		if (isExecuteUpdate) {
			sensorEmitter.emit('sensorChange', self.selectedSensor);
		}
	};

	// Set fieldname
	var setSensorInfo = function setSensorInfo(obj) {
		self.sensorInfo[obj.key] = obj.value;
	};

	// Set sort info
	var setSortInfo = function setSortInfo(obj) {
		self.sortInfo[obj.key] = obj.value;
	};

	return {
		get: get,
		set: set,
		setSensorInfo: setSensorInfo,
		setSortInfo: setSortInfo
	};
};
var selectedSensor = exports.selectedSensor = new selectedSensorFn();