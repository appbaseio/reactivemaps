import _isEqual from "lodash/isEqual";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint max-lines: 0 */
import React, { Component } from "react";
import { TYPES, AppbaseSensorHelper as helper, AppbaseChannelManager as manager } from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Slider from "rc-slider";
import Select from "react-select";

var GeoDistanceSlider = function (_Component) {
	_inherits(GeoDistanceSlider, _Component);

	function GeoDistanceSlider(props) {
		_classCallCheck(this, GeoDistanceSlider);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.urlParams = helper.URLParams.get(_this.props.componentId, false, true);
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

	// Set query information


	GeoDistanceSlider.prototype.componentWillMount = function componentWillMount() {
		this.googleMaps = window.google.maps;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
		this.listenFilter();
	};

	GeoDistanceSlider.prototype.componentWillUpdate = function componentWillUpdate() {
		if (!_isEqual(this.defaultSelected, this.defaultSelected)) {
			this.defaultSelected = this.defaultSelected;
			this.checkDefault();
		}
	};

	GeoDistanceSlider.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.filterListener) {
			this.filterListener.remove();
		}
	};

	GeoDistanceSlider.prototype.listenFilter = function listenFilter() {
		var _this2 = this;

		this.filterListener = helper.sensorEmitter.addListener("clearFilter", function (data) {
			if (data === _this2.props.componentId) {
				_this2.defaultValue = null;
				_this2.changeValue(_this2.defaultValue);
			}
		});
	};

	GeoDistanceSlider.prototype.checkDefault = function checkDefault() {
		this.urlParams = helper.URLParams.get(this.props.componentId, false, true);
		var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		this.changeValue(defaultValue);
	};

	GeoDistanceSlider.prototype.changeValue = function changeValue(defaultValue) {
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
		} else if (defaultValue === null) {
			this.setState({
				currentDistance: null,
				currentValue: ""
			}, this.executeQuery);
		} else {
			this.getUserLocation(this.setDefaultLocation);
		}
	};

	GeoDistanceSlider.prototype.getUserLocation = function getUserLocation(cb) {
		var _this3 = this;

		navigator.geolocation.getCurrentPosition(function (location) {
			_this3.locString = location.coords.latitude + ", " + location.coords.longitude;

			axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this3.locString).then(function (res) {
				var userLocation = res.data.results[0].formatted_address;
				_this3.setState({
					userLocation: userLocation
				});
			}).then(function () {
				if (cb) {
					cb();
				}
			});
		});
	};

	GeoDistanceSlider.prototype.setDefaultLocation = function setDefaultLocation() {
		var _this4 = this;

		this.result.options.push({
			value: this.state.userLocation,
			label: "Use my current location"
		});
		if (this.props.autoLocation) {
			this.setState({
				currentValue: this.state.userLocation
			}, function () {
				_this4.executeQuery();
			});
		}
	};

	// set the query type and input data


	GeoDistanceSlider.prototype.setQueryInfo = function setQueryInfo() {
		var obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				appbaseField: this.props.appbaseField,
				customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery,
				reactiveId: this.context.reactiveId,
				showFilter: this.props.showFilter,
				filterLabel: this.props.filterLabel ? this.props.filterLabel : this.props.componentId,
				component: "GeoDistanceSlider",
				defaultSelected: this.urlParams !== null ? this.urlParams : this.props.defaultSelected
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	};

	// build query for this sensor only


	GeoDistanceSlider.prototype.customQuery = function customQuery(value) {
		var query = null;
		if (value && value.currentValue !== "" && value.location !== "") {
			var _type, _query;

			query = (_query = {}, _query[this.type] = (_type = {}, _type[this.props.appbaseField] = value.location, _type.distance = value.currentDistance, _type), _query);
		}
		return query;
	};

	// get coordinates


	GeoDistanceSlider.prototype.getCoordinates = function getCoordinates(value, cb) {
		var _this5 = this;

		if (value && value !== "") {
			axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
				var location = res.data.results[0].geometry.location;
				_this5.locString = location.lat + ", " + location.lng;
				if (cb) {
					cb(_this5.defaultSelected.distance);
				} else {
					_this5.executeQuery();
				}
			});
		} else {
			helper.selectedSensor.set(null, true);
		}
	};

	// execute query after changing location or distance


	GeoDistanceSlider.prototype.executeQuery = function executeQuery() {
		if (this.state.currentValue !== "" && this.state.currentDistance && this.locString) {
			var _sortInfo$type, _value;

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
				value: (_value = {}, _value[this.sortInfo.type] = (_sortInfo$type = {}, _sortInfo$type[this.props.appbaseField] = this.locString, _sortInfo$type.order = this.sortInfo.order, _sortInfo$type.unit = this.sortInfo.unit, _sortInfo$type), _value)
			};
			if (this.props.onValueChange) {
				this.props.onValueChange(obj.value);
			}
			helper.selectedSensor.setSortInfo(sortObj);
			helper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
			helper.selectedSensor.set(obj, true);
		} else if (this.state.currentDistance === null && this.state.currentValue === "") {
			var _obj = {
				key: this.props.componentId,
				value: null
			};
			helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
			helper.selectedSensor.set(_obj, true);
		}
	};

	GeoDistanceSlider.prototype.setURLValue = function setURLValue() {
		var distance = this.state.currentDistance.split(this.props.unit);
		distance = distance[0];
		return JSON.stringify({
			location: this.state.currentValue,
			distance: distance
		});
	};

	// handle the input change and pass the value inside sensor info


	GeoDistanceSlider.prototype.handleChange = function handleChange(input, cb) {
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
			helper.selectedSensor.set(obj, true);
		}
	};

	GeoDistanceSlider.prototype.unitFormatter = function unitFormatter(v) {
		return v + " " + this.props.unit;
	};

	// Handle function when value slider option is changing


	GeoDistanceSlider.prototype.handleValuesChange = function handleValuesChange(component, value) {
		this.setState({
			value: value
		});
	};

	// Handle function when slider option change is completed


	GeoDistanceSlider.prototype.handleResults = function handleResults(value) {
		var distValue = value + this.props.unit;
		this.setState({
			value: value,
			currentDistance: distValue
		}, this.executeQuery.bind(this));
	};

	GeoDistanceSlider.prototype.loadOptions = function loadOptions(input, callback) {
		var _this6 = this;

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
					_this6.result.options.push({
						label: place.description,
						value: place.description
					});
				});
				if (_this6.state.userLocation.length && _this6.result.options[0].label !== "Use my current location") {
					_this6.result.options.unshift({
						label: "Use my current location",
						value: _this6.state.userLocation
					});
				}
				_this6.callback(null, _this6.result);
			});
		} else {
			this.callback(null, this.result);
		}
	};

	GeoDistanceSlider.prototype.renderValue = function renderValue(option) {
		return React.createElement(
			"span",
			null,
			option.value
		);
	};

	// render


	GeoDistanceSlider.prototype.render = function render() {
		var title = null,
		    marks = {};

		if (this.props.title) {
			title = React.createElement(
				"h4",
				{ className: "rbc-title" },
				this.props.title
			);
		}

		if (this.props.rangeLabels.start || this.props.rangeLabels.end) {
			var _marks;

			marks = (_marks = {}, _marks[this.props.range.start] = this.props.rangeLabels.start, _marks[this.props.range.end] = this.props.rangeLabels.end, _marks);
		}

		var cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder,
			"rbc-labels-active": this.props.rangeLabels.start || this.props.rangeLabels.end,
			"rbc-labels-inactive": !this.props.rangeLabels.start && !this.props.rangeLabels.end
		});

		return React.createElement(
			"div",
			{ className: "rbc rbc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.componentStyle },
			React.createElement(
				"div",
				{ className: "row" },
				title,
				React.createElement(
					"div",
					{ className: "rbc-search-container col s12 col-xs-12" },
					React.createElement(Select.Async, {
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
				React.createElement(
					"div",
					{ className: "rbc-rangeslider-container col s12 col-xs-12" },
					React.createElement(Slider, {
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
	};

	return GeoDistanceSlider;
}(Component);

export default GeoDistanceSlider;


GeoDistanceSlider.propTypes = {
	componentId: React.PropTypes.string.isRequired,
	appbaseField: React.PropTypes.string.isRequired,
	title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
	customQuery: React.PropTypes.func,
	defaultSelected: React.PropTypes.shape({
		distance: React.PropTypes.number,
		location: React.PropTypes.string
	}),
	placeholder: React.PropTypes.string,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	stepValue: helper.stepValidation,
	range: React.PropTypes.shape({
		start: helper.validateThreshold,
		end: helper.validateThreshold
	}),
	rangeLabels: React.PropTypes.shape({
		start: React.PropTypes.string,
		end: React.PropTypes.string
	}),
	autoLocation: React.PropTypes.bool,
	onValueChange: React.PropTypes.func,
	componentStyle: React.PropTypes.object,
	URLParams: React.PropTypes.bool,
	showFilter: React.PropTypes.bool,
	filterLabel: React.PropTypes.string
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
	URLParams: false,
	showFilter: true
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired,
	reactiveId: React.PropTypes.number
};

GeoDistanceSlider.types = {
	componentId: TYPES.STRING,
	appbaseField: TYPES.STRING,
	appbaseFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	range: TYPES.OBJECT,
	rangeLabels: TYPES.OBJECT,
	stepValue: TYPES.NUMBER,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	componentStyle: TYPES.OBJECT,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING
};