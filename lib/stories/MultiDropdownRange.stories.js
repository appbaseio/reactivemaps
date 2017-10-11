var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { ReactiveBase, ReactiveMap, MultiDropdownRange } from "../app";
import ResponsiveStory from "./ResponsiveStory";

var historyPin = require("./placeholder.svg");

var MultiDropdownRangeDefault = function (_Component) {
	_inherits(MultiDropdownRangeDefault, _Component);

	function MultiDropdownRangeDefault(props) {
		_classCallCheck(this, MultiDropdownRangeDefault);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onPopoverTrigger = _this.onPopoverTrigger.bind(_this);
		return _this;
	}

	MultiDropdownRangeDefault.prototype.componentDidMount = function componentDidMount() {
		ResponsiveStory();
	};

	MultiDropdownRangeDefault.prototype.onPopoverTrigger = function onPopoverTrigger(marker) {
		return React.createElement(
			"div",
			{ className: "popoverComponent row" },
			React.createElement(
				"div",
				{ className: "infoContainer col s12 col-xs-12" },
				React.createElement(
					"div",
					{ className: "description" },
					React.createElement(
						"p",
						null,
						"Earthquake (at)\xA0",
						React.createElement(
							"strong",
							null,
							marker._source.place
						),
						"\xA0 of maginutde: ",
						React.createElement(
							"code",
							null,
							marker._source.mag
						),
						"\xA0 in the year ",
						marker._source.time,
						"."
					)
				)
			)
		);
	};

	MultiDropdownRangeDefault.prototype.render = function render() {
		return React.createElement(
			ReactiveBase,
			{
				app: "earthquake",
				credentials: "OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
			},
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col s6 col-xs-6" },
					React.createElement(MultiDropdownRange, _extends({
						componentId: "EarthquakeSensor",
						dataField: this.props.mapping.mag,
						title: "MultiDropdownRange",
						data: [{ start: 3, end: 3.9, label: "Minor" }, { start: 4, end: 4.9, label: "Light" }, { start: 5, end: 5.9, label: "Moderate" }, { start: 6, end: 6.9, label: "Strong" }, { start: 7, end: 7.9, label: "Major" }, { start: 8, end: 10, label: "Great" }]
					}, this.props))
				),
				React.createElement(
					"div",
					{ className: "col s6 col-xs-6" },
					React.createElement(ReactiveMap, {
						dataField: this.props.mapping.location,
						historicalData: true,
						setMarkerCluster: false,
						defaultMapStyle: "Light Monochrome",
						autoCenter: true,
						searchAsMoveComponent: true,
						MapStylesComponent: true,
						title: "Reactive Maps",
						showPopoverOn: "click",
						historicPin: historyPin,
						onPopoverTrigger: this.onPopoverTrigger,
						defaultZoom: 13,
						defaultCenter: { lat: 37.74, lon: -122.45 },
						react: {
							and: "EarthquakeSensor"
						}
					})
				)
			)
		);
	};

	return MultiDropdownRangeDefault;
}(Component);

export default MultiDropdownRangeDefault;


MultiDropdownRangeDefault.defaultProps = {
	mapping: {
		mag: "mag",
		location: "location"
	}
};