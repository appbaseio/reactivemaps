"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storybook = require("@kadira/storybook");

var _storybookAddonKnobs = require("@kadira/storybook-addon-knobs");

var _withReadme = require("storybook-readme/with-readme");

var _withReadme2 = _interopRequireDefault(_withReadme);

var _GeoDistanceSlider = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/GeoDistanceSlider.md");

var _GeoDistanceSlider2 = _interopRequireDefault(_GeoDistanceSlider);

var _GeoDistanceDropdown = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/GeoDistanceDropdown.md");

var _GeoDistanceDropdown2 = _interopRequireDefault(_GeoDistanceDropdown);

var _PlacesSearch = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/PlacesSearch.md");

var _PlacesSearch2 = _interopRequireDefault(_PlacesSearch);

var _ReactiveMap = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/ReactiveMap.md");

var _ReactiveMap2 = _interopRequireDefault(_ReactiveMap);

var _SingleList = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleList.md");

var _SingleList2 = _interopRequireDefault(_SingleList);

var _MultiList = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiList.md");

var _MultiList2 = _interopRequireDefault(_MultiList);

var _SingleDropdownList = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleDropdownList.md");

var _SingleDropdownList2 = _interopRequireDefault(_SingleDropdownList);

var _MultiDropdownList = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiDropdownList.md");

var _MultiDropdownList2 = _interopRequireDefault(_MultiDropdownList);

var _SingleRange = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleRange.md");

var _SingleRange2 = _interopRequireDefault(_SingleRange);

var _MultiRange = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiRange.md");

var _MultiRange2 = _interopRequireDefault(_MultiRange);

var _SingleDropdownRange = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleDropdownRange.md");

var _SingleDropdownRange2 = _interopRequireDefault(_SingleDropdownRange);

var _MultiDropdownRange = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiDropdownRange.md");

var _MultiDropdownRange2 = _interopRequireDefault(_MultiDropdownRange);

var _DataSearch = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/DataSearch.md");

var _DataSearch2 = _interopRequireDefault(_DataSearch);

var _RangeSlider = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/RangeSlider.md");

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

var _NumberBox = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/NumberBox.md");

var _NumberBox2 = _interopRequireDefault(_NumberBox);

var _DatePicker = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/DatePicker.md");

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _DateRange = require("@appbaseio/reactivemaps-manual/docs/v1.0.0/components/DateRange.md");

var _DateRange2 = _interopRequireDefault(_DateRange);

var _GeoDistanceSlider3 = require("./GeoDistanceSlider.stories");

var _GeoDistanceSlider4 = _interopRequireDefault(_GeoDistanceSlider3);

var _GeoDistanceDropdown3 = require("./GeoDistanceDropdown.stories");

var _GeoDistanceDropdown4 = _interopRequireDefault(_GeoDistanceDropdown3);

var _PlacesSearch3 = require("./PlacesSearch.stories");

var _PlacesSearch4 = _interopRequireDefault(_PlacesSearch3);

var _ReactiveMap3 = require("./ReactiveMap.stories");

var _ReactiveMap4 = _interopRequireDefault(_ReactiveMap3);

var _SingleList3 = require("./SingleList.stories");

var _SingleList4 = _interopRequireDefault(_SingleList3);

var _MultiList3 = require("./MultiList.stories");

var _MultiList4 = _interopRequireDefault(_MultiList3);

var _SingleDropdownList3 = require("./SingleDropdownList.stories");

var _SingleDropdownList4 = _interopRequireDefault(_SingleDropdownList3);

var _MultiDropdownList3 = require("./MultiDropdownList.stories");

var _MultiDropdownList4 = _interopRequireDefault(_MultiDropdownList3);

var _SingleRange3 = require("./SingleRange.stories");

var _SingleRange4 = _interopRequireDefault(_SingleRange3);

var _MultiRange3 = require("./MultiRange.stories");

var _MultiRange4 = _interopRequireDefault(_MultiRange3);

var _SingleDropdownRange3 = require("./SingleDropdownRange.stories");

var _SingleDropdownRange4 = _interopRequireDefault(_SingleDropdownRange3);

var _MultiDropdownRange3 = require("./MultiDropdownRange.stories");

var _MultiDropdownRange4 = _interopRequireDefault(_MultiDropdownRange3);

var _DataSearch3 = require("./DataSearch.stories");

var _DataSearch4 = _interopRequireDefault(_DataSearch3);

var _RangeSlider3 = require("./RangeSlider.stories");

var _RangeSlider4 = _interopRequireDefault(_RangeSlider3);

var _NumberBox3 = require("./NumberBox.stories");

var _NumberBox4 = _interopRequireDefault(_NumberBox3);

var _DatePicker3 = require("./DatePicker.stories");

var _DatePicker4 = _interopRequireDefault(_DatePicker3);

var _DateRange3 = require("./DateRange.stories");

var _DateRange4 = _interopRequireDefault(_DateRange3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-lines: 0 */
require("../../node_modules/materialize-css/dist/css/materialize.min.css");
require("../../dist/css/style.min.css");
require("./styles.css");

var moment = require("moment");

function removeFirstLine(str) {
	var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	while (number--) {
		str = str.substring(str.indexOf("\n") + 1);
	}
	return str;
}

(0, _storybook.storiesOf)("GeoDistanceSlider", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider2.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider4.default, {
		defaultSelected: {
			distance: 50
		},
		unit: "mi",
		placeholder: "Search Location"
	});
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider2.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider4.default, {
		defaultSelected: {
			distance: 50
		},
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Range Labels", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider2.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider4.default, {
		defaultSelected: {
			distance: 50
		},
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location",
		rangeLabels: {
			start: "Start",
			end: "End"
		}
	});
})).add("With defaultSelected", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider2.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider4.default, {
		defaultSelected: {
			location: "London",
			distance: 5
		},
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location",
		rangeLabels: {
			start: "Start",
			end: "End"
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceSlider2.default), function () {
	return _react2.default.createElement(_GeoDistanceSlider4.default, {
		defaultSelected: (0, _storybookAddonKnobs.object)("defaultSelected", {
			location: "London",
			distance: 5
		}),
		stepValue: (0, _storybookAddonKnobs.number)("stepValue", 1),
		unit: (0, _storybookAddonKnobs.text)("unit", "mi"),
		title: (0, _storybookAddonKnobs.text)("title", "Geo Distance Slider"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Location"),
		range: (0, _storybookAddonKnobs.object)("range", {
			start: 0,
			end: 50
		}),
		rangeLabels: (0, _storybookAddonKnobs.object)("rangeLabels", {
			start: "Start",
			end: "End"
		})
	});
}));

(0, _storybook.storiesOf)("GeoDistanceDropdown", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown2.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown4.default, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, placeholder: "Search Location"
	});
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown2.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown4.default, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown2.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown4.default, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }],
		defaultSelected: {
			label: "Less than 100 miles",
			location: "London"
		},
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_GeoDistanceDropdown2.default), function () {
	return _react2.default.createElement(_GeoDistanceDropdown4.default, {
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }],
		unit: (0, _storybookAddonKnobs.select)("unit", { mi: "mi", miles: "miles", yd: "yd", yards: "yards", ft: "ft", feet: "feet", in: "in", inch: "inch", km: "km", kilometers: "kilometers", m: "m", meters: "meters", cm: "cm", centimeters: "centimeters", mm: "mm", millimeters: "millimeters", NM: "NM", nmi: "nmi", nauticalmiles: "nauticalmiles" }, "mi"),
		title: (0, _storybookAddonKnobs.text)("title", "Geo Distance Slider"),
		defaultSelected: (0, _storybookAddonKnobs.object)("defaultSelected", {
			label: "Less than 100 miles",
			location: "London"
		}),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Location")
	});
}));

(0, _storybook.storiesOf)("PlacesSearch", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic - Direction Demo", (0, _withReadme2.default)(removeFirstLine(_PlacesSearch2.default), function () {
	return _react2.default.createElement(_PlacesSearch4.default, null);
}));

(0, _storybook.storiesOf)("ReactiveMap", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap2.default, 3), function () {
	return _react2.default.createElement(_ReactiveMap4.default, null);
})).add("With Title", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap2.default, 3), function () {
	return _react2.default.createElement(_ReactiveMap4.default, {
		title: "Reactive Maps"
	});
})).add("With Popover onClick", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap2.default, 3), function () {
	return _react2.default.createElement(_ReactiveMap4.default, {
		title: "Reactive Maps",
		showPopoverOn: "click"
	});
})).add("With Popover onMouseOver", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap2.default), function () {
	return _react2.default.createElement(_ReactiveMap4.default, {
		title: "Reactive Maps",
		showPopoverOn: "mouseover"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_ReactiveMap2.default), function () {
	return _react2.default.createElement(_ReactiveMap4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "Reactive maps"),
		showPopoverOn: (0, _storybookAddonKnobs.select)("showPopoverOn", { click: "click", mouseover: "mouseover" }, "click"),
		setMarkerCluster: (0, _storybookAddonKnobs.boolean)("setMarkerCluster", true),
		autoCenter: (0, _storybookAddonKnobs.boolean)("autoCenter", true),
		showSearchAsMove: (0, _storybookAddonKnobs.boolean)("showSearchAsMove", true),
		setSearchAsMove: (0, _storybookAddonKnobs.boolean)("setSearchAsMove", false),
		showMapStyles: (0, _storybookAddonKnobs.boolean)("showMapStyles", false),
		defaultMapStyle: (0, _storybookAddonKnobs.select)("defaultMapStyle", { Standard: "Standard", "Blue Essence": "Blue Essence", "Blue Water": "Blue Water", "Flat Map": "Flat Map", "Light Monochrome": "Light Monochrome", "Midnight Commander": "Midnight Commander", "Unsaturated Browns": "Unsaturated Browns" }, "Standard"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		streamTTL: (0, _storybookAddonKnobs.number)("streamTTL", 5),
		streamAutoCenter: (0, _storybookAddonKnobs.boolean)("streamAutoCenter", true),
		autoMarkerPosition: (0, _storybookAddonKnobs.boolean)("autoMarkerPosition", false),
		showMarkers: (0, _storybookAddonKnobs.boolean)("showMarkers", true),
		autoMapRender: (0, _storybookAddonKnobs.boolean)("autoMapRender", true),
		defaultZoom: (0, _storybookAddonKnobs.number)("defaultZoom", 13),
		defaultCenter: (0, _storybookAddonKnobs.object)("defaultCenter", {
			lat: 37.74,
			lon: -122.45
		}),
		defaultMarkerImage: (0, _storybookAddonKnobs.text)("defaultMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png"),
		streamMarkerImage: (0, _storybookAddonKnobs.text)("streamMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png")
	});
}));

(0, _storybook.storiesOf)("SingleList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, { showSearch: true, defaultSelected: "San Francisco", placeholder: "Search City" });
})).add("Custom Sort", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, { title: "SingleList: Ascending Sort", showSearch: true, defaultSelected: "London", sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleList2.default), function () {
	return _react2.default.createElement(_SingleList4.default, {
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

(0, _storybook.storiesOf)("MultiList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, { showSearch: true, defaultSelected: ["London", "Sydney"], placeholder: "Search City" });
})).add("Custom Sort", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, { title: "MultiList: Ascending Sort", showSearch: true, defaultSelected: ["London"], sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiList2.default), function () {
	return _react2.default.createElement(_MultiList4.default, {
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

(0, _storybook.storiesOf)("SingleDropdownList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList2.default), function () {
	return _react2.default.createElement(_SingleDropdownList4.default, null);
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList2.default), function () {
	return _react2.default.createElement(_SingleDropdownList4.default, {
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList2.default), function () {
	return _react2.default.createElement(_SingleDropdownList4.default, {
		selectAllLabel: "All Cities",
		defaultSelected: "London"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownList2.default), function () {
	return _react2.default.createElement(_SingleDropdownList4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleDropdownList"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All Cities"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "London"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Select a City")
	});
}));

(0, _storybook.storiesOf)("MultiDropdownList", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList2.default), function () {
	return _react2.default.createElement(_MultiDropdownList4.default, null);
})).add("With Placeholder", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList2.default), function () {
	return _react2.default.createElement(_MultiDropdownList4.default, {
		placeholder: "Select Cities"
	});
})).add("With Select All", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList2.default), function () {
	return _react2.default.createElement(_MultiDropdownList4.default, {
		placeholder: "Select Cities",
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList2.default), function () {
	return _react2.default.createElement(_MultiDropdownList4.default, {
		placeholder: "Select Cities",
		size: 100,
		sortBy: "count",
		defaultSelected: ["London", "Melbourne"]
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownList2.default), function () {
	return _react2.default.createElement(_MultiDropdownList4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiDropdownList"),
		size: (0, _storybookAddonKnobs.number)("size", 100),
		showCount: (0, _storybookAddonKnobs.boolean)("showCount", true),
		sortBy: (0, _storybookAddonKnobs.select)("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: (0, _storybookAddonKnobs.text)("selectAllLabel", "All Cities"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["London", "Melbourne"]),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Select Cities")
	});
}));

(0, _storybook.storiesOf)("SingleRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleRange2.default), function () {
	return _react2.default.createElement(_SingleRange4.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleRange2.default), function () {
	return _react2.default.createElement(_SingleRange4.default, { defaultSelected: "Strong" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleRange2.default), function () {
	return _react2.default.createElement(_SingleRange4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "Strong")
	});
}));

(0, _storybook.storiesOf)("MultiRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiRange2.default), function () {
	return _react2.default.createElement(_MultiRange4.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiRange2.default), function () {
	return _react2.default.createElement(_MultiRange4.default, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiRange2.default), function () {
	return _react2.default.createElement(_MultiRange4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["Moderate", "Strong"]),
		showTags: (0, _storybookAddonKnobs.boolean)("showTags", "false")
	});
}));

(0, _storybook.storiesOf)("SingleDropdownRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange2.default), function () {
	return _react2.default.createElement(_SingleDropdownRange4.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange2.default), function () {
	return _react2.default.createElement(_SingleDropdownRange4.default, { defaultSelected: "Strong" });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_SingleDropdownRange2.default), function () {
	return _react2.default.createElement(_SingleDropdownRange4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "SingleDropdownRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.text)("defaultSelected", "Strong")
	});
}));

(0, _storybook.storiesOf)("MultiDropdownRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange2.default), function () {
	return _react2.default.createElement(_MultiDropdownRange4.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange2.default), function () {
	return _react2.default.createElement(_MultiDropdownRange4.default, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_MultiDropdownRange2.default), function () {
	return _react2.default.createElement(_MultiDropdownRange4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "MultiDropdownRange: Earthquake Magnitude"),
		defaultSelected: (0, _storybookAddonKnobs.array)("defaultSelected", ["Moderate", "Strong"])
	});
}));

(0, _storybook.storiesOf)("DataSearch", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_DataSearch2.default), function () {
	return _react2.default.createElement(_DataSearch4.default, {
		title: "DataSearch",
		placeholder: "Search Venue"
	});
})).add("Without Autocomplete", (0, _withReadme2.default)(removeFirstLine(_DataSearch2.default), function () {
	return _react2.default.createElement(_DataSearch4.default, {
		title: "DataSearch",
		placeholder: "Search Venue",
		autocomplete: false
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_DataSearch2.default), function () {
	return _react2.default.createElement(_DataSearch4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "DataSearch: Meetups"),
		placeholder: (0, _storybookAddonKnobs.text)("placeholder", "Search Venue"),
		autocomplete: (0, _storybookAddonKnobs.boolean)("autocomplete", true)
	});
}));

(0, _storybook.storiesOf)("RangeSlider", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_RangeSlider2.default), function () {
	return _react2.default.createElement(_RangeSlider4.default, null);
})).add("With Default Selected", (0, _withReadme2.default)(removeFirstLine(_RangeSlider2.default), function () {
	return _react2.default.createElement(_RangeSlider4.default, {
		defaultSelected: {
			start: 0,
			end: 2
		}
	});
})).add("With Range Labels", (0, _withReadme2.default)(removeFirstLine(_RangeSlider2.default), function () {
	return _react2.default.createElement(_RangeSlider4.default, {
		defaultSelected: {
			start: 0,
			end: 2
		},
		rangeLabels: {
			start: "Start",
			end: "End"
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_RangeSlider2.default), function () {
	return _react2.default.createElement(_RangeSlider4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "RangeSlider: Guest RSVPs"),
		range: (0, _storybookAddonKnobs.object)("range", {
			start: 0,
			end: 5
		}),
		stepValue: (0, _storybookAddonKnobs.number)("stepValue", 1),
		defaultSelected: (0, _storybookAddonKnobs.object)("defaultSelected", {
			start: 0,
			end: 2
		}),
		rangeLabels: (0, _storybookAddonKnobs.object)("rangeLabels", {
			start: "Start",
			end: "End"
		})
	});
}));

(0, _storybook.storiesOf)("NumberBox", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_NumberBox2.default), function () {
	return _react2.default.createElement(_NumberBox4.default, {
		defaultSelected: 3,
		data: {
			label: "Guests",
			start: 1,
			end: 5
		},
		labelPosition: "left"
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_NumberBox2.default), function () {
	return _react2.default.createElement(_NumberBox4.default, {
		defaultSelected: (0, _storybookAddonKnobs.number)("defaultSelected", 3),
		data: (0, _storybookAddonKnobs.object)("data", {
			start: 1,
			end: 5,
			label: "Guests"
		}),
		labelPosition: (0, _storybookAddonKnobs.select)("labelPosition", { bottom: "bottom", top: "top", left: "left", right: "right" }, "right")
	});
}));

(0, _storybook.storiesOf)("DatePicker", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, null);
})).add("Show more than 1 month", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, {
		numberOfMonths: 2
	});
})).add("Default date", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, {
		defaultSelected: moment().subtract(1, "day")
	});
})).add("Enable days from today only", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, {
		allowAllDates: false
	});
})).add("Using extra prop object", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, {
		extra: {
			withFullScreenPortal: true,
			showClearDate: true
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_DatePicker2.default), function () {
	return _react2.default.createElement(_DatePicker4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "Date Picker"),
		numberOfMonths: (0, _storybookAddonKnobs.number)("numberOfMonths", 1),
		allowAllDates: (0, _storybookAddonKnobs.boolean)("allowAllDates", true)
	});
}));

(0, _storybook.storiesOf)("DateRange", module).addDecorator(_storybookAddonKnobs.withKnobs).add("Basic", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, null);
})).add("Show more than 1 month", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, {
		numberOfMonths: 3
	});
})).add("Default date", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, {
		defaultSelected: {
			start: moment().subtract(7, "days"),
			end: moment()
		}
	});
})).add("Enable days from today only", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, {
		allowAllDates: false
	});
})).add("Using extra prop object", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, {
		extra: {
			withFullScreenPortal: true,
			showClearDate: true
		}
	});
})).add("Playground", (0, _withReadme2.default)(removeFirstLine(_DateRange2.default), function () {
	return _react2.default.createElement(_DateRange4.default, {
		title: (0, _storybookAddonKnobs.text)("title", "Date Range"),
		numberOfMonths: (0, _storybookAddonKnobs.number)("numberOfMonths", 2),
		allowAllDates: (0, _storybookAddonKnobs.boolean)("allowAllDates", true)
	});
}));