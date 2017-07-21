function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { default as React, Component } from "react";
import { render } from "react-dom";
var helper = require("../middleware/helper.js");

export var MapStyles = function (_Component) {
	_inherits(MapStyles, _Component);

	function MapStyles(props, context) {
		_classCallCheck(this, MapStyles);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			items: []
		};
		_this.handleSelect = _this.handleSelect.bind(_this);
		return _this;
	}

	MapStyles.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		var selectedValue = 0;
		if (this.props.defaultSelected) {
			helper.mapStyles.forEach(function (style, index) {
				if (style.key === _this2.props.defaultSelected) {
					selectedValue = index;
				}
			});
		}
		this.setState({
			items: helper.mapStyles,
			selectedValue: selectedValue
		}, this.themeChanged);
	};
	// Handler function when a value is selected


	MapStyles.prototype.handleSelect = function handleSelect(event) {
		var _this3 = this;

		this.setState({
			selectedValue: event.target.value
		}, function () {
			_this3.themeChanged(true);
		});
	};

	MapStyles.prototype.themeChanged = function themeChanged() {
		var isExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		var style = helper.mapStyles[this.state.selectedValue].value;
		this.props.mapStyleChange(style);
	};

	MapStyles.prototype.render = function render() {
		var options = this.state.items.map(function (item, index) {
			return React.createElement(
				"option",
				{ value: index, key: index },
				item.key
			);
		});
		return React.createElement(
			"div",
			{ className: "input-field col rbc-mapstyles pull-right right" },
			React.createElement(
				"select",
				{ className: "browser-default form-control", onChange: this.handleSelect, value: this.state.selectedValue, name: "mapStyles", id: "mapStyles" },
				options
			)
		);
	};

	return MapStyles;
}(Component);

MapStyles.propTypes = {};
// Default props value
MapStyles.defaultProps = {
	fieldName: "MapStyles"
};