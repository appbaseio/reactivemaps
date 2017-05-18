"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactivebase = require("@appbaseio/reactivebase");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _rcSlider = require("rc-slider");

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-lines: 0 */


var _ = require("lodash");

var GeoDistanceSlider = function (_Component) {
	_inherits(GeoDistanceSlider, _Component);

	function GeoDistanceSlider(props) {
		_classCallCheck(this, GeoDistanceSlider);

		var _this = _possibleConstructorReturn(this, (GeoDistanceSlider.__proto__ || Object.getPrototypeOf(GeoDistanceSlider)).call(this, props));

		_this.urlParams = _reactivebase.AppbaseSensorHelper.URLParams.get(_this.props.componentId, false, true);
		_this.defaultSelected = _this.urlParams !== null ? _this.urlParams : _this.props.defaultSelected;
		var value = _this.defaultSelected && _this.defaultSelected.distance ? _this.defaultSelected.distance < _this.props.range.start ? _this.props.range.start : _this.defaultSelected.distance : _this.props.range.start;
		value = parseInt(value, 10);
		_this.defaultSelected.distance = parseInt(_this.defaultSelected.distance, 10);
		_this.state = {
			currentValue: "",
			currentDistance: value + _this.props.unit,
			userLocation: "",
			value: value
		};
		_this.type = "geo_distance";
		_this.locString = "";
		_this.result = {
			options: []
		};
		_this.sortInfo = {
			type: "_geo_distance",
			order: "asc",
			unit: "mi"
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.loadOptions = _this.loadOptions.bind(_this);
		_this.customQuery = _this.customQuery.bind(_this);
		_this.getUserLocation = _this.getUserLocation.bind(_this);
		_this.setDefaultLocation = _this.setDefaultLocation.bind(_this);
		_this.handleValuesChange = _this.handleValuesChange.bind(_this);
		_this.handleResults = _this.handleResults.bind(_this);
		_this.unitFormatter = _this.unitFormatter.bind(_this);
		return _this;
	}

	_createClass(GeoDistanceSlider, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.googleMaps = window.google.maps;
		}

		// Set query information

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.getUserLocation();
			this.setQueryInfo();
			this.checkDefault();
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate() {
			if (!_.isEqual(this.defaultSelected, this.defaultSelected)) {
				this.defaultSelected = this.defaultSelected;
				this.checkDefault();
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			if (this.channelId) {
				_reactivebase.AppbaseChannelManager.stopStream(this.channelId);
			}
			if (this.channelListener) {
				this.channelListener.remove();
			}
		}
	}, {
		key: "checkDefault",
		value: function checkDefault() {
			var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
			if (defaultValue && defaultValue.location) {
				var currentValue = defaultValue.location;
				this.result.options.push({
					value: currentValue,
					label: currentValue
				});
				this.setState({
					currentValue: currentValue
				}, this.getCoordinates(currentValue, this.handleResults));
			} else if (defaultValue && defaultValue.distance) {
				this.getUserLocation(this.setDefaultLocation);
				this.handleResults(defaultValue.distance);
			} else {
				this.getUserLocation(this.setDefaultLocation);
			}
		}
	}, {
		key: "getUserLocation",
		value: function getUserLocation(cb) {
			var _this2 = this;

			navigator.geolocation.getCurrentPosition(function (location) {
				_this2.locString = location.coords.latitude + ", " + location.coords.longitude;

				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this2.locString).then(function (res) {
					var userLocation = res.data.results[0].formatted_address;
					_this2.setState({
						userLocation: userLocation
					});
				}).then(function () {
					if (cb) {
						cb();
					}
				});
			});
		}
	}, {
		key: "setDefaultLocation",
		value: function setDefaultLocation() {
			var _this3 = this;

			this.result.options.push({
				value: this.state.userLocation,
				label: "Use my current location"
			});
			if (this.props.autoLocation) {
				this.setState({
					currentValue: this.state.userLocation
				}, function () {
					_this3.executeQuery();
				});
			}
		}

		// set the query type and input data

	}, {
		key: "setQueryInfo",
		value: function setQueryInfo() {
			var obj = {
				key: this.props.componentId,
				value: {
					queryType: this.type,
					appbaseField: this.props.appbaseField,
					customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery
				}
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.setSensorInfo(obj);
		}

		// build query for this sensor only

	}, {
		key: "customQuery",
		value: function customQuery(value) {
			var query = null;
			if (value && value.currentValue !== "" && value.location !== "") {
				var _type;

				query = _defineProperty({}, this.type, (_type = {}, _defineProperty(_type, this.props.appbaseField, value.location), _defineProperty(_type, "distance", value.currentDistance), _type));
			}
			return query;
		}

		// get coordinates

	}, {
		key: "getCoordinates",
		value: function getCoordinates(value, cb) {
			var _this4 = this;

			if (value && value !== "") {
				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
					var location = res.data.results[0].geometry.location;
					_this4.locString = location.lat + ", " + location.lng;
					if (cb) {
						cb(_this4.defaultSelected.distance);
					} else {
						_this4.executeQuery();
					}
				});
			} else {
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(null, true);
			}
		}

		// execute query after changing location or distance

	}, {
		key: "executeQuery",
		value: function executeQuery() {
			if (this.state.currentValue !== "" && this.state.currentDistance && this.locString) {
				var _sortInfo$type;

				var obj = {
					key: this.props.componentId,
					value: {
						currentValue: this.state.currentValue,
						currentDistance: this.state.currentDistance,
						location: this.locString
					}
				};
				var sortObj = {
					key: this.props.componentId,
					value: _defineProperty({}, this.sortInfo.type, (_sortInfo$type = {}, _defineProperty(_sortInfo$type, this.props.appbaseField, this.locString), _defineProperty(_sortInfo$type, "order", this.sortInfo.order), _defineProperty(_sortInfo$type, "unit", this.sortInfo.unit), _sortInfo$type))
				};
				if (this.props.onValueChange) {
					this.props.onValueChange(obj.value);
				}
				_reactivebase.AppbaseSensorHelper.selectedSensor.setSortInfo(sortObj);
				_reactivebase.AppbaseSensorHelper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
		}
	}, {
		key: "setURLValue",
		value: function setURLValue() {
			var distance = this.state.currentDistance.split(this.props.unit);
			distance = distance[0];
			return JSON.stringify({
				location: this.state.currentValue,
				distance: distance
			});
		}

		// handle the input change and pass the value inside sensor info

	}, {
		key: "handleChange",
		value: function handleChange(input, cb) {
			if (input) {
				var inputVal = input.value;
				this.setState({
					currentValue: inputVal
				});
				this.getCoordinates(inputVal, cb);
			} else {
				this.setState({
					currentValue: ""
				});
				var obj = {
					key: this.props.componentId,
					value: null
				};
				if (this.props.onValueChange) {
					this.props.onValueChange(obj.value);
				}
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
		}
	}, {
		key: "unitFormatter",
		value: function unitFormatter(v) {
			return v + " " + this.props.unit;
		}

		// Handle function when value slider option is changing

	}, {
		key: "handleValuesChange",
		value: function handleValuesChange(component, value) {
			this.setState({
				value: value
			});
		}

		// Handle function when slider option change is completed

	}, {
		key: "handleResults",
		value: function handleResults(value) {
			var distValue = value + this.props.unit;
			this.setState({
				value: value,
				currentDistance: distValue
			}, this.executeQuery.bind(this));
		}
	}, {
		key: "loadOptions",
		value: function loadOptions(input, callback) {
			var _this5 = this;

			this.callback = callback;
			if (input) {
				var googleMaps = this.googleMaps || window.google.maps;
				this.autocompleteService = new googleMaps.places.AutocompleteService();
				var options = {
					input: input
				};
				this.result = {
					options: []
				};
				this.autocompleteService.getPlacePredictions(options, function (res) {
					res.forEach(function (place) {
						_this5.result.options.push({
							label: place.description,
							value: place.description
						});
					});
					if (_this5.state.userLocation.length && _this5.result.options[0].label !== "Use my current location") {
						_this5.result.options.unshift({
							label: "Use my current location",
							value: _this5.state.userLocation
						});
					}
					_this5.callback(null, _this5.result);
				});
			} else {
				this.callback(null, this.result);
			}
		}
	}, {
		key: "renderValue",
		value: function renderValue(option) {
			return _react2.default.createElement(
				"span",
				null,
				option.value
			);
		}

		// render

	}, {
		key: "render",
		value: function render() {
			var title = null,
			    marks = {};

			if (this.props.title) {
				title = _react2.default.createElement(
					"h4",
					{ className: "rbc-title" },
					this.props.title
				);
			}

			if (this.props.rangeLabels.start || this.props.rangeLabels.end) {
				var _marks;

				marks = (_marks = {}, _defineProperty(_marks, this.props.range.start, this.props.rangeLabels.start), _defineProperty(_marks, this.props.range.end, this.props.rangeLabels.end), _marks);
			}

			var cx = (0, _classnames2.default)({
				"rbc-title-active": this.props.title,
				"rbc-title-inactive": !this.props.title,
				"rbc-placeholder-active": this.props.placeholder,
				"rbc-placeholder-inactive": !this.props.placeholder,
				"rbc-labels-active": this.props.rangeLabels.start || this.props.rangeLabels.end,
				"rbc-labels-inactive": !this.props.rangeLabels.start && !this.props.rangeLabels.end
			});

			return _react2.default.createElement(
				"div",
				{ className: "rbc rbc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.componentStyle },
				_react2.default.createElement(
					"div",
					{ className: "row" },
					title,
					_react2.default.createElement(
						"div",
						{ className: "rbc-search-container col s12 col-xs-12" },
						_react2.default.createElement(_reactSelect2.default.Async, {
							value: this.state.currentValue,
							loadOptions: this.loadOptions,
							placeholder: this.props.placeholder,
							onChange: this.handleChange,
							filterOption: function filterOption() {
								return true;
							},
							valueRenderer: this.renderValue
						})
					),
					_react2.default.createElement(
						"div",
						{ className: "rbc-rangeslider-container col s12 col-xs-12" },
						_react2.default.createElement(_rcSlider2.default, {
							tipFormatter: this.unitFormatter,
							value: this.state.value,
							min: this.props.range.start,
							max: this.props.range.end,
							onChange: this.handleResults,
							marks: marks,
							step: this.props.stepValue
						})
					)
				)
			);
		}
	}]);

	return GeoDistanceSlider;
}(_react.Component);

exports.default = GeoDistanceSlider;


GeoDistanceSlider.propTypes = {
	componentId: _react2.default.PropTypes.string.isRequired,
	appbaseField: _react2.default.PropTypes.string.isRequired,
	title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	customQuery: _react2.default.PropTypes.func,
	defaultSelected: _react2.default.PropTypes.shape({
		distance: _react2.default.PropTypes.number,
		location: _react2.default.PropTypes.string
	}),
	placeholder: _react2.default.PropTypes.string,
	unit: _react2.default.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	stepValue: _reactivebase.AppbaseSensorHelper.stepValidation,
	range: _react2.default.PropTypes.shape({
		start: _reactivebase.AppbaseSensorHelper.validateThreshold,
		end: _reactivebase.AppbaseSensorHelper.validateThreshold
	}),
	rangeLabels: _react2.default.PropTypes.shape({
		start: _react2.default.PropTypes.string,
		end: _react2.default.PropTypes.string
	}),
	autoLocation: _react2.default.PropTypes.bool,
	onValueChange: _react2.default.PropTypes.func,
	componentStyle: _react2.default.PropTypes.object,
	URLParams: _react2.default.PropTypes.bool
};

// Default props value
GeoDistanceSlider.defaultProps = {
	stepValue: 1,
	unit: "mi",
	placeholder: "Search...",
	range: {
		start: 0,
		end: 10
	},
	rangeLabels: {
		start: null,
		end: null
	},
	autoLocation: true,
	componentStyle: {},
	URLParams: false
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};

GeoDistanceSlider.types = {
	componentId: _reactivebase.TYPES.STRING,
	appbaseField: _reactivebase.TYPES.STRING,
	appbaseFieldType: _reactivebase.TYPES.GEO_POINT,
	title: _reactivebase.TYPES.STRING,
	range: _reactivebase.TYPES.OBJECT,
	rangeLabels: _reactivebase.TYPES.OBJECT,
	stepValue: _reactivebase.TYPES.NUMBER,
	unit: _reactivebase.TYPES.STRING,
	autoLocation: _reactivebase.TYPES.BOOLEAN,
	defaultSelected: _reactivebase.TYPES.OBJECT,
	placeholder: _reactivebase.TYPES.STRING,
	customQuery: _reactivebase.TYPES.FUNCTION,
	componentStyle: _reactivebase.TYPES.OBJECT,
	URLParams: _reactivebase.TYPES.BOOLEAN
};