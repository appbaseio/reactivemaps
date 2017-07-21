function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { render } from "react-dom";
import { ItemCheckboxList } from "./component/ItemCheckboxList.js";
import { queryObject } from "../middleware/ImmutableQuery.js";
var helper = require("../middleware/helper.js");

var SearchAsMove = function (_Component) {
	_inherits(SearchAsMove, _Component);

	function SearchAsMove(props, context) {
		_classCallCheck(this, SearchAsMove);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			items: []
		};
		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.handleRemove = _this.handleRemove.bind(_this);
		return _this;
	}

	SearchAsMove.prototype.componentDidMount = function componentDidMount() {
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
	};
	// Handler function when a value is selected


	SearchAsMove.prototype.handleSelect = function handleSelect(value) {
		var flag = value === true ? true : !!(value && value.length);
		this.props.searchAsMoveChange(flag);
	};
	// Handler function when a value is deselected or removed


	SearchAsMove.prototype.handleRemove = function handleRemove(value) {};

	SearchAsMove.prototype.render = function render() {
		var listComponent = void 0;
		listComponent = React.createElement(ItemCheckboxList, {
			showTags: false,
			items: this.state.items,
			onSelect: this.handleSelect,
			onRemove: this.handleRemove,
			showCount: this.props.showCount
		});
		return React.createElement(
			"div",
			{ className: "searchAsMove row clearfix" },
			listComponent
		);
	};

	return SearchAsMove;
}(Component);

export default SearchAsMove;


SearchAsMove.propTypes = {};
// Default props value
SearchAsMove.defaultProps = {
	fieldName: "SearchAsMove",
	searchAsMoveDefault: false
};