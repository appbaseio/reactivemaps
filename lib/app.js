'use strict';

var _ReactiveMap = require('./actuators/ReactiveMap');

var _GeoDistanceSlider = require('./sensors/GeoDistanceSlider');

var _GeoDistanceDropdown = require('./sensors/GeoDistanceDropdown');

var _PlacesSearch = require('./sensors/PlacesSearch');

// actuators
module.exports = {
	ReactiveMap: _ReactiveMap.ReactiveMap,
	GeoDistanceSlider: _GeoDistanceSlider.GeoDistanceSlider,
	GeoDistanceDropdown: _GeoDistanceDropdown.GeoDistanceDropdown,
	PlacesSearch: _PlacesSearch.PlacesSearch
};