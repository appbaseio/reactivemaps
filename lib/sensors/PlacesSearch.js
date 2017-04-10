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

var PlacesSearch = function (_Component) {
	_inherits(PlacesSearch, _Component);

	function PlacesSearch(props) {
		_classCallCheck(this, PlacesSearch);

		var _this = _possibleConstructorReturn(this, (PlacesSearch.__proto__ || Object.getPrototypeOf(PlacesSearch)).call(this, props));

		_this.state = {
			currentValue: "",
			currentDistance: 0,
			value: 0
		};
		_this.type = "match";
		_this.locString = "";
		_this.result = {
			options: []
		};
		_this.queryInfo = {
			type: "geo_distance",
			unit: "mi",
			start: 0,
			end: 10
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.loadOptions = _this.loadOptions.bind(_this);
		_this.handleValuesChange = _this.handleValuesChange.bind(_this);
		_this.handleResults = _this.handleResults.bind(_this);
		_this.customQuery = _this.customQuery.bind(_this);
		return _this;
	}

	_createClass(PlacesSearch, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.googleMaps = window.google.maps;
		}

		// Set query information

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setQueryInfo();
			if (this.props.autoLocation) {
				this.getUserLocation();
			}
		}
	}, {
		key: "getUserLocation",
		value: function getUserLocation() {
			var _this2 = this;

			navigator.geolocation.getCurrentPosition(function (location) {
				_this2.locString = location.coords.latitude + ", " + location.coords.longitude;
				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this2.locString).then(function (res) {
					var currentValue = res.data.results[0].formatted_address;
					_this2.result.options.push({
						value: currentValue,
						label: currentValue
					});
					_this2.setState({
						currentValue: currentValue
					}, _this2.executeQuery.bind(_this2));
				});
			});
		}

		// set the query type and input data

	}, {
		key: "setQueryInfo",
		value: function setQueryInfo() {
			var obj = {
				key: this.props.componentId,
				value: {
					queryType: this.type,
					inputData: this.props.appbaseField,
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
			if (value && value.location) {
				var _queryInfo$type;

				query = _defineProperty({}, this.queryInfo.type, (_queryInfo$type = {}, _defineProperty(_queryInfo$type, this.props.appbaseField, this.parseValue(value.location)), _defineProperty(_queryInfo$type, "distance", this.queryInfo.end + this.queryInfo.unit), _queryInfo$type));
			}
			return query;
		}
	}, {
		key: "parseValue",
		value: function parseValue(location) {
			location = location.split(',');
			return {
				lat: Number(location[0]),
				lon: Number(location[1])
			};
		}

		// get coordinates

	}, {
		key: "getCoordinates",
		value: function getCoordinates(value) {
			var _this3 = this;

			if (value && value !== "") {
				_axios2.default.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
					var location = res.data.results[0].geometry.location;
					_this3.locString = location.lat + ", " + location.lng;
					_this3.executeQuery();
				});
			} else {
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(null, true);
			}
		}

		// execute query after changing location or distanc

	}, {
		key: "executeQuery",
		value: function executeQuery() {
			if (this.state.currentValue !== "" && this.locString) {
				var obj = {
					key: this.props.componentId,
					value: {
						currentValue: this.state.currentValue,
						location: this.locString
					}
				};
				if (this.props.onValueChange) {
					this.props.onValueChange(obj.value);
				}
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
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
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
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
		value: function handleResults(component, value) {
			value += this.props.unit;
			this.setState({
				currentDistance: value
			}, this.executeQuery.bind(this));
		}
	}, {
		key: "loadOptions",
		value: function loadOptions(input, callback) {
			var _this4 = this;

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
					res.map(function (place) {
						_this4.result.options.push({
							value: place.description,
							label: place.description
						});
					});
					_this4.callback(null, _this4.result);
				});
			} else {
				this.callback(null, this.result);
			}
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
				{ className: "rbc rbc-placessearch clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.componentStyle },
				_react2.default.createElement(
					"div",
					{ className: "row" },
					title,
					_react2.default.createElement(
						"div",
						{ className: "col s12 col-xs-12" },
						_react2.default.createElement(_reactSelect2.default.Async, {
							value: this.state.currentValue,
							loadOptions: this.loadOptions,
							placeholder: this.props.placeholder,
							onChange: this.handleChange
						})
					)
				)
			);
		}
	}]);

	return PlacesSearch;
}(_react.Component);

exports.default = PlacesSearch;


PlacesSearch.propTypes = {
	componentId: _react2.default.PropTypes.string.isRequired,
	appbaseField: _react2.default.PropTypes.string.isRequired,
	title: _react2.default.PropTypes.string,
	customQuery: _react2.default.PropTypes.func,
	placeholder: _react2.default.PropTypes.string,
	autoLocation: _react2.default.PropTypes.bool,
	onValueChange: _react2.default.PropTypes.func,
	componentStyle: _react2.default.PropTypes.object,
	unit: _react2.default.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"])
};
// Default props value
PlacesSearch.defaultProps = {
	placeholder: "Search..",
	autoLocation: true,
	componentStyle: {}
};

// context type
PlacesSearch.contextTypes = {
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};