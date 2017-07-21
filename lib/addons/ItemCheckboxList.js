function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { default as React, Component } from "react";

export var ItemCheckboxList = function (_Component) {
	_inherits(ItemCheckboxList, _Component);

	function ItemCheckboxList(props) {
		_classCallCheck(this, ItemCheckboxList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			selectedItems: []
		};
		_this.handleListClick = _this.handleListClick.bind(_this);
		_this.handleTagClick = _this.handleTagClick.bind(_this);
		_this.handleListClickAll = _this.handleListClickAll.bind(_this);
		return _this;
	}

	ItemCheckboxList.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		if (this.props.defaultSelected) {
			this.setState({
				selectedItems: this.props.defaultSelected
			}, function () {
				_this2.updateAction.bind(_this2);
				_this2.props.onSelect(_this2.state.selectedItems);
			});
		}
	};

	// remove selected types if not in the list


	ItemCheckboxList.prototype.componentDidUpdate = function componentDidUpdate() {
		var _this3 = this;

		var updated = null;
		if (this.state.selectedItems) {
			updated = JSON.parse(JSON.stringify(this.state.selectedItems));
		}
		if (updated && updated.length && this.props.items && this.props.items.length) {
			updated = updated.filter(function (item) {
				var updatedFound = _this3.props.items.filter(function (propItem) {
					return propItem.key === item;
				});
				return !!updatedFound.length;
			});
			if (updated.length !== this.state.selectedItems.length) {
				var isExecutable = !updated.length;
				this.props.onRemove(this.state.selectedItems, isExecutable);
				this.setState({
					selectedItems: updated
				});
				if (updated.length) {
					this.props.onSelect(updated);
				}
			}
		}
	};

	ItemCheckboxList.prototype.updateAction = function updateAction() {
		if (!this.state.selectedItems.length) {
			this.props.onSelect(null);
		}
	};

	// handler function for select all


	ItemCheckboxList.prototype.handleListClickAll = function handleListClickAll(value, selectedStatus) {
		var _this4 = this;

		this.props.selectAll(selectedStatus);
		var selectedItems = this.props.items.map(function (item) {
			return item.key;
		});
		selectedItems = selectedStatus ? selectedItems : [];
		this.setState({
			selectedItems: selectedItems
		}, function () {
			_this4.updateAction.bind(_this4);
			_this4.props.onSelect(_this4.state.selectedItems);
		});
	};

	// Handler function when a checkbox is clicked


	ItemCheckboxList.prototype.handleListClick = function handleListClick(value, selectedStatus) {
		// If the checkbox selectedStatus is true, then update selectedItems array
		if (selectedStatus) {
			this.props.onRemove(this.state.selectedItems, false);
			var updated = this.state.selectedItems;
			updated.push(value);
			this.setState({
				selectedItems: updated
			}, this.updateAction.bind(this));
			// Pass the props to parent components to add to the Query
			if (this.state.selectedItems.length) {
				this.props.onSelect(this.state.selectedItems);
			}
		}
		// If the checkbox selectedStatus is false
		// Call handleTagClick to remove it from the selected Items
		else {
				this.handleTagClick(value);
			}
	};

	// Handler function when a cancel button on tag is clicked to remove it


	ItemCheckboxList.prototype.handleTagClick = function handleTagClick(value) {
		// Pass the older value props to parent components to remove older list in terms query
		var isExecutable = this.state.selectedItems.length === 1;
		this.props.onRemove(this.state.selectedItems, isExecutable);
		var keyRef = value.toString().replace(/ /g, "_");
		var ref = "ref" + keyRef;
		var checkboxElement = this.refs[ref];
		checkboxElement.state.status = false;
		var updated = this.state.selectedItems;
		var index = updated.indexOf(value);
		updated.splice(index, 1);
		this.setState({
			selectedItems: updated
		}, this.updateAction.bind(this));
		// Pass the removed value props to parent components to add updated list in terms query
		if (this.state.selectedItems.length) {
			this.props.onSelect(this.state.selectedItems);
		}
	};

	ItemCheckboxList.prototype.render = function render() {
		var _this5 = this;

		var items = this.props.items;
		var selectedItems = this.state.selectedItems;
		var ListItemsArray = [];
		var TagItemsArray = [];
		// Build the array for the checkboxList items
		items.forEach(function (item, index) {
			try {
				item.keyRef = item.key.replace(/ /g, "_");
			} catch (e) {
				item.keyRef = index;
				console.log(item, e);
			}
			ListItemsArray.push(React.createElement(ListItem, {
				key: item.keyRef,
				value: item.key,
				doc_count: item.doc_count,
				countField: _this5.props.showCount,
				handleClick: _this5.handleListClick,
				status: item.status || false,
				ref: "ref" + item.keyRef
			}));
		});
		// include select all if set from parent
		if (this.props.includeSelectAll && items && items.length) {
			ListItemsArray.unshift(React.createElement(ListItem, {
				key: "selectall",
				value: "Select All",
				countField: false,
				handleClick: this.handleListClickAll,
				status: this.props.defaultSelectall || false,
				ref: "refselectall"
			}));
		}
		// Build the array of Tags for selected items
		if (this.props.showTags && selectedItems) {
			selectedItems.forEach(function (item) {
				TagItemsArray.push(React.createElement(Tag, {
					key: item,
					value: item,
					onClick: _this5.handleTagClick
				}));
			});
		}
		return React.createElement(
			"div",
			{ className: "rbc-list-container col s12 col-xs-12" },
			TagItemsArray.length ? React.createElement(
				"div",
				{ className: "row" },
				TagItemsArray
			) : null,
			React.createElement(
				"div",
				{ className: "row" },
				ListItemsArray
			)
		);
	};

	return ItemCheckboxList;
}(Component);

ItemCheckboxList.defaultProps = {
	showTags: true
};

var ListItem = function (_Component2) {
	_inherits(ListItem, _Component2);

	function ListItem(props) {
		_classCallCheck(this, ListItem);

		var _this6 = _possibleConstructorReturn(this, _Component2.call(this, props));

		_this6.state = {
			initialStatus: _this6.props.status,
			status: _this6.props.status || false
		};
		return _this6;
	}

	ListItem.prototype.componentDidUpdate = function componentDidUpdate() {
		if (this.props.status !== this.state.initialStatus) {
			this.setState({
				status: this.props.status,
				initialStatus: this.props.status
			});
		}
	};

	ListItem.prototype.handleClick = function handleClick() {
		this.setState({
			status: !this.state.status
		});
		this.props.handleClick(this.props.value, !this.state.status);
	};

	ListItem.prototype.handleCheckboxChange = function handleCheckboxChange(event) {
		this.setState({
			status: event.target.checked
		});
	};

	ListItem.prototype.render = function render() {
		var count = void 0;
		// Check if the user has set to display countField
		if (this.props.countField) {
			count = React.createElement(
				"span",
				null,
				" (",
				this.props.doc_count,
				") "
			);
		}
		return React.createElement(
			"div",
			{ onClick: this.handleClick.bind(this), className: "rbc-list-item rbc-checkbox-item col s12 col-xs-12" },
			React.createElement("input", {
				type: "checkbox",
				checked: this.state.status,
				onChange: this.handleCheckboxChange.bind(this)
			}),
			React.createElement(
				"label",
				null,
				" ",
				this.props.value,
				" ",
				count
			)
		);
	};

	return ListItem;
}(Component);

var Tag = function (_Component3) {
	_inherits(Tag, _Component3);

	function Tag(props) {
		_classCallCheck(this, Tag);

		return _possibleConstructorReturn(this, _Component3.call(this, props));
	}

	Tag.prototype.render = function render() {
		return React.createElement(
			"span",
			{ onClick: this.props.onClick.bind(null, this.props.value), className: "tag-item col" },
			React.createElement(
				"a",
				{ href: "javascript:void(0)", className: "close" },
				" x "
			),
			React.createElement(
				"span",
				null,
				this.props.value
			)
		);
	};

	return Tag;
}(Component);