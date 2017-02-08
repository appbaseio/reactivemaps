"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storybook = require("@kadira/storybook");

var _storybookAddonKnobs = require("@kadira/storybook-addon-knobs");

var _withReadme = require("storybook-readme/with-readme");

var _withReadme2 = _interopRequireDefault(_withReadme);

var _appbaseJs = require("appbase-js");

var _GeoDistanceSlider = require("./GeoDistanceSlider.stories");

var _GeoDistanceSlider2 = _interopRequireDefault(_GeoDistanceSlider);

var _GeoDistanceSlider3 = require("@appbaseio/reactivemaps-manual/docs/v1/map-components/GeoDistanceSlider.md");

var _GeoDistanceSlider4 = _interopRequireDefault(_GeoDistanceSlider3);

var _GeoDistanceDropdown = require("./GeoDistanceDropdown.stories");

var _GeoDistanceDropdown2 = _interopRequireDefault(_GeoDistanceDropdown);

var _GeoDistanceDropdown3 = require("@appbaseio/reactivemaps-manual/docs/v1/map-components/GeoDistanceDropdown.md");

var _GeoDistanceDropdown4 = _interopRequireDefault(_GeoDistanceDropdown3);

var _PlacesSearch = require("./PlacesSearch.stories");

var _PlacesSearch2 = _interopRequireDefault(_PlacesSearch);

var _PlacesSearch3 = require("@appbaseio/reactivemaps-manual/docs/v1/map-components/PlacesSearch.md");

var _PlacesSearch4 = _interopRequireDefault(_PlacesSearch3);

var _ReactiveMap = require("./ReactiveMap.stories");

var _ReactiveMap2 = _interopRequireDefault(_ReactiveMap);

var _ReactiveMap3 = require("@appbaseio/reactivemaps-manual/docs/v1/map-components/ReactiveMap.md");

var _ReactiveMap4 = _interopRequireDefault(_ReactiveMap3);

var _SingleList = require("./SingleList.stories");

var _SingleList2 = _interopRequireDefault(_SingleList);

var _SingleList3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/SingleList.md");

var _SingleList4 = _interopRequireDefault(_SingleList3);

var _MultiList = require("./MultiList.stories");

var _MultiList2 = _interopRequireDefault(_MultiList);

var _MultiList3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/MultiList.md");

var _MultiList4 = _interopRequireDefault(_MultiList3);

var _SingleDropdownList = require("./SingleDropdownList.stories");

var _SingleDropdownList2 = _interopRequireDefault(_SingleDropdownList);

var _SingleDropdownList3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/SingleDropdownList.md");

var _SingleDropdownList4 = _interopRequireDefault(_SingleDropdownList3);

var _MultiDropdownList = require("./MultiDropdownList.stories");

var _MultiDropdownList2 = _interopRequireDefault(_MultiDropdownList);

var _MultiDropdownList3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/MultiDropdownList.md");

var _MultiDropdownList4 = _interopRequireDefault(_MultiDropdownList3);

var _SingleRange = require("./SingleRange.stories");

var _SingleRange2 = _interopRequireDefault(_SingleRange);

var _SingleRange3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/SingleRange.md");

var _SingleRange4 = _interopRequireDefault(_SingleRange3);

var _MultiRange = require("./MultiRange.stories");

var _MultiRange2 = _interopRequireDefault(_MultiRange);

var _MultiRange3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/MultiRange.md");

var _MultiRange4 = _interopRequireDefault(_MultiRange3);

var _SingleDropdownRange = require("./SingleDropdownRange.stories");

var _SingleDropdownRange2 = _interopRequireDefault(_SingleDropdownRange);

var _SingleDropdownRange3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/SingleDropdownRange.md");

var _SingleDropdownRange4 = _interopRequireDefault(_SingleDropdownRange3);

var _MultiDropdownRange = require("./MultiDropdownRange.stories");

var _MultiDropdownRange2 = _interopRequireDefault(_MultiDropdownRange);

var _MultiDropdownRange3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/MultiDropdownRange.md");

var _MultiDropdownRange4 = _interopRequireDefault(_MultiDropdownRange3);

var _DataSearch = require("./DataSearch.stories");

var _DataSearch2 = _interopRequireDefault(_DataSearch);

var _DataSearch3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/DataSearch.md");

var _DataSearch4 = _interopRequireDefault(_DataSearch3);

var _NestedList = require("./NestedList.stories");

var _NestedList2 = _interopRequireDefault(_NestedList);

var _NestedList3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/NestedList.md");

var _NestedList4 = _interopRequireDefault(_NestedList3);

var _RangeSlider = require("./RangeSlider.stories");

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

var _RangeSlider3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/RangeSlider.md");

var _RangeSlider4 = _interopRequireDefault(_RangeSlider3);

var _NumberBox = require("./NumberBox.stories");

var _NumberBox2 = _interopRequireDefault(_NumberBox);

var _NumberBox3 = require("@appbaseio/reactivemaps-manual/docs/v1/components/NumberBox.md");

var _NumberBox4 = _interopRequireDefault(_NumberBox3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("../../bower_components/materialize/dist/css/materialize.min.css");
require("../../dist/css/vendor.min.css");
require("../../dist/css/style.min.css");
require("./styles.css");

function removeFirstLine(str) {
	return str.substring(str.indexOf("\n") + 1);
}

(0, _storybook.storiesOf)("GeoDistanceSlider", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider4.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider2.default, {
		defaultSelected: 50,
		unit: "mi",
		placeholder: "Search Location"
	});
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider4.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider2.default, {
		defaultSelected: 50,
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Range Labels", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider4.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider2.default, {
		defaultSelected: 50,
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location",
		rangeLabels: {
			"start": "Start",
			"end": "End"
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider4.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider2.default, {
		defaultSelected: (0, _storybookAddonKnobs.number)("defaultSelected", 50),
		stepValue: (0, _storybookAddonKnobs.number)("stepValue", 1),
		unit: (0, _storybookAddonKnobs.text)("unit", "mi"),
		title: (0, _storybookAddonKnobs.text)("title", "Geo Distance Slider"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Location"),
		range: (0, _storybookAddonKnobs.object)("range", {
			"start": 0,
			"end": 50
		}),
		rangeLabels: (0, _storybookAddonKnobs.object)("rangeLabels", {
			"start": "Start",
			"end": "End"
		})
	});
}));

(0, _storybook.storiesOf)("GeoDistanceDropdown", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown4.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown2.default, {
		unit: "mi",
		data: [{ "start": 0, "end": 100, "label": "Less than 100 miles" }, { "start": 101, "end": 200, "label": "Between 100 and 200 miles" }, { "start": 201, "end": 500, "label": "Between 200 and 500 miles" }, { "start": 501, "end": 1000, "label": "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, placeholder: "Search Location"
	});
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown4.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown2.default, {
		unit: "mi",
		data: [{ "start": 0, "end": 100, "label": "Less than 100 miles" }, { "start": 101, "end": 200, "label": "Between 100 and 200 miles" }, { "start": 201, "end": 500, "label": "Between 200 and 500 miles" }, { "start": 501, "end": 1000, "label": "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown4.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown2.default, {
		unit: "mi",
		data: [{ "start": 0, "end": 100, "label": "Less than 100 miles" }, { "start": 101, "end": 200, "label": "Between 100 and 200 miles" }, { "start": 201, "end": 500, "label": "Between 200 and 500 miles" }, { "start": 501, "end": 1000, "label": "Above 500 miles" }],
		defaultSelected: "Between 200 and 500 miles",
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown4.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown2.default, {
		data: [{ "start": 0, "end": 100, "label": "Less than 100 miles" }, { "start": 101, "end": 200, "label": "Between 100 and 200 miles" }, { "start": 201, "end": 500, "label": "Between 200 and 500 miles" }, { "start": 501, "end": 1000, "label": "Above 500 miles" }],
		unit: (0, _storybookAddonKnobs.text)("unit", "mi"),
		title: (0, _storybookAddonKnobs.text)("title", "Geo Distance Slider"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "Between 200 and 500 miles"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Location")
	});
}));

(0, _storybook.storiesOf)("PlacesSearch", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic - Direction Demo", (0, _withReadme2.default)(removeFirstLine(_PlacesSearch4.default), function () {
	return _react2.default.createElement(_PlacesSearch2.default, null);
}));

(0, _storybook.storiesOf)("ReactiveMap", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap4.default), function () {
	return _react2.default.createElement(_ReactiveMap2.default, null);
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap4.default), function () {
	return _react2.default.createElement(_ReactiveMap2.default, {
		title: "Reactive Maps"
	});
})).add("With Popover onClick", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap4.default), function () {
	return _react2.default.createElement(_ReactiveMap2.default, {
		title: "Reactive Maps",
		showPopoverOn: "click"
	});
})).add("With Popover onMouseOver", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap4.default), function () {
	return _react2.default.createElement(_ReactiveMap2.default, {
		title: "Reactive Maps",
		showPopoverOn: "mouseover"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap4.default), function () {
	return _react2.default.createElement(_ReactiveMap2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "Reactive maps"),
		showPopoverOn: (0, _storybookAddonKnobs.select)("showPopoverOn", { 'click': 'click', 'mouseover': 'mouseover' }, 'click'),
		setMarkerCluster: (0, _storybookAddonKnobs.boolean)("setMarkerCluster", true),
		autoCenter: (0, _storybookAddonKnobs.boolean)("autoCenter", true),
		showSearchAsMove: (0, _storybookAddonKnobs.boolean)("showSearchAsMove", true),
		setSearchAsMove: (0, _storybookAddonKnobs.boolean)("setSearchAsMove", false),
		showMapStyles: (0, _storybookAddonKnobs.boolean)("showMapStyles", false),
		defaultMapStyle: (0, _storybookAddonKnobs.select)("defaultMapStyle", { 'Standard': 'Standard', 'Blue Essence': 'Blue Essence', 'Blue Water': 'Blue Water', 'Flat Map': 'Flat Map', 'Light Monochrome': 'Light Monochrome', 'Midnight Commander': 'Midnight Commander', 'Unsaturated Browns': 'Unsaturated Browns' }, 'Standard'),
		size: (0, _storybookAddonKnobs.number)('size', 100),
		streamTTL: (0, _storybookAddonKnobs.number)("streamTTL", 5),
		streamAutoCenter: (0, _storybookAddonKnobs.boolean)("streamAutoCenter", true),
		autoMarkerPosition: (0, _storybookAddonKnobs.boolean)("autoMarkerPosition", false),
		showMarkers: (0, _storybookAddonKnobs.boolean)("showMarkers", true),
		autoMapRender: (0, _storybookAddonKnobs.boolean)("autoMapRender", true),
		defaultZoom: (0, _storybookAddonKnobs.number)('defaultZoom', 13),
		defaultCenter: (0, _storybookAddonKnobs.object)("defaultCenter", {
			"lat": 37.74,
			"lng": -122.45
		}),
		defaultMarkerImage: (0, _storybookAddonKnobs.text)('defaultMarkerImage', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png'),
		streamMarkerImage: (0, _storybookAddonKnobs.text)('streamMarkerImage', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png')
	});
}));

(0, _storybook.storiesOf)("SingleList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, { showSearch: true, defaultSelected: "San Francisco", placeholder: "Search City" });
})).add("Custom Sort", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, { title: "SingleList: Ascending Sort", showSearch: true, defaultSelected: "London", sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleList4.default), function () {
	return _react2.default.createElement(_SingleList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleList: City Filter"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "San Francisco"),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		showSearch: (0, _storybookAddonKnobs.boolean)("showSearch", true),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search City"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All cities")
	});
}));

(0, _storybook.storiesOf)("MultiList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, { showSearch: true, defaultSelected: ["London", "Sydney"], placeholder: "Search City" });
})).add("Custom Sort", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, { title: "MultiList: Ascending Sort", showSearch: true, defaultSelected: ["London"], sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiList4.default), function () {
	return _react2.default.createElement(_MultiList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiList: City Filter"),
		size: (0, _storybookAddonKnobs.number)("size", 10),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["London", "Sydney"]),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		showSearch: (0, _storybookAddonKnobs.boolean)("showSearch", true),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search City"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All cities")
	});
}));

(0, _storybook.storiesOf)("SingleDropdownList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList4.default), function () {
	return _react2.default.createElement(_SingleDropdownList2.default, null);
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList4.default), function () {
	return _react2.default.createElement(_SingleDropdownList2.default, {
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList4.default), function () {
	return _react2.default.createElement(_SingleDropdownList2.default, {
		selectAllLabel: "All Cities",
		defaultSelected: "London"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList4.default), function () {
	return _react2.default.createElement(_SingleDropdownList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleDropdownList"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All Cities"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "London"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Select a City")
	});
}));

(0, _storybook.storiesOf)("MultiDropdownList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList4.default), function () {
	return _react2.default.createElement(_MultiDropdownList2.default, null);
})).add("With Placeholder", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList4.default), function () {
	return _react2.default.createElement(_MultiDropdownList2.default, {
		placeholder: "Select Cities"
	});
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList4.default), function () {
	return _react2.default.createElement(_MultiDropdownList2.default, {
		placeholder: "Select Cities",
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList4.default), function () {
	return _react2.default.createElement(_MultiDropdownList2.default, {
		placeholder: "Select Cities",
		size: 100,
		sortBy: "count",
		defaultSelected: ["London", "Melbourne"]
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList4.default), function () {
	return _react2.default.createElement(_MultiDropdownList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiDropdownList"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All Cities"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["London", "Melbourne"]),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Select Cities")
	});
}));

(0, _storybook.storiesOf)("SingleRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleRange4.default), function () {
	return _react2.default.createElement(_SingleRange2.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleRange4.default), function () {
	return _react2.default.createElement(_SingleRange2.default, { defaultSelected: "Strong" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleRange4.default), function () {
	return _react2.default.createElement(_SingleRange2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "Strong") });
}));

(0, _storybook.storiesOf)("MultiRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiRange4.default), function () {
	return _react2.default.createElement(_MultiRange2.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiRange4.default), function () {
	return _react2.default.createElement(_MultiRange2.default, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiRange4.default), function () {
	return _react2.default.createElement(_MultiRange2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["Moderate", "Strong"]),
		showTags: (0, _storybookAddonKnobs.boolean)("showTags", "false") });
}));

(0, _storybook.storiesOf)("SingleDropdownRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange4.default), function () {
	return _react2.default.createElement(_SingleDropdownRange2.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange4.default), function () {
	return _react2.default.createElement(_SingleDropdownRange2.default, { defaultSelected: "Strong" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange4.default), function () {
	return _react2.default.createElement(_SingleDropdownRange2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleDropdownRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "Strong") });
}));

(0, _storybook.storiesOf)("MultiDropdownRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange4.default), function () {
	return _react2.default.createElement(_MultiDropdownRange2.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange4.default), function () {
	return _react2.default.createElement(_MultiDropdownRange2.default, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange4.default), function () {
	return _react2.default.createElement(_MultiDropdownRange2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiDropdownRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["Moderate", "Strong"]) });
}));

(0, _storybook.storiesOf)("DataSearch", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_DataSearch4.default), function () {
	return _react2.default.createElement(_DataSearch2.default, {
		title: "DataSearch",
		placeholder: "Search Venue" });
})).add("Without Autocomplete", (0, _withReadme2.default)(removeFirstLine(_DataSearch4.default), function () {
	return _react2.default.createElement(_DataSearch2.default, {
		title: "DataSearch",
		placeholder: "Search Venue",
		autocomplete: false });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_DataSearch4.default), function () {
	return _react2.default.createElement(_DataSearch2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "DataSearch: Meetups"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Venue"),
		autocomplete: (0, _storybookAddonKnobs.boolean)("autocomplete", true) });
}));

(0, _storybook.storiesOf)("NestedList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_NestedList4.default), function () {
	return _react2.default.createElement(_NestedList2.default, null);
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_NestedList4.default), function () {
	return _react2.default.createElement(_NestedList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "City-wise Meetups") });
})).add("Default selection", (0, _withReadme2.default)(removeFirstLine(_NestedList4.default), function () {
	return _react2.default.createElement(_NestedList2.default, {
		defaultSelected: ["London", "Travel"] });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_NestedList4.default), function () {
	return _react2.default.createElement(_NestedList2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "NestedList: City-wise Meetup Topics"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["London", "Travel"]),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		showSearch: (0, _storybookAddonKnobs.boolean)("showSearch", true),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Topics")
	});
}));

(0, _storybook.storiesOf)("RangeSlider", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_RangeSlider4.default), function () {
	return _react2.default.createElement(_RangeSlider2.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_RangeSlider4.default), function () {
	return _react2.default.createElement(_RangeSlider2.default, {
		defaultSelected: {
			"start": 0,
			"end": 2
		}
	});
})).add("With Range Labels", (0, _withReadme2.default)(removeFirstLine(_RangeSlider4.default), function () {
	return _react2.default.createElement(_RangeSlider2.default, {
		defaultSelected: {
			"start": 0,
			"end": 2
		},
		rangeLabels: {
			"start": "Start",
			"end": "End"
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_RangeSlider4.default), function () {
	return _react2.default.createElement(_RangeSlider2.default, {
		title: (0, _storybookAddonKnobs.text)("title", "RangeSlider: Guest RSVPs"),
		range: (0, _storybookAddonKnobs.object)("range", {
			"start": 0,
			"end": 5
		}),
		stepValue: (0, _storybookAddonKnobs.number)("stepValue", 1),
		defaultSelected: (0, _storybookAddonKnobs.object)("defaultSelected", {
			"start": 0,
			"end": 2
		}),
		rangeLabels: (0, _storybookAddonKnobs.object)("rangeLabels", {
			"start": "Start",
			"end": "End"
		})
	});
}));

(0, _storybook.storiesOf)("NumberBox", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_NumberBox4.default), function () {
	return _react2.default.createElement(_NumberBox2.default, {
		defaultSelected: 3,
		data: {
			label: "Guests",
			start: 1,
			end: 5
		},
		labelPosition: "left"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_NumberBox4.default), function () {
	return _react2.default.createElement(_NumberBox2.default, {
		defaultSelected: (0, _storybookAddonKnobs.number)("defaultSelected", 3),
		data: (0, _storybookAddonKnobs.object)("data", {
			"start": 1,
			"end": 5,
			"label": "Guests"
		}),
		labelPosition: (0, _storybookAddonKnobs.select)("labelPosition", { "bottom": "bottom", "top": "top", "left": "left", "right": "right" }, "right")
	});
}));