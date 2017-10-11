function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TYPES, AppbaseSensorHelper as helper } from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Select from "react-select";

var PlacesSearch = function (_Component) {
	_inherits(PlacesSearch, _Component);

	function PlacesSearch(props) {
		_classCallCheck(this, PlacesSearch);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			userLocation: "",
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
		_this.setDefaultLocation = _this.setDefaultLocation.bind(_this);
		_this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId) : null;
		return _this;
	}

	PlacesSearch.prototype.componentWillMount = function componentWillMount() {
		this.previousQuery = null; // initial value for onQueryChange
		this.googleMaps = window.google.maps;
		this.setQueryInfo();
		this.getUserLocation(this.setDefaultLocation);
		this.checkDefault(this.props);
		this.listenFilter();
	};

	PlacesSearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		this.checkDefault(nextProps);
	};

	PlacesSearch.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.filterListener) {
			this.filterListener.remove();
		}
	};

	PlacesSearch.prototype.listenFilter = function listenFilter() {
		var _this2 = this;

		this.filterListener = helper.sensorEmitter.addListener("clearFilter", function (data) {
			if (data === _this2.props.componentId) {
				_this2.defaultValue = null;
				_this2.changeValue(_this2.defaultValue);
			}
		});
	};

	PlacesSearch.prototype.getUserLocation = function getUserLocation(cb) {
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

	PlacesSearch.prototype.checkDefault = function checkDefault(props) {
		this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId) : null;
		this.defaultValue = this.urlParams !== null ? this.urlParams : props.defaultSelected;
		this.changeValue(this.defaultValue);
	};

	PlacesSearch.prototype.changeValue = function changeValue(defaultValue) {
		var _this4 = this;

		if (this.defaultSelected !== defaultValue) {
			this.defaultSelected = defaultValue;
			if (this.defaultSelected !== null) {
				var isExists = this.result.options.length ? this.result.options.every(function (item) {
					return item.value !== _this4.defaultSelected && item.label !== _this4.defaultSelected;
				}) : false;

				if (!isExists) {
					this.result.options.push({
						value: this.defaultSelected,
						label: this.defaultSelected
					});
				}
			}
			this.handleChange({
				value: this.defaultSelected
			});
		}
	};

	PlacesSearch.prototype.setDefaultLocation = function setDefaultLocation() {
		var _this5 = this;

		this.result.options.push({
			value: this.state.userLocation,
			label: "Use my current location"
		});
		if (this.props.autoLocation && !this.props.URLParams) {
			this.setState({
				currentValue: this.state.userLocation
			}, function () {
				_this5.executeQuery();
			});
		}
	};

	// set the query type and input data


	PlacesSearch.prototype.setQueryInfo = function setQueryInfo() {
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
				inputData: this.props.dataField,
				customQuery: getQuery,
				reactiveId: this.context.reactiveId,
				showFilter: this.props.showFilter,
				filterLabel: this.props.filterLabel ? this.props.filterLabel : this.props.componentId,
				component: "PlacesSearch",
				defaultSelected: this.urlParams !== null ? this.urlParams : this.props.defaultSelected
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	};

	// build query for this sensor only


	PlacesSearch.prototype.customQuery = function customQuery(value) {
		var query = null;
		if (value && value.location) {
			var _queryInfo$type, _query;

			query = (_query = {}, _query[this.queryInfo.type] = (_queryInfo$type = {}, _queryInfo$type[this.props.dataField] = this.parseValue(value.location), _queryInfo$type.distance = this.queryInfo.end + this.queryInfo.unit, _queryInfo$type), _query);
		}
		return query;
	};

	PlacesSearch.prototype.parseValue = function parseValue(location) {
		location = location.split(",");
		return {
			lat: Number(location[0]),
			lon: Number(location[1])
		};
	};

	// get coordinates


	PlacesSearch.prototype.getCoordinates = function getCoordinates(value) {
		var _this7 = this;

		if (value && value !== "") {
			axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
				var location = res.data.results[0].geometry.location;
				_this7.locString = location.lat + ", " + location.lng;
				_this7.executeQuery();
			});
		} else {
			helper.selectedSensor.set(null, true);
		}
	};

	// execute query after changing location or distanc


	PlacesSearch.prototype.executeQuery = function executeQuery() {
		var _this8 = this;

		if (this.state.currentValue !== "" && this.locString) {
			var obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					location: this.locString
				}
			};

			var execQuery = function execQuery() {
				if (_this8.props.onValueChange) {
					_this8.props.onValueChange({
						input: _this8.state.currentValue,
						location: _this8.locString,
						unit: _this8.props.unit
					});
				}
				if (_this8.props.URLParams) {
					helper.URLParams.update(_this8.props.componentId, _this8.state.currentValue, _this8.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: this.state.currentValue,
					location: this.locString,
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

	// handle the input change and pass the value inside sensor info


	PlacesSearch.prototype.handleChange = function handleChange(input) {
		var _this9 = this;

		if (input && input.value) {
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
			var execQuery = function execQuery() {
				if (_this9.props.onValueChange) {
					_this9.props.onValueChange({
						input: null,
						location: null,
						unit: _this9.props.unit
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
					location: null,
					unit: this.props.unit
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

	// Handle function when value slider option is changing


	PlacesSearch.prototype.handleValuesChange = function handleValuesChange(component, value) {
		this.setState({
			value: value
		});
	};

	// Handle function when slider option change is completed


	PlacesSearch.prototype.handleResults = function handleResults(component, value) {
		value += this.props.unit;
		this.setState({
			currentDistance: value
		}, this.executeQuery.bind(this));
	};

	PlacesSearch.prototype.loadOptions = function loadOptions(input, callback) {
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
						value: place.description,
						label: place.description
					});
				});
				if (_this10.state.userLocation.length && _this10.result.options[0].label !== "Use my current location") {
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

	PlacesSearch.prototype.renderValue = function renderValue(option) {
		return React.createElement(
			"span",
			null,
			option.value
		);
	};

	// render


	PlacesSearch.prototype.render = function render() {
		var title = null;
		if (this.props.title) {
			title = React.createElement(
				"h4",
				{ className: "rbc-title" },
				this.props.title
			);
		}

		var cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder
		}, this.props.className);

		return React.createElement(
			"div",
			{ className: "rbc rbc-placessearch clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.style },
			React.createElement(
				"div",
				{ className: "row" },
				title,
				React.createElement(
					"div",
					{ className: "col s12 col-xs-12" },
					React.createElement(Select.Async, {
						value: this.state.currentValue,
						loadOptions: this.loadOptions,
						placeholder: this.props.placeholder,
						onChange: this.handleChange,
						valueRenderer: this.renderValue
					})
				)
			)
		);
	};

	return PlacesSearch;
}(Component);

export default PlacesSearch;


PlacesSearch.propTypes = {
	componentId: PropTypes.string.isRequired,
	dataField: PropTypes.string.isRequired,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	customQuery: PropTypes.func,
	placeholder: PropTypes.string,
	autoLocation: PropTypes.bool,
	beforeValueChange: PropTypes.func,
	onValueChange: PropTypes.func,
	style: PropTypes.object,
	URLParams: PropTypes.bool,
	showFilter: PropTypes.bool,
	filterLabel: PropTypes.string,
	unit: PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	className: PropTypes.string,
	onQueryChange: PropTypes.func
};
// Default props value
PlacesSearch.defaultProps = {
	placeholder: "Search..",
	autoLocation: true,
	style: {},
	URLParams: false,
	showFilter: true,
	unit: "mi"
};

// context type
PlacesSearch.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired,
	reactiveId: PropTypes.number
};

PlacesSearch.types = {
	componentId: TYPES.STRING,
	dataField: TYPES.STRING,
	title: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	placeholder: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	style: TYPES.OBJECT,
	unit: TYPES.STRING,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING,
	className: TYPES.STRING,
	onQueryChange: TYPES.FUNCTION
};