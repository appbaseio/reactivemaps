var Appbase = require('appbase-js');
export let appbaseRef;
export let appbaseConfig;
export function setConfigObject(config){
	appbaseConfig = config.appbase;
	appbaseRef = new Appbase({
		url: 'https://scalr.api.appbase.io',
		appname: config.appbase.appname,
		username: config.appbase.username,
		password: config.appbase.password
	});
};
export var mapStyles = [{
    key: 'MapBox',
    value: require('../helper/map-styles/MapBox.js')
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
export function watchForDependencyChange(depends, selectedSensor, previousSelectedSensor, cb) {
  var self = this;
  // check if depend object already exists
  let checkDependExists = function(depend) {
    if(!previousSelectedSensor.hasOwnProperty(depend)) {
      previousSelectedSensor[depend] = {
        key:'',
        value: ''
      };
    }
  }
  // apply depend changes when new value received
  let applyDependChange = function(depends, depend) {
    previousSelectedSensor[depend] = {
      key: depends[depend],
      value: selectedSensor[depends[depend]]
    };
    cb(depend);
  }

  // initialize the process
  let init = function() {
    for(let depend in depends) {
      checkDependExists(depend);
      if(selectedSensor[depends[depend]] != previousSelectedSensor[depend].value) {
        applyDependChange(depends, depend);
      }
    }
  }
  init();
};