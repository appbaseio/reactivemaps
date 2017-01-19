'use strict';

<<<<<<< HEAD
var _AppbaseMap = require('./actuators/AppbaseMap');

var _ListResult = require('./actuators/ListResult');

// actuators
module.exports = {
	AppbaseMap: _AppbaseMap.AppbaseMap,
	AppbaseListResult: _ListResult.ListResult
=======
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
>>>>>>> dev
};