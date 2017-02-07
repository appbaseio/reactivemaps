import React from 'react';
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, number, array, object, select, boolean } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";

import { Appbase } from "appbase-js";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";
import GeoDistanceDropdownDefault from "./GeoDistanceDropdown.stories";
import PlacesSearchDefault from "./PlacesSearch.stories";
import ReactiveMapDefault from "./ReactiveMap.stories";

import SingleListDefault from "./SingleList.stories";
import SingleListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleList.md";

import MultiListDefault from "./MultiList.stories";
import MultiListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/MultiList.md";

import SingleDropdownListDefault from "./SingleDropdownList.stories";
import SingleDropdownListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleDropdownList.md";

import MultiDropdownListDefault from "./MultiDropdownList.stories";
import MultiDropdownListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/MultiDropdownList.md";

import SingleRangeDefault from "./SingleRange.stories";
import SingleRangeReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleRange.md";

import MultiRangeDefault from "./MultiRange.stories";
import MultiRangeReadme from "@appbaseio/reactivebase-manual/docs/v1/components/MultiRange.md";

import SingleDropdownRangeDefault from "./SingleDropdownRange.stories";
import SingleDropdownRangeReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleDropdownRange.md";

import MultiDropdownRangeDefault from "./MultiDropdownRange.stories";
import MultiDropdownRangeReadme from "@appbaseio/reactivebase-manual/docs/v1/components/MultiDropdownRange.md";

import DataSearchDefault from "./DataSearch.stories";
import DataSearchReadme from "@appbaseio/reactivebase-manual/docs/v1/components/DataSearch.md";

import NestedListDefault from "./NestedList.stories";
import NestedListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/NestedList.md";

import RangeSliderDefault from "./RangeSlider.stories";
import RangeSliderReadme from "@appbaseio/reactivebase-manual/docs/v1/components/RangeSlider.md";

require ("../../bower_components/materialize/dist/css/materialize.min.css");
require ("../../dist/css/vendor.min.css");
require ("../../dist/css/style.min.css");
require ("./styles.css");

function removeFirstLine(str) {
	return str.substring(str.indexOf("\n") + 1);
}

storiesOf("GeoDistanceSlider", module)
	.addDecorator(withKnobs)
	.add("Basic", () => (
		<GeoDistanceSliderDefault
			defaultSelected={50}
			unit="mi"
			placeholder="Search Location"
		/>
	))
	.add("With Title", () => (
		<GeoDistanceSliderDefault
			defaultSelected={50}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	))
	.add("With Range Labels", () => (
		<GeoDistanceSliderDefault
			defaultSelected={50}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
			rangeLabels={
				{
					"start": "Start",
					"end": "End"
				}
			}
		/>
	))
	.add("Playground", () => (
		<GeoDistanceSliderDefault
			defaultSelected={number("defaultSelected", 50)}
			stepValue={number("stepValue", 1)}
			unit={text("unit", "mi")}
			title={text("title", "Geo Distance Slider")}
			placeholder={text("placeholder", "Search Location")}
			range={object("range", {
				"start": 0,
				"end": 50
			})}
			rangeLabels={object("rangeLabels", {
				"start": "Start",
				"end": "End"
			})}
		/>
	));

storiesOf("GeoDistanceDropdown", module)
	.addDecorator(withKnobs)
	.add("Basic", () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
				[{"start": 0, "end": 100, "label": "Less than 100 miles"},
				{"start": 101, "end": 200, "label": "Between 100 and 200 miles"},
				{"start": 201, "end": 500, "label": "Between 200 and 500 miles"},
				{"start": 501, "end": 1000, "label": "Above 500 miles"}]
			}
			// distanceOptions={[20,50,100,150]}
			placeholder="Search Location"
		/>
	))
	.add("With Title", () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
				[{"start": 0, "end": 100, "label": "Less than 100 miles"},
				{"start": 101, "end": 200, "label": "Between 100 and 200 miles"},
				{"start": 201, "end": 500, "label": "Between 200 and 500 miles"},
				{"start": 501, "end": 1000, "label": "Above 500 miles"}]
			}
			// distanceOptions={[20,50,100,150]}
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	))
	.add("With Default Selected", () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			data={
				[{"start": 0, "end": 100, "label": "Less than 100 miles"},
				{"start": 101, "end": 200, "label": "Between 100 and 200 miles"},
				{"start": 201, "end": 500, "label": "Between 200 and 500 miles"},
				{"start": 501, "end": 1000, "label": "Above 500 miles"}]
			}
			defaultSelected="Between 200 and 500 miles"
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	))
	.add("Playground", () => (
		<GeoDistanceDropdownDefault
			data={
				[{"start": 0, "end": 100, "label": "Less than 100 miles"},
				{"start": 101, "end": 200, "label": "Between 100 and 200 miles"},
				{"start": 201, "end": 500, "label": "Between 200 and 500 miles"},
				{"start": 501, "end": 1000, "label": "Above 500 miles"}]
			}
			unit={text("unit", "mi")}
			title={text("title", "Geo Distance Slider")}
			defaultSelected={text("defaultSelected", "Between 200 and 500 miles")}
			placeholder={text("placeholder", "Search Location")}
		/>
	));

storiesOf("PlacesSearch", module)
	.addDecorator(withKnobs)
	.add("Basic - Direction Demo", () => (
		<PlacesSearchDefault />
	));

storiesOf("ReactiveMap", module)
	.addDecorator(withKnobs)
	.add("Basic", () => (
		<ReactiveMapDefault />
	))
	.add("With Title", () => (
		<ReactiveMapDefault
			title="Reactive Maps"
		/>
	))
	.add("With Popover onClick", () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="click"
		/>
	))
	.add("With Popover onMouseOver", () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="mouseover"
		/>
	))
	.add("Playground", () => (
		<ReactiveMapDefault
			title={text("title", "Reactive maps")}
			showPopoverOn={select("showPopoverOn", {'click': 'click', 'mouseover':'mouseover'}, 'click')}
			setMarkerCluster={boolean("setMarkerCluster", true)}
			autoCenter={boolean("autoCenter", true)}
			showSearchAsMove={boolean("showSearchAsMove", true)}
			setSearchAsMove={boolean("setSearchAsMove", false)}
			showMapStyles={boolean("showMapStyles", false)}
			defaultMapStyle={select("defaultMapStyle", {'Standard':'Standard', 'Blue Essence':'Blue Essence', 'Blue Water':'Blue Water', 'Flat Map':'Flat Map', 'Light Monochrome':'Light Monochrome', 'Midnight Commander':'Midnight Commander', 'Unsaturated Browns':'Unsaturated Browns'}, 'Standard')}
			size={number('size', 100)}
			streamTTL={number("streamTTL", 5)}
			streamAutoCenter={boolean("streamAutoCenter", true)}
			autoMarkerPosition={boolean("autoMarkerPosition", false)}
			showMarkers={boolean("showMarkers", true)}
			autoMapRender={boolean("autoMapRender", true)}
			defaultZoom={number('defaultZoom', 13)}
			defaultCenter={object("defaultCenter", {
				"lat": 37.74,
				"lng": -122.45
			})}
			defaultMarkerImage={text('defaultMarkerImage', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png')}
			streamMarkerImage={text('streamMarkerImage', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png')}
		/>
	));

storiesOf("SingleList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch={true} placeholder="Search City" />
	)))
	.add("Without Search", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch={false} placeholder="Search City" />
	)))
	.add("Default Selected", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch={true} defaultSelected="San Francisco" placeholder="Search City" />
	)))
	.add("Custom Sort", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault title="SingleList: Ascending Sort" showSearch={true} defaultSelected="London" sortBy="asc" placeholder="Search City" />
	)))
	.add("With Select All", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault showSearch={true} selectAllLabel="All Cities" placeholder="Search City" />
	)))
	.add("Playground", withReadme(removeFirstLine(SingleListReadme), () => (
		<SingleListDefault
			title={text("title", "SingleList: City Filter")}
			size={number("size", 100)}
			sortBy={select("sortBy", {asc: "asc", desc: "desc", count: "count"}, "count")}
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
		<MultiListDefault showSearch={true} placeholder="Search City" />
	)))
	.add("Without Search", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch={false} placeholder="Search City" />
	)))
	.add("Default Selected", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch={true} defaultSelected={["London", "Sydney"]} placeholder="Search City" />
	)))
	.add("Custom Sort", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault title="MultiList: Ascending Sort" showSearch={true} defaultSelected={["London"]} sortBy="asc" placeholder="Search City" />
	)))
	.add("With Select All", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault showSearch={true} selectAllLabel="All Cities" placeholder="Search City" />
	)))
	.add("Playground", withReadme(removeFirstLine(MultiListReadme), () => (
		<MultiListDefault
			title={text("title", "MultiList: City Filter")}
			size={number("size", 10)}
			sortBy={select("sortBy", {asc: "asc", desc: "desc", count: "count"}, "count")}
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
			sortBy={select("sortBy", {asc: "asc", desc: "desc", count: "count"}, "count")}
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
			sortBy={select("sortBy", {asc: "asc", desc: "desc", count: "count"}, "count")}
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
			defaultSelected={text("defaultSelected", "Strong")} />
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
			showTags={boolean("showTags", "false")} />
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
			defaultSelected={text("defaultSelected", "Strong")} />
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
			defaultSelected={array("defaultSelected", ["Moderate", "Strong"])} />
	)));

storiesOf("DataSearch", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title="DataSearch"
			placeholder="Search Venue" />
	)))
	.add("Without Autocomplete", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title="DataSearch"
			placeholder="Search Venue"
			autocomplete={false} />
	)))
	.add("Playground", withReadme(removeFirstLine(DataSearchReadme), () => (
		<DataSearchDefault
			title={text("title", "DataSearch: Meetups")}
			placeholder={text("placeholder", "Search Venue")}
			autocomplete={boolean("autocomplete", true)} />
	)));

storiesOf("NestedList", module)
	.addDecorator(withKnobs)
	.add("Basic", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault />
	)))
	.add("With Title", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			title={text("title", "City-wise Meetups")} />
	)))
	.add("Default selection", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			defaultSelected={["London","Travel"]} />
	))).add("Playground", withReadme(removeFirstLine(NestedListReadme), () => (
		<NestedListDefault
			title={text("title", "NestedList: City-wise Meetup Topics")}
			size={number("size", 100)}
			sortBy={select("sortBy", {asc: "asc", desc: "desc", count: "count"}, "count")}
			defaultSelected={array("defaultSelected", ["London","Travel"])}
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
			defaultSelected={
				{
					"start": 0,
					"end": 2
				}
			}
		/>
	)))
	.add("With Range Labels", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault
			defaultSelected={
				{
					"start": 0,
					"end": 2
				}
			}
			rangeLabels={
				{
					"start": "Start",
					"end": "End"
				}
			}
		/>
	)))
	.add("Playground", withReadme(removeFirstLine(RangeSliderReadme), () => (
		<RangeSliderDefault
			title={text("title", "RangeSlider: Guest RSVPs")}
			range={object("range", {
				"start": 0,
				"end": 5
			})}
			stepValue={number("stepValue", 1)}
			defaultSelected={object("defaultSelected", {
				"start": 0,
				"end": 2
			})}
			rangeLabels={object("rangeLabels", {
				"start": "Start",
				"end": "End"
			})}
		/>
	)));
