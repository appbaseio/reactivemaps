"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MapStyles = exports.mapStylesCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactivebase = require("@appbaseio/reactivebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStylesCollection = exports.mapStylesCollection = [{
	key: "Standard",
	value: require("../helper/map-styles/Standard.js")
}, {
	key: "Blue Essence",
	value: require("../helper/map-styles/BlueEssence.js")
}, {
	key: "Blue Water",
	value: require("../helper/map-styles/BlueWater.js")
}, {
	key: "Flat Map",
	value: require("../helper/map-styles/FlatMap.js")
}, {
	key: "Light Monochrome",
	value: require("../helper/map-styles/LightMonochrome.js")
}, {
	key: "Midnight Commander",
	value: require("../helper/map-styles/MidnightCommander.js")
}, {
	key: "Unsaturated Browns",
	value: require("../helper/map-styles/UnsaturatedBrowns.js")
}];

var MapStyles = exports.MapStyles = function (_Component) {
	_inherits(MapStyles, _Component);

	function MapStyles(props, context) {
		_classCallCheck(this, MapStyles);

		var _this = _possibleConstructorReturn(this, (MapStyles.__proto__ || Object.getPrototypeOf(MapStyles)).call(this, props));

		_this.state = {
			items: []
		};
		_this.handleSelect = _this.handleSelect.bind(_this);
		return _this;
	}

	_createClass(MapStyles, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var selectedValue = 0;
			if (this.props.defaultSelected) {
				mapStylesCollection.forEach(function (style, index) {
					if (style.key === _this2.props.defaultSelected) {
						selectedValue = index;
					}
				});
			}
			this.setState({
				items: mapStylesCollection,
				selectedValue: selectedValue
			}, this.themeChanged);
		}

		// Handler function when a value is selected

	}, {
		key: "handleSelect",
		value: function handleSelect(event) {
			var _this3 = this;

			this.setState({
				selectedValue: event.target.value
			}, function () {
				_this3.themeChanged(true);
			});
		}
	}, {
		key: "themeChanged",
		value: function themeChanged() {
			var isExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var style = mapStylesCollection[this.state.selectedValue].value;
			this.props.mapStyleChange(style);
		}
	}, {
		key: "render",
		value: function render() {
			var options = this.state.items.map(function (item, index) {
				return _react2.default.createElement(
					"option",
					{ value: index, key: index },
					item.key
				);
			});
			return _react2.default.createElement(
				"div",
				{ className: "input-field col rbc-mapstyles pull-right right" },
				_react2.default.createElement(
					"select",
					{ className: "browser-default form-control", onChange: this.handleSelect, value: this.state.selectedValue, name: "mapStyles", id: "mapStyles" },
					options
				)
			);
		}
	}]);

	return MapStyles;
}(_react.Component);

MapStyles.propTypes = {};

// Default props value
MapStyles.defaultProps = {
	fieldName: "MapStyles"
};