var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { ReactiveBase, ReactiveMap, DataSearch, SingleList } from "../app";
import ResponsiveStory from "./ResponsiveStory";

import Img from "./Img";

var historyPin = require("./placeholder.svg");

var ReactiveMapDefault = function (_Component) {
	_inherits(ReactiveMapDefault, _Component);

	function ReactiveMapDefault(props) {
		_classCallCheck(this, ReactiveMapDefault);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onPopoverTrigger = _this.onPopoverTrigger.bind(_this);
		return _this;
	}

	ReactiveMapDefault.prototype.componentDidMount = function componentDidMount() {
		ResponsiveStory();
	};

	ReactiveMapDefault.prototype.onPopoverTrigger = function onPopoverTrigger(marker) {
		return React.createElement(
			"div",
			{ className: "popoverComponent row", style: { margin: "0", maxWidth: "300px" } },
			React.createElement(
				"span",
				{ className: "imgContainer col s2", style: { padding: "0" } },
				React.createElement(Img, { src: marker._source.member.photo })
			),
			React.createElement(
				"div",
				{ className: "infoContainer col s10" },
				React.createElement(
					"div",
					{ className: "nameContainer" },
					React.createElement(
						"strong",
						null,
						marker._source.member.member_name
					)
				),
				React.createElement(
					"div",
					{ className: "description" },
					React.createElement(
						"p",
						{ style: { margin: "5px 0", lineHeight: "18px" } },
						"is going to\xA0",
						React.createElement(
							"a",
							{ href: marker._source.event.event_url, target: "_blank", rel: "noopener noreferrer" },
							marker._source.event.event_name
						)
					)
				)
			)
		);
	};

	ReactiveMapDefault.prototype.render = function render() {
		return React.createElement(
			ReactiveBase,
			{
				app: "reactivemap-demo",
				credentials: "qMzzgez0t:a9138c3f-f246-4cd8-ba3d-0b99f9550c05",
				type: "meetupdata1"
			},
			React.createElement(
				"div",
				{ className: "row reverse-labels" },
				React.createElement(
					"div",
					{ className: "col s6 col-xs-6" },
					React.createElement(ReactiveMap, _extends({
						dataField: "location",
						historicalData: true,
						setMarkerCluster: false,
						defaultMapStyle: "Light Monochrome",
						autoCenter: true,
						searchAsMoveComponent: true,
						MapStylesComponent: true,
						historicPin: historyPin,
						onPopoverTrigger: this.onPopoverTrigger,
						defaultZoom: 13,
						defaultCenter: { lat: 37.74, lon: -122.45 },
						react: {
							and: ["CitySensor", "VenueSensor"]
						}
					}, this.props))
				),
				React.createElement(
					"div",
					{ className: "col s6 col-xs-6" },
					React.createElement(
						"div",
						null,
						React.createElement(DataSearch, {
							dataField: this.props.mapping.venue,
							componentId: "VenueSensor",
							placeholder: "Search Venue"
						})
					),
					React.createElement(
						"div",
						null,
						React.createElement(SingleList, {
							componentId: "CitySensor",
							dataField: this.props.mapping.city,
							showCount: true,
							size: 10,
							title: "Input Filter",
							placeholder: "Search City"
						})
					)
				)
			)
		);
	};

	return ReactiveMapDefault;
}(Component);

export default ReactiveMapDefault;


ReactiveMapDefault.defaultProps = {
	mapping: {
		venue: "venue_name_ngrams",
		city: "group.group_city.raw"
	}
};