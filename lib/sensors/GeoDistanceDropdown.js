import _isEqual from "lodash/isEqual";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TYPES, AppbaseSensorHelper as helper } from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Select from "react-select";

var GeoDistanceDropdown = function (_Component) {
	_inherits(GeoDistanceDropdown, _Component);

	function GeoDistanceDropdown(props) {
		_classCallCheck(this, GeoDistanceDropdown);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			selected: {},
			currentValue: null,
			userLocation: null
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
		_this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId, false, true) : null;
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

	// Set query information


	GeoDistanceDropdown.prototype.componentWillMount = function componentWillMount() {
		this.previousQuery = null; // initial value for onQueryChange
		this.googleMaps = window.google.maps;
		this.unit = this.props.unit;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
		this.listenFilter();
	};

	GeoDistanceDropdown.prototype.componentWillUpdate = function componentWillUpdate() {
		var _this2 = this;

		var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		if (!_isEqual(this.defaultSelected, defaultValue)) {
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
	};

	// stop streaming request and remove listener when component will unmount


	GeoDistanceDropdown.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.filterListener) {
			this.filterListener.remove();
		}
	};

	GeoDistanceDropdown.prototype.listenFilter = function listenFilter() {
		var _this3 = this;

		this.filterListener = helper.sensorEmitter.addListener("clearFilter", function (data) {
			if (data === _this3.props.componentId) {
				_this3.defaultValue = null;
				_this3.changeValue(_this3.defaultValue);
			}
		});
	};

	GeoDistanceDropdown.prototype.checkDefault = function checkDefault() {
		this.urlParams = this.props.URLParams ? helper.URLParams.get(this.props.componentId, false, true) : null;
		var defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		this.changeValue(defaultValue);
	};

	GeoDistanceDropdown.prototype.changeValue = function changeValue(defaultValue) {
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
		} else if (defaultValue && defaultValue.label) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(defaultValue.label);
		} else if (defaultValue === null) {
			this.setState({
				selected: null,
				currentValue: null
			}, this.executeQuery);
		} else {
			this.getUserLocation(this.setDefaultLocation);
		}
	};

	GeoDistanceDropdown.prototype.handleResults = function handleResults(distance) {
		var selected = this.props.data.filter(function (item) {
			return item.label === distance;
		});
		if (selected[0]) {
			this.setState({
				selected: selected[0]
			}, this.executeQuery);
		}
	};

	GeoDistanceDropdown.prototype.getUserLocation = function getUserLocation(cb) {
		var _this4 = this;

		navigator.geolocation.getCurrentPosition(function (location) {
			_this4.locString = location.coords.latitude + ", " + location.coords.longitude;

			axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _this4.locString).then(function (res) {
				if (Array.isArray(res.data.results) && res.data.results.length) {
					var userLocation = res.data.results[0].formatted_address;
					_this4.setState({
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

	GeoDistanceDropdown.prototype.setDefaultLocation = function setDefaultLocation() {
		var _this5 = this;

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
				_this5.executeQuery();
			});
		}
	};

	// set the query type and input data


	GeoDistanceDropdown.prototype.setQueryInfo = function setQueryInfo() {
		var _this6 = this;

		var getQuery = function getQuery(value) {
			var currentQuery = _this6.props.customQuery ? _this6.props.customQuery(value) : _this6.customQuery(value);
			if (_this6.props.onQueryChange && JSON.stringify(_this6.previousQuery) !== JSON.stringify(currentQuery)) {
				_this6.props.onQueryChange(_this6.previousQuery, currentQuery);
			}
			_this6.previousQuery = currentQuery;
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
				component: "GeoDistanceDropdown",
				defaultSelected: this.urlParams !== null ? this.urlParams : this.props.defaultSelected
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	};

	// build query for this sensor only


	GeoDistanceDropdown.prototype.customQuery = function customQuery(value) {
		var query = null;
		if (value && value.start >= 0 && value.end >= 0 && value.location !== "") {
			var _type, _query;

			query = (_query = {}, _query[this.type] = (_type = {}, _type[this.props.dataField] = value.location, _type.from = value.start + this.unit, _type.to = value.end + this.unit, _type), _query);
		}
		return query;
	};

	// get coordinates


	GeoDistanceDropdown.prototype.getCoordinates = function getCoordinates(value, cb) {
		var _this7 = this;

		if (value && value !== "") {
			axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
				if (Array.isArray(res.data.results) && res.data.results.length) {
					var location = res.data.results[0].geometry.location;
					_this7.locString = location.lat + ", " + location.lng;
					if (cb) {
						cb.call(_this7, _this7.defaultSelected.label);
					} else {
						_this7.executeQuery();
					}
				}
			});
		} else {
			helper.selectedSensor.set(null, true);
		}
	};

	// execute query after changing location or distance


	GeoDistanceDropdown.prototype.executeQuery = function executeQuery() {
		var _this8 = this;

		if (this.state.currentValue && this.state.selected && this.locString) {
			var _sortInfo$type, _value;

			var obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue.value,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString,
					unit: this.unit
				}
			};

			var sortObj = {
				key: this.props.componentId,
				value: (_value = {}, _value[this.sortInfo.type] = (_sortInfo$type = {}, _sortInfo$type[this.props.dataField] = this.locString, _sortInfo$type.order = this.sortInfo.order, _sortInfo$type.unit = this.unit, _sortInfo$type), _value)
			};

			var execQuery = function execQuery() {
				if (_this8.props.onValueChange) {
					_this8.props.onValueChange({
						input: _this8.state.currentValue.value,
						start: _this8.state.selected.start,
						end: _this8.state.selected.end,
						location: _this8.locString,
						unit: _this8.unit
					});
				}
				helper.selectedSensor.setSortInfo(sortObj);
				if (_this8.props.URLParams) {
					helper.URLParams.update(_this8.props.componentId, _this8.setURLValue(), _this8.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: this.state.currentValue,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString,
					unit: this.unit
				}).then(function () {
					execQuery();
				}).catch(function (e) {
					console.warn(_this8.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execQuery();
			}
		} else if (!this.state.selected && !this.state.currentValue) {
			var execNullQuery = function execNullQuery() {
				var obj = {
					key: _this8.props.componentId,
					value: null
				};
				if (_this8.props.onValueChange) {
					_this8.props.onValueChange(null);
				}
				if (_this8.props.URLParams) {
					helper.URLParams.update(_this8.props.componentId, null, _this8.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange(null).then(function () {
					execNullQuery();
				}).catch(function (e) {
					console.warn(_this8.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execNullQuery();
			}
		}
	};

	GeoDistanceDropdown.prototype.setURLValue = function setURLValue() {
		return JSON.stringify({
			location: this.state.currentValue.value,
			label: this.state.selected.label
		});
	};

	// handle the input change and pass the value inside sensor info


	GeoDistanceDropdown.prototype.handleChange = function handleChange(input) {
		var _this9 = this;

		if (input) {
			this.setState({
				currentValue: input
			});
			this.getCoordinates(input.value);
		} else {
			this.setState({
				currentValue: null
			});
			var obj = {
				key: this.props.componentId,
				value: null
			};

			var execQuery = function execQuery() {
				if (_this9.props.onValueChange) {
					_this9.props.onValueChange({
						input: null,
						start: _this9.state.selected.start,
						end: _this9.state.selected.end,
						location: null,
						unit: _this9.unit
					});
				}
				if (_this9.props.URLParams) {
					helper.URLParams.update(_this9.props.componentId, null, _this9.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: null,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: null,
					unit: this.unit
				}).then(function () {
					execQuery();
				}).catch(function (e) {
					console.warn(_this9.props.componentId + " - beforeValueChange rejected the promise with", e);
				});
			} else {
				execQuery();
			}
		}
	};

	GeoDistanceDropdown.prototype.loadOptions = function loadOptions(input, callback) {
		var _this10 = this;

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
					_this10.result.options.push({
						label: place.description,
						value: place.description
					});
				});
				if (_this10.state.userLocation && _this10.state.userLocation.length && _this10.result.options[0].label !== "Use my current location") {
					_this10.result.options.unshift({
						label: "Use my current location",
						value: _this10.state.userLocation
					});
				}
				_this10.callback(null, _this10.result);
			});
		} else {
			this.callback(null, this.result);
		}
	};

	GeoDistanceDropdown.prototype.handleDistanceChange = function handleDistanceChange(input) {
		this.setState({
			selected: {
				start: input.start,
				end: input.end,
				label: input.label
			}
		}, this.executeQuery.bind(this));
	};

	GeoDistanceDropdown.prototype.renderValue = function renderValue(option) {
		return React.createElement(
			"span",
			null,
			option.value
		);
	};

	// render


	GeoDistanceDropdown.prototype.render = function render() {
		var title = null;

		if (this.props.title) {
			title = React.createElement(
				"h4",
				{ className: "rbc-title" },
				this.props.title
			);
		}

		var data = this.props.data.map(function (item) {
			item.value = item.label;
			return item;
		});

		var cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder
		}, this.props.className);

		return React.createElement(
			"div",
			{ className: "rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.style },
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
					{ className: "col s12 col-xs-12" },
					React.createElement(Select, {
						name: "distance",
						placeholder: this.props.placeholderDropdown,
						value: this.state.selected && this.state.selected.label ? this.state.selected : "",
						options: data,
						onChange: this.handleDistanceChange,
						clearable: false,
						searchable: false
					})
				)
			)
		);
	};

	return GeoDistanceDropdown;
}(Component);

export default GeoDistanceDropdown;


GeoDistanceDropdown.propTypes = {
	componentId: PropTypes.string.isRequired,
	dataField: PropTypes.string.isRequired,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	customQuery: PropTypes.func,
	defaultSelected: PropTypes.shape({
		label: PropTypes.string,
		location: PropTypes.string
	}),
	placeholder: PropTypes.string,
	placeholderDropdown: PropTypes.string,
	autoLocation: PropTypes.bool,
	unit: PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	data: PropTypes.arrayOf(PropTypes.shape({
		start: helper.validateThreshold,
		end: helper.validateThreshold,
		label: PropTypes.string.isRequired
	})),
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
GeoDistanceDropdown.defaultProps = {
	unit: "mi",
	placeholder: "Search...",
	placeholderDropdown: "Select Distance",
	autoLocation: true,
	style: {},
	URLParams: false,
	showFilter: true
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired,
	reactiveId: PropTypes.number
};

GeoDistanceDropdown.types = {
	componentId: TYPES.STRING,
	dataField: TYPES.STRING,
	dataFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	data: TYPES.ARRAY,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	placeholderDropdown: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	beforeValueChange: TYPES.FUNCTION,
	onValueChange: TYPES.FUNCTION,
	style: TYPES.OBJECT,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING,
	className: TYPES.STRING,
	onQueryChange: TYPES.FUNCTION
};