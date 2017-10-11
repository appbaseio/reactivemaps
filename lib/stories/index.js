/* eslint max-lines: 0 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number, array, select, object } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";

import GeoDistanceSliderReadme from "@appbaseio/reactive-manual/docs/v1/map-components/GeoDistanceSlider.md";
import GeoDistanceDropdownReadme from "@appbaseio/reactive-manual/docs/v1/map-components/GeoDistanceDropdown.md";
import PlacesSearchReadme from "@appbaseio/reactive-manual/docs/v1/map-components/PlacesSearch.md";

import SingleListReadme from "@appbaseio/reactive-manual/docs/v1/components/SingleList.md";
import MultiListReadme from "@appbaseio/reactive-manual/docs/v1/components/MultiList.md";
import SingleDropdownListReadme from "@appbaseio/reactive-manual/docs/v1/components/SingleDropdownList.md";
import MultiDropdownListReadme from "@appbaseio/reactive-manual/docs/v1/components/MultiDropdownList.md";

import SingleRangeReadme from "@appbaseio/reactive-manual/docs/v1/components/SingleRange.md";
import MultiRangeReadme from "@appbaseio/reactive-manual/docs/v1/components/MultiRange.md";
import SingleDropdownRangeReadme from "@appbaseio/reactive-manual/docs/v1/components/SingleDropdownRange.md";
import MultiDropdownRangeReadme from "@appbaseio/reactive-manual/docs/v1/components/MultiDropdownRange.md";

import DataSearchReadme from "@appbaseio/reactive-manual/docs/v1/components/DataSearch.md";
import RangeSliderReadme from "@appbaseio/reactive-manual/docs/v1/components/RangeSlider.md";
import NumberBoxReadme from "@appbaseio/reactive-manual/docs/v1/components/NumberBox.md";
import DatePickerReadme from "@appbaseio/reactive-manual/docs/v1/components/DatePicker.md";
import DateRangeReadme from "@appbaseio/reactive-manual/docs/v1/components/DateRange.md";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";
import GeoDistanceDropdownDefault from "./GeoDistanceDropdown.stories";
import PlacesSearchDefault from "./PlacesSearch.stories";
import ReactiveMapDefault from "./ReactiveMap.stories";

import SingleListDefault from "./SingleList.stories";
import MultiListDefault from "./MultiList.stories";
import SingleDropdownListDefault from "./SingleDropdownList.stories";
import MultiDropdownListDefault from "./MultiDropdownList.stories";
import SingleRangeDefault from "./SingleRange.stories";
import MultiRangeDefault from "./MultiRange.stories";
import SingleDropdownRangeDefault from "./SingleDropdownRange.stories";
import MultiDropdownRangeDefault from "./MultiDropdownRange.stories";

import DataSearchDefault from "./DataSearch.stories";
import RangeSliderDefault from "./RangeSlider.stories";
import NumberBoxDefault from "./NumberBox.stories";
import DatePickerDefault from "./DatePicker.stories";
import DateRangeDefault from "./DateRange.stories";

require("../../node_modules/materialize-css/dist/css/materialize.min.css");
require("../../dist/css/style.min.css");
require("./styles.css");

var moment = require("moment");

function removeFirstLine(str) {
	var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	var n = num - 1;
	while (n) {
		str = str.substring(str.indexOf("\n") + 1);
		n -= 1;
	}
	return str;
}

storiesOf("GeoDistanceSlider", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(GeoDistanceSliderReadme), function () {
	return React.createElement(GeoDistanceSliderDefault, null);
})).add("With Title", withReadme(removeFirstLine(GeoDistanceSliderReadme), function () {
	return React.createElement(GeoDistanceSliderDefault, {
		defaultSelected: {
			distance: 50
		},
		unit: "mi",
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Range Labels", withReadme(removeFirstLine(GeoDistanceSliderReadme), function () {
	return React.createElement(GeoDistanceSliderDefault, {
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
})).add("With defaultSelected", withReadme(removeFirstLine(GeoDistanceSliderReadme), function () {
	return React.createElement(GeoDistanceSliderDefault, {
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
})).add("Playground", withReadme(removeFirstLine(GeoDistanceSliderReadme), function () {
	return React.createElement(GeoDistanceSliderDefault, {
		defaultSelected: object("defaultSelected", {
			location: "London",
			distance: 5
		}),
		stepValue: number("stepValue", 1),
		unit: text("unit", "mi"),
		title: text("title", "Geo Distance Slider"),
		placeholder: text("placeholder", "Search Location"),
		range: object("range", {
			start: 0,
			end: 50
		}),
		rangeLabels: object("rangeLabels", {
			start: "Start",
			end: "End"
		})
	});
}));

storiesOf("GeoDistanceDropdown", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(GeoDistanceDropdownReadme), function () {
	return React.createElement(GeoDistanceDropdownDefault, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, placeholder: "Search Location"
	});
})).add("With Title", withReadme(removeFirstLine(GeoDistanceDropdownReadme), function () {
	return React.createElement(GeoDistanceDropdownDefault, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }]
		// distanceOptions={[20,50,100,150]}
		, title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("With Default Selected", withReadme(removeFirstLine(GeoDistanceDropdownReadme), function () {
	return React.createElement(GeoDistanceDropdownDefault, {
		unit: "mi",
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }],
		defaultSelected: {
			label: "Less than 100 miles",
			location: "London"
		},
		title: "Geo Distance Search",
		placeholder: "Search Location"
	});
})).add("Playground", withReadme(removeFirstLine(GeoDistanceDropdownReadme), function () {
	return React.createElement(GeoDistanceDropdownDefault, {
		data: [{ start: 1, end: 100, label: "Less than 100 miles" }, { start: 101, end: 200, label: "Between 100 and 200 miles" }, { start: 201, end: 500, label: "Between 200 and 500 miles" }, { start: 501, end: 1000, label: "Above 500 miles" }],
		unit: select("unit", { mi: "mi", miles: "miles", yd: "yd", yards: "yards", ft: "ft", feet: "feet", in: "in", inch: "inch", km: "km", kilometers: "kilometers", m: "m", meters: "meters", cm: "cm", centimeters: "centimeters", mm: "mm", millimeters: "millimeters", NM: "NM", nmi: "nmi", nauticalmiles: "nauticalmiles" }, "mi"),
		title: text("title", "Geo Distance Slider"),
		defaultSelected: object("defaultSelected", {
			label: "Less than 100 miles",
			location: "London"
		}),
		placeholder: text("placeholder", "Search Location")
	});
}));

storiesOf("PlacesSearch", module).addDecorator(withKnobs).add("Basic - Direction Demo", withReadme(removeFirstLine(PlacesSearchReadme), function () {
	return React.createElement(PlacesSearchDefault, null);
}));

storiesOf("ReactiveMap", module).addDecorator(withKnobs).add("Basic", function () {
	return React.createElement(ReactiveMapDefault, null);
}).add("With Title", function () {
	return React.createElement(ReactiveMapDefault, {
		title: "Reactive Maps"
	});
}).add("With Popover onClick", function () {
	return React.createElement(ReactiveMapDefault, {
		title: "Reactive Maps",
		showPopoverOn: "click"
	});
}).add("With Popover onMouseOver", function () {
	return React.createElement(ReactiveMapDefault, {
		title: "Reactive Maps",
		showPopoverOn: "mouseover"
	});
}).add("Playground", function () {
	return React.createElement(ReactiveMapDefault, {
		title: text("title", "Reactive maps"),
		showPopoverOn: select("showPopoverOn", { click: "click", mouseover: "mouseover" }, "click"),
		setMarkerCluster: boolean("setMarkerCluster", true),
		autoCenter: boolean("autoCenter", true),
		showSearchAsMove: boolean("showSearchAsMove", true),
		setSearchAsMove: boolean("setSearchAsMove", false),
		showMapStyles: boolean("showMapStyles", false),
		defaultMapStyle: select("defaultMapStyle", { Standard: "Standard", "Blue Essence": "Blue Essence", "Blue Water": "Blue Water", "Flat Map": "Flat Map", "Light Monochrome": "Light Monochrome", "Midnight Commander": "Midnight Commander", "Unsaturated Browns": "Unsaturated Browns" }, "Standard"),
		size: number("size", 100),
		streamTTL: number("streamTTL", 5),
		streamAutoCenter: boolean("streamAutoCenter", true),
		autoMarkerPosition: boolean("autoMarkerPosition", false),
		showMarkers: boolean("showMarkers", true),
		autoMapRender: boolean("autoMapRender", true),
		defaultZoom: number("defaultZoom", 13),
		defaultCenter: object("defaultCenter", {
			lat: 37.74,
			lon: -122.45
		}),
		defaultMarkerImage: text("defaultMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png"),
		streamMarkerImage: text("streamMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png")
	});
});

storiesOf("SingleList", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, { showSearch: true, defaultSelected: "San Francisco", placeholder: "Search City" });
})).add("Custom Sort", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, { title: "SingleList: Ascending Sort", showSearch: true, defaultSelected: "London", sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", withReadme(removeFirstLine(SingleListReadme), function () {
	return React.createElement(SingleListDefault, {
		title: text("title", "SingleList: City Filter"),
		size: number("size", 100),
		sortBy: select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		defaultSelected: text("defaultSelected", "San Francisco"),
		showCount: boolean("showCount", true),
		showSearch: boolean("showSearch", true),
		placeholder: text("placeholder", "Search City"),
		selectAllLabel: text("selectAllLabel", "All cities")
	});
}));

storiesOf("MultiList", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, { showSearch: true, placeholder: "Search City" });
})).add("Without Search", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, { showSearch: false, placeholder: "Search City" });
})).add("Default Selected", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, { showSearch: true, defaultSelected: ["London", "Sydney"], placeholder: "Search City" });
})).add("Custom Sort", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, { title: "MultiList: Ascending Sort", showSearch: true, defaultSelected: ["London"], sortBy: "asc", placeholder: "Search City" });
})).add("With Select All", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, { showSearch: true, selectAllLabel: "All Cities", placeholder: "Search City" });
})).add("Playground", withReadme(removeFirstLine(MultiListReadme), function () {
	return React.createElement(MultiListDefault, {
		title: text("title", "MultiList: City Filter"),
		size: number("size", 10),
		sortBy: select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		defaultSelected: array("defaultSelected", ["London", "Sydney"]),
		showCount: boolean("showCount", true),
		showSearch: boolean("showSearch", true),
		placeholder: text("placeholder", "Search City"),
		selectAllLabel: text("selectAllLabel", "All cities")
	});
}));

storiesOf("SingleDropdownList", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(SingleDropdownListReadme), function () {
	return React.createElement(SingleDropdownListDefault, null);
})).add("With Select All", withReadme(removeFirstLine(SingleDropdownListReadme), function () {
	return React.createElement(SingleDropdownListDefault, {
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", withReadme(removeFirstLine(SingleDropdownListReadme), function () {
	return React.createElement(SingleDropdownListDefault, {
		selectAllLabel: "All Cities",
		defaultSelected: "London"
	});
})).add("Playground", withReadme(removeFirstLine(SingleDropdownListReadme), function () {
	return React.createElement(SingleDropdownListDefault, {
		title: text("title", "SingleDropdownList"),
		size: number("size", 100),
		showCount: boolean("showCount", true),
		sortBy: select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: text("selectAllLabel", "All Cities"),
		defaultSelected: text("defaultSelected", "London"),
		placeholder: text("placeholder", "Select a City")
	});
}));

storiesOf("MultiDropdownList", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(MultiDropdownListReadme), function () {
	return React.createElement(MultiDropdownListDefault, null);
})).add("With Placeholder", withReadme(removeFirstLine(MultiDropdownListReadme), function () {
	return React.createElement(MultiDropdownListDefault, {
		placeholder: "Select Cities"
	});
})).add("With Select All", withReadme(removeFirstLine(MultiDropdownListReadme), function () {
	return React.createElement(MultiDropdownListDefault, {
		placeholder: "Select Cities",
		selectAllLabel: "All Cities"
	});
})).add("With Default Selected", withReadme(removeFirstLine(MultiDropdownListReadme), function () {
	return React.createElement(MultiDropdownListDefault, {
		placeholder: "Select Cities",
		size: 100,
		sortBy: "count",
		defaultSelected: ["London", "Melbourne"]
	});
})).add("Playground", withReadme(removeFirstLine(MultiDropdownListReadme), function () {
	return React.createElement(MultiDropdownListDefault, {
		title: text("title", "MultiDropdownList"),
		size: number("size", 100),
		showCount: boolean("showCount", true),
		sortBy: select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count"),
		selectAllLabel: text("selectAllLabel", "All Cities"),
		defaultSelected: array("defaultSelected", ["London", "Melbourne"]),
		placeholder: text("placeholder", "Select Cities")
	});
}));

storiesOf("SingleRange", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(SingleRangeReadme), function () {
	return React.createElement(SingleRangeDefault, null);
})).add("With Default Selected", withReadme(removeFirstLine(SingleRangeReadme), function () {
	return React.createElement(SingleRangeDefault, { defaultSelected: "Strong" });
})).add("Playground", withReadme(removeFirstLine(SingleRangeReadme), function () {
	return React.createElement(SingleRangeDefault, {
		title: text("title", "SingleRange: Earthquake Magnitude"),
		defaultSelected: text("defaultSelected", "Strong")
	});
}));

storiesOf("MultiRange", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(MultiRangeReadme), function () {
	return React.createElement(MultiRangeDefault, null);
})).add("With Default Selected", withReadme(removeFirstLine(MultiRangeReadme), function () {
	return React.createElement(MultiRangeDefault, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", withReadme(removeFirstLine(MultiRangeReadme), function () {
	return React.createElement(MultiRangeDefault, {
		title: text("title", "MultiRange: Earthquake Magnitude"),
		defaultSelected: array("defaultSelected", ["Moderate", "Strong"]),
		showTags: boolean("showTags", "false")
	});
}));

storiesOf("SingleDropdownRange", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(SingleDropdownRangeReadme), function () {
	return React.createElement(SingleDropdownRangeDefault, null);
})).add("With Default Selected", withReadme(removeFirstLine(SingleDropdownRangeReadme), function () {
	return React.createElement(SingleDropdownRangeDefault, { defaultSelected: "Strong" });
})).add("Playground", withReadme(removeFirstLine(SingleDropdownRangeReadme), function () {
	return React.createElement(SingleDropdownRangeDefault, {
		title: text("title", "SingleDropdownRange: Earthquake Magnitude"),
		defaultSelected: text("defaultSelected", "Strong")
	});
}));

storiesOf("MultiDropdownRange", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(MultiDropdownRangeReadme), function () {
	return React.createElement(MultiDropdownRangeDefault, null);
})).add("With Default Selected", withReadme(removeFirstLine(MultiDropdownRangeReadme), function () {
	return React.createElement(MultiDropdownRangeDefault, { defaultSelected: ["Moderate", "Strong"] });
})).add("Playground", withReadme(removeFirstLine(MultiDropdownRangeReadme), function () {
	return React.createElement(MultiDropdownRangeDefault, {
		title: text("title", "MultiDropdownRange: Earthquake Magnitude"),
		defaultSelected: array("defaultSelected", ["Moderate", "Strong"])
	});
}));

storiesOf("DataSearch", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(DataSearchReadme), function () {
	return React.createElement(DataSearchDefault, {
		title: "DataSearch",
		placeholder: "Search Venue"
	});
})).add("Without Autocomplete", withReadme(removeFirstLine(DataSearchReadme), function () {
	return React.createElement(DataSearchDefault, {
		title: "DataSearch",
		placeholder: "Search Venue",
		autocomplete: false
	});
})).add("Playground", withReadme(removeFirstLine(DataSearchReadme), function () {
	return React.createElement(DataSearchDefault, {
		title: text("title", "DataSearch: Meetups"),
		placeholder: text("placeholder", "Search Venue"),
		autocomplete: boolean("autocomplete", true)
	});
}));

storiesOf("RangeSlider", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(RangeSliderReadme), function () {
	return React.createElement(RangeSliderDefault, null);
})).add("With Default Selected", withReadme(removeFirstLine(RangeSliderReadme), function () {
	return React.createElement(RangeSliderDefault, {
		defaultSelected: {
			start: 0,
			end: 2
		}
	});
})).add("With Range Labels", withReadme(removeFirstLine(RangeSliderReadme), function () {
	return React.createElement(RangeSliderDefault, {
		defaultSelected: {
			start: 0,
			end: 2
		},
		rangeLabels: {
			start: "Start",
			end: "End"
		}
	});
})).add("Playground", withReadme(removeFirstLine(RangeSliderReadme), function () {
	return React.createElement(RangeSliderDefault, {
		title: text("title", "RangeSlider: Guest RSVPs"),
		range: object("range", {
			start: 0,
			end: 5
		}),
		stepValue: number("stepValue", 1),
		defaultSelected: object("defaultSelected", {
			start: 0,
			end: 2
		}),
		rangeLabels: object("rangeLabels", {
			start: "Start",
			end: "End"
		})
	});
}));

storiesOf("NumberBox", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(NumberBoxReadme), function () {
	return React.createElement(NumberBoxDefault, {
		defaultSelected: 3,
		data: {
			label: "Guests",
			start: 1,
			end: 5
		},
		labelPosition: "left"
	});
})).add("Playground", withReadme(removeFirstLine(NumberBoxReadme), function () {
	return React.createElement(NumberBoxDefault, {
		defaultSelected: number("defaultSelected", 3),
		data: object("data", {
			start: 1,
			end: 5,
			label: "Guests"
		}),
		labelPosition: select("labelPosition", { bottom: "bottom", top: "top", left: "left", right: "right" }, "right")
	});
}));

storiesOf("DatePicker", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, null);
})).add("Show more than 1 month", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, {
		numberOfMonths: 2
	});
})).add("Default date", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, {
		defaultSelected: moment().subtract(1, "day")
	});
})).add("Enable days from today only", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, {
		allowAllDates: false
	});
})).add("Using extra prop object", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, {
		extra: {
			withFullScreenPortal: true,
			showClearDate: true
		}
	});
})).add("Playground", withReadme(removeFirstLine(DatePickerReadme), function () {
	return React.createElement(DatePickerDefault, {
		title: text("title", "Date Picker"),
		numberOfMonths: number("numberOfMonths", 1),
		allowAllDates: boolean("allowAllDates", true)
	});
}));

storiesOf("DateRange", module).addDecorator(withKnobs).add("Basic", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, null);
})).add("Show more than 1 month", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, {
		numberOfMonths: 3
	});
})).add("Default date", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, {
		defaultSelected: {
			start: moment().subtract(7, "days"),
			end: moment()
		}
	});
})).add("Enable days from today only", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, {
		allowAllDates: false
	});
})).add("Using extra prop object", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, {
		extra: {
			withFullScreenPortal: true,
			showClearDate: true
		}
	});
})).add("Playground", withReadme(removeFirstLine(DateRangeReadme), function () {
	return React.createElement(DateRangeDefault, {
		title: text("title", "Date Range"),
		numberOfMonths: number("numberOfMonths", 2),
		allowAllDates: boolean("allowAllDates", true)
	});
}));