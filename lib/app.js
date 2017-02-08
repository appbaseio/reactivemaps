'use strict';

<<<<<<< HEAD
=======
<<<<<<< HEAD
var _AppbaseMap = require('./actuators/AppbaseMap');

var _ListResult = require('./actuators/ListResult');

// actuators
module.exports = {
	AppbaseMap: _AppbaseMap.AppbaseMap,
	AppbaseListResult: _ListResult.ListResult
=======
>>>>>>> 6cb8c9243519b4ea05aaabfc3ebd75a072cb548b
var _ReactiveMap = require('./actuators/ReactiveMap');

var _GeoDistanceSlider = require('./sensors/GeoDistanceSlider');

var _GeoDistanceDropdown = require('./sensors/GeoDistanceDropdown');

var _PlacesSearch = require('./sensors/PlacesSearch');

// actuators
module.exports = {
	ReactiveMap: _ReactiveMap.ReactiveMap,
	GeoDistanceSlider: _GeoDistanceSlider.GeoDistanceSlider,
	GeoDistanceDropdown: _GeoDistanceDropdown.GeoDistanceDropdown,
<<<<<<< HEAD
	PlacesSearch: _PlacesSearch.PlacesSearch
=======
	GoogleSearch: _GoogleSearch.GoogleSearch
>>>>>>> dev
>>>>>>> 6cb8c9243519b4ea05aaabfc3ebd75a072cb548b
};