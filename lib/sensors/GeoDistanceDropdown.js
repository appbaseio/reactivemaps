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

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require("lodash");

var GeoDistanceDropdown = function (_Component) {
	_inherits(GeoDistanceDropdown, _Component);

	function GeoDistanceDropdown(props) {
		_classCallCheck(this, GeoDistanceDropdown);

		var _this = _possibleConstructorReturn(this, (GeoDistanceDropdown.__proto__ || Object.getPrototypeOf(GeoDistanceDropdown)).call(this, props));

		_this.state = {
			selected: {},
			currentValue: "",
			userLocation: ""
		};
		_this.type = "geo_distance_range";
		_this.locString = "";
		_this.unit = _this.props.unit;
		_this.result = {
			options: []
		};
		_this.sortInfo = {
			type: "_geo_distance",
			order: "asc",
			unit: _this.unit
		};
		_this.allowedUnit = ["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"];
		_this.urlParams = _reactivebase.AppbaseSensorHelper.URLParams.get(_this.props.componentId, false, true);
		_this.defaultSelected = _this.urlParams !== null ? _this.urlParams : _this.props.defaultSelected;
		if (_this.defaultSelected) {
			var selected = _this.props.data.filter(function (item) {
				return item.label === _this.defaultSelected;
			});
			if (selected[0]) {
				_this.state.selected = selected[0];
			}
		}
		_this.handleChange = _this.handleChange.bind(_this);
		_this.loadOptions = _this.loadOptions.bind(_this);
		_this.customQuery = _this.customQuery.bind(_this);
		_this.getUserLocation = _this.getUserLocation.bind(_this);
		_this.setDefaultLocation = _this.setDefaultLocation.bind(_this);
		_this.handleDistanceChange = _this.handleDistanceChange.bind(_this);
		return _this;
	}

	_createClass(GeoDistanceDropdown, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.googleMaps = window.google.maps;
		}

		// Set query information

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.unit = this.props.unit;
			this.getUserLocation();
			this.setQueryInfo();
			this.checkDefault();
			this.listenFilter();
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate() {
			var _this2 = this;

			var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
			if (!_.isEqual(this.defaultSelected, defaultValue)) {
				this.defaultSelected = defaultValue;
				this.checkDefault();
			}
			if (this.props.unit !== this.unit) {
				var selected = this.allowedUnit.filter(function (item) {
					return item === _this2.props.unit;
				});
				if (selected[0]) {
					this.unit = this.props.unit;
					this.executeQuery();
				}
			}
		}

		// stop streaming request and remove listener when component will unmount

	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			if (this.filterListener) {
				this.filterListener.remove();
			}
		}
	}, {
		key: "listenFilter",
		value: function listenFilter() {
			var _this3 = this;

			this.filterListener = _reactivebase.AppbaseSensorHelper.sensorEmitter.addListener("clearFilter", function (data) {
				if (data === _this3.props.componentId) {
					_this3.defaultValue = null;
					_this3.changeValue(_this3.defaultValue);
				}
			});
		}
	}, {
		key: "checkDefault",
		value: function checkDefault() {
			this.urlParams = _reactivebase.AppbaseSensorHelper.URLParams.get(this.props.componentId, false, true);
			var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
			this.changeValue(defaultValue);
		}
	}, {
		key: "changeValue",
		value: function changeValue(defaultValue) {
			if (defaultValue && defaultValue.location) {
				var currentValue = defaultValue.location;
				this.result.options.push({
					value: currentValue,
					label: currentValue
				});
				this.setState({
					currentValue: currentValue
				}, this.getCoordinates(currentValue, this.handleResults));
			} else if (defaultValue && defaultValue.label) {
				this.getUserLocation(this.setDefaultLocation);
				this.handleResults(defaultValue.label);
			} else if (defaultValue === null) {
				this.setState({
					selected: null,
					currentValue: ""
				}, this.executeQuery);
			} else {
				this.getUserLocation(this.setDefaultLocation);
			}
		}
	}, {
		key: "handleResults",
		value: function handleResults(distance) {
			var selected = this.props.data.filter(function (item) {
				return item.label === distance;
			});
			if (selected[0]) {
				this.setState({
					selected: selected[0]
				}, this.executeQuery);
			}
		}
	}, {
		key: "getUserLocation",
		value: function getUserLocation(cb) {
			var _this4 = this;

			navigator.geolocation.getCurrentPosition(function (location) {
				_this4.locString = location.coords.latitude + ", " + location.coords.longitude;

				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this4.locString).then(function (res) {
					var userLocation = res.data.results[0].formatted_address;
					_this4.setState({
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
			var _this5 = this;

			this.result.options.push({
				value: this.state.userLocation,
				label: "Use my current location"
			});
			if (this.props.autoLocation) {
				this.setState({
					currentValue: this.state.userLocation
				}, function () {
					_this5.executeQuery();
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
			if (value && value.start >= 0 && value.end >= 0 && value.location !== "") {
				var _type;

				query = _defineProperty({}, this.type, (_type = {}, _defineProperty(_type, this.props.appbaseField, value.location), _defineProperty(_type, "from", value.start + this.unit), _defineProperty(_type, "to", value.end + this.unit), _type));
			}
			return query;
		}

		// get coordinates

	}, {
		key: "getCoordinates",
		value: function getCoordinates(value, cb) {
			var _this6 = this;

			if (value && value !== "") {
				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
					var location = res.data.results[0].geometry.location;
					_this6.locString = location.lat + ", " + location.lng;
					if (cb) {
						cb.call(_this6, _this6.defaultSelected.label);
					} else {
						_this6.executeQuery();
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
			if (this.state.currentValue !== "" && this.state.selected && this.locString) {
				var _sortInfo$type;

				var obj = {
					key: this.props.componentId,
					value: {
						currentValue: this.state.currentValue,
						start: this.state.selected.start,
						end: this.state.selected.end,
						location: this.locString,
						unit: this.unit
					}
				};
				var sortObj = {
					key: this.props.componentId,
					value: _defineProperty({}, this.sortInfo.type, (_sortInfo$type = {}, _defineProperty(_sortInfo$type, this.props.appbaseField, this.locString), _defineProperty(_sortInfo$type, "order", this.sortInfo.order), _defineProperty(_sortInfo$type, "unit", this.unit), _sortInfo$type))
				};
				if (this.props.onValueChange) {
					this.props.onValueChange(obj.value);
				}
				_reactivebase.AppbaseSensorHelper.selectedSensor.setSortInfo(sortObj);
				_reactivebase.AppbaseSensorHelper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			} else if (this.state.selected === null && this.state.currentValue === "") {
				var _obj = {
					key: this.props.componentId,
					value: null
				};
				_reactivebase.AppbaseSensorHelper.URLParams.update(this.props.componentId, null, this.props.URLParams);
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(_obj, true);
			}
		}
	}, {
		key: "setURLValue",
		value: function setURLValue() {
			return JSON.stringify({
				location: this.state.currentValue,
				label: this.state.selected.label
			});
		}

		// handle the input change and pass the value inside sensor info

	}, {
		key: "handleChange",
		value: function handleChange(input) {
			if (input) {
				var inputVal = input.value;
				this.setState({
					currentValue: inputVal
				});
				this.getCoordinates(inputVal);
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
				_reactivebase.AppbaseSensorHelper.URLParams.update(this.props.componentId, null, this.props.URLParams);
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
		}
	}, {
		key: "loadOptions",
		value: function loadOptions(input, callback) {
			var _this7 = this;

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
						_this7.result.options.push({
							label: place.description,
							value: place.description
						});
					});
					if (_this7.state.userLocation.length && _this7.result.options[0].label !== "Use my current location") {
						_this7.result.options.unshift({
							label: "Use my current location",
							value: _this7.state.userLocation
						});
					}
					_this7.callback(null, _this7.result);
				});
			} else {
				this.callback(null, this.result);
			}
		}
	}, {
		key: "handleDistanceChange",
		value: function handleDistanceChange(input) {
			this.setState({
				selected: {
					start: input.start,
					end: input.end,
					label: input.label
				}
			}, this.executeQuery.bind(this));
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
			var title = null;

			if (this.props.title) {
				title = _react2.default.createElement(
					"h4",
					{ className: "rbc-title" },
					this.props.title
				);
			}

			var cx = (0, _classnames2.default)({
				"rbc-title-active": this.props.title,
				"rbc-title-inactive": !this.props.title,
				"rbc-placeholder-active": this.props.placeholder,
				"rbc-placeholder-inactive": !this.props.placeholder
			});

			return _react2.default.createElement(
				"div",
				{ className: "rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.componentStyle },
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
						{ className: "col s12 col-xs-12" },
						_react2.default.createElement(_reactSelect2.default, {
							value: this.state.selected && this.state.selected.label ? this.state.selected : "",
							options: this.props.data,
							clearable: false,
							searchable: false,
							onChange: this.handleDistanceChange,
							placeholder: this.props.placeholderDropdown
						})
					)
				)
			);
		}
	}]);

	return GeoDistanceDropdown;
}(_react.Component);

exports.default = GeoDistanceDropdown;


GeoDistanceDropdown.propTypes = {
	componentId: _react2.default.PropTypes.string.isRequired,
	appbaseField: _react2.default.PropTypes.string.isRequired,
	title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	customQuery: _react2.default.PropTypes.func,
	defaultSelected: _react2.default.PropTypes.shape({
		label: _react2.default.PropTypes.string,
		location: _react2.default.PropTypes.string
	}),
	placeholder: _react2.default.PropTypes.string,
	placeholderDropdown: _react2.default.PropTypes.string,
	autoLocation: _react2.default.PropTypes.bool,
	unit: _react2.default.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		start: _reactivebase.AppbaseSensorHelper.validateThreshold,
		end: _reactivebase.AppbaseSensorHelper.validateThreshold,
		label: _react2.default.PropTypes.string.isRequired
	})),
	onValueChange: _react2.default.PropTypes.func,
	componentStyle: _react2.default.PropTypes.object,
	URLParams: _react2.default.PropTypes.bool,
	allowFilter: _react2.default.PropTypes.bool
};

// Default props value
GeoDistanceDropdown.defaultProps = {
	unit: "mi",
	placeholder: "Search...",
	placeholderDropdown: "Select Distance",
	autoLocation: true,
	componentStyle: {},
	URLParams: false,
	allowFilter: true
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};

GeoDistanceDropdown.types = {
	componentId: _reactivebase.TYPES.STRING,
	appbaseField: _reactivebase.TYPES.STRING,
	appbaseFieldType: _reactivebase.TYPES.GEO_POINT,
	title: _reactivebase.TYPES.STRING,
	data: _reactivebase.TYPES.ARRAY,
	unit: _reactivebase.TYPES.STRING,
	autoLocation: _reactivebase.TYPES.BOOLEAN,
	defaultSelected: _reactivebase.TYPES.OBJECT,
	placeholder: _reactivebase.TYPES.STRING,
	placeholderDropdown: _reactivebase.TYPES.STRING,
	customQuery: _reactivebase.TYPES.FUNCTION,
	componentStyle: _reactivebase.TYPES.OBJECT,
	URLParams: _reactivebase.TYPES.BOOLEAN,
	allowFilter: _reactivebase.TYPES.BOOLEAN
};