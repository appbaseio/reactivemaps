"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _ItemCheckboxList = require("./component/ItemCheckboxList.js");

var _ImmutableQuery = require("../middleware/ImmutableQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helper = require("../middleware/helper.js");

var SearchAsMove = function (_Component) {
	_inherits(SearchAsMove, _Component);

	function SearchAsMove(props, context) {
		_classCallCheck(this, SearchAsMove);

		var _this = _possibleConstructorReturn(this, (SearchAsMove.__proto__ || Object.getPrototypeOf(SearchAsMove)).call(this, props));

		_this.state = {
			items: []
		};
		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.handleRemove = _this.handleRemove.bind(_this);
		return _this;
	}

	_createClass(SearchAsMove, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setState({
				items: [{
					key: "Search as I move the map",
					value: true,
					status: this.props.searchAsMoveDefault
				}]
			});
			if (this.props.searchAsMoveDefault && this.props.searchAsMoveDefault === true) {
				this.handleSelect(this.props.searchAsMoveDefault);
			}
		}
		// Handler function when a value is selected

	}, {
		key: "handleSelect",
		value: function handleSelect(value) {
			var flag = value === true ? true : !!(value && value.length);
			this.props.searchAsMoveChange(flag);
		}
		// Handler function when a value is deselected or removed

	}, {
		key: "handleRemove",
		value: function handleRemove(value) {}
	}, {
		key: "render",
		value: function render() {
			var listComponent = void 0;
			listComponent = _react2.default.createElement(_ItemCheckboxList.ItemCheckboxList, {
				showTags: false,
				items: this.state.items,
				onSelect: this.handleSelect,
				onRemove: this.handleRemove,
				showCount: this.props.showCount
			});
			return _react2.default.createElement(
				"div",
				{ className: "searchAsMove row clearfix" },
				listComponent
			);
		}
	}]);

	return SearchAsMove;
}(_react.Component);

exports.default = SearchAsMove;


SearchAsMove.propTypes = {};
// Default props value
SearchAsMove.defaultProps = {
	fieldName: "SearchAsMove",
	searchAsMoveDefault: false
};