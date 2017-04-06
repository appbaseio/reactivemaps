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

var SingleDropdownRangeDefault = function (_Component) {
	_inherits(SingleDropdownRangeDefault, _Component);

	function SingleDropdownRangeDefault(props) {
		_classCallCheck(this, SingleDropdownRangeDefault);

		var _this = _possibleConstructorReturn(this, (SingleDropdownRangeDefault.__proto__ || Object.getPrototypeOf(SingleDropdownRangeDefault)).call(this, props));

		_this.onPopoverTrigger = _this.onPopoverTrigger.bind(_this);
		return _this;
	}

	_createClass(SingleDropdownRangeDefault, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_app.AppbaseSensorHelper.ResponsiveStory();
		}
	}, {
		key: "onPopoverTrigger",
		value: function onPopoverTrigger(marker) {
			return _react2.default.createElement(
				"div",
				{ className: "popoverComponent row" },
				_react2.default.createElement(
					"div",
					{ className: "infoContainer col s12 col-xs-12" },
					_react2.default.createElement(
						"div",
						{ className: "description" },
						_react2.default.createElement(
							"p",
							null,
							"Earthquake (at)\xA0",
							_react2.default.createElement(
								"strong",
								null,
								marker._source.place
							),
							"\xA0 of maginutde: ",
							_react2.default.createElement(
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
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_app.ReactiveBase,
				{
					app: "earthquake",
					credentials: "OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
				},
				_react2.default.createElement(
					"div",
					{ className: "row" },
					_react2.default.createElement(
						"div",
						{ className: "col s6 col-xs-6" },
						_react2.default.createElement(_app.SingleDropdownRange, _extends({
							componentId: "EarthquakeSensor",
							appbaseField: this.props.mapping.mag,
							title: "SingleDropdownRange",
							data: [{ start: 3, end: 3.9, label: "Minor" }, { start: 4, end: 4.9, label: "Light" }, { start: 5, end: 5.9, label: "Moderate" }, { start: 6, end: 6.9, label: "Strong" }, { start: 7, end: 7.9, label: "Major" }, { start: 8, end: 10, label: "Great" }]
						}, this.props))
					),
					_react2.default.createElement(
						"div",
						{ className: "col s6 col-xs-6" },
						_react2.default.createElement(_app.ReactiveMap, {
							appbaseField: this.props.mapping.location,
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
								and: ["EarthquakeSensor"]
							}
						})
					)
				)
			);
		}
	}]);

	return SingleDropdownRangeDefault;
}(_react.Component);

exports.default = SingleDropdownRangeDefault;


SingleDropdownRangeDefault.defaultProps = {
	mapping: {
		mag: "mag",
		location: "location"
	}
};