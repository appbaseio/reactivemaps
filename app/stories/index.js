import React from 'react';
import { storiesOf, addDecorator } from "@kadira/storybook";
import { withKnobs, text, boolean, number, select } from "@kadira/storybook-addon-knobs";
import { Appbase } from "appbase-js";

import GeoDistanceSliderDefault from "./GeoDistanceSlider.stories";

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
	))
