import React from 'react';
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, number, array } from "@kadira/storybook-addon-knobs";
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
	.add("Playground", () => (
		<GeoDistanceSliderDefault
			value={number("value", 50)}
			unit={text("unit", "mi")}
			title={text("title", "Geo Distance Slider")}
			placeholder={text("placeholder", "Search Location")}
		/>
	));

storiesOf("GeoDistanceDropdown", module)
	.addDecorator(withKnobs)
	.add("Basic", () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			distanceOptions={[20,50,100,150]}
			placeholder="Search Location"
		/>
	))
	.add("With Title", () => (
		<GeoDistanceDropdownDefault
			unit="mi"
			distanceOptions={[20,50,100,150]}
			title="Geo Distance Search"
			placeholder="Search Location"
		/>
	))
	.add("Playground", () => (
		<GeoDistanceDropdownDefault
			unit={text("unit", "mi")}
			distanceOptions={array("distanceOptions", [20,50,100,150])}
			title={text("title", "Geo Distance Slider")}
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
