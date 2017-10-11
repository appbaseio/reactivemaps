var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { ReactiveBase, ReactiveMap, RangeSlider } from "../app";
import ResponsiveStory from "./ResponsiveStory";

import Img from "./Img";

var historyPin = require("./placeholder.svg");

var RangeSliderDefault = function (_Component) {
	_inherits(RangeSliderDefault, _Component);

	function RangeSliderDefault(props) {
		_classCallCheck(this, RangeSliderDefault);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onPopoverTrigger = _this.onPopoverTrigger.bind(_this);
		return _this;
	}

	RangeSliderDefault.prototype.componentDidMount = function componentDidMount() {
		ResponsiveStory();
	};

	RangeSliderDefault.prototype.onPopoverTrigger = function onPopoverTrigger(marker) {
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

	RangeSliderDefault.prototype.render = function render() {
		return React.createElement(
			ReactiveBase,
			{
				app: "reactivemap_demo",
				credentials: "y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18",
				type: "meetupdata1"
			},
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col s6 col-xs-6" },
					React.createElement(RangeSlider, _extends({
						componentId: "RangeSensor",
						dataField: this.props.mapping.guests,
						stepValue: 2,
						title: "RangeSlider",
						range: {
							start: 0,
							end: 8
						}
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
						defaultZoom: 5,
						defaultCenter: { lat: 37.74, lon: -122.45 },
						react: {
							and: "RangeSensor"
						}
					})
				)
			)
		);
	};

	return RangeSliderDefault;
}(Component);

export default RangeSliderDefault;


RangeSliderDefault.defaultProps = {
	mapping: {
		guests: "guests",
		location: "location"
	}
};