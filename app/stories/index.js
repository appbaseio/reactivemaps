import React from 'react';
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, number, array, object } from "@kadira/storybook-addon-knobs";
import { Appbase } from "appbase-js";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";
import GeoDistanceDropdownDefault from "./GeoDistanceDropdown.stories";
import GoogleSearchDefault from "./GoogleSearch.stories";
import ReactiveMapDefault from "./ReactiveMap.stories";

require ("../../bower_components/materialize/dist/css/materialize.min.css");
require ("../../dist/css/vendor.min.css");
require ("../../dist/css/style.min.css");

storiesOf("GeoDistanceSlider", module)
	.addDecorator(withKnobs)
	.add("Basic", () => (
		<GeoDistanceSliderDefault
			value={50}
			unit="mi"
			placeholder="Search Location"
		/>
	))
	.add("With Title", () => (
		<GeoDistanceSliderDefault
			value={50}
			unit="mi"
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	))
	.add("With Range Labels", () => (
		<GeoDistanceSliderDefault
			value={50}
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
			value={number("value", 50)}
			unit={text("unit", "mi")}
			title={text("title", "Geo Distance Slider")}
			placeholder={text("placeholder", "Search Location")}
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
	.add("With DataSearch", () => (
		<ReactiveMapDefault
			title="Reactive Maps"
			showPopoverOn="onMouseover"
			showSearch={true}
		/>
	))
