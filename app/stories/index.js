import React from "react";
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, number, array, object, select, boolean } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";
import GeoDistanceSliderReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/GeoDistanceSlider.md";

import GeoDistanceDropdownDefault from "./GeoDistanceDropdown.stories";
import GeoDistanceDropdownReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/GeoDistanceDropdown.md";

import PlacesSearchDefault from "./PlacesSearch.stories";
import PlacesSearchReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/PlacesSearch.md";

import ReactiveMapDefault from "./ReactiveMap.stories";
import ReactiveMapReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/map-components/ReactiveMap.md";

import SingleListDefault from "./SingleList.stories";
import SingleListReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleList.md";

import MultiListDefault from "./MultiList.stories";
import MultiListReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiList.md";

import SingleDropdownListDefault from "./SingleDropdownList.stories";
import SingleDropdownListReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleDropdownList.md";

import MultiDropdownListDefault from "./MultiDropdownList.stories";
import MultiDropdownListReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiDropdownList.md";

import SingleRangeDefault from "./SingleRange.stories";
import SingleRangeReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleRange.md";

import MultiRangeDefault from "./MultiRange.stories";
import MultiRangeReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiRange.md";

import SingleDropdownRangeDefault from "./SingleDropdownRange.stories";
import SingleDropdownRangeReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/SingleDropdownRange.md";

import MultiDropdownRangeDefault from "./MultiDropdownRange.stories";
import MultiDropdownRangeReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/MultiDropdownRange.md";

import DataSearchDefault from "./DataSearch.stories";
import DataSearchReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/DataSearch.md";

import NestedListDefault from "./NestedList.stories";
import NestedListReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/NestedList.md";

import RangeSliderDefault from "./RangeSlider.stories";
import RangeSliderReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/RangeSlider.md";

import NumberBoxDefault from "./NumberBox.stories";
import NumberBoxReadme from "@appbaseio/reactivemaps-manual/docs/v1.0.0/components/NumberBox.md";

require("../../node_modules/materialize-css/dist/css/materialize.min.css");
require("../../dist/css/style.min.css");
require("./styles.css");

function removeFirstLine(str, number=1) {
	while (number--) {
		str = str.substring(str.indexOf("\n") + 1);
	}
	return str;
}

storiesOf("GeoDistanceSlider", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(GeoDistanceSliderReadme), () => (
		<GeoDistanceSliderDefault
			defaultSelected={{
				distance: 50
			}}
			unit="mi"
			placeholder="Search Location"
		/>
	)))
	.add("With Title", withReadme(removeFirstLine(GeoDistanceSliderReadme), () => (
		<GeoDistanceSliderDefault
			defaultSelected={{
				distance: 50
			}}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	)))
	.add("With Range Labels", withReadme(removeFirstLine(GeoDistanceSliderReadme), () => (
		<GeoDistanceSliderDefault
			defaultSelected={{
				distance: 50
			}}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
			rangeLabels={{
				start: "Start",
				end: "End"
			}}
		/>
	)))
	.add("With defaultSelected", withReadme(removeFirstLine(GeoDistanceSliderReadme), () => (
		<GeoDistanceSliderDefault
			defaultSelected={{
				location:'London',
				distance: 5
			}}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
			rangeLabels={{
				start: "Start",
				end: "End"
			}}
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(GeoDistanceSliderReadme), () => (
		<GeoDistanceSliderDefault
			defaultSelected={object("defaultSelected", {
				location:'London',
				distance: 5
			})}
			stepValue={number("stepValue", 1)}
			unit={text("unit", "mi")}
			title={text("title", "Geo Distance Slider")}
			placeholder={text("placeholder", "Search Location")}
			range={object("range", {
				start: 0,
				end: 50
			})}
			rangeLabels={object("rangeLabels", {
				start: "Start",
				end: "End"
			})}
		/>
	)));

storiesOf("GeoDistanceDropdown", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(GeoDistanceDropdownReadme), () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
			[{ start: 1, end: 100, label: "Less than 100 miles" },
				{ start: 101, end: 200, label: "Between 100 and 200 miles" },
				{ start: 201, end: 500, label: "Between 200 and 500 miles" },
				{ start: 501, end: 1000, label: "Above 500 miles" }]
			}
			// distanceOptions={[20,50,100,150]}
			placeholder="Search Location"
		/>
	)))
	.add("With Title", withReadme(removeFirstLine(GeoDistanceDropdownReadme), () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
			[{ start: 1, end: 100, label: "Less than 100 miles" },
				{ start: 101, end: 200, label: "Between 100 and 200 miles" },
				{ start: 201, end: 500, label: "Between 200 and 500 miles" },
				{ start: 501, end: 1000, label: "Above 500 miles" }]
			}
			// distanceOptions={[20,50,100,150]}
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	)))
	.add("With Default Selected", withReadme(removeFirstLine(GeoDistanceDropdownReadme), () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
			[{ start: 1, end: 100, label: "Less than 100 miles" },
				{ start: 101, end: 200, label: "Between 100 and 200 miles" },
				{ start: 201, end: 500, label: "Between 200 and 500 miles" },
				{ start: 501, end: 1000, label: "Above 500 miles" }]
			}
			defaultSelected={{
				label: "Less than 100 miles",
				location: "London"
			}}
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(GeoDistanceDropdownReadme), () => (
		<GeoDistanceDropdownDefault
			data={
			[{ start: 1, end: 100, label: "Less than 100 miles" },
				{ start: 101, end: 200, label: "Between 100 and 200 miles" },
				{ start: 201, end: 500, label: "Between 200 and 500 miles" },
				{ start: 501, end: 1000, label: "Above 500 miles" }]
			}
			unit={select("unit", { mi: "mi", miles: "miles", yd: "yd", yards: "yards", ft: "ft", feet: "feet", in: "in", inch: "inch", km: "km", kilometers: "kilometers", m: "m", meters: "meters", cm: "cm", centimeters: "centimeters", mm: "mm", millimeters: "millimeters", NM: "NM", nmi: "nmi", nauticalmiles: "nauticalmiles" }, "mi")}
			title={text("title", "Geo Distance Slider")}
			defaultSelected={object("defaultSelected", {
				distance: "Less than 100 miles",
				location: "London"
			})}
			placeholder={text("placeholder", "Search Location")}
		/>
	)));

storiesOf("PlacesSearch", module)
	.addDecorator(withKnobs)
	.add("Basic - Direction Demo", withReadme(removeFirstLine(PlacesSearchReadme), () => (
		<PlacesSearchDefault />
	)));

storiesOf("ReactiveMap", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(ReactiveMapReadme, 3), () => (
		<ReactiveMapDefault />
	)))
	.add("With Title", withReadme(removeFirstLine(ReactiveMapReadme, 3), () => (
		<ReactiveMapDefault
			title="Reactive Maps"
		/>
	)))
	.add("With Popover onClick", withReadme(removeFirstLine(ReactiveMapReadme, 3), () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="click"
		/>
	)))
	.add("With Popover onMouseOver", withReadme(removeFirstLine(ReactiveMapReadme), () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="mouseover"
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(ReactiveMapReadme), () => (
		<ReactiveMapDefault
			title={text("title", "Reactive maps")}
			showPopoverOn={select("showPopoverOn", { click: "click", mouseover: "mouseover" }, "click")}
			setMarkerCluster={boolean("setMarkerCluster", true)}
			autoCenter={boolean("autoCenter", true)}
			showSearchAsMove={boolean("showSearchAsMove", true)}
			setSearchAsMove={boolean("setSearchAsMove", false)}
			showMapStyles={boolean("showMapStyles", false)}
			defaultMapStyle={select("defaultMapStyle", { Standard: "Standard", "Blue Essence": "Blue Essence", "Blue Water": "Blue Water", "Flat Map": "Flat Map", "Light Monochrome": "Light Monochrome", "Midnight Commander": "Midnight Commander", "Unsaturated Browns": "Unsaturated Browns" }, "Standard")}
			size={number("size", 100)}
			streamTTL={number("streamTTL", 5)}
			streamAutoCenter={boolean("streamAutoCenter", true)}
			autoMarkerPosition={boolean("autoMarkerPosition", false)}
			showMarkers={boolean("showMarkers", true)}
			autoMapRender={boolean("autoMapRender", true)}
			defaultZoom={number("defaultZoom", 13)}
			defaultCenter={object("defaultCenter", {
				lat: 37.74,
				lng: -122.45
			})}
			defaultMarkerImage={text("defaultMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png")}
			streamMarkerImage={text("streamMarkerImage", "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png")}
		/>
	)));

storiesOf("SingleList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch placeholder="Search City" />
	)))
	.add("Without Search", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch={false} placeholder="Search City" />
	)))
	.add("Default Selected", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch defaultSelected="San Francisco" placeholder="Search City" />
	)))
	.add("Custom Sort", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault title="SingleList: Ascending Sort" showSearch defaultSelected="London" sortBy="asc" placeholder="Search City" />
	)))
	.add("With Select All", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch selectAllLabel="All Cities" placeholder="Search City" />
	)))
	.add("Playground", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault
			title={text("title", "SingleList: City Filter")}
			size={number("size", 100)}
			sortBy={select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count")}
			defaultSelected={text("defaultSelected", "San Francisco")}
			showCount={boolean("showCount", true)}
			showSearch={boolean("showSearch", true)}
			placeholder={text("placeholder", "Search City")}
			selectAllLabel={text("selectAllLabel", "All cities")}
		/>
	)));

storiesOf("MultiList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch placeholder="Search City" />
	)))
	.add("Without Search", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch={false} placeholder="Search City" />
	)))
	.add("Default Selected", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch defaultSelected={["London", "Sydney"]} placeholder="Search City" />
	)))
	.add("Custom Sort", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault title="MultiList: Ascending Sort" showSearch defaultSelected={["London"]} sortBy="asc" placeholder="Search City" />
	)))
	.add("With Select All", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch selectAllLabel="All Cities" placeholder="Search City" />
	)))
	.add("Playground", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault
			title={text("title", "MultiList: City Filter")}
			size={number("size", 10)}
			sortBy={select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count")}
			defaultSelected={array("defaultSelected", ["London", "Sydney"])}
			showCount={boolean("showCount", true)}
			showSearch={boolean("showSearch", true)}
			placeholder={text("placeholder", "Search City")}
			selectAllLabel={text("selectAllLabel", "All cities")}
		/>
	)));

storiesOf("SingleDropdownList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(SingleDropdownListReadme), () => (
		<SingleDropdownListDefault />
	)))
	.add("With Select All", withReadme(removeFirstLine(SingleDropdownListReadme), () => (
		<SingleDropdownListDefault
			selectAllLabel="All Cities"
		/>
	)))
	.add("With Default Selected", withReadme(removeFirstLine(SingleDropdownListReadme), () => (
		<SingleDropdownListDefault
			selectAllLabel="All Cities"
			defaultSelected="London"
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(SingleDropdownListReadme), () => (
		<SingleDropdownListDefault
			title={text("title", "SingleDropdownList")}
			size={number("size", 100)}
			showCount={boolean("showCount", true)}
			sortBy={select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count")}
			selectAllLabel={text("selectAllLabel", "All Cities")}
			defaultSelected={text("defaultSelected", "London")}
			placeholder={text("placeholder", "Select a City")}
		/>
	)));

storiesOf("MultiDropdownList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(MultiDropdownListReadme), () => (
		<MultiDropdownListDefault />
	)))
	.add("With Placeholder", withReadme(removeFirstLine(MultiDropdownListReadme), () => (
		<MultiDropdownListDefault
			placeholder="Select Cities"
		/>
	)))
	.add("With Select All", withReadme(removeFirstLine(MultiDropdownListReadme), () => (
		<MultiDropdownListDefault
			placeholder="Select Cities"
			selectAllLabel="All Cities"
		/>
	)))
	.add("With Default Selected", withReadme(removeFirstLine(MultiDropdownListReadme), () => (
		<MultiDropdownListDefault
			placeholder="Select Cities"
			size={100}
			sortBy="count"
			defaultSelected={["London", "Melbourne"]}
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(MultiDropdownListReadme), () => (
		<MultiDropdownListDefault
			title={text("title", "MultiDropdownList")}
			size={number("size", 100)}
			showCount={boolean("showCount", true)}
			sortBy={select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count")}
			selectAllLabel={text("selectAllLabel", "All Cities")}
			defaultSelected={array("defaultSelected", ["London", "Melbourne"])}
			placeholder={text("placeholder", "Select Cities")}
		/>
	)));

storiesOf("SingleRange", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(SingleRangeReadme), () => (
		<SingleRangeDefault />
	)))
	.add("With Default Selected", withReadme(removeFirstLine(SingleRangeReadme), () => (
		<SingleRangeDefault defaultSelected="Strong" />
	)))
	.add("Playground", withReadme(removeFirstLine(SingleRangeReadme), () => (
		<SingleRangeDefault
			title={text("title", "SingleRange: Earthquake Magnitude")}
			defaultSelected={text("defaultSelected", "Strong")}
		/>
	)));

storiesOf("MultiRange", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(MultiRangeReadme), () => (
		<MultiRangeDefault />
	)))
	.add("With Default Selected", withReadme(removeFirstLine(MultiRangeReadme), () => (
		<MultiRangeDefault defaultSelected={["Moderate", "Strong"]} />
	)))
	.add("Playground", withReadme(removeFirstLine(MultiRangeReadme), () => (
		<MultiRangeDefault
			title={text("title", "MultiRange: Earthquake Magnitude")}
			defaultSelected={array("defaultSelected", ["Moderate", "Strong"])}
			showTags={boolean("showTags", "false")}
		/>
	)));

storiesOf("SingleDropdownRange", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(SingleDropdownRangeReadme), () => (
		<SingleDropdownRangeDefault />
	)))
	.add("With Default Selected", withReadme(removeFirstLine(SingleDropdownRangeReadme), () => (
		<SingleDropdownRangeDefault defaultSelected="Strong" />
	)))
	.add("Playground", withReadme(removeFirstLine(SingleDropdownRangeReadme), () => (
		<SingleDropdownRangeDefault
			title={text("title", "SingleDropdownRange: Earthquake Magnitude")}
			defaultSelected={text("defaultSelected", "Strong")}
		/>
	)));

storiesOf("MultiDropdownRange", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(MultiDropdownRangeReadme), () => (
		<MultiDropdownRangeDefault />
	)))
	.add("With Default Selected", withReadme(removeFirstLine(MultiDropdownRangeReadme), () => (
		<MultiDropdownRangeDefault defaultSelected={["Moderate", "Strong"]} />
	)))
	.add("Playground", withReadme(removeFirstLine(MultiDropdownRangeReadme), () => (
		<MultiDropdownRangeDefault
			title={text("title", "MultiDropdownRange: Earthquake Magnitude")}
			defaultSelected={array("defaultSelected", ["Moderate", "Strong"])}
		/>
	)));

storiesOf("DataSearch", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title="DataSearch"
			placeholder="Search Venue"
		/>
	)))
	.add("Without Autocomplete", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title="DataSearch"
			placeholder="Search Venue"
			autocomplete={false}
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title={text("title", "DataSearch: Meetups")}
			placeholder={text("placeholder", "Search Venue")}
			autocomplete={boolean("autocomplete", true)}
		/>
	)));

storiesOf("NestedList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault />
	)))
	.add("With Title", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			title={text("title", "City-wise Meetups")}
		/>
	)))
	.add("Default selection", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			defaultSelected={["London", "Travel"]}
		/>
	))).add("Playground", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			title={text("title", "NestedList: City-wise Meetup Topics")}
			size={number("size", 100)}
			sortBy={select("sortBy", { asc: "asc", desc: "desc", count: "count" }, "count")}
			defaultSelected={array("defaultSelected", ["London", "Travel"])}
			showCount={boolean("showCount", true)}
			showSearch={boolean("showSearch", true)}
			placeholder={text("placeholder", "Search Topics")}
		/>
	)));

storiesOf("RangeSlider", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault />
	)))
	.add("With Default Selected", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault
			defaultSelected={{
				start: 0,
				end: 2
			}}
		/>
	)))
	.add("With Range Labels", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault
			defaultSelected={{
				start: 0,
				end: 2
			}}
			rangeLabels={{
				start: "Start",
				end: "End"
			}}
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault
			title={text("title", "RangeSlider: Guest RSVPs")}
			range={object("range", {
				start: 0,
				end: 5
			})}
			stepValue={number("stepValue", 1)}
			defaultSelected={object("defaultSelected", {
				start: 0,
				end: 2
			})}
			rangeLabels={object("rangeLabels", {
				start: "Start",
				end: "End"
			})}
		/>
	)));

storiesOf("NumberBox", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(NumberBoxReadme), () => (
		<NumberBoxDefault
			defaultSelected={3}
			data={{
				label: "Guests",
				start: 1,
				end: 5
			}}
			labelPosition="left"
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(NumberBoxReadme), () => (
		<NumberBoxDefault
			defaultSelected={number("defaultSelected", 3)}
			data={object("data", {
				start: 1,
				end: 5,
				label: "Guests"
			})}
			labelPosition={select("labelPosition", { bottom: "bottom", top: "top", left: "left", right: "right" }, "right")}
		/>
	)));
