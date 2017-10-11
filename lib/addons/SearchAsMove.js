function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { AppbaseSensorHelper } from "@appbaseio/reactivebase";
import ItemCheckboxList from "./ItemCheckboxList";

var SearchAsMove = function (_Component) {
	_inherits(SearchAsMove, _Component);

	function SearchAsMove(props) {
		_classCallCheck(this, SearchAsMove);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			items: [{
				key: "Search as I move the map",
				value: true,
				status: props.searchAsMoveDefault
			}]
		};

		_this.handleSelect = _this.handleSelect.bind(_this);
		return _this;
	}

	SearchAsMove.prototype.componentDidMount = function componentDidMount() {
		if (this.props.searchAsMoveDefault && this.props.searchAsMoveDefault === true) {
			this.handleSelect(this.props.searchAsMoveDefault);
		}
	};

	// Handler function when a value is selected


	SearchAsMove.prototype.handleSelect = function handleSelect(value) {
		var flag = value === true ? true : !!(value && value.length);
		this.props.searchAsMoveChange(flag);
	};

	SearchAsMove.prototype.render = function render() {
		var listComponent = React.createElement(ItemCheckboxList, {
			showTags: false,
			items: this.state.items,
			onSelect: this.handleSelect,
			showCount: this.props.showCount
		});

		return React.createElement(
			"div",
			{ className: "rbc-checkbox row clearfix" },
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