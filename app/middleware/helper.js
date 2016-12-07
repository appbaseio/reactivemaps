var {EventEmitter} = require('fbemitter');
export var sensorEmitter = new EventEmitter();
export let appbaseRef;
export let appbaseConfig;
export function setConfigObject(config){
	appbaseConfig = config.appbase;
	// appbaseRef = new Appbase({
	// 	url: 'https://scalr.api.appbase.io',
	// 	appname: config.appbase.appname,
	// 	username: config.appbase.username,
	// 	password: config.appbase.password
	// });
	return appbaseRef;
};
export var mapStyles = [{
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
export function getMapStyle(styleName) {
	let selectedStyle = mapStyles.filter(function(style) {
		return style.key === styleName;
	})
	if(selectedStyle.length) {
		return selectedStyle[0].value;
	} else {
		return null;
	}
}
export var watchForDependencyChange = function(depends, previousSelectedSensor, cb, channelId) {
	var self = this;
	let selectedSensor = {};
	// check if depend object already exists
	let checkDependExists = function(depend) {
		if(!previousSelectedSensor.hasOwnProperty(depend)) {
			previousSelectedSensor[depend] = '';
		}
	}
	// apply depend changes when new value received
	let applyDependChange = function(depends, depend) {
		if(selectedSensor[depend] && typeof selectedSensor[depend] === 'object') {
			previousSelectedSensor[depend] = JSON.parse(JSON.stringify(selectedSensor[depend]));
		} else {
			previousSelectedSensor[depend] = selectedSensor[depend];
		}
		if(!depends[depend].doNotExecute) {
			cb(depend, channelId);
		}
	}

	// initialize the process
	let init = function() {
		for(let depend in depends) {
			checkDependExists(depend);
			if(typeof selectedSensor[depend] === 'object') {
				if(JSON.stringify(selectedSensor[depend]) !== JSON.stringify(previousSelectedSensor[depend])) {
					applyDependChange(depends, depend);
				}
			} else {
				if(selectedSensor[depend] !== previousSelectedSensor[depend]) {
					applyDependChange(depends, depend);
				}
			}
		}
	}

	sensorEmitter.addListener('sensorChange', function(data) {
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
	let get = function(prop, obj) {
		if(obj) {
			return self[obj][prop];
		}
		else {
			if(prop) {
				return self.selectedSensor[prop];
			} else {
				return self.selectedSensor;
			}
		}
	}

	// Set
	let set = function(obj, isExecuteUpdate=false) {
		self.selectedSensor[obj.key] = obj.value;
		if(isExecuteUpdate) {
			sensorEmitter.emit('sensorChange', self.selectedSensor);
		}
	}

	// Set fieldname
	let setSensorInfo = function(obj) {
		self.sensorInfo[obj.key] = obj.value;
	}

	// Set sort info
	let setSortInfo = function(obj) {
		self.sortInfo[obj.key] = obj.value;
	}

	return {
		get: get,
		set: set,
		setSensorInfo: setSensorInfo,
		setSortInfo: setSortInfo
	};

};
export var selectedSensor = new selectedSensorFn();