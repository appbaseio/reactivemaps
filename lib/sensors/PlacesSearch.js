function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
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
		_this.urlParams = helper.URLParams.get(_this.props.componentId);
		return _this;
	}

	PlacesSearch.prototype.componentWillMount = function componentWillMount() {
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
		this.urlParams = helper.URLParams.get(props.componentId);
		this.defaultValue = this.urlParams !== null ? this.urlParams : props.defaultSelected;
		this.changeValue(this.defaultValue);
	};

	PlacesSearch.prototype.changeValue = function changeValue(defaultValue) {
		var _this4 = this;

		if (this.defaultSelected != defaultValue) {
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
		var obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				inputData: this.props.appbaseField,
				customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery,
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

			query = (_query = {}, _query[this.queryInfo.type] = (_queryInfo$type = {}, _queryInfo$type[this.props.appbaseField] = this.parseValue(value.location), _queryInfo$type.distance = this.queryInfo.end + this.queryInfo.unit, _queryInfo$type), _query);
		}
		return query;
	};

	PlacesSearch.prototype.parseValue = function parseValue(location) {
		location = location.split(',');
		return {
			lat: Number(location[0]),
			lon: Number(location[1])
		};
	};

	// get coordinates


	PlacesSearch.prototype.getCoordinates = function getCoordinates(value) {
		var _this6 = this;

		if (value && value !== "") {
			axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + value).then(function (res) {
				var location = res.data.results[0].geometry.location;
				_this6.locString = location.lat + ", " + location.lng;
				_this6.executeQuery();
			});
		} else {
			helper.selectedSensor.set(null, true);
		}
	};

	// execute query after changing location or distanc


	PlacesSearch.prototype.executeQuery = function executeQuery() {
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
			helper.URLParams.update(this.props.componentId, this.state.currentValue, this.props.URLParams);
			helper.selectedSensor.set(obj, true);
		}
	};

	// handle the input change and pass the value inside sensor info


	PlacesSearch.prototype.handleChange = function handleChange(input) {
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
			if (this.props.onValueChange) {
				this.props.onValueChange(obj.value);
			}
			helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
			helper.selectedSensor.set(obj, true);
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
				res.map(function (place) {
					_this7.result.options.push({
						value: place.description,
						label: place.description
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
		});

		return React.createElement(
			"div",
			{ className: "rbc rbc-placessearch clearfix card thumbnail col s12 col-xs-12 " + cx, style: this.props.componentStyle },
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
	componentId: React.PropTypes.string.isRequired,
	appbaseField: React.PropTypes.string.isRequired,
	title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
	customQuery: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	autoLocation: React.PropTypes.bool,
	onValueChange: React.PropTypes.func,
	componentStyle: React.PropTypes.object,
	URLParams: React.PropTypes.bool,
	showFilter: React.PropTypes.bool,
	filterLabel: React.PropTypes.string,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"])
};
// Default props value
PlacesSearch.defaultProps = {
	placeholder: "Search..",
	autoLocation: true,
	componentStyle: {},
	URLParams: false,
	showFilter: true
};

// context type
PlacesSearch.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired,
	reactiveId: React.PropTypes.number
};

PlacesSearch.types = {
	componentId: TYPES.STRING,
	appbaseField: TYPES.STRING,
	title: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	placeholder: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	componentStyle: TYPES.OBJECT,
	unit: TYPES.STRING,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING
};