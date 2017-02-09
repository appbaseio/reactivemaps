'use strict';

var _ReactiveMap = require('./actuators/ReactiveMap');

var _GeoDistanceSlider = require('./sensors/GeoDistanceSlider');

var _GeoDistanceDropdown = require('./sensors/GeoDistanceDropdown');

var _PlacesSearch = require('./sensors/PlacesSearch');

var _reactivebase = require('@appbaseio/reactivebase');

var _reactivebase2 = _interopRequireDefault(_reactivebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combineObj = {
	ReactiveMap: _ReactiveMap.ReactiveMap,
	GeoDistanceSlider: _GeoDistanceSlider.GeoDistanceSlider,
	GeoDistanceDropdown: _GeoDistanceDropdown.GeoDistanceDropdown,
	PlacesSearch: _PlacesSearch.PlacesSearch
}; // actuators


for (var component in _reactivebase2.default) {
	combineObj[component] = _reactivebase2.default[component];
}

module.exports = combineObj;