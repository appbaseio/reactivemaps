'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GeoDistanceDropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactivebase = require('@appbaseio/reactivebase');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeoDistanceDropdown = exports.GeoDistanceDropdown = function (_Component) {
	_inherits(GeoDistanceDropdown, _Component);

	function GeoDistanceDropdown(props, context) {
		_classCallCheck(this, GeoDistanceDropdown);

		var _this = _possibleConstructorReturn(this, (GeoDistanceDropdown.__proto__ || Object.getPrototypeOf(GeoDistanceDropdown)).call(this, props));

		_this.state = {
			selected: {},
			currentValue: '',
			userLocation: ''
		};
		_this.type = 'geo_distance_range';
		_this.locString = '';
		_this.unit = _this.props.unit;
		_this.result = {
			options: []
		};
		_this.sortInfo = {
			type: '_geo_distance',
			order: 'asc',
			unit: _this.unit
		};
		_this.allowedUnit = ['mi', 'miles', 'yd', 'yards', 'ft', 'feet', 'in', 'inch', 'km', 'kilometers', 'm', 'meters', 'cm', 'centimeters', 'mm', 'millimeters', 'NM', 'nmi', 'nauticalmiles'];

		if (_this.props.defaultSelected) {
			var selected = _this.props.data.filter(function (item) {
				return item.label === _this.props.defaultSelected;
			});
			if (selected[0]) {
				_this.state.selected = selected[0];
			}
		}

		_this.handleChange = _this.handleChange.bind(_this);
		_this.loadOptions = _this.loadOptions.bind(_this);
		_this.customQuery = _this.customQuery.bind(_this);
		_this.handleDistanceChange = _this.handleDistanceChange.bind(_this);
		_this.renderValue = _this.renderValue.bind(_this);
		return _this;
	}

	_createClass(GeoDistanceDropdown, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.googleMaps = window.google.maps;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			setTimeout(function () {
				if (nextProps.defaultSelected != _this2.props.defaultSelected) {
					var selected = nextProps.data.filter(function (item) {
						return item.label === _this2.props.defaultSelected;
					});
					if (selected[0]) {
						_this2.setState({
							selected: selected[0]
						}, _this2.executeQuery);
					}
				}
				if (nextProps.unit != _this2.unit) {
					var _selected = _this2.allowedUnit.filter(function (item) {
						return item === nextProps.unit;
					});
					if (_selected[0]) {
						_this2.unit = nextProps.unit;
						_this2.executeQuery();
					}
				}
			}, 300);
		}

		// Set query information

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setQueryInfo();
			this.getUserLocation();
		}
	}, {
		key: 'getUserLocation',
		value: function getUserLocation() {
			var _this3 = this;

			navigator.geolocation.getCurrentPosition(function (location) {
				_this3.locString = location.coords.latitude + ', ' + location.coords.longitude;

				_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + _this3.locString).then(function (res) {
					var currentValue = res.data.results[0].formatted_address;
					_this3.result.options.push({
						value: currentValue,
						label: currentValue
					});
					_this3.setState({
						currentValue: currentValue,
						userLocation: currentValue
					}, _this3.executeQuery.bind(_this3));
				});
			});
		}

		// set the query type and input data

	}, {
		key: 'setQueryInfo',
		value: function setQueryInfo() {
			var obj = {
				key: this.props.componentId,
				value: {
					queryType: this.type,
					appbaseField: this.props.appbaseField,
					customQuery: this.customQuery
				}
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.setSensorInfo(obj);
		}

		// build query for this sensor only

	}, {
		key: 'customQuery',
		value: function customQuery(value) {
			if (value && value.start >= 0 && value.end >= 0 && value.location != '') {
				var _type;

				return _defineProperty({}, this.type, (_type = {}, _defineProperty(_type, this.props.appbaseField, value.location), _defineProperty(_type, "from", value.start + this.unit), _defineProperty(_type, "to", value.end + this.unit), _type));
			} else {
				return;
			}
		}

		// get coordinates

	}, {
		key: 'getCoordinates',
		value: function getCoordinates(value) {
			var _this4 = this;

			if (value && value != '') {
				_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + value).then(function (res) {
					var location = res.data.results[0].geometry.location;
					_this4.locString = location.lat + ', ' + location.lng;
					_this4.executeQuery();
				});
			} else {
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(null, true);
			}
		}

		// execute query after changing location or distance

	}, {
		key: 'executeQuery',
		value: function executeQuery() {
			if (this.state.currentValue != '' && this.state.selected && this.locString) {
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
					value: _defineProperty({}, this.sortInfo.type, (_sortInfo$type = {}, _defineProperty(_sortInfo$type, this.props.appbaseField, this.locString), _defineProperty(_sortInfo$type, 'order', this.sortInfo.order), _defineProperty(_sortInfo$type, 'unit', this.unit), _sortInfo$type))
				};
				_reactivebase.AppbaseSensorHelper.selectedSensor.setSortInfo(sortObj);
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}
		}

		// use this only if want to create actuators
		// Create a channel which passes the actuate and receive results whenever actuate changes

	}, {
		key: 'createChannel',
		value: function createChannel() {
			var actuate = this.props.actuate ? this.props.actuate : {};
			var channelObj = _reactivebase.AppbaseChannelManager.create(this.context.appbaseRef, this.context.type, actuate);
		}

		// handle the input change and pass the value inside sensor info

	}, {
		key: 'handleChange',
		value: function handleChange(input) {
			if (input) {
				var inputVal = input.value;
				this.setState({
					'currentValue': inputVal
				});
				this.getCoordinates(inputVal);
			} else {
				this.setState({
					'currentValue': ''
				});
			}
		}
	}, {
		key: 'loadOptions',
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
					res.map(function (place) {
						_this5.result.options.push({
							label: place.description,
							value: place.description
						});
					});
					if (_this5.result.options[0]["label"] != "Use my current location") {
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
		key: 'handleDistanceChange',
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
		key: 'renderValue',
		value: function renderValue(option) {
			return _react2.default.createElement(
				'span',
				null,
				option.value
			);
		}

		// render

	}, {
		key: 'render',
		value: function render() {
			var title = null;

			if (this.props.title) {
				title = _react2.default.createElement(
					'h4',
					{ className: 'rbc-title' },
					this.props.title
				);
			}

			var cx = (0, _classnames2.default)({
				'rbc-title-active': this.props.title,
				'rbc-title-inactive': !this.props.title,
				'rbc-placeholder-active': this.props.placeholder,
				'rbc-placeholder-inactive': !this.props.placeholder
			});

			return _react2.default.createElement(
				'div',
				{ className: 'rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 ' + cx },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					title,
					_react2.default.createElement(
						'div',
						{ className: 'rbc-search-container col s12 col-xs-12' },
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
						'div',
						{ className: 'col s12 col-xs-12' },
						_react2.default.createElement(_reactSelect2.default, {
							value: this.state.selected.label ? this.state.selected : '',
							options: this.props.data,
							clearable: false,
							searchable: false,
							onChange: this.handleDistanceChange,
							placeholder: 'Select Distance'
						})
					)
				)
			);
		}
	}]);

	return GeoDistanceDropdown;
}(_react.Component);

GeoDistanceDropdown.propTypes = {
	appbaseField: _react2.default.PropTypes.string.isRequired,
	placeholder: _react2.default.PropTypes.string,
	unit: _react2.default.PropTypes.oneOf(['mi', 'miles', 'yd', 'yards', 'ft', 'feet', 'in', 'inch', 'km', 'kilometers', 'm', 'meters', 'cm', 'centimeters', 'mm', 'millimeters', 'NM', 'nmi', 'nauticalmiles']),
	data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		start: _reactivebase.AppbaseSensorHelper.validateThreshold,
		end: _reactivebase.AppbaseSensorHelper.validateThreshold,
		label: _react2.default.PropTypes.string.isRequired
	}))
};
// Default props value
GeoDistanceDropdown.defaultProps = {
	unit: 'mi',
	placeholder: "Search..."
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};