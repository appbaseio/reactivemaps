import _isEqual from "lodash/isEqual";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint max-lines: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TYPES, AppbaseSensorHelper as helper } from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Slider from "rc-slider";
import Select from "react-select";

var GeoDistanceSlider = function (_Component) {
	_inherits(GeoDistanceSlider, _Component);

	function GeoDistanceSlider(props) {
		_classCallCheck(this, GeoDistanceSlider);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId, false, true) : null;
		_this.defaultSelected = _this.urlParams !== null ? _this.urlParams : _this.props.defaultSelected;
		var value = _this.defaultSelected && _this.defaultSelected.distance ? _this.defaultSelected.distance < _this.props.range.start ? _this.props.range.start : _this.defaultSelected.distance : _this.props.range.start;
		value = parseInt(value, 10);
		if (_this.defaultSelected) {
			_this.defaultSelected.distance = parseInt(_this.defaultSelected.distance, 10);
		}
		_this.state = {
			currentValue: null,
			currentDistance: value + _this.props.unit,
			userLocation: null,
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
		this.previousQuery = null; // initial value for onQueryChange
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
		this.urlParams = this.props.URLParams ? helper.URLParams.get(this.props.componentId, false, true) : null;
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
				currentValue: {
					value: currentValue,
					label: currentValue
				}
			}, this.getCoordinates(currentValue, this.handleResults));
		} else if (defaultValue && defaultValue.distance) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(defaultValue.distance);
		} else if (defaultValue === null) {
			this.setState({
				currentDistance: null,
				currentValue: null
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
				if (Array.isArray(res.data.results) && res.data.results.length) {
					var userLocation = res.data.results[0].formatted_address;
					_this3.setState({
						userLocation: userLocation
					});
				}
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
				currentValue: {
					value: this.state.userLocation,
					label: this.state.userLocation
				}
			}, function () {
				_this4.executeQuery();
			});
		}
	};

	// set the query type and input data


	GeoDistanceSlider.prototype.setQueryInfo = function setQueryInfo() {
		var _this5 = this;

		var getQuery = function getQuery(value) {
			var currentQuery = _this5.props.customQuery ? _this5.props.customQuery(value) : _this5.customQuery(value);
			if (_this5.props.onQueryChange && JSON.stringify(_this5.previousQuery) !== JSON.stringify(currentQuery)) {
				_this5.props.onQueryChange(_this5.previousQuery, currentQuery);
			}
			_this5.previousQuery = currentQuery;
			return currentQuery;
		};
		var obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				dataField: this.props.dataField,
				customQuery: getQuery,
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
		if (value && value.currentValue && value.location !== "") {
			var _type, _query;

			query = (_query = {}, _query[this.type] = (_type = {}, _type[this.props.dataField] = value.location, _type.distance = value.currentDistance, _type), _query);
		}
		return query;
	};

	// get coordinates


	GeoDistanceSlider.prototype.getCoordinates = function getCoordinates(value, cb) {
		var _this6 = this;

		if (value && value !== "") {
			axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
				if (Array.isArray(res.data.results) && res.data.results.length) {
					var location = res.data.results[0].geometry.location;
					_this6.locString = location.lat + ", " + location.lng;
					if (cb) {
						cb(_this6.defaultSelected.distance);
					} else {
						_this6.executeQuery();
					}
				}
			});
		} else {
			helper.selectedSensor.set(null, true);
		}
	};

	// execute query after changing location or distance


	GeoDistanceSlider.prototype.executeQuery = function executeQuery() {
		var _this7 = this;

		if (this.state.currentValue && this.state.currentDistance && this.locString) {
			var _sortInfo$type, _value;

			var obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue.value,
					currentDistance: this.state.currentDistance,
					location: this.locString
				}
			};

			var sortObj = {
				key: this.props.componentId,
				value: (_value = {}, _value[this.sortInfo.type] = (_sortInfo$type = {}, _sortInfo$type[this.props.dataField] = this.locString, _sortInfo$type.order = this.sortInfo.order, _sortInfo$type.unit = this.sortInfo.unit, _sortInfo$type), _value)
			};

			var execQuery = function execQuery() {
				if (_this7.props.onValueChange) {
					_this7.props.onValueChange({
						input: _this7.state.currentValue.value,
						distance: _this7.state.currentDistance,
						location: _this7.locString,
						unit: _this7.props.unit
					});
				}
				helper.selectedSensor.setSortInfo(sortObj);
				if (_this7.props.URLParams) {
					helper.URLParams.update(_this7.props.componentId, _this7.setURLValue(), _this7.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: this.state.currentValue.value,
					distance: this.state.currentDistance,
					location: this.locString,
					unit: this.props.unit
				}).then(function () {
					execQuery();
				}).catch(function (e) {
					console.warn(_this7.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execQuery();
			}
		} else if (!this.state.currentDistance && !this.state.currentValue) {
			var execNullQuery = function execNullQuery() {
				if (_this7.props.onValueChange) {
					_this7.props.onValueChange(null);
				}
				var obj = {
					key: _this7.props.componentId,
					value: null
				};
				if (_this7.props.URLParams) {
					helper.URLParams.update(_this7.props.componentId, null, _this7.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange(null).then(function () {
					execNullQuery();
				}).catch(function (e) {
					console.warn(_this7.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execNullQuery();
			}
		}
	};

	GeoDistanceSlider.prototype.setURLValue = function setURLValue() {
		var distance = this.state.currentDistance.split(this.props.unit);
		distance = distance[0];
		return JSON.stringify({
			location: this.state.currentValue.value,
			distance: distance
		});
	};

	// handle the input change and pass the value inside sensor info


	GeoDistanceSlider.prototype.handleChange = function handleChange(input, cb) {
		var _this8 = this;

		if (input) {
			this.setState({
				currentValue: input
			});
			this.getCoordinates(input.value, cb);
		} else {
			this.setState({
				currentValue: null
			});

			var obj = {
				key: this.props.componentId,
				value: null
			};

			var execQuery = function execQuery() {
				if (_this8.props.onValueChange) {
					_this8.props.onValueChange({
						input: null,
						distance: _this8.state.currentDistance,
						location: null,
						unit: _this8.props.unit
					});
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: null,
					distance: this.state.currentDistance,
					location: null,
					unit: this.props.unit
				}).then(function () {
					execQuery();
				}).catch(function (e) {
					console.warn(_this8.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execQuery();
			}
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
		var _this9 = this;

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
					_this9.result.options.push({
						label: place.description,
						value: place.description
					});
				});
				if (_this9.state.userLocation && _this9.state.userLocation.length && _this9.result.options[0].label !== "Use my current location") {
					_this9.result.options.unshift({
						label: "Use my current location",
						value: _this9.state.userLocation
					});
				}
				_this9.callback(null, _this9.result);
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
		}, this.props.className);

		return React.createElement(
			"div",
			{ className: "rbc rbc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.style },
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
						defaultValue: this.state.value,
						min: this.props.range.start,
						max: this.props.range.end,
						onAfterChange: this.handleResults,
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
	componentId: PropTypes.string.isRequired,
	dataField: PropTypes.string.isRequired,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	customQuery: PropTypes.func,
	defaultSelected: PropTypes.shape({
		distance: PropTypes.number,
		location: PropTypes.string
	}),
	placeholder: PropTypes.string,
	unit: PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	stepValue: helper.stepValidation,
	range: PropTypes.shape({
		start: helper.validateThreshold,
		end: helper.validateThreshold
	}),
	rangeLabels: PropTypes.shape({
		start: PropTypes.string,
		end: PropTypes.string
	}),
	autoLocation: PropTypes.bool,
	beforeValueChange: PropTypes.func,
	onValueChange: PropTypes.func,
	style: PropTypes.object,
	URLParams: PropTypes.bool,
	showFilter: PropTypes.bool,
	filterLabel: PropTypes.string,
	className: PropTypes.string,
	onQueryChange: PropTypes.func
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
	style: {},
	URLParams: false,
	showFilter: true
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired,
	reactiveId: PropTypes.number
};

GeoDistanceSlider.types = {
	componentId: TYPES.STRING,
	dataField: TYPES.STRING,
	dataFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	range: TYPES.OBJECT,
	rangeLabels: TYPES.OBJECT,
	stepValue: TYPES.NUMBER,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	style: TYPES.OBJECT,
	beforeValueChange: TYPES.FUNCTION,
	onValueChange: TYPES.FUNCTION,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING,
	className: TYPES.STRING,
	onQueryChange: TYPES.FUNCTION
};