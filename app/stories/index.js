import React from 'react';
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, number, array, object, select, boolean } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";

import { Appbase } from "appbase-js";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";
import GeoDistanceDropdownDefault from "./GeoDistanceDropdown.stories";
import GoogleSearchDefault from "./GoogleSearch.stories";
import ReactiveMapDefault from "./ReactiveMap.stories";

import SingleListDefault from "./SingleList.stories";
import SingleListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleList.md";

import MultiListDefault from "./MultiList.stories";
import MultiListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/MultiList.md";

import SingleDropdownListDefault from "./SingleDropdownList.stories";
import SingleDropdownListReadme from "@appbaseio/reactivebase-manual/docs/v1/components/SingleDropdownList.md";

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

storiesOf("GoogleSearch", module)
	.addDecorator(withKnobs)
	.add("Basic - Direction Demo", () => (
		<GoogleSearchDefault />
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
			showPopoverOn="onClick"
		/>
	))
	.add("With Popover onMouseOver", () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="onMouseover"
		/>
	))
	.add("Playground", () => (
		<ReactiveMapDefault
			title={text("title", "Reactive maps")}
			showPopoverOn={select("showPopoverOn", {'onClick': 'onClick', 'onMouseover':'onMouseover'}, 'onClick')}
			markerCluster={boolean("markerCluster", true)}
			autoCenter={boolean("autoCenter", true)}
			showSearchAsMove={boolean("showSearchAsMove", true)}
			setSearchAsMove={boolean("setSearchAsMove", false)}
			showMapStyles={boolean("showMapStyles", false)}
			mapStyle={select("mapStyle", {'Standard':'Standard', 'Blue Essence':'Blue Essence', 'Blue Water':'Blue Water', 'Flat Map':'Flat Map', 'Light Monochrome':'Light Monochrome', 'Midnight Commander':'Midnight Commander', 'Unsaturated Browns':'Unsaturated Browns'}, 'Standard')}
			size={number('size', 100)}
			streamActiveTime={number("streamActiveTime", 5)}
			streamAutoCenter={boolean("streamAutoCenter", true)}
			rotateOnUpdate={boolean("rotateOnUpdate", false)}
			showMarkers={boolean("showMarkers", true)}
			clearOnEmpty={boolean("clearOnEmpty", true)}
			defaultPin={text('defaultPin', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png')}
			streamPin={text('streamPin', 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png')}
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
