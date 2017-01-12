'use strict';

var _ReactiveMap = require('./actuators/ReactiveMap');

var _GeoDistanceSlider = require('./sensors/GeoDistanceSlider');

var _GeoDistanceDropdown = require('./sensors/GeoDistanceDropdown');

var _GoogleSearch = require('./sensors/GoogleSearch');

// actuators
module.exports = {
	ReactiveMap: _ReactiveMap.ReactiveMap,
	GeoDistanceSlider: _GeoDistanceSlider.GeoDistanceSlider,
	GeoDistanceDropdown: _GeoDistanceDropdown.GeoDistanceDropdown,
	GoogleSearch: _GoogleSearch.GoogleSearch
};