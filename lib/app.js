'use strict';

var _ReactiveMap = require('./actuators/ReactiveMap');

var _ReactiveMap2 = _interopRequireDefault(_ReactiveMap);

var _GeoDistanceSlider = require('./sensors/GeoDistanceSlider');

var _GeoDistanceSlider2 = _interopRequireDefault(_GeoDistanceSlider);

var _GeoDistanceDropdown = require('./sensors/GeoDistanceDropdown');

var _GeoDistanceDropdown2 = _interopRequireDefault(_GeoDistanceDropdown);

var _PlacesSearch = require('./sensors/PlacesSearch');

var _PlacesSearch2 = _interopRequireDefault(_PlacesSearch);

var _reactivebase = require('@appbaseio/reactivebase');

var _reactivebase2 = _interopRequireDefault(_reactivebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combineObj = {
	ReactiveMap: _ReactiveMap2.default,
	GeoDistanceSlider: _GeoDistanceSlider2.default,
	GeoDistanceDropdown: _GeoDistanceDropdown2.default,
	PlacesSearch: _PlacesSearch2.default
}; // actuators


for (var component in _reactivebase2.default) {
	combineObj[component] = _reactivebase2.default[component];
}

module.exports = combineObj;