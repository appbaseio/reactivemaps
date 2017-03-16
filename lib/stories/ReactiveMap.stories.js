"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _app = require("../app.js");

var _Img = require("./Img.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var historyPin = require("./placeholder.svg");

var ReactiveMapDefault = function (_Component) {
	_inherits(ReactiveMapDefault, _Component);

	function ReactiveMapDefault(props) {
		_classCallCheck(this, ReactiveMapDefault);

		var _this = _possibleConstructorReturn(this, (ReactiveMapDefault.__proto__ || Object.getPrototypeOf(ReactiveMapDefault)).call(this, props));

		_this.onPopoverTrigger = _this.onPopoverTrigger.bind(_this);
		return _this;
	}

	_createClass(ReactiveMapDefault, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_app.AppbaseSensorHelper.ResponsiveStory();
		}
	}, {
		key: "onPopoverTrigger",
		value: function onPopoverTrigger(marker) {
			return _react2.default.createElement(
				"div",
				{ className: "popoverComponent row", style: { margin: "0", maxWidth: "300px" } },
				_react2.default.createElement(
					"span",
					{ className: "imgContainer col s2", style: { padding: "0" } },
					_react2.default.createElement(_Img.Img, { src: marker._source.member.photo })
				),
				_react2.default.createElement(
					"div",
					{ className: "infoContainer col s10" },
					_react2.default.createElement(
						"div",
						{ className: "nameContainer" },
						_react2.default.createElement(
							"strong",
							null,
							marker._source.member.member_name
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "description" },
						_react2.default.createElement(
							"p",
							{ style: { margin: "5px 0", lineHeight: "18px" } },
							"is going to\xA0",
							_react2.default.createElement(
								"a",
								{ href: marker._source.event.event_url, target: "_blank" },
								marker._source.event.event_name
							)
						)
					)
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_app.ReactiveBase,
				{
					app: "meetup2",
					credentials: "qz4ZD8xq1:a0edfc7f-5611-46f6-8fe1-d4db234631f3",
					type: "meetup",
					theme: "rbc-blue"
				},
				_react2.default.createElement(
					"div",
					{ className: "row reverse-labels" },
					_react2.default.createElement(
						"div",
						{ className: "col s6 col-xs-6" },
						_react2.default.createElement(_app.ReactiveMap, _extends({
							appbaseField: this.props.mapping.location,
							historicalData: true,
							setMarkerCluster: false,
							defaultMapStyle: this.props.mapStyle,
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
					_react2.default.createElement(
						"div",
						{ className: "col s6 col-xs-6" },
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(_app.DataSearch, {
								appbaseField: this.props.mapping.venue,
								componentId: "VenueSensor",
								placeholder: "Search Venue",
								actuate: {
									CitySensor: {
										operation: "must",
										doNotExecute: { true: true }
									}
								}
							})
						),
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(_app.SingleList, {
								componentId: "CitySensor",
								appbaseField: this.props.mapping.city,
								showCount: true,
								size: 10,
								title: "Input Filter",
								searchPlaceholder: "Search City",
								includeSelectAll: true
							})
						)
					)
				)
			);
		}
	}]);

	return ReactiveMapDefault;
}(_react.Component);

exports.default = ReactiveMapDefault;


ReactiveMapDefault.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		location: "location",
		venue: "venue_name_ngrams",
		city: "group.group_city.raw"
	}
};