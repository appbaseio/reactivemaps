(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactiveMaps"] = factory(require("react"), require("react-dom"));
	else
		root["ReactiveMaps"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _AppbaseList = __webpack_require__(2);

	var _AppbaseSlider = __webpack_require__(26);

	var _AppbaseSearch = __webpack_require__(182);

	var _DistanceSensor = __webpack_require__(194);

	var _InputField = __webpack_require__(221);

	var _AppbaseButtonGroup = __webpack_require__(222);

	var _GoogleSearch = __webpack_require__(223);

	var _AppbaseMap = __webpack_require__(224);

	var _ListResult = __webpack_require__(283);

	var _ReactiveMap = __webpack_require__(284);

	// sensors
	module.exports = {
		AppbaseList: _AppbaseList.AppbaseList,
		AppbaseSlider: _AppbaseSlider.AppbaseSlider,
		AppbaseSearch: _AppbaseSearch.AppbaseSearch,
		DistanceSensor: _DistanceSensor.DistanceSensor,
		AppbaseMap: _AppbaseMap.AppbaseMap,
		ReactiveMap: _ReactiveMap.ReactiveMap,
		ListResult: _ListResult.ListResult,
		InputField: _InputField.InputField,
		AppbaseButtonGroup: _AppbaseButtonGroup.AppbaseButtonGroup,
		GoogleSearch: _GoogleSearch.GoogleSearch
	};
	// middleware

	// actuators

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppbaseList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ItemCheckboxList = __webpack_require__(5);

	var _ItemList = __webpack_require__(7);

	var _ImmutableQuery = __webpack_require__(8);

	var _ChannelManager = __webpack_require__(24);

	var _StaticSearch = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var AppbaseList = exports.AppbaseList = function (_Component) {
		_inherits(AppbaseList, _Component);

		function AppbaseList(props, context) {
			_classCallCheck(this, AppbaseList);

			var _this = _possibleConstructorReturn(this, (AppbaseList.__proto__ || Object.getPrototypeOf(AppbaseList)).call(this, props));

			_this.state = {
				items: [],
				storedItems: [],
				rawData: {
					hits: {
						hits: []
					}
				},
				defaultSelectAll: false
			};
			_this.previousSelectedSensor = {};
			_this.handleSelect = _this.handleSelect.bind(_this);
			_this.handleRemove = _this.handleRemove.bind(_this);
			_this.filterBySearch = _this.filterBySearch.bind(_this);
			_this.selectAll = _this.selectAll.bind(_this);
			_this.type = _this.props.multipleSelect ? 'Terms' : 'Term';
			return _this;
		}

		_createClass(AppbaseList, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.defaultSelected = this.props.defaultSelected;
			}
			// Get the items from Appbase when component is mounted

		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
				this.createChannel();
			}
			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				// Set the depends - add self aggs query as well with depends
				var depends = this.props.depends ? this.props.depends : {};
				depends['aggs'] = {
					key: this.props.inputData,
					sort: this.props.sort,
					size: this.props.size
				};
				// create a channel and listen the changes
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
				channelObj.emitter.addListener(channelObj.channelId, function (res) {
					var data = res.data;
					var rawData = void 0;
					if (res.method === 'stream') {
						rawData = this.state.rawData;
						rawData.hits.hits.push(res.data);
					} else if (res.method === 'historic') {
						rawData = data;
					}
					this.setState({
						rawData: rawData
					});
					this.setData(rawData);
				}.bind(this));
			}
		}, {
			key: 'setData',
			value: function setData(data) {
				if (data.aggregations && data.aggregations[this.props.inputData] && data.aggregations[this.props.inputData].buckets) {
					this.addItemsToList(data.aggregations[this.props.inputData].buckets);
				}
			}
		}, {
			key: 'addItemsToList',
			value: function addItemsToList(newItems) {
				var _this2 = this;

				newItems = newItems.map(function (item) {
					item.key = item.key.toString();
					item.status = _this2.defaultSelected && _this2.defaultSelected.indexOf(item.key) > -1 ? true : false;
					return item;
				});
				this.setState({
					items: newItems,
					storedItems: newItems
				});
			}
			// Handler function when a value is selected

		}, {
			key: 'handleSelect',
			value: function handleSelect(value) {
				this.setValue(value, true);
			}
			// Handler function when a value is deselected or removed

		}, {
			key: 'handleRemove',
			value: function handleRemove(value) {
				var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				this.setValue(value, isExecuteQuery);
			}
			// set value

		}, {
			key: 'setValue',
			value: function setValue(value) {
				var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var obj = {
					key: this.props.sensorId,
					value: value
				};
				helper.selectedSensor.set(obj, isExecuteQuery);
			}
			// selectAll

		}, {
			key: 'selectAll',
			value: function selectAll(value, defaultSelected, cb) {
				var items = this.state.items.filter(function (item) {
					item.status = value;return item;
				});
				if (value) {
					this.defaultSelected = defaultSelected;
				}
				this.setState({
					items: items,
					storedItems: items,
					defaultSelectAll: value
				}, cb);
			}
			// filter

		}, {
			key: 'filterBySearch',
			value: function filterBySearch(value) {
				if (value) {
					var items = this.state.storedItems.filter(function (item) {
						return item.key && item.key.toLowerCase().indexOf(value.toLowerCase()) > -1;
					});
					this.setState({
						items: items
					});
				} else {
					this.setState({
						items: this.state.storedItems
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				// Checking if component is single select or multiple select
				var listComponent = void 0,
				    searchComponent = null,
				    title = null,
				    titleExists = false;
				if (this.props.multipleSelect) {
					listComponent = _react2.default.createElement(_ItemCheckboxList.ItemCheckboxList, {
						items: this.state.items,
						onSelect: this.handleSelect,
						onRemove: this.handleRemove,
						showCount: this.props.showCount,
						selectAll: this.selectAll,
						defaultSelected: this.props.defaultSelected,
						includeSelectAll: this.props.includeSelectAll });
				} else {
					listComponent = _react2.default.createElement(_ItemList.ItemList, {
						items: this.state.items,
						onSelect: this.handleSelect,
						onRemove: this.handleRemove,
						showCount: this.props.showCount,
						defaultSelected: this.props.defaultSelected });
				}

				// set static search
				if (this.props.staticSearch) {
					searchComponent = _react2.default.createElement(_StaticSearch.StaticSearch, {
						placeholder: this.props.searchPlaceholder,
						changeCallback: this.filterBySearch
					});
				}

				if (this.props.title) {
					titleExists = true;
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle col s12 col-xs-12' },
						this.props.title
					);
				}

				var listClass = 'reactiveComponent listComponent staticSearch-' + this.props.staticSearch + ' title-' + titleExists;

				return _react2.default.createElement(
					'div',
					{ className: "col s12 col-xs-12 card thumbnail " + listClass, style: this.props.defaultStyle },
					title,
					searchComponent,
					listComponent
				);
			}
		}]);

		return AppbaseList;
	}(_react.Component);

	AppbaseList.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		size: _react2.default.PropTypes.number,
		showCount: _react2.default.PropTypes.bool,
		multipleSelect: _react2.default.PropTypes.bool,
		sort: _react2.default.PropTypes.string,
		includeSelectAll: _react2.default.PropTypes.bool
	};
	// Default props value
	AppbaseList.defaultProps = {
		showCount: true,
		multipleSelect: true,
		sort: 'count',
		size: 60,
		staticSearch: false,
		title: null,
		searchPlaceholder: 'Search',
		includeSelectAll: false,
		defaultStyle: {
			height: '500px',
			overflow: 'auto'
		}
	};

	// context type
	AppbaseList.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ItemCheckboxList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Style = __webpack_require__(6);

	var ItemCheckboxList = exports.ItemCheckboxList = function (_Component) {
		_inherits(ItemCheckboxList, _Component);

		function ItemCheckboxList(props) {
			_classCallCheck(this, ItemCheckboxList);

			var _this = _possibleConstructorReturn(this, (ItemCheckboxList.__proto__ || Object.getPrototypeOf(ItemCheckboxList)).call(this, props));

			_this.state = {
				selectedItems: []
			};
			_this.handleListClick = _this.handleListClick.bind(_this);
			_this.handleTagClick = _this.handleTagClick.bind(_this);
			_this.handleListClickAll = _this.handleListClickAll.bind(_this);
			return _this;
		}

		_createClass(ItemCheckboxList, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (this.props.defaultSelected) {
					this.setState({
						selectedItems: this.props.defaultSelected
					}, function () {
						this.updateAction.bind(this);
						this.props.onSelect(this.state.selectedItems);
					}.bind(this));
				}
			}
			// remove selected types if not in the list

		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var _this2 = this;

				var updated = null;
				if (this.state.selectedItems) {
					updated = JSON.parse(JSON.stringify(this.state.selectedItems));
				}
				if (updated && updated.length && this.props.items && this.props.items.length) {
					updated = updated.filter(function (item) {
						var updatedFound = _this2.props.items.filter(function (propItem) {
							return propItem.key === item;
						});
						return updatedFound.length ? true : false;
					});
					if (updated.length !== this.state.selectedItems.length) {
						var isExecutable = updated.length ? false : true;
						this.props.onRemove(this.state.selectedItems, isExecutable);
						this.setState({
							'selectedItems': updated
						});
						if (updated.length) {
							this.props.onSelect(updated);
						}
					}
				}
			}
		}, {
			key: 'updateAction',
			value: function updateAction() {
				if (!this.state.selectedItems.length) {
					this.props.onSelect(null);
				}
			}
			// handler function for select all

		}, {
			key: 'handleListClickAll',
			value: function handleListClickAll(value, selectedStatus) {
				this.props.selectAll(selectedStatus);
				var selectedItems = this.props.items.map(function (item) {
					return item.key;
				});
				selectedItems = selectedStatus ? selectedItems : [];
				this.setState({
					selectedItems: selectedItems
				}, function () {
					this.updateAction.bind(this);
					this.props.onSelect(this.state.selectedItems);
				}.bind(this));
			}
			// Handler function when a checkbox is clicked

		}, {
			key: 'handleListClick',
			value: function handleListClick(value, selectedStatus) {
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
			}
			// Handler function when a cancel button on tag is clicked to remove it

		}, {
			key: 'handleTagClick',
			value: function handleTagClick(value) {
				// Pass the older value props to parent components to remove older list in terms query
				var isExecutable = this.state.selectedItems.length === 1 ? true : false;
				this.props.onRemove(this.state.selectedItems, isExecutable);
				var keyRef = value.toString().replace(/ /g, '_');
				var ref = 'ref' + keyRef;
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
			}
		}, {
			key: 'render',
			value: function render() {
				var items = this.props.items;
				var selectedItems = this.state.selectedItems;
				var ListItemsArray = [];
				var TagItemsArray = [];
				// Build the array for the checkboxList items
				items.forEach(function (item, index) {
					try {
						item.keyRef = item.key.replace(/ /g, '_');
					} catch (e) {
						item.keyRef = index;
						console.log(item, e);
					}
					ListItemsArray.push(_react2.default.createElement(ListItem, {
						key: item.keyRef,
						value: item.key,
						doc_count: item.doc_count,
						countField: this.props.showCount,
						handleClick: this.handleListClick,
						status: item.status || false,
						ref: "ref" + item.keyRef }));
				}.bind(this));
				// include select all if set from parent
				if (this.props.includeSelectAll && items && items.length) {
					ListItemsArray.unshift(_react2.default.createElement(ListItem, {
						key: 'selectall',
						value: 'Select All',
						countField: false,
						handleClick: this.handleListClickAll,
						status: this.props.defaultSelectall || false,
						ref: "refselectall" }));
				}
				// Build the array of Tags for selected items
				if (this.props.showTags && selectedItems) {
					selectedItems.forEach(function (item) {
						TagItemsArray.push(_react2.default.createElement(Tag, {
							key: item,
							value: item,
							onClick: this.handleTagClick }));
					}.bind(this));
				}
				return _react2.default.createElement(
					'div',
					{ className: 'listContainer col s12 col-xs-12' },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						TagItemsArray
					),
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						ListItemsArray
					)
				);
			}
		}]);

		return ItemCheckboxList;
	}(_react.Component);

	ItemCheckboxList.defaultProps = {
		showTags: true
	};

	var ListItem = function (_Component2) {
		_inherits(ListItem, _Component2);

		function ListItem(props) {
			_classCallCheck(this, ListItem);

			var _this3 = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

			_this3.state = {
				initialStatus: _this3.props.status,
				status: _this3.props.status || false
			};
			return _this3;
		}

		_createClass(ListItem, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (this.props.status !== this.state.initialStatus) {
					this.setState({
						status: this.props.status,
						initialStatus: this.props.status
					});
				}
			}
		}, {
			key: 'handleClick',
			value: function handleClick() {
				this.setState({
					status: !this.state.status
				});
				this.props.handleClick(this.props.value, !this.state.status);
			}
		}, {
			key: 'handleCheckboxChange',
			value: function handleCheckboxChange(event) {
				this.setState({
					status: event.target.checked
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var count = void 0;
				// Check if the user has set to display countField
				if (this.props.countField) {
					count = _react2.default.createElement(
						'span',
						null,
						' (',
						this.props.doc_count,
						') '
					);
				}
				return _react2.default.createElement(
					'div',
					{ onClick: this.handleClick.bind(this), className: 'listItem checkboxItem col s12 col-xs-12' },
					_react2.default.createElement('input', { type: 'checkbox',
						checked: this.state.status,
						onChange: this.handleCheckboxChange.bind(this) }),
					_react2.default.createElement(
						'label',
						null,
						' ',
						this.props.value,
						' ',
						count
					)
				);
			}
		}]);

		return ListItem;
	}(_react.Component);

	var Tag = function (_Component3) {
		_inherits(Tag, _Component3);

		function Tag(props) {
			_classCallCheck(this, Tag);

			return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));
		}

		_createClass(Tag, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'span',
					{ onClick: this.props.onClick.bind(null, this.props.value), className: 'tagItem col' },
					_react2.default.createElement(
						'span',
						null,
						this.props.value
					),
					_react2.default.createElement(
						'a',
						{ href: 'javascript:void(0)', className: 'close-tag' },
						' x '
					)
				);
			}
		}]);

		return Tag;
	}(_react.Component);

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		inputStyle: {
			"backgroundColor": "white",
			"border": "1px solid transparent",
			"borderRadius": "1px",
			"boxShadow": "0 2px 6px rgba(0, 0, 0, 0.3)",
			"boxSizing": "border-box",
			"MozBoxSizing": "border-box",
			"fontSize": "14px",
			"height": "32px",
			"marginTop": "27px",
			"outline": "none",
			"padding": "0 12px",
			"textOverflow": "ellipses",
			"width": "400px"
		},
		divStatusStyle: {
			position: 'absolute',
			top: '15px',
			right: '15px'
		},
		divAppbaseStyle: {
			position: 'absolute',
			width: '200px',
			bottom: '15px',
			left: '0px',
			right: '0px',
			marginLeft: 'auto',
			marginRight: 'auto',
			textAlign: 'center'
		},
		divContainer: {
			padding: "1em"
		},
		divListTag: {
			backgroundColor: "#ddd",
			margin: "5px",
			padding: "5px",
			lineHeight: "20px",
			display: "inline-block"
		},
		divListItem: {
			margin: "5px",
			padding: "3px"
		},
		divScroll: {
			overflow: "auto",
			height: "400px",
			width: "100%",
			margin: "5px"
		},
		searchBox: {
			border: "1px solid transparent",
			height: "32px",
			marginTop: "27px",
			outline: "none",
			padding: "0px 12px",
			width: "400px",
			position: "absolute",
			left: "114px",
			top: "0px",
			backgroundColor: "white"
		},
		listItem: {
			margin: "5px",
			padding: "3px"
		},
		selectedListItem: {
			margin: "5px",
			padding: "3px",
			fontWeight: "bold"
		},
		fullHeightDiv: {
			height: "100%"
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ItemList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Style = __webpack_require__(6);

	var ItemList = exports.ItemList = function (_Component) {
		_inherits(ItemList, _Component);

		function ItemList(props) {
			_classCallCheck(this, ItemList);

			var _this = _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).call(this, props));

			_this.state = {
				selectedItem: []
			};
			_this.defaultAllowed = true;
			_this.handleClick = _this.handleClick.bind(_this);
			return _this;
		}

		_createClass(ItemList, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (this.props.items.length && this.defaultAllowed) {
					this.defaultAllowed = false;
					this.defaultSelection();
				}
			}
		}, {
			key: 'defaultSelection',
			value: function defaultSelection() {
				if (this.props.defaultSelected) {
					this.handleClick(this.props.defaultSelected);
				}
			}
			// Handler function is called when the list item is clicked

		}, {
			key: 'handleClick',
			value: function handleClick(value) {
				// Pass the previously selected value to be removed from the query
				this.props.onRemove(this.state.selectedItem);
				// Pass the new selected value to be added to the query
				this.props.onSelect(value);
				this.setState({
					selectedItem: value
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var items = this.props.items;
				var itemsComponent = [];
				// Build the array of components for each item
				items.forEach(function (item) {
					itemsComponent.push(_react2.default.createElement(ItemRow, {
						key: item.key,
						value: item.key,
						doc_count: item.doc_count,
						countField: this.props.showCount,
						handleClick: this.handleClick,
						selectedItem: this.state.selectedItem }));
				}.bind(this));
				return _react2.default.createElement(
					'div',
					{ className: 'listContainer col s12 col-xs-12' },
					itemsComponent
				);
			}
		}]);

		return ItemList;
	}(_react.Component);

	var ItemRow = function (_Component2) {
		_inherits(ItemRow, _Component2);

		function ItemRow(props) {
			_classCallCheck(this, ItemRow);

			return _possibleConstructorReturn(this, (ItemRow.__proto__ || Object.getPrototypeOf(ItemRow)).call(this, props));
		}

		_createClass(ItemRow, [{
			key: 'renderItem',
			value: function renderItem() {
				var count = void 0;
				// Check if user wants to show count field
				if (this.props.countField) {
					count = _react2.default.createElement(
						'span',
						null,
						' (',
						this.props.doc_count,
						') '
					);
				}
				var item = _react2.default.createElement(
					'a',
					{ href: 'javascript:void(0)', className: "col s12 col-xs-12" },
					_react2.default.createElement(
						'span',
						null,
						' ',
						this.props.value,
						' '
					),
					count
				);
				if (this.props.value === this.props.selectedItem) {
					item = _react2.default.createElement(
						'a',
						{ href: 'javascript:void(0)', className: "col s12 col-xs-12" },
						_react2.default.createElement(
							'strong',
							null,
							_react2.default.createElement(
								'span',
								null,
								' ',
								this.props.value,
								' '
							),
							count
						)
					);
				}
				return item;
			}
		}, {
			key: 'renderCount',
			value: function renderCount() {
				var count = void 0;
				// Check if user wants to show count field
				if (this.props.countField) {
					count = _react2.default.createElement(
						'span',
						null,
						' (',
						this.props.doc_count,
						') '
					);
				}
				return count;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				// let activeClass = this.props.value === this.props.selectedItem ? 'active' : '';
				return _react2.default.createElement(
					'div',
					{ className: 'listItem row', onClick: function onClick() {
							return _this3.props.handleClick(_this3.props.value);
						} },
					_react2.default.createElement(
						'div',
						{ className: 'col s12 col-xs-12 radioItem' },
						_react2.default.createElement('input', { type: 'radio',
							checked: this.props.value === this.props.selectedItem,
							name: 'radioItem', id: 'radioItem',
							value: this.props.value }),
						_react2.default.createElement(
							'label',
							null,
							' ',
							this.props.value,
							' ',
							this.renderCount()
						)
					)
				);
			}
		}]);

		return ItemRow;
	}(_react.Component);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(9);

	var EventEmitter = _require.EventEmitter;
	var emitter = exports.emitter = new EventEmitter();
	var helper = __webpack_require__(16);

	var ImmutableQuery = function () {
		function ImmutableQuery() {
			_classCallCheck(this, ImmutableQuery);

			this.shouldArray = [];
			this.mustArray = [];
			this.filterArray = [];
			this.config = [];
			this.aggs = {};
			this.queryListener();
		}

		_createClass(ImmutableQuery, [{
			key: 'setConfig',
			value: function setConfig(config) {
				this.config = config;
			}
		}, {
			key: 'addShouldClause',
			value: function addShouldClause(key, value, type) {
				var isExecuteQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
				var includeGeo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
				var queryLevel = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "must";

				if (value === undefined || value === null) {
					return;
				}
				var obj = eval('this.get' + type + 'Object(key, value)');
				var arr = queryLevel === 'should' ? this.shouldArray : this.mustArray;
				arr.push(obj);
				return this.buildQuery(includeGeo, isExecuteQuery);
			}
		}, {
			key: 'removeShouldClause',
			value: function removeShouldClause(key, value, type) {
				var isExecuteQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
				var includeGeo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
				var queryLevel = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "must";

				if (value === undefined || value === null) {
					return;
				}
				var arr = queryLevel === 'must' ? this.mustArray : this.shouldArray;
				var index = this.getArrayIndex(arr, key, value, type);
				if (index >= 0) {
					arr.splice(index, 1);
				}
				return this.buildQuery(includeGeo, isExecuteQuery);
			}
		}, {
			key: 'updateGeoFilter',
			value: function updateGeoFilter(key, boundingBoxCoordinates, geoFlag) {
				if (typeof geoFlag !== 'undefined' && !geoFlag) {} else {
					var geoObject = JSON.parse('{"' + key + '":' + JSON.stringify(boundingBoxCoordinates) + '}');
					this.filterArray[0] = { geo_bounding_box: geoObject };
				}
				var geoFlag = typeof geoFlag !== 'undefined' ? geoFlag : true;
				return this.buildQuery(geoFlag);
			}
		}, {
			key: 'addAggregation',
			value: function addAggregation(key, size, sort) {
				var order = void 0,
				    type = void 0;
				if (sort == "count") {
					order = "desc";
					type = "_count";
				} else if (sort == "asc") {
					order = "asc";
					type = "_term";
				} else {
					order = "desc";
					type = "_term";
				}
				var orderQuery = '{\n\t\t\t"' + type + '" : "' + order + '"\n\t\t}';
				this.aggs = JSON.parse('{\n\t\t\t"' + key + '": {\n\t\t\t\t"terms": {\n\t\t\t\t\t"field": "' + key + '",\n\t\t\t\t\t"size": ' + size + ',\n\t\t\t\t\t"order": ' + orderQuery + '\n\t\t\t\t}\n\t\t\t}\n\t\t}');
				var mustArray = JSON.parse(JSON.stringify(this.mustArray));
				mustArray = mustArray.filter(function (query) {
					return !query.hasOwnProperty('terms');
				});
				var query = {
					type: this.config.type,
					body: {
						"size": 100,
						"aggs": this.aggs,
						"query": {
							"bool": {
								"must": mustArray
							}
						}
					}
				};
				return query;
			}
		}, {
			key: 'buildQuery',
			value: function buildQuery(includeGeo, isExecuteQuery) {
				var shouldArray = JSON.parse(JSON.stringify(this.shouldArray));
				var mustObject = {
					bool: {
						must: this.mustArray
					}
				};
				shouldArray.push(mustObject);
				if (includeGeo) {
					var geoFilter = {
						bool: {
							filter: this.filterArray
						}
					};
					shouldArray.unshift(geoFilter);
				}
				this.query = {
					type: this.config.type,
					body: {
						"size": 100,
						"aggs": this.aggs,
						"query": {
							"bool": {
								"should": shouldArray,
								"minimum_should_match": 1
							}
						}
					}
				};
				if (isExecuteQuery) {
					emitter.emit('change', this.query);
				}
				return this.query;
			}
		}, {
			key: 'getTermObject',
			value: function getTermObject(key, value) {
				var term = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
				return { term: term };
			}
		}, {
			key: 'getTermsObject',
			value: function getTermsObject(key, value) {
				var terms = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
				return { terms: terms };
			}
		}, {
			key: 'getMatchObject',
			value: function getMatchObject(key, value) {
				value = value.toLowerCase();
				var match = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
				return { match: match };
			}
		}, {
			key: 'getRangeObject',
			value: function getRangeObject(key, value) {
				var rangeObj = {
					"gte": value.min,
					"lte": value.max
				};
				var range = JSON.parse('{"' + key + '":' + JSON.stringify(rangeObj) + '}');
				return { range: range };
			}
		}, {
			key: 'getArrayIndex',
			value: function getArrayIndex(array, key, value, type) {
				var obj = eval('this.get' + type + 'Object(key, value)');
				var encode64 = btoa(JSON.stringify(obj));
				for (var i = 0; i < array.length; i++) {
					if (btoa(JSON.stringify(array[i])) === encode64) {
						return i;
					}
				}
				return -1;
			}
			// Listener for query change

		}, {
			key: 'queryListener',
			value: function queryListener() {
				emitter.addListener('change', function (query) {
					this.executeQuery(query);
				}.bind(this));
			}
			// Execute query on query change

		}, {
			key: 'executeQuery',
			value: function executeQuery(reqObject) {
				// delete aggrefation query if exists
				if (reqObject.body && reqObject.body.hasOwnProperty('aggs')) {
					delete reqObject.body.aggs;
				}
				// apply search query and emit queryResult
				helper.appbaseRef.search(reqObject).on('data', function (data) {
					emitter.emit('queryResult', data);
				}).on('error', function (error) {
					console.log(error);
				});
			}
		}]);

		return ImmutableQuery;
	}();

	var queryObject = exports.queryObject = new ImmutableQuery();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	var fbemitter = {
	  EventEmitter: __webpack_require__(10),
	  EmitterSubscription : __webpack_require__(11)
	};

	module.exports = fbemitter;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BaseEventEmitter
	 * @typechecks
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EmitterSubscription = __webpack_require__(11);
	var EventSubscriptionVendor = __webpack_require__(13);

	var emptyFunction = __webpack_require__(15);
	var invariant = __webpack_require__(14);

	/**
	 * @class BaseEventEmitter
	 * @description
	 * An EventEmitter is responsible for managing a set of listeners and publishing
	 * events to them when it is told that such events happened. In addition to the
	 * data for the given event it also sends a event control object which allows
	 * the listeners/handlers to prevent the default behavior of the given event.
	 *
	 * The emitter is designed to be generic enough to support all the different
	 * contexts in which one might want to emit events. It is a simple multicast
	 * mechanism on top of which extra functionality can be composed. For example, a
	 * more advanced emitter may use an EventHolder and EventFactory.
	 */

	var BaseEventEmitter = (function () {
	  /**
	   * @constructor
	   */

	  function BaseEventEmitter() {
	    _classCallCheck(this, BaseEventEmitter);

	    this._subscriber = new EventSubscriptionVendor();
	    this._currentSubscription = null;
	  }

	  /**
	   * Adds a listener to be invoked when events of the specified type are
	   * emitted. An optional calling context may be provided. The data arguments
	   * emitted will be passed to the listener function.
	   *
	   * TODO: Annotate the listener arg's type. This is tricky because listeners
	   *       can be invoked with varargs.
	   *
	   * @param {string} eventType - Name of the event to listen to
	   * @param {function} listener - Function to invoke when the specified event is
	   *   emitted
	   * @param {*} context - Optional context object to use when invoking the
	   *   listener
	   */

	  BaseEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {
	    return this._subscriber.addSubscription(eventType, new EmitterSubscription(this._subscriber, listener, context));
	  };

	  /**
	   * Similar to addListener, except that the listener is removed after it is
	   * invoked once.
	   *
	   * @param {string} eventType - Name of the event to listen to
	   * @param {function} listener - Function to invoke only once when the
	   *   specified event is emitted
	   * @param {*} context - Optional context object to use when invoking the
	   *   listener
	   */

	  BaseEventEmitter.prototype.once = function once(eventType, listener, context) {
	    var emitter = this;
	    return this.addListener(eventType, function () {
	      emitter.removeCurrentListener();
	      listener.apply(context, arguments);
	    });
	  };

	  /**
	   * Removes all of the registered listeners, including those registered as
	   * listener maps.
	   *
	   * @param {?string} eventType - Optional name of the event whose registered
	   *   listeners to remove
	   */

	  BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {
	    this._subscriber.removeAllSubscriptions(eventType);
	  };

	  /**
	   * Provides an API that can be called during an eventing cycle to remove the
	   * last listener that was invoked. This allows a developer to provide an event
	   * object that can remove the listener (or listener map) during the
	   * invocation.
	   *
	   * If it is called when not inside of an emitting cycle it will throw.
	   *
	   * @throws {Error} When called not during an eventing cycle
	   *
	   * @example
	   *   var subscription = emitter.addListenerMap({
	   *     someEvent: function(data, event) {
	   *       console.log(data);
	   *       emitter.removeCurrentListener();
	   *     }
	   *   });
	   *
	   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
	   *   emitter.emit('someEvent', 'def'); // does not log anything
	   */

	  BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {
	    !!!this._currentSubscription ? (undefined) !== 'production' ? invariant(false, 'Not in an emitting cycle; there is no current subscription') : invariant(false) : undefined;
	    this._subscriber.removeSubscription(this._currentSubscription);
	  };

	  /**
	   * Returns an array of listeners that are currently registered for the given
	   * event.
	   *
	   * @param {string} eventType - Name of the event to query
	   * @return {array}
	   */

	  BaseEventEmitter.prototype.listeners = function listeners(eventType) /* TODO: Array<EventSubscription> */{
	    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
	    return subscriptions ? subscriptions.filter(emptyFunction.thatReturnsTrue).map(function (subscription) {
	      return subscription.listener;
	    }) : [];
	  };

	  /**
	   * Emits an event of the given type with the given data. All handlers of that
	   * particular type will be notified.
	   *
	   * @param {string} eventType - Name of the event to emit
	   * @param {*} Arbitrary arguments to be passed to each registered listener
	   *
	   * @example
	   *   emitter.addListener('someEvent', function(message) {
	   *     console.log(message);
	   *   });
	   *
	   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
	   */

	  BaseEventEmitter.prototype.emit = function emit(eventType) {
	    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
	    if (subscriptions) {
	      var keys = Object.keys(subscriptions);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var key = keys[ii];
	        var subscription = subscriptions[key];
	        // The subscription may have been removed during this event loop.
	        if (subscription) {
	          this._currentSubscription = subscription;
	          this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));
	        }
	      }
	      this._currentSubscription = null;
	    }
	  };

	  /**
	   * Provides a hook to override how the emitter emits an event to a specific
	   * subscription. This allows you to set up logging and error boundaries
	   * specific to your environment.
	   *
	   * @param {EmitterSubscription} subscription
	   * @param {string} eventType
	   * @param {*} Arbitrary arguments to be passed to each registered listener
	   */

	  BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {
	    var args = Array.prototype.slice.call(arguments, 2);
	    subscription.listener.apply(subscription.context, args);
	  };

	  return BaseEventEmitter;
	})();

	module.exports = BaseEventEmitter;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 * 
	 * @providesModule EmitterSubscription
	 * @typechecks
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EventSubscription = __webpack_require__(12);

	/**
	 * EmitterSubscription represents a subscription with listener and context data.
	 */

	var EmitterSubscription = (function (_EventSubscription) {
	  _inherits(EmitterSubscription, _EventSubscription);

	  /**
	   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
	   *   this subscription
	   * @param {function} listener - Function to invoke when the specified event is
	   *   emitted
	   * @param {*} context - Optional context object to use when invoking the
	   *   listener
	   */

	  function EmitterSubscription(subscriber, listener, context) {
	    _classCallCheck(this, EmitterSubscription);

	    _EventSubscription.call(this, subscriber);
	    this.listener = listener;
	    this.context = context;
	  }

	  return EmitterSubscription;
	})(EventSubscription);

	module.exports = EmitterSubscription;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventSubscription
	 * @typechecks
	 */

	'use strict';

	/**
	 * EventSubscription represents a subscription to a particular event. It can
	 * remove its own subscription.
	 */

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EventSubscription = (function () {

	  /**
	   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
	   *   this subscription.
	   */

	  function EventSubscription(subscriber) {
	    _classCallCheck(this, EventSubscription);

	    this.subscriber = subscriber;
	  }

	  /**
	   * Removes this subscription from the subscriber that controls it.
	   */

	  EventSubscription.prototype.remove = function remove() {
	    if (this.subscriber) {
	      this.subscriber.removeSubscription(this);
	      this.subscriber = null;
	    }
	  };

	  return EventSubscription;
	})();

	module.exports = EventSubscription;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 * 
	 * @providesModule EventSubscriptionVendor
	 * @typechecks
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(14);

	/**
	 * EventSubscriptionVendor stores a set of EventSubscriptions that are
	 * subscribed to a particular event type.
	 */

	var EventSubscriptionVendor = (function () {
	  function EventSubscriptionVendor() {
	    _classCallCheck(this, EventSubscriptionVendor);

	    this._subscriptionsForType = {};
	    this._currentSubscription = null;
	  }

	  /**
	   * Adds a subscription keyed by an event type.
	   *
	   * @param {string} eventType
	   * @param {EventSubscription} subscription
	   */

	  EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {
	    !(subscription.subscriber === this) ? (undefined) !== 'production' ? invariant(false, 'The subscriber of the subscription is incorrectly set.') : invariant(false) : undefined;
	    if (!this._subscriptionsForType[eventType]) {
	      this._subscriptionsForType[eventType] = [];
	    }
	    var key = this._subscriptionsForType[eventType].length;
	    this._subscriptionsForType[eventType].push(subscription);
	    subscription.eventType = eventType;
	    subscription.key = key;
	    return subscription;
	  };

	  /**
	   * Removes a bulk set of the subscriptions.
	   *
	   * @param {?string} eventType - Optional name of the event type whose
	   *   registered supscriptions to remove, if null remove all subscriptions.
	   */

	  EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
	    if (eventType === undefined) {
	      this._subscriptionsForType = {};
	    } else {
	      delete this._subscriptionsForType[eventType];
	    }
	  };

	  /**
	   * Removes a specific subscription. Instead of calling this function, call
	   * `subscription.remove()` directly.
	   *
	   * @param {object} subscription
	   */

	  EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {
	    var eventType = subscription.eventType;
	    var key = subscription.key;

	    var subscriptionsForType = this._subscriptionsForType[eventType];
	    if (subscriptionsForType) {
	      delete subscriptionsForType[key];
	    }
	  };

	  /**
	   * Returns the array of subscriptions that are currently registered for the
	   * given event type.
	   *
	   * Note: This array can be potentially sparse as subscriptions are deleted
	   * from it when they are removed.
	   *
	   * TODO: This returns a nullable array. wat?
	   *
	   * @param {string} eventType
	   * @return {?array}
	   */

	  EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
	    return this._subscriptionsForType[eventType];
	  };

	  return EventSubscriptionVendor;
	})();

	module.exports = EventSubscriptionVendor;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.setConfigObject = setConfigObject;
	exports.getMapStyle = getMapStyle;

	var _require = __webpack_require__(9);

	var EventEmitter = _require.EventEmitter;
	var sensorEmitter = exports.sensorEmitter = new EventEmitter();
	var appbaseRef = exports.appbaseRef = void 0;
	var appbaseConfig = exports.appbaseConfig = void 0;
	function setConfigObject(config) {
		exports.appbaseConfig = appbaseConfig = config.appbase;
		// appbaseRef = new Appbase({
		// 	url: 'https://scalr.api.appbase.io',
		// 	appname: config.appbase.appname,
		// 	username: config.appbase.username,
		// 	password: config.appbase.password
		// });
		return appbaseRef;
	};
	var mapStyles = exports.mapStyles = [{
		key: 'Standard',
		value: __webpack_require__(17)
	}, {
		key: 'Blue Essence',
		value: __webpack_require__(18)
	}, {
		key: 'Blue Water',
		value: __webpack_require__(19)
	}, {
		key: 'Flat Map',
		value: __webpack_require__(20)
	}, {
		key: 'Light Monochrome',
		value: __webpack_require__(21)
	}, {
		key: 'Midnight Commander',
		value: __webpack_require__(22)
	}, {
		key: 'Unsaturated Browns',
		value: __webpack_require__(23)
	}];
	function getMapStyle(styleName) {
		var selectedStyle = mapStyles.filter(function (style) {
			return style.key === styleName;
		});
		if (selectedStyle.length) {
			return selectedStyle[0].value;
		} else {
			return null;
		}
	}
	var watchForDependencyChange = exports.watchForDependencyChange = function watchForDependencyChange(depends, previousSelectedSensor, cb, channelId) {
		var self = this;
		var selectedSensor = {};
		// check if depend object already exists
		var checkDependExists = function checkDependExists(depend) {
			if (!previousSelectedSensor.hasOwnProperty(depend)) {
				previousSelectedSensor[depend] = '';
			}
		};
		// apply depend changes when new value received
		var applyDependChange = function applyDependChange(depends, depend) {
			if (selectedSensor[depend] && _typeof(selectedSensor[depend]) === 'object') {
				previousSelectedSensor[depend] = JSON.parse(JSON.stringify(selectedSensor[depend]));
			} else {
				previousSelectedSensor[depend] = selectedSensor[depend];
			}
			if (!depends[depend].doNotExecute) {
				cb(depend, channelId);
			}
		};

		// initialize the process
		var init = function init() {
			for (var depend in depends) {
				checkDependExists(depend);
				if (_typeof(selectedSensor[depend]) === 'object') {
					if (JSON.stringify(selectedSensor[depend]) !== JSON.stringify(previousSelectedSensor[depend])) {
						applyDependChange(depends, depend);
					}
				} else {
					if (selectedSensor[depend] !== previousSelectedSensor[depend]) {
						applyDependChange(depends, depend);
					}
				}
			}
		};

		sensorEmitter.addListener('sensorChange', function (data) {
			selectedSensor = data;
			init();
		});
	};

	function selectedSensorFn() {
		var self = this;
		this.selectedSensor = {};
		this.sensorInfo = {};
		this.sortInfo = {};

		// Get
		var get = function get(prop, obj) {
			if (obj) {
				return self[obj][prop];
			} else {
				if (prop) {
					return self.selectedSensor[prop];
				} else {
					return self.selectedSensor;
				}
			}
		};

		// Set
		var set = function set(obj) {
			var isExecuteUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			self.selectedSensor[obj.key] = obj.value;
			if (isExecuteUpdate) {
				sensorEmitter.emit('sensorChange', self.selectedSensor);
			}
		};

		// Set fieldname
		var setSensorInfo = function setSensorInfo(obj) {
			self.sensorInfo[obj.key] = obj.value;
		};

		// Set sort info
		var setSortInfo = function setSortInfo(obj) {
			self.sortInfo[obj.key] = obj.value;
		};

		return {
			get: get,
			set: set,
			setSensorInfo: setSensorInfo,
			setSortInfo: setSortInfo
		};
	};
	var selectedSensor = exports.selectedSensor = new selectedSensorFn();

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/61/blue-essence
	module.exports = [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/25/blue-water
	module.exports = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }];

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/53/flat-map
	module.exports = [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#f3f4f4" }] }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "weight": 0.9 }, { "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#83cead" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#fee379" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#fee379" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#7fc8ed" }] }];

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/29/light-monochrome
	module.exports = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/2/midnight-commander
	module.exports = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 13 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#08304b" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#0c4152" }, { "lightness": 5 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b434f" }, { "lightness": 25 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b3d51" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "color": "#146474" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#021019" }] }];

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	// https://snazzymaps.com/style/70/unsaturated-browns
	module.exports = [{ "elementType": "geometry", "stylers": [{ "hue": "#ff4400" }, { "saturation": -68 }, { "lightness": -4 }, { "gamma": 0.72 }] }, { "featureType": "road", "elementType": "labels.icon" }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "hue": "#0077ff" }, { "gamma": 3.1 }] }, { "featureType": "water", "stylers": [{ "hue": "#00ccff" }, { "gamma": 0.44 }, { "saturation": -33 }] }, { "featureType": "poi.park", "stylers": [{ "hue": "#44ff00" }, { "saturation": -23 }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "hue": "#007fff" }, { "gamma": 0.77 }, { "saturation": 65 }, { "lightness": 99 }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "gamma": 0.11 }, { "weight": 5.6 }, { "saturation": 99 }, { "hue": "#0091ff" }, { "lightness": -86 }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "lightness": -48 }, { "hue": "#ff5e00" }, { "gamma": 1.2 }, { "saturation": -23 }] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -64 }, { "hue": "#ff9100" }, { "lightness": 16 }, { "gamma": 0.47 }, { "weight": 2.7 }] }];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(9);

	var EventEmitter = _require.EventEmitter;

	var helper = __webpack_require__(16);

	var channelManager = function () {
		function channelManager() {
			_classCallCheck(this, channelManager);

			this.emitter = new EventEmitter();
			this.channels = {};
			this.streamRef = {};
			this.queryOptions = {};
			this.appbaseConfig = {};
			this.receive = this.receive.bind(this);
			this.nextPage = this.nextPage.bind(this);
		}

		_createClass(channelManager, [{
			key: 'setConfig',
			value: function setConfig(config) {
				this.config = config;
			}

			// Receive: This method will be executed whenever dependency value changes
			// It receives which dependency changes and which channeldId should be affected.

		}, {
			key: 'receive',
			value: function receive(depend, channelId) {
				var _this = this;

				var queryOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var self = this;
				var channelObj = this.channels[channelId];
				var queryObj = void 0;
				if (!queryOptions) {
					queryObj = this.queryBuild(channelObj.depends, channelObj.previousSelectedSensor, channelObj.size, channelObj.from);
					this.queryOptions[channelId] = channelObj.previousSelectedSensor['channel-options-' + channelId];
				} else {
					queryObj = this.queryBuild(channelObj.depends, queryOptions, channelObj.size, channelObj.from);
				}
				var validQuery = true;
				try {
					validQuery = !queryObj.body.aggs && queryObj.body.query.bool.should.length === 0 ? false : true;
				} catch (e) {}

				if (validQuery) {
					(function () {
						var channelResponse = {
							startTime: new Date().getTime(),
							appliedQuery: queryObj
						};
						var appbaseRef = _this.appbaseConfig[channelId];
						if (appbaseRef) {
							// apply search query and emit historic queryResult
							appbaseRef.search(queryObj).on('data', function (data) {
								channelResponse.method = 'historic';
								channelResponse.data = data;
								self.emitter.emit(channelId, channelResponse);
							}).on('error', function (error) {
								console.log(error);
							});
							// apply searchStream query and emit streaming data
							if (_this.streamRef[channelId]) {
								_this.streamRef[channelId].stop();
							}
							_this.streamRef[channelId] = appbaseRef.searchStream(queryObj).on('data', function (data) {
								var obj = {
									method: 'stream',
									data: data,
									appliedQuery: queryObj
								};
								self.emitter.emit(channelId, obj);
							}).on('error', function (error) {
								console.log(error);
							});
						} else {
							console.error('appbaseRef is not set for ' + channelId);
						}
					})();
				} else {
					var obj = {
						method: 'historic',
						data: {
							_shards: {},
							hits: {
								hits: []
							}
						},
						appliedQuery: queryObj
					};
					self.emitter.emit(channelId, obj);
				}
			}

			// queryBuild
			// Builds the query by using depends object and values of sensor

		}, {
			key: 'queryBuild',
			value: function queryBuild(depends, previousSelectedSensor, size) {
				var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var aggs = null;
				var mustArray = [];
				var shouldArray = [];
				var requestOptions = {};
				var sortObj = [];
				for (var depend in depends) {
					if (depend === 'aggs') {
						aggs = aggsQuery(depend);
					} else if (depend.indexOf('channel-options-') > -1) {
						requestOptions = previousSelectedSensor[depend];
					} else {
						var queryObj = null;
						if (depends[depend].defaultQuery) {
							queryObj = depends[depend].defaultQuery(previousSelectedSensor[depend]);
						} else {
							queryObj = singleQuery(depend);
						}
						if (queryObj) {
							if (depends[depend].operation === 'must') {
								mustArray.push(queryObj);
							} else if (depends[depend].operation === 'should') {
								shouldArray.push(queryObj);
							}
						}
					}
					var sortField = sortAvailbale(depend);
					if (sortField) {
						sortObj.push(sortField);
					}
				}

				// check if sortinfo is availbale
				function sortAvailbale(depend) {
					var sortInfo = helper.selectedSensor.get(depend, 'sortInfo');
					return sortInfo;
				}

				// build single query or if default query present in sensor itself use that
				function singleQuery(depend) {
					var sensorInfo = helper.selectedSensor.get(depend, 'sensorInfo');
					var s_query = null;
					if (sensorInfo && sensorInfo.defaultQuery) {
						s_query = sensorInfo.defaultQuery(previousSelectedSensor[depend]);
					} else if (previousSelectedSensor[depend]) {
						s_query = {};
						s_query[sensorInfo.queryType] = {};
						s_query[sensorInfo.queryType][sensorInfo.inputData] = previousSelectedSensor[depend];
					}
					return s_query;
				}

				function aggsQuery(depend) {
					var aggsObj = depends[depend];
					var order = void 0,
					    type = void 0;
					if (aggsObj.sort == "count") {
						order = "desc";
						type = "_count";
					} else if (aggsObj.sort == "asc") {
						order = "asc";
						type = "_term";
					} else {
						order = "desc";
						type = "_term";
					}
					var orderQuery = '{ \n\t\t\t\t"' + type + '" : "' + order + '" \n\t\t\t}';
					return JSON.parse('{\n\t\t\t\t"' + aggsObj.key + '": {\n\t\t\t\t\t"terms": {\n\t\t\t\t\t\t"field": "' + aggsObj.key + '",\n\t\t\t\t\t\t"size": ' + aggsObj.size + ',\n\t\t\t\t\t\t"order": ' + orderQuery + '\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}');
				}
				if (mustArray.length) {
					var mustObject = {
						bool: {
							must: mustArray
						}
					};
					shouldArray.push(mustObject);
				}

				var query = {
					type: this.config.type,
					body: {
						"query": {
							"bool": {
								"should": shouldArray,
								"minimum_should_match": 1
							}
						}
					}
				};
				if (aggs) {
					query.body.aggs = aggs;
				}
				if (sortObj && sortObj.length) {
					query.body.sort = sortObj;
				}
				// apply request options
				if (requestOptions && Object.keys(requestOptions).length) {
					for (var reqOption in requestOptions) {
						query.body[reqOption] = requestOptions[reqOption];
					}
				}
				return query;
			}
		}, {
			key: 'nextPage',
			value: function nextPage(channelId) {
				var channelObj = this.channels[channelId];
				var queryOptions = JSON.parse(JSON.stringify(this.channels[channelId].previousSelectedSensor));
				var channelOptionsObj = channelObj.previousSelectedSensor['channel-options-' + channelId];
				var options = {
					size: this.queryOptions[channelId].size,
					from: this.queryOptions[channelId].from + this.queryOptions[channelId].size
				};
				queryOptions['channel-options-' + channelId] = JSON.parse(JSON.stringify(options));
				// queryOptions['channel-options-'+channelId].from += 1;
				this.queryOptions[channelId] = options;
				this.receive('channel-options-' + channelId, channelId, queryOptions);
			}

			// Create the channel by passing depends
			// if depends are same it will create single channel for them

		}, {
			key: 'create',
			value: function create(config, depends) {
				var _this2 = this;

				var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
				var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var channelId = btoa(JSON.stringify(depends));
				var optionValues = {
					size: size,
					from: from
				};
				this.queryOptions[channelId] = optionValues;
				this.appbaseConfig[channelId] = this.setAppbaseRef(config);
				depends['channel-options-' + channelId] = optionValues;
				var previousSelectedSensor = _defineProperty({}, 'channel-options-' + channelId, optionValues);
				var obj = {
					key: 'channel-options-' + channelId,
					value: optionValues
				};
				helper.selectedSensor.set(obj);
				if (!this.channels.hasOwnProperty(channelId)) {
					this.channels[channelId] = {
						depends: depends,
						size: size,
						from: from,
						previousSelectedSensor: previousSelectedSensor
					};
					helper.watchForDependencyChange(depends, this.channels[channelId].previousSelectedSensor, this.receive, channelId);
				}
				setTimeout(function () {
					if (depends.hasOwnProperty('aggs')) {
						_this2.receive('aggs', channelId);
					}
				}, 100);
				return {
					channelId: channelId,
					emitter: this.emitter
				};
			}

			// set appbase ref

		}, {
			key: 'setAppbaseRef',
			value: function setAppbaseRef(config) {
				return new Appbase({
					url: 'https://scalr.api.appbase.io',
					appname: config.appbase.appname,
					username: config.appbase.username,
					password: config.appbase.password
				});
			}
		}]);

		return channelManager;
	}();

	;
	var manager = exports.manager = new channelManager();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StaticSearch = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StaticSearch = exports.StaticSearch = function (_Component) {
		_inherits(StaticSearch, _Component);

		function StaticSearch(props) {
			_classCallCheck(this, StaticSearch);

			var _this = _possibleConstructorReturn(this, (StaticSearch.__proto__ || Object.getPrototypeOf(StaticSearch)).call(this, props));

			_this.state = {
				searchValue: ''
			};
			_this.handleChange = _this.handleChange.bind(_this);
			return _this;
		}

		_createClass(StaticSearch, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {}
		}, {
			key: 'handleChange',
			value: function handleChange(event) {
				var value = event.target.value;
				this.setState({
					searchValue: value
				}, function () {
					this.props.changeCallback(this.state.searchValue);
				}.bind(this));
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'col s12 col-xs-12 staticSearchContainer inputBox' },
					_react2.default.createElement('input', { type: 'text', className: 'col s12 col-xs-12 form-control',
						value: this.state.searchValue,
						placeholder: this.props.placeholder,
						onChange: this.handleChange })
				);
			}
		}]);

		return StaticSearch;
	}(_react.Component);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppbaseSlider = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ImmutableQuery = __webpack_require__(8);

	var _ChannelManager = __webpack_require__(24);

	var _HistoGram = __webpack_require__(27);

	var _rcSlider = __webpack_require__(39);

	var _rcSlider2 = _interopRequireDefault(_rcSlider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);
	var Style = __webpack_require__(6);

	var AppbaseSlider = exports.AppbaseSlider = function (_Component) {
		_inherits(AppbaseSlider, _Component);

		function AppbaseSlider(props, context) {
			_classCallCheck(this, AppbaseSlider);

			var _this = _possibleConstructorReturn(this, (AppbaseSlider.__proto__ || Object.getPrototypeOf(AppbaseSlider)).call(this, props));

			var minThreshold = _this.props.minThreshold ? _this.props.minThreshold : 0;
			var maxThreshold = _this.props.maxThreshold ? _this.props.maxThreshold : 5;
			var values = {};
			values.min = _this.props.values.min < _this.props.minThreshold ? _this.props.minThreshold : _this.props.values.min;
			values.max = _this.props.values.max < _this.props.maxThreshold ? _this.props.maxThreshold : _this.props.values.max;
			_this.state = {
				values: values,
				minThreshold: minThreshold,
				maxThreshold: maxThreshold,
				currentValues: [],
				counts: [],
				rawData: {
					hits: {
						hits: []
					}
				}
			};
			_this.type = 'range';
			_this.handleValuesChange = _this.handleValuesChange.bind(_this);
			_this.handleResults = _this.handleResults.bind(_this);
			return _this;
		}
		// Get the items from Appbase when component is mounted


		_createClass(AppbaseSlider, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
				this.createChannel();
			}
			// Handle function when value slider option is changing

		}, {
			key: 'handleValuesChange',
			value: function handleValuesChange(component, values) {
				this.setState({
					values: values
				});
			}
			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				// Set the depends - add self aggs query as well with depends
				var depends = this.props.depends ? this.props.depends : {};
				depends['aggs'] = {
					key: this.props.inputData,
					sort: this.props.sort,
					size: this.props.size
				};
				// create a channel and listen the changes
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
				channelObj.emitter.addListener(channelObj.channelId, function (res) {
					var data = res.data;
					var rawData = void 0;
					if (res.method === 'stream') {
						rawData = this.state.rawData;
						rawData.hits.hits.push(res.data);
					} else if (res.method === 'historic') {
						rawData = data;
					}
					this.setState({
						rawData: rawData
					});
					this.setData(data);
				}.bind(this));
			}
		}, {
			key: 'setData',
			value: function setData(data) {
				try {
					this.addItemsToList(eval('data.aggregations["' + this.props.inputData + '"].buckets'));
				} catch (e) {
					console.log(e);
				}
			}
		}, {
			key: 'addItemsToList',
			value: function addItemsToList(newItems) {
				var _this2 = this;

				newItems = _.orderBy(newItems, ['key'], ['asc']);
				var itemLength = newItems.length;
				var min = this.props.minThreshold ? this.props.minThreshold : newItems[0].key;
				var max = this.props.maxThreshold ? this.props.maxThreshold : newItems[itemLength - 1].key;
				if (itemLength > 1) {
					(function () {
						var rangeValue = {
							counts: _this2.countCalc(min, max, newItems),
							minThreshold: min,
							maxThreshold: max,
							values: {
								min: min,
								max: max
							}
						};
						_this2.setState(rangeValue, function () {
							this.handleResults(null, rangeValue.values);
						}.bind(_this2));
					})();
				}
			}
		}, {
			key: 'countCalc',
			value: function countCalc(min, max, newItems) {
				var counts = [];
				for (var i = min; i <= max; i++) {
					var item = _.find(newItems, { 'key': i });
					var val = item ? item.doc_count : 0;
					counts.push(val);
				}
				return counts;
			}
			// Handle function when slider option change is completed

		}, {
			key: 'handleResults',
			value: function handleResults(textVal, value) {
				var values = void 0;
				if (textVal) {
					values = {
						min: textVal[0],
						max: textVal[1]
					};
				} else {
					values = value;
				}
				var real_values = {
					from: values.min,
					to: values.max
				};
				var obj = {
					key: this.props.sensorId,
					value: real_values
				};
				helper.selectedSensor.set(obj, true);
				this.setState({
					currentValues: values,
					values: values
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var title = null,
				    histogram = null,
				    titleExists = false;

				if (this.props.title) {
					titleExists = true;
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle col s12 col-xs-12' },
						this.props.title
					);
				}
				if (this.state.counts && this.state.counts.length) {
					histogram = _react2.default.createElement(_HistoGram.HistoGramComponent, { data: this.state.counts });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'reactiveComponent sliderComponent card thumbnail col s12 col-xs-12' },
					title,
					histogram,
					_react2.default.createElement(
						'div',
						{ className: 'inputRangeContainer col s12 col-xs-12', style: { 'margin': '25px 0' } },
						_react2.default.createElement(_rcSlider2.default, { range: true,
							defaultValue: [this.state.values.min, this.state.values.max],
							min: this.state.minThreshold,
							max: this.state.maxThreshold,
							onAfterChange: this.handleResults
						})
					)
				);
			}
		}]);

		return AppbaseSlider;
	}(_react.Component);

	AppbaseSlider.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		minThreshold: _react2.default.PropTypes.number,
		maxThreshold: _react2.default.PropTypes.number,
		values: _react2.default.PropTypes.object
	};

	AppbaseSlider.defaultProps = {
		values: {
			min: 0,
			max: 10
		},
		sort: 'count',
		size: 60,
		title: null
	};

	// context type
	AppbaseSlider.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Bar = exports.HistoGramComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactTooltip = __webpack_require__(28);

	var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HistoGramComponent = exports.HistoGramComponent = function (_Component) {
		_inherits(HistoGramComponent, _Component);

		function HistoGramComponent(props) {
			_classCallCheck(this, HistoGramComponent);

			var _this = _possibleConstructorReturn(this, (HistoGramComponent.__proto__ || Object.getPrototypeOf(HistoGramComponent)).call(this, props));

			_this.style = {
				barContainer: {
					position: 'relative',
					height: '50px',
					width: '100%'
				}
			};
			return _this;
		}

		_createClass(HistoGramComponent, [{
			key: 'createBars',
			value: function createBars() {
				var max = _.max(this.props.data);
				var dataLength = this.props.data.length;
				var bars = null;
				var data = this.props.data.map(function (val) {
					var res = {
						height: 0,
						count: 0,
						width: 100 / dataLength
					};
					try {
						res.height = 100 * val / max;
						res.count = val;
						res.width = 100 / dataLength;
					} catch (e) {
						console.log(e);
					}
					return res;
				});
				if (dataLength) {
					bars = data.map(function (val, index) {
						return _react2.default.createElement(Bar, { key: index, element: val });
					});
				}
				return bars;
			}
		}, {
			key: 'render',
			value: function render() {
				var bars = this.createBars();
				return _react2.default.createElement(
					'div',
					{ className: 'barContainer col s12 col-xs-12', style: this.style.barContainer },
					bars
				);
			}
		}]);

		return HistoGramComponent;
	}(_react.Component);

	var Bar = exports.Bar = function (_Component2) {
		_inherits(Bar, _Component2);

		function Bar(props) {
			_classCallCheck(this, Bar);

			var _this2 = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props));

			_this2.style = {
				bar: {
					display: 'block',
					width: '100%',
					height: '100%'
				}
			};
			return _this2;
		}

		_createClass(Bar, [{
			key: 'render',
			value: function render() {
				var element = this.props.element;
				var barStyle = {
					height: element.height + '%',
					width: element.width + '%',
					display: 'inline-block',
					background: '#efefef',
					position: 'relative'
				};
				return _react2.default.createElement(
					'span',
					{ className: 'barChild', style: barStyle },
					_react2.default.createElement('span', { className: 'bar', style: this.style.bar,
						'data-tip': element.count,
						title: element.count }),
					_react2.default.createElement(_reactTooltip2.default, null)
				);
			}
		}]);

		return Bar;
	}(_react.Component);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _class2, _temp;

	/* Decoraters */


	/* Utils */


	/* CSS */


	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _staticMethods = __webpack_require__(30);

	var _staticMethods2 = _interopRequireDefault(_staticMethods);

	var _windowListener = __webpack_require__(32);

	var _windowListener2 = _interopRequireDefault(_windowListener);

	var _customEvent = __webpack_require__(33);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	var _isCapture = __webpack_require__(34);

	var _isCapture2 = _interopRequireDefault(_isCapture);

	var _getPosition = __webpack_require__(35);

	var _getPosition2 = _interopRequireDefault(_getPosition);

	var _getTipContent = __webpack_require__(36);

	var _getTipContent2 = _interopRequireDefault(_getTipContent);

	var _aria = __webpack_require__(37);

	var _style = __webpack_require__(38);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactTooltip = (0, _staticMethods2.default)(_class = (0, _windowListener2.default)(_class = (0, _customEvent2.default)(_class = (0, _isCapture2.default)(_class = (_temp = _class2 = function (_Component) {
	  _inherits(ReactTooltip, _Component);

	  function ReactTooltip(props) {
	    _classCallCheck(this, ReactTooltip);

	    var _this = _possibleConstructorReturn(this, (ReactTooltip.__proto__ || Object.getPrototypeOf(ReactTooltip)).call(this, props));

	    _this.state = {
	      place: 'top', // Direction of tooltip
	      type: 'dark', // Color theme of tooltip
	      effect: 'float', // float or fixed
	      show: false,
	      border: false,
	      placeholder: '',
	      offset: {},
	      extraClass: '',
	      html: false,
	      delayHide: 0,
	      delayShow: 0,
	      event: props.event || null,
	      eventOff: props.eventOff || null,
	      currentEvent: null, // Current mouse event
	      currentTarget: null, // Current target of mouse event
	      ariaProps: (0, _aria.parseAria)(props), // aria- and role attributes
	      isEmptyTip: false,
	      disable: false
	    };

	    _this.bind(['showTooltip', 'updateTooltip', 'hideTooltip', 'globalRebuild', 'globalShow', 'globalHide', 'onWindowResize']);

	    _this.mount = true;
	    _this.delayShowLoop = null;
	    _this.delayHideLoop = null;
	    _this.intervalUpdateContent = null;
	    return _this;
	  }

	  /**
	   * For unify the bind and unbind listener
	   */


	  _createClass(ReactTooltip, [{
	    key: 'bind',
	    value: function bind(methodArray) {
	      var _this2 = this;

	      methodArray.forEach(function (method) {
	        _this2[method] = _this2[method].bind(_this2);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setStyleHeader(); // Set the style to the <link>
	      this.bindListener(); // Bind listener for tooltip
	      this.bindWindowEvents(this.props.resizeHide); // Bind global event for static method
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      var ariaProps = this.state.ariaProps;

	      var newAriaProps = (0, _aria.parseAria)(props);

	      var isChanged = Object.keys(newAriaProps).some(function (props) {
	        return newAriaProps[props] !== ariaProps[props];
	      });
	      if (isChanged) {
	        this.setState({ ariaProps: newAriaProps });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.mount = false;

	      this.clearTimer();

	      this.unbindListener();
	      this.removeScrollListener();
	      this.unbindWindowEvents();
	    }

	    /**
	     * Pick out corresponded target elements
	     */

	  }, {
	    key: 'getTargetArray',
	    value: function getTargetArray(id) {
	      var targetArray = void 0;

	      if (!id) {
	        targetArray = document.querySelectorAll('[data-tip]:not([data-for])');
	      } else {
	        targetArray = document.querySelectorAll('[data-tip][data-for="' + id + '"]');
	      }

	      // targetArray is a NodeList, convert it to a real array
	      // I hope I can use Object.values...
	      return Object.keys(targetArray).filter(function (key) {
	        return key !== 'length';
	      }).map(function (key) {
	        return targetArray[key];
	      });
	    }

	    /**
	     * Bind listener to the target elements
	     * These listeners used to trigger showing or hiding the tooltip
	     */

	  }, {
	    key: 'bindListener',
	    value: function bindListener() {
	      var _this3 = this;

	      var _props = this.props;
	      var id = _props.id;
	      var globalEventOff = _props.globalEventOff;

	      var targetArray = this.getTargetArray(id);

	      targetArray.forEach(function (target) {
	        var isCaptureMode = _this3.isCapture(target);
	        if (target.getAttribute('currentItem') === null) {
	          target.setAttribute('currentItem', 'false');
	        }
	        _this3.unbindBasicListener(target);

	        if (_this3.isCustomEvent(target)) {
	          _this3.customBindListener(target);
	          return;
	        }

	        target.addEventListener('mouseenter', _this3.showTooltip, isCaptureMode);
	        if (_this3.state.effect === 'float') {
	          target.addEventListener('mousemove', _this3.updateTooltip, isCaptureMode);
	        }
	        target.addEventListener('mouseleave', _this3.hideTooltip, isCaptureMode);
	      });

	      // Global event to hide tooltip
	      if (globalEventOff) {
	        window.removeEventListener(globalEventOff, this.hideTooltip);
	        window.addEventListener(globalEventOff, this.hideTooltip, false);
	      }
	    }

	    /**
	     * Unbind listeners on target elements
	     */

	  }, {
	    key: 'unbindListener',
	    value: function unbindListener() {
	      var _this4 = this;

	      var _props2 = this.props;
	      var id = _props2.id;
	      var globalEventOff = _props2.globalEventOff;

	      var targetArray = this.getTargetArray(id);
	      targetArray.forEach(function (target) {
	        _this4.unbindBasicListener(target);
	        if (_this4.isCustomEvent(target)) _this4.customUnbindListener(target);
	      });

	      if (globalEventOff) window.removeEventListener(globalEventOff, this.hideTooltip);
	    }

	    /**
	     * Invoke this before bind listener and ummount the compont
	     * it is necessary to invloke this even when binding custom event
	     * so that the tooltip can switch between custom and default listener
	     */

	  }, {
	    key: 'unbindBasicListener',
	    value: function unbindBasicListener(target) {
	      target.removeEventListener('mouseenter', this.showTooltip);
	      target.removeEventListener('mousemove', this.updateTooltip);
	      target.removeEventListener('mouseleave', this.hideTooltip);
	    }

	    /**
	     * When mouse enter, show the tooltip
	     */

	  }, {
	    key: 'showTooltip',
	    value: function showTooltip(e, isGlobalCall) {
	      var _this5 = this;

	      if (isGlobalCall) {
	        // Don't trigger other elements belongs to other ReactTooltip
	        var targetArray = this.getTargetArray(this.props.id);
	        var isMyElement = targetArray.some(function (ele) {
	          return ele === e.currentTarget;
	        });
	        if (!isMyElement || this.state.show) return;
	      }
	      // Get the tooltip content
	      // calculate in this phrase so that tip width height can be detected
	      var _props3 = this.props;
	      var children = _props3.children;
	      var multiline = _props3.multiline;
	      var getContent = _props3.getContent;

	      var originTooltip = e.currentTarget.getAttribute('data-tip');
	      var isMultiline = e.currentTarget.getAttribute('data-multiline') || multiline || false;

	      // Generate tootlip content
	      var content = void 0;
	      if (getContent) {
	        if (Array.isArray(getContent)) {
	          content = getContent[0] && getContent[0]();
	        } else {
	          content = getContent();
	        }
	      }
	      var placeholder = (0, _getTipContent2.default)(originTooltip, children, content, isMultiline);
	      var isEmptyTip = typeof placeholder === 'string' && placeholder === '' || placeholder === null;

	      // If it is focus event or called by ReactTooltip.show, switch to `solid` effect
	      var switchToSolid = e instanceof window.FocusEvent || isGlobalCall;

	      // if it need to skip adding hide listener to scroll
	      var scrollHide = true;
	      if (e.currentTarget.getAttribute('data-scroll-hide')) {
	        scrollHide = e.currentTarget.getAttribute('data-scroll-hide') === 'true';
	      } else if (this.props.scrollHide != null) {
	        scrollHide = this.props.scrollHide;
	      }

	      this.setState({
	        placeholder: placeholder,
	        isEmptyTip: isEmptyTip,
	        place: e.currentTarget.getAttribute('data-place') || this.props.place || 'top',
	        type: e.currentTarget.getAttribute('data-type') || this.props.type || 'dark',
	        effect: switchToSolid && 'solid' || e.currentTarget.getAttribute('data-effect') || this.props.effect || 'float',
	        offset: e.currentTarget.getAttribute('data-offset') || this.props.offset || {},
	        html: e.currentTarget.getAttribute('data-html') ? e.currentTarget.getAttribute('data-html') === 'true' : this.props.html || false,
	        delayShow: e.currentTarget.getAttribute('data-delay-show') || this.props.delayShow || 0,
	        delayHide: e.currentTarget.getAttribute('data-delay-hide') || this.props.delayHide || 0,
	        border: e.currentTarget.getAttribute('data-border') ? e.currentTarget.getAttribute('data-border') === 'true' : this.props.border || false,
	        extraClass: e.currentTarget.getAttribute('data-class') || this.props.class || '',
	        disable: e.currentTarget.getAttribute('data-tip-disable') ? e.currentTarget.getAttribute('data-tip-disable') === 'true' : this.props.disable || false
	      }, function () {
	        if (scrollHide) _this5.addScrollListener(e);
	        _this5.updateTooltip(e);

	        if (getContent && Array.isArray(getContent)) {
	          _this5.intervalUpdateContent = setInterval(function () {
	            if (_this5.mount) {
	              var _getContent = _this5.props.getContent;

	              var _placeholder = (0, _getTipContent2.default)(originTooltip, _getContent[0](), isMultiline);
	              var _isEmptyTip = typeof _placeholder === 'string' && _placeholder === '';
	              _this5.setState({
	                placeholder: _placeholder,
	                isEmptyTip: _isEmptyTip
	              });
	            }
	          }, getContent[1]);
	        }
	      });
	    }

	    /**
	     * When mouse hover, updatetooltip
	     */

	  }, {
	    key: 'updateTooltip',
	    value: function updateTooltip(e) {
	      var _this6 = this;

	      var _state = this.state;
	      var delayShow = _state.delayShow;
	      var show = _state.show;
	      var isEmptyTip = _state.isEmptyTip;
	      var disable = _state.disable;
	      var afterShow = this.props.afterShow;
	      var placeholder = this.state.placeholder;

	      var delayTime = show ? 0 : parseInt(delayShow, 10);
	      var eventTarget = e.currentTarget;

	      if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
	      var updateState = function updateState() {
	        if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
	          (function () {
	            var isInvisible = !_this6.state.show;
	            _this6.setState({
	              currentEvent: e,
	              currentTarget: eventTarget,
	              show: true
	            }, function () {
	              _this6.updatePosition();
	              if (isInvisible && afterShow) afterShow();
	            });
	          })();
	        }
	      };

	      clearTimeout(this.delayShowLoop);
	      if (delayShow) {
	        this.delayShowLoop = setTimeout(updateState, delayTime);
	      } else {
	        updateState();
	      }
	    }

	    /**
	     * When mouse leave, hide tooltip
	     */

	  }, {
	    key: 'hideTooltip',
	    value: function hideTooltip(e, hasTarget) {
	      var _this7 = this;

	      var _state2 = this.state;
	      var delayHide = _state2.delayHide;
	      var isEmptyTip = _state2.isEmptyTip;
	      var disable = _state2.disable;
	      var afterHide = this.props.afterHide;

	      if (!this.mount) return;
	      if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
	      if (hasTarget) {
	        // Don't trigger other elements belongs to other ReactTooltip
	        var targetArray = this.getTargetArray(this.props.id);
	        var isMyElement = targetArray.some(function (ele) {
	          return ele === e.currentTarget;
	        });
	        if (!isMyElement || !this.state.show) return;
	      }
	      var resetState = function resetState() {
	        var isVisible = _this7.state.show;
	        _this7.setState({
	          show: false
	        }, function () {
	          _this7.removeScrollListener();
	          if (isVisible && afterHide) afterHide();
	        });
	      };

	      this.clearTimer();
	      if (delayHide) {
	        this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
	      } else {
	        resetState();
	      }
	    }

	    /**
	     * Add scroll eventlistener when tooltip show
	     * automatically hide the tooltip when scrolling
	     */

	  }, {
	    key: 'addScrollListener',
	    value: function addScrollListener(e) {
	      var isCaptureMode = this.isCapture(e.currentTarget);
	      window.addEventListener('scroll', this.hideTooltip, isCaptureMode);
	    }
	  }, {
	    key: 'removeScrollListener',
	    value: function removeScrollListener() {
	      window.removeEventListener('scroll', this.hideTooltip);
	    }

	    // Calculation the position

	  }, {
	    key: 'updatePosition',
	    value: function updatePosition() {
	      var _this8 = this;

	      var _state3 = this.state;
	      var currentEvent = _state3.currentEvent;
	      var currentTarget = _state3.currentTarget;
	      var place = _state3.place;
	      var effect = _state3.effect;
	      var offset = _state3.offset;

	      var node = _reactDom2.default.findDOMNode(this);
	      var result = (0, _getPosition2.default)(currentEvent, currentTarget, node, place, effect, offset);

	      if (result.isNewState) {
	        // Switch to reverse placement
	        return this.setState(result.newState, function () {
	          _this8.updatePosition();
	        });
	      }
	      // Set tooltip position
	      node.style.left = result.position.left + 'px';
	      node.style.top = result.position.top + 'px';
	    }

	    /**
	     * Set style tag in header
	     * in this way we can insert default css
	     */

	  }, {
	    key: 'setStyleHeader',
	    value: function setStyleHeader() {
	      if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-tooltip"]')) {
	        var tag = document.createElement('style');
	        tag.id = 'react-tooltip';
	        tag.innerHTML = _style2.default;
	        document.getElementsByTagName('head')[0].appendChild(tag);
	      }
	    }

	    /**
	     * CLear all kinds of timeout of interval
	     */

	  }, {
	    key: 'clearTimer',
	    value: function clearTimer() {
	      clearTimeout(this.delayShowLoop);
	      clearTimeout(this.delayHideLoop);
	      clearInterval(this.intervalUpdateContent);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state4 = this.state;
	      var placeholder = _state4.placeholder;
	      var extraClass = _state4.extraClass;
	      var html = _state4.html;
	      var ariaProps = _state4.ariaProps;
	      var disable = _state4.disable;
	      var isEmptyTip = _state4.isEmptyTip;

	      var tooltipClass = (0, _classnames2.default)('__react_component_tooltip', { 'show': this.state.show && !disable && !isEmptyTip }, { 'border': this.state.border }, { 'place-top': this.state.place === 'top' }, { 'place-bottom': this.state.place === 'bottom' }, { 'place-left': this.state.place === 'left' }, { 'place-right': this.state.place === 'right' }, { 'type-dark': this.state.type === 'dark' }, { 'type-success': this.state.type === 'success' }, { 'type-warning': this.state.type === 'warning' }, { 'type-error': this.state.type === 'error' }, { 'type-info': this.state.type === 'info' }, { 'type-light': this.state.type === 'light' });
	      if (html) {
	        return _react2.default.createElement('div', _extends({ className: tooltipClass + ' ' + extraClass
	        }, ariaProps, {
	          'data-id': 'tooltip',
	          dangerouslySetInnerHTML: { __html: placeholder } }));
	      } else {
	        return _react2.default.createElement(
	          'div',
	          _extends({ className: tooltipClass + ' ' + extraClass
	          }, ariaProps, {
	            'data-id': 'tooltip' }),
	          placeholder
	        );
	      }
	    }
	  }]);

	  return ReactTooltip;
	}(_react.Component), _class2.propTypes = {
	  children: _react.PropTypes.any,
	  place: _react.PropTypes.string,
	  type: _react.PropTypes.string,
	  effect: _react.PropTypes.string,
	  offset: _react.PropTypes.object,
	  multiline: _react.PropTypes.bool,
	  border: _react.PropTypes.bool,
	  class: _react.PropTypes.string,
	  id: _react.PropTypes.string,
	  html: _react.PropTypes.bool,
	  delayHide: _react.PropTypes.number,
	  delayShow: _react.PropTypes.number,
	  event: _react.PropTypes.string,
	  eventOff: _react.PropTypes.string,
	  watchWindow: _react.PropTypes.bool,
	  isCapture: _react.PropTypes.bool,
	  globalEventOff: _react.PropTypes.string,
	  getContent: _react.PropTypes.any,
	  afterShow: _react.PropTypes.func,
	  afterHide: _react.PropTypes.func,
	  disable: _react.PropTypes.bool,
	  scrollHide: _react.PropTypes.bool,
	  resizeHide: _react.PropTypes.bool
	}, _class2.defaultProps = {
	  resizeHide: true
	}, _temp)) || _class) || _class) || _class) || _class;

	/* export default not fit for standalone, it will exports {default:...} */


	module.exports = ReactTooltip;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (target) {
	  /**
	   * Hide all tooltip
	   * @trigger ReactTooltip.hide()
	   */
	  target.hide = function (target) {
	    dispatchGlobalEvent(_constant2.default.GLOBAL.HIDE, { target: target });
	  };

	  /**
	   * Rebuild all tooltip
	   * @trigger ReactTooltip.rebuild()
	   */
	  target.rebuild = function () {
	    dispatchGlobalEvent(_constant2.default.GLOBAL.REBUILD);
	  };

	  /**
	   * Show specific tooltip
	   * @trigger ReactTooltip.show()
	   */
	  target.show = function (target) {
	    dispatchGlobalEvent(_constant2.default.GLOBAL.SHOW, { target: target });
	  };

	  target.prototype.globalRebuild = function () {
	    if (this.mount) {
	      this.unbindListener();
	      this.bindListener();
	    }
	  };

	  target.prototype.globalShow = function (event) {
	    if (this.mount) {
	      // Create a fake event, specific show will limit the type to `solid`
	      // only `float` type cares e.clientX e.clientY
	      var e = { currentTarget: event.detail.target };
	      this.showTooltip(e, true);
	    }
	  };

	  target.prototype.globalHide = function (event) {
	    if (this.mount) {
	      var hasTarget = event && event.detail && event.detail.target && true || false;
	      this.hideTooltip({ currentTarget: hasTarget && event.detail.target }, hasTarget);
	    }
	  };
	};

	var _constant = __webpack_require__(31);

	var _constant2 = _interopRequireDefault(_constant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dispatchGlobalEvent = function dispatchGlobalEvent(eventName, opts) {
	  // Compatibale with IE
	  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
	  var event = void 0;

	  if (typeof window.CustomEvent === 'function') {
	    event = new window.CustomEvent(eventName, { detail: opts });
	  } else {
	    event = document.createEvent('Event');
	    event.initEvent(eventName, false, true, opts);
	  }

	  window.dispatchEvent(event);
	}; /**
	    * Static methods for react-tooltip
	    */

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  GLOBAL: {
	    HIDE: '__react_tooltip_hide_event',
	    REBUILD: '__react_tooltip_rebuild_event',
	    SHOW: '__react_tooltip_show_event'
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (target) {
	  target.prototype.bindWindowEvents = function (resizeHide) {
	    // ReactTooltip.hide
	    window.removeEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide);
	    window.addEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide, false);

	    // ReactTooltip.rebuild
	    window.removeEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild);
	    window.addEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild, false);

	    // ReactTooltip.show
	    window.removeEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow);
	    window.addEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow, false);

	    // Resize
	    if (resizeHide) {
	      window.removeEventListener('resize', this.onWindowResize);
	      window.addEventListener('resize', this.onWindowResize, false);
	    }
	  };

	  target.prototype.unbindWindowEvents = function () {
	    window.removeEventListener(_constant2.default.GLOBAL.HIDE, this.globalHide);
	    window.removeEventListener(_constant2.default.GLOBAL.REBUILD, this.globalRebuild);
	    window.removeEventListener(_constant2.default.GLOBAL.SHOW, this.globalShow);
	    window.removeEventListener('resize', this.onWindowResize);
	  };

	  /**
	   * invoked by resize event of window
	   */
	  target.prototype.onWindowResize = function () {
	    if (!this.mount) return;
	    this.hideTooltip();
	  };
	};

	var _constant = __webpack_require__(31);

	var _constant2 = _interopRequireDefault(_constant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (target) {
	  target.prototype.isCustomEvent = function (ele) {
	    var event = this.state.event;

	    return event || !!ele.getAttribute('data-event');
	  };

	  /* Bind listener for custom event */
	  target.prototype.customBindListener = function (ele) {
	    var _this = this;

	    var _state = this.state;
	    var event = _state.event;
	    var eventOff = _state.eventOff;

	    var dataEvent = ele.getAttribute('data-event') || event;
	    var dataEventOff = ele.getAttribute('data-event-off') || eventOff;

	    dataEvent.split(' ').forEach(function (event) {
	      ele.removeEventListener(event, customListener);
	      customListener = checkStatus.bind(_this, dataEventOff);
	      ele.addEventListener(event, customListener, false);
	    });
	    if (dataEventOff) {
	      dataEventOff.split(' ').forEach(function (event) {
	        ele.removeEventListener(event, _this.hideTooltip);
	        ele.addEventListener(event, _this.hideTooltip, false);
	      });
	    }
	  };

	  /* Unbind listener for custom event */
	  target.prototype.customUnbindListener = function (ele) {
	    var _state2 = this.state;
	    var event = _state2.event;
	    var eventOff = _state2.eventOff;

	    var dataEvent = event || ele.getAttribute('data-event');
	    var dataEventOff = eventOff || ele.getAttribute('data-event-off');

	    ele.removeEventListener(dataEvent, customListener);
	    if (dataEventOff) ele.removeEventListener(dataEventOff, this.hideTooltip);
	  };
	};

	/**
	 * Custom events to control showing and hiding of tooltip
	 *
	 * @attributes
	 * - `event` {String}
	 * - `eventOff` {String}
	 */

	var checkStatus = function checkStatus(dataEventOff, e) {
	  var show = this.state.show;
	  var id = this.props.id;

	  var dataIsCapture = e.currentTarget.getAttribute('data-iscapture');
	  var isCapture = dataIsCapture && dataIsCapture === 'true' || this.props.isCapture;
	  var currentItem = e.currentTarget.getAttribute('currentItem');

	  if (!isCapture) e.stopPropagation();
	  if (show && currentItem === 'true') {
	    if (!dataEventOff) this.hideTooltip(e);
	  } else {
	    e.currentTarget.setAttribute('currentItem', 'true');
	    setUntargetItems(e.currentTarget, this.getTargetArray(id));
	    this.showTooltip(e);
	  }
	};

	var setUntargetItems = function setUntargetItems(currentTarget, targetArray) {
	  for (var i = 0; i < targetArray.length; i++) {
	    if (currentTarget !== targetArray[i]) {
	      targetArray[i].setAttribute('currentItem', 'false');
	    } else {
	      targetArray[i].setAttribute('currentItem', 'true');
	    }
	  }
	};

	var customListener = void 0;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (target) {
	  target.prototype.isCapture = function (currentTarget) {
	    var dataIsCapture = currentTarget.getAttribute('data-iscapture');
	    return dataIsCapture && dataIsCapture === 'true' || this.props.isCapture || false;
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (e, target, node, place, effect, offset) {
	  var tipWidth = node.clientWidth;
	  var tipHeight = node.clientHeight;

	  var _getCurrentOffset = getCurrentOffset(e, target, effect);

	  var mouseX = _getCurrentOffset.mouseX;
	  var mouseY = _getCurrentOffset.mouseY;

	  var defaultOffset = getDefaultPosition(effect, target.clientWidth, target.clientHeight, tipWidth, tipHeight);

	  var _calculateOffset = calculateOffset(offset);

	  var extraOffset_X = _calculateOffset.extraOffset_X;
	  var extraOffset_Y = _calculateOffset.extraOffset_Y;


	  var windowWidth = window.innerWidth;
	  var windowHeight = window.innerHeight;

	  var _getParent = getParent(node);

	  var parentTop = _getParent.parentTop;
	  var parentLeft = _getParent.parentLeft;

	  // Get the edge offset of the tooltip

	  var getTipOffsetLeft = function getTipOffsetLeft(place) {
	    var offset_X = defaultOffset[place].l;
	    return mouseX + offset_X + extraOffset_X;
	  };
	  var getTipOffsetRight = function getTipOffsetRight(place) {
	    var offset_X = defaultOffset[place].r;
	    return mouseX + offset_X + extraOffset_X;
	  };
	  var getTipOffsetTop = function getTipOffsetTop(place) {
	    var offset_Y = defaultOffset[place].t;
	    return mouseY + offset_Y + extraOffset_Y;
	  };
	  var getTipOffsetBottom = function getTipOffsetBottom(place) {
	    var offset_Y = defaultOffset[place].b;
	    return mouseY + offset_Y + extraOffset_Y;
	  };

	  // Judge if the tooltip has over the window(screen)
	  var outsideVertical = function outsideVertical() {
	    var result = false;
	    var newPlace = void 0;
	    if (getTipOffsetTop('left') < 0 && getTipOffsetBottom('left') <= windowHeight && getTipOffsetBottom('bottom') <= windowHeight) {
	      result = true;
	      newPlace = 'bottom';
	    } else if (getTipOffsetBottom('left') > windowHeight && getTipOffsetTop('left') >= 0 && getTipOffsetTop('top') >= 0) {
	      result = true;
	      newPlace = 'top';
	    }
	    return { result: result, newPlace: newPlace };
	  };
	  var outsideLeft = function outsideLeft() {
	    var _outsideVertical = outsideVertical();

	    var result = _outsideVertical.result;
	    var newPlace = _outsideVertical.newPlace; // Deal with vertical as first priority

	    if (result && outsideHorizontal().result) {
	      return { result: false }; // No need to change, if change to vertical will out of space
	    }
	    if (!result && getTipOffsetLeft('left') < 0 && getTipOffsetRight('right') <= windowWidth) {
	      result = true; // If vertical ok, but let out of side and right won't out of side
	      newPlace = 'right';
	    }
	    return { result: result, newPlace: newPlace };
	  };
	  var outsideRight = function outsideRight() {
	    var _outsideVertical2 = outsideVertical();

	    var result = _outsideVertical2.result;
	    var newPlace = _outsideVertical2.newPlace;

	    if (result && outsideHorizontal().result) {
	      return { result: false }; // No need to change, if change to vertical will out of space
	    }
	    if (!result && getTipOffsetRight('right') > windowWidth && getTipOffsetLeft('left') >= 0) {
	      result = true;
	      newPlace = 'left';
	    }
	    return { result: result, newPlace: newPlace };
	  };

	  var outsideHorizontal = function outsideHorizontal() {
	    var result = false;
	    var newPlace = void 0;
	    if (getTipOffsetLeft('top') < 0 && getTipOffsetRight('top') <= windowWidth && getTipOffsetRight('right') <= windowWidth) {
	      result = true;
	      newPlace = 'right';
	    } else if (getTipOffsetRight('top') > windowWidth && getTipOffsetLeft('top') >= 0 && getTipOffsetLeft('left') >= 0) {
	      result = true;
	      newPlace = 'left';
	    }
	    return { result: result, newPlace: newPlace };
	  };
	  var outsideTop = function outsideTop() {
	    var _outsideHorizontal = outsideHorizontal();

	    var result = _outsideHorizontal.result;
	    var newPlace = _outsideHorizontal.newPlace;

	    if (result && outsideVertical().result) {
	      return { result: false };
	    }
	    if (!result && getTipOffsetTop('top') < 0 && getTipOffsetBottom('bottom') <= windowHeight) {
	      result = true;
	      newPlace = 'bottom';
	    }
	    return { result: result, newPlace: newPlace };
	  };
	  var outsideBottom = function outsideBottom() {
	    var _outsideHorizontal2 = outsideHorizontal();

	    var result = _outsideHorizontal2.result;
	    var newPlace = _outsideHorizontal2.newPlace;

	    if (result && outsideVertical().result) {
	      return { result: false };
	    }
	    if (!result && getTipOffsetBottom('bottom') > windowHeight && getTipOffsetTop('top') >= 0) {
	      result = true;
	      newPlace = 'top';
	    }
	    return { result: result, newPlace: newPlace };
	  };

	  // Return new state to change the placement to the reverse if possible
	  var outsideLeftResult = outsideLeft();
	  var outsideRightResult = outsideRight();
	  var outsideTopResult = outsideTop();
	  var outsideBottomResult = outsideBottom();

	  if (place === 'left' && outsideLeftResult.result) {
	    return {
	      isNewState: true,
	      newState: { place: outsideLeftResult.newPlace }
	    };
	  } else if (place === 'right' && outsideRightResult.result) {
	    return {
	      isNewState: true,
	      newState: { place: outsideRightResult.newPlace }
	    };
	  } else if (place === 'top' && outsideTopResult.result) {
	    return {
	      isNewState: true,
	      newState: { place: outsideTopResult.newPlace }
	    };
	  } else if (place === 'bottom' && outsideBottomResult.result) {
	    return {
	      isNewState: true,
	      newState: { place: outsideBottomResult.newPlace }
	    };
	  }

	  // Return tooltip offset position
	  return {
	    isNewState: false,
	    position: {
	      left: parseInt(getTipOffsetLeft(place) - parentLeft, 10),
	      top: parseInt(getTipOffsetTop(place) - parentTop, 10)
	    }
	  };
	};

	// Get current mouse offset
	var getCurrentOffset = function getCurrentOffset(e, currentTarget, effect) {
	  var boundingClientRect = currentTarget.getBoundingClientRect();
	  var targetTop = boundingClientRect.top;
	  var targetLeft = boundingClientRect.left;
	  var targetWidth = currentTarget.clientWidth;
	  var targetHeight = currentTarget.clientHeight;

	  if (effect === 'float') {
	    return {
	      mouseX: e.clientX,
	      mouseY: e.clientY
	    };
	  }
	  return {
	    mouseX: targetLeft + targetWidth / 2,
	    mouseY: targetTop + targetHeight / 2
	  };
	};

	// List all possibility of tooltip final offset
	// This is useful in judging if it is necessary for tooltip to switch position when out of window
	/**
	 * Calculate the position of tooltip
	 *
	 * @params
	 * - `e` {Event} the event of current mouse
	 * - `target` {Element} the currentTarget of the event
	 * - `node` {DOM} the react-tooltip object
	 * - `place` {String} top / right / bottom / left
	 * - `effect` {String} float / solid
	 * - `offset` {Object} the offset to default position
	 *
	 * @return {Object
	 * - `isNewState` {Bool} required
	 * - `newState` {Object}
	 * - `position` {OBject} {left: {Number}, top: {Number}}
	 */
	var getDefaultPosition = function getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight) {
	  var top = void 0;
	  var right = void 0;
	  var bottom = void 0;
	  var left = void 0;
	  var disToMouse = 3;
	  var triangleHeight = 2;
	  var cursorHeight = 12; // Optimize for float bottom only, cause the cursor will hide the tooltip

	  if (effect === 'float') {
	    top = {
	      l: -(tipWidth / 2),
	      r: tipWidth / 2,
	      t: -(tipHeight + disToMouse + triangleHeight),
	      b: -disToMouse
	    };
	    bottom = {
	      l: -(tipWidth / 2),
	      r: tipWidth / 2,
	      t: disToMouse + cursorHeight,
	      b: tipHeight + disToMouse + triangleHeight + cursorHeight
	    };
	    left = {
	      l: -(tipWidth + disToMouse + triangleHeight),
	      r: -disToMouse,
	      t: -(tipHeight / 2),
	      b: tipHeight / 2
	    };
	    right = {
	      l: disToMouse,
	      r: tipWidth + disToMouse + triangleHeight,
	      t: -(tipHeight / 2),
	      b: tipHeight / 2
	    };
	  } else if (effect === 'solid') {
	    top = {
	      l: -(tipWidth / 2),
	      r: tipWidth / 2,
	      t: -(targetHeight / 2 + tipHeight + triangleHeight),
	      b: -(targetHeight / 2)
	    };
	    bottom = {
	      l: -(tipWidth / 2),
	      r: tipWidth / 2,
	      t: targetHeight / 2,
	      b: targetHeight / 2 + tipHeight + triangleHeight
	    };
	    left = {
	      l: -(tipWidth + targetWidth / 2 + triangleHeight),
	      r: -(targetWidth / 2),
	      t: -(tipHeight / 2),
	      b: tipHeight / 2
	    };
	    right = {
	      l: targetWidth / 2,
	      r: tipWidth + targetWidth / 2 + triangleHeight,
	      t: -(tipHeight / 2),
	      b: tipHeight / 2
	    };
	  }

	  return { top: top, bottom: bottom, left: left, right: right };
	};

	// Consider additional offset into position calculation
	var calculateOffset = function calculateOffset(offset) {
	  var extraOffset_X = 0;
	  var extraOffset_Y = 0;

	  if (Object.prototype.toString.apply(offset) === '[object String]') {
	    offset = JSON.parse(offset.toString().replace(/\'/g, '\"'));
	  }
	  for (var key in offset) {
	    if (key === 'top') {
	      extraOffset_Y -= parseInt(offset[key], 10);
	    } else if (key === 'bottom') {
	      extraOffset_Y += parseInt(offset[key], 10);
	    } else if (key === 'left') {
	      extraOffset_X -= parseInt(offset[key], 10);
	    } else if (key === 'right') {
	      extraOffset_X += parseInt(offset[key], 10);
	    }
	  }

	  return { extraOffset_X: extraOffset_X, extraOffset_Y: extraOffset_Y };
	};

	// Get the offset of the parent elements
	var getParent = function getParent(currentTarget) {
	  var currentParent = currentTarget;
	  while (currentParent) {
	    if (window.getComputedStyle(currentParent).getPropertyValue('transform') !== 'none') break;
	    currentParent = currentParent.parentElement;
	  }

	  var parentTop = currentParent && currentParent.getBoundingClientRect().top || 0;
	  var parentLeft = currentParent && currentParent.getBoundingClientRect().left || 0;

	  return { parentTop: parentTop, parentLeft: parentLeft };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (tip, children, getContent, multiline) {
	  if (children) return children;
	  if (getContent !== undefined && getContent !== null) return getContent; // getContent can be 0, '', etc.
	  if (getContent === null) return null; // Tip not exist and childern is null or undefined

	  var regexp = /<br\s*\/?>/;
	  if (!multiline || multiline === 'false' || !regexp.test(tip)) {
	    // No trim(), so that user can keep their input
	    return tip;
	  }

	  // Multiline tooltip content
	  return tip.split(regexp).map(function (d, i) {
	    return _react2.default.createElement(
	      'span',
	      { key: i, className: 'multi-line' },
	      d
	    );
	  });
	};

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseAria = parseAria;
	/**
	 * Support aria- and role in ReactTooltip
	 *
	 * @params props {Object}
	 * @return {Object}
	 */
	function parseAria(props) {
	  var ariaObj = {};
	  Object.keys(props).filter(function (prop) {
	    // aria-xxx and role is acceptable
	    return (/(^aria-\w+$|^role$)/.test(prop)
	    );
	  }).forEach(function (prop) {
	    ariaObj[prop] = props[prop];
	  });

	  return ariaObj;
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '.__react_component_tooltip{border-radius:3px;display:inline-block;font-size:13px;left:-999em;opacity:0;padding:8px 21px;position:fixed;pointer-events:none;transition:opacity 0.3s ease-out;top:-999em;visibility:hidden;z-index:999}.__react_component_tooltip:before,.__react_component_tooltip:after{content:"";width:0;height:0;position:absolute}.__react_component_tooltip.show{opacity:0.9;margin-top:0px;margin-left:0px;visibility:visible}.__react_component_tooltip.type-dark{color:#fff;background-color:#222}.__react_component_tooltip.type-dark.place-top:after{border-top-color:#222;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-dark.place-bottom:after{border-bottom-color:#222;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-dark.place-left:after{border-left-color:#222;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-dark.place-right:after{border-right-color:#222;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-dark.border{border:1px solid #fff}.__react_component_tooltip.type-dark.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-dark.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-dark.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-dark.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-success{color:#fff;background-color:#8DC572}.__react_component_tooltip.type-success.place-top:after{border-top-color:#8DC572;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-success.place-bottom:after{border-bottom-color:#8DC572;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-success.place-left:after{border-left-color:#8DC572;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-success.place-right:after{border-right-color:#8DC572;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-success.border{border:1px solid #fff}.__react_component_tooltip.type-success.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-success.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-success.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-success.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-warning{color:#fff;background-color:#F0AD4E}.__react_component_tooltip.type-warning.place-top:after{border-top-color:#F0AD4E;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-warning.place-bottom:after{border-bottom-color:#F0AD4E;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-warning.place-left:after{border-left-color:#F0AD4E;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-warning.place-right:after{border-right-color:#F0AD4E;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-warning.border{border:1px solid #fff}.__react_component_tooltip.type-warning.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-warning.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-warning.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-warning.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-error{color:#fff;background-color:#BE6464}.__react_component_tooltip.type-error.place-top:after{border-top-color:#BE6464;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-error.place-bottom:after{border-bottom-color:#BE6464;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-error.place-left:after{border-left-color:#BE6464;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-error.place-right:after{border-right-color:#BE6464;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-error.border{border:1px solid #fff}.__react_component_tooltip.type-error.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-error.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-error.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-error.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-info{color:#fff;background-color:#337AB7}.__react_component_tooltip.type-info.place-top:after{border-top-color:#337AB7;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-info.place-bottom:after{border-bottom-color:#337AB7;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-info.place-left:after{border-left-color:#337AB7;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-info.place-right:after{border-right-color:#337AB7;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-info.border{border:1px solid #fff}.__react_component_tooltip.type-info.border.place-top:before{border-top:8px solid #fff}.__react_component_tooltip.type-info.border.place-bottom:before{border-bottom:8px solid #fff}.__react_component_tooltip.type-info.border.place-left:before{border-left:8px solid #fff}.__react_component_tooltip.type-info.border.place-right:before{border-right:8px solid #fff}.__react_component_tooltip.type-light{color:#222;background-color:#fff}.__react_component_tooltip.type-light.place-top:after{border-top-color:#fff;border-top-style:solid;border-top-width:6px}.__react_component_tooltip.type-light.place-bottom:after{border-bottom-color:#fff;border-bottom-style:solid;border-bottom-width:6px}.__react_component_tooltip.type-light.place-left:after{border-left-color:#fff;border-left-style:solid;border-left-width:6px}.__react_component_tooltip.type-light.place-right:after{border-right-color:#fff;border-right-style:solid;border-right-width:6px}.__react_component_tooltip.type-light.border{border:1px solid #222}.__react_component_tooltip.type-light.border.place-top:before{border-top:8px solid #222}.__react_component_tooltip.type-light.border.place-bottom:before{border-bottom:8px solid #222}.__react_component_tooltip.type-light.border.place-left:before{border-left:8px solid #222}.__react_component_tooltip.type-light.border.place-right:before{border-right:8px solid #222}.__react_component_tooltip.place-top{margin-top:-10px}.__react_component_tooltip.place-top:before{border-left:10px solid transparent;border-right:10px solid transparent;bottom:-8px;left:50%;margin-left:-10px}.__react_component_tooltip.place-top:after{border-left:8px solid transparent;border-right:8px solid transparent;bottom:-6px;left:50%;margin-left:-8px}.__react_component_tooltip.place-bottom{margin-top:10px}.__react_component_tooltip.place-bottom:before{border-left:10px solid transparent;border-right:10px solid transparent;top:-8px;left:50%;margin-left:-10px}.__react_component_tooltip.place-bottom:after{border-left:8px solid transparent;border-right:8px solid transparent;top:-6px;left:50%;margin-left:-8px}.__react_component_tooltip.place-left{margin-left:-10px}.__react_component_tooltip.place-left:before{border-top:6px solid transparent;border-bottom:6px solid transparent;right:-8px;top:50%;margin-top:-5px}.__react_component_tooltip.place-left:after{border-top:5px solid transparent;border-bottom:5px solid transparent;right:-6px;top:50%;margin-top:-4px}.__react_component_tooltip.place-right{margin-left:10px}.__react_component_tooltip.place-right:before{border-top:6px solid transparent;border-bottom:6px solid transparent;left:-8px;top:50%;margin-top:-5px}.__react_component_tooltip.place-right:after{border-top:5px solid transparent;border-bottom:5px solid transparent;left:-6px;top:50%;margin-top:-4px}.__react_component_tooltip .multi-line{display:block;padding:2px 0px;text-align:center}';

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(40);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(41);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _toConsumableArray2 = __webpack_require__(60);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _extends2 = __webpack_require__(99);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(106);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(107);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(130);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _reactDom = __webpack_require__(4);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _addEventListener = __webpack_require__(138);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Track = __webpack_require__(143);

	var _Track2 = _interopRequireDefault(_Track);

	var _Handle = __webpack_require__(144);

	var _Handle2 = _interopRequireDefault(_Handle);

	var _Steps = __webpack_require__(179);

	var _Steps2 = _interopRequireDefault(_Steps);

	var _Marks = __webpack_require__(181);

	var _Marks2 = _interopRequireDefault(_Marks);

	var _warning = __webpack_require__(180);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function noop() {}

	function isNotTouchEvent(e) {
	  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
	}

	function getTouchPosition(vertical, e) {
	  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
	}

	function getMousePosition(vertical, e) {
	  return vertical ? e.clientY : e.pageX;
	}

	function getHandleCenterPosition(vertical, handle) {
	  var coords = handle.getBoundingClientRect();
	  return vertical ? coords.top + coords.height * 0.5 : coords.left + coords.width * 0.5;
	}

	function pauseEvent(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}

	var Slider = function (_React$Component) {
	  (0, _inherits3["default"])(Slider, _React$Component);

	  function Slider(props) {
	    (0, _classCallCheck3["default"])(this, Slider);

	    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

	    var range = props.range,
	        min = props.min,
	        max = props.max,
	        step = props.step;

	    var initialValue = range ? Array.apply(null, Array(range + 1)).map(function () {
	      return min;
	    }) : min;
	    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
	    var value = props.value !== undefined ? props.value : defaultValue;

	    var bounds = (range ? value : [min, value]).map(function (v) {
	      return _this.trimAlignValue(v);
	    });

	    var recent = void 0;
	    if (range && bounds[0] === bounds[bounds.length - 1] && bounds[0] === max) {
	      recent = 0;
	    } else {
	      recent = bounds.length - 1;
	    }

	    if ((undefined) !== 'production' && step && Math.floor(step) === step && (max - min) % step !== 0) {
	      (0, _warning2["default"])(false, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
	    }

	    _this.state = {
	      handle: null,
	      recent: recent,
	      bounds: bounds
	    };
	    return _this;
	  }

	  Slider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;

	    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

	    var bounds = this.state.bounds;

	    if (nextProps.range) {
	      var value = nextProps.value || bounds;
	      var nextBounds = value.map(function (v) {
	        return _this2.trimAlignValue(v, nextProps);
	      });
	      if (nextBounds.every(function (v, i) {
	        return v === bounds[i];
	      })) return;

	      this.setState({ bounds: nextBounds });
	      if (bounds.some(function (v) {
	        return _this2.isValueOutOfBounds(v, nextProps);
	      })) {
	        this.props.onChange(nextBounds);
	      }
	    } else {
	      var _value = nextProps.value !== undefined ? nextProps.value : bounds[1];
	      var nextValue = this.trimAlignValue(_value, nextProps);
	      if (nextValue === bounds[1] && bounds[0] === nextProps.min) return;

	      this.setState({ bounds: [nextProps.min, nextValue] });
	      if (this.isValueOutOfBounds(bounds[1], nextProps)) {
	        this.props.onChange(nextValue);
	      }
	    }
	  };

	  Slider.prototype.onChange = function onChange(state) {
	    var props = this.props;
	    var isNotControlled = !('value' in props);
	    if (isNotControlled) {
	      this.setState(state);
	    } else if (state.handle !== undefined) {
	      this.setState({ handle: state.handle });
	    }

	    var data = (0, _extends3["default"])({}, this.state, state);
	    var changedValue = props.range ? data.bounds : data.bounds[1];
	    props.onChange(changedValue);
	  };

	  Slider.prototype.onMouseDown = function onMouseDown(e) {
	    if (e.button !== 0) {
	      return;
	    }

	    var position = getMousePosition(this.props.vertical, e);
	    if (!this.isEventFromHandle(e)) {
	      this.dragOffset = 0;
	    } else {
	      var handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
	      this.dragOffset = position - handlePosition;
	      position = handlePosition;
	    }
	    this.onStart(position);
	    this.addDocumentEvents('mouse');
	    pauseEvent(e);
	  };

	  Slider.prototype.onMouseMove = function onMouseMove(e) {
	    var position = getMousePosition(this.props.vertical, e);
	    this.onMove(e, position - this.dragOffset);
	  };

	  Slider.prototype.onMove = function onMove(e, position) {
	    pauseEvent(e);
	    var props = this.props;
	    var state = this.state;

	    var diffPosition = position - this.startPosition;
	    diffPosition = this.props.vertical ? -diffPosition : diffPosition;
	    var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

	    var value = this.trimAlignValue(this.startValue + diffValue);
	    var oldValue = state.bounds[state.handle];
	    if (value === oldValue) return;

	    var nextBounds = [].concat((0, _toConsumableArray3["default"])(state.bounds));
	    nextBounds[state.handle] = value;
	    var nextHandle = state.handle;
	    if (props.pushable !== false) {
	      var originalValue = state.bounds[nextHandle];
	      this.pushSurroundingHandles(nextBounds, nextHandle, originalValue);
	    } else if (props.allowCross) {
	      nextBounds.sort(function (a, b) {
	        return a - b;
	      });
	      nextHandle = nextBounds.indexOf(value);
	    }
	    this.onChange({
	      handle: nextHandle,
	      bounds: nextBounds
	    });
	  };

	  Slider.prototype.onStart = function onStart(position) {
	    var props = this.props;
	    props.onBeforeChange(this.getValue());

	    var value = this.calcValueByPos(position);
	    this.startValue = value;
	    this.startPosition = position;

	    var state = this.state;
	    var bounds = state.bounds;


	    var valueNeedChanging = 1;
	    if (this.props.range) {
	      var closestBound = 0;
	      for (var i = 1; i < bounds.length - 1; ++i) {
	        if (value > bounds[i]) {
	          closestBound = i;
	        }
	      }
	      if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
	        closestBound = closestBound + 1;
	      }
	      valueNeedChanging = closestBound;

	      var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];
	      if (isAtTheSamePoint) {
	        valueNeedChanging = state.recent;
	      }

	      if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
	        valueNeedChanging = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
	      }
	    }

	    this.setState({
	      handle: valueNeedChanging,
	      recent: valueNeedChanging
	    });

	    var oldValue = state.bounds[valueNeedChanging];
	    if (value === oldValue) return;

	    var nextBounds = [].concat((0, _toConsumableArray3["default"])(state.bounds));
	    nextBounds[valueNeedChanging] = value;
	    this.onChange({ bounds: nextBounds });
	  };

	  Slider.prototype.onTouchMove = function onTouchMove(e) {
	    if (isNotTouchEvent(e)) {
	      this.end('touch');
	      return;
	    }

	    var position = getTouchPosition(this.props.vertical, e);
	    this.onMove(e, position - this.dragOffset);
	  };

	  Slider.prototype.onTouchStart = function onTouchStart(e) {
	    if (isNotTouchEvent(e)) return;

	    var position = getTouchPosition(this.props.vertical, e);
	    if (!this.isEventFromHandle(e)) {
	      this.dragOffset = 0;
	    } else {
	      var handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
	      this.dragOffset = position - handlePosition;
	      position = handlePosition;
	    }
	    this.onStart(position);
	    this.addDocumentEvents('touch');
	    pauseEvent(e);
	  };

	  /**
	   * Returns an array of possible slider points, taking into account both
	   * `marks` and `step`. The result is cached.
	   */


	  Slider.prototype.getPoints = function getPoints() {
	    var _props = this.props,
	        marks = _props.marks,
	        step = _props.step,
	        min = _props.min,
	        max = _props.max;

	    var cache = this._getPointsCache;
	    if (!cache || cache.marks !== marks || cache.step !== step) {
	      var pointsObject = (0, _extends3["default"])({}, marks);
	      if (step !== null) {
	        for (var point = min; point <= max; point += step) {
	          pointsObject[point] = point;
	        }
	      }
	      var points = Object.keys(pointsObject).map(parseFloat);
	      points.sort(function (a, b) {
	        return a - b;
	      });
	      this._getPointsCache = { marks: marks, step: step, points: points };
	    }
	    return this._getPointsCache.points;
	  };

	  Slider.prototype.getPrecision = function getPrecision(step) {
	    var stepString = step.toString();
	    var precision = 0;
	    if (stepString.indexOf('.') >= 0) {
	      precision = stepString.length - stepString.indexOf('.') - 1;
	    }
	    return precision;
	  };

	  Slider.prototype.getSliderLength = function getSliderLength() {
	    var slider = this.refs.slider;
	    if (!slider) {
	      return 0;
	    }

	    return this.props.vertical ? slider.clientHeight : slider.clientWidth;
	  };

	  Slider.prototype.getSliderStart = function getSliderStart() {
	    var slider = this.refs.slider;
	    var rect = slider.getBoundingClientRect();

	    return this.props.vertical ? rect.top : rect.left;
	  };

	  Slider.prototype.getValue = function getValue() {
	    var bounds = this.state.bounds;

	    return this.props.range ? bounds : bounds[1];
	  };

	  Slider.prototype.addDocumentEvents = function addDocumentEvents(type) {
	    if (type === 'touch') {
	      // just work for chrome iOS Safari and Android Browser
	      this.onTouchMoveListener = (0, _addEventListener2["default"])(document, 'touchmove', this.onTouchMove.bind(this));
	      this.onTouchUpListener = (0, _addEventListener2["default"])(document, 'touchend', this.end.bind(this, 'touch'));
	    } else if (type === 'mouse') {
	      this.onMouseMoveListener = (0, _addEventListener2["default"])(document, 'mousemove', this.onMouseMove.bind(this));
	      this.onMouseUpListener = (0, _addEventListener2["default"])(document, 'mouseup', this.end.bind(this, 'mouse'));
	    }
	  };

	  Slider.prototype.calcOffset = function calcOffset(value) {
	    var _props2 = this.props,
	        min = _props2.min,
	        max = _props2.max;

	    var ratio = (value - min) / (max - min);
	    return ratio * 100;
	  };

	  Slider.prototype.calcValue = function calcValue(offset) {
	    var _props3 = this.props,
	        vertical = _props3.vertical,
	        min = _props3.min,
	        max = _props3.max;

	    var ratio = Math.abs(offset / this.getSliderLength());
	    var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
	    return value;
	  };

	  Slider.prototype.calcValueByPos = function calcValueByPos(position) {
	    var pixelOffset = position - this.getSliderStart();
	    var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
	    return nextValue;
	  };

	  Slider.prototype.end = function end(type) {
	    this.removeEvents(type);
	    this.props.onAfterChange(this.getValue());
	    this.setState({ handle: null });
	  };

	  Slider.prototype.isEventFromHandle = function isEventFromHandle(e) {
	    var _this3 = this;

	    return this.state.bounds.some(function (x, i) {
	      return _this3.refs['handle-' + i] && e.target === (0, _reactDom.findDOMNode)(_this3.refs['handle-' + i]);
	    });
	  };

	  Slider.prototype.isValueOutOfBounds = function isValueOutOfBounds(value, props) {
	    return value < props.min || value > props.max;
	  };

	  Slider.prototype.pushHandle = function pushHandle(bounds, handle, direction, amount) {
	    var originalValue = bounds[handle];
	    var currentValue = bounds[handle];
	    while (direction * (currentValue - originalValue) < amount) {
	      if (!this.pushHandleOnePoint(bounds, handle, direction)) {
	        // can't push handle enough to create the needed `amount` gap, so we
	        // revert its position to the original value
	        bounds[handle] = originalValue;
	        return false;
	      }
	      currentValue = bounds[handle];
	    }
	    // the handle was pushed enough to create the needed `amount` gap
	    return true;
	  };

	  Slider.prototype.pushHandleOnePoint = function pushHandleOnePoint(bounds, handle, direction) {
	    var points = this.getPoints();
	    var pointIndex = points.indexOf(bounds[handle]);
	    var nextPointIndex = pointIndex + direction;
	    if (nextPointIndex >= points.length || nextPointIndex < 0) {
	      // reached the minimum or maximum available point, can't push anymore
	      return false;
	    }
	    var nextHandle = handle + direction;
	    var nextValue = points[nextPointIndex];
	    var threshold = this.props.pushable;

	    var diffToNext = direction * (bounds[nextHandle] - nextValue);
	    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
	      // couldn't push next handle, so we won't push this one either
	      return false;
	    }
	    // push the handle
	    bounds[handle] = nextValue;
	    return true;
	  };

	  Slider.prototype.pushSurroundingHandles = function pushSurroundingHandles(bounds, handle, originalValue) {
	    var threshold = this.props.pushable;

	    var value = bounds[handle];

	    var direction = 0;
	    if (bounds[handle + 1] - value < threshold) {
	      direction = +1;
	    } else if (value - bounds[handle - 1] < threshold) {
	      direction = -1;
	    }

	    if (direction === 0) {
	      return;
	    }

	    var nextHandle = handle + direction;
	    var diffToNext = direction * (bounds[nextHandle] - value);
	    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
	      // revert to original value if pushing is impossible
	      bounds[handle] = originalValue;
	    }
	  };

	  Slider.prototype.removeEvents = function removeEvents(type) {
	    if (type === 'touch') {
	      this.onTouchMoveListener.remove();
	      this.onTouchUpListener.remove();
	    } else if (type === 'mouse') {
	      this.onMouseMoveListener.remove();
	      this.onMouseUpListener.remove();
	    }
	  };

	  Slider.prototype.trimAlignValue = function trimAlignValue(v, nextProps) {
	    var state = this.state || {};
	    var handle = state.handle,
	        bounds = state.bounds;

	    var _props4 = (0, _extends3["default"])({}, this.props, nextProps || {}),
	        marks = _props4.marks,
	        step = _props4.step,
	        min = _props4.min,
	        max = _props4.max,
	        allowCross = _props4.allowCross;

	    var val = v;
	    if (val <= min) {
	      val = min;
	    }
	    if (val >= max) {
	      val = max;
	    }
	    /* eslint-disable eqeqeq */
	    if (!allowCross && handle != null && handle > 0 && val <= bounds[handle - 1]) {
	      val = bounds[handle - 1];
	    }
	    if (!allowCross && handle != null && handle < bounds.length - 1 && val >= bounds[handle + 1]) {
	      val = bounds[handle + 1];
	    }
	    /* eslint-enable eqeqeq */

	    var points = Object.keys(marks).map(parseFloat);
	    if (step !== null) {
	      var closestStep = Math.round((val - min) / step) * step + min;
	      points.push(closestStep);
	    }

	    var diffs = points.map(function (point) {
	      return Math.abs(val - point);
	    });
	    var closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

	    return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision(step))) : closestPoint;
	  };

	  Slider.prototype.render = function render() {
	    var _this4 = this,
	        _classNames3;

	    var _state = this.state,
	        handle = _state.handle,
	        bounds = _state.bounds;
	    var _props5 = this.props,
	        className = _props5.className,
	        prefixCls = _props5.prefixCls,
	        tooltipPrefixCls = _props5.tooltipPrefixCls,
	        disabled = _props5.disabled,
	        vertical = _props5.vertical,
	        dots = _props5.dots,
	        included = _props5.included,
	        range = _props5.range,
	        step = _props5.step,
	        marks = _props5.marks,
	        max = _props5.max,
	        min = _props5.min,
	        tipTransitionName = _props5.tipTransitionName,
	        tipFormatter = _props5.tipFormatter,
	        children = _props5.children;


	    var customHandle = this.props.handle;

	    var offsets = bounds.map(function (v) {
	      return _this4.calcOffset(v);
	    });

	    var handleClassName = prefixCls + '-handle';

	    var handlesClassNames = bounds.map(function (v, i) {
	      var _classNames;

	      return (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, handleClassName, true), (0, _defineProperty3["default"])(_classNames, handleClassName + '-' + (i + 1), true), (0, _defineProperty3["default"])(_classNames, handleClassName + '-lower', i === 0), (0, _defineProperty3["default"])(_classNames, handleClassName + '-upper', i === bounds.length - 1), _classNames));
	    });

	    var isNoTip = step === null || tipFormatter === null;

	    var commonHandleProps = {
	      prefixCls: prefixCls,
	      tooltipPrefixCls: tooltipPrefixCls,
	      noTip: isNoTip,
	      tipTransitionName: tipTransitionName,
	      tipFormatter: tipFormatter,
	      vertical: vertical
	    };

	    var handles = bounds.map(function (v, i) {
	      return (0, _react.cloneElement)(customHandle, (0, _extends3["default"])({}, commonHandleProps, {
	        className: handlesClassNames[i],
	        value: v,
	        offset: offsets[i],
	        dragging: handle === i,
	        index: i,
	        key: i,
	        ref: 'handle-' + i
	      }));
	    });
	    if (!range) {
	      handles.shift();
	    }

	    var isIncluded = included || range;

	    var tracks = [];
	    for (var i = 1; i < bounds.length; ++i) {
	      var _classNames2;

	      var trackClassName = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-track', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-track-' + i, true), _classNames2));
	      tracks.push(_react2["default"].createElement(_Track2["default"], { className: trackClassName, vertical: vertical, included: isIncluded,
	        offset: offsets[i - 1], length: offsets[i] - offsets[i - 1], key: i
	      }));
	    }

	    var sliderClassName = (0, _classnames2["default"])((_classNames3 = {}, (0, _defineProperty3["default"])(_classNames3, prefixCls, true), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-with-marks', Object.keys(marks).length), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-disabled', disabled), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-vertical', this.props.vertical), (0, _defineProperty3["default"])(_classNames3, className, !!className), _classNames3));

	    return _react2["default"].createElement(
	      'div',
	      { ref: 'slider', className: sliderClassName,
	        onTouchStart: disabled ? noop : this.onTouchStart.bind(this),
	        onMouseDown: disabled ? noop : this.onMouseDown.bind(this)
	      },
	      _react2["default"].createElement('div', { className: prefixCls + '-rail' }),
	      tracks,
	      _react2["default"].createElement(_Steps2["default"], { prefixCls: prefixCls, vertical: vertical, marks: marks, dots: dots, step: step,
	        included: isIncluded, lowerBound: bounds[0],
	        upperBound: bounds[bounds.length - 1], max: max, min: min
	      }),
	      handles,
	      _react2["default"].createElement(_Marks2["default"], { className: prefixCls + '-mark', vertical: vertical, marks: marks,
	        included: isIncluded, lowerBound: bounds[0],
	        upperBound: bounds[bounds.length - 1], max: max, min: min
	      }),
	      children
	    );
	  };

	  return Slider;
	}(_react2["default"].Component);

	Slider.propTypes = {
	  min: _react2["default"].PropTypes.number,
	  max: _react2["default"].PropTypes.number,
	  step: _react2["default"].PropTypes.number,
	  defaultValue: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.number, _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.number)]),
	  value: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.number, _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.number)]),
	  marks: _react2["default"].PropTypes.object,
	  included: _react2["default"].PropTypes.bool,
	  className: _react2["default"].PropTypes.string,
	  prefixCls: _react2["default"].PropTypes.string,
	  tooltipPrefixCls: _react2["default"].PropTypes.string,
	  disabled: _react2["default"].PropTypes.bool,
	  children: _react2["default"].PropTypes.any,
	  onBeforeChange: _react2["default"].PropTypes.func,
	  onChange: _react2["default"].PropTypes.func,
	  onAfterChange: _react2["default"].PropTypes.func,
	  handle: _react2["default"].PropTypes.element,
	  tipTransitionName: _react2["default"].PropTypes.string,
	  tipFormatter: _react2["default"].PropTypes.func,
	  dots: _react2["default"].PropTypes.bool,
	  range: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.number]),
	  vertical: _react2["default"].PropTypes.bool,
	  allowCross: _react2["default"].PropTypes.bool,
	  pushable: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.number])
	};

	Slider.defaultProps = {
	  prefixCls: 'rc-slider',
	  className: '',
	  tipTransitionName: '',
	  min: 0,
	  max: 100,
	  step: 1,
	  marks: {},
	  handle: _react2["default"].createElement(_Handle2["default"], null),
	  onBeforeChange: noop,
	  onChange: noop,
	  onAfterChange: noop,
	  tipFormatter: function tipFormatter(value) {
	    return value;
	  },
	  included: true,
	  disabled: false,
	  dots: false,
	  range: false,
	  vertical: false,
	  allowCross: true,
	  pushable: false
	};

	exports["default"] = Slider;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(42);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	var $Object = __webpack_require__(47).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(45);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(55), 'Object', {defineProperty: __webpack_require__(51).f});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(46)
	  , core      = __webpack_require__(47)
	  , ctx       = __webpack_require__(48)
	  , hide      = __webpack_require__(50)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 46 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 47 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(49);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(51)
	  , createDesc = __webpack_require__(59);
	module.exports = __webpack_require__(55) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(52)
	  , IE8_DOM_DEFINE = __webpack_require__(54)
	  , toPrimitive    = __webpack_require__(58)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(55) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(53);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(55) && !__webpack_require__(56)(function(){
	  return Object.defineProperty(__webpack_require__(57)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(56)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(53)
	  , document = __webpack_require__(46).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(53);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(61);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(92);
	module.exports = __webpack_require__(47).Array.from;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(64)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(67)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(65)
	  , defined   = __webpack_require__(66);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(68)
	  , $export        = __webpack_require__(45)
	  , redefine       = __webpack_require__(69)
	  , hide           = __webpack_require__(50)
	  , has            = __webpack_require__(70)
	  , Iterators      = __webpack_require__(71)
	  , $iterCreate    = __webpack_require__(72)
	  , setToStringTag = __webpack_require__(88)
	  , getPrototypeOf = __webpack_require__(90)
	  , ITERATOR       = __webpack_require__(89)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50);

/***/ },
/* 70 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(73)
	  , descriptor     = __webpack_require__(59)
	  , setToStringTag = __webpack_require__(88)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(50)(IteratorPrototype, __webpack_require__(89)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(52)
	  , dPs         = __webpack_require__(74)
	  , enumBugKeys = __webpack_require__(86)
	  , IE_PROTO    = __webpack_require__(83)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(57)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(87).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(51)
	  , anObject = __webpack_require__(52)
	  , getKeys  = __webpack_require__(75);

	module.exports = __webpack_require__(55) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(76)
	  , enumBugKeys = __webpack_require__(86);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(70)
	  , toIObject    = __webpack_require__(77)
	  , arrayIndexOf = __webpack_require__(80)(false)
	  , IE_PROTO     = __webpack_require__(83)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(78)
	  , defined = __webpack_require__(66);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(79);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(77)
	  , toLength  = __webpack_require__(81)
	  , toIndex   = __webpack_require__(82);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(65)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(65)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(84)('keys')
	  , uid    = __webpack_require__(85);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(46)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(46).document && document.documentElement;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(51).f
	  , has = __webpack_require__(70)
	  , TAG = __webpack_require__(89)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(84)('wks')
	  , uid        = __webpack_require__(85)
	  , Symbol     = __webpack_require__(46).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(70)
	  , toObject    = __webpack_require__(91)
	  , IE_PROTO    = __webpack_require__(83)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(66);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(48)
	  , $export        = __webpack_require__(45)
	  , toObject       = __webpack_require__(91)
	  , call           = __webpack_require__(93)
	  , isArrayIter    = __webpack_require__(94)
	  , toLength       = __webpack_require__(81)
	  , createProperty = __webpack_require__(95)
	  , getIterFn      = __webpack_require__(96);

	$export($export.S + $export.F * !__webpack_require__(98)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(52);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(71)
	  , ITERATOR   = __webpack_require__(89)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(51)
	  , createDesc      = __webpack_require__(59);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(97)
	  , ITERATOR  = __webpack_require__(89)('iterator')
	  , Iterators = __webpack_require__(71);
	module.exports = __webpack_require__(47).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(79)
	  , TAG = __webpack_require__(89)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(89)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(100);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);
	module.exports = __webpack_require__(47).Object.assign;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(45);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(103)});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(75)
	  , gOPS     = __webpack_require__(104)
	  , pIE      = __webpack_require__(105)
	  , toObject = __webpack_require__(91)
	  , IObject  = __webpack_require__(78)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(56)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 104 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 105 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 106 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(108);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(109);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(116);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(111);
	module.exports = __webpack_require__(115).f('iterator');

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var global        = __webpack_require__(46)
	  , hide          = __webpack_require__(50)
	  , Iterators     = __webpack_require__(71)
	  , TO_STRING_TAG = __webpack_require__(89)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(113)
	  , step             = __webpack_require__(114)
	  , Iterators        = __webpack_require__(71)
	  , toIObject        = __webpack_require__(77);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(67)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(89);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(129);
	module.exports = __webpack_require__(47).Symbol;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(46)
	  , has            = __webpack_require__(70)
	  , DESCRIPTORS    = __webpack_require__(55)
	  , $export        = __webpack_require__(45)
	  , redefine       = __webpack_require__(69)
	  , META           = __webpack_require__(119).KEY
	  , $fails         = __webpack_require__(56)
	  , shared         = __webpack_require__(84)
	  , setToStringTag = __webpack_require__(88)
	  , uid            = __webpack_require__(85)
	  , wks            = __webpack_require__(89)
	  , wksExt         = __webpack_require__(115)
	  , wksDefine      = __webpack_require__(120)
	  , keyOf          = __webpack_require__(121)
	  , enumKeys       = __webpack_require__(122)
	  , isArray        = __webpack_require__(123)
	  , anObject       = __webpack_require__(52)
	  , toIObject      = __webpack_require__(77)
	  , toPrimitive    = __webpack_require__(58)
	  , createDesc     = __webpack_require__(59)
	  , _create        = __webpack_require__(73)
	  , gOPNExt        = __webpack_require__(124)
	  , $GOPD          = __webpack_require__(126)
	  , $DP            = __webpack_require__(51)
	  , $keys          = __webpack_require__(75)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(125).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(105).f  = $propertyIsEnumerable;
	  __webpack_require__(104).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(68)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(50)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(85)('meta')
	  , isObject = __webpack_require__(53)
	  , has      = __webpack_require__(70)
	  , setDesc  = __webpack_require__(51).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(56)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(46)
	  , core           = __webpack_require__(47)
	  , LIBRARY        = __webpack_require__(68)
	  , wksExt         = __webpack_require__(115)
	  , defineProperty = __webpack_require__(51).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(75)
	  , toIObject = __webpack_require__(77);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(75)
	  , gOPS    = __webpack_require__(104)
	  , pIE     = __webpack_require__(105);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(79);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(77)
	  , gOPN      = __webpack_require__(125).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(76)
	  , hiddenKeys = __webpack_require__(86).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(105)
	  , createDesc     = __webpack_require__(59)
	  , toIObject      = __webpack_require__(77)
	  , toPrimitive    = __webpack_require__(58)
	  , has            = __webpack_require__(70)
	  , IE8_DOM_DEFINE = __webpack_require__(54)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(55) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120)('asyncIterator');

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120)('observable');

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(131);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(135);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(108);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(133);
	module.exports = __webpack_require__(47).Object.setPrototypeOf;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(45);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(134).set});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(53)
	  , anObject = __webpack_require__(52);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(48)(Function.call, __webpack_require__(126).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137);
	var $Object = __webpack_require__(47).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(45)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(73)});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addEventListenerWrap;

	var _addDomEventListener = __webpack_require__(139);

	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2["default"].unstable_batchedUpdates ? function run(e) {
	    _reactDom2["default"].unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2["default"])(target, eventType, callback);
	}
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = addEventListener;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _EventObject = __webpack_require__(140);

	var _EventObject2 = _interopRequireDefault(_EventObject);

	function addEventListener(target, eventType, callback) {
	  function wrapCallback(e) {
	    var ne = new _EventObject2['default'](e);
	    callback.call(target, ne);
	  }

	  if (target.addEventListener) {
	    target.addEventListener(eventType, wrapCallback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, wrapCallback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, wrapCallback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, wrapCallback);
	      }
	    };
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * event object for dom
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _EventBaseObject = __webpack_require__(141);

	var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

	var _objectAssign = __webpack_require__(142);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var TRUE = true;
	var FALSE = false;
	var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

	function isNullOrUndefined(w) {
	  return w === null || w === undefined;
	}

	var eventNormalizers = [{
	  reg: /^key/,
	  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
	  fix: function fix(event, nativeEvent) {
	    if (isNullOrUndefined(event.which)) {
	      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
	    }

	    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
	    if (event.metaKey === undefined) {
	      event.metaKey = event.ctrlKey;
	    }
	  }
	}, {
	  reg: /^touch/,
	  props: ['touches', 'changedTouches', 'targetTouches']
	}, {
	  reg: /^hashchange$/,
	  props: ['newURL', 'oldURL']
	}, {
	  reg: /^gesturechange$/i,
	  props: ['rotation', 'scale']
	}, {
	  reg: /^(mousewheel|DOMMouseScroll)$/,
	  props: [],
	  fix: function fix(event, nativeEvent) {
	    var deltaX = undefined;
	    var deltaY = undefined;
	    var delta = undefined;
	    var wheelDelta = nativeEvent.wheelDelta;
	    var axis = nativeEvent.axis;
	    var wheelDeltaY = nativeEvent.wheelDeltaY;
	    var wheelDeltaX = nativeEvent.wheelDeltaX;
	    var detail = nativeEvent.detail;

	    // ie/webkit
	    if (wheelDelta) {
	      delta = wheelDelta / 120;
	    }

	    // gecko
	    if (detail) {
	      // press control e.detail == 1 else e.detail == 3
	      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
	    }

	    // Gecko
	    if (axis !== undefined) {
	      if (axis === event.HORIZONTAL_AXIS) {
	        deltaY = 0;
	        deltaX = 0 - delta;
	      } else if (axis === event.VERTICAL_AXIS) {
	        deltaX = 0;
	        deltaY = delta;
	      }
	    }

	    // Webkit
	    if (wheelDeltaY !== undefined) {
	      deltaY = wheelDeltaY / 120;
	    }
	    if (wheelDeltaX !== undefined) {
	      deltaX = -1 * wheelDeltaX / 120;
	    }

	    // 默认 deltaY (ie)
	    if (!deltaX && !deltaY) {
	      deltaY = delta;
	    }

	    if (deltaX !== undefined) {
	      /**
	       * deltaX of mousewheel event
	       * @property deltaX
	       * @member Event.DomEvent.Object
	       */
	      event.deltaX = deltaX;
	    }

	    if (deltaY !== undefined) {
	      /**
	       * deltaY of mousewheel event
	       * @property deltaY
	       * @member Event.DomEvent.Object
	       */
	      event.deltaY = deltaY;
	    }

	    if (delta !== undefined) {
	      /**
	       * delta of mousewheel event
	       * @property delta
	       * @member Event.DomEvent.Object
	       */
	      event.delta = delta;
	    }
	  }
	}, {
	  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
	  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
	  fix: function fix(event, nativeEvent) {
	    var eventDoc = undefined;
	    var doc = undefined;
	    var body = undefined;
	    var target = event.target;
	    var button = nativeEvent.button;

	    // Calculate pageX/Y if missing and clientX/Y available
	    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
	      eventDoc = target.ownerDocument || document;
	      doc = eventDoc.documentElement;
	      body = eventDoc.body;
	      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }

	    // which for click: 1 === left; 2 === middle; 3 === right
	    // do not use button
	    if (!event.which && button !== undefined) {
	      if (button & 1) {
	        event.which = 1;
	      } else if (button & 2) {
	        event.which = 3;
	      } else if (button & 4) {
	        event.which = 2;
	      } else {
	        event.which = 0;
	      }
	    }

	    // add relatedTarget, if necessary
	    if (!event.relatedTarget && event.fromElement) {
	      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
	    }

	    return event;
	  }
	}];

	function retTrue() {
	  return TRUE;
	}

	function retFalse() {
	  return FALSE;
	}

	function DomEventObject(nativeEvent) {
	  var type = nativeEvent.type;

	  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

	  _EventBaseObject2['default'].call(this);

	  this.nativeEvent = nativeEvent;

	  // in case dom event has been mark as default prevented by lower dom node
	  var isDefaultPrevented = retFalse;
	  if ('defaultPrevented' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
	  } else if ('getPreventDefault' in nativeEvent) {
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
	    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
	  } else if ('returnValue' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
	  }

	  this.isDefaultPrevented = isDefaultPrevented;

	  var fixFns = [];
	  var fixFn = undefined;
	  var l = undefined;
	  var prop = undefined;
	  var props = commonProps.concat();

	  eventNormalizers.forEach(function (normalizer) {
	    if (type.match(normalizer.reg)) {
	      props = props.concat(normalizer.props);
	      if (normalizer.fix) {
	        fixFns.push(normalizer.fix);
	      }
	    }
	  });

	  l = props.length;

	  // clone properties of the original event object
	  while (l) {
	    prop = props[--l];
	    this[prop] = nativeEvent[prop];
	  }

	  // fix target property, if necessary
	  if (!this.target && isNative) {
	    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
	  }

	  // check if target is a text node (safari)
	  if (this.target && this.target.nodeType === 3) {
	    this.target = this.target.parentNode;
	  }

	  l = fixFns.length;

	  while (l) {
	    fixFn = fixFns[--l];
	    fixFn(this, nativeEvent);
	  }

	  this.timeStamp = nativeEvent.timeStamp || Date.now();
	}

	var EventBaseObjectProto = _EventBaseObject2['default'].prototype;

	(0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
	  constructor: DomEventObject,

	  preventDefault: function preventDefault() {
	    var e = this.nativeEvent;

	    // if preventDefault exists run it on the original event
	    if (e.preventDefault) {
	      e.preventDefault();
	    } else {
	      // otherwise set the returnValue property of the original event to FALSE (IE)
	      e.returnValue = FALSE;
	    }

	    EventBaseObjectProto.preventDefault.call(this);
	  },

	  stopPropagation: function stopPropagation() {
	    var e = this.nativeEvent;

	    // if stopPropagation exists run it on the original event
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    } else {
	      // otherwise set the cancelBubble property of the original event to TRUE (IE)
	      e.cancelBubble = TRUE;
	    }

	    EventBaseObjectProto.stopPropagation.call(this);
	  }
	});

	exports['default'] = DomEventObject;
	module.exports = exports['default'];

/***/ },
/* 141 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * base event object for custom and dom event.
	 * @author yiminghe@gmail.com
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function returnFalse() {
	  return false;
	}

	function returnTrue() {
	  return true;
	}

	function EventBaseObject() {
	  this.timeStamp = Date.now();
	  this.target = undefined;
	  this.currentTarget = undefined;
	}

	EventBaseObject.prototype = {
	  isEventObject: 1,

	  constructor: EventBaseObject,

	  isDefaultPrevented: returnFalse,

	  isPropagationStopped: returnFalse,

	  isImmediatePropagationStopped: returnFalse,

	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },

	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  },

	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.isImmediatePropagationStopped = returnTrue;
	    // fixed 1.2
	    // call stopPropagation implicitly
	    this.stopPropagation();
	  },

	  halt: function halt(immediate) {
	    if (immediate) {
	      this.stopImmediatePropagation();
	    } else {
	      this.stopPropagation();
	    }
	    this.preventDefault();
	  }
	};

	exports["default"] = EventBaseObject;
	module.exports = exports["default"];

/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Track = function Track(_ref) {
	  var className = _ref.className,
	      included = _ref.included,
	      vertical = _ref.vertical,
	      offset = _ref.offset,
	      length = _ref.length;

	  var style = {
	    visibility: included ? 'visible' : 'hidden'
	  };
	  if (vertical) {
	    style.bottom = offset + '%';
	    style.height = length + '%';
	  } else {
	    style.left = offset + '%';
	    style.width = length + '%';
	  }
	  return _react2["default"].createElement('div', { className: className, style: style });
	};

	exports["default"] = Track;
	module.exports = exports['default'];

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(106);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(107);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(130);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _rcTooltip = __webpack_require__(145);

	var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Handle = function (_React$Component) {
	  (0, _inherits3["default"])(Handle, _React$Component);

	  function Handle(props) {
	    (0, _classCallCheck3["default"])(this, Handle);

	    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

	    _this.state = {
	      isTooltipVisible: false
	    };
	    return _this;
	  }

	  Handle.prototype.hideTooltip = function hideTooltip() {
	    this.setState({
	      isTooltipVisible: false
	    });
	  };

	  Handle.prototype.showTooltip = function showTooltip() {
	    this.setState({
	      isTooltipVisible: true
	    });
	  };

	  Handle.prototype.render = function render() {
	    var _props = this.props,
	        prefixCls = _props.prefixCls,
	        tooltipPrefixCls = _props.tooltipPrefixCls,
	        className = _props.className,
	        tipTransitionName = _props.tipTransitionName,
	        tipFormatter = _props.tipFormatter,
	        vertical = _props.vertical,
	        offset = _props.offset,
	        value = _props.value,
	        dragging = _props.dragging,
	        noTip = _props.noTip,
	        index = _props.index;


	    var style = vertical ? { bottom: offset + '%' } : { left: offset + '%' };
	    var handle = _react2["default"].createElement('div', { className: className, style: style,
	      onMouseUp: this.showTooltip.bind(this),
	      onMouseEnter: this.showTooltip.bind(this),
	      onMouseLeave: this.hideTooltip.bind(this)
	    });

	    if (noTip) {
	      return handle;
	    }

	    var isTooltipVisible = dragging || this.state.isTooltipVisible;
	    return _react2["default"].createElement(
	      _rcTooltip2["default"],
	      {
	        prefixCls: tooltipPrefixCls || prefixCls + '-tooltip',
	        placement: 'top',
	        visible: isTooltipVisible,
	        overlay: _react2["default"].createElement(
	          'span',
	          null,
	          tipFormatter(value, index)
	        ),
	        delay: 0,
	        transitionName: tipTransitionName
	      },
	      handle
	    );
	  };

	  return Handle;
	}(_react2["default"].Component);

	exports["default"] = Handle;


	Handle.propTypes = {
	  prefixCls: _react2["default"].PropTypes.string,
	  tooltipPrefixCls: _react2["default"].PropTypes.string,
	  className: _react2["default"].PropTypes.string,
	  vertical: _react2["default"].PropTypes.bool,
	  offset: _react2["default"].PropTypes.number,
	  tipTransitionName: _react2["default"].PropTypes.string,
	  tipFormatter: _react2["default"].PropTypes.func,
	  value: _react2["default"].PropTypes.number,
	  dragging: _react2["default"].PropTypes.bool,
	  noTip: _react2["default"].PropTypes.bool,
	  index: _react2["default"].PropTypes.number
	};
	module.exports = exports['default'];

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(146);

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _placements = __webpack_require__(147);

	var _rcTrigger = __webpack_require__(148);

	var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Tooltip = _react2["default"].createClass({
	  displayName: 'Tooltip',

	  propTypes: {
	    trigger: _react.PropTypes.any,
	    children: _react.PropTypes.any,
	    defaultVisible: _react.PropTypes.bool,
	    visible: _react.PropTypes.bool,
	    placement: _react.PropTypes.string,
	    transitionName: _react.PropTypes.string,
	    animation: _react.PropTypes.any,
	    onVisibleChange: _react.PropTypes.func,
	    afterVisibleChange: _react.PropTypes.func,
	    overlay: _react.PropTypes.oneOfType([_react2["default"].PropTypes.node, _react2["default"].PropTypes.func]).isRequired,
	    overlayStyle: _react.PropTypes.object,
	    overlayClassName: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    getTooltipContainer: _react.PropTypes.func,
	    destroyTooltipOnHide: _react.PropTypes.bool,
	    align: _react.PropTypes.object,
	    arrowContent: _react.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-tooltip',
	      mouseEnterDelay: 0,
	      destroyTooltipOnHide: false,
	      mouseLeaveDelay: 0.1,
	      align: {},
	      placement: 'right',
	      trigger: ['hover'],
	      arrowContent: null
	    };
	  },
	  getPopupElement: function getPopupElement() {
	    var _props = this.props;
	    var arrowContent = _props.arrowContent;
	    var overlay = _props.overlay;
	    var prefixCls = _props.prefixCls;

	    return [_react2["default"].createElement(
	      'div',
	      { className: prefixCls + '-arrow', key: 'arrow' },
	      arrowContent
	    ), _react2["default"].createElement(
	      'div',
	      { className: prefixCls + '-inner', key: 'content' },
	      typeof overlay === 'function' ? overlay() : overlay
	    )];
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    return this.refs.trigger.getPopupDomNode();
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var overlayClassName = _props2.overlayClassName;
	    var trigger = _props2.trigger;
	    var mouseEnterDelay = _props2.mouseEnterDelay;
	    var mouseLeaveDelay = _props2.mouseLeaveDelay;
	    var overlayStyle = _props2.overlayStyle;
	    var prefixCls = _props2.prefixCls;
	    var children = _props2.children;
	    var onVisibleChange = _props2.onVisibleChange;
	    var transitionName = _props2.transitionName;
	    var animation = _props2.animation;
	    var placement = _props2.placement;
	    var align = _props2.align;
	    var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
	    var defaultVisible = _props2.defaultVisible;
	    var getTooltipContainer = _props2.getTooltipContainer;

	    var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

	    var extraProps = _extends({}, restProps);
	    if ('visible' in this.props) {
	      extraProps.popupVisible = this.props.visible;
	    }
	    return _react2["default"].createElement(
	      _rcTrigger2["default"],
	      _extends({
	        popupClassName: overlayClassName,
	        ref: 'trigger',
	        prefixCls: prefixCls,
	        popup: this.getPopupElement,
	        action: trigger,
	        builtinPlacements: _placements.placements,
	        popupPlacement: placement,
	        popupAlign: align,
	        getPopupContainer: getTooltipContainer,
	        onPopupVisibleChange: onVisibleChange,
	        popupTransitionName: transitionName,
	        popupAnimation: animation,
	        defaultPopupVisible: defaultVisible,
	        destroyPopupOnHide: destroyTooltipOnHide,
	        mouseLeaveDelay: mouseLeaveDelay,
	        popupStyle: overlayStyle,
	        mouseEnterDelay: mouseEnterDelay
	      }, extraProps),
	      children
	    );
	  }
	});

	exports["default"] = Tooltip;
	module.exports = exports['default'];

/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = exports.placements = {
	  left: {
	    points: ['cr', 'cl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  },
	  right: {
	    points: ['cl', 'cr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  top: {
	    points: ['bc', 'tc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  bottom: {
	    points: ['tc', 'bc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  topLeft: {
	    points: ['bl', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  leftTop: {
	    points: ['tr', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  },
	  topRight: {
	    points: ['br', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  rightTop: {
	    points: ['tl', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomRight: {
	    points: ['tr', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  rightBottom: {
	    points: ['bl', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  leftBottom: {
	    points: ['br', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  }
	};

	exports["default"] = placements;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(149);

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(99);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _contains = __webpack_require__(150);

	var _contains2 = _interopRequireDefault(_contains);

	var _addEventListener = __webpack_require__(151);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _Popup = __webpack_require__(152);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _utils = __webpack_require__(177);

	var _getContainerRenderMixin = __webpack_require__(178);

	var _getContainerRenderMixin2 = _interopRequireDefault(_getContainerRenderMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function noop() {}

	function returnEmptyString() {
	  return '';
	}

	var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

	var Trigger = _react2["default"].createClass({
	  displayName: 'Trigger',

	  propTypes: {
	    children: _react.PropTypes.any,
	    action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	    showAction: _react.PropTypes.any,
	    hideAction: _react.PropTypes.any,
	    getPopupClassNameFromAlign: _react.PropTypes.any,
	    onPopupVisibleChange: _react.PropTypes.func,
	    afterPopupVisibleChange: _react.PropTypes.func,
	    popup: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
	    popupStyle: _react.PropTypes.object,
	    prefixCls: _react.PropTypes.string,
	    popupClassName: _react.PropTypes.string,
	    popupPlacement: _react.PropTypes.string,
	    builtinPlacements: _react.PropTypes.object,
	    popupTransitionName: _react.PropTypes.string,
	    popupAnimation: _react.PropTypes.any,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    zIndex: _react.PropTypes.number,
	    focusDelay: _react.PropTypes.number,
	    blurDelay: _react.PropTypes.number,
	    getPopupContainer: _react.PropTypes.func,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    mask: _react.PropTypes.bool,
	    maskClosable: _react.PropTypes.bool,
	    onPopupAlign: _react.PropTypes.func,
	    popupAlign: _react.PropTypes.object,
	    popupVisible: _react.PropTypes.bool,
	    maskTransitionName: _react.PropTypes.string,
	    maskAnimation: _react.PropTypes.string
	  },

	  mixins: [(0, _getContainerRenderMixin2["default"])({
	    autoMount: false,

	    isVisible: function isVisible(instance) {
	      return instance.state.popupVisible;
	    },
	    getContainer: function getContainer(instance) {
	      var popupContainer = document.createElement('div');
	      var mountNode = instance.props.getPopupContainer ? instance.props.getPopupContainer((0, _reactDom.findDOMNode)(instance)) : document.body;
	      mountNode.appendChild(popupContainer);
	      return popupContainer;
	    }
	  })],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-trigger-popup',
	      getPopupClassNameFromAlign: returnEmptyString,
	      onPopupVisibleChange: noop,
	      afterPopupVisibleChange: noop,
	      onPopupAlign: noop,
	      popupClassName: '',
	      mouseEnterDelay: 0,
	      mouseLeaveDelay: 0.1,
	      focusDelay: 0,
	      blurDelay: 0.15,
	      popupStyle: {},
	      destroyPopupOnHide: false,
	      popupAlign: {},
	      defaultPopupVisible: false,
	      mask: false,
	      maskClosable: true,
	      action: [],
	      showAction: [],
	      hideAction: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    var popupVisible = void 0;
	    if ('popupVisible' in props) {
	      popupVisible = !!props.popupVisible;
	    } else {
	      popupVisible = !!props.defaultPopupVisible;
	    }
	    return {
	      popupVisible: popupVisible
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    ALL_HANDLERS.forEach(function (h) {
	      _this['fire' + h] = function (e) {
	        _this.fireEvents(h, e);
	      };
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.componentDidUpdate({}, {
	      popupVisible: this.state.popupVisible
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
	    var popupVisible = _ref.popupVisible;

	    if (popupVisible !== undefined) {
	      this.setState({
	        popupVisible: popupVisible
	      });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(_, prevState) {
	    var props = this.props;
	    var state = this.state;
	    this.renderComponent(null, function () {
	      if (prevState.popupVisible !== state.popupVisible) {
	        props.afterPopupVisibleChange(state.popupVisible);
	      }
	    });
	    if (this.isClickToHide()) {
	      if (state.popupVisible) {
	        if (!this.clickOutsideHandler) {
	          this.clickOutsideHandler = (0, _addEventListener2["default"])(document, 'mousedown', this.onDocumentClick);
	          this.touchOutsideHandler = (0, _addEventListener2["default"])(document, 'touchstart', this.onDocumentClick);
	        }
	        return;
	      }
	    }
	    if (this.clickOutsideHandler) {
	      this.clickOutsideHandler.remove();
	      this.touchOutsideHandler.remove();
	      this.clickOutsideHandler = null;
	      this.touchOutsideHandler = null;
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.clearDelayTimer();
	    if (this.clickOutsideHandler) {
	      this.clickOutsideHandler.remove();
	      this.touchOutsideHandler.remove();
	      this.clickOutsideHandler = null;
	      this.touchOutsideHandler = null;
	    }
	  },
	  onMouseEnter: function onMouseEnter(e) {
	    this.fireEvents('onMouseEnter', e);
	    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
	  },
	  onMouseLeave: function onMouseLeave(e) {
	    this.fireEvents('onMouseLeave', e);
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	  },
	  onPopupMouseEnter: function onPopupMouseEnter() {
	    this.clearDelayTimer();
	  },
	  onPopupMouseLeave: function onPopupMouseLeave(e) {
	    // https://github.com/react-component/trigger/pull/13
	    // react bug?
	    if (e.relatedTarget && !e.relatedTarget.setTimeout && this._component && (0, _contains2["default"])(this._component.getPopupDomNode(), e.relatedTarget)) {
	      return;
	    }
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	  },
	  onFocus: function onFocus(e) {
	    this.fireEvents('onFocus', e);
	    // incase focusin and focusout
	    this.clearDelayTimer();
	    if (this.isFocusToShow()) {
	      this.focusTime = Date.now();
	      this.delaySetPopupVisible(true, this.props.focusDelay);
	    }
	  },
	  onMouseDown: function onMouseDown(e) {
	    this.fireEvents('onMouseDown', e);
	    this.preClickTime = Date.now();
	  },
	  onTouchStart: function onTouchStart(e) {
	    this.fireEvents('onTouchStart', e);
	    this.preTouchTime = Date.now();
	  },
	  onBlur: function onBlur(e) {
	    this.fireEvents('onBlur', e);
	    this.clearDelayTimer();
	    if (this.isBlurToHide()) {
	      this.delaySetPopupVisible(false, this.props.blurDelay);
	    }
	  },
	  onClick: function onClick(event) {
	    this.fireEvents('onClick', event);
	    // focus will trigger click
	    if (this.focusTime) {
	      var preTime = void 0;
	      if (this.preClickTime && this.preTouchTime) {
	        preTime = Math.min(this.preClickTime, this.preTouchTime);
	      } else if (this.preClickTime) {
	        preTime = this.preClickTime;
	      } else if (this.preTouchTime) {
	        preTime = this.preTouchTime;
	      }
	      if (Math.abs(preTime - this.focusTime) < 20) {
	        return;
	      }
	      this.focusTime = 0;
	    }
	    this.preClickTime = 0;
	    this.preTouchTime = 0;
	    event.preventDefault();
	    var nextVisible = !this.state.popupVisible;
	    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
	      this.setPopupVisible(!this.state.popupVisible);
	    }
	  },
	  onDocumentClick: function onDocumentClick(event) {
	    if (this.props.mask && !this.props.maskClosable) {
	      return;
	    }
	    var target = event.target;
	    var root = (0, _reactDom.findDOMNode)(this);
	    var popupNode = this.getPopupDomNode();
	    if (!(0, _contains2["default"])(root, target) && !(0, _contains2["default"])(popupNode, target)) {
	      this.close();
	    }
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    // for test
	    if (this._component) {
	      return this._component.isMounted() ? this._component.getPopupDomNode() : null;
	    }
	    return null;
	  },
	  getRootDomNode: function getRootDomNode() {
	    return _reactDom2["default"].findDOMNode(this);
	  },
	  getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
	    var className = [];
	    var props = this.props;
	    var popupPlacement = props.popupPlacement,
	        builtinPlacements = props.builtinPlacements,
	        prefixCls = props.prefixCls;

	    if (popupPlacement && builtinPlacements) {
	      className.push((0, _utils.getPopupClassNameFromAlign)(builtinPlacements, prefixCls, align));
	    }
	    if (props.getPopupClassNameFromAlign) {
	      className.push(props.getPopupClassNameFromAlign(align));
	    }
	    return className.join(' ');
	  },
	  getPopupAlign: function getPopupAlign() {
	    var props = this.props;
	    var popupPlacement = props.popupPlacement,
	        popupAlign = props.popupAlign,
	        builtinPlacements = props.builtinPlacements;

	    if (popupPlacement && builtinPlacements) {
	      return (0, _utils.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
	    }
	    return popupAlign;
	  },
	  getComponent: function getComponent() {
	    var props = this.props,
	        state = this.state;

	    var mouseProps = {};
	    if (this.isMouseEnterToShow()) {
	      mouseProps.onMouseEnter = this.onPopupMouseEnter;
	    }
	    if (this.isMouseLeaveToHide()) {
	      mouseProps.onMouseLeave = this.onPopupMouseLeave;
	    }
	    return _react2["default"].createElement(
	      _Popup2["default"],
	      (0, _extends3["default"])({
	        prefixCls: props.prefixCls,
	        destroyPopupOnHide: props.destroyPopupOnHide,
	        visible: state.popupVisible,
	        className: props.popupClassName,
	        action: props.action,
	        align: this.getPopupAlign(),
	        onAlign: props.onPopupAlign,
	        animation: props.popupAnimation,
	        getClassNameFromAlign: this.getPopupClassNameFromAlign
	      }, mouseProps, {
	        getRootDomNode: this.getRootDomNode,
	        style: props.popupStyle,
	        mask: props.mask,
	        zIndex: props.zIndex,
	        transitionName: props.popupTransitionName,
	        maskAnimation: props.maskAnimation,
	        maskTransitionName: props.maskTransitionName
	      }),
	      typeof props.popup === 'function' ? props.popup() : props.popup
	    );
	  },
	  setPopupVisible: function setPopupVisible(popupVisible) {
	    this.clearDelayTimer();
	    if (this.state.popupVisible !== popupVisible) {
	      if (!('popupVisible' in this.props)) {
	        this.setState({
	          popupVisible: popupVisible
	        });
	      }
	      this.props.onPopupVisibleChange(popupVisible);
	    }
	  },
	  delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
	    var _this2 = this;

	    var delay = delayS * 1000;
	    this.clearDelayTimer();
	    if (delay) {
	      this.delayTimer = setTimeout(function () {
	        _this2.setPopupVisible(visible);
	        _this2.clearDelayTimer();
	      }, delay);
	    } else {
	      this.setPopupVisible(visible);
	    }
	  },
	  clearDelayTimer: function clearDelayTimer() {
	    if (this.delayTimer) {
	      clearTimeout(this.delayTimer);
	      this.delayTimer = null;
	    }
	  },
	  createTwoChains: function createTwoChains(event) {
	    var childPros = this.props.children.props;
	    var props = this.props;
	    if (childPros[event] && props[event]) {
	      return this['fire' + event];
	    }
	    return childPros[event] || props[event];
	  },
	  isClickToShow: function isClickToShow() {
	    var _props = this.props,
	        action = _props.action,
	        showAction = _props.showAction;

	    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
	  },
	  isClickToHide: function isClickToHide() {
	    var _props2 = this.props,
	        action = _props2.action,
	        hideAction = _props2.hideAction;

	    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
	  },
	  isMouseEnterToShow: function isMouseEnterToShow() {
	    var _props3 = this.props,
	        action = _props3.action,
	        showAction = _props3.showAction;

	    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
	  },
	  isMouseLeaveToHide: function isMouseLeaveToHide() {
	    var _props4 = this.props,
	        action = _props4.action,
	        hideAction = _props4.hideAction;

	    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
	  },
	  isFocusToShow: function isFocusToShow() {
	    var _props5 = this.props,
	        action = _props5.action,
	        showAction = _props5.showAction;

	    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
	  },
	  isBlurToHide: function isBlurToHide() {
	    var _props6 = this.props,
	        action = _props6.action,
	        hideAction = _props6.hideAction;

	    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
	  },
	  forcePopupAlign: function forcePopupAlign() {
	    if (this.state.popupVisible && this.popupInstance && this.popupInstance.alignInstance) {
	      this.popupInstance.alignInstance.forceAlign();
	    }
	  },
	  fireEvents: function fireEvents(type, e) {
	    var childCallback = this.props.children.props[type];
	    if (childCallback) {
	      childCallback(e);
	    }
	    var callback = this.props[type];
	    if (callback) {
	      callback(e);
	    }
	  },
	  close: function close() {
	    this.setPopupVisible(false);
	  },
	  render: function render() {
	    var props = this.props;
	    var children = props.children;
	    var child = _react2["default"].Children.only(children);
	    var newChildProps = {};

	    if (this.isClickToHide() || this.isClickToShow()) {
	      newChildProps.onClick = this.onClick;
	      newChildProps.onMouseDown = this.onMouseDown;
	      newChildProps.onTouchStart = this.onTouchStart;
	    } else {
	      newChildProps.onClick = this.createTwoChains('onClick');
	      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
	      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
	    }
	    if (this.isMouseEnterToShow()) {
	      newChildProps.onMouseEnter = this.onMouseEnter;
	    } else {
	      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
	    }
	    if (this.isMouseLeaveToHide()) {
	      newChildProps.onMouseLeave = this.onMouseLeave;
	    } else {
	      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
	    }
	    if (this.isFocusToShow() || this.isBlurToHide()) {
	      newChildProps.onFocus = this.onFocus;
	      newChildProps.onBlur = this.onBlur;
	    } else {
	      newChildProps.onFocus = this.createTwoChains('onFocus');
	      newChildProps.onBlur = this.createTwoChains('onBlur');
	    }

	    return _react2["default"].cloneElement(child, newChildProps);
	  }
	});

	exports["default"] = Trigger;
	module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = contains;
	function contains(root, n) {
	  var node = n;
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addEventListenerWrap;

	var _addDomEventListener = __webpack_require__(139);

	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2["default"].unstable_batchedUpdates ? function run(e) {
	    _reactDom2["default"].unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2["default"])(target, eventType, callback);
	}
	module.exports = exports['default'];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(99);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _rcAlign = __webpack_require__(153);

	var _rcAlign2 = _interopRequireDefault(_rcAlign);

	var _rcAnimate = __webpack_require__(165);

	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

	var _PopupInner = __webpack_require__(174);

	var _PopupInner2 = _interopRequireDefault(_PopupInner);

	var _LazyRenderBox = __webpack_require__(175);

	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Popup = _react2["default"].createClass({
	  displayName: 'Popup',

	  propTypes: {
	    visible: _react.PropTypes.bool,
	    style: _react.PropTypes.object,
	    getClassNameFromAlign: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    getRootDomNode: _react.PropTypes.func,
	    onMouseEnter: _react.PropTypes.func,
	    align: _react.PropTypes.any,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseLeave: _react.PropTypes.func
	  },

	  componentDidMount: function componentDidMount() {
	    this.rootNode = this.getPopupDomNode();
	  },
	  onAlign: function onAlign(popupDomNode, align) {
	    var props = this.props;
	    var alignClassName = props.getClassNameFromAlign(props.align);
	    var currentAlignClassName = props.getClassNameFromAlign(align);
	    if (alignClassName !== currentAlignClassName) {
	      this.currentAlignClassName = currentAlignClassName;
	      popupDomNode.className = this.getClassName(currentAlignClassName);
	    }
	    props.onAlign(popupDomNode, align);
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    return _reactDom2["default"].findDOMNode(this.refs.popup);
	  },
	  getTarget: function getTarget() {
	    return this.props.getRootDomNode();
	  },
	  getMaskTransitionName: function getMaskTransitionName() {
	    var props = this.props;
	    var transitionName = props.maskTransitionName;
	    var animation = props.maskAnimation;
	    if (!transitionName && animation) {
	      transitionName = props.prefixCls + '-' + animation;
	    }
	    return transitionName;
	  },
	  getTransitionName: function getTransitionName() {
	    var props = this.props;
	    var transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = props.prefixCls + '-' + props.animation;
	    }
	    return transitionName;
	  },
	  getClassName: function getClassName(currentAlignClassName) {
	    return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
	  },
	  getPopupElement: function getPopupElement() {
	    var props = this.props;
	    var align = props.align,
	        style = props.style,
	        visible = props.visible,
	        prefixCls = props.prefixCls,
	        destroyPopupOnHide = props.destroyPopupOnHide;

	    var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
	    var hiddenClassName = prefixCls + '-hidden';
	    if (!visible) {
	      this.currentAlignClassName = null;
	    }
	    var newStyle = (0, _extends3["default"])({}, style, this.getZIndexStyle());
	    var popupInnerProps = {
	      className: className,
	      prefixCls: prefixCls,
	      ref: 'popup',
	      onMouseEnter: props.onMouseEnter,
	      onMouseLeave: props.onMouseLeave,
	      style: newStyle
	    };
	    if (destroyPopupOnHide) {
	      return _react2["default"].createElement(
	        _rcAnimate2["default"],
	        {
	          component: '',
	          exclusive: true,
	          transitionAppear: true,
	          transitionName: this.getTransitionName()
	        },
	        visible ? _react2["default"].createElement(
	          _rcAlign2["default"],
	          {
	            target: this.getTarget,
	            key: 'popup',
	            ref: this.saveAlign,
	            monitorWindowResize: true,
	            align: align,
	            onAlign: this.onAlign
	          },
	          _react2["default"].createElement(
	            _PopupInner2["default"],
	            (0, _extends3["default"])({
	              visible: true
	            }, popupInnerProps),
	            props.children
	          )
	        ) : null
	      );
	    }
	    return _react2["default"].createElement(
	      _rcAnimate2["default"],
	      {
	        component: '',
	        exclusive: true,
	        transitionAppear: true,
	        transitionName: this.getTransitionName(),
	        showProp: 'xVisible'
	      },
	      _react2["default"].createElement(
	        _rcAlign2["default"],
	        {
	          target: this.getTarget,
	          key: 'popup',
	          ref: this.saveAlign,
	          monitorWindowResize: true,
	          xVisible: visible,
	          childrenProps: { visible: 'xVisible' },
	          disabled: !visible,
	          align: align,
	          onAlign: this.onAlign
	        },
	        _react2["default"].createElement(
	          _PopupInner2["default"],
	          (0, _extends3["default"])({
	            hiddenClassName: hiddenClassName
	          }, popupInnerProps),
	          props.children
	        )
	      )
	    );
	  },
	  getZIndexStyle: function getZIndexStyle() {
	    var style = {};
	    var props = this.props;
	    if (props.zIndex !== undefined) {
	      style.zIndex = props.zIndex;
	    }
	    return style;
	  },
	  getMaskElement: function getMaskElement() {
	    var props = this.props;
	    var maskElement = void 0;
	    if (props.mask) {
	      var maskTransition = this.getMaskTransitionName();
	      maskElement = _react2["default"].createElement(_LazyRenderBox2["default"], {
	        style: this.getZIndexStyle(),
	        key: 'mask',
	        className: props.prefixCls + '-mask',
	        hiddenClassName: props.prefixCls + '-mask-hidden',
	        visible: props.visible
	      });
	      if (maskTransition) {
	        maskElement = _react2["default"].createElement(
	          _rcAnimate2["default"],
	          {
	            key: 'mask',
	            showProp: 'visible',
	            transitionAppear: true,
	            component: '',
	            transitionName: maskTransition
	          },
	          maskElement
	        );
	      }
	    }
	    return maskElement;
	  },
	  saveAlign: function saveAlign(align) {
	    this.alignInstance = align;
	  },
	  render: function render() {
	    return _react2["default"].createElement(
	      'div',
	      null,
	      this.getMaskElement(),
	      this.getPopupElement()
	    );
	  }
	});

	exports["default"] = Popup;
	module.exports = exports['default'];

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Align = __webpack_require__(154);

	var _Align2 = _interopRequireDefault(_Align);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports["default"] = _Align2["default"]; // export this package's api

	module.exports = exports['default'];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _domAlign = __webpack_require__(155);

	var _domAlign2 = _interopRequireDefault(_domAlign);

	var _addEventListener = __webpack_require__(138);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _isWindow = __webpack_require__(164);

	var _isWindow2 = _interopRequireDefault(_isWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function buffer(fn, ms) {
	  var timer = void 0;

	  function clear() {
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	  }

	  function bufferFn() {
	    clear();
	    timer = setTimeout(fn, ms);
	  }

	  bufferFn.clear = clear;

	  return bufferFn;
	}

	var Align = _react2["default"].createClass({
	  displayName: 'Align',

	  propTypes: {
	    childrenProps: _react.PropTypes.object,
	    align: _react.PropTypes.object.isRequired,
	    target: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    monitorBufferTime: _react.PropTypes.number,
	    monitorWindowResize: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    children: _react.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      target: function target() {
	        return window;
	      },
	      onAlign: function onAlign() {},

	      monitorBufferTime: 50,
	      monitorWindowResize: false,
	      disabled: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    // if parent ref not attached .... use document.getElementById
	    this.forceAlign();
	    if (!props.disabled && props.monitorWindowResize) {
	      this.startMonitorWindowResize();
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var reAlign = false;
	    var props = this.props;

	    if (!props.disabled) {
	      if (prevProps.disabled || prevProps.align !== props.align) {
	        reAlign = true;
	      } else {
	        var lastTarget = prevProps.target();
	        var currentTarget = props.target();
	        if ((0, _isWindow2["default"])(lastTarget) && (0, _isWindow2["default"])(currentTarget)) {
	          reAlign = false;
	        } else if (lastTarget !== currentTarget) {
	          reAlign = true;
	        }
	      }
	    }

	    if (reAlign) {
	      this.forceAlign();
	    }

	    if (props.monitorWindowResize && !props.disabled) {
	      this.startMonitorWindowResize();
	    } else {
	      this.stopMonitorWindowResize();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.stopMonitorWindowResize();
	  },
	  startMonitorWindowResize: function startMonitorWindowResize() {
	    if (!this.resizeHandler) {
	      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
	      this.resizeHandler = (0, _addEventListener2["default"])(window, 'resize', this.bufferMonitor);
	    }
	  },
	  stopMonitorWindowResize: function stopMonitorWindowResize() {
	    if (this.resizeHandler) {
	      this.bufferMonitor.clear();
	      this.resizeHandler.remove();
	      this.resizeHandler = null;
	    }
	  },
	  forceAlign: function forceAlign() {
	    var props = this.props;
	    if (!props.disabled) {
	      var source = _reactDom2["default"].findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2["default"])(source, props.target(), props.align));
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var childrenProps = _props.childrenProps;
	    var children = _props.children;

	    var child = _react2["default"].Children.only(children);
	    if (childrenProps) {
	      var newProps = {};
	      for (var prop in childrenProps) {
	        if (childrenProps.hasOwnProperty(prop)) {
	          newProps[prop] = this.props[childrenProps[prop]];
	        }
	      }
	      return _react2["default"].cloneElement(child, newProps);
	    }
	    return child;
	  }
	});

	exports["default"] = Align;
	module.exports = exports['default'];

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(156);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(158);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	var _getVisibleRectForElement = __webpack_require__(159);

	var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);

	var _adjustForViewport = __webpack_require__(160);

	var _adjustForViewport2 = _interopRequireDefault(_adjustForViewport);

	var _getRegion = __webpack_require__(161);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _getElFuturePos = __webpack_require__(162);

	var _getElFuturePos2 = _interopRequireDefault(_getElFuturePos);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	// http://yiminghe.iteye.com/blog/1124720

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */

	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}

	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}

	function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
	}

	function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
	}

	function flip(points, reg, map) {
	  var ret = [];
	  _utils2["default"].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}

	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}

	function convertOffset(str, offsetLen) {
	  var n = void 0;
	  if (/%$/.test(str)) {
	    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
	  } else {
	    n = parseInt(str, 10);
	  }
	  return n || 0;
	}

	function normalizeOffset(offset, el) {
	  offset[0] = convertOffset(offset[0], el.width);
	  offset[1] = convertOffset(offset[1], el.height);
	}

	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset || [0, 0];
	  var targetOffset = align.targetOffset || [0, 0];
	  var overflow = align.overflow;
	  var target = align.target || refNode;
	  var source = align.source || el;
	  offset = [].concat(offset);
	  targetOffset = [].concat(targetOffset);
	  overflow = overflow || {};
	  var newOverflowCfg = {};

	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = (0, _getVisibleRectForElement2["default"])(source);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = (0, _getRegion2["default"])(source);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = (0, _getRegion2["default"])(target);
	  // 将 offset 转换成数值，支持百分比
	  normalizeOffset(offset, elRegion);
	  normalizeOffset(targetOffset, refNodeRegion);
	  // 当前节点将要被放置的位置
	  var elFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, points, offset, targetOffset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2["default"].merge(elRegion, elFuturePos);

	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 0);
	        var newTargetOffset = flipOffset(targetOffset, 0);
	        var newElFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }

	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var _newPoints = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        var _newOffset = flipOffset(offset, 1);
	        var _newTargetOffset = flipOffset(targetOffset, 1);
	        var _newElFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, _newPoints, _newOffset, _newTargetOffset);
	        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = _newPoints;
	          offset = _newOffset;
	          targetOffset = _newTargetOffset;
	        }
	      }
	    }

	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, points, offset, targetOffset);
	      _utils2["default"].mix(newElRegion, elFuturePos);
	    }

	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = (0, _adjustForViewport2["default"])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }

	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2["default"].css(source, 'width', _utils2["default"].width(source) + newElRegion.width - elRegion.width);
	  }

	  if (newElRegion.height !== elRegion.height) {
	    _utils2["default"].css(source, 'height', _utils2["default"].height(source) + newElRegion.height - elRegion.height);
	  }

	  // https://github.com/kissyteam/kissy/issues/190
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2["default"].offset(source, {
	    left: newElRegion.left,
	    top: newElRegion.top
	  }, {
	    useCssRight: align.useCssRight,
	    useCssBottom: align.useCssBottom,
	    useCssTransform: align.useCssTransform
	  });

	  return {
	    points: points,
	    offset: offset,
	    targetOffset: targetOffset,
	    overflow: newOverflowCfg
	  };
	}

	domAlign.__getOffsetParent = _getOffsetParent2["default"];

	domAlign.__getVisibleRectForElement = _getVisibleRectForElement2["default"];

	exports["default"] = domAlign;
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/

	module.exports = exports['default'];

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _propertyUtils = __webpack_require__(157);

	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	var getComputedStyleX = void 0;

	function force(x, y) {
	  return x + y;
	}

	function css(el, name, v) {
	  var value = v;
	  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	function getClientPosition(elem) {
	  var box = void 0;
	  var x = void 0;
	  var y = void 0;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return {
	    left: x,
	    top: y
	  };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = elem.ownerDocument;
	  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	function getOffsetDirection(dir, option) {
	  if (dir === 'left') {
	    return option.useCssRight ? 'right' : dir;
	  }
	  return option.useCssBottom ? 'bottom' : dir;
	}

	function oppositeOffsetDirection(dir) {
	  if (dir === 'left') {
	    return 'right';
	  } else if (dir === 'right') {
	    return 'left';
	  } else if (dir === 'top') {
	    return 'bottom';
	  } else if (dir === 'bottom') {
	    return 'top';
	  }
	}

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setLeftTop(elem, offset, option) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var presetH = -999;
	  var presetV = -999;
	  var horizontalProperty = getOffsetDirection('left', option);
	  var verticalProperty = getOffsetDirection('top', option);
	  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
	  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

	  if (horizontalProperty !== 'left') {
	    presetH = 999;
	  }

	  if (verticalProperty !== 'top') {
	    presetV = 999;
	  }
	  var originalTransition = '';
	  var originalOffset = getOffset(elem);
	  if ('left' in offset || 'top' in offset) {
	    originalTransition = (0, _propertyUtils.getTransitionProperty)(elem) || '';
	    (0, _propertyUtils.setTransitionProperty)(elem, 'none');
	  }
	  if ('left' in offset) {
	    elem.style[oppositeHorizontalProperty] = '';
	    elem.style[horizontalProperty] = presetH + 'px';
	  }
	  if ('top' in offset) {
	    elem.style[oppositeVerticalProperty] = '';
	    elem.style[verticalProperty] = presetV + 'px';
	  }
	  var old = getOffset(elem);
	  var originalStyle = {};
	  for (var key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      var dir = getOffsetDirection(key, option);
	      var preset = key === 'left' ? presetH : presetV;
	      var off = originalOffset[key] - old[key];
	      if (dir === key) {
	        originalStyle[dir] = preset + off;
	      } else {
	        originalStyle[dir] = preset - off;
	      }
	    }
	  }
	  css(elem, originalStyle);
	  // force relayout
	  force(elem.offsetTop, elem.offsetLeft);
	  if ('left' in offset || 'top' in offset) {
	    (0, _propertyUtils.setTransitionProperty)(elem, originalTransition);
	  }
	  var ret = {};
	  for (var _key in offset) {
	    if (offset.hasOwnProperty(_key)) {
	      var _dir = getOffsetDirection(_key, option);
	      var _off = offset[_key] - originalOffset[_key];
	      if (_key === _dir) {
	        ret[_dir] = originalStyle[_dir] + _off;
	      } else {
	        ret[_dir] = originalStyle[_dir] - _off;
	      }
	    }
	  }
	  css(elem, ret);
	}

	function setTransform(elem, offset) {
	  var originalOffset = getOffset(elem);
	  var originalXY = (0, _propertyUtils.getTransformXY)(elem);
	  var resultXY = { x: originalXY.x, y: originalXY.y };
	  if ('left' in offset) {
	    resultXY.x = originalXY.x + offset.left - originalOffset.left;
	  }
	  if ('top' in offset) {
	    resultXY.y = originalXY.y + offset.top - originalOffset.top;
	  }
	  (0, _propertyUtils.setTransformXY)(elem, resultXY);
	}

	function setOffset(elem, offset, option) {
	  if (option.useCssRight || option.useCssBottom) {
	    setLeftTop(elem, offset, option);
	  } else if (option.useCssTransform && (0, _propertyUtils.getTransformName)() in document.body.style) {
	    setTransform(elem, offset, option);
	  } else {
	    setLeftTop(elem, offset, option);
	  }
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = void 0;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = void 0;
	  var j = void 0;
	  var i = void 0;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = void 0;
	        if (prop === 'border') {
	          cssProp = '' + prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = {
	  position: 'absolute',
	  visibility: 'hidden',
	  display: 'block'
	};

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  var val = void 0;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}

	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value, option) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value, option || {});
	    } else {
	      return getOffset(el);
	    }
	  },

	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = void 0;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },

	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};

	    for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },

	  viewportWidth: 0,
	  viewportHeight: 0
	};

	mix(utils, domUtils);

	exports["default"] = utils;
	module.exports = exports['default'];

/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTransformName = getTransformName;
	exports.setTransitionProperty = setTransitionProperty;
	exports.getTransitionProperty = getTransitionProperty;
	exports.getTransformXY = getTransformXY;
	exports.setTransformXY = setTransformXY;
	var vendorPrefix = void 0;

	var jsCssMap = {
	  Webkit: '-webkit-',
	  Moz: '-moz-',
	  // IE did it wrong again ...
	  ms: '-ms-',
	  O: '-o-'
	};

	function getVendorPrefix() {
	  if (vendorPrefix !== undefined) {
	    return vendorPrefix;
	  }
	  vendorPrefix = '';
	  var style = document.createElement('p').style;
	  var testProp = 'Transform';
	  for (var key in jsCssMap) {
	    if (key + testProp in style) {
	      vendorPrefix = key;
	    }
	  }
	  return vendorPrefix;
	}

	function getTransitionName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'TransitionProperty' : 'transitionProperty';
	}

	function getTransformName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'Transform' : 'transform';
	}

	function setTransitionProperty(node, value) {
	  var name = getTransitionName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transitionProperty') {
	      node.style.transitionProperty = value;
	    }
	  }
	}

	function setTransform(node, value) {
	  var name = getTransformName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transform') {
	      node.style.transform = value;
	    }
	  }
	}

	function getTransitionProperty(node) {
	  return node.style.transitionProperty || node.style[getTransitionName()];
	}

	function getTransformXY(node) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
	    return { x: parseFloat(matrix[12] || matrix[4], 0), y: parseFloat(matrix[13] || matrix[5], 0) };
	  }
	  return {
	    x: 0,
	    y: 0
	  };
	}

	var matrix2d = /matrix\((.*)\)/;
	var matrix3d = /matrix3d\((.*)\)/;

	function setTransformXY(node, xy) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var arr = void 0;
	    var match2d = transform.match(matrix2d);
	    if (match2d) {
	      match2d = match2d[1];
	      arr = match2d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[4] = xy.x;
	      arr[5] = xy.y;
	      setTransform(node, 'matrix(' + arr.join(',') + ')');
	    } else {
	      var match3d = transform.match(matrix3d)[1];
	      arr = match3d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[12] = xy.x;
	      arr[13] = xy.y;
	      setTransform(node, 'matrix3d(' + arr.join(',') + ')');
	    }
	  } else {
	    setTransform(node, 'translateX(' + xy.x + 'px) translateY(' + xy.y + 'px) translateZ(0)');
	  }
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(156);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * 得到会导致元素显示不全的祖先元素
	 */

	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument;
	  var body = doc.body;
	  var parent = void 0;
	  var positionStyle = _utils2["default"].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }

	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2["default"].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}

	exports["default"] = getOffsetParent;
	module.exports = exports['default'];

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(156);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(158);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * 获得元素的显示部分的区域
	 */
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = (0, _getOffsetParent2["default"])(element);
	  var scrollX = void 0;
	  var scrollY = void 0;
	  var winSize = void 0;
	  var doc = element.ownerDocument;
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;

	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2["default"].css(el, 'overflow') !== 'visible') {
	      var pos = _utils2["default"].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = (0, _getOffsetParent2["default"])(el);
	  }

	  // Clip by window's viewport.
	  scrollX = _utils2["default"].getWindowScrollLeft(win);
	  scrollY = _utils2["default"].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2["default"].viewportWidth(win),
	    height: _utils2["default"].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}

	exports["default"] = getVisibleRectForElement;
	module.exports = exports['default'];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(156);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = _utils2["default"].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };

	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }

	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }

	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }

	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }

	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }

	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }

	  return _utils2["default"].mix(pos, size);
	}

	exports["default"] = adjustForViewport;
	module.exports = exports['default'];

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(156);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getRegion(node) {
	  var offset = void 0;
	  var w = void 0;
	  var h = void 0;
	  if (!_utils2["default"].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2["default"].offset(node);
	    w = _utils2["default"].outerWidth(node);
	    h = _utils2["default"].outerHeight(node);
	  } else {
	    var win = _utils2["default"].getWindow(node);
	    offset = {
	      left: _utils2["default"].getWindowScrollLeft(win),
	      top: _utils2["default"].getWindowScrollTop(win)
	    };
	    w = _utils2["default"].viewportWidth(win);
	    h = _utils2["default"].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}

	exports["default"] = getRegion;
	module.exports = exports['default'];

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getAlignOffset = __webpack_require__(163);

	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
	  var xy = void 0;
	  var diff = void 0;
	  var p1 = void 0;
	  var p2 = void 0;

	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };

	  p1 = (0, _getAlignOffset2["default"])(refNodeRegion, points[1]);
	  p2 = (0, _getAlignOffset2["default"])(elRegion, points[0]);

	  diff = [p2.left - p1.left, p2.top - p1.top];

	  return {
	    left: xy.left - diff[0] + offset[0] - targetOffset[0],
	    top: xy.top - diff[1] + offset[1] - targetOffset[1]
	  };
	}

	exports["default"] = getElFuturePos;
	module.exports = exports['default'];

/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */

	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = void 0;
	  var y = void 0;

	  x = region.left;
	  y = region.top;

	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }

	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }

	  return {
	    left: x,
	    top: y
	  };
	}

	exports["default"] = getAlignOffset;
	module.exports = exports['default'];

/***/ },
/* 164 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = isWindow;
	function isWindow(obj) {
	  /* eslint no-eq-null: 0 */
	  /* eslint eqeqeq: 0 */
	  return obj != null && obj == obj.window;
	}
	module.exports = exports['default'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// export this package's api
	module.exports = __webpack_require__(166);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _ChildrenUtils = __webpack_require__(167);

	var _AnimateChild = __webpack_require__(168);

	var _AnimateChild2 = _interopRequireDefault(_AnimateChild);

	var _util = __webpack_require__(173);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultKey = 'rc_animate_' + Date.now();


	function getChildrenFromProps(props) {
	  var children = props.children;
	  if (_react2["default"].isValidElement(children)) {
	    if (!children.key) {
	      return _react2["default"].cloneElement(children, {
	        key: defaultKey
	      });
	    }
	  }
	  return children;
	}

	function noop() {}

	var Animate = _react2["default"].createClass({
	  displayName: 'Animate',

	  propTypes: {
	    component: _react2["default"].PropTypes.any,
	    animation: _react2["default"].PropTypes.object,
	    transitionName: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.object]),
	    transitionEnter: _react2["default"].PropTypes.bool,
	    transitionAppear: _react2["default"].PropTypes.bool,
	    exclusive: _react2["default"].PropTypes.bool,
	    transitionLeave: _react2["default"].PropTypes.bool,
	    onEnd: _react2["default"].PropTypes.func,
	    onEnter: _react2["default"].PropTypes.func,
	    onLeave: _react2["default"].PropTypes.func,
	    onAppear: _react2["default"].PropTypes.func,
	    showProp: _react2["default"].PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: {},
	      component: 'span',
	      transitionEnter: true,
	      transitionLeave: true,
	      transitionAppear: false,
	      onEnd: noop,
	      onEnter: noop,
	      onLeave: noop,
	      onAppear: noop
	    };
	  },
	  getInitialState: function getInitialState() {
	    this.currentlyAnimatingKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    return {
	      children: (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props))
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    var showProp = this.props.showProp;
	    var children = this.state.children;
	    if (showProp) {
	      children = children.filter(function (child) {
	        return !!child.props[showProp];
	      });
	    }
	    children.forEach(function (child) {
	      if (child) {
	        _this.performAppear(child.key);
	      }
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this2 = this;

	    this.nextProps = nextProps;
	    var nextChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(nextProps));
	    var props = this.props;
	    // exclusive needs immediate response
	    if (props.exclusive) {
	      Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
	        _this2.stop(key);
	      });
	    }
	    var showProp = props.showProp;
	    var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
	    // last props children if exclusive
	    var currentChildren = props.exclusive ? (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props)) : this.state.children;
	    // in case destroy in showProp mode
	    var newChildren = [];
	    if (showProp) {
	      currentChildren.forEach(function (currentChild) {
	        var nextChild = currentChild && (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, currentChild.key);
	        var newChild = void 0;
	        if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
	          newChild = _react2["default"].cloneElement(nextChild || currentChild, _defineProperty({}, showProp, true));
	        } else {
	          newChild = nextChild;
	        }
	        if (newChild) {
	          newChildren.push(newChild);
	        }
	      });
	      nextChildren.forEach(function (nextChild) {
	        if (!nextChild || !(0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, nextChild.key)) {
	          newChildren.push(nextChild);
	        }
	      });
	    } else {
	      newChildren = (0, _ChildrenUtils.mergeChildren)(currentChildren, nextChildren);
	    }

	    // need render to avoid update
	    this.setState({
	      children: newChildren
	    });

	    nextChildren.forEach(function (child) {
	      var key = child && child.key;
	      if (child && currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasPrev = child && (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	      if (showProp) {
	        var showInNext = child.props[showProp];
	        if (hasPrev) {
	          var showInNow = (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	          if (!showInNow && showInNext) {
	            _this2.keysToEnter.push(key);
	          }
	        } else if (showInNext) {
	          _this2.keysToEnter.push(key);
	        }
	      } else if (!hasPrev) {
	        _this2.keysToEnter.push(key);
	      }
	    });

	    currentChildren.forEach(function (child) {
	      var key = child && child.key;
	      if (child && currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasNext = child && (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, key);
	      if (showProp) {
	        var showInNow = child.props[showProp];
	        if (hasNext) {
	          var showInNext = (0, _ChildrenUtils.findShownChildInChildrenByKey)(nextChildren, key, showProp);
	          if (!showInNext && showInNow) {
	            _this2.keysToLeave.push(key);
	          }
	        } else if (showInNow) {
	          _this2.keysToLeave.push(key);
	        }
	      } else if (!hasNext) {
	        _this2.keysToLeave.push(key);
	      }
	    });
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);
	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },
	  performEnter: function performEnter(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillEnter(this.handleDoneAdding.bind(this, key, 'enter'));
	    }
	  },
	  performAppear: function performAppear(key) {
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillAppear(this.handleDoneAdding.bind(this, key, 'appear'));
	    }
	  },
	  handleDoneAdding: function handleDoneAdding(key, type) {
	    var props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    if (!this.isValidChildByKey(currentChildren, key)) {
	      // exclusive will not need this
	      this.performLeave(key);
	    } else {
	      if (type === 'appear') {
	        if (_util2["default"].allowAppearCallback(props)) {
	          props.onAppear(key);
	          props.onEnd(key, true);
	        }
	      } else {
	        if (_util2["default"].allowEnterCallback(props)) {
	          props.onEnter(key);
	          props.onEnd(key, true);
	        }
	      }
	    }
	  },
	  performLeave: function performLeave(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
	    }
	  },
	  handleDoneLeaving: function handleDoneLeaving(key) {
	    var props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    // in case state change is too fast
	    if (this.isValidChildByKey(currentChildren, key)) {
	      this.performEnter(key);
	    } else {
	      var end = function end() {
	        if (_util2["default"].allowLeaveCallback(props)) {
	          props.onLeave(key);
	          props.onEnd(key, false);
	        }
	      };
	      /* eslint react/no-is-mounted:0 */
	      if (this.isMounted() && !(0, _ChildrenUtils.isSameChildren)(this.state.children, currentChildren, props.showProp)) {
	        this.setState({
	          children: currentChildren
	        }, end);
	      } else {
	        end();
	      }
	    }
	  },
	  isValidChildByKey: function isValidChildByKey(currentChildren, key) {
	    var showProp = this.props.showProp;
	    if (showProp) {
	      return (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	    }
	    return (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	  },
	  stop: function stop(key) {
	    delete this.currentlyAnimatingKeys[key];
	    var component = this.refs[key];
	    if (component) {
	      component.stop();
	    }
	  },
	  render: function render() {
	    var props = this.props;
	    this.nextProps = props;
	    var stateChildren = this.state.children;
	    var children = null;
	    if (stateChildren) {
	      children = stateChildren.map(function (child) {
	        if (child === null || child === undefined) {
	          return child;
	        }
	        if (!child.key) {
	          throw new Error('must set key for <rc-animate> children');
	        }
	        return _react2["default"].createElement(
	          _AnimateChild2["default"],
	          {
	            key: child.key,
	            ref: child.key,
	            animation: props.animation,
	            transitionName: props.transitionName,
	            transitionEnter: props.transitionEnter,
	            transitionAppear: props.transitionAppear,
	            transitionLeave: props.transitionLeave
	          },
	          child
	        );
	      });
	    }
	    var Component = props.component;
	    if (Component) {
	      var passedProps = props;
	      if (typeof Component === 'string') {
	        passedProps = {
	          className: props.className,
	          style: props.style
	        };
	      }
	      return _react2["default"].createElement(
	        Component,
	        passedProps,
	        children
	      );
	    }
	    return children[0] || null;
	  }
	});

	exports["default"] = Animate;
	module.exports = exports['default'];

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArrayChildren = toArrayChildren;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.findShownChildInChildrenByKey = findShownChildInChildrenByKey;
	exports.findHiddenChildInChildrenByKey = findHiddenChildInChildrenByKey;
	exports.isSameChildren = isSameChildren;
	exports.mergeChildren = mergeChildren;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function toArrayChildren(children) {
	  var ret = [];
	  _react2["default"].Children.forEach(children, function (child) {
	    ret.push(child);
	  });
	  return ret;
	}

	function findChildInChildrenByKey(children, key) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (ret) {
	        return;
	      }
	      if (child && child.key === key) {
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findShownChildInChildrenByKey(children, key, showProp) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (child && child.key === key && child.props[showProp]) {
	        if (ret) {
	          throw new Error('two child with same key for <rc-animate> children');
	        }
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findHiddenChildInChildrenByKey(children, key, showProp) {
	  var found = 0;
	  if (children) {
	    children.forEach(function (child) {
	      if (found) {
	        return;
	      }
	      found = child && child.key === key && !child.props[showProp];
	    });
	  }
	  return found;
	}

	function isSameChildren(c1, c2, showProp) {
	  var same = c1.length === c2.length;
	  if (same) {
	    c1.forEach(function (child, index) {
	      var child2 = c2[index];
	      if (child && child2) {
	        if (child && !child2 || !child && child2) {
	          same = false;
	        } else if (child.key !== child2.key) {
	          same = false;
	        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
	          same = false;
	        }
	      }
	    });
	  }
	  return same;
	}

	function mergeChildren(prev, next) {
	  var ret = [];

	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextChildrenPending = {};
	  var pendingChildren = [];
	  prev.forEach(function (child) {
	    if (child && findChildInChildrenByKey(next, child.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[child.key] = pendingChildren;
	        pendingChildren = [];
	      }
	    } else {
	      pendingChildren.push(child);
	    }
	  });

	  next.forEach(function (child) {
	    if (child && nextChildrenPending.hasOwnProperty(child.key)) {
	      ret = ret.concat(nextChildrenPending[child.key]);
	    }
	    ret.push(child);
	  });

	  ret = ret.concat(pendingChildren);

	  return ret;
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _cssAnimation = __webpack_require__(169);

	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

	var _util = __webpack_require__(173);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var transitionMap = {
	  enter: 'transitionEnter',
	  appear: 'transitionAppear',
	  leave: 'transitionLeave'
	};

	var AnimateChild = _react2["default"].createClass({
	  displayName: 'AnimateChild',

	  propTypes: {
	    children: _react2["default"].PropTypes.any
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.stop();
	  },
	  componentWillEnter: function componentWillEnter(done) {
	    if (_util2["default"].isEnterSupported(this.props)) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },
	  componentWillAppear: function componentWillAppear(done) {
	    if (_util2["default"].isAppearSupported(this.props)) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },
	  componentWillLeave: function componentWillLeave(done) {
	    if (_util2["default"].isLeaveSupported(this.props)) {
	      this.transition('leave', done);
	    } else {
	      // always sync, do not interupt with react component life cycle
	      // update hidden -> animate hidden ->
	      // didUpdate -> animate leave -> unmount (if animate is none)
	      done();
	    }
	  },
	  transition: function transition(animationType, finishCallback) {
	    var _this = this;

	    var node = _reactDom2["default"].findDOMNode(this);
	    var props = this.props;
	    var transitionName = props.transitionName;
	    var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
	    this.stop();
	    var end = function end() {
	      _this.stopper = null;
	      finishCallback();
	    };
	    if ((_cssAnimation.isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
	      var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
	      var activeName = name + '-active';
	      if (nameIsObj && transitionName[animationType + 'Active']) {
	        activeName = transitionName[animationType + 'Active'];
	      }
	      this.stopper = (0, _cssAnimation2["default"])(node, {
	        name: name,
	        active: activeName
	      }, end);
	    } else {
	      this.stopper = props.animation[animationType](node, end);
	    }
	  },
	  stop: function stop() {
	    var stopper = this.stopper;
	    if (stopper) {
	      this.stopper = null;
	      stopper.stop();
	    }
	  },
	  render: function render() {
	    return this.props.children;
	  }
	});

	exports["default"] = AnimateChild;
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _Event = __webpack_require__(170);

	var _Event2 = _interopRequireDefault(_Event);

	var _componentClasses = __webpack_require__(171);

	var _componentClasses2 = _interopRequireDefault(_componentClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var isCssAnimationSupported = _Event2["default"].endEvents.length !== 0;


	var capitalPrefixes = ['Webkit', 'Moz', 'O',
	// ms is special .... !
	'ms'];
	var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

	function getStyleProperty(node, name) {
	  var style = window.getComputedStyle(node);

	  var ret = '';
	  for (var i = 0; i < prefixes.length; i++) {
	    ret = style.getPropertyValue(prefixes[i] + name);
	    if (ret) {
	      break;
	    }
	  }
	  return ret;
	}

	function fixBrowserByTimeout(node) {
	  if (isCssAnimationSupported) {
	    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
	    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
	    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
	    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
	    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
	    // sometimes, browser bug
	    node.rcEndAnimTimeout = setTimeout(function () {
	      node.rcEndAnimTimeout = null;
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }, time * 1000 + 200);
	  }
	}

	function clearBrowserBugTimeout(node) {
	  if (node.rcEndAnimTimeout) {
	    clearTimeout(node.rcEndAnimTimeout);
	    node.rcEndAnimTimeout = null;
	  }
	}

	var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
	  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
	  var className = nameIsObj ? transitionName.name : transitionName;
	  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
	  var end = endCallback;
	  var start = void 0;
	  var active = void 0;
	  var nodeClasses = (0, _componentClasses2["default"])(node);

	  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
	    end = endCallback.end;
	    start = endCallback.start;
	    active = endCallback.active;
	  }

	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    nodeClasses.remove(className);
	    nodeClasses.remove(activeClassName);

	    _Event2["default"].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional end is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (end) {
	      end();
	    }
	  };

	  _Event2["default"].addEndEventListener(node, node.rcEndListener);

	  if (start) {
	    start();
	  }
	  nodeClasses.add(className);

	  node.rcAnimTimeout = setTimeout(function () {
	    node.rcAnimTimeout = null;
	    nodeClasses.add(activeClassName);
	    if (active) {
	      setTimeout(active, 0);
	    }
	    fixBrowserByTimeout(node);
	    // 30ms for firefox
	  }, 30);

	  return {
	    stop: function stop() {
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }
	  };
	};

	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    _Event2["default"].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };

	  _Event2["default"].addEndEventListener(node, node.rcEndListener);

	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      if (style.hasOwnProperty(s)) {
	        node.style[s] = style[s];
	      }
	    }
	    node.rcAnimTimeout = null;
	    fixBrowserByTimeout(node);
	  }, 0);
	};

	cssAnimation.setTransition = function (node, p, value) {
	  var property = p;
	  var v = value;
	  if (value === undefined) {
	    v = property;
	    property = '';
	  }
	  property = property || '';
	  capitalPrefixes.forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};

	cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

	exports["default"] = cssAnimation;
	module.exports = exports['default'];

/***/ },
/* 170 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },

	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
	      var baseEvents = EVENT_NAME_MAP[baseEventName];
	      for (var styleName in baseEvents) {
	        if (styleName in style) {
	          endEvents.push(baseEvents[styleName]);
	          break;
	        }
	      }
	    }
	  }
	}

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  detectEvents();
	}

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },


	  endEvents: endEvents,

	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	exports["default"] = TransitionEvents;
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var index = __webpack_require__(172);
	} catch (err) {
	  var index = __webpack_require__(172);
	}

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 172 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 173 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var util = {
	  isAppearSupported: function isAppearSupported(props) {
	    return props.transitionName && props.transitionAppear || props.animation.appear;
	  },
	  isEnterSupported: function isEnterSupported(props) {
	    return props.transitionName && props.transitionEnter || props.animation.enter;
	  },
	  isLeaveSupported: function isLeaveSupported(props) {
	    return props.transitionName && props.transitionLeave || props.animation.leave;
	  },
	  allowAppearCallback: function allowAppearCallback(props) {
	    return props.transitionAppear || props.animation.appear;
	  },
	  allowEnterCallback: function allowEnterCallback(props) {
	    return props.transitionEnter || props.animation.enter;
	  },
	  allowLeaveCallback: function allowLeaveCallback(props) {
	    return props.transitionLeave || props.animation.leave;
	  }
	};
	exports["default"] = util;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _LazyRenderBox = __webpack_require__(175);

	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var PopupInner = _react2["default"].createClass({
	  displayName: 'PopupInner',

	  propTypes: {
	    hiddenClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseEnter: _react.PropTypes.func,
	    onMouseLeave: _react.PropTypes.func,
	    children: _react.PropTypes.any
	  },
	  render: function render() {
	    var props = this.props;
	    var className = props.className;
	    if (!props.visible) {
	      className += ' ' + props.hiddenClassName;
	    }
	    return _react2["default"].createElement(
	      'div',
	      {
	        className: className,
	        onMouseEnter: props.onMouseEnter,
	        onMouseLeave: props.onMouseLeave,
	        style: props.style
	      },
	      _react2["default"].createElement(
	        _LazyRenderBox2["default"],
	        { className: props.prefixCls + '-content', visible: props.visible },
	        props.children
	      )
	    );
	  }
	});

	exports["default"] = PopupInner;
	module.exports = exports['default'];

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _objectWithoutProperties2 = __webpack_require__(176);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var LazyRenderBox = _react2["default"].createClass({
	  displayName: 'LazyRenderBox',

	  propTypes: {
	    children: _react.PropTypes.any,
	    className: _react.PropTypes.string,
	    visible: _react.PropTypes.bool,
	    hiddenClassName: _react.PropTypes.string
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.hiddenClassName || nextProps.visible;
	  },
	  render: function render() {
	    var _props = this.props,
	        hiddenClassName = _props.hiddenClassName,
	        visible = _props.visible,
	        props = (0, _objectWithoutProperties3["default"])(_props, ['hiddenClassName', 'visible']);


	    if (hiddenClassName || _react2["default"].Children.count(props.children) > 1) {
	      if (!visible && hiddenClassName) {
	        props.className += ' ' + hiddenClassName;
	      }
	      return _react2["default"].createElement('div', props);
	    }

	    return _react2["default"].Children.only(props.children);
	  }
	});

	exports["default"] = LazyRenderBox;
	module.exports = exports['default'];

/***/ },
/* 176 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(99);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.getAlignFromPlacement = getAlignFromPlacement;
	exports.getPopupClassNameFromAlign = getPopupClassNameFromAlign;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function isPointsEq(a1, a2) {
	  return a1[0] === a2[0] && a1[1] === a2[1];
	}

	function getAlignFromPlacement(builtinPlacements, placementStr, align) {
	  var baseAlign = builtinPlacements[placementStr] || {};
	  return (0, _extends3["default"])({}, baseAlign, align);
	}

	function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
	  var points = align.points;
	  for (var placement in builtinPlacements) {
	    if (builtinPlacements.hasOwnProperty(placement)) {
	      if (isPointsEq(builtinPlacements[placement].points, points)) {
	        return prefixCls + '-placement-' + placement;
	      }
	    }
	  }
	  return '';
	}

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = getContainerRenderMixin;

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function defaultGetContainer() {
	  var container = document.createElement('div');
	  document.body.appendChild(container);
	  return container;
	}

	function getContainerRenderMixin(config) {
	  var _config$autoMount = config.autoMount,
	      autoMount = _config$autoMount === undefined ? true : _config$autoMount,
	      _config$autoDestroy = config.autoDestroy,
	      autoDestroy = _config$autoDestroy === undefined ? true : _config$autoDestroy,
	      isVisible = config.isVisible,
	      getComponent = config.getComponent,
	      _config$getContainer = config.getContainer,
	      getContainer = _config$getContainer === undefined ? defaultGetContainer : _config$getContainer;


	  var mixin = void 0;

	  function _renderComponent(instance, componentArg, ready) {
	    if (!isVisible || instance._component || isVisible(instance)) {
	      if (!instance._container) {
	        instance._container = getContainer(instance);
	      }
	      var component = void 0;
	      if (instance.getComponent) {
	        component = instance.getComponent(componentArg);
	      } else {
	        component = getComponent(instance, componentArg);
	      }
	      _reactDom2["default"].unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
	        instance._component = this;
	        if (ready) {
	          ready.call(this);
	        }
	      });
	    }
	  }

	  if (autoMount) {
	    mixin = _extends({}, mixin, {
	      componentDidMount: function componentDidMount() {
	        _renderComponent(this);
	      },
	      componentDidUpdate: function componentDidUpdate() {
	        _renderComponent(this);
	      }
	    });
	  }

	  if (!autoMount || !autoDestroy) {
	    mixin = _extends({}, mixin, {
	      renderComponent: function renderComponent(componentArg, ready) {
	        _renderComponent(this, componentArg, ready);
	      }
	    });
	  }

	  function _removeContainer(instance) {
	    if (instance._container) {
	      var container = instance._container;
	      _reactDom2["default"].unmountComponentAtNode(container);
	      container.parentNode.removeChild(container);
	      instance._container = null;
	    }
	  }

	  if (autoDestroy) {
	    mixin = _extends({}, mixin, {
	      componentWillUnmount: function componentWillUnmount() {
	        _removeContainer(this);
	      }
	    });
	  } else {
	    mixin = _extends({}, mixin, {
	      removeContainer: function removeContainer() {
	        _removeContainer(this);
	      }
	    });
	  }

	  return mixin;
	}
	module.exports = exports['default'];

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(41);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _warning = __webpack_require__(180);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function calcPoints(vertical, marks, dots, step, min, max) {
	  (0, _warning2["default"])(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
	  var points = Object.keys(marks).map(parseFloat);
	  if (dots) {
	    for (var i = min; i <= max; i = i + step) {
	      if (points.indexOf(i) >= 0) continue;
	      points.push(i);
	    }
	  }
	  return points;
	}

	var Steps = function Steps(_ref) {
	  var prefixCls = _ref.prefixCls,
	      vertical = _ref.vertical,
	      marks = _ref.marks,
	      dots = _ref.dots,
	      step = _ref.step,
	      included = _ref.included,
	      lowerBound = _ref.lowerBound,
	      upperBound = _ref.upperBound,
	      max = _ref.max,
	      min = _ref.min;

	  var range = max - min;
	  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
	    var _classNames;

	    var offset = Math.abs(point - min) / range * 100 + '%';
	    var style = vertical ? { bottom: offset } : { left: offset };

	    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
	    var pointClassName = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-dot', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-dot-active', isActived), _classNames));

	    return _react2["default"].createElement('span', { className: pointClassName, style: style, key: point });
	  });

	  return _react2["default"].createElement(
	    'div',
	    { className: prefixCls + '-step' },
	    elements
	  );
	};

	exports["default"] = Steps;
	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if ((undefined) !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(99);

	var _extends3 = _interopRequireDefault(_extends2);

	var _typeof2 = __webpack_require__(108);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(41);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Marks = function Marks(_ref) {
	  var className = _ref.className,
	      vertical = _ref.vertical,
	      marks = _ref.marks,
	      included = _ref.included,
	      upperBound = _ref.upperBound,
	      lowerBound = _ref.lowerBound,
	      max = _ref.max,
	      min = _ref.min;

	  var marksKeys = Object.keys(marks);
	  var marksCount = marksKeys.length;
	  var unit = 100 / (marksCount - 1);
	  var markWidth = unit * 0.9;

	  var range = max - min;
	  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
	    return a - b;
	  }).map(function (point) {
	    var _classNames;

	    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
	    var markClassName = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, className + '-text', true), (0, _defineProperty3["default"])(_classNames, className + '-text-active', isActived), _classNames));

	    var bottomStyle = {
	      // height: markWidth + '%',
	      marginBottom: '-50%',
	      bottom: (point - min) / range * 100 + '%'
	    };

	    var leftStyle = {
	      width: markWidth + '%',
	      marginLeft: -markWidth / 2 + '%',
	      left: (point - min) / range * 100 + '%'
	    };

	    var style = vertical ? bottomStyle : leftStyle;

	    var markPoint = marks[point];
	    var markPointIsObject = (typeof markPoint === 'undefined' ? 'undefined' : (0, _typeof3["default"])(markPoint)) === 'object' && !_react2["default"].isValidElement(markPoint);
	    var markLabel = markPointIsObject ? markPoint.label : markPoint;
	    var markStyle = markPointIsObject ? (0, _extends3["default"])({}, style, markPoint.style) : style;
	    return _react2["default"].createElement(
	      'span',
	      { className: markClassName, style: markStyle, key: point },
	      markLabel
	    );
	  });

	  return _react2["default"].createElement(
	    'div',
	    { className: className },
	    elements
	  );
	};

	exports["default"] = Marks;
	module.exports = exports['default'];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppbaseSearch = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ImmutableQuery = __webpack_require__(8);

	var _reactSelect = __webpack_require__(183);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _ChannelManager = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var AppbaseSearch = exports.AppbaseSearch = function (_Component) {
		_inherits(AppbaseSearch, _Component);

		function AppbaseSearch(props, context) {
			_classCallCheck(this, AppbaseSearch);

			var _this = _possibleConstructorReturn(this, (AppbaseSearch.__proto__ || Object.getPrototypeOf(AppbaseSearch)).call(this, props));

			_this.state = {
				items: [],
				currentValue: null,
				rawData: {
					hits: {
						hits: []
					}
				}
			};
			_this.type = 'match_phrase';
			_this.handleSearch = _this.handleSearch.bind(_this);
			_this.setValue = _this.setValue.bind(_this);
			_this.defaultSearchQuery = _this.defaultSearchQuery.bind(_this);
			_this.previousSelectedSensor = {};
			return _this;
		}
		// Get the items from Appbase when component is mounted


		_createClass(AppbaseSearch, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
				this.createChannel();
				$(".Select-input input").css({
					'height': '20px',
					'-webkit-transition': 'none',
					'-moz-transition': 'none',
					'-ms-transition': 'none',
					'-o-transition': 'none',
					'transition': 'none'
				});
			}
			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
				var searchObj = {
					key: this.props.searchRef,
					value: {
						queryType: 'multi_match',
						inputData: this.props.inputData
					}
				};
				helper.selectedSensor.setSensorInfo(searchObj);
			}
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				var depends = this.props.depends ? this.props.depends : {};
				depends[this.props.searchRef] = {
					operation: "must",
					defaultQuery: this.defaultSearchQuery
				};
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
				channelObj.emitter.addListener(channelObj.channelId, function (res) {
					var data = res.data;
					var rawData = void 0;
					if (res.method === 'stream') {
						rawData = this.state.rawData;
						rawData.hits.hits.push(res.data);
					} else if (res.method === 'historic') {
						rawData = data;
					}
					this.setState({
						rawData: rawData
					});
					this.setData(rawData);
				}.bind(this));
			}
			//default query

		}, {
			key: 'defaultSearchQuery',
			value: function defaultSearchQuery(value) {
				return {
					"match_phrase_prefix": _defineProperty({}, this.props.inputData, value)
				};
			}

			// set value to search

		}, {
			key: 'setValue',
			value: function setValue(value, callback) {
				var obj = {
					key: this.props.searchRef,
					value: value
				};
				helper.selectedSensor.set(obj, true);
				this.callback = callback;
				if (!value) {
					this.callback(null, {
						options: []
					});
				}
			}

			// set data after get the result

		}, {
			key: 'setData',
			value: function setData(data) {
				var _this2 = this;

				var options = [];
				var searchField = 'hit._source.' + this.props.inputData;
				// Check if this is Geo search or field tag search
				if (this.props.isGeoSearch) {
					(function () {
						// If it is Geo, we return the location field
						var latField = 'hit._source.' + _this2.props.latField;
						var lonField = 'hit._source.' + _this2.props.lonField;
						data.hits.hits.map(function (hit) {
							var location = {
								lat: eval(latField),
								lon: eval(lonField)
							};
							options.push({ value: location, label: eval(searchField) });
						});
					})();
				} else {
					data.hits.hits.map(function (hit) {
						options.push({ value: eval(searchField), label: eval(searchField) });
					});
				}
				options = this.removeDuplicates(options, "label");
				if (this.callback) {
					this.callback(null, {
						options: options
					});
				}
			}
			// Search results often contain duplicate results, so display only unique values

		}, {
			key: 'removeDuplicates',
			value: function removeDuplicates(myArr, prop) {
				return myArr.filter(function (obj, pos, arr) {
					return arr.map(function (mapObj) {
						return mapObj[prop];
					}).indexOf(obj[prop]) === pos;
				});
			}
			// When user has selected a search value

		}, {
			key: 'handleSearch',
			value: function handleSearch(currentValue) {
				var value = currentValue ? currentValue.value : null;
				value = value === 'null' ? null : value;
				var obj = {
					key: this.props.sensorId,
					value: value
				};
				helper.selectedSensor.set(obj, true);
				this.setState({
					currentValue: value
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'appbaseSearchComponent reactiveComponent' },
					_react2.default.createElement(_reactSelect2.default.Async, _extends({
						className: 'appbase-select',
						name: 'appbase-search',
						value: this.state.currentValue,
						loadOptions: this.setValue,
						onChange: this.handleSearch
					}, this.props))
				);
			}
		}]);

		return AppbaseSearch;
	}(_react.Component);

	AppbaseSearch.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		placeholder: _react2.default.PropTypes.string,
		isGeoSearch: _react2.default.PropTypes.bool,
		size: _react2.default.PropTypes.number
	};
	// Default props value
	AppbaseSearch.defaultProps = {
		placeholder: "Search...",
		isGeoSearch: false,
		size: 10,
		executeDepends: true,
		searchRef: "searchLetter"
	};

	// context type
	AppbaseSearch.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/react-select
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactInputAutosize = __webpack_require__(184);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utilsDefaultArrowRenderer = __webpack_require__(185);

	var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

	var _utilsDefaultFilterOptions = __webpack_require__(186);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(188);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var _Async = __webpack_require__(189);

	var _Async2 = _interopRequireDefault(_Async);

	var _AsyncCreatable = __webpack_require__(190);

	var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

	var _Creatable = __webpack_require__(191);

	var _Creatable2 = _interopRequireDefault(_Creatable);

	var _Option = __webpack_require__(192);

	var _Option2 = _interopRequireDefault(_Option);

	var _Value = __webpack_require__(193);

	var _Value2 = _interopRequireDefault(_Value);

	function stringifyValue(value) {
		var valueType = typeof value;
		if (valueType === 'string') {
			return value;
		} else if (valueType === 'object') {
			return JSON.stringify(value);
		} else if (valueType === 'number' || valueType === 'boolean') {
			return String(value);
		} else {
			return '';
		}
	}

	var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

	var instanceId = 1;

	var Select = _react2['default'].createClass({

		displayName: 'Select',

		propTypes: {
			addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
			'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
			arrowRenderer: _react2['default'].PropTypes.func, // Create drop-down caret element
			autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
			autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
			autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
			backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
			backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
			className: _react2['default'].PropTypes.string, // className for the outer element
			clearAllText: stringOrNode, // title for the "clear" control when multi: true
			clearValueText: stringOrNode, // title for the "clear" control
			clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
			delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
			disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
			escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
			filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
			filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
			ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
			ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
			inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
			instanceId: _react2['default'].PropTypes.string, // set the components instanceId
			isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
			labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
			menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
			menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
			menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
			menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
			multi: _react2['default'].PropTypes.bool, // multi-value input
			name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
			noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
			onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
			onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
			onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
			onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
			onCloseResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared when menu is closed through the arrow
			onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
			onInputKeyDown: _react2['default'].PropTypes.func, // input keyDown handler: function (event) {}
			onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
			onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
			onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
			openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
			openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
			optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
			optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
			optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
			options: _react2['default'].PropTypes.array, // array of options
			pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
			placeholder: stringOrNode, // field placeholder, displayed when there's no value
			required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
			resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
			scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
			searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
			simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
			style: _react2['default'].PropTypes.object, // optional style to apply to the control
			tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
			tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
			value: _react2['default'].PropTypes.any, // initial field value
			valueComponent: _react2['default'].PropTypes.func, // value component to render
			valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
			wrapperStyle: _react2['default'].PropTypes.object },

		// optional style to apply to the component wrapper
		statics: { Async: _Async2['default'], AsyncCreatable: _AsyncCreatable2['default'], Creatable: _Creatable2['default'] },

		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				arrowRenderer: _utilsDefaultArrowRenderer2['default'],
				autosize: true,
				backspaceRemoves: true,
				backspaceToRemoveMessage: 'Press backspace to remove {label}',
				clearable: true,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				delimiter: ',',
				disabled: false,
				escapeClearsValue: true,
				filterOptions: _utilsDefaultFilterOptions2['default'],
				ignoreAccents: true,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				joinValues: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				menuBuffer: 0,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				multi: false,
				noResultsText: 'No results found',
				onBlurResetsInput: true,
				onCloseResetsInput: true,
				openAfterFocus: false,
				optionComponent: _Option2['default'],
				pageSize: 5,
				placeholder: 'Select...',
				required: false,
				scrollMenuIntoView: true,
				searchable: true,
				simpleValue: false,
				tabSelectsValue: true,
				valueComponent: _Value2['default'],
				valueKey: 'value'
			};
		},

		getInitialState: function getInitialState() {
			return {
				inputValue: '',
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false,
				required: false
			};
		},

		componentWillMount: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		},

		componentDidMount: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			}
		},

		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		},

		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2['default'].findDOMNode(this.focused);
				var menuNode = _reactDom2['default'].findDOMNode(this.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2['default'].findDOMNode(this.focused);
				var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		},

		componentWillUnmount: function componentWillUnmount() {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		},

		toggleTouchOutsideEvent: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				document.addEventListener('touchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		},

		handleTouchOutside: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		},

		focus: function focus() {
			if (!this.input) return;
			this.input.focus();

			if (this.props.openAfterFocus) {
				this.setState({
					isOpen: true
				});
			}
		},

		blurInput: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		},

		handleTouchEndClearValue: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		},

		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				return;
			}

			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = true;
				this.focus();
			}
		},

		handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		},

		handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		},

		closeMenu: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: ''
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: this.state.inputValue
				});
			}
			this.hasScrolledToOption = false;
		},

		handleInputFocus: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		},

		handleInputBlur: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		},

		handleInputChange: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && typeof nextState !== 'object') {
					newInputValue = '' + nextState;
				}
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		},

		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				default:
					return;
			}
			event.preventDefault();
		},

		handleValueClick: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		},

		handleMenuScroll: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		},

		handleRequired: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		},

		getOptionLabel: function getOptionLabel(op) {
			return op[this.props.labelKey];
		},

		/**
	  * Turns a value into an array from the given options
	  * @param	{String|Number|Array}	value		- the value of the select input
	  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	  * @returns	{Array}	the value of the select represented in an array
	  */
		getValueArray: function getValueArray(value, nextProps) {
			var _this = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = typeof nextProps === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		},

		/**
	  * Retrieve a value from the given options and valueKey
	  * @param	{String|Number|Array}	value	- the selected value(s)
	  * @param	{Object}		props	- the Select component's props (or nextProps)
	  */
		expandValue: function expandValue(value, props) {
			var valueType = typeof value;
			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var options = props.options;
			var valueKey = props.valueKey;

			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		},

		setValue: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		},

		selectValue: function selectValue(value) {
			var _this3 = this;

			//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this3.addValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		},

		addValue: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.concat(value));
		},

		popValue: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		},

		removeValue: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		},

		clearValue: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(this.getResetValue());
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		},

		getResetValue: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		},

		focusOption: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		},

		focusNextOption: function focusNextOption() {
			this.focusAdjacentOption('next');
		},

		focusPreviousOption: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		},

		focusPageUpOption: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		},

		focusPageDownOption: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		},

		focusStartOption: function focusStartOption() {
			this.focusAdjacentOption('start');
		},

		focusEndOption: function focusEndOption() {
			this.focusAdjacentOption('end');
		},

		focusAdjacentOption: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		},

		getFocusedOption: function getFocusedOption() {
			return this._focusedOption;
		},

		getInputValue: function getInputValue() {
			return this.state.inputValue;
		},

		selectFocusedOption: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		},

		renderLoading: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				_react2['default'].createElement('span', { className: 'Select-loading' })
			);
		},

		renderValue: function renderValue(valueArray, isOpen) {
			var _this4 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2['default'].createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2['default'].createElement(
						ValueComponent,
						{
							id: _this4._instancePrefix + '-value-' + i,
							instancePrefix: _this4._instancePrefix,
							disabled: _this4.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this4.props.valueKey],
							onClick: onClick,
							onRemove: _this4.removeValue,
							value: value
						},
						renderLabel(value, i),
						_react2['default'].createElement(
							'span',
							{ className: 'Select-aria-only' },
							' '
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		},

		renderInput: function renderInput(valueArray, focusedOptionIndex) {
			var _this5 = this;

			if (this.props.inputRenderer) {
				return this.props.inputRenderer();
			} else {
				var _classNames;

				var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
				var isOpen = !!this.state.isOpen;

				var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

				// TODO: Check how this project includes Object.assign()
				var inputProps = _extends({}, this.props.inputProps, {
					role: 'combobox',
					'aria-expanded': '' + isOpen,
					'aria-owns': ariaOwns,
					'aria-haspopup': '' + isOpen,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-label': this.props['aria-label'],
					className: className,
					tabIndex: this.props.tabIndex,
					onBlur: this.handleInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref) {
						return _this5.input = _ref;
					},
					required: this.state.required,
					value: this.state.inputValue
				});

				if (this.props.disabled || !this.props.searchable) {
					var _props$inputProps = this.props.inputProps;
					var inputClassName = _props$inputProps.inputClassName;

					var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

					return _react2['default'].createElement('div', _extends({}, divProps, {
						role: 'combobox',
						'aria-expanded': isOpen,
						'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
						'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
						className: className,
						tabIndex: this.props.tabIndex || 0,
						onBlur: this.handleInputBlur,
						onFocus: this.handleInputFocus,
						ref: function (ref) {
							return _this5.input = ref;
						},
						'aria-readonly': '' + !!this.props.disabled,
						style: { border: 0, width: 1, display: 'inline-block' } }));
				}

				if (this.props.autosize) {
					return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5px' }));
				}
				return _react2['default'].createElement(
					'div',
					{ className: className },
					_react2['default'].createElement('input', inputProps)
				);
			}
		},

		renderClear: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue
				},
				_react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
			);
		},

		renderArrow: function renderArrow() {
			var onMouseDown = this.handleMouseDownOnArrow;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown });

			return _react2['default'].createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		},

		filterOptions: function filterOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

				return filterOptions(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		},

		onOptionRef: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		},

		renderMenu: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					onOptionRef: this.onOptionRef
				});
			} else if (this.props.noResultsText) {
				return _react2['default'].createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		},

		renderHiddenField: function renderHiddenField(valueArray) {
			var _this6 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this6.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2['default'].createElement('input', {
					type: 'hidden',
					ref: function (ref) {
						return _this6.value = ref;
					},
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2['default'].createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this6.props.name,
					value: stringifyValue(item[_this6.props.valueKey]),
					disabled: _this6.props.disabled });
			});
		},

		getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = options.indexOf(focusedOption);
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		},

		renderOuter: function renderOuter(options, valueArray, focusedOption) {
			var _this7 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this7.menuContainer = ref;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				_react2['default'].createElement(
					'div',
					{ ref: function (ref) {
							return _this7.menu = ref;
						}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
						style: this.props.menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu },
					menu
				)
			);
		},

		render: function render() {
			var _this8 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2['default'])('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2['default'].createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this8.wrapper = ref;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2['default'].createElement(
					'div',
					{ ref: function (ref) {
							return _this8.control = ref;
						},
						className: 'Select-control',
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove
					},
					_react2['default'].createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
			);
		}

	});

	exports['default'] = Select;
	module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);

	var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			className: React.PropTypes.string, // className for the outer element
			defaultValue: React.PropTypes.any, // default field value
			inputClassName: React.PropTypes.string, // className for the input element
			inputStyle: React.PropTypes.object, // css styles for the input element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			placeholder: React.PropTypes.string, // placeholder text
			placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
			style: React.PropTypes.object, // css styles for the outer element
			value: React.PropTypes.any },
		// field value
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var inputProps = _extends({}, this.props);
			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.placeholderIsMinWidth;
			return React.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				React.createElement('input', _extends({}, inputProps, { ref: 'input' })),
				React.createElement(
					'div',
					{ ref: 'sizer', style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? React.createElement(
					'div',
					{ ref: 'placeholderSizer', style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	});

	module.exports = AutosizeInput;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = arrowRenderer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function arrowRenderer(_ref) {
		var onMouseDown = _ref.onMouseDown;

		return _react2["default"].createElement("span", {
			className: "Select-arrow",
			onMouseDown: onMouseDown
		});
	}

	;
	module.exports = exports["default"];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stripDiacritics = __webpack_require__(187);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	function filterOptions(options, filterValue, excludeOptions, props) {
		var _this = this;

		if (props.ignoreAccents) {
			filterValue = (0, _stripDiacritics2['default'])(filterValue);
		}

		if (props.ignoreCase) {
			filterValue = filterValue.toLowerCase();
		}

		if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
			return i[props.valueKey];
		});

		return options.filter(function (option) {
			if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
			if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
			if (!filterValue) return true;
			var valueTest = String(option[props.valueKey]);
			var labelTest = String(option[props.labelKey]);
			if (props.ignoreAccents) {
				if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2['default'])(valueTest);
				if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2['default'])(labelTest);
			}
			if (props.ignoreCase) {
				if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
				if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
			}
			return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
		});
	}

	module.exports = filterOptions;

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';

	var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

	module.exports = function stripDiacritics(str) {
		for (var i = 0; i < map.length; i++) {
			str = str.replace(map[i].letters, map[i].base);
		}
		return str;
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function menuRenderer(_ref) {
		var focusedOption = _ref.focusedOption;
		var instancePrefix = _ref.instancePrefix;
		var labelKey = _ref.labelKey;
		var onFocus = _ref.onFocus;
		var onSelect = _ref.onSelect;
		var optionClassName = _ref.optionClassName;
		var optionComponent = _ref.optionComponent;
		var optionRenderer = _ref.optionRenderer;
		var options = _ref.options;
		var valueArray = _ref.valueArray;
		var valueKey = _ref.valueKey;
		var onOptionRef = _ref.onOptionRef;

		var Option = optionComponent;

		return options.map(function (option, i) {
			var isSelected = valueArray && valueArray.indexOf(option) > -1;
			var isFocused = option === focusedOption;
			var optionClass = (0, _classnames2['default'])(optionClassName, {
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': option.disabled
			});

			return _react2['default'].createElement(
				Option,
				{
					className: optionClass,
					instancePrefix: instancePrefix,
					isDisabled: option.disabled,
					isFocused: isFocused,
					isSelected: isSelected,
					key: 'option-' + i + '-' + option[valueKey],
					onFocus: onFocus,
					onSelect: onSelect,
					option: option,
					optionIndex: i,
					ref: function (ref) {
						onOptionRef(ref, isFocused);
					}
				},
				optionRenderer(option, i)
			);
		});
	}

	module.exports = menuRenderer;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(183);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsStripDiacritics = __webpack_require__(187);

	var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

	var propTypes = {
		autoload: _react2['default'].PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
		cache: _react2['default'].PropTypes.any, // object to use to cache results; set to null/false to disable caching
		children: _react2['default'].PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
		ignoreAccents: _react2['default'].PropTypes.bool, // strip diacritics when filtering; defaults to true
		ignoreCase: _react2['default'].PropTypes.bool, // perform case-insensitive filtering; defaults to true
		loadingPlaceholder: _react.PropTypes.string.isRequired, // replaces the placeholder while options are loading
		loadOptions: _react2['default'].PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
		options: _react.PropTypes.array.isRequired, // array of options
		placeholder: _react2['default'].PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		searchPromptText: _react2['default'].PropTypes.oneOfType([// label to prompt for search input
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node])
	};

	var defaultProps = {
		autoload: true,
		cache: {},
		children: defaultChildren,
		ignoreAccents: true,
		ignoreCase: true,
		loadingPlaceholder: 'Loading...',
		options: [],
		searchPromptText: 'Type to search'
	};

	var Async = (function (_Component) {
		_inherits(Async, _Component);

		function Async(props, context) {
			_classCallCheck(this, Async);

			_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

			this.state = {
				isLoading: false,
				options: props.options
			};

			this._onInputChange = this._onInputChange.bind(this);
		}

		_createClass(Async, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var autoload = this.props.autoload;

				if (autoload) {
					this.loadOptions('');
				}
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps, nextState) {
				var _this = this;

				var propertiesToSync = ['options'];
				propertiesToSync.forEach(function (prop) {
					if (_this.props[prop] !== nextProps[prop]) {
						_this.setState(_defineProperty({}, prop, nextProps[prop]));
					}
				});
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(inputValue) {
				var _this2 = this;

				var _props = this.props;
				var cache = _props.cache;
				var loadOptions = _props.loadOptions;

				if (cache && cache.hasOwnProperty(inputValue)) {
					this.setState({
						options: cache[inputValue]
					});

					return;
				}

				var callback = function callback(error, data) {
					if (callback === _this2._callback) {
						_this2._callback = null;

						var options = data && data.options || [];

						if (cache) {
							cache[inputValue] = options;
						}

						_this2.setState({
							isLoading: false,
							options: options
						});
					}
				};

				// Ignore all but the most recent request
				this._callback = callback;

				var promise = loadOptions(inputValue, callback);
				if (promise) {
					promise.then(function (data) {
						return callback(null, data);
					}, function (error) {
						return callback(error);
					});
				}

				if (this._callback && !this.state.isLoading) {
					this.setState({
						isLoading: true
					});
				}

				return inputValue;
			}
		}, {
			key: '_onInputChange',
			value: function _onInputChange(inputValue) {
				var _props2 = this.props;
				var ignoreAccents = _props2.ignoreAccents;
				var ignoreCase = _props2.ignoreCase;

				if (ignoreAccents) {
					inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
				}

				if (ignoreCase) {
					inputValue = inputValue.toLowerCase();
				}

				return this.loadOptions(inputValue);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props3 = this.props;
				var children = _props3.children;
				var loadingPlaceholder = _props3.loadingPlaceholder;
				var placeholder = _props3.placeholder;
				var searchPromptText = _props3.searchPromptText;
				var _state = this.state;
				var isLoading = _state.isLoading;
				var options = _state.options;

				var props = {
					noResultsText: isLoading ? loadingPlaceholder : searchPromptText,
					placeholder: isLoading ? loadingPlaceholder : placeholder,
					options: isLoading ? [] : options
				};

				return children(_extends({}, this.props, props, {
					isLoading: isLoading,
					onInputChange: this._onInputChange
				}));
			}
		}]);

		return Async;
	})(_react.Component);

	exports['default'] = Async;

	Async.propTypes = propTypes;
	Async.defaultProps = defaultProps;

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	};
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(183);

	var _Select2 = _interopRequireDefault(_Select);

	var AsyncCreatable = _react2['default'].createClass({
		displayName: 'AsyncCreatableSelect',

		render: function render() {
			var _this = this;

			return _react2['default'].createElement(
				_Select2['default'].Async,
				this.props,
				function (asyncProps) {
					return _react2['default'].createElement(
						_Select2['default'].Creatable,
						_this.props,
						function (creatableProps) {
							return _react2['default'].createElement(_Select2['default'], _extends({}, asyncProps, creatableProps, {
								onInputChange: function (input) {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								}
							}));
						}
					);
				}
			);
		}
	});

	module.exports = AsyncCreatable;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(183);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsDefaultFilterOptions = __webpack_require__(186);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(188);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var Creatable = _react2['default'].createClass({
		displayName: 'CreatableSelect',

		propTypes: {
			// Child function responsible for creating the inner Select component
			// This component can be used to compose HOCs (eg Creatable and Async)
			// (props: Object): PropTypes.element
			children: _react2['default'].PropTypes.func,

			// See Select.propTypes.filterOptions
			filterOptions: _react2['default'].PropTypes.any,

			// Searches for any matching option within the set of options.
			// This function prevents duplicate options from being created.
			// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
			isOptionUnique: _react2['default'].PropTypes.func,

			// Determines if the current input text represents a valid option.
			// ({ label: string }): boolean
			isValidNewOption: _react2['default'].PropTypes.func,

			// See Select.propTypes.menuRenderer
			menuRenderer: _react2['default'].PropTypes.any,

			// Factory to create new option.
			// ({ label: string, labelKey: string, valueKey: string }): Object
			newOptionCreator: _react2['default'].PropTypes.func,

			// See Select.propTypes.options
			options: _react2['default'].PropTypes.array,

			// Creates prompt/placeholder option text.
			// (filterText: string): string
			promptTextCreator: _react2['default'].PropTypes.func,

			// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
			shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
		},

		// Default prop methods
		statics: {
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		},

		getDefaultProps: function getDefaultProps() {
			return {
				filterOptions: _utilsDefaultFilterOptions2['default'],
				isOptionUnique: isOptionUnique,
				isValidNewOption: isValidNewOption,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				newOptionCreator: newOptionCreator,
				promptTextCreator: promptTextCreator,
				shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
			};
		},

		createNewOption: function createNewOption() {
			var _props = this.props;
			var isValidNewOption = _props.isValidNewOption;
			var newOptionCreator = _props.newOptionCreator;
			var _props$options = _props.options;
			var options = _props$options === undefined ? [] : _props$options;
			var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;

			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		},

		filterOptions: function filterOptions() {
			var _props2 = this.props;
			var filterOptions = _props2.filterOptions;
			var isValidNewOption = _props2.isValidNewOption;
			var options = _props2.options;
			var promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
			var excludeOptions = arguments[2] || [];

			var filteredOptions = filterOptions.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;

				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var _prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: _prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		},

		isOptionUnique: function isOptionUnique(_ref2) {
			var option = _ref2.option;
			var options = _ref2.options;
			var isOptionUnique = this.props.isOptionUnique;

			options = options || this.select.filterOptions();

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		},

		menuRenderer: function menuRenderer(params) {
			var menuRenderer = this.props.menuRenderer;

			return menuRenderer(_extends({}, params, {
				onSelect: this.onOptionSelect
			}));
		},

		onInputChange: function onInputChange(input) {
			// This value may be needed in between Select mounts (when this.select is null)
			this.inputValue = input;
		},

		onInputKeyDown: function onInputKeyDown(event) {
			var shouldKeyDownEventCreateNewOption = this.props.shouldKeyDownEventCreateNewOption;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			}
		},

		onOptionSelect: function onOptionSelect(option, event) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		},

		render: function render() {
			var _this = this;

			var _props3 = this.props;
			var _props3$children = _props3.children;
			var children = _props3$children === undefined ? defaultChildren : _props3$children;
			var newOptionCreator = _props3.newOptionCreator;
			var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;

			var restProps = _objectWithoutProperties(_props3, ['children', 'newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref) {
					_this.select = _ref;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref) {
						_this.labelKey = _ref.props.labelKey;
						_this.valueKey = _ref.props.valueKey;
					}
				}
			});

			return children(props);
		}
	});

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	};

	function isOptionUnique(_ref3) {
		var option = _ref3.option;
		var options = _ref3.options;
		var labelKey = _ref3.labelKey;
		var valueKey = _ref3.valueKey;

		return options.filter(function (existingOption) {
			return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
		}).length === 0;
	};

	function isValidNewOption(_ref4) {
		var label = _ref4.label;

		return !!label;
	};

	function newOptionCreator(_ref5) {
		var label = _ref5.label;
		var labelKey = _ref5.labelKey;
		var valueKey = _ref5.valueKey;

		var option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.className = 'Select-create-option-placeholder';
		return option;
	};

	function promptTextCreator(label) {
		return 'Create option "' + label + '"';
	}

	function shouldKeyDownEventCreateNewOption(_ref6) {
		var keyCode = _ref6.keyCode;

		switch (keyCode) {
			case 9: // TAB
			case 13: // ENTER
			case 188:
				// COMMA
				return true;
		}

		return false;
	};

	module.exports = Creatable;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Option = _react2['default'].createClass({
		displayName: 'Option',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			className: _react2['default'].PropTypes.string, // className (based on mouse position)
			instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
			isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
			isFocused: _react2['default'].PropTypes.bool, // the option is focused
			isSelected: _react2['default'].PropTypes.bool, // the option is selected
			onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
			onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
			onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
			option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
			optionIndex: _react2['default'].PropTypes.number },
		// index of the option, used to generate unique ids for aria
		blockEvent: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		},

		handleMouseDown: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		},

		handleMouseEnter: function handleMouseEnter(event) {
			this.onFocus(event);
		},

		handleMouseMove: function handleMouseMove(event) {
			this.onFocus(event);
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		onFocus: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		},
		render: function render() {
			var _props = this.props;
			var option = _props.option;
			var instancePrefix = _props.instancePrefix;
			var optionIndex = _props.optionIndex;

			var className = (0, _classnames2['default'])(this.props.className, option.className);

			return option.disabled ? _react2['default'].createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2['default'].createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	});

	module.exports = Option;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(29);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Value = _react2['default'].createClass({

		displayName: 'Value',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
			id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
			onClick: _react2['default'].PropTypes.func, // method to handle click on value label
			onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
			value: _react2['default'].PropTypes.object.isRequired },

		// the option object for this value
		handleMouseDown: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		},

		onRemove: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		},

		handleTouchEndRemove: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		renderRemoveIcon: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'×'
			);
		},

		renderLabel: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2['default'].createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		},

		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}

	});

	module.exports = Value;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DistanceSensor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ChannelManager = __webpack_require__(24);

	var _AppbaseSlider = __webpack_require__(26);

	var _rcSlider = __webpack_require__(39);

	var _rcSlider2 = _interopRequireDefault(_rcSlider);

	var _axios = __webpack_require__(195);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactSelect = __webpack_require__(183);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var DistanceSensor = exports.DistanceSensor = function (_Component) {
		_inherits(DistanceSensor, _Component);

		function DistanceSensor(props, context) {
			_classCallCheck(this, DistanceSensor);

			var _this = _possibleConstructorReturn(this, (DistanceSensor.__proto__ || Object.getPrototypeOf(DistanceSensor)).call(this, props));

			var value = _this.props.value < _this.props.minThreshold ? _this.props.minThreshold : _this.props.value;
			_this.state = {
				currentValue: '',
				currentDistance: _this.props.value + _this.props.unit,
				value: value
			};
			_this.type = 'geo_distance';
			_this.locString = '';
			_this.result = {
				options: []
			};
			_this.sortInfo = {
				type: '_geo_distance',
				order: 'asc',
				unit: 'mi'
			};
			_this.handleChange = _this.handleChange.bind(_this);
			_this.loadOptions = _this.loadOptions.bind(_this);
			_this.defaultQuery = _this.defaultQuery.bind(_this);
			_this.handleValuesChange = _this.handleValuesChange.bind(_this);
			_this.handleResults = _this.handleResults.bind(_this);
			_this.unitFormatter = _this.unitFormatter.bind(_this);
			return _this;
		}

		_createClass(DistanceSensor, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.googleMaps = window.google.maps;
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
				var _this2 = this;

				navigator.geolocation.getCurrentPosition(function (location) {
					_this2.locString = location.coords.latitude + ', ' + location.coords.longitude;

					_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + _this2.locString + '&key=' + _this2.props.APIkey).then(function (res) {
						var currentValue = res.data.results[0].formatted_address;
						_this2.result.options.push({
							'value': currentValue,
							'label': currentValue
						});
						_this2.setState({
							currentValue: currentValue
						}, _this2.executeQuery.bind(_this2));
					});
				});
			}

			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData,
						defaultQuery: this.defaultQuery
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}

			// build query for this sensor only

		}, {
			key: 'defaultQuery',
			value: function defaultQuery(value) {
				if (value && value.currentValue != '' && value.location != '') {
					var _type;

					return _defineProperty({}, this.type, (_type = {}, _defineProperty(_type, this.props.inputData, value.location), _defineProperty(_type, 'distance', value.currentDistance), _type));
				} else {
					return;
				}
			}

			// get coordinates

		}, {
			key: 'getCoordinates',
			value: function getCoordinates(value) {
				var _this3 = this;

				if (value && value != '') {
					_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + this.props.APIkey).then(function (res) {
						var location = res.data.results[0].geometry.location;
						_this3.locString = location.lat + ', ' + location.lng;
						_this3.executeQuery();
					});
				} else {
					helper.selectedSensor.set(null, true);
				}
			}

			// execute query after changing location or distanc

		}, {
			key: 'executeQuery',
			value: function executeQuery() {
				if (this.state.currentValue != '' && this.state.currentDistance && this.locString) {
					var _sortInfo$type;

					var obj = {
						key: this.props.sensorId,
						value: {
							currentValue: this.state.currentValue,
							currentDistance: this.state.currentDistance,
							location: this.locString
						}
					};
					var sortObj = {
						key: this.props.sensorId,
						value: _defineProperty({}, this.sortInfo.type, (_sortInfo$type = {}, _defineProperty(_sortInfo$type, this.props.inputData, this.locString), _defineProperty(_sortInfo$type, 'order', this.sortInfo.order), _defineProperty(_sortInfo$type, 'unit', this.sortInfo.unit), _sortInfo$type))
					};
					helper.selectedSensor.setSortInfo(sortObj);
					helper.selectedSensor.set(obj, true);
				}
			}

			// use this only if want to create actuators
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				var depends = this.props.depends ? this.props.depends : {};
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
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
			key: 'unitFormatter',
			value: function unitFormatter(v) {
				return v + ' ' + this.props.unit;
			}

			// Handle function when value slider option is changing

		}, {
			key: 'handleValuesChange',
			value: function handleValuesChange(component, value) {
				this.setState({
					value: value
				});
			}

			// Handle function when slider option change is completed

		}, {
			key: 'handleResults',
			value: function handleResults(value) {
				var distValue = value + this.props.unit;
				this.setState({
					value: value,
					currentDistance: distValue
				}, this.executeQuery.bind(this));
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(input, callback) {
				var _this4 = this;

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
							_this4.result.options.push({
								'value': place.description,
								'label': place.description
							});
						});
						_this4.callback(null, _this4.result);
					});
				} else {
					this.callback(null, this.result);
				}
			}

			// render

		}, {
			key: 'render',
			value: function render() {
				var title = null;
				if (this.props.title) {
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle' },
						this.props.title
					);
				}

				return _react2.default.createElement(
					'div',
					{ className: 'appbaseSearchComponent sliderComponent reactiveComponent clearfix card thumbnail col s12 col-xs-12' },
					title,
					_react2.default.createElement(_reactSelect2.default.Async, {
						className: 'appbase-select col s12 col-xs-6 p-0',
						name: 'appbase-search',
						value: this.state.currentValue,
						loadOptions: this.loadOptions,
						placeholder: this.props.placeholder,
						onChange: this.handleChange
					}),
					_react2.default.createElement(
						'div',
						{ className: 'sliderComponent' },
						_react2.default.createElement(
							'div',
							{ className: 'inputRangeContainer col s12 col-xs-6',
								style: { 'padding': '12px 4px 16px 16px', 'marginBottom': '25px' }
							},
							_react2.default.createElement(_rcSlider2.default, {
								tipFormatter: this.unitFormatter,
								defaultValue: this.state.value,
								min: this.props.minThreshold,
								max: this.props.maxThreshold,
								onAfterChange: this.handleResults
							})
						)
					)
				);
			}
		}]);

		return DistanceSensor;
	}(_react.Component);

	DistanceSensor.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		placeholder: _react2.default.PropTypes.string
	};
	// Default props value
	DistanceSensor.defaultProps = {
		value: 1,
		unit: 'km',
		placeholder: "Search...",
		size: 10
	};

	// context type
	DistanceSensor.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(196);

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);
	var bind = __webpack_require__(198);
	var Axios = __webpack_require__(199);
	var defaults = __webpack_require__(200);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(218);
	axios.CancelToken = __webpack_require__(219);
	axios.isCancel = __webpack_require__(215);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(220);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(198);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(200);
	var utils = __webpack_require__(197);
	var InterceptorManager = __webpack_require__(212);
	var dispatchRequest = __webpack_require__(213);
	var isAbsoluteURL = __webpack_require__(216);
	var combineURLs = __webpack_require__(217);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(197);
	var normalizeHeaderName = __webpack_require__(202);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(203);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(203);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(201)))

/***/ },
/* 201 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);
	var settle = __webpack_require__(204);
	var buildURL = __webpack_require__(207);
	var parseHeaders = __webpack_require__(208);
	var isURLSameOrigin = __webpack_require__(209);
	var createError = __webpack_require__(205);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(210);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if ((undefined) !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(211);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(205);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(206);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 206 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 210 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);
	var transformData = __webpack_require__(214);
	var isCancel = __webpack_require__(215);
	var defaults = __webpack_require__(200);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(197);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 215 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 216 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 218 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(218);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 220 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.InputField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ChannelManager = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var InputField = exports.InputField = function (_Component) {
		_inherits(InputField, _Component);

		function InputField(props, context) {
			_classCallCheck(this, InputField);

			var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this, props));

			_this.state = {
				currentValue: ''
			};
			_this.type = 'match';
			_this.handleChange = _this.handleChange.bind(_this);
			_this.defaultQuery = _this.defaultQuery.bind(_this);
			return _this;
		}

		// Set query information


		_createClass(InputField, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
			}

			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData,
						defaultQuery: this.defaultQuery
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}

			// build query for this sensor only

		}, {
			key: 'defaultQuery',
			value: function defaultQuery(value) {
				return {
					'term': _defineProperty({}, this.props.inputData, value)
				};
			}

			// use this only if want to create actuators
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				var depends = this.props.depends ? this.props.depends : {};
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
			}

			// handle the input change and pass the value inside sensor info

		}, {
			key: 'handleChange',
			value: function handleChange(event) {
				var inputVal = event.target.value;
				this.setState({
					'currentValue': inputVal
				});
				var obj = {
					key: this.props.sensorId,
					value: inputVal
				};

				// pass the selected sensor value with sensorId as key,
				var isExecuteQuery = true;
				helper.selectedSensor.set(obj, isExecuteQuery);
			}

			// render

		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'appbaseSearchComponent reactiveComponent' },
					_react2.default.createElement('input', { type: 'text', onChange: this.handleChange, placeholder: this.props.placeholder, value: this.state.currentValue })
				);
			}
		}]);

		return InputField;
	}(_react.Component);

	InputField.propTypes = {
		inputData: _react2.default.PropTypes.string,
		placeholder: _react2.default.PropTypes.string
	};
	// Default props value
	InputField.defaultProps = {
		placeholder: "Search...",
		size: 10
	};

	// context type
	InputField.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppbaseButtonGroup = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ChannelManager = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var AppbaseButtonGroup = exports.AppbaseButtonGroup = function (_Component) {
		_inherits(AppbaseButtonGroup, _Component);

		function AppbaseButtonGroup(props, context) {
			_classCallCheck(this, AppbaseButtonGroup);

			var _this = _possibleConstructorReturn(this, (AppbaseButtonGroup.__proto__ || Object.getPrototypeOf(AppbaseButtonGroup)).call(this, props));

			_this.state = {
				selected: null
			};
			_this.type = 'match';
			_this.handleChange = _this.handleChange.bind(_this);
			_this.defaultQuery = _this.defaultQuery.bind(_this);
			return _this;
		}

		// Set query information


		_createClass(AppbaseButtonGroup, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
				if (this.props.defaultSelected) {
					this.handleChange(this.props.defaultSelected);
				}
			}

			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData,
						defaultQuery: this.defaultQuery
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}

			// build query for this sensor only

		}, {
			key: 'defaultQuery',
			value: function defaultQuery(value) {
				return {
					'term': _defineProperty({}, this.props.inputData, value)
				};
			}

			// use this only if want to create actuators
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				var depends = this.props.depends ? this.props.depends : {};
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
			}

			// handle the input change and pass the value inside sensor info

		}, {
			key: 'handleChange',
			value: function handleChange(record) {
				this.setState({
					'selected': record
				});
				var obj = {
					key: this.props.sensorId,
					value: record
				};
				// pass the selected sensor value with sensorId as key,
				var isExecuteQuery = true;
				helper.selectedSensor.set(obj, isExecuteQuery);
			}
		}, {
			key: 'renderButtons',
			value: function renderButtons() {
				var _this2 = this;

				var buttons = void 0;
				var selectedText = this.state.selected && this.state.selected.text ? this.state.selected.text : '';
				if (this.props.data) {
					buttons = this.props.data.map(function (record, i) {
						return _react2.default.createElement(
							'button',
							{ key: i, className: "ab-buttonGroup-button btn " + (selectedText === record.text ? 'red' : ''),
								onClick: function onClick() {
									return _this2.handleChange(record);
								}, title: record.title ? record.title : record.text },
							record.text
						);
					});
				}
				return buttons;
			}
			// render

		}, {
			key: 'render',
			value: function render() {
				var title = void 0,
				    titleExists = void 0;
				if (this.props.title) {
					titleExists = true;
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle col s12 col-xs-12' },
						this.props.title
					);
				}
				return _react2.default.createElement(
					'div',
					{ className: "col s12 col-xs-12 card thumbnail ab-buttonGroupComponent reactiveComponent", style: this.props.defaultStyle },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						title,
						_react2.default.createElement(
							'div',
							{ className: 'col s12 col-xs-12' },
							this.renderButtons()
						)
					)
				);
			}
		}]);

		return AppbaseButtonGroup;
	}(_react.Component);

	AppbaseButtonGroup.propTypes = {
		inputData: _react2.default.PropTypes.string,
		placeholder: _react2.default.PropTypes.string,
		data: _react2.default.PropTypes.any.isRequired
	};
	// Default props value
	AppbaseButtonGroup.defaultProps = {
		placeholder: "Search...",
		size: 10
	};

	// context type
	AppbaseButtonGroup.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GoogleSearch = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ChannelManager = __webpack_require__(24);

	var _axios = __webpack_require__(195);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactSelect = __webpack_require__(183);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var GoogleSearch = exports.GoogleSearch = function (_Component) {
		_inherits(GoogleSearch, _Component);

		function GoogleSearch(props, context) {
			_classCallCheck(this, GoogleSearch);

			var _this = _possibleConstructorReturn(this, (GoogleSearch.__proto__ || Object.getPrototypeOf(GoogleSearch)).call(this, props));

			_this.state = {
				currentValue: '',
				currentDistance: 0,
				value: 0
			};
			_this.type = 'match';
			_this.locString = '';
			_this.result = {
				options: []
			};
			_this.handleChange = _this.handleChange.bind(_this);
			_this.loadOptions = _this.loadOptions.bind(_this);
			_this.defaultQuery = _this.defaultQuery.bind(_this);
			_this.handleValuesChange = _this.handleValuesChange.bind(_this);
			_this.handleResults = _this.handleResults.bind(_this);
			return _this;
		}

		_createClass(GoogleSearch, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.googleMaps = window.google.maps;
			}

			// Set query information

		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setQueryInfo();
				if (this.props.autoLocation) {
					this.getUserLocation();
				}
			}
		}, {
			key: 'getUserLocation',
			value: function getUserLocation() {
				var _this2 = this;

				navigator.geolocation.getCurrentPosition(function (location) {
					_this2.locString = location.coords.latitude + ', ' + location.coords.longitude;
					_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + _this2.locString + '&key=' + _this2.props.APIkey).then(function (res) {
						var currentValue = res.data.results[0].formatted_address;
						_this2.result.options.push({
							'value': currentValue,
							'label': currentValue
						});
						_this2.setState({
							currentValue: currentValue
						}, _this2.executeQuery.bind(_this2));
					});
				});
			}

			// set the query type and input data

		}, {
			key: 'setQueryInfo',
			value: function setQueryInfo() {
				var obj = {
					key: this.props.sensorId,
					value: {
						queryType: this.type,
						inputData: this.props.inputData,
						defaultQuery: this.defaultQuery
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}

			// build query for this sensor only

		}, {
			key: 'defaultQuery',
			value: function defaultQuery(value) {
				if (value && value.currentValue != '' && value.location != '') {
					var _type;

					return _defineProperty({}, this.type, (_type = {}, _defineProperty(_type, this.props.inputData, value.location), _defineProperty(_type, 'distance', value.currentDistance), _type));
				} else {
					return;
				}
			}

			// get coordinates

		}, {
			key: 'getCoordinates',
			value: function getCoordinates(value) {
				var _this3 = this;

				if (value && value != '') {
					_axios2.default.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + this.props.APIkey).then(function (res) {
						var location = res.data.results[0].geometry.location;
						_this3.locString = location.lat + ', ' + location.lng;
						_this3.executeQuery();
					});
				} else {
					helper.selectedSensor.set(null, true);
				}
			}

			// execute query after changing location or distanc

		}, {
			key: 'executeQuery',
			value: function executeQuery() {
				if (this.state.currentValue != '' && this.locString) {
					var obj = {
						key: this.props.sensorId,
						value: {
							currentValue: this.state.currentValue,
							location: this.locString
						}
					};
					helper.selectedSensor.set(obj, true);
				}
			}

			// use this only if want to create actuators
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				var depends = this.props.depends ? this.props.depends : {};
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends);
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

			// Handle function when value slider option is changing

		}, {
			key: 'handleValuesChange',
			value: function handleValuesChange(component, value) {
				this.setState({
					value: value
				});
			}

			// Handle function when slider option change is completed

		}, {
			key: 'handleResults',
			value: function handleResults(component, value) {
				value = value + this.props.unit;
				this.setState({
					currentDistance: value
				}, this.executeQuery.bind(this));
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(input, callback) {
				var _this4 = this;

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
							_this4.result.options.push({
								'value': place.description,
								'label': place.description
							});
						});
						_this4.callback(null, _this4.result);
					});
				} else {
					this.callback(null, this.result);
				}
			}

			// render

		}, {
			key: 'render',
			value: function render() {
				var title = null;
				if (this.props.title) {
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle' },
						this.props.title
					);
				}

				return _react2.default.createElement(
					'div',
					{ className: 'appbaseSearchComponent sliderComponent reactiveComponent clearfix card thumbnail col s12 col-xs-12' },
					title,
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(_reactSelect2.default.Async, {
							className: 'appbase-select col s12 col-xs-6 p-0',
							name: 'appbase-search',
							value: this.state.currentValue,
							loadOptions: this.loadOptions,
							placeholder: this.props.placeholder,
							onChange: this.handleChange
						})
					)
				);
			}
		}]);

		return GoogleSearch;
	}(_react.Component);

	GoogleSearch.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		placeholder: _react2.default.PropTypes.string
	};
	// Default props value
	GoogleSearch.defaultProps = {
		placeholder: "Search...",
		autoLocation: true
	};

	// context type
	GoogleSearch.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppbaseMap = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactGoogleMaps = __webpack_require__(225);

	var _InfoBox = __webpack_require__(272);

	var _InfoBox2 = _interopRequireDefault(_InfoBox);

	var _MarkerClusterer = __webpack_require__(276);

	var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

	var _ImmutableQuery = __webpack_require__(8);

	var _ChannelManager = __webpack_require__(24);

	var _AppbaseSearch = __webpack_require__(182);

	var _SearchAsMove = __webpack_require__(280);

	var _MapStyles = __webpack_require__(281);

	var _RotateIcon = __webpack_require__(282);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);
	var Style = __webpack_require__(6);

	var AppbaseMap = exports.AppbaseMap = function (_Component) {
		_inherits(AppbaseMap, _Component);

		function AppbaseMap(props, context) {
			_classCallCheck(this, AppbaseMap);

			var _this = _possibleConstructorReturn(this, (AppbaseMap.__proto__ || Object.getPrototypeOf(AppbaseMap)).call(this, props));

			_this.state = {
				markers: [],
				selectedMarker: null,
				streamingStatus: 'Intializing..',
				center: _this.props.defaultCenter,
				query: {},
				rawData: {
					hits: {
						hits: []
					}
				},
				externalData: {}
			};
			_this.previousSelectedSensor = {};
			_this.handleSearch = _this.handleSearch.bind(_this);
			_this.searchAsMoveChange = _this.searchAsMoveChange.bind(_this);
			_this.mapStyleChange = _this.mapStyleChange.bind(_this);
			_this.queryStartTime = 0;
			_this.reposition = false;
			return _this;
		}

		_createClass(AppbaseMap, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.createChannel();
				this.setGeoQueryInfo();
				var currentMapStyle = helper.getMapStyle(this.props.mapStyle);
				this.setState({
					currentMapStyle: currentMapStyle
				});
			}
			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				// Set the depends - add self aggs query as well with depends
				var depends = this.props.depends ? this.props.depends : {};
				depends['geoQuery'] = { operation: "must" };
				// create a channel and listen the changes
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends, this.props.requestSize);
				channelObj.emitter.addListener(channelObj.channelId, function (res) {
					var data = res.data;
					// implementation to prevent initialize query issue if old query response is late then the newer query 
					// then we will consider the response of new query and prevent to apply changes for old query response.
					// if queryStartTime of channel response is greater than the previous one only then apply changes
					if (res.method === 'historic' && res.startTime > this.queryStartTime) {
						this.afterChannelResponse(res);
					} else if (res.method === 'stream') {
						this.afterChannelResponse(res);
					}
				}.bind(this));
			}
		}, {
			key: 'afterChannelResponse',
			value: function afterChannelResponse(res) {
				var data = res.data;
				var rawData = void 0,
				    markersData = void 0;
				this.streamFlag = false;
				if (res.method === 'stream') {
					this.channelMethod = 'stream';
					var modData = this.streamDataModify(this.state.rawData, res);
					rawData = modData.rawData;
					res = modData.res;
					this.streamFlag = true;
					markersData = this.setMarkersData(rawData);
				} else if (res.method === 'historic') {
					this.channelMethod = 'historic';
					this.queryStartTime = res.startTime;
					rawData = data;
					markersData = this.setMarkersData(data);
				}
				this.reposition = true;
				this.setState({
					rawData: rawData,
					markersData: markersData
				}, function () {
					// Pass the historic or streaming data in index method
					res.allMarkers = rawData;
					res.mapRef = this.refs.map;
					var generatedData = this.props.markerOnIndex(res);
					this.setState({
						externalData: generatedData
					});
					if (this.streamFlag) {
						this.streamMarkerInterval();
					}
				}.bind(this));
			}
			// append stream boolean flag and also start time of stream

		}, {
			key: 'streamDataModify',
			value: function streamDataModify(rawData, res) {
				if (res.data) {
					res.data.stream = true;
					res.data.streamStart = new Date();
					if (res.data._deleted) {
						var hits = rawData.hits.hits.filter(function (hit) {
							return hit._id !== res.data._id;
						});
						rawData.hits.hits = hits;
					} else {
						var prevData = rawData.hits.hits.filter(function (hit) {
							return hit._id === res.data._id;
						});
						if (prevData && prevData.length) {
							var preCord = prevData[0]._source[this.props.inputData];
							var newCord = res.data._source[this.props.inputData];
							res.data.angleDeg = this.bearing(preCord.lat, preCord.lon, newCord.lat, newCord.lon);
						}
						var _hits = rawData.hits.hits.filter(function (hit) {
							return hit._id !== res.data._id;
						});
						rawData.hits.hits = _hits;
						rawData.hits.hits.push(res.data);
					}
				}
				return {
					rawData: rawData,
					res: res,
					streamFlag: true
				};
			}
		}, {
			key: 'bearing',
			value: function bearing(lat1, lng1, lat2, lng2) {
				var dLon = this._toRad(lng2 - lng1);
				var y = Math.sin(dLon) * Math.cos(this._toRad(lat2));
				var x = Math.cos(this._toRad(lat1)) * Math.sin(this._toRad(lat2)) - Math.sin(this._toRad(lat1)) * Math.cos(this._toRad(lat2)) * Math.cos(dLon);
				var brng = this._toDeg(Math.atan2(y, x));
				return (brng + 360) % 360;
			}
		}, {
			key: '_toRad',
			value: function _toRad(deg) {
				return deg * Math.PI / 180;
			}
		}, {
			key: '_toDeg',
			value: function _toDeg(rad) {
				return rad * 180 / Math.PI;
			}
			// tranform the raw data to marker data

		}, {
			key: 'setMarkersData',
			value: function setMarkersData(data) {
				var self = this;
				if (data && data.hits && data.hits.hits) {
					var markersData = data.hits.hits.map(function (hit, index) {
						hit._source.mapPoint = self.identifyGeoData(hit._source[self.props.inputData]);
						return hit;
					});
					markersData = markersData.filter(function (hit, index) {
						return hit._source.mapPoint && !(hit._source.mapPoint.lat === 0 && hit._source.mapPoint.lng === 0);
					});
					markersData = this.sortByDistance(markersData);
					markersData = markersData.map(function (marker) {
						marker.showInfo = false;
						return marker;
					});
					return markersData;
				} else {
					return [];
				}
			}
			// centrialize the map
			// calculate the distance from each marker to other marker, 
			// summation of all the distance and sort by distance in ascending order

		}, {
			key: 'sortByDistance',
			value: function sortByDistance(data) {
				var _this2 = this;

				var modifiedData = data.map(function (record) {
					record.distance = _this2.findDistance(data, record);
					return record;
				});
				modifiedData = _.orderBy(modifiedData, 'distance');
				return modifiedData;
			}
		}, {
			key: 'findDistance',
			value: function findDistance(data, record) {
				record.distance = 0;
				var modifiednData = data.map(function (to) {
					record.distance += getDistance(record._source.mapPoint.lat, record._source.mapPoint.lng, to._source.mapPoint.lat, to._source.mapPoint.lng);
				});
				function getDistance(lat1, lon1, lat2, lon2) {
					var R = 6371; // Radius of the earth in km
					var dLat = deg2rad(lat2 - lat1); // deg2rad below
					var dLon = deg2rad(lon2 - lon1);
					var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					var d = R * c; // Distance in km
					return d;
				}
				function deg2rad(deg) {
					return deg * (Math.PI / 180);
				}
				return record.distance;
			}
			// set the query type and input data

		}, {
			key: 'setGeoQueryInfo',
			value: function setGeoQueryInfo() {
				var obj = {
					key: 'geoQuery',
					value: {
						queryType: 'geo_bounding_box',
						inputData: this.props.inputData
					}
				};
				helper.selectedSensor.setSensorInfo(obj);
			}
			// Show InfoWindow and re-renders component

		}, {
			key: 'handleMarkerClick',
			value: function handleMarkerClick(marker) {
				marker.showInfo = true;
				this.reposition = false;
				this.setState({
					rerender: true
				});
			}
			// Close infowindow

		}, {
			key: 'handleMarkerClose',
			value: function handleMarkerClose(marker) {
				marker.showInfo = false;
				this.reposition = false;
				this.setState(this.state);
			}
			// render infowindow

		}, {
			key: 'renderInfoWindow',
			value: function renderInfoWindow(ref, marker) {
				var popoverContent = this.props.popoverContent ? this.props.popoverContent(marker) : 'Popver';
				return _react2.default.createElement(
					_reactGoogleMaps.InfoWindow,
					{
						zIndex: 500,
						key: ref + '_info_window',
						onCloseclick: this.handleMarkerClose.bind(this, marker) },
					_react2.default.createElement(
						'div',
						null,
						popoverContent
					)
				);
			}
			// Handle function which is fired when map is moved and reaches to idle position

		}, {
			key: 'handleOnIdle',
			value: function handleOnIdle() {
				var mapBounds = this.refs.map.getBounds();
				var north = mapBounds.getNorthEast().lat();
				var south = mapBounds.getSouthWest().lat();
				var east = mapBounds.getNorthEast().lng();
				var west = mapBounds.getSouthWest().lng();
				var boundingBoxCoordinates = {
					"top_left": [west, north],
					"bottom_right": [east, south]
				};
				var generatedData = this.props.onIdle(this.refs.map, {
					boundingBoxCoordinates: boundingBoxCoordinates,
					mapBounds: mapBounds
				});
				this.setState({
					externalData: generatedData
				});
				if (this.searchAsMove && !this.searchQueryProgress) {
					this.setValue(boundingBoxCoordinates, this.searchAsMove);
				}
			}
			// Handle function which is fired when map is dragged

		}, {
			key: 'handleOnDrage',
			value: function handleOnDrage() {
				this.storeCenter = null;
			}
			// set value

		}, {
			key: 'setValue',
			value: function setValue(value) {
				var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var obj = {
					key: 'geoQuery',
					value: value
				};
				helper.selectedSensor.set(obj, isExecuteQuery);
			}
			// on change of selectiong

		}, {
			key: 'searchAsMoveChange',
			value: function searchAsMoveChange(value) {
				this.searchAsMove = value;
				if (value && this.refs.map) {
					this.handleOnIdle();
				}
			}
			// mapStyle changes

		}, {
			key: 'mapStyleChange',
			value: function mapStyleChange(style) {
				this.setState({
					currentMapStyle: style
				});
			}
			// Handler function for bounds changed which udpates the map center

		}, {
			key: 'handleBoundsChanged',
			value: function handleBoundsChanged() {
				var _this3 = this;

				if (!this.searchQueryProgress) {
					// this.setState({
					//   center: this.refs.map.getCenter()
					// });
				} else {
					setTimeout(function () {
						_this3.searchQueryProgress = false;
					}, 1000 * 1);
				}
			}
			// Handler function which is fired when an input is selected from autocomplete google places

		}, {
			key: 'handlePlacesChanged',
			value: function handlePlacesChanged() {
				var places = this.refs.searchBox.getPlaces();
				// this.setState({
				//   center: places[0].geometry.location
				// });
			}
			// Handler function which is fired when an input is selected from Appbase geo search field

		}, {
			key: 'handleSearch',
			value: function handleSearch(location) {
				// this.setState({
				//   center: new google.maps.LatLng(location.value.lat, location.value.lon)
				// });
			}
		}, {
			key: 'identifyGeoData',
			value: function identifyGeoData(input) {
				var type = Object.prototype.toString.call(input);
				var convertedGeo = null;
				if (type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
					convertedGeo = {
						lat: Number(input.lat),
						lng: Number(input.lon)
					};
				} else if (type === '[object Array]' && input.length === 2) {
					convertedGeo = {
						lat: Number(input[0]),
						lng: Number(input[1])
					};
				}
				return convertedGeo;
			}
			// Check if stream data exists in markersData
			// and if exists the call streamToNormal.

		}, {
			key: 'streamMarkerInterval',
			value: function streamMarkerInterval() {
				var _this4 = this;

				var markersData = this.state.markersData;
				var isStreamData = markersData.filter(function (hit) {
					return hit.stream && hit.streamStart;
				});
				if (isStreamData.length) {
					this.isStreamDataExists = true;
					setTimeout(function () {
						return _this4.streamToNormal();
					}, this.props.streamActiveTime * 1000);
				} else {
					this.isStreamDataExists = false;
				}
			}
			// Check the difference between current time and attached stream time
			// if difference is equal to streamActiveTime then delete stream and starStream property of marker

		}, {
			key: 'streamToNormal',
			value: function streamToNormal() {
				var _this5 = this;

				var markersData = this.state.markersData;
				var isStreamData = markersData.filter(function (hit) {
					return hit.stream && hit.streamStart;
				});
				if (isStreamData.length) {
					markersData = markersData.map(function (hit, index) {
						if (hit.stream && hit.streamStart) {
							var currentTime = new Date();
							var timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
							if (timeDiff >= _this5.props.streamActiveTime) {
								delete hit.stream;
								delete hit.streamStart;
							}
						}
						return hit;
					});
					this.setState({
						markersData: markersData
					});
				} else {
					this.isStreamDataExists = false;
				}
			}
		}, {
			key: 'chooseIcon',
			value: function chooseIcon(hit) {
				var icon = hit.external_icon ? hit.external_icon : hit.stream ? this.props.streamPin : this.props.historicPin;
				var isSvg = (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) === 'object' && icon.hasOwnProperty('path') ? true : false;
				if (isSvg) {
					icon = JSON.parse(JSON.stringify(icon));
					if (this.props.rotateOnUpdate) {
						var deg = hit.angleDeg ? hit.angleDeg : 0;
						icon.rotation = deg;
					}
				}
				return icon;
			}
			// here we accepts marker props which we received from markerOnIndex and apply those external props in Marker component

		}, {
			key: 'combineProps',
			value: function combineProps(hit) {
				var externalProps = void 0,
				    markerProp = {};
				if (this.state.externalData && this.state.externalData.markers && this.state.externalData.markers[hit._id]) {
					externalProps = this.state.externalData.markers[hit._id];
					for (var external_p in externalProps) {
						hit["external_" + external_p] = externalProps[external_p];
						markerProp[external_p] = externalProps[external_p];
					}
				}
				markerProp.icon = this.chooseIcon(hit);
				return markerProp;
			}
		}, {
			key: 'generateMarkers',
			value: function generateMarkers() {
				var _this6 = this;

				var self = this;
				var markersData = this.state.markersData;
				var response = {
					markerComponent: [],
					defaultCenter: null,
					convertedGeo: []
				};
				if (markersData && markersData.length) {
					response.markerComponent = markersData.map(function (hit, index) {
						var field = self.identifyGeoData(hit._source[self.props.inputData]);
						// let icon = !this.props.rotateOnUpdate ? iconPath : RotateIcon.makeIcon(iconPath).setRotation({deg: deg}).getUrl();
						// let icon = self.chooseIcon(hit);
						if (field) {
							response.convertedGeo.push(field);
							var position = {
								position: field
							};
							var ref = 'marker_ref_' + index;
							var popoverEvent = void 0;
							if (_this6.props.showPopoverOn) {
								popoverEvent = {};
								popoverEvent[_this6.props.showPopoverOn] = _this6.handleMarkerClick.bind(_this6, hit);
							} else {
								popoverEvent = {};
								popoverEvent['onClick'] = _this6.handleMarkerClick.bind(_this6, hit);
							}
							var timenow = new Date();
							return _react2.default.createElement(
								_reactGoogleMaps.Marker,
								_extends({}, position, {
									key: hit._id,
									zIndex: 1,
									ref: ref
								}, self.combineProps(hit), {
									onClick: function onClick() {
										return self.props.markerOnClick(hit._source);
									},
									onDblclick: function onDblclick() {
										return self.props.markerOnDblclick(hit._source);
									},
									onMouseover: function onMouseover() {
										return self.props.markerOnMouseover(hit._source);
									},
									onMouseout: function onMouseout() {
										return self.props.markerOnMouseout(hit._source);
									}
								}, popoverEvent),
								hit.showInfo ? self.renderInfoWindow(ref, hit) : null
							);
						}
					});
					if (response.convertedGeo[0]) {
						response.defaultCenter = {
							lat: response.convertedGeo[0].lat,
							lng: response.convertedGeo[0].lng
						};
					}
				}
				if (!this.props.allowMarkers) {
					response.markerComponent = [];
				}
				return response;
			}
		}, {
			key: 'externalData',
			value: function externalData() {
				var recordList = [];
				if (this.state.externalData) {
					for (var record in this.state.externalData) {
						if (record !== 'markers') {
							recordList = recordList.concat(this.state.externalData[record]);
						}
					}
				}
				return recordList;
			}
		}, {
			key: 'mapEvents',
			value: function mapEvents(eventName) {
				if (this.props[eventName]) {
					var externalData = this.props[eventName](this.refs.map);
					if (externalData) {
						this.setState({
							externalData: externalData
						});
					}
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this7 = this;

				var self = this;
				var markerComponent, searchComponent, searchAsMoveComponent, MapStylesComponent;
				var appbaseSearch = void 0,
				    titleExists = void 0,
				    title = null;
				var searchComponentProps = {};
				var otherOptions;
				var generatedMarkers = this.generateMarkers();
				if (this.props.markerCluster) {
					markerComponent = _react2.default.createElement(
						_MarkerClusterer2.default,
						{ averageCenter: true, enableRetinaIcons: true, gridSize: 60 },
						generatedMarkers.markerComponent
					);
				} else {
					markerComponent = generatedMarkers.markerComponent;
				}
				// Auto center using markers data
				var streamCenterFlag = true;
				if (this.channelMethod === 'stream' && !this.props.streamAutoCenter) {
					streamCenterFlag = false;
				}
				if (!this.searchAsMove && this.props.autoCenter && this.reposition && streamCenterFlag) {
					searchComponentProps.center = generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.storeCenter ? this.storeCenter : this.state.center;
					this.storeCenter = searchComponentProps.center;
					this.reposition = false;
				} else {
					if (this.storeCenter) {
						searchComponentProps.center = this.storeCenter;
					} else {
						delete searchComponentProps.center;
					}
				}
				// include searchasMove component
				if (this.props.searchAsMoveComponent) {
					searchAsMoveComponent = _react2.default.createElement(_SearchAsMove.SearchAsMove, { searchAsMoveDefault: this.props.searchAsMoveDefault, searchAsMoveChange: this.searchAsMoveChange });
				}
				// include mapStyle choose component
				if (this.props.MapStylesComponent) {
					MapStylesComponent = _react2.default.createElement(_MapStyles.MapStyles, { defaultSelected: this.props.mapStyle, mapStyleChange: this.mapStyleChange });
				}
				// include title if exists
				if (this.props.title) {
					titleExists = true;
					title = _react2.default.createElement(
						'h4',
						{ className: 'componentTitle col s12 m8 col-xs-12 col-sm-8' },
						this.props.title
					);
				}

				return _react2.default.createElement(
					'div',
					{ className: 'map-container reactiveComponent appbaseMapComponent col s12 col-xs-12 card thumbnail' },
					title,
					_react2.default.createElement(
						'span',
						{ className: 'col s12 m4 col-xs-12 col-sm-4' },
						MapStylesComponent
					),
					_react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
						containerElement: _react2.default.createElement('div', { className: 'containerElement col s12 col-xs-12', style: this.props.containerStyle }),
						googleMapElement: _react2.default.createElement(
							_reactGoogleMaps.GoogleMap,
							_extends({ ref: 'map',
								options: {
									styles: this.state.currentMapStyle
								}
							}, searchComponentProps, this.props, {
								onDragstart: function onDragstart() {
									_this7.handleOnDrage();
									_this7.mapEvents('onDragstart');
								},
								onIdle: function onIdle() {
									return _this7.handleOnIdle();
								},
								onClick: function onClick() {
									return _this7.mapEvents('onClick');
								},
								onDblclick: function onDblclick() {
									return _this7.mapEvents('onDblclick');
								},
								onDrag: function onDrag() {
									return _this7.mapEvents('onDrag');
								},
								onDragend: function onDragend() {
									return _this7.mapEvents('onDragend');
								},
								onMousemove: function onMousemove() {
									return _this7.mapEvents('onMousemove');
								},
								onMouseout: function onMouseout() {
									return _this7.mapEvents('onMouseout');
								},
								onMouseover: function onMouseover() {
									return _this7.mapEvents('onMouseover');
								},
								onResize: function onResize() {
									return _this7.mapEvents('onResize');
								},
								onRightclick: function onRightclick() {
									return _this7.mapEvents('onRightclick');
								},
								onTilesloaded: function onTilesloaded() {
									return _this7.mapEvents('onTilesloaded');
								},
								onBoundsChanged: function onBoundsChanged() {
									return _this7.mapEvents('onBoundsChanged');
								},
								onCenterChanged: function onCenterChanged() {
									return _this7.mapEvents('onCenterChanged');
								},
								onProjectionChanged: function onProjectionChanged() {
									return _this7.mapEvents('onProjectionChanged');
								},
								onTiltChanged: function onTiltChanged() {
									return _this7.mapEvents('onTiltChanged');
								},
								onZoomChanged: function onZoomChanged() {
									return _this7.mapEvents('onZoomChanged');
								}
							}),
							searchComponent,
							markerComponent,
							this.externalData()
						)
					}),
					searchAsMoveComponent,
					_react2.default.createElement(
						'div',
						{ className: 'col s12 text-center center-align' },
						_react2.default.createElement('img', { width: '200px', height: 'auto', src: 'http://opensource.appbase.io/reactive-maps/dist/images/logo.png' })
					)
				);
			}
		}]);

		return AppbaseMap;
	}(_react.Component);

	AppbaseMap.propTypes = {
		inputData: _react2.default.PropTypes.string.isRequired,
		searchField: _react2.default.PropTypes.string,
		searchComponent: _react2.default.PropTypes.string,
		onIdle: _react2.default.PropTypes.func,
		markerOnDelete: _react2.default.PropTypes.func,
		markerOnIndex: _react2.default.PropTypes.func,
		markerCluster: _react2.default.PropTypes.bool,
		historicalData: _react2.default.PropTypes.bool,
		rotateOnUpdate: _react2.default.PropTypes.bool,
		allowMarkers: _react2.default.PropTypes.bool,
		streamActiveTime: _react2.default.PropTypes.number,
		requestSize: _react2.default.PropTypes.number
	};
	AppbaseMap.defaultProps = {
		historicalData: true,
		markerCluster: true,
		searchComponent: "google",
		autoCenter: false,
		searchAsMoveComponent: false,
		searchAsMoveDefault: false,
		MapStylesComponent: false,
		mapStyle: 'Standard',
		title: null,
		requestSize: 100,
		streamActiveTime: 5,
		streamAutoCenter: true,
		rotateOnUpdate: false,
		allowMarkers: true,
		historicPin: 'http://opensource.appbase.io/reactive-maps/dist/images/historic-pin.png',
		streamPin: 'http://opensource.appbase.io/reactive-maps/dist/images/stream-pin.png',
		markerOnClick: function markerOnClick() {},
		markerOnDblclick: function markerOnDblclick() {},
		markerOnMouseover: function markerOnMouseover() {},
		markerOnMouseout: function markerOnMouseout() {},
		markerOnIndex: function markerOnIndex() {},
		onIdle: function onIdle() {},
		containerStyle: {
			height: '700px'
		}
	};
	AppbaseMap.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

	var _GoogleMapLoader = __webpack_require__(226);

	exports.GoogleMapLoader = _interopRequire(_GoogleMapLoader);

	var _GoogleMap = __webpack_require__(236);

	exports.GoogleMap = _interopRequire(_GoogleMap);

	var _Circle = __webpack_require__(237);

	exports.Circle = _interopRequire(_Circle);

	var _DirectionsRenderer = __webpack_require__(241);

	exports.DirectionsRenderer = _interopRequire(_DirectionsRenderer);

	var _DrawingManager = __webpack_require__(244);

	exports.DrawingManager = _interopRequire(_DrawingManager);

	var _InfoWindow = __webpack_require__(247);

	exports.InfoWindow = _interopRequire(_InfoWindow);

	var _KmlLayer = __webpack_require__(251);

	exports.KmlLayer = _interopRequire(_KmlLayer);

	var _Marker = __webpack_require__(254);

	exports.Marker = _interopRequire(_Marker);

	var _OverlayView = __webpack_require__(257);

	exports.OverlayView = _interopRequire(_OverlayView);

	var _Polygon = __webpack_require__(260);

	exports.Polygon = _interopRequire(_Polygon);

	var _Polyline = __webpack_require__(263);

	exports.Polyline = _interopRequire(_Polyline);

	var _Rectangle = __webpack_require__(266);

	exports.Rectangle = _interopRequire(_Rectangle);

	var _SearchBox = __webpack_require__(269);

	exports.SearchBox = _interopRequire(_SearchBox);

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _creatorsGoogleMapHolder = __webpack_require__(227);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var USE_NEW_BEHAVIOR_TAG_NAME = "__new_behavior__"; /* CIRCULAR_DEPENDENCY */

	var GoogleMapLoader = (function (_Component) {
	  _inherits(GoogleMapLoader, _Component);

	  function GoogleMapLoader() {
	    _classCallCheck(this, GoogleMapLoader);

	    _get(Object.getPrototypeOf(GoogleMapLoader.prototype), "constructor", this).apply(this, arguments);

	    this.state = {
	      map: null
	    };
	  }

	  _createClass(GoogleMapLoader, [{
	    key: "mountGoogleMap",
	    value: function mountGoogleMap(domEl) {
	      if (this.state.map || domEl === null) {
	        return;
	      }
	      var _props$googleMapElement$props = this.props.googleMapElement.props;
	      var children = _props$googleMapElement$props.children;

	      var mapProps = _objectWithoutProperties(_props$googleMapElement$props, ["children"]);

	      //
	      // Create google.maps.Map instance so that dom is initialized before
	      // React's children creators.
	      //
	      var map = _creatorsGoogleMapHolder2["default"]._createMap(domEl, mapProps);
	      this.setState({ map: map });
	    }
	  }, {
	    key: "renderChild",
	    value: function renderChild() {
	      if (this.state.map) {
	        // Notice: implementation details
	        //
	        // In this state, the DOM of google.maps.Map is already initialized in
	        // my innerHTML. Adding extra React components will not clean it
	        // in current version*. It will use prepend to add DOM of
	        // GoogleMapHolder and become a sibling of the DOM of google.maps.Map
	        // Not sure this is subject to change
	        //
	        // *current version: 0.13.3, 0.14.2
	        //
	        return _react2["default"].cloneElement(this.props.googleMapElement, {
	          map: this.state.map,
	          // ------------ Deprecated ------------
	          containerTagName: USE_NEW_BEHAVIOR_TAG_NAME
	        });
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].cloneElement(this.props.containerElement, {
	        ref: this.mountGoogleMap.bind(this)
	      }, this.renderChild());
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      containerElement: _react.PropTypes.node.isRequired,
	      googleMapElement: _react.PropTypes.element.isRequired },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    /* CIRCULAR_DEPENDENCY. Uncomment when 5.0.0 comes: propTypesElementOfType(GoogleMap).isRequired, */
	    value: {
	      containerElement: _react2["default"].createElement("div", null)
	    },
	    enumerable: true
	  }]);

	  return GoogleMapLoader;
	})(_react.Component);

	exports["default"] = GoogleMapLoader;
	module.exports = exports["default"];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(228);

	var _warning2 = _interopRequireDefault(_warning);

	var _eventListsGoogleMapEventList = __webpack_require__(229);

	var _eventListsGoogleMapEventList2 = _interopRequireDefault(_eventListsGoogleMapEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var mapControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	  center: _react.PropTypes.object,
	  heading: _react.PropTypes.number,
	  mapTypeId: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  streetView: _react.PropTypes.any,
	  tilt: _react.PropTypes.number,
	  zoom: _react.PropTypes.number
	};

	exports.mapControlledPropTypes = mapControlledPropTypes;
	var mapDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(mapControlledPropTypes);

	exports.mapDefaultPropTypes = mapDefaultPropTypes;
	var mapUpdaters = {
	  center: function center(_center, component) {
	    component.getMap().setCenter(_center);
	  },
	  heading: function heading(_heading, component) {
	    component.getMap().setHeading(_heading);
	  },
	  mapTypeId: function mapTypeId(_mapTypeId, component) {
	    component.getMap().setMapTypeId(_mapTypeId);
	  },
	  options: function options(_options, component) {
	    component.getMap().setOptions(_options);
	  },
	  streetView: function streetView(_streetView, component) {
	    component.getMap().setStreetView(_streetView);
	  },
	  tilt: function tilt(_tilt, component) {
	    component.getMap().setTilt(_tilt);
	  },
	  zoom: function zoom(_zoom, component) {
	    component.getMap().setZoom(_zoom);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsGoogleMapEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var mapEventPropTypes = eventPropTypes;

	exports.mapEventPropTypes = mapEventPropTypes;

	var GoogleMapHolder = (function (_Component) {
	  _inherits(GoogleMapHolder, _Component);

	  function GoogleMapHolder() {
	    _classCallCheck(this, _GoogleMapHolder);

	    _get(Object.getPrototypeOf(_GoogleMapHolder.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GoogleMapHolder, [{
	    key: "getMap",
	    value: function getMap() {
	      return this.props.map;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      return _react2["default"].createElement(
	        "div",
	        null,
	        _react.Children.map(this.props.children, function (childElement) {
	          if (_react2["default"].isValidElement(childElement)) {
	            return _react2["default"].cloneElement(childElement, {
	              mapHolderRef: _this
	            });
	          } else {
	            return childElement;
	          }
	        })
	      );
	    }
	  }], [{
	    key: "_createMap",
	    value: function _createMap(domEl, mapProps) {
	      (0, _warning2["default"])("undefined" !== typeof google, "Make sure you've put a <script> tag in your <head> element to load Google Maps JavaScript API v3.\n If you're looking for built-in support to load it for you, use the \"async/ScriptjsLoader\" instead.\n See https://github.com/tomchentw/react-google-maps/pull/168");
	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	      return new google.maps.Map(domEl, (0, _utilsComposeOptions2["default"])(mapProps, mapControlledPropTypes));
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      map: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _GoogleMapHolder = GoogleMapHolder;
	  GoogleMapHolder = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getMap",
	    updaters: mapUpdaters
	  })(GoogleMapHolder) || GoogleMapHolder;
	  return GoogleMapHolder;
	})(_react.Component);

	exports["default"] = GoogleMapHolder;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if ((undefined) !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 229 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "heading_changed", "idle", "maptypeid_changed", "mousemove", "mouseout", "mouseover", "projection_changed", "resize", "rightclick", "tilesloaded", "tilt_changed", "zoom_changed"];
	module.exports = exports["default"];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = eventHandlerCreator;

	var _react = __webpack_require__(3);

	function groupToUpperCase(match, group) {
	  return group.toUpperCase();
	}

	function toOnEventName(rawName) {
	  return "on" + rawName.replace(/^(.)/, groupToUpperCase).replace(/_(.)/g, groupToUpperCase);
	}

	function eventHandlerCreator(rawNameList) {
	  var eventPropTypes = {};
	  var onEventNameByRawName = {};

	  rawNameList.forEach(function (rawName) {
	    var onEventName = toOnEventName(rawName);
	    eventPropTypes[onEventName] = _react.PropTypes.func;
	    onEventNameByRawName[rawName] = onEventName;
	  });

	  function registerEvents(event, props, googleMapInstance) {
	    var registered = rawNameList.reduce(function (acc, rawName) {
	      var onEventName = onEventNameByRawName[rawName];

	      if (Object.prototype.hasOwnProperty.call(props, onEventName)) {
	        acc.push(event.addListener(googleMapInstance, rawName, props[onEventName]));
	      }
	      return acc;
	    }, []);

	    return registered.forEach.bind(registered, event.removeListener, event);
	  }

	  return {
	    eventPropTypes: eventPropTypes,
	    registerEvents: registerEvents
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = defaultPropsCreator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _addDefaultPrefix = __webpack_require__(232);

	var _addDefaultPrefix2 = _interopRequireDefault(_addDefaultPrefix);

	function defaultPropsCreator(propTypes) {
	  return Object.keys(propTypes).reduce(function (acc, name) {
	    acc[(0, _addDefaultPrefix2["default"])(name)] = propTypes[name];
	    return acc;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 232 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addDefaultPrefix;

	function addDefaultPrefix(name) {
	  return "default" + (name[0].toUpperCase() + name.slice(1));
	}

	module.exports = exports["default"];

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = composeOptions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _controlledOrDefault = __webpack_require__(234);

	var _controlledOrDefault2 = _interopRequireDefault(_controlledOrDefault);

	function composeOptions(props, controlledPropTypes) {
	  var optionNameList = Object.keys(controlledPropTypes);
	  var getter = (0, _controlledOrDefault2["default"])(props);

	  // props from arguments may contain unknow props.
	  // We only interested those in optionNameList
	  return optionNameList.reduce(function (acc, optionName) {
	    if ("options" !== optionName) {
	      var value = getter(optionName);
	      if ("undefined" !== typeof value) {
	        acc[optionName] = value;
	      }
	    }
	    return acc;
	  }, _extends({}, getter("options")));
	}

	module.exports = exports["default"];

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = controlledOrDefault;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _addDefaultPrefix = __webpack_require__(232);

	var _addDefaultPrefix2 = _interopRequireDefault(_addDefaultPrefix);

	function controlledOrDefault(props) {
	  return function (name) {
	    if (Object.prototype.hasOwnProperty.call(props, name)) {
	      return props[name];
	    } else {
	      return props[(0, _addDefaultPrefix2["default"])(name)];
	    }
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 235 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = componentLifecycleDecorator;

	function componentLifecycleDecorator(_ref) {
	  var registerEvents = _ref.registerEvents;
	  var instanceMethodName = _ref.instanceMethodName;
	  var updaters = _ref.updaters;

	  // This modify the Component.prototype directly
	  return function (Component) {
	    function register() {
	      this._unregisterEvents = registerEvents(google.maps.event, this.props, this[instanceMethodName]());
	    }

	    function unregister() {
	      if (this._unregisterEvents) {
	        this._unregisterEvents();
	        this._unregisterEvents = null;
	      }
	    }

	    function noop() {}

	    // Stash component's own lifecycle methods to be invoked later
	    var componentDidMount = Component.prototype.hasOwnProperty("componentDidMount") ? Component.prototype.componentDidMount : noop;
	    var componentDidUpdate = Component.prototype.hasOwnProperty("componentDidUpdate") ? Component.prototype.componentDidUpdate : noop;
	    var componentWillUnmount = Component.prototype.hasOwnProperty("componentWillUnmount") ? Component.prototype.componentWillUnmount : noop;

	    Object.defineProperty(Component.prototype, "componentDidMount", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value() {
	        // Hook into client's implementation, if it has any
	        componentDidMount.call(this);

	        register.call(this);
	      }
	    });

	    Object.defineProperty(Component.prototype, "componentDidUpdate", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value(prevProps) {
	        unregister.call(this);

	        for (var _name in updaters) {
	          if (Object.prototype.hasOwnProperty.call(this.props, _name)) {
	            updaters[_name](this.props[_name], this);
	          }
	        }

	        // Hook into client's implementation, if it has any
	        componentDidUpdate.call(this, prevProps);

	        register.call(this);
	      }
	    });

	    Object.defineProperty(Component.prototype, "componentWillUnmount", {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: function value() {
	        // Hook into client's implementation, if it has any
	        componentWillUnmount.call(this);

	        unregister.call(this);
	        var instance = this[instanceMethodName]();
	        if ("setMap" in instance) {
	          instance.setMap(null);
	        }
	      }
	    });

	    return Component;
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(228);

	var _warning2 = _interopRequireDefault(_warning);

	var _creatorsGoogleMapHolder = __webpack_require__(227);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var _GoogleMapLoader = __webpack_require__(226);

	var _GoogleMapLoader2 = _interopRequireDefault(_GoogleMapLoader);

	var USE_NEW_BEHAVIOR_TAG_NAME = "__new_behavior__";

	var GoogleMap = (function (_Component) {
	  _inherits(GoogleMap, _Component);

	  function GoogleMap() {
	    _classCallCheck(this, GoogleMap);

	    _get(Object.getPrototypeOf(GoogleMap.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GoogleMap, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getBounds() {
	      return (this.props.map || this.refs.delegate).getBounds();
	    }
	  }, {
	    key: "getCenter",
	    value: function getCenter() {
	      return (this.props.map || this.refs.delegate).getCenter();
	    }
	  }, {
	    key: "getDiv",
	    value: function getDiv() {
	      return (this.props.map || this.refs.delegate).getDiv();
	    }
	  }, {
	    key: "getHeading",
	    value: function getHeading() {
	      return (this.props.map || this.refs.delegate).getHeading();
	    }
	  }, {
	    key: "getMapTypeId",
	    value: function getMapTypeId() {
	      return (this.props.map || this.refs.delegate).getMapTypeId();
	    }
	  }, {
	    key: "getProjection",
	    value: function getProjection() {
	      return (this.props.map || this.refs.delegate).getProjection();
	    }
	  }, {
	    key: "getStreetView",
	    value: function getStreetView() {
	      return (this.props.map || this.refs.delegate).getStreetView();
	    }
	  }, {
	    key: "getTilt",
	    value: function getTilt() {
	      return (this.props.map || this.refs.delegate).getTilt();
	    }
	  }, {
	    key: "getZoom",
	    value: function getZoom() {
	      return (this.props.map || this.refs.delegate).getZoom();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // Public APIs - Use this carefully
	    // See discussion in https://github.com/tomchentw/react-google-maps/issues/62
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return !it.match(/^get/) && !it.match(/^set/) && !it.match(/Map$/); })
	  }, {
	    key: "fitBounds",
	    value: function fitBounds(bounds) {
	      return (this.props.map || this.refs.delegate).fitBounds(bounds);
	    }
	  }, {
	    key: "panBy",
	    value: function panBy(x, y) {
	      return (this.props.map || this.refs.delegate).panBy(x, y);
	    }
	  }, {
	    key: "panTo",
	    value: function panTo(latLng) {
	      return (this.props.map || this.refs.delegate).panTo(latLng);
	    }
	  }, {
	    key: "panToBounds",
	    value: function panToBounds(latLngBounds) {
	      return (this.props.map || this.refs.delegate).panToBounds(latLngBounds);
	    }

	    // END - Public APIs - Use this carefully
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      var containerTagName = this.props.containerTagName;

	      var isUsingNewBehavior = USE_NEW_BEHAVIOR_TAG_NAME === containerTagName;

	      (0, _warning2["default"])(isUsingNewBehavior, "\"GoogleMap\" with containerTagName is deprecated now and will be removed in next major release (5.0.0).\nUse \"GoogleMapLoader\" instead. See https://github.com/tomchentw/react-google-maps/pull/157 for more details.");
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var containerTagName = _props.containerTagName;
	      var _props$containerProps = _props.containerProps;
	      var containerProps = _props$containerProps === undefined ? {} : _props$containerProps;
	      var children = _props.children;

	      var mapProps = _objectWithoutProperties(_props, ["containerTagName", "containerProps", "children"]);

	      var isUsingNewBehavior = USE_NEW_BEHAVIOR_TAG_NAME === containerTagName;

	      if (isUsingNewBehavior) {
	        return _react2["default"].createElement(
	          _creatorsGoogleMapHolder2["default"],
	          mapProps,
	          children
	        );
	      } else {
	        // ------------ Deprecated ------------
	        var realContainerTagName = containerTagName === undefined || containerTagName === null ? "div" : containerTagName;

	        return _react2["default"].createElement(_GoogleMapLoader2["default"], {
	          ref: "loader",
	          containerElement: _react2["default"].createElement(realContainerTagName, containerProps),
	          googleMapElement: _react2["default"].createElement(
	            GoogleMap,
	            _extends({ ref: "delegate", containerTagName: USE_NEW_BEHAVIOR_TAG_NAME }, mapProps),
	            children
	          )
	        });
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({
	      containerTagName: _react.PropTypes.string,
	      containerProps: _react.PropTypes.object,
	      map: _react.PropTypes.object
	    }, _creatorsGoogleMapHolder.mapDefaultPropTypes, _creatorsGoogleMapHolder.mapControlledPropTypes, _creatorsGoogleMapHolder.mapEventPropTypes),
	    enumerable: true
	  }]);

	  return GoogleMap;
	})(_react.Component);

	exports["default"] = GoogleMap;
	module.exports = exports["default"];
	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsCircleCreator = __webpack_require__(239);

	var _creatorsCircleCreator2 = _interopRequireDefault(_creatorsCircleCreator);

	var Circle = (function (_Component) {
	  _inherits(Circle, _Component);

	  function Circle() {
	    _classCallCheck(this, Circle);

	    _get(Object.getPrototypeOf(Circle.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Circle, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getBounds() {
	      return this.state.circle.getBounds();
	    }
	  }, {
	    key: "getCenter",
	    value: function getCenter() {
	      return this.state.circle.getCenter();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.circle.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.circle.getEditable();
	    }
	  }, {
	    key: "getMap",
	    value: function getMap() {
	      return this.state.circle.getMap();
	    }
	  }, {
	    key: "getRadius",
	    value: function getRadius() {
	      return this.state.circle.getRadius();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.circle.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var circle = _creatorsCircleCreator2["default"]._createCircle(this.props);

	      this.setState({ circle: circle });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.circle) {
	        return _react2["default"].createElement(
	          _creatorsCircleCreator2["default"],
	          _extends({ circle: this.state.circle }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsCircleCreator.circleDefaultPropTypes, _creatorsCircleCreator.circleControlledPropTypes, _creatorsCircleCreator.circleEventPropTypes),
	    enumerable: true
	  }]);

	  return Circle;
	})(_react.Component);

	exports["default"] = Circle;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 238 */
/***/ function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsCircleEventList = __webpack_require__(240);

	var _eventListsCircleEventList2 = _interopRequireDefault(_eventListsCircleEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var circleControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	  center: _react.PropTypes.any,
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  radius: _react.PropTypes.number,
	  visible: _react.PropTypes.bool
	};

	exports.circleControlledPropTypes = circleControlledPropTypes;
	var circleDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(circleControlledPropTypes);

	exports.circleDefaultPropTypes = circleDefaultPropTypes;
	var circleUpdaters = {
	  center: function center(_center, component) {
	    component.getCircle().setCenter(_center);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getCircle().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getCircle().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getCircle().setOptions(_options);
	  },
	  radius: function radius(_radius, component) {
	    component.getCircle().setRadius(_radius);
	  },
	  visible: function visible(_visible, component) {
	    component.getCircle().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsCircleEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var circleEventPropTypes = eventPropTypes;

	exports.circleEventPropTypes = circleEventPropTypes;

	var CircleCreator = (function (_Component) {
	  _inherits(CircleCreator, _Component);

	  function CircleCreator() {
	    _classCallCheck(this, _CircleCreator);

	    _get(Object.getPrototypeOf(_CircleCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(CircleCreator, [{
	    key: "getCircle",
	    value: function getCircle() {
	      return this.props.circle;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createCircle",
	    value: function _createCircle(circleProps) {
	      var mapHolderRef = circleProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	      var circle = new google.maps.Circle((0, _utilsComposeOptions2["default"])(circleProps, circleControlledPropTypes));

	      circle.setMap(mapHolderRef.getMap());

	      return circle;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      circle: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _CircleCreator = CircleCreator;
	  CircleCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getCircle",
	    updaters: circleUpdaters
	  })(CircleCreator) || CircleCreator;
	  return CircleCreator;
	})(_react.Component);

	exports["default"] = CircleCreator;

/***/ },
/* 240 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Circle
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "radius_changed", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsDirectionsRendererCreator = __webpack_require__(242);

	var _creatorsDirectionsRendererCreator2 = _interopRequireDefault(_creatorsDirectionsRendererCreator);

	/*
	 * Original author: @alexishevia
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/22
	 */

	var DirectionsRenderer = (function (_Component) {
	  _inherits(DirectionsRenderer, _Component);

	  function DirectionsRenderer() {
	    _classCallCheck(this, DirectionsRenderer);

	    _get(Object.getPrototypeOf(DirectionsRenderer.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(DirectionsRenderer, [{
	    key: "getDirections",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDirections() {
	      return this.state.directionsRenderer.getDirections();
	    }
	  }, {
	    key: "getPanel",
	    value: function getPanel() {
	      return this.state.directionsRenderer.getPanel();
	    }
	  }, {
	    key: "getRouteIndex",
	    value: function getRouteIndex() {
	      return this.state.directionsRenderer.getRouteIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var directionsRenderer = _creatorsDirectionsRendererCreator2["default"]._createDirectionsRenderer(this.props);

	      this.setState({ directionsRenderer: directionsRenderer });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.directionsRenderer) {
	        return _react2["default"].createElement(
	          _creatorsDirectionsRendererCreator2["default"],
	          _extends({ directionsRenderer: this.state.directionsRenderer }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsDirectionsRendererCreator.directionsRendererDefaultPropTypes, _creatorsDirectionsRendererCreator.directionsRendererControlledPropTypes, _creatorsDirectionsRendererCreator.directionsRendererEventPropTypes),
	    enumerable: true
	  }]);

	  return DirectionsRenderer;
	})(_react.Component);

	exports["default"] = DirectionsRenderer;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsDirectionsRendererEventList = __webpack_require__(243);

	var _eventListsDirectionsRendererEventList2 = _interopRequireDefault(_eventListsDirectionsRendererEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var directionsRendererControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	  directions: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  panel: _react.PropTypes.object,
	  routeIndex: _react.PropTypes.number
	};

	exports.directionsRendererControlledPropTypes = directionsRendererControlledPropTypes;
	var directionsRendererDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(directionsRendererControlledPropTypes);

	exports.directionsRendererDefaultPropTypes = directionsRendererDefaultPropTypes;
	var directionsRendererUpdaters = {
	  directions: function directions(_directions, component) {
	    component.getDirectionsRenderer().setDirections(_directions);
	  },
	  options: function options(_options, component) {
	    component.getDirectionsRenderer().setOptions(_options);
	  },
	  panel: function panel(_panel, component) {
	    component.getDirectionsRenderer().setPanel(_panel);
	  },
	  routeIndex: function routeIndex(_routeIndex, component) {
	    component.getDirectionsRenderer().setRouteIndex(_routeIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsDirectionsRendererEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var directionsRendererEventPropTypes = eventPropTypes;

	exports.directionsRendererEventPropTypes = directionsRendererEventPropTypes;

	var DirectionsRendererCreator = (function (_Component) {
	  _inherits(DirectionsRendererCreator, _Component);

	  function DirectionsRendererCreator() {
	    _classCallCheck(this, _DirectionsRendererCreator);

	    _get(Object.getPrototypeOf(_DirectionsRendererCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(DirectionsRendererCreator, [{
	    key: "getDirectionsRenderer",
	    value: function getDirectionsRenderer() {
	      return this.props.directionsRenderer;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;

	      if (_react.Children.count(children) > 0) {
	        // TODO: take a look at DirectionsRendererOptions#infoWindow and DirectionsRendererOptions#markerOptions ?
	        return _react2["default"].createElement(
	          "div",
	          null,
	          children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createDirectionsRenderer",
	    value: function _createDirectionsRenderer(directionsRendererProps) {
	      var mapHolderRef = directionsRendererProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	      var directionsRenderer = new google.maps.DirectionsRenderer((0, _utilsComposeOptions2["default"])(directionsRendererProps, directionsRendererControlledPropTypes));

	      directionsRenderer.setMap(mapHolderRef.getMap());

	      return directionsRenderer;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      directionsRenderer: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _DirectionsRendererCreator = DirectionsRendererCreator;
	  DirectionsRendererCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getDirectionsRenderer",
	    updaters: directionsRendererUpdaters
	  })(DirectionsRendererCreator) || DirectionsRendererCreator;
	  return DirectionsRendererCreator;
	})(_react.Component);

	exports["default"] = DirectionsRendererCreator;

/***/ },
/* 243 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["directions_changed"];
	module.exports = exports["default"];

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsDrawingManagerCreator = __webpack_require__(245);

	var _creatorsDrawingManagerCreator2 = _interopRequireDefault(_creatorsDrawingManagerCreator);

	/*
	 * Original author: @idolize
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/46
	 */

	var DrawingManager = (function (_Component) {
	  _inherits(DrawingManager, _Component);

	  function DrawingManager() {
	    _classCallCheck(this, DrawingManager);

	    _get(Object.getPrototypeOf(DrawingManager.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(DrawingManager, [{
	    key: "getDrawingMode",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDrawingMode() {
	      return this.state.drawingManager.getDrawingMode();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var drawingManager = _creatorsDrawingManagerCreator2["default"]._createDrawingManager(this.props);

	      this.setState({ drawingManager: drawingManager });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.drawingManager) {
	        return _react2["default"].createElement(
	          _creatorsDrawingManagerCreator2["default"],
	          _extends({ drawingManager: this.state.drawingManager }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsDrawingManagerCreator.drawingManagerDefaultPropTypes, _creatorsDrawingManagerCreator.drawingManagerControlledPropTypes, _creatorsDrawingManagerCreator.drawingManagerEventPropTypes),
	    enumerable: true
	  }]);

	  return DrawingManager;
	})(_react.Component);

	exports["default"] = DrawingManager;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsDrawingManagerEventList = __webpack_require__(246);

	var _eventListsDrawingManagerEventList2 = _interopRequireDefault(_eventListsDrawingManagerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var drawingManagerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	  drawingMode: _react.PropTypes.any,
	  options: _react.PropTypes.object
	};

	exports.drawingManagerControlledPropTypes = drawingManagerControlledPropTypes;
	var drawingManagerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(drawingManagerControlledPropTypes);

	exports.drawingManagerDefaultPropTypes = drawingManagerDefaultPropTypes;
	var drawingManagerUpdaters = {
	  drawingMode: function drawingMode(_drawingMode, component) {
	    component.getDrawingManager().setDrawingMode(_drawingMode);
	  },
	  options: function options(_options, component) {
	    component.getDrawingManager().setOptions(_options);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsDrawingManagerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var drawingManagerEventPropTypes = eventPropTypes;

	exports.drawingManagerEventPropTypes = drawingManagerEventPropTypes;

	var DrawingManagerCreator = (function (_Component) {
	  _inherits(DrawingManagerCreator, _Component);

	  function DrawingManagerCreator() {
	    _classCallCheck(this, _DrawingManagerCreator);

	    _get(Object.getPrototypeOf(_DrawingManagerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(DrawingManagerCreator, [{
	    key: "getDrawingManager",
	    value: function getDrawingManager() {
	      return this.props.drawingManager;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createDrawingManager",
	    value: function _createDrawingManager(drawingManagerProps) {
	      var mapHolderRef = drawingManagerProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	      var drawingManager = new google.maps.drawing.DrawingManager((0, _utilsComposeOptions2["default"])(drawingManagerProps, drawingManagerControlledPropTypes));

	      drawingManager.setMap(mapHolderRef.getMap());

	      return drawingManager;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      drawingManager: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _DrawingManagerCreator = DrawingManagerCreator;
	  DrawingManagerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getDrawingManager",
	    updaters: drawingManagerUpdaters
	  })(DrawingManagerCreator) || DrawingManagerCreator;
	  return DrawingManagerCreator;
	})(_react.Component);

	exports["default"] = DrawingManagerCreator;

/***/ },
/* 246 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["circlecomplete", "markercomplete", "overlaycomplete", "polygoncomplete", "polylinecomplete", "rectanglecomplete"];
	module.exports = exports["default"];

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsInfoWindowCreator = __webpack_require__(248);

	var _creatorsInfoWindowCreator2 = _interopRequireDefault(_creatorsInfoWindowCreator);

	var InfoWindow = (function (_Component) {
	  _inherits(InfoWindow, _Component);

	  function InfoWindow() {
	    _classCallCheck(this, InfoWindow);

	    _get(Object.getPrototypeOf(InfoWindow.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(InfoWindow, [{
	    key: "getContent",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getContent() {/* TODO: children */}
	  }, {
	    key: "getPosition",
	    value: function getPosition() {
	      return this.state.infoWindow.getPosition();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.infoWindow.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var infoWindow = _creatorsInfoWindowCreator2["default"]._createInfoWindow(this.props);

	      this.setState({ infoWindow: infoWindow });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.infoWindow) {
	        return _react2["default"].createElement(
	          _creatorsInfoWindowCreator2["default"],
	          _extends({ infoWindow: this.state.infoWindow }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsInfoWindowCreator.infoWindowDefaultPropTypes, _creatorsInfoWindowCreator.infoWindowControlledPropTypes, _creatorsInfoWindowCreator.infoWindowEventPropTypes),
	    enumerable: true
	  }]);

	  return InfoWindow;
	})(_react.Component);

	exports["default"] = InfoWindow;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsInfoWindowEventList = __webpack_require__(249);

	var _eventListsInfoWindowEventList2 = _interopRequireDefault(_eventListsInfoWindowEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsSetContentForOptionalReactElement = __webpack_require__(250);

	var _utilsSetContentForOptionalReactElement2 = _interopRequireDefault(_utilsSetContentForOptionalReactElement);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var infoWindowControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	  content: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  position: _react.PropTypes.any,
	  zIndex: _react.PropTypes.number
	};

	exports.infoWindowControlledPropTypes = infoWindowControlledPropTypes;
	var infoWindowDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(infoWindowControlledPropTypes);

	exports.infoWindowDefaultPropTypes = infoWindowDefaultPropTypes;
	var infoWindowUpdaters = {
	  children: function children(_children, component) {
	    (0, _utilsSetContentForOptionalReactElement2["default"])(_children, component.getInfoWindow());
	  },
	  content: function content(_content, component) {
	    component.getInfoWindow().setContent(_content);
	  },
	  options: function options(_options, component) {
	    component.getInfoWindow().setOptions(_options);
	  },
	  position: function position(_position, component) {
	    component.getInfoWindow().setPosition(_position);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getInfoWindow().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsInfoWindowEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var infoWindowEventPropTypes = eventPropTypes;

	exports.infoWindowEventPropTypes = infoWindowEventPropTypes;

	var InfoWindowCreator = (function (_Component) {
	  _inherits(InfoWindowCreator, _Component);

	  function InfoWindowCreator() {
	    _classCallCheck(this, _InfoWindowCreator);

	    _get(Object.getPrototypeOf(_InfoWindowCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(InfoWindowCreator, [{
	    key: "getInfoWindow",
	    value: function getInfoWindow() {
	      return this.props.infoWindow;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createInfoWindow",
	    value: function _createInfoWindow(infoWindowProps) {
	      var mapHolderRef = infoWindowProps.mapHolderRef;
	      var anchorHolderRef = infoWindowProps.anchorHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	      var infoWindow = new google.maps.InfoWindow((0, _utilsComposeOptions2["default"])(infoWindowProps, infoWindowControlledPropTypes));

	      if (infoWindowProps.children) {
	        (0, _utilsSetContentForOptionalReactElement2["default"])(infoWindowProps.children, infoWindow);
	      }

	      if (anchorHolderRef) {
	        infoWindow.open(mapHolderRef.getMap(), anchorHolderRef.getAnchor());
	      } else {
	        infoWindow.setMap(mapHolderRef.getMap());
	      }

	      return infoWindow;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      infoWindow: _react.PropTypes.object.isRequired,
	      anchorHolderRef: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);

	  var _InfoWindowCreator = InfoWindowCreator;
	  InfoWindowCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getInfoWindow",
	    updaters: infoWindowUpdaters
	  })(InfoWindowCreator) || InfoWindowCreator;
	  return InfoWindowCreator;
	})(_react.Component);

	exports["default"] = InfoWindowCreator;

/***/ },
/* 249 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"];
	module.exports = exports["default"];

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = setContentForOptionalReactElement;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	function renderElement(contentElement, possiblePrevContent) {
	  var prevContent = possiblePrevContent;
	  if ("[object HTMLDivElement]" !== Object.prototype.toString.call(prevContent)) {
	    prevContent = document.createElement("div");
	  }

	  (0, _reactDom.render)(contentElement, prevContent);
	  return prevContent;
	}

	function setContentForOptionalReactElement(contentOptionalReactElement, infoWindowLikeInstance) {
	  if (_react2["default"].isValidElement(contentOptionalReactElement)) {
	    var contentElement = _react.Children.only(contentOptionalReactElement);
	    var prevContent = infoWindowLikeInstance.getContent();

	    var domEl = renderElement(contentElement, prevContent);
	    infoWindowLikeInstance.setContent(domEl);
	  } else {
	    infoWindowLikeInstance.setContent(contentOptionalReactElement);
	  }
	}

	module.exports = exports["default"];

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsKmlLayerCreator = __webpack_require__(252);

	var _creatorsKmlLayerCreator2 = _interopRequireDefault(_creatorsKmlLayerCreator);

	var KmlLayer = (function (_Component) {
	  _inherits(KmlLayer, _Component);

	  function KmlLayer() {
	    _classCallCheck(this, KmlLayer);

	    _get(Object.getPrototypeOf(KmlLayer.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(KmlLayer, [{
	    key: "getDefaultViewport",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getDefaultViewport() {
	      return this.state.kmlLayer.getDefaultViewport();
	    }
	  }, {
	    key: "getMetadata",
	    value: function getMetadata() {
	      return this.state.kmlLayer.getMetadata();
	    }
	  }, {
	    key: "getStatus",
	    value: function getStatus() {
	      return this.state.kmlLayer.getStatus();
	    }
	  }, {
	    key: "getUrl",
	    value: function getUrl() {
	      return this.state.kmlLayer.getUrl();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.marker.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var kmlLayer = _creatorsKmlLayerCreator2["default"]._createKmlLayer(this.props);

	      this.setState({ kmlLayer: kmlLayer });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.kmlLayer) {
	        return _react2["default"].createElement(
	          _creatorsKmlLayerCreator2["default"],
	          _extends({ kmlLayer: this.state.kmlLayer }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsKmlLayerCreator.kmlLayerDefaultPropTypes, _creatorsKmlLayerCreator.kmlLayerControlledPropTypes, _creatorsKmlLayerCreator.kmlLayerEventPropTypes),
	    enumerable: true
	  }]);

	  return KmlLayer;
	})(_react.Component);

	exports["default"] = KmlLayer;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsKmlLayerEventList = __webpack_require__(253);

	var _eventListsKmlLayerEventList2 = _interopRequireDefault(_eventListsKmlLayerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var kmlLayerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	  defaultViewport: _react.PropTypes.any,
	  metadata: _react.PropTypes.any,
	  status: _react.PropTypes.any,
	  url: _react.PropTypes.string,
	  zIndex: _react.PropTypes.number
	};

	exports.kmlLayerControlledPropTypes = kmlLayerControlledPropTypes;
	var kmlLayerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(kmlLayerControlledPropTypes);

	exports.kmlLayerDefaultPropTypes = kmlLayerDefaultPropTypes;
	var kmlLayerUpdaters = {
	  defaultViewport: function defaultViewport(_defaultViewport, component) {
	    component.getKmlLayer().setDefaultViewport(_defaultViewport);
	  },
	  metadata: function metadata(_metadata, component) {
	    component.getKmlLayer().setMetadata(_metadata);
	  },
	  status: function status(_status, component) {
	    component.getKmlLayer().setStatus(_status);
	  },
	  url: function url(_url, component) {
	    component.getKmlLayer().setUrl(_url);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getKmlLayer().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsKmlLayerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var kmlLayerEventPropTypes = eventPropTypes;

	exports.kmlLayerEventPropTypes = kmlLayerEventPropTypes;

	var KmlLayerCreator = (function (_Component) {
	  _inherits(KmlLayerCreator, _Component);

	  function KmlLayerCreator() {
	    _classCallCheck(this, _KmlLayerCreator);

	    _get(Object.getPrototypeOf(_KmlLayerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(KmlLayerCreator, [{
	    key: "getKmlLayer",
	    value: function getKmlLayer() {
	      return this.props.kmlLayer;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var children = _props.children;

	      if (_react.Children.count(children) > 0) {
	        return _react2["default"].createElement(
	          "div",
	          null,
	          _react.Children.map(children, function (childElement) {
	            return childElement && _react2["default"].cloneElement(childElement, {
	              mapHolderRef: mapHolderRef
	            });
	          })
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createKmlLayer",
	    value: function _createKmlLayer(kmlLayerProps) {
	      var mapHolderRef = kmlLayerProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	      var kmlLayer = new google.maps.KmlLayer((0, _utilsComposeOptions2["default"])(kmlLayerProps, kmlLayerControlledPropTypes));

	      kmlLayer.setMap(mapHolderRef.getMap());

	      return kmlLayer;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      kmlLayer: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _KmlLayerCreator = KmlLayerCreator;
	  KmlLayerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getKmlLayer",
	    updaters: kmlLayerUpdaters
	  })(KmlLayerCreator) || KmlLayerCreator;
	  return KmlLayerCreator;
	})(_react.Component);

	exports["default"] = KmlLayerCreator;

/***/ },
/* 253 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "defaultviewport_changed", "status_changed"];
	module.exports = exports["default"];

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsMarkerCreator = __webpack_require__(255);

	var _creatorsMarkerCreator2 = _interopRequireDefault(_creatorsMarkerCreator);

	var Marker = (function (_Component) {
	  _inherits(Marker, _Component);

	  function Marker() {
	    _classCallCheck(this, Marker);

	    _get(Object.getPrototypeOf(Marker.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Marker, [{
	    key: "getAnimation",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getAnimation() {
	      return this.state.marker.getAnimation();
	    }
	  }, {
	    key: "getAttribution",
	    value: function getAttribution() {
	      return this.state.marker.getAttribution();
	    }
	  }, {
	    key: "getClickable",
	    value: function getClickable() {
	      return this.state.marker.getClickable();
	    }
	  }, {
	    key: "getCursor",
	    value: function getCursor() {
	      return this.state.marker.getCursor();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.marker.getDraggable();
	    }
	  }, {
	    key: "getIcon",
	    value: function getIcon() {
	      return this.state.marker.getIcon();
	    }
	  }, {
	    key: "getLabel",
	    value: function getLabel() {
	      return this.state.marker.getLabel();
	    }
	  }, {
	    key: "getOpacity",
	    value: function getOpacity() {
	      return this.state.marker.getOpacity();
	    }
	  }, {
	    key: "getPlace",
	    value: function getPlace() {
	      return this.state.marker.getPlace();
	    }
	  }, {
	    key: "getPosition",
	    value: function getPosition() {
	      return this.state.marker.getPosition();
	    }
	  }, {
	    key: "getShape",
	    value: function getShape() {
	      return this.state.marker.getShape();
	    }
	  }, {
	    key: "getTitle",
	    value: function getTitle() {
	      return this.state.marker.getTitle();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.marker.getVisible();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.marker.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var marker = _creatorsMarkerCreator2["default"]._createMarker(this.props);

	      this.setState({ marker: marker });
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }

	      var anchorHolderRef = this.props.anchorHolderRef;
	      var marker = this.state.marker;

	      if (anchorHolderRef) {
	        if ("MarkerClusterer" === anchorHolderRef.getAnchorType()) {
	          anchorHolderRef.getAnchor().removeMarker(marker);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.marker) {
	        return _react2["default"].createElement(
	          _creatorsMarkerCreator2["default"],
	          _extends({ marker: this.state.marker }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsMarkerCreator.markerDefaultPropTypes, _creatorsMarkerCreator.markerControlledPropTypes, _creatorsMarkerCreator.markerEventPropTypes),
	    enumerable: true
	  }]);

	  return Marker;
	})(_react.Component);

	exports["default"] = Marker;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsMarkerEventList = __webpack_require__(256);

	var _eventListsMarkerEventList2 = _interopRequireDefault(_eventListsMarkerEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var markerControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	  animation: _react.PropTypes.any,
	  attribution: _react.PropTypes.any,
	  clickable: _react.PropTypes.bool,
	  cursor: _react.PropTypes.string,
	  draggable: _react.PropTypes.bool,
	  icon: _react.PropTypes.any,
	  label: _react.PropTypes.any,
	  opacity: _react.PropTypes.number,
	  options: _react.PropTypes.object,
	  place: _react.PropTypes.any,
	  position: _react.PropTypes.any,
	  shape: _react.PropTypes.any,
	  title: _react.PropTypes.string,
	  visible: _react.PropTypes.bool,
	  zIndex: _react.PropTypes.number
	};

	exports.markerControlledPropTypes = markerControlledPropTypes;
	var markerDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(markerControlledPropTypes);

	exports.markerDefaultPropTypes = markerDefaultPropTypes;
	var markerUpdaters = {
	  animation: function animation(_animation, component) {
	    component.getMarker().setAnimation(_animation);
	  },
	  attribution: function attribution(_attribution, component) {
	    component.getMarker().setAttribution(_attribution);
	  },
	  clickable: function clickable(_clickable, component) {
	    component.getMarker().setClickable(_clickable);
	  },
	  cursor: function cursor(_cursor, component) {
	    component.getMarker().setCursor(_cursor);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getMarker().setDraggable(_draggable);
	  },
	  icon: function icon(_icon, component) {
	    component.getMarker().setIcon(_icon);
	  },
	  label: function label(_label, component) {
	    component.getMarker().setLabel(_label);
	  },
	  opacity: function opacity(_opacity, component) {
	    component.getMarker().setOpacity(_opacity);
	  },
	  options: function options(_options, component) {
	    component.getMarker().setOptions(_options);
	  },
	  place: function place(_place, component) {
	    component.getMarker().setPlace(_place);
	  },
	  position: function position(_position, component) {
	    component.getMarker().setPosition(_position);
	  },
	  shape: function shape(_shape, component) {
	    component.getMarker().setShape(_shape);
	  },
	  title: function title(_title, component) {
	    component.getMarker().setTitle(_title);
	  },
	  visible: function visible(_visible, component) {
	    component.getMarker().setVisible(_visible);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getMarker().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsMarkerEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var markerEventPropTypes = eventPropTypes;

	exports.markerEventPropTypes = markerEventPropTypes;

	var MarkerCreator = (function (_Component) {
	  _inherits(MarkerCreator, _Component);

	  function MarkerCreator() {
	    _classCallCheck(this, _MarkerCreator);

	    _get(Object.getPrototypeOf(_MarkerCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(MarkerCreator, [{
	    key: "getMarker",
	    value: function getMarker() {
	      return this.props.marker;
	    }

	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindowOptions
	    // In the core API, the only anchor is the Marker class.
	  }, {
	    key: "getAnchor",
	    value: function getAnchor() {
	      return this.props.marker;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var children = _props.children;

	      if (_react.Children.count(children) > 0) {
	        return _react2["default"].createElement(
	          "div",
	          null,
	          _react.Children.map(children, function (childElement) {
	            return childElement && _react2["default"].cloneElement(childElement, {
	              mapHolderRef: mapHolderRef,
	              anchorHolderRef: _this
	            });
	          })
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "_createMarker",
	    value: function _createMarker(markerProps) {
	      var mapHolderRef = markerProps.mapHolderRef;
	      var anchorHolderRef = markerProps.anchorHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	      var marker = new google.maps.Marker((0, _utilsComposeOptions2["default"])(markerProps, markerControlledPropTypes));

	      if (anchorHolderRef) {
	        if ("MarkerClusterer" === anchorHolderRef.getAnchorType()) {
	          anchorHolderRef.getAnchor().addMarker(marker);
	        }
	      } else {
	        marker.setMap(mapHolderRef.getMap());
	      }

	      return marker;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      marker: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _MarkerCreator = MarkerCreator;
	  MarkerCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getMarker",
	    updaters: markerUpdaters
	  })(MarkerCreator) || MarkerCreator;
	  return MarkerCreator;
	})(_react.Component);

	exports["default"] = MarkerCreator;

/***/ },
/* 256 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["animation_changed", "click", "clickable_changed", "cursor_changed", "dblclick", "drag", "dragend", "draggable_changed", "dragstart", "flat_changed", "icon_changed", "mousedown", "mouseout", "mouseover", "mouseup", "position_changed", "rightclick", "shape_changed", "title_changed", "visible_changed", "zindex_changed"];
	module.exports = exports["default"];

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsOverlayViewCreator = __webpack_require__(258);

	var _creatorsOverlayViewCreator2 = _interopRequireDefault(_creatorsOverlayViewCreator);

	/*
	 * Original author: @petebrowne
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/63
	 */

	var OverlayView = (function (_Component) {
	  _inherits(OverlayView, _Component);

	  function OverlayView() {
	    _classCallCheck(this, OverlayView);

	    _get(Object.getPrototypeOf(OverlayView.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(OverlayView, [{
	    key: "getPanes",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getPanes() {
	      return this.state.overlayView.getPanes();
	    }
	  }, {
	    key: "getProjection",
	    value: function getProjection() {
	      return this.state.overlayView.getProjection();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var overlayView = _creatorsOverlayViewCreator2["default"]._createOverlayView(this.props);

	      this.setState({ overlayView: overlayView });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.overlayView) {
	        return _react2["default"].createElement(
	          _creatorsOverlayViewCreator2["default"],
	          _extends({ overlayView: this.state.overlayView }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "FLOAT_PANE",
	    value: "floatPane",
	    enumerable: true
	  }, {
	    key: "MAP_PANE",
	    value: "mapPane",
	    enumerable: true
	  }, {
	    key: "MARKER_LAYER",
	    value: "markerLayer",
	    enumerable: true
	  }, {
	    key: "OVERLAY_LAYER",
	    value: "overlayLayer",
	    enumerable: true
	  }, {
	    key: "OVERLAY_MOUSE_TARGET",
	    value: "overlayMouseTarget",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: _extends({}, _creatorsOverlayViewCreator.overlayViewDefaultPropTypes, _creatorsOverlayViewCreator.overlayViewControlledPropTypes),
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      mapPaneName: OverlayView.OVERLAY_LAYER
	    },
	    enumerable: true
	  }]);

	  return OverlayView;
	})(_react.Component);

	exports["default"] = OverlayView;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _invariant = __webpack_require__(259);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var overlayViewControlledPropTypes = {
	  // CustomProps
	  mapPaneName: _react.PropTypes.string,
	  getPixelPositionOffset: _react.PropTypes.func,
	  position: _react.PropTypes.object,
	  children: _react.PropTypes.node,
	  bounds: _react.PropTypes.object
	};

	exports.overlayViewControlledPropTypes = overlayViewControlledPropTypes;
	// NOTICE!!!!!!
	//
	// Only expose those with getters & setters in the table as controlled props.
	//
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	//
	// https://developers.google.com/maps/documentation/javascript/3.exp/reference
	var overlayViewDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(overlayViewControlledPropTypes);

	exports.overlayViewDefaultPropTypes = overlayViewDefaultPropTypes;

	var OverlayViewCreator = (function (_Component) {
	  _inherits(OverlayViewCreator, _Component);

	  function OverlayViewCreator() {
	    _classCallCheck(this, OverlayViewCreator);

	    _get(Object.getPrototypeOf(OverlayViewCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(OverlayViewCreator, [{
	    key: "getOverlayView",
	    value: function getOverlayView() {
	      return this.props.overlayView;
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.getOverlayView().setMap(this.props.mapHolderRef.getMap());
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      this.getOverlayView().setValues(this.props);
	      this.getOverlayView()._redraw(this.props.mapPaneName !== prevProps.mapPaneName);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.getOverlayView().setMap(null);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createOverlayView",
	    value: function _createOverlayView(overlayViewProps) {
	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView
	      var overlayView = new google.maps.OverlayView();
	      overlayView.setValues((0, _utilsComposeOptions2["default"])(overlayViewProps, overlayViewControlledPropTypes));

	      overlayView.onAdd = function onAdd() {
	        this._containerElement = document.createElement("div");
	        this._containerElement.style.position = "absolute";
	      };

	      overlayView.draw = function draw() {
	        this._mountContainerToPane();
	        this._renderContent();
	      };

	      overlayView.onRemove = function onRemove() {
	        (0, _reactDom.unmountComponentAtNode)(this._containerElement);
	        this._unmountContainerFromPane();
	        this._containerElement = null;
	      };

	      overlayView._redraw = function _redraw(mapPaneNameChanged) {
	        if (mapPaneNameChanged) {
	          this._unmountContainerFromPane();
	          this._mountContainerToPane();
	        }
	        this._renderContent();
	      };

	      overlayView._renderContent = function _renderContent() {
	        if (this._containerElement) {
	          (0, _reactDom.render)(_react.Children.only(this.get("children")), this._containerElement, this._positionContainerElement.bind(this));
	        }
	      };

	      overlayView._mountContainerToPane = function _mountContainerToPane() {
	        var mapPaneName = this.get("mapPaneName");
	        (0, _invariant2["default"])(!!mapPaneName, "OverlayView requires a mapPaneName/defaultMapPaneName in your props instead of %s", mapPaneName);

	        this.getPanes()[mapPaneName].appendChild(this._containerElement);
	      };

	      overlayView._unmountContainerFromPane = function _unmountContainerFromPane() {
	        this._containerElement.parentNode.removeChild(this._containerElement);
	      };

	      overlayView._positionContainerElement = function _positionContainerElement() {
	        var left = undefined;
	        var top = undefined;
	        var offset = this._getOffset();
	        if (this.get("bounds")) {
	          var bounds = this._getPixelBounds();
	          if (bounds) {
	            var sw = bounds.sw;
	            var ne = bounds.ne;

	            if (offset) {
	              sw.x += offset.x;
	              ne.y += offset.y;
	            }
	            left = sw.x + "px";
	            top = ne.y + "px";
	            this._containerElement.style.width = ne.x - sw.x + "px";
	            this._containerElement.style.height = sw.y - ne.y + "px";
	          }
	        } else {
	          var position = this._getPixelPosition();
	          if (position) {
	            var x = position.x;
	            var y = position.y;

	            if (offset) {
	              x += offset.x;
	              y += offset.y;
	            }
	            left = x + "px";
	            top = y + "px";
	          }
	        }

	        this._containerElement.style.left = left;
	        this._containerElement.style.top = top;
	      };

	      overlayView._getPixelPosition = function _getPixelPosition() {
	        var projection = this.getProjection();
	        var position = this.get("position");
	        (0, _invariant2["default"])(!!position, "OverlayView requires a position/defaultPosition in your props instead of %s", position);
	        if (projection && position) {
	          if (!(position instanceof google.maps.LatLng)) {
	            position = new google.maps.LatLng(position.lat, position.lng);
	          }
	          return projection.fromLatLngToDivPixel(position);
	        }
	      };

	      overlayView._getPixelBounds = function _getPixelBounds() {
	        var projection = this.getProjection();
	        var bounds = this.get("bounds");
	        (0, _invariant2["default"])(!!bounds, "OverlayView requires a bounds in your props instead of %s", bounds);
	        if (projection && bounds) {
	          if (!(bounds instanceof google.maps.LatLngBounds)) {
	            bounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.ne.lat, bounds.ne.lng), new google.maps.LatLng(bounds.sw.lat, bounds.sw.lng));
	          }
	          return {
	            sw: projection.fromLatLngToDivPixel(this.bounds.getSouthWest()),
	            ne: projection.fromLatLngToDivPixel(this.bounds.getNorthEast())
	          };
	        }
	      };

	      overlayView._getOffset = function _getOffset() {
	        // Allows the component to control the visual position of the OverlayView
	        // relative to the LatLng pixel position.
	        var getPixelPositionOffset = this.get("getPixelPositionOffset");
	        if (getPixelPositionOffset) {
	          return getPixelPositionOffset(this._containerElement.offsetWidth, this._containerElement.offsetHeight);
	        }
	      };

	      // If we're inside a MarkerClusterer, allow ourselves to be clustered
	      if (overlayViewProps.anchorHolderRef) {
	        if ("MarkerClusterer" === overlayViewProps.anchorHolderRef.getAnchorType()) {
	          overlayView.getDraggable = function getDraggable() {
	            return !!overlayViewProps.draggable;
	          };

	          overlayView.getPosition = function getPosition() {
	            return new google.maps.LatLng(this.position);
	          };

	          overlayViewProps.anchorHolderRef.getAnchor().addMarker(overlayView);
	        }
	      }

	      return overlayView;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      mapPaneName: _react.PropTypes.string,
	      overlayView: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  return OverlayViewCreator;
	})(_react.Component);

	exports["default"] = OverlayViewCreator;

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsPolygonCreator = __webpack_require__(261);

	var _creatorsPolygonCreator2 = _interopRequireDefault(_creatorsPolygonCreator);

	var Polygon = (function (_Component) {
	  _inherits(Polygon, _Component);

	  function Polygon() {
	    _classCallCheck(this, Polygon);

	    _get(Object.getPrototypeOf(Polygon.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Polygon, [{
	    key: "getDraggable",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDraggable() {
	      return this.state.polygon.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.polygon.getEditable();
	    }
	  }, {
	    key: "getPath",
	    value: function getPath() {
	      return this.state.polygon.getPath();
	    }
	  }, {
	    key: "getPaths",
	    value: function getPaths() {
	      return this.state.polygon.getPaths();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.polygon.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var polygon = _creatorsPolygonCreator2["default"]._createPolygon(this.props);

	      this.setState({ polygon: polygon });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.polygon) {
	        return _react2["default"].createElement(
	          _creatorsPolygonCreator2["default"],
	          _extends({ polygon: this.state.polygon }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsPolygonCreator.polygonDefaultPropTypes, _creatorsPolygonCreator.polygonControlledPropTypes, _creatorsPolygonCreator.polygonEventPropTypes),
	    enumerable: true
	  }]);

	  return Polygon;
	})(_react.Component);

	exports["default"] = Polygon;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsPolygonEventList = __webpack_require__(262);

	var _eventListsPolygonEventList2 = _interopRequireDefault(_eventListsPolygonEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var polygonControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  path: _react.PropTypes.any,
	  paths: _react.PropTypes.any,
	  visible: _react.PropTypes.bool
	};

	exports.polygonControlledPropTypes = polygonControlledPropTypes;
	var polygonDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(polygonControlledPropTypes);

	exports.polygonDefaultPropTypes = polygonDefaultPropTypes;
	var polygonUpdaters = {
	  draggable: function draggable(_draggable, component) {
	    component.getPolygon().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getPolygon().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getPolygon().setOptions(_options);
	  },
	  path: function path(_path, component) {
	    component.getPolygon().setPath(_path);
	  },
	  paths: function paths(_paths, component) {
	    component.getPolygon().setPaths(_paths);
	  },
	  visible: function visible(_visible, component) {
	    component.getPolygon().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsPolygonEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var polygonEventPropTypes = eventPropTypes;

	exports.polygonEventPropTypes = polygonEventPropTypes;

	var PolygonCreator = (function (_Component) {
	  _inherits(PolygonCreator, _Component);

	  function PolygonCreator() {
	    _classCallCheck(this, _PolygonCreator);

	    _get(Object.getPrototypeOf(_PolygonCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PolygonCreator, [{
	    key: "getPolygon",
	    value: function getPolygon() {
	      return this.props.polygon;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createPolygon",
	    value: function _createPolygon(polygonProps) {
	      var mapHolderRef = polygonProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	      var polygon = new google.maps.Polygon((0, _utilsComposeOptions2["default"])(polygonProps, polygonControlledPropTypes));

	      polygon.setMap(mapHolderRef.getMap());

	      return polygon;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      polygon: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _PolygonCreator = PolygonCreator;
	  PolygonCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getPolygon",
	    updaters: polygonUpdaters
	  })(PolygonCreator) || PolygonCreator;
	  return PolygonCreator;
	})(_react.Component);

	exports["default"] = PolygonCreator;

/***/ },
/* 262 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polygon
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsPolylineCreator = __webpack_require__(264);

	var _creatorsPolylineCreator2 = _interopRequireDefault(_creatorsPolylineCreator);

	var Polyline = (function (_Component) {
	  _inherits(Polyline, _Component);

	  function Polyline() {
	    _classCallCheck(this, Polyline);

	    _get(Object.getPrototypeOf(Polyline.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Polyline, [{
	    key: "getDraggable",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getDraggable() {
	      return this.state.polyline.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.polyline.getEditable();
	    }
	  }, {
	    key: "getPath",
	    value: function getPath() {
	      return this.state.polyline.getPath();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.polyline.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var polyline = _creatorsPolylineCreator2["default"]._createPolyline(this.props);

	      this.setState({ polyline: polyline });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.polyline) {
	        return _react2["default"].createElement(
	          _creatorsPolylineCreator2["default"],
	          _extends({ polyline: this.state.polyline }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsPolylineCreator.polylineDefaultPropTypes, _creatorsPolylineCreator.polylineControlledPropTypes, _creatorsPolylineCreator.polylineEventPropTypes),
	    enumerable: true
	  }]);

	  return Polyline;
	})(_react.Component);

	exports["default"] = Polyline;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsPolylineEventList = __webpack_require__(265);

	var _eventListsPolylineEventList2 = _interopRequireDefault(_eventListsPolylineEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var polylineControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  path: _react.PropTypes.any,
	  visible: _react.PropTypes.bool
	};

	exports.polylineControlledPropTypes = polylineControlledPropTypes;
	var polylineDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(polylineControlledPropTypes);

	exports.polylineDefaultPropTypes = polylineDefaultPropTypes;
	var polylineUpdaters = {
	  draggable: function draggable(_draggable, component) {
	    component.getPolyline().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getPolyline().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getPolyline().setOptions(_options);
	  },
	  path: function path(_path, component) {
	    component.getPolyline().setPath(_path);
	  },
	  visible: function visible(_visible, component) {
	    component.getPolyline().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsPolylineEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var polylineEventPropTypes = eventPropTypes;

	exports.polylineEventPropTypes = polylineEventPropTypes;

	var PolylineCreator = (function (_Component) {
	  _inherits(PolylineCreator, _Component);

	  function PolylineCreator() {
	    _classCallCheck(this, _PolylineCreator);

	    _get(Object.getPrototypeOf(_PolylineCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PolylineCreator, [{
	    key: "getPolyline",
	    value: function getPolyline() {
	      return this.props.polyline;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createPolyline",
	    value: function _createPolyline(polylineProps) {
	      var mapHolderRef = polylineProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	      var polyline = new google.maps.Polyline((0, _utilsComposeOptions2["default"])(polylineProps, polylineControlledPropTypes));

	      polyline.setMap(mapHolderRef.getMap());

	      return polyline;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      polyline: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _PolylineCreator = PolylineCreator;
	  PolylineCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getPolyline",
	    updaters: polylineUpdaters
	  })(PolylineCreator) || PolylineCreator;
	  return PolylineCreator;
	})(_react.Component);

	exports["default"] = PolylineCreator;

/***/ },
/* 265 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Polyline
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsRectangleCreator = __webpack_require__(267);

	var _creatorsRectangleCreator2 = _interopRequireDefault(_creatorsRectangleCreator);

	/*
	 * Original author: @alistairjcbrown
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/80
	 */

	var Rectangle = (function (_Component) {
	  _inherits(Rectangle, _Component);

	  function Rectangle() {
	    _classCallCheck(this, Rectangle);

	    _get(Object.getPrototypeOf(Rectangle.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(Rectangle, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
	    value: function getBounds() {
	      return this.state.rectangle.getBounds();
	    }
	  }, {
	    key: "getDraggable",
	    value: function getDraggable() {
	      return this.state.rectangle.getDraggable();
	    }
	  }, {
	    key: "getEditable",
	    value: function getEditable() {
	      return this.state.rectangle.getEditable();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.rectangle.getVisible();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var rectangle = _creatorsRectangleCreator2["default"]._createRectangle(this.props);

	      this.setState({ rectangle: rectangle });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.rectangle) {
	        return _react2["default"].createElement(
	          _creatorsRectangleCreator2["default"],
	          _extends({ rectangle: this.state.rectangle }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsRectangleCreator.rectangleDefaultPropTypes, _creatorsRectangleCreator.rectangleControlledPropTypes, _creatorsRectangleCreator.rectangleEventPropTypes),
	    enumerable: true
	  }]);

	  return Rectangle;
	})(_react.Component);

	exports["default"] = Rectangle;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsRectangleEventList = __webpack_require__(268);

	var _eventListsRectangleEventList2 = _interopRequireDefault(_eventListsRectangleEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var rectangleControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
	  //
	  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	  bounds: _react.PropTypes.any,
	  draggable: _react.PropTypes.bool,
	  editable: _react.PropTypes.bool,
	  options: _react.PropTypes.object,
	  visible: _react.PropTypes.bool
	};

	exports.rectangleControlledPropTypes = rectangleControlledPropTypes;
	var rectangleDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(rectangleControlledPropTypes);

	exports.rectangleDefaultPropTypes = rectangleDefaultPropTypes;
	var rectangleUpdaters = {
	  bounds: function bounds(_bounds, component) {
	    component.getRectangle().setBounds(_bounds);
	  },
	  draggable: function draggable(_draggable, component) {
	    component.getRectangle().setDraggable(_draggable);
	  },
	  editable: function editable(_editable, component) {
	    component.getRectangle().setEditable(_editable);
	  },
	  options: function options(_options, component) {
	    component.getRectangle().setOptions(_options);
	  },
	  visible: function visible(_visible, component) {
	    component.getRectangle().setVisible(_visible);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsRectangleEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var rectangleEventPropTypes = eventPropTypes;

	exports.rectangleEventPropTypes = rectangleEventPropTypes;

	var RectangleCreator = (function (_Component) {
	  _inherits(RectangleCreator, _Component);

	  function RectangleCreator() {
	    _classCallCheck(this, _RectangleCreator);

	    _get(Object.getPrototypeOf(_RectangleCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(RectangleCreator, [{
	    key: "getRectangle",
	    value: function getRectangle() {
	      return this.props.rectangle;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createRectangle",
	    value: function _createRectangle(rectangleProps) {
	      var mapHolderRef = rectangleProps.mapHolderRef;

	      // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	      var rectangle = new google.maps.Rectangle((0, _utilsComposeOptions2["default"])(rectangleProps, rectangleControlledPropTypes));

	      rectangle.setMap(mapHolderRef.getMap());

	      return rectangle;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      rectangle: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _RectangleCreator = RectangleCreator;
	  RectangleCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getRectangle",
	    updaters: rectangleUpdaters
	  })(RectangleCreator) || RectangleCreator;
	  return RectangleCreator;
	})(_react.Component);

	exports["default"] = RectangleCreator;

/***/ },
/* 268 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["bounds_changed", "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"];
	module.exports = exports["default"];

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _creatorsSearchBoxCreator = __webpack_require__(270);

	var _creatorsSearchBoxCreator2 = _interopRequireDefault(_creatorsSearchBoxCreator);

	/*
	 * Original author: @eyebraus
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/110
	 */

	var SearchBox = (function (_Component) {
	  _inherits(SearchBox, _Component);

	  function SearchBox() {
	    _classCallCheck(this, SearchBox);

	    _get(Object.getPrototypeOf(SearchBox.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(SearchBox, [{
	    key: "getBounds",

	    // Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
	    //
	    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
	    value: function getBounds() {
	      return this.state.searchBox.getBounds();
	    }
	  }, {
	    key: "getPlaces",
	    value: function getPlaces() {
	      return this.state.searchBox.getPlaces();
	    }

	    // END - Public APIs
	    //
	    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var classes = _props.classes;
	      var style = _props.style;
	      var placeholder = _props.placeholder;

	      var searchBoxProps = _objectWithoutProperties(_props, ["mapHolderRef", "classes", "style", "placeholder"]);

	      // Cannot create input via component - Google Maps will mess with React's internal state by detaching/attaching.
	      // Allow developers to style the "hidden element" via inputClasses.
	      var domEl = document.createElement("input");
	      domEl.className = classes;
	      domEl.type = "text";
	      domEl.placeholder = placeholder;

	      for (var propKey in style) {
	        if (style.hasOwnProperty(propKey)) {
	          domEl.style[propKey] = style[propKey];
	        }
	      }

	      var searchBox = _creatorsSearchBoxCreator2["default"]._createSearchBox(domEl, searchBoxProps);

	      this.setState({
	        inputElement: domEl,
	        searchBox: searchBox
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props2 = this.props;
	      var mapHolderRef = _props2.mapHolderRef;
	      var controlPosition = _props2.controlPosition;

	      return this.state.searchBox ? _react2["default"].createElement(
	        _creatorsSearchBoxCreator2["default"],
	        _extends({ controlPosition: controlPosition, inputElement: this.state.inputElement, mapHolderRef: mapHolderRef, searchBox: this.state.searchBox }, this.props),
	        this.props.children
	      ) : _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _creatorsSearchBoxCreator.searchBoxDefaultPropTypes, _creatorsSearchBoxCreator.searchBoxControlledPropTypes, _creatorsSearchBoxCreator.searchBoxEventPropTypes),
	    enumerable: true
	  }]);

	  return SearchBox;
	})(_react.Component);

	exports["default"] = SearchBox;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eventListsSearchBoxEventList = __webpack_require__(271);

	var _eventListsSearchBoxEventList2 = _interopRequireDefault(_eventListsSearchBoxEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _GoogleMapHolder = __webpack_require__(227);

	var _GoogleMapHolder2 = _interopRequireDefault(_GoogleMapHolder);

	var searchBoxControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  bounds: _react.PropTypes.any
	};

	exports.searchBoxControlledPropTypes = searchBoxControlledPropTypes;
	var searchBoxDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(searchBoxControlledPropTypes);

	exports.searchBoxDefaultPropTypes = searchBoxDefaultPropTypes;
	var searchBoxUpdaters = {
	  bounds: function bounds(_bounds, component) {
	    component.getSearchBox().setBounds(_bounds);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_eventListsSearchBoxEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var searchBoxEventPropTypes = eventPropTypes;

	exports.searchBoxEventPropTypes = searchBoxEventPropTypes;

	var SearchBoxCreator = (function (_Component) {
	  _inherits(SearchBoxCreator, _Component);

	  function SearchBoxCreator() {
	    _classCallCheck(this, _SearchBoxCreator);

	    _get(Object.getPrototypeOf(_SearchBoxCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(SearchBoxCreator, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this._mountComponentToMap(this.props.controlPosition);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      if (this.props.controlPosition !== prevProps.controlPosition) {
	        this._unmountComponentFromMap(prevProps.controlPosition);
	        this._mountComponentToMap(this.props.controlPosition);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this._unmountComponentFromMap(this.props.controlPosition);
	    }
	  }, {
	    key: "_mountComponentToMap",
	    value: function _mountComponentToMap(controlPosition) {
	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var inputElement = _props.inputElement;

	      mapHolderRef.getMap().controls[controlPosition].push(inputElement);
	    }
	  }, {
	    key: "_unmountComponentFromMap",
	    value: function _unmountComponentFromMap(controlPosition) {
	      var _props2 = this.props;
	      var mapHolderRef = _props2.mapHolderRef;
	      var inputElement = _props2.inputElement;

	      var index = mapHolderRef.getMap().controls[controlPosition].getArray().indexOf(inputElement);
	      mapHolderRef.getMap().controls[controlPosition].removeAt(index);
	    }
	  }, {
	    key: "getSearchBox",
	    value: function getSearchBox() {
	      return this.props.searchBox;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createSearchBox",
	    value: function _createSearchBox(inputElement, searchBoxProps) {
	      var searchBox = new google.maps.places.SearchBox(inputElement, (0, _utilsComposeOptions2["default"])(searchBoxProps, searchBoxControlledPropTypes));

	      return searchBox;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_GoogleMapHolder2["default"]).isRequired,
	      searchBox: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _SearchBoxCreator = SearchBoxCreator;
	  SearchBoxCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getSearchBox",
	    updaters: searchBoxUpdaters
	  })(SearchBoxCreator) || SearchBoxCreator;
	  return SearchBoxCreator;
	})(_react.Component);

	exports["default"] = SearchBoxCreator;

/***/ },
/* 271 */
/***/ function(module, exports) {

	// https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
	// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["places_changed"];
	module.exports = exports["default"];

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _addonsCreatorsInfoBoxCreator = __webpack_require__(273);

	var _addonsCreatorsInfoBoxCreator2 = _interopRequireDefault(_addonsCreatorsInfoBoxCreator);

	/*
	 * Original author: @wuct
	 * Original PR: https://github.com/tomchentw/react-google-maps/pull/54
	 */

	var InfoBox = (function (_Component) {
	  _inherits(InfoBox, _Component);

	  function InfoBox() {
	    _classCallCheck(this, InfoBox);

	    _get(Object.getPrototypeOf(InfoBox.prototype), "constructor", this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(InfoBox, [{
	    key: "getContent",

	    // Public APIs
	    //
	    // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
	    value: function getContent() {/* TODO: children */}
	  }, {
	    key: "getPosition",
	    value: function getPosition() {
	      return this.state.infoBox.getPosition();
	    }
	  }, {
	    key: "getVisible",
	    value: function getVisible() {
	      return this.state.infoBox.getVisible();
	    }
	  }, {
	    key: "getZIndex",
	    value: function getZIndex() {
	      return this.state.infoBox.getZIndex();
	    }

	    // END - Public APIs
	    //
	    // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html

	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      if (!_canUseDom2["default"]) {
	        return;
	      }
	      var infoBox = _addonsCreatorsInfoBoxCreator2["default"]._createInfoBox(this.props);

	      this.setState({ infoBox: infoBox });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.state.infoBox) {
	        return _react2["default"].createElement(
	          _addonsCreatorsInfoBoxCreator2["default"],
	          _extends({ infoBox: this.state.infoBox }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2["default"].createElement("noscript", null);
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: _extends({}, _addonsCreatorsInfoBoxCreator.infoBoxDefaultPropTypes, _addonsCreatorsInfoBoxCreator.infoBoxControlledPropTypes, _addonsCreatorsInfoBoxCreator.infoBoxEventPropTypes),
	    enumerable: true
	  }]);

	  return InfoBox;
	})(_react.Component);

	exports["default"] = InfoBox;
	module.exports = exports["default"];

	// Uncontrolled default[props] - used only in componentDidMount

	// Controlled [props] - used in componentDidMount/componentDidUpdate

	// Event [onEventName]

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _addonsEventListsInfoBoxEventList = __webpack_require__(274);

	var _addonsEventListsInfoBoxEventList2 = _interopRequireDefault(_addonsEventListsInfoBoxEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsSetContentForOptionalReactElement = __webpack_require__(250);

	var _utilsSetContentForOptionalReactElement2 = _interopRequireDefault(_utilsSetContentForOptionalReactElement);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _creatorsGoogleMapHolder = __webpack_require__(227);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var infoBoxControlledPropTypes = {
	  // NOTICE!!!!!!
	  //
	  // Only expose those with getters & setters in the table as controlled props.
	  //
	  // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
	  content: _react.PropTypes.any,
	  options: _react.PropTypes.object,
	  position: _react.PropTypes.any,
	  visible: _react.PropTypes.bool,
	  zIndex: _react.PropTypes.number
	};

	exports.infoBoxControlledPropTypes = infoBoxControlledPropTypes;
	var infoBoxDefaultPropTypes = (0, _utilsDefaultPropsCreator2["default"])(infoBoxControlledPropTypes);

	exports.infoBoxDefaultPropTypes = infoBoxDefaultPropTypes;
	var infoBoxUpdaters = {
	  children: function children(_children, component) {
	    (0, _utilsSetContentForOptionalReactElement2["default"])(_children, component.getInfoBox());
	  },
	  content: function content(_content, component) {
	    component.getInfoBox().setContent(_content);
	  },
	  options: function options(_options, component) {
	    component.getInfoBox().setOptions(_options);
	  },
	  position: function position(_position, component) {
	    component.getInfoBox().setPosition(_position);
	  },
	  visible: function visible(_visible, component) {
	    component.getInfoBox().setVisible(_visible);
	  },
	  zIndex: function zIndex(_zIndex, component) {
	    component.getInfoBox().setZIndex(_zIndex);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2["default"])(_addonsEventListsInfoBoxEventList2["default"]);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var infoBoxEventPropTypes = eventPropTypes;

	exports.infoBoxEventPropTypes = infoBoxEventPropTypes;

	var InfoBoxCreator = (function (_Component) {
	  _inherits(InfoBoxCreator, _Component);

	  function InfoBoxCreator() {
	    _classCallCheck(this, _InfoBoxCreator);

	    _get(Object.getPrototypeOf(_InfoBoxCreator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(InfoBoxCreator, [{
	    key: "getInfoBox",
	    value: function getInfoBox() {
	      return this.props.infoBox;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("noscript", null);
	    }
	  }], [{
	    key: "_createInfoBox",
	    value: function _createInfoBox(infoBoxProps) {
	      var mapHolderRef = infoBoxProps.mapHolderRef;
	      var anchorHolderRef = infoBoxProps.anchorHolderRef;

	      // "google-maps-infobox" uses "google" as a global variable. Since we don't
	      // have "google" on the server, we can not use it in server-side rendering.
	      // As a result, we import "google-maps-infobox" here to prevent an error on
	      // a isomorphic server.
	      var GoogleMapsInfobox = __webpack_require__(275);
	      // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
	      var infoBox = new GoogleMapsInfobox((0, _utilsComposeOptions2["default"])(infoBoxProps, infoBoxControlledPropTypes));

	      if (infoBoxProps.children) {
	        (0, _utilsSetContentForOptionalReactElement2["default"])(infoBoxProps.children, infoBox);
	      }

	      if (anchorHolderRef) {
	        infoBox.open(mapHolderRef.getMap(), anchorHolderRef.getAnchor());
	      } else {
	        infoBox.open(mapHolderRef.getMap());
	      }
	      return infoBox;
	    }
	  }, {
	    key: "propTypes",
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_creatorsGoogleMapHolder2["default"]).isRequired,
	      infoBox: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _InfoBoxCreator = InfoBoxCreator;
	  InfoBoxCreator = (0, _utilsComponentLifecycleDecorator2["default"])({
	    registerEvents: registerEvents,
	    instanceMethodName: "getInfoBox",
	    updaters: infoBoxUpdaters
	  })(InfoBoxCreator) || InfoBoxCreator;
	  return InfoBoxCreator;
	})(_react.Component);

	exports["default"] = InfoBoxCreator;

/***/ },
/* 274 */
/***/ function(module, exports) {

	// http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"];
	module.exports = exports["default"];

/***/ },
/* 275 */
/***/ function(module, exports) {

	/**
	 * @name InfoBox
	 * @version 1.1.13 [March 19, 2014]
	 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
	 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
	 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
	 *  <p>
	 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
	 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
	 *  <p>
	 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
	 */

	/*!
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *       http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/*jslint browser:true */
	/*global google */

	/**
	 * @name InfoBoxOptions
	 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
	 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
	 * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
	 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
	 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
	 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
	 *  to the map pixel corresponding to <tt>position</tt>.
	 * @property {LatLng} position The geographic location at which to display the InfoBox.
	 * @property {number} zIndex The CSS z-index style value for the InfoBox.
	 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
	 * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
	 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
	 *  style values to be applied to the InfoBox. Style values defined here override those that may
	 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
	 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
	 *  are removed from the InfoBox before the new style values are applied.
	 * @property {string} closeBoxMargin The CSS margin style value for the close box.
	 *  The default is "2px" (a 2-pixel margin on all sides).
	 * @property {string} closeBoxURL The URL of the image representing the close box.
	 *  Note: The default is the URL for Google's standard close box.
	 *  Set this property to "" if no close box is required.
	 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
	 *  map edge after an auto-pan.
	 * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
	 *  [Deprecated in favor of the <tt>visible</tt> property.]
	 * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
	 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
	 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
	 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
	 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
	 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
	 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
	 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
	 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
	 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
	 */

	/**
	 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
	 *  Call <tt>InfoBox.open</tt> to add the box to the map.
	 * @constructor
	 * @param {InfoBoxOptions} [opt_opts]
	 */
	function InfoBox(opt_opts) {

	  opt_opts = opt_opts || {};

	  google.maps.OverlayView.apply(this, arguments);

	  // Standard options (in common with google.maps.InfoWindow):
	  //
	  this.content_ = opt_opts.content || "";
	  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
	  this.maxWidth_ = opt_opts.maxWidth || 0;
	  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
	  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
	  this.zIndex_ = opt_opts.zIndex || null;

	  // Additional options (unique to InfoBox):
	  //
	  this.boxClass_ = opt_opts.boxClass || "infoBox";
	  this.boxStyle_ = opt_opts.boxStyle || {};
	  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
	  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
	  if (opt_opts.closeBoxURL === "") {
	    this.closeBoxURL_ = "";
	  }
	  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);

	  if (typeof opt_opts.visible === "undefined") {
	    if (typeof opt_opts.isHidden === "undefined") {
	      opt_opts.visible = true;
	    } else {
	      opt_opts.visible = !opt_opts.isHidden;
	    }
	  }
	  this.isHidden_ = !opt_opts.visible;

	  this.alignBottom_ = opt_opts.alignBottom || false;
	  this.pane_ = opt_opts.pane || "floatPane";
	  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

	  this.div_ = null;
	  this.closeListener_ = null;
	  this.moveListener_ = null;
	  this.contextListener_ = null;
	  this.eventListeners_ = null;
	  this.fixedWidthSet_ = null;
	}

	/* InfoBox extends OverlayView in the Google Maps API v3.
	 */
	InfoBox.prototype = new google.maps.OverlayView();

	/**
	 * Creates the DIV representing the InfoBox.
	 * @private
	 */
	InfoBox.prototype.createInfoBoxDiv_ = function () {

	  var i;
	  var events;
	  var bw;
	  var me = this;

	  // This handler prevents an event in the InfoBox from being passed on to the map.
	  //
	  var cancelHandler = function (e) {
	    e.cancelBubble = true;
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }
	  };

	  // This handler ignores the current event in the InfoBox and conditionally prevents
	  // the event from being passed on to the map. It is used for the contextmenu event.
	  //
	  var ignoreHandler = function (e) {

	    e.returnValue = false;

	    if (e.preventDefault) {

	      e.preventDefault();
	    }

	    if (!me.enableEventPropagation_) {

	      cancelHandler(e);
	    }
	  };

	  if (!this.div_) {

	    this.div_ = document.createElement("div");

	    this.setBoxStyle_();

	    if (typeof this.content_.nodeType === "undefined") {
	      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
	    } else {
	      this.div_.innerHTML = this.getCloseBoxImg_();
	      this.div_.appendChild(this.content_);
	    }

	    // Add the InfoBox DIV to the DOM
	    this.getPanes()[this.pane_].appendChild(this.div_);

	    this.addClickHandler_();

	    if (this.div_.style.width) {

	      this.fixedWidthSet_ = true;

	    } else {

	      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

	        this.div_.style.width = this.maxWidth_;
	        this.div_.style.overflow = "auto";
	        this.fixedWidthSet_ = true;

	      } else { // The following code is needed to overcome problems with MSIE

	        bw = this.getBoxWidths_();

	        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
	        this.fixedWidthSet_ = false;
	      }
	    }

	    this.panBox_(this.disableAutoPan_);

	    if (!this.enableEventPropagation_) {

	      this.eventListeners_ = [];

	      // Cancel event propagation.
	      //
	      // Note: mousemove not included (to resolve Issue 152)
	      events = ["mousedown", "mouseover", "mouseout", "mouseup",
	      "click", "dblclick", "touchstart", "touchend", "touchmove"];

	      for (i = 0; i < events.length; i++) {

	        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
	      }
	      
	      // Workaround for Google bug that causes the cursor to change to a pointer
	      // when the mouse moves over a marker underneath InfoBox.
	      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
	        this.style.cursor = "default";
	      }));
	    }

	    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

	    /**
	     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
	     * @name InfoBox#domready
	     * @event
	     */
	    google.maps.event.trigger(this, "domready");
	  }
	};

	/**
	 * Returns the HTML <IMG> tag for the close box.
	 * @private
	 */
	InfoBox.prototype.getCloseBoxImg_ = function () {

	  var img = "";

	  if (this.closeBoxURL_ !== "") {

	    img  = "<img";
	    img += " src='" + this.closeBoxURL_ + "'";
	    img += " align=right"; // Do this because Opera chokes on style='float: right;'
	    img += " style='";
	    img += " position: relative;"; // Required by MSIE
	    img += " cursor: pointer;";
	    img += " margin: " + this.closeBoxMargin_ + ";";
	    img += "'>";
	  }

	  return img;
	};

	/**
	 * Adds the click handler to the InfoBox close box.
	 * @private
	 */
	InfoBox.prototype.addClickHandler_ = function () {

	  var closeBox;

	  if (this.closeBoxURL_ !== "") {

	    closeBox = this.div_.firstChild;
	    this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());

	  } else {

	    this.closeListener_ = null;
	  }
	};

	/**
	 * Returns the function to call when the user clicks the close box of an InfoBox.
	 * @private
	 */
	InfoBox.prototype.getCloseClickHandler_ = function () {

	  var me = this;

	  return function (e) {

	    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
	    e.cancelBubble = true;

	    if (e.stopPropagation) {

	      e.stopPropagation();
	    }

	    /**
	     * This event is fired when the InfoBox's close box is clicked.
	     * @name InfoBox#closeclick
	     * @event
	     */
	    google.maps.event.trigger(me, "closeclick");

	    me.close();
	  };
	};

	/**
	 * Pans the map so that the InfoBox appears entirely within the map's visible area.
	 * @private
	 */
	InfoBox.prototype.panBox_ = function (disablePan) {

	  var map;
	  var bounds;
	  var xOffset = 0, yOffset = 0;

	  if (!disablePan) {

	    map = this.getMap();

	    if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

	      if (!map.getBounds().contains(this.position_)) {
	      // Marker not in visible area of map, so set center
	      // of map to the marker position first.
	        map.setCenter(this.position_);
	      }

	      bounds = map.getBounds();

	      var mapDiv = map.getDiv();
	      var mapWidth = mapDiv.offsetWidth;
	      var mapHeight = mapDiv.offsetHeight;
	      var iwOffsetX = this.pixelOffset_.width;
	      var iwOffsetY = this.pixelOffset_.height;
	      var iwWidth = this.div_.offsetWidth;
	      var iwHeight = this.div_.offsetHeight;
	      var padX = this.infoBoxClearance_.width;
	      var padY = this.infoBoxClearance_.height;
	      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

	      if (pixPosition.x < (-iwOffsetX + padX)) {
	        xOffset = pixPosition.x + iwOffsetX - padX;
	      } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
	        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
	      }
	      if (this.alignBottom_) {
	        if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
	          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
	        } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
	          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
	        }
	      } else {
	        if (pixPosition.y < (-iwOffsetY + padY)) {
	          yOffset = pixPosition.y + iwOffsetY - padY;
	        } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
	          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
	        }
	      }

	      if (!(xOffset === 0 && yOffset === 0)) {

	        // Move the map to the shifted center.
	        //
	        var c = map.getCenter();
	        map.panBy(xOffset, yOffset);
	      }
	    }
	  }
	};

	/**
	 * Sets the style of the InfoBox by setting the style sheet and applying
	 * other specific styles requested.
	 * @private
	 */
	InfoBox.prototype.setBoxStyle_ = function () {

	  var i, boxStyle;

	  if (this.div_) {

	    // Apply style values from the style sheet defined in the boxClass parameter:
	    this.div_.className = this.boxClass_;

	    // Clear existing inline style values:
	    this.div_.style.cssText = "";

	    // Apply style values defined in the boxStyle parameter:
	    boxStyle = this.boxStyle_;
	    for (i in boxStyle) {

	      if (boxStyle.hasOwnProperty(i)) {

	        this.div_.style[i] = boxStyle[i];
	      }
	    }

	    // Fix for iOS disappearing InfoBox problem.
	    // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
	    this.div_.style.WebkitTransform = "translateZ(0)";

	    // Fix up opacity style for benefit of MSIE:
	    //
	    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
	      // See http://www.quirksmode.org/css/opacity.html
	      this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this.div_.style.opacity * 100) + ")\"";
	      this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
	    }

	    // Apply required styles:
	    //
	    this.div_.style.position = "absolute";
	    this.div_.style.visibility = 'hidden';
	    if (this.zIndex_ !== null) {

	      this.div_.style.zIndex = this.zIndex_;
	    }
	  }
	};

	/**
	 * Get the widths of the borders of the InfoBox.
	 * @private
	 * @return {Object} widths object (top, bottom left, right)
	 */
	InfoBox.prototype.getBoxWidths_ = function () {

	  var computedStyle;
	  var bw = {top: 0, bottom: 0, left: 0, right: 0};
	  var box = this.div_;

	  if (document.defaultView && document.defaultView.getComputedStyle) {

	    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

	    if (computedStyle) {

	      // The computed styles are always in pixel units (good!)
	      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
	      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
	      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
	      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
	    }

	  } else if (document.documentElement.currentStyle) { // MSIE

	    if (box.currentStyle) {

	      // The current styles may not be in pixel units, but assume they are (bad!)
	      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
	      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
	      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
	      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
	    }
	  }

	  return bw;
	};

	/**
	 * Invoked when <tt>close</tt> is called. Do not call it directly.
	 */
	InfoBox.prototype.onRemove = function () {

	  if (this.div_) {

	    this.div_.parentNode.removeChild(this.div_);
	    this.div_ = null;
	  }
	};

	/**
	 * Draws the InfoBox based on the current map projection and zoom level.
	 */
	InfoBox.prototype.draw = function () {

	  this.createInfoBoxDiv_();

	  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

	  this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";
	  
	  if (this.alignBottom_) {
	    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
	  } else {
	    this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
	  }

	  if (this.isHidden_) {

	    this.div_.style.visibility = "hidden";

	  } else {

	    this.div_.style.visibility = "visible";
	  }
	};

	/**
	 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
	 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
	 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
	 *  is <tt>open</tt>ed.
	 * @param {InfoBoxOptions} opt_opts
	 */
	InfoBox.prototype.setOptions = function (opt_opts) {
	  if (typeof opt_opts.boxClass !== "undefined") { // Must be first

	    this.boxClass_ = opt_opts.boxClass;
	    this.setBoxStyle_();
	  }
	  if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

	    this.boxStyle_ = opt_opts.boxStyle;
	    this.setBoxStyle_();
	  }
	  if (typeof opt_opts.content !== "undefined") {

	    this.setContent(opt_opts.content);
	  }
	  if (typeof opt_opts.disableAutoPan !== "undefined") {

	    this.disableAutoPan_ = opt_opts.disableAutoPan;
	  }
	  if (typeof opt_opts.maxWidth !== "undefined") {

	    this.maxWidth_ = opt_opts.maxWidth;
	  }
	  if (typeof opt_opts.pixelOffset !== "undefined") {

	    this.pixelOffset_ = opt_opts.pixelOffset;
	  }
	  if (typeof opt_opts.alignBottom !== "undefined") {

	    this.alignBottom_ = opt_opts.alignBottom;
	  }
	  if (typeof opt_opts.position !== "undefined") {

	    this.setPosition(opt_opts.position);
	  }
	  if (typeof opt_opts.zIndex !== "undefined") {

	    this.setZIndex(opt_opts.zIndex);
	  }
	  if (typeof opt_opts.closeBoxMargin !== "undefined") {

	    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
	  }
	  if (typeof opt_opts.closeBoxURL !== "undefined") {

	    this.closeBoxURL_ = opt_opts.closeBoxURL;
	  }
	  if (typeof opt_opts.infoBoxClearance !== "undefined") {

	    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
	  }
	  if (typeof opt_opts.isHidden !== "undefined") {

	    this.isHidden_ = opt_opts.isHidden;
	  }
	  if (typeof opt_opts.visible !== "undefined") {

	    this.isHidden_ = !opt_opts.visible;
	  }
	  if (typeof opt_opts.enableEventPropagation !== "undefined") {

	    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
	  }

	  if (this.div_) {

	    this.draw();
	  }
	};

	/**
	 * Sets the content of the InfoBox.
	 *  The content can be plain text or an HTML DOM node.
	 * @param {string|Node} content
	 */
	InfoBox.prototype.setContent = function (content) {
	  this.content_ = content;

	  if (this.div_) {

	    if (this.closeListener_) {

	      google.maps.event.removeListener(this.closeListener_);
	      this.closeListener_ = null;
	    }

	    // Odd code required to make things work with MSIE.
	    //
	    if (!this.fixedWidthSet_) {

	      this.div_.style.width = "";
	    }

	    if (typeof content.nodeType === "undefined") {
	      this.div_.innerHTML = this.getCloseBoxImg_() + content;
	    } else {
	      this.div_.innerHTML = this.getCloseBoxImg_();
	      this.div_.appendChild(content);
	    }

	    // Perverse code required to make things work with MSIE.
	    // (Ensures the close box does, in fact, float to the right.)
	    //
	    if (!this.fixedWidthSet_) {
	      this.div_.style.width = this.div_.offsetWidth + "px";
	      if (typeof content.nodeType === "undefined") {
	        this.div_.innerHTML = this.getCloseBoxImg_() + content;
	      } else {
	        this.div_.innerHTML = this.getCloseBoxImg_();
	        this.div_.appendChild(content);
	      }
	    }

	    this.addClickHandler_();
	  }

	  /**
	   * This event is fired when the content of the InfoBox changes.
	   * @name InfoBox#content_changed
	   * @event
	   */
	  google.maps.event.trigger(this, "content_changed");
	};

	/**
	 * Sets the geographic location of the InfoBox.
	 * @param {LatLng} latlng
	 */
	InfoBox.prototype.setPosition = function (latlng) {

	  this.position_ = latlng;

	  if (this.div_) {

	    this.draw();
	  }

	  /**
	   * This event is fired when the position of the InfoBox changes.
	   * @name InfoBox#position_changed
	   * @event
	   */
	  google.maps.event.trigger(this, "position_changed");
	};

	/**
	 * Sets the zIndex style for the InfoBox.
	 * @param {number} index
	 */
	InfoBox.prototype.setZIndex = function (index) {

	  this.zIndex_ = index;

	  if (this.div_) {

	    this.div_.style.zIndex = index;
	  }

	  /**
	   * This event is fired when the zIndex of the InfoBox changes.
	   * @name InfoBox#zindex_changed
	   * @event
	   */
	  google.maps.event.trigger(this, "zindex_changed");
	};

	/**
	 * Sets the visibility of the InfoBox.
	 * @param {boolean} isVisible
	 */
	InfoBox.prototype.setVisible = function (isVisible) {

	  this.isHidden_ = !isVisible;
	  if (this.div_) {
	    this.div_.style.visibility = (this.isHidden_ ? "hidden" : "visible");
	  }
	};

	/**
	 * Returns the content of the InfoBox.
	 * @returns {string}
	 */
	InfoBox.prototype.getContent = function () {

	  return this.content_;
	};

	/**
	 * Returns the geographic location of the InfoBox.
	 * @returns {LatLng}
	 */
	InfoBox.prototype.getPosition = function () {

	  return this.position_;
	};

	/**
	 * Returns the zIndex for the InfoBox.
	 * @returns {number}
	 */
	InfoBox.prototype.getZIndex = function () {

	  return this.zIndex_;
	};

	/**
	 * Returns a flag indicating whether the InfoBox is visible.
	 * @returns {boolean}
	 */
	InfoBox.prototype.getVisible = function () {

	  var isVisible;

	  if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
	    isVisible = false;
	  } else {
	    isVisible = !this.isHidden_;
	  }
	  return isVisible;
	};

	/**
	 * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
	 */
	InfoBox.prototype.show = function () {

	  this.isHidden_ = false;
	  if (this.div_) {
	    this.div_.style.visibility = "visible";
	  }
	};

	/**
	 * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
	 */
	InfoBox.prototype.hide = function () {

	  this.isHidden_ = true;
	  if (this.div_) {
	    this.div_.style.visibility = "hidden";
	  }
	};

	/**
	 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
	 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
	 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
	 *  anchor is dragged to a new location, the InfoBox moves as well.
	 * @param {Map|StreetViewPanorama} map
	 * @param {MVCObject} [anchor]
	 */
	InfoBox.prototype.open = function (map, anchor) {

	  var me = this;

	  if (anchor) {

	    this.position_ = anchor.getPosition();
	    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
	      me.setPosition(this.getPosition());
	    });
	  }

	  this.setMap(map);

	  if (this.div_) {

	    this.panBox_();
	  }
	};

	/**
	 * Removes the InfoBox from the map.
	 */
	InfoBox.prototype.close = function () {

	  var i;

	  if (this.closeListener_) {

	    google.maps.event.removeListener(this.closeListener_);
	    this.closeListener_ = null;
	  }

	  if (this.eventListeners_) {
	    
	    for (i = 0; i < this.eventListeners_.length; i++) {

	      google.maps.event.removeListener(this.eventListeners_[i]);
	    }
	    this.eventListeners_ = null;
	  }

	  if (this.moveListener_) {

	    google.maps.event.removeListener(this.moveListener_);
	    this.moveListener_ = null;
	  }

	  if (this.contextListener_) {

	    google.maps.event.removeListener(this.contextListener_);
	    this.contextListener_ = null;
	  }

	  this.setMap(null);
	};


	module.exports = InfoBox;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _canUseDom = __webpack_require__(238);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	var _addonsCreatorsMarkerClustererCreator = __webpack_require__(277);

	var _addonsCreatorsMarkerClustererCreator2 = _interopRequireDefault(_addonsCreatorsMarkerClustererCreator);

	var MarkerClusterer = (function (_Component) {
	  _inherits(MarkerClusterer, _Component);

	  function MarkerClusterer() {
	    _classCallCheck(this, MarkerClusterer);

	    _get(Object.getPrototypeOf(MarkerClusterer.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {};
	  }

	  _createClass(MarkerClusterer, [{
	    key: 'getAverageCenter',

	    // Public APIs
	    // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html#events
	    value: function getAverageCenter() {
	      return this.state.markerClusterer.getAverageCenter();
	    }
	  }, {
	    key: 'getBatchSizeIE',
	    value: function getBatchSizeIE() {
	      return this.state.markerClusterer.getBatchSizeIE();
	    }
	  }, {
	    key: 'getCalculator',
	    value: function getCalculator() {
	      return this.state.markerClusterer.getCalculator();
	    }
	  }, {
	    key: 'getClusterClass',
	    value: function getClusterClass() {
	      return this.state.markerClusterer.getClusterClass();
	    }
	  }, {
	    key: 'getClusters',
	    value: function getClusters() {
	      return this.state.markerClusterer.getClusters();
	    }
	  }, {
	    key: 'getEnableRetinaIcons',
	    value: function getEnableRetinaIcons() {
	      return this.state.markerClusterer.getEnableRetinaIcons();
	    }
	  }, {
	    key: 'getGridSize',
	    value: function getGridSize() {
	      return this.state.markerClusterer.getGridSize();
	    }
	  }, {
	    key: 'getIgnoreHidden',
	    value: function getIgnoreHidden() {
	      return this.state.markerClusterer.getIgnoreHidden();
	    }
	  }, {
	    key: 'getImageExtension',
	    value: function getImageExtension() {
	      return this.state.markerClusterer.getImageExtension();
	    }
	  }, {
	    key: 'getImagePath',
	    value: function getImagePath() {
	      return this.state.markerClusterer.getImagePath();
	    }
	  }, {
	    key: 'getImageSize',
	    value: function getImageSize() {
	      return this.state.markerClusterer.getImageSize();
	    }
	  }, {
	    key: 'getMarkers',
	    value: function getMarkers() {
	      return this.state.markerClusterer.getMarkers();
	    }
	  }, {
	    key: 'getMaxZoom',
	    value: function getMaxZoom() {
	      return this.state.markerClusterer.getMaxZoom();
	    }
	  }, {
	    key: 'getMinimumClusterSize',
	    value: function getMinimumClusterSize() {
	      return this.state.markerClusterer.getMinimumClusterSize();
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return this.state.markerClusterer.getStyles();
	    }
	  }, {
	    key: 'getTitle',
	    value: function getTitle() {
	      return this.state.markerClusterer.getTitle();
	    }
	  }, {
	    key: 'getTotalClusters',
	    value: function getTotalClusters() {
	      return this.state.markerClusterer.getTotalClusters();
	    }
	  }, {
	    key: 'getZoomOnClick',
	    value: function getZoomOnClick() {
	      return this.state.markerClusterer.getZoomOnClick();
	    }

	    // Public APIs - Use this carefully
	  }, {
	    key: 'addMarker',
	    value: function addMarker(marker) {
	      var nodraw = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      return this.state.markerClusterer.addMarker(marker, nodraw);
	    }
	  }, {
	    key: 'addMarkers',
	    value: function addMarkers(markers) {
	      var nodraw = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      return this.state.markerClusterer.addMarkers(markers, nodraw);
	    }
	  }, {
	    key: 'removeMarker',
	    value: function removeMarker(marker) {
	      var nodraw = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      return this.state.markerClusterer.removeMarker(marker, nodraw);
	    }
	  }, {
	    key: 'removeMarkers',
	    value: function removeMarkers(markers) {
	      var nodraw = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      return this.state.markerClusterer.removeMarkers(markers, nodraw);
	    }
	  }, {
	    key: 'clearMarkers',
	    value: function clearMarkers() {
	      return this.state.markerClusterer.clearMarkers();
	    }
	  }, {
	    key: 'fitMapToMarkers',
	    value: function fitMapToMarkers() {
	      return this.state.markerClusterer.fitMapToMarkers();
	    }
	  }, {
	    key: 'repaint',
	    value: function repaint() {
	      return this.state.markerClusterer.repaint();
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      if (!_canUseDom2['default']) {
	        return;
	      }

	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;

	      var markerClustererProps = _objectWithoutProperties(_props, ['mapHolderRef']);

	      var markerClusterer = _addonsCreatorsMarkerClustererCreator2['default']._createMarkerClusterer(mapHolderRef, markerClustererProps);

	      this.setState({ markerClusterer: markerClusterer });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.markerClusterer) {
	        return _react2['default'].createElement(
	          _addonsCreatorsMarkerClustererCreator2['default'],
	          _extends({ markerClusterer: this.state.markerClusterer }, this.props),
	          this.props.children
	        );
	      } else {
	        return _react2['default'].createElement('noscript', null);
	      }
	    }
	  }], [{
	    key: 'propTypes',
	    value: _extends({}, _addonsCreatorsMarkerClustererCreator.markerClusterDefaultPropTypes, _addonsCreatorsMarkerClustererCreator.markerClusterControlledPropTypes, _addonsCreatorsMarkerClustererCreator.markerClusterEventPropTypes),
	    enumerable: true
	  }]);

	  return MarkerClusterer;
	})(_react.Component);

	exports['default'] = MarkerClusterer;
	module.exports = exports['default'];

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _addonsEventListsMarkerClustererEventList = __webpack_require__(278);

	var _addonsEventListsMarkerClustererEventList2 = _interopRequireDefault(_addonsEventListsMarkerClustererEventList);

	var _utilsEventHandlerCreator = __webpack_require__(230);

	var _utilsEventHandlerCreator2 = _interopRequireDefault(_utilsEventHandlerCreator);

	var _utilsDefaultPropsCreator = __webpack_require__(231);

	var _utilsDefaultPropsCreator2 = _interopRequireDefault(_utilsDefaultPropsCreator);

	var _utilsComposeOptions = __webpack_require__(233);

	var _utilsComposeOptions2 = _interopRequireDefault(_utilsComposeOptions);

	var _utilsComponentLifecycleDecorator = __webpack_require__(235);

	var _utilsComponentLifecycleDecorator2 = _interopRequireDefault(_utilsComponentLifecycleDecorator);

	var _creatorsGoogleMapHolder = __webpack_require__(227);

	var _creatorsGoogleMapHolder2 = _interopRequireDefault(_creatorsGoogleMapHolder);

	var markerClustererControlledPropTypes = {
	  // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html
	  averageCenter: _react.PropTypes.bool,
	  batchSizeIE: _react.PropTypes.number,
	  calculator: _react.PropTypes.func,
	  clusterClass: _react.PropTypes.string,
	  enableRetinaIcons: _react.PropTypes.bool,
	  gridSize: _react.PropTypes.number,
	  ignoreHidden: _react.PropTypes.bool,
	  imageExtension: _react.PropTypes.string,
	  imagePath: _react.PropTypes.string,
	  imageSizes: _react.PropTypes.array,
	  maxZoom: _react.PropTypes.number,
	  minimumClusterSize: _react.PropTypes.number,
	  styles: _react.PropTypes.array,
	  title: _react.PropTypes.string,
	  zoomOnClick: _react.PropTypes.bool
	};

	exports.markerClustererControlledPropTypes = markerClustererControlledPropTypes;
	var markerClustererDefaultPropTypes = (0, _utilsDefaultPropsCreator2['default'])(markerClustererControlledPropTypes);

	exports.markerClustererDefaultPropTypes = markerClustererDefaultPropTypes;
	var markerClustererUpdaters = {
	  averageCenter: function averageCenter(_averageCenter, component) {
	    component.getMarkerClusterer().setAverageCenter(_averageCenter);
	  },

	  batchSizeIE: function batchSizeIE(_batchSizeIE, component) {
	    component.getMarkerClusterer().setBatchSizeIE(_batchSizeIE);
	  },

	  calculator: function calculator(_calculator, component) {
	    component.getMarkerClusterer().setCalculator(_calculator);
	  },

	  enableRetinaIcons: function enableRetinaIcons(_enableRetinaIcons, component) {
	    component.getMarkerClusterer().setEnableRetinaIcons(_enableRetinaIcons);
	  },

	  gridSize: function gridSize(_gridSize, component) {
	    component.getMarkerClusterer().setGridSize(_gridSize);
	  },

	  ignoreHidden: function ignoreHidden(_ignoreHidden, component) {
	    component.getMarkerClusterer().setIgnoreHidden(_ignoreHidden);
	  },

	  imageExtension: function imageExtension(_imageExtension, component) {
	    component.getMarkerClusterer().setImageExtension(_imageExtension);
	  },

	  imagePath: function imagePath(_imagePath, component) {
	    component.getMarkerClusterer().setImagePath(_imagePath);
	  },

	  imageSizes: function imageSizes(_imageSizes, component) {
	    component.getMarkerClusterer().setImageSizes(_imageSizes);
	  },

	  maxZoom: function maxZoom(_maxZoom, component) {
	    component.getMarkerClusterer().setMaxZoom(_maxZoom);
	  },

	  minimumClusterSize: function minimumClusterSize(_minimumClusterSize, component) {
	    component.getMarkerClusterer().setMinimumClusterSize(_minimumClusterSize);
	  },

	  styles: function styles(_styles, component) {
	    component.getMarkerClusterer().setStyles(_styles);
	  },

	  title: function title(_title, component) {
	    component.getMarkerClusterer().setTitle(_title);
	  },

	  zoomOnClick: function zoomOnClick(_zoomOnClick, component) {
	    component.getMarkerClusterer().setZoomOnClick(_zoomOnClick);
	  }
	};

	var _eventHandlerCreator = (0, _utilsEventHandlerCreator2['default'])(_addonsEventListsMarkerClustererEventList2['default']);

	var eventPropTypes = _eventHandlerCreator.eventPropTypes;
	var registerEvents = _eventHandlerCreator.registerEvents;
	var markerClustererEventPropTypes = eventPropTypes;

	exports.markerClustererEventPropTypes = markerClustererEventPropTypes;

	var MarkerClustererCreator = (function (_Component) {
	  _inherits(MarkerClustererCreator, _Component);

	  function MarkerClustererCreator() {
	    _classCallCheck(this, _MarkerClustererCreator);

	    _get(Object.getPrototypeOf(_MarkerClustererCreator.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(MarkerClustererCreator, [{
	    key: 'getMarkerClusterer',
	    value: function getMarkerClusterer() {
	      return this.props.markerClusterer;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      this.props.markerClusterer.repaint();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.markerClusterer.setMap(null);
	    }
	  }, {
	    key: 'getAnchor',
	    value: function getAnchor() {
	      return this.props.markerClusterer;
	    }
	  }, {
	    key: 'getAnchorType',
	    value: function getAnchorType() {
	      return 'MarkerClusterer';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var _props = this.props;
	      var mapHolderRef = _props.mapHolderRef;
	      var children = _props.children;

	      if (_react.Children.count(children) > 0) {
	        return _react2['default'].createElement(
	          'div',
	          null,
	          _react.Children.map(children, function (childElement) {
	            if (_react2['default'].isValidElement(childElement)) {
	              return _react2['default'].cloneElement(childElement, {
	                mapHolderRef: mapHolderRef,
	                anchorHolderRef: _this
	              });
	            } else {
	              return childElement;
	            }
	          })
	        );
	      } else {
	        return _react2['default'].createElement('noscript', null);
	      }
	    }
	  }], [{
	    key: '_createMarkerClusterer',
	    value: function _createMarkerClusterer(mapHolderRef, markerClustererProps) {
	      var GoogleMarkerClusterer = __webpack_require__(279);

	      // http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html#events
	      var markerClusterer = new GoogleMarkerClusterer(mapHolderRef.getMap(), [], (0, _utilsComposeOptions2['default'])(markerClustererProps, markerClustererControlledPropTypes));

	      return markerClusterer;
	    }
	  }, {
	    key: 'PropTypes',
	    value: {
	      mapHolderRef: _react.PropTypes.instanceOf(_creatorsGoogleMapHolder2['default']).isRequired,
	      markerClusterer: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  var _MarkerClustererCreator = MarkerClustererCreator;
	  MarkerClustererCreator = (0, _utilsComponentLifecycleDecorator2['default'])({
	    registerEvents: registerEvents,
	    instanceMethodName: 'getMarkerClusterer',
	    updaters: markerClustererUpdaters
	  })(MarkerClustererCreator) || MarkerClustererCreator;
	  return MarkerClustererCreator;
	})(_react.Component);

	exports['default'] = MarkerClustererCreator;

/***/ },
/* 278 */
/***/ function(module, exports) {

	// http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ["click", "clusteringbegin", "clusteringend", "mouseout", "mouseover"];
	module.exports = exports["default"];

/***/ },
/* 279 */
/***/ function(module, exports) {

	/**
	 * @name MarkerClustererPlus for Google Maps V3
	 * @version 2.1.2 [May 28, 2014]
	 * @author Gary Little
	 * @fileoverview
	 * The library creates and manages per-zoom-level clusters for large amounts of markers.
	 * <p>
	 * This is an enhanced V3 implementation of the
	 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
	 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
	 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
	 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
	 * <p>
	 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
	 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>batchSizeIE</code>,
	 *  and <code>calculator</code> properties as well as support for four more events. It also allows
	 *  greater control over the styling of the text that appears on the cluster marker. The
	 *  documentation has been significantly improved and the overall code has been simplified and
	 *  polished. Very large numbers of markers can now be managed without causing Javascript timeout
	 *  errors on Internet Explorer. Note that the name of the <code>clusterclick</code> event has been
	 *  deprecated. The new name is <code>click</code>, so please change your application code now.
	 */

	/**
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/**
	 * @name ClusterIconStyle
	 * @class This class represents the object for values in the <code>styles</code> array passed
	 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
	 *  style the cluster icon is determined by calling the <code>calculator</code> function.
	 *
	 * @property {string} url The URL of the cluster icon image file. Required.
	 * @property {number} height The display height (in pixels) of the cluster icon. Required.
	 * @property {number} width The display width (in pixels) of the cluster icon. Required.
	 * @property {Array} [anchorText] The position (in pixels) from the center of the cluster icon to
	 *  where the text label is to be centered and drawn. The format is <code>[yoffset, xoffset]</code>
	 *  where <code>yoffset</code> increases as you go down from center and <code>xoffset</code>
	 *  increases to the right of center. The default is <code>[0, 0]</code>.
	 * @property {Array} [anchorIcon] The anchor position (in pixels) of the cluster icon. This is the
	 *  spot on the cluster icon that is to be aligned with the cluster position. The format is
	 *  <code>[yoffset, xoffset]</code> where <code>yoffset</code> increases as you go down and
	 *  <code>xoffset</code> increases to the right of the top-left corner of the icon. The default
	 *  anchor position is the center of the cluster icon.
	 * @property {string} [textColor="black"] The color of the label text shown on the
	 *  cluster icon.
	 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
	 *  cluster icon.
	 * @property {string} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
	 *  property for the label text shown on the cluster icon.
	 * @property {string} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
	 *  property for the label text shown on the cluster icon.
	 * @property {string} [fontStyle="normal"] The value of the CSS <code>font-style</code>
	 *  property for the label text shown on the cluster icon.
	 * @property {string} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
	 *  property for the label text shown on the cluster icon.
	 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
	 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
	 *  (the same format as for the CSS <code>background-position</code> property). You must set
	 *  this property appropriately when the image defined by <code>url</code> represents a sprite
	 *  containing multiple images. Note that the position <i>must</i> be specified in px units.
	 */
	/**
	 * @name ClusterIconInfo
	 * @class This class is an object containing general information about a cluster icon. This is
	 *  the object that a <code>calculator</code> function returns.
	 *
	 * @property {string} text The text of the label to be shown on the cluster icon.
	 * @property {number} index The index plus 1 of the element in the <code>styles</code>
	 *  array to be used to style the cluster icon.
	 * @property {string} title The tooltip to display when the mouse moves over the cluster icon.
	 *  If this value is <code>undefined</code> or <code>""</code>, <code>title</code> is set to the
	 *  value of the <code>title</code> property passed to the MarkerClusterer.
	 */
	/**
	 * A cluster icon.
	 *
	 * @constructor
	 * @extends google.maps.OverlayView
	 * @param {Cluster} cluster The cluster with which the icon is to be associated.
	 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
	 *  to use for various cluster sizes.
	 * @private
	 */
	function ClusterIcon(cluster, styles) {
	  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

	  this.cluster_ = cluster;
	  this.className_ = cluster.getMarkerClusterer().getClusterClass();
	  this.styles_ = styles;
	  this.center_ = null;
	  this.div_ = null;
	  this.sums_ = null;
	  this.visible_ = false;

	  this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
	}


	/**
	 * Adds the icon to the DOM.
	 */
	ClusterIcon.prototype.onAdd = function () {
	  var cClusterIcon = this;
	  var cMouseDownInCluster;
	  var cDraggingMapByCluster;

	  this.div_ = document.createElement("div");
	  this.div_.className = this.className_;
	  if (this.visible_) {
	    this.show();
	  }

	  this.getPanes().overlayMouseTarget.appendChild(this.div_);

	  // Fix for Issue 157
	  this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () {
	    cDraggingMapByCluster = cMouseDownInCluster;
	  });

	  google.maps.event.addDomListener(this.div_, "mousedown", function () {
	    cMouseDownInCluster = true;
	    cDraggingMapByCluster = false;
	  });

	  google.maps.event.addDomListener(this.div_, "click", function (e) {
	    cMouseDownInCluster = false;
	    if (!cDraggingMapByCluster) {
	      var theBounds;
	      var mz;
	      var mc = cClusterIcon.cluster_.getMarkerClusterer();
	      /**
	       * This event is fired when a cluster marker is clicked.
	       * @name MarkerClusterer#click
	       * @param {Cluster} c The cluster that was clicked.
	       * @event
	       */
	      google.maps.event.trigger(mc, "click", cClusterIcon.cluster_);
	      google.maps.event.trigger(mc, "clusterclick", cClusterIcon.cluster_); // deprecated name

	      // The default click handler follows. Disable it by setting
	      // the zoomOnClick property to false.
	      if (mc.getZoomOnClick()) {
	        // Zoom into the cluster.
	        mz = mc.getMaxZoom();
	        theBounds = cClusterIcon.cluster_.getBounds();
	        mc.getMap().fitBounds(theBounds);
	        // There is a fix for Issue 170 here:
	        setTimeout(function () {
	          mc.getMap().fitBounds(theBounds);
	          // Don't zoom beyond the max zoom level
	          if (mz !== null && (mc.getMap().getZoom() > mz)) {
	            mc.getMap().setZoom(mz + 1);
	          }
	        }, 100);
	      }

	      // Prevent event propagation to the map:
	      e.cancelBubble = true;
	      if (e.stopPropagation) {
	        e.stopPropagation();
	      }
	    }
	  });

	  google.maps.event.addDomListener(this.div_, "mouseover", function () {
	    var mc = cClusterIcon.cluster_.getMarkerClusterer();
	    /**
	     * This event is fired when the mouse moves over a cluster marker.
	     * @name MarkerClusterer#mouseover
	     * @param {Cluster} c The cluster that the mouse moved over.
	     * @event
	     */
	    google.maps.event.trigger(mc, "mouseover", cClusterIcon.cluster_);
	  });

	  google.maps.event.addDomListener(this.div_, "mouseout", function () {
	    var mc = cClusterIcon.cluster_.getMarkerClusterer();
	    /**
	     * This event is fired when the mouse moves out of a cluster marker.
	     * @name MarkerClusterer#mouseout
	     * @param {Cluster} c The cluster that the mouse moved out of.
	     * @event
	     */
	    google.maps.event.trigger(mc, "mouseout", cClusterIcon.cluster_);
	  });
	};


	/**
	 * Removes the icon from the DOM.
	 */
	ClusterIcon.prototype.onRemove = function () {
	  if (this.div_ && this.div_.parentNode) {
	    this.hide();
	    google.maps.event.removeListener(this.boundsChangedListener_);
	    google.maps.event.clearInstanceListeners(this.div_);
	    this.div_.parentNode.removeChild(this.div_);
	    this.div_ = null;
	  }
	};


	/**
	 * Draws the icon.
	 */
	ClusterIcon.prototype.draw = function () {
	  if (this.visible_) {
	    var pos = this.getPosFromLatLng_(this.center_);
	    this.div_.style.top = pos.y + "px";
	    this.div_.style.left = pos.x + "px";
	  }
	};


	/**
	 * Hides the icon.
	 */
	ClusterIcon.prototype.hide = function () {
	  if (this.div_) {
	    this.div_.style.display = "none";
	  }
	  this.visible_ = false;
	};


	/**
	 * Positions and shows the icon.
	 */
	ClusterIcon.prototype.show = function () {
	  if (this.div_) {
	    var img = "";
	    // NOTE: values must be specified in px units
	    var bp = this.backgroundPosition_.split(" ");
	    var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ""), 10);
	    var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ""), 10);
	    var pos = this.getPosFromLatLng_(this.center_);
	    this.div_.style.cssText = this.createCss(pos);
	    img = "<img src='" + this.url_ + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; ";
	    if (!this.cluster_.getMarkerClusterer().enableRetinaIcons_) {
	      img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width_) + "px, " +
	          ((-1 * spriteV) + this.height_) + "px, " + (-1 * spriteH) + "px);";
	    }
	    img += "'>";
	    this.div_.innerHTML = img + "<div style='" +
	        "position: absolute;" +
	        "top: " + this.anchorText_[0] + "px;" +
	        "left: " + this.anchorText_[1] + "px;" +
	        "color: " + this.textColor_ + ";" +
	        "font-size: " + this.textSize_ + "px;" +
	        "font-family: " + this.fontFamily_ + ";" +
	        "font-weight: " + this.fontWeight_ + ";" +
	        "font-style: " + this.fontStyle_ + ";" +
	        "text-decoration: " + this.textDecoration_ + ";" +
	        "text-align: center;" +
	        "width: " + this.width_ + "px;" +
	        "line-height:" + this.height_ + "px;" +
	        "'>" + this.sums_.text + "</div>";
	    if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
	      this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
	    } else {
	      this.div_.title = this.sums_.title;
	    }
	    this.div_.style.display = "";
	  }
	  this.visible_ = true;
	};


	/**
	 * Sets the icon styles to the appropriate element in the styles array.
	 *
	 * @param {ClusterIconInfo} sums The icon label text and styles index.
	 */
	ClusterIcon.prototype.useStyle = function (sums) {
	  this.sums_ = sums;
	  var index = Math.max(0, sums.index - 1);
	  index = Math.min(this.styles_.length - 1, index);
	  var style = this.styles_[index];
	  this.url_ = style.url;
	  this.height_ = style.height;
	  this.width_ = style.width;
	  this.anchorText_ = style.anchorText || [0, 0];
	  this.anchorIcon_ = style.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)];
	  this.textColor_ = style.textColor || "black";
	  this.textSize_ = style.textSize || 11;
	  this.textDecoration_ = style.textDecoration || "none";
	  this.fontWeight_ = style.fontWeight || "bold";
	  this.fontStyle_ = style.fontStyle || "normal";
	  this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
	  this.backgroundPosition_ = style.backgroundPosition || "0 0";
	};


	/**
	 * Sets the position at which to center the icon.
	 *
	 * @param {google.maps.LatLng} center The latlng to set as the center.
	 */
	ClusterIcon.prototype.setCenter = function (center) {
	  this.center_ = center;
	};


	/**
	 * Creates the cssText style parameter based on the position of the icon.
	 *
	 * @param {google.maps.Point} pos The position of the icon.
	 * @return {string} The CSS style text.
	 */
	ClusterIcon.prototype.createCss = function (pos) {
	  var style = [];
	  style.push("cursor: pointer;");
	  style.push("position: absolute; top: " + pos.y + "px; left: " + pos.x + "px;");
	  style.push("width: " + this.width_ + "px; height: " + this.height_ + "px;");
	  return style.join("");
	};


	/**
	 * Returns the position at which to place the DIV depending on the latlng.
	 *
	 * @param {google.maps.LatLng} latlng The position in latlng.
	 * @return {google.maps.Point} The position in pixels.
	 */
	ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
	  var pos = this.getProjection().fromLatLngToDivPixel(latlng);
	  pos.x -= this.anchorIcon_[1];
	  pos.y -= this.anchorIcon_[0];
	  pos.x = parseInt(pos.x, 10);
	  pos.y = parseInt(pos.y, 10);
	  return pos;
	};


	/**
	 * Creates a single cluster that manages a group of proximate markers.
	 *  Used internally, do not call this constructor directly.
	 * @constructor
	 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
	 *  cluster is associated.
	 */
	function Cluster(mc) {
	  this.markerClusterer_ = mc;
	  this.map_ = mc.getMap();
	  this.gridSize_ = mc.getGridSize();
	  this.minClusterSize_ = mc.getMinimumClusterSize();
	  this.averageCenter_ = mc.getAverageCenter();
	  this.markers_ = [];
	  this.center_ = null;
	  this.bounds_ = null;
	  this.clusterIcon_ = new ClusterIcon(this, mc.getStyles());
	}


	/**
	 * Returns the number of markers managed by the cluster. You can call this from
	 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
	 * for the <code>MarkerClusterer</code> object.
	 *
	 * @return {number} The number of markers in the cluster.
	 */
	Cluster.prototype.getSize = function () {
	  return this.markers_.length;
	};


	/**
	 * Returns the array of markers managed by the cluster. You can call this from
	 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
	 * for the <code>MarkerClusterer</code> object.
	 *
	 * @return {Array} The array of markers in the cluster.
	 */
	Cluster.prototype.getMarkers = function () {
	  return this.markers_;
	};


	/**
	 * Returns the center of the cluster. You can call this from
	 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
	 * for the <code>MarkerClusterer</code> object.
	 *
	 * @return {google.maps.LatLng} The center of the cluster.
	 */
	Cluster.prototype.getCenter = function () {
	  return this.center_;
	};


	/**
	 * Returns the map with which the cluster is associated.
	 *
	 * @return {google.maps.Map} The map.
	 * @ignore
	 */
	Cluster.prototype.getMap = function () {
	  return this.map_;
	};


	/**
	 * Returns the <code>MarkerClusterer</code> object with which the cluster is associated.
	 *
	 * @return {MarkerClusterer} The associated marker clusterer.
	 * @ignore
	 */
	Cluster.prototype.getMarkerClusterer = function () {
	  return this.markerClusterer_;
	};


	/**
	 * Returns the bounds of the cluster.
	 *
	 * @return {google.maps.LatLngBounds} the cluster bounds.
	 * @ignore
	 */
	Cluster.prototype.getBounds = function () {
	  var i;
	  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
	  var markers = this.getMarkers();
	  for (i = 0; i < markers.length; i++) {
	    bounds.extend(markers[i].getPosition());
	  }
	  return bounds;
	};


	/**
	 * Removes the cluster from the map.
	 *
	 * @ignore
	 */
	Cluster.prototype.remove = function () {
	  this.clusterIcon_.setMap(null);
	  this.markers_ = [];
	  delete this.markers_;
	};


	/**
	 * Adds a marker to the cluster.
	 *
	 * @param {google.maps.Marker} marker The marker to be added.
	 * @return {boolean} True if the marker was added.
	 * @ignore
	 */
	Cluster.prototype.addMarker = function (marker) {
	  var i;
	  var mCount;
	  var mz;

	  if (this.isMarkerAlreadyAdded_(marker)) {
	    return false;
	  }

	  if (!this.center_) {
	    this.center_ = marker.getPosition();
	    this.calculateBounds_();
	  } else {
	    if (this.averageCenter_) {
	      var l = this.markers_.length + 1;
	      var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
	      var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
	      this.center_ = new google.maps.LatLng(lat, lng);
	      this.calculateBounds_();
	    }
	  }

	  marker.isAdded = true;
	  this.markers_.push(marker);

	  mCount = this.markers_.length;
	  mz = this.markerClusterer_.getMaxZoom();
	  if (mz !== null && this.map_.getZoom() > mz) {
	    // Zoomed in past max zoom, so show the marker.
	    if (marker.getMap() !== this.map_) {
	      marker.setMap(this.map_);
	    }
	  } else if (mCount < this.minClusterSize_) {
	    // Min cluster size not reached so show the marker.
	    if (marker.getMap() !== this.map_) {
	      marker.setMap(this.map_);
	    }
	  } else if (mCount === this.minClusterSize_) {
	    // Hide the markers that were showing.
	    for (i = 0; i < mCount; i++) {
	      this.markers_[i].setMap(null);
	    }
	  } else {
	    marker.setMap(null);
	  }

	  this.updateIcon_();
	  return true;
	};


	/**
	 * Determines if a marker lies within the cluster's bounds.
	 *
	 * @param {google.maps.Marker} marker The marker to check.
	 * @return {boolean} True if the marker lies in the bounds.
	 * @ignore
	 */
	Cluster.prototype.isMarkerInClusterBounds = function (marker) {
	  return this.bounds_.contains(marker.getPosition());
	};


	/**
	 * Calculates the extended bounds of the cluster with the grid.
	 */
	Cluster.prototype.calculateBounds_ = function () {
	  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
	  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
	};


	/**
	 * Updates the cluster icon.
	 */
	Cluster.prototype.updateIcon_ = function () {
	  var mCount = this.markers_.length;
	  var mz = this.markerClusterer_.getMaxZoom();

	  if (mz !== null && this.map_.getZoom() > mz) {
	    this.clusterIcon_.hide();
	    return;
	  }

	  if (mCount < this.minClusterSize_) {
	    // Min cluster size not yet reached.
	    this.clusterIcon_.hide();
	    return;
	  }

	  var numStyles = this.markerClusterer_.getStyles().length;
	  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
	  this.clusterIcon_.setCenter(this.center_);
	  this.clusterIcon_.useStyle(sums);
	  this.clusterIcon_.show();
	};


	/**
	 * Determines if a marker has already been added to the cluster.
	 *
	 * @param {google.maps.Marker} marker The marker to check.
	 * @return {boolean} True if the marker has already been added.
	 */
	Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
	  var i;
	  if (this.markers_.indexOf) {
	    return this.markers_.indexOf(marker) !== -1;
	  } else {
	    for (i = 0; i < this.markers_.length; i++) {
	      if (marker === this.markers_[i]) {
	        return true;
	      }
	    }
	  }
	  return false;
	};


	/**
	 * @name MarkerClustererOptions
	 * @class This class represents the optional parameter passed to
	 *  the {@link MarkerClusterer} constructor.
	 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
	 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
	 *  <code>null</code> if clustering is to be enabled at all zoom levels.
	 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
	 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
	 *  for the <code>click</code> event and it deals with zooming on its own.
	 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
	 *  the average position of all markers in the cluster. If set to <code>false</code>, the
	 *  cluster marker is positioned at the location of the first marker added to the cluster.
	 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
	 *  before the markers are hidden and a cluster marker appears.
	 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
	 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
	 *  in the marker count that appears on a cluster marker (this count is the value of the
	 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
	 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
	 *  sure to also call <code>MarkerClusterer.repaint()</code>.
	 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
	 *  marker. (Alternatively, you can use a custom <code>calculator</code> function to specify a
	 *  different tooltip for each cluster marker.)
	 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
	 *  the text to be displayed on a cluster marker and the index indicating which style to use
	 *  for the cluster marker. The input parameters for the function are (1) the array of markers
	 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
	 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
	 *  <code>text</code> property which is the number of markers in the cluster and an
	 *  <code>index</code> property which is one higher than the lowest integer such that
	 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
	 *  array, whichever is less. The <code>styles</code> array element used has an index of
	 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
	 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
	 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
	 *  array is <code>2</code>. A <code>calculator</code> may also return a <code>title</code>
	 *  property that contains the text of the tooltip to be used for the cluster marker. If
	 *   <code>title</code> is not defined, the tooltip is set to the value of the <code>title</code>
	 *   property for the MarkerClusterer.
	 * @property {string} [clusterClass="cluster"] The name of the CSS class defining general styles
	 *  for the cluster markers. Use this class to define CSS styles that are not set up by the code
	 *  that processes the <code>styles</code> array.
	 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
	 *  of the cluster markers to be used. The element to be used to style a given cluster marker
	 *  is determined by the function defined by the <code>calculator</code> property.
	 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
	 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
	 *  <code>imageSizes</code>.
	 * @property {boolean} [enableRetinaIcons=false] Whether to allow the use of cluster icons that
	 * have sizes that are some multiple (typically double) of their actual display size. Icons such
	 * as these look better when viewed on high-resolution monitors such as Apple's Retina displays.
	 * Note: if this property is <code>true</code>, sprites cannot be used as cluster icons.
	 * @property {number} [batchSize=MarkerClusterer.BATCH_SIZE] Set this property to the
	 *  number of markers to be processed in a single batch when using a browser other than
	 *  Internet Explorer (for Internet Explorer, use the batchSizeIE property instead).
	 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
	 *  being used, markers are processed in several batches with a small delay inserted between
	 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
	 *  number of markers to be processed in a single batch; select as high a number as you can
	 *  without causing a timeout error in the browser. This number might need to be as low as 100
	 *  if 15,000 markers are being managed, for example.
	 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
	 *  The full URL of the root name of the group of image files to use for cluster icons.
	 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
	 *  where n is the image file number (1, 2, etc.).
	 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
	 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
	 *  <code>"jpg"</code>).
	 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
	 *  An array of numbers containing the widths of the group of
	 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
	 *  (The images are assumed to be square.)
	 */
	/**
	 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
	 * @constructor
	 * @extends google.maps.OverlayView
	 * @param {google.maps.Map} map The Google map to attach to.
	 * @param {Array.<google.maps.Marker>} [opt_markers] The markers to be added to the cluster.
	 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
	 */
	function MarkerClusterer(map, opt_markers, opt_options) {
	  // MarkerClusterer implements google.maps.OverlayView interface. We use the
	  // extend function to extend MarkerClusterer with google.maps.OverlayView
	  // because it might not always be available when the code is defined so we
	  // look for it at the last possible moment. If it doesn't exist now then
	  // there is no point going ahead :)
	  this.extend(MarkerClusterer, google.maps.OverlayView);

	  opt_markers = opt_markers || [];
	  opt_options = opt_options || {};

	  this.markers_ = [];
	  this.clusters_ = [];
	  this.listeners_ = [];
	  this.activeMap_ = null;
	  this.ready_ = false;

	  this.gridSize_ = opt_options.gridSize || 60;
	  this.minClusterSize_ = opt_options.minimumClusterSize || 2;
	  this.maxZoom_ = opt_options.maxZoom || null;
	  this.styles_ = opt_options.styles || [];
	  this.title_ = opt_options.title || "";
	  this.zoomOnClick_ = true;
	  if (opt_options.zoomOnClick !== undefined) {
	    this.zoomOnClick_ = opt_options.zoomOnClick;
	  }
	  this.averageCenter_ = false;
	  if (opt_options.averageCenter !== undefined) {
	    this.averageCenter_ = opt_options.averageCenter;
	  }
	  this.ignoreHidden_ = false;
	  if (opt_options.ignoreHidden !== undefined) {
	    this.ignoreHidden_ = opt_options.ignoreHidden;
	  }
	  this.enableRetinaIcons_ = false;
	  if (opt_options.enableRetinaIcons !== undefined) {
	    this.enableRetinaIcons_ = opt_options.enableRetinaIcons;
	  }
	  this.imagePath_ = opt_options.imagePath || MarkerClusterer.IMAGE_PATH;
	  this.imageExtension_ = opt_options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
	  this.imageSizes_ = opt_options.imageSizes || MarkerClusterer.IMAGE_SIZES;
	  this.calculator_ = opt_options.calculator || MarkerClusterer.CALCULATOR;
	  this.batchSize_ = opt_options.batchSize || MarkerClusterer.BATCH_SIZE;
	  this.batchSizeIE_ = opt_options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;
	  this.clusterClass_ = opt_options.clusterClass || "cluster";

	  if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
	    // Try to avoid IE timeout when processing a huge number of markers:
	    this.batchSize_ = this.batchSizeIE_;
	  }

	  this.setupStyles_();

	  this.addMarkers(opt_markers, true);
	  this.setMap(map); // Note: this causes onAdd to be called
	}


	/**
	 * Implementation of the onAdd interface method.
	 * @ignore
	 */
	MarkerClusterer.prototype.onAdd = function () {
	  var cMarkerClusterer = this;

	  this.activeMap_ = this.getMap();
	  this.ready_ = true;

	  this.repaint();

	  // Add the map event listeners
	  this.listeners_ = [
	    google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
	      cMarkerClusterer.resetViewport_(false);
	      // Workaround for this Google bug: when map is at level 0 and "-" of
	      // zoom slider is clicked, a "zoom_changed" event is fired even though
	      // the map doesn't zoom out any further. In this situation, no "idle"
	      // event is triggered so the cluster markers that have been removed
	      // do not get redrawn. Same goes for a zoom in at maxZoom.
	      if (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) {
	        google.maps.event.trigger(this, "idle");
	      }
	    }),
	    google.maps.event.addListener(this.getMap(), "idle", function () {
	      cMarkerClusterer.redraw_();
	    })
	  ];
	};


	/**
	 * Implementation of the onRemove interface method.
	 * Removes map event listeners and all cluster icons from the DOM.
	 * All managed markers are also put back on the map.
	 * @ignore
	 */
	MarkerClusterer.prototype.onRemove = function () {
	  var i;

	  // Put all the managed markers back on the map:
	  for (i = 0; i < this.markers_.length; i++) {
	    if (this.markers_[i].getMap() !== this.activeMap_) {
	      this.markers_[i].setMap(this.activeMap_);
	    }
	  }

	  // Remove all clusters:
	  for (i = 0; i < this.clusters_.length; i++) {
	    this.clusters_[i].remove();
	  }
	  this.clusters_ = [];

	  // Remove map event listeners:
	  for (i = 0; i < this.listeners_.length; i++) {
	    google.maps.event.removeListener(this.listeners_[i]);
	  }
	  this.listeners_ = [];

	  this.activeMap_ = null;
	  this.ready_ = false;
	};


	/**
	 * Implementation of the draw interface method.
	 * @ignore
	 */
	MarkerClusterer.prototype.draw = function () {};


	/**
	 * Sets up the styles object.
	 */
	MarkerClusterer.prototype.setupStyles_ = function () {
	  var i, size;
	  if (this.styles_.length > 0) {
	    return;
	  }

	  for (i = 0; i < this.imageSizes_.length; i++) {
	    size = this.imageSizes_[i];
	    this.styles_.push({
	      url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
	      height: size,
	      width: size
	    });
	  }
	};


	/**
	 *  Fits the map to the bounds of the markers managed by the clusterer.
	 */
	MarkerClusterer.prototype.fitMapToMarkers = function () {
	  var i;
	  var markers = this.getMarkers();
	  var bounds = new google.maps.LatLngBounds();
	  for (i = 0; i < markers.length; i++) {
	    bounds.extend(markers[i].getPosition());
	  }

	  this.getMap().fitBounds(bounds);
	};


	/**
	 * Returns the value of the <code>gridSize</code> property.
	 *
	 * @return {number} The grid size.
	 */
	MarkerClusterer.prototype.getGridSize = function () {
	  return this.gridSize_;
	};


	/**
	 * Sets the value of the <code>gridSize</code> property.
	 *
	 * @param {number} gridSize The grid size.
	 */
	MarkerClusterer.prototype.setGridSize = function (gridSize) {
	  this.gridSize_ = gridSize;
	};


	/**
	 * Returns the value of the <code>minimumClusterSize</code> property.
	 *
	 * @return {number} The minimum cluster size.
	 */
	MarkerClusterer.prototype.getMinimumClusterSize = function () {
	  return this.minClusterSize_;
	};

	/**
	 * Sets the value of the <code>minimumClusterSize</code> property.
	 *
	 * @param {number} minimumClusterSize The minimum cluster size.
	 */
	MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
	  this.minClusterSize_ = minimumClusterSize;
	};


	/**
	 *  Returns the value of the <code>maxZoom</code> property.
	 *
	 *  @return {number} The maximum zoom level.
	 */
	MarkerClusterer.prototype.getMaxZoom = function () {
	  return this.maxZoom_;
	};


	/**
	 *  Sets the value of the <code>maxZoom</code> property.
	 *
	 *  @param {number} maxZoom The maximum zoom level.
	 */
	MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
	  this.maxZoom_ = maxZoom;
	};


	/**
	 *  Returns the value of the <code>styles</code> property.
	 *
	 *  @return {Array} The array of styles defining the cluster markers to be used.
	 */
	MarkerClusterer.prototype.getStyles = function () {
	  return this.styles_;
	};


	/**
	 *  Sets the value of the <code>styles</code> property.
	 *
	 *  @param {Array.<ClusterIconStyle>} styles The array of styles to use.
	 */
	MarkerClusterer.prototype.setStyles = function (styles) {
	  this.styles_ = styles;
	};


	/**
	 * Returns the value of the <code>title</code> property.
	 *
	 * @return {string} The content of the title text.
	 */
	MarkerClusterer.prototype.getTitle = function () {
	  return this.title_;
	};


	/**
	 *  Sets the value of the <code>title</code> property.
	 *
	 *  @param {string} title The value of the title property.
	 */
	MarkerClusterer.prototype.setTitle = function (title) {
	  this.title_ = title;
	};


	/**
	 * Returns the value of the <code>zoomOnClick</code> property.
	 *
	 * @return {boolean} True if zoomOnClick property is set.
	 */
	MarkerClusterer.prototype.getZoomOnClick = function () {
	  return this.zoomOnClick_;
	};


	/**
	 *  Sets the value of the <code>zoomOnClick</code> property.
	 *
	 *  @param {boolean} zoomOnClick The value of the zoomOnClick property.
	 */
	MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
	  this.zoomOnClick_ = zoomOnClick;
	};


	/**
	 * Returns the value of the <code>averageCenter</code> property.
	 *
	 * @return {boolean} True if averageCenter property is set.
	 */
	MarkerClusterer.prototype.getAverageCenter = function () {
	  return this.averageCenter_;
	};


	/**
	 *  Sets the value of the <code>averageCenter</code> property.
	 *
	 *  @param {boolean} averageCenter The value of the averageCenter property.
	 */
	MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
	  this.averageCenter_ = averageCenter;
	};


	/**
	 * Returns the value of the <code>ignoreHidden</code> property.
	 *
	 * @return {boolean} True if ignoreHidden property is set.
	 */
	MarkerClusterer.prototype.getIgnoreHidden = function () {
	  return this.ignoreHidden_;
	};


	/**
	 *  Sets the value of the <code>ignoreHidden</code> property.
	 *
	 *  @param {boolean} ignoreHidden The value of the ignoreHidden property.
	 */
	MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
	  this.ignoreHidden_ = ignoreHidden;
	};


	/**
	 * Returns the value of the <code>enableRetinaIcons</code> property.
	 *
	 * @return {boolean} True if enableRetinaIcons property is set.
	 */
	MarkerClusterer.prototype.getEnableRetinaIcons = function () {
	  return this.enableRetinaIcons_;
	};


	/**
	 *  Sets the value of the <code>enableRetinaIcons</code> property.
	 *
	 *  @param {boolean} enableRetinaIcons The value of the enableRetinaIcons property.
	 */
	MarkerClusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
	  this.enableRetinaIcons_ = enableRetinaIcons;
	};


	/**
	 * Returns the value of the <code>imageExtension</code> property.
	 *
	 * @return {string} The value of the imageExtension property.
	 */
	MarkerClusterer.prototype.getImageExtension = function () {
	  return this.imageExtension_;
	};


	/**
	 *  Sets the value of the <code>imageExtension</code> property.
	 *
	 *  @param {string} imageExtension The value of the imageExtension property.
	 */
	MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
	  this.imageExtension_ = imageExtension;
	};


	/**
	 * Returns the value of the <code>imagePath</code> property.
	 *
	 * @return {string} The value of the imagePath property.
	 */
	MarkerClusterer.prototype.getImagePath = function () {
	  return this.imagePath_;
	};


	/**
	 *  Sets the value of the <code>imagePath</code> property.
	 *
	 *  @param {string} imagePath The value of the imagePath property.
	 */
	MarkerClusterer.prototype.setImagePath = function (imagePath) {
	  this.imagePath_ = imagePath;
	};


	/**
	 * Returns the value of the <code>imageSizes</code> property.
	 *
	 * @return {Array} The value of the imageSizes property.
	 */
	MarkerClusterer.prototype.getImageSizes = function () {
	  return this.imageSizes_;
	};


	/**
	 *  Sets the value of the <code>imageSizes</code> property.
	 *
	 *  @param {Array} imageSizes The value of the imageSizes property.
	 */
	MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
	  this.imageSizes_ = imageSizes;
	};


	/**
	 * Returns the value of the <code>calculator</code> property.
	 *
	 * @return {function} the value of the calculator property.
	 */
	MarkerClusterer.prototype.getCalculator = function () {
	  return this.calculator_;
	};


	/**
	 * Sets the value of the <code>calculator</code> property.
	 *
	 * @param {function(Array.<google.maps.Marker>, number)} calculator The value
	 *  of the calculator property.
	 */
	MarkerClusterer.prototype.setCalculator = function (calculator) {
	  this.calculator_ = calculator;
	};


	/**
	 * Returns the value of the <code>batchSizeIE</code> property.
	 *
	 * @return {number} the value of the batchSizeIE property.
	 */
	MarkerClusterer.prototype.getBatchSizeIE = function () {
	  return this.batchSizeIE_;
	};


	/**
	 * Sets the value of the <code>batchSizeIE</code> property.
	 *
	 *  @param {number} batchSizeIE The value of the batchSizeIE property.
	 */
	MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
	  this.batchSizeIE_ = batchSizeIE;
	};


	/**
	 * Returns the value of the <code>clusterClass</code> property.
	 *
	 * @return {string} the value of the clusterClass property.
	 */
	MarkerClusterer.prototype.getClusterClass = function () {
	  return this.clusterClass_;
	};


	/**
	 * Sets the value of the <code>clusterClass</code> property.
	 *
	 *  @param {string} clusterClass The value of the clusterClass property.
	 */
	MarkerClusterer.prototype.setClusterClass = function (clusterClass) {
	  this.clusterClass_ = clusterClass;
	};


	/**
	 *  Returns the array of markers managed by the clusterer.
	 *
	 *  @return {Array} The array of markers managed by the clusterer.
	 */
	MarkerClusterer.prototype.getMarkers = function () {
	  return this.markers_;
	};


	/**
	 *  Returns the number of markers managed by the clusterer.
	 *
	 *  @return {number} The number of markers.
	 */
	MarkerClusterer.prototype.getTotalMarkers = function () {
	  return this.markers_.length;
	};


	/**
	 * Returns the current array of clusters formed by the clusterer.
	 *
	 * @return {Array} The array of clusters formed by the clusterer.
	 */
	MarkerClusterer.prototype.getClusters = function () {
	  return this.clusters_;
	};


	/**
	 * Returns the number of clusters formed by the clusterer.
	 *
	 * @return {number} The number of clusters formed by the clusterer.
	 */
	MarkerClusterer.prototype.getTotalClusters = function () {
	  return this.clusters_.length;
	};


	/**
	 * Adds a marker to the clusterer. The clusters are redrawn unless
	 *  <code>opt_nodraw</code> is set to <code>true</code>.
	 *
	 * @param {google.maps.Marker} marker The marker to add.
	 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
	 */
	MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
	  this.pushMarkerTo_(marker);
	  if (!opt_nodraw) {
	    this.redraw_();
	  }
	};


	/**
	 * Adds an array of markers to the clusterer. The clusters are redrawn unless
	 *  <code>opt_nodraw</code> is set to <code>true</code>.
	 *
	 * @param {Array.<google.maps.Marker>} markers The markers to add.
	 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
	 */
	MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
	  var key;
	  for (key in markers) {
	    if (markers.hasOwnProperty(key)) {
	      this.pushMarkerTo_(markers[key]);
	    }
	  }  
	  if (!opt_nodraw) {
	    this.redraw_();
	  }
	};


	/**
	 * Pushes a marker to the clusterer.
	 *
	 * @param {google.maps.Marker} marker The marker to add.
	 */
	MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
	  // If the marker is draggable add a listener so we can update the clusters on the dragend:
	  if (marker.getDraggable()) {
	    var cMarkerClusterer = this;
	    google.maps.event.addListener(marker, "dragend", function () {
	      if (cMarkerClusterer.ready_) {
	        this.isAdded = false;
	        cMarkerClusterer.repaint();
	      }
	    });
	  }
	  marker.isAdded = false;
	  this.markers_.push(marker);
	};


	/**
	 * Removes a marker from the cluster.  The clusters are redrawn unless
	 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if the
	 *  marker was removed from the clusterer.
	 *
	 * @param {google.maps.Marker} marker The marker to remove.
	 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
	 * @return {boolean} True if the marker was removed from the clusterer.
	 */
	MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
	  var removed = this.removeMarker_(marker);

	  if (!opt_nodraw && removed) {
	    this.repaint();
	  }

	  return removed;
	};


	/**
	 * Removes an array of markers from the cluster. The clusters are redrawn unless
	 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if markers
	 *  were removed from the clusterer.
	 *
	 * @param {Array.<google.maps.Marker>} markers The markers to remove.
	 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
	 * @return {boolean} True if markers were removed from the clusterer.
	 */
	MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
	  var i, r;
	  var removed = false;

	  for (i = 0; i < markers.length; i++) {
	    r = this.removeMarker_(markers[i]);
	    removed = removed || r;
	  }

	  if (!opt_nodraw && removed) {
	    this.repaint();
	  }

	  return removed;
	};


	/**
	 * Removes a marker and returns true if removed, false if not.
	 *
	 * @param {google.maps.Marker} marker The marker to remove
	 * @return {boolean} Whether the marker was removed or not
	 */
	MarkerClusterer.prototype.removeMarker_ = function (marker) {
	  var i;
	  var index = -1;
	  if (this.markers_.indexOf) {
	    index = this.markers_.indexOf(marker);
	  } else {
	    for (i = 0; i < this.markers_.length; i++) {
	      if (marker === this.markers_[i]) {
	        index = i;
	        break;
	      }
	    }
	  }

	  if (index === -1) {
	    // Marker is not in our list of markers, so do nothing:
	    return false;
	  }

	  marker.setMap(null);
	  this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
	  return true;
	};


	/**
	 * Removes all clusters and markers from the map and also removes all markers
	 *  managed by the clusterer.
	 */
	MarkerClusterer.prototype.clearMarkers = function () {
	  this.resetViewport_(true);
	  this.markers_ = [];
	};


	/**
	 * Recalculates and redraws all the marker clusters from scratch.
	 *  Call this after changing any properties.
	 */
	MarkerClusterer.prototype.repaint = function () {
	  var oldClusters = this.clusters_.slice();
	  this.clusters_ = [];
	  this.resetViewport_(false);
	  this.redraw_();

	  // Remove the old clusters.
	  // Do it in a timeout to prevent blinking effect.
	  setTimeout(function () {
	    var i;
	    for (i = 0; i < oldClusters.length; i++) {
	      oldClusters[i].remove();
	    }
	  }, 0);
	};


	/**
	 * Returns the current bounds extended by the grid size.
	 *
	 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
	 * @return {google.maps.LatLngBounds} The extended bounds.
	 * @ignore
	 */
	MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
	  var projection = this.getProjection();

	  // Turn the bounds into latlng.
	  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
	      bounds.getNorthEast().lng());
	  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
	      bounds.getSouthWest().lng());

	  // Convert the points to pixels and the extend out by the grid size.
	  var trPix = projection.fromLatLngToDivPixel(tr);
	  trPix.x += this.gridSize_;
	  trPix.y -= this.gridSize_;

	  var blPix = projection.fromLatLngToDivPixel(bl);
	  blPix.x -= this.gridSize_;
	  blPix.y += this.gridSize_;

	  // Convert the pixel points back to LatLng
	  var ne = projection.fromDivPixelToLatLng(trPix);
	  var sw = projection.fromDivPixelToLatLng(blPix);

	  // Extend the bounds to contain the new bounds.
	  bounds.extend(ne);
	  bounds.extend(sw);

	  return bounds;
	};


	/**
	 * Redraws all the clusters.
	 */
	MarkerClusterer.prototype.redraw_ = function () {
	  this.createClusters_(0);
	};


	/**
	 * Removes all clusters from the map. The markers are also removed from the map
	 *  if <code>opt_hide</code> is set to <code>true</code>.
	 *
	 * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
	 *  from the map.
	 */
	MarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
	  var i, marker;
	  // Remove all the clusters
	  for (i = 0; i < this.clusters_.length; i++) {
	    this.clusters_[i].remove();
	  }
	  this.clusters_ = [];

	  // Reset the markers to not be added and to be removed from the map.
	  for (i = 0; i < this.markers_.length; i++) {
	    marker = this.markers_[i];
	    marker.isAdded = false;
	    if (opt_hide) {
	      marker.setMap(null);
	    }
	  }
	};


	/**
	 * Calculates the distance between two latlng locations in km.
	 *
	 * @param {google.maps.LatLng} p1 The first lat lng point.
	 * @param {google.maps.LatLng} p2 The second lat lng point.
	 * @return {number} The distance between the two points in km.
	 * @see http://www.movable-type.co.uk/scripts/latlong.html
	*/
	MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
	  var R = 6371; // Radius of the Earth in km
	  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
	  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
	    Math.sin(dLon / 2) * Math.sin(dLon / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d;
	};


	/**
	 * Determines if a marker is contained in a bounds.
	 *
	 * @param {google.maps.Marker} marker The marker to check.
	 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
	 * @return {boolean} True if the marker is in the bounds.
	 */
	MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
	  return bounds.contains(marker.getPosition());
	};


	/**
	 * Adds a marker to a cluster, or creates a new cluster.
	 *
	 * @param {google.maps.Marker} marker The marker to add.
	 */
	MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
	  var i, d, cluster, center;
	  var distance = 40000; // Some large number
	  var clusterToAddTo = null;
	  for (i = 0; i < this.clusters_.length; i++) {
	    cluster = this.clusters_[i];
	    center = cluster.getCenter();
	    if (center) {
	      d = this.distanceBetweenPoints_(center, marker.getPosition());
	      if (d < distance) {
	        distance = d;
	        clusterToAddTo = cluster;
	      }
	    }
	  }

	  if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
	    clusterToAddTo.addMarker(marker);
	  } else {
	    cluster = new Cluster(this);
	    cluster.addMarker(marker);
	    this.clusters_.push(cluster);
	  }
	};


	/**
	 * Creates the clusters. This is done in batches to avoid timeout errors
	 *  in some browsers when there is a huge number of markers.
	 *
	 * @param {number} iFirst The index of the first marker in the batch of
	 *  markers to be added to clusters.
	 */
	MarkerClusterer.prototype.createClusters_ = function (iFirst) {
	  var i, marker;
	  var mapBounds;
	  var cMarkerClusterer = this;
	  if (!this.ready_) {
	    return;
	  }

	  // Cancel previous batch processing if we're working on the first batch:
	  if (iFirst === 0) {
	    /**
	     * This event is fired when the <code>MarkerClusterer</code> begins
	     *  clustering markers.
	     * @name MarkerClusterer#clusteringbegin
	     * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
	     * @event
	     */
	    google.maps.event.trigger(this, "clusteringbegin", this);

	    if (typeof this.timerRefStatic !== "undefined") {
	      clearTimeout(this.timerRefStatic);
	      delete this.timerRefStatic;
	    }
	  }

	  // Get our current map view bounds.
	  // Create a new bounds object so we don't affect the map.
	  //
	  // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
	  if (this.getMap().getZoom() > 3) {
	    mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),
	      this.getMap().getBounds().getNorthEast());
	  } else {
	    mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
	  }
	  var bounds = this.getExtendedBounds(mapBounds);

	  var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

	  for (i = iFirst; i < iLast; i++) {
	    marker = this.markers_[i];
	    if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
	      if (!this.ignoreHidden_ || (this.ignoreHidden_ && marker.getVisible())) {
	        this.addToClosestCluster_(marker);
	      }
	    }
	  }

	  if (iLast < this.markers_.length) {
	    this.timerRefStatic = setTimeout(function () {
	      cMarkerClusterer.createClusters_(iLast);
	    }, 0);
	  } else {
	    delete this.timerRefStatic;

	    /**
	     * This event is fired when the <code>MarkerClusterer</code> stops
	     *  clustering markers.
	     * @name MarkerClusterer#clusteringend
	     * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
	     * @event
	     */
	    google.maps.event.trigger(this, "clusteringend", this);
	  }
	};


	/**
	 * Extends an object's prototype by another's.
	 *
	 * @param {Object} obj1 The object to be extended.
	 * @param {Object} obj2 The object to extend with.
	 * @return {Object} The new extended object.
	 * @ignore
	 */
	MarkerClusterer.prototype.extend = function (obj1, obj2) {
	  return (function (object) {
	    var property;
	    for (property in object.prototype) {
	      this.prototype[property] = object.prototype[property];
	    }
	    return this;
	  }).apply(obj1, [obj2]);
	};


	/**
	 * The default function for determining the label text and style
	 * for a cluster icon.
	 *
	 * @param {Array.<google.maps.Marker>} markers The array of markers represented by the cluster.
	 * @param {number} numStyles The number of marker styles available.
	 * @return {ClusterIconInfo} The information resource for the cluster.
	 * @constant
	 * @ignore
	 */
	MarkerClusterer.CALCULATOR = function (markers, numStyles) {
	  var index = 0;
	  var title = "";
	  var count = markers.length.toString();

	  var dv = count;
	  while (dv !== 0) {
	    dv = parseInt(dv / 10, 10);
	    index++;
	  }

	  index = Math.min(index, numStyles);
	  return {
	    text: count,
	    index: index,
	    title: title
	  };
	};


	/**
	 * The number of markers to process in one batch.
	 *
	 * @type {number}
	 * @constant
	 */
	MarkerClusterer.BATCH_SIZE = 2000;


	/**
	 * The number of markers to process in one batch (IE only).
	 *
	 * @type {number}
	 * @constant
	 */
	MarkerClusterer.BATCH_SIZE_IE = 500;


	/**
	 * The default root name for the marker cluster images.
	 *
	 * @type {string}
	 * @constant
	 */
	MarkerClusterer.IMAGE_PATH = "https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m";


	/**
	 * The default extension name for the marker cluster images.
	 *
	 * @type {string}
	 * @constant
	 */
	MarkerClusterer.IMAGE_EXTENSION = "png";


	/**
	 * The default array of sizes for the marker cluster images.
	 *
	 * @type {Array.<number>}
	 * @constant
	 */
	MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];

	module.exports = MarkerClusterer


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SearchAsMove = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ItemCheckboxList = __webpack_require__(5);

	var _ImmutableQuery = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var SearchAsMove = exports.SearchAsMove = function (_Component) {
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
			key: 'componentDidMount',
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
			key: 'handleSelect',
			value: function handleSelect(value) {
				var flag = value === true ? true : value && value.length ? true : false;
				this.props.searchAsMoveChange(flag);
			}
			// Handler function when a value is deselected or removed

		}, {
			key: 'handleRemove',
			value: function handleRemove(value) {}
		}, {
			key: 'render',
			value: function render() {
				var listComponent = void 0;
				listComponent = _react2.default.createElement(_ItemCheckboxList.ItemCheckboxList, {
					showTags: false,
					items: this.state.items,
					onSelect: this.handleSelect,
					onRemove: this.handleRemove,
					showCount: this.props.showCount });
				return _react2.default.createElement(
					'div',
					{ className: 'searchAsMove row clearfix' },
					listComponent
				);
			}
		}]);

		return SearchAsMove;
	}(_react.Component);

	SearchAsMove.propTypes = {};
	// Default props value
	SearchAsMove.defaultProps = {
		fieldName: 'SearchAsMove',
		searchAsMoveDefault: false
	};

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MapStyles = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

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
			key: 'componentDidMount',
			value: function componentDidMount() {
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
			}
			// Handler function when a value is selected

		}, {
			key: 'handleSelect',
			value: function handleSelect(event) {
				this.setState({
					selectedValue: event.target.value
				}, function () {
					this.themeChanged(true);
				}.bind(this));
			}
		}, {
			key: 'themeChanged',
			value: function themeChanged() {
				var isExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var style = helper.mapStyles[this.state.selectedValue].value;
				this.props.mapStyleChange(style);
			}
		}, {
			key: 'render',
			value: function render() {
				var options = this.state.items.map(function (item, index) {
					return _react2.default.createElement(
						'option',
						{ value: index, key: index },
						item.key
					);
				});
				return _react2.default.createElement(
					'div',
					{ className: 'input-field col mapStyles' },
					_react2.default.createElement(
						'select',
						{ className: 'browser-default form-control', onChange: this.handleSelect, value: this.state.selectedValue, name: 'mapStyles', id: 'mapStyles' },
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
		fieldName: 'MapStyles'
	};

/***/ },
/* 282 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var RotateIcon = exports.RotateIcon = function RotateIcon(options) {
		this.options = options || {};
		this.rImg = options.img || new Image();
		this.rImg.src = this.rImg.src || this.options.url || '/static/groups/img/car_map_state_go.png';
		this.options.width = this.options.width || this.rImg.width || 52;
		this.options.height = this.options.height || this.rImg.height || 60;
		var canvas = document.createElement("canvas");
		var size = this.options.width > this.options.height ? this.options.width : this.options.height;
		canvas.width = size + 10;
		canvas.height = size + 10;
		this.context = canvas.getContext("2d");
		this.canvas = canvas;
	};
	RotateIcon.makeIcon = function (url) {
		return new RotateIcon({ url: url });
	};
	RotateIcon.prototype.setRotation = function (options) {
		var canvas = this.context,
		    angle = options.deg ? options.deg * Math.PI / 180 : options.rad,
		    centerX = this.options.width / 2,
		    centerY = this.options.height / 2;

		canvas.clearRect(0, 0, this.options.width, this.options.height);
		canvas.save();
		canvas.translate(centerX, centerY);
		canvas.rotate(angle);
		canvas.drawImage(this.rImg, -centerX, -centerY);
		canvas.restore();
		return this;
	};
	RotateIcon.prototype.getUrl = function () {
		return this.canvas.toDataURL('idist/images');
	};

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ListResult = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ImmutableQuery = __webpack_require__(8);

	var _ChannelManager = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var ListResult = exports.ListResult = function (_Component) {
		_inherits(ListResult, _Component);

		function ListResult(props, context) {
			_classCallCheck(this, ListResult);

			var _this = _possibleConstructorReturn(this, (ListResult.__proto__ || Object.getPrototypeOf(ListResult)).call(this, props));

			_this.state = {
				markers: [],
				query: {},
				rawData: {
					hits: {
						hits: []
					}
				},
				resultMarkup: []
			};
			_this.nextPage = _this.nextPage.bind(_this);
			return _this;
		}

		_createClass(ListResult, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.createChannel();
				this.listComponent();
			}

			// Create a channel which passes the depends and receive results whenever depends changes

		}, {
			key: 'createChannel',
			value: function createChannel() {
				// Set the depends - add self aggs query as well with depends
				var depends = this.props.depends ? this.props.depends : {};
				// create a channel and listen the changes
				var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends, this.props.requestSize);
				this.channelId = channelObj.channelId;
				channelObj.emitter.addListener(channelObj.channelId, function (res) {
					var data = res.data;
					var rawData = void 0,
					    markersData = void 0;
					this.streamFlag = false;
					if (res.method === 'stream') {
						this.channelMethod = 'stream';
						var modData = this.streamDataModify(this.state.rawData, res);
						rawData = modData.rawData;
						res = modData.res;
						this.streamFlag = true;
						markersData = this.setMarkersData(rawData);
					} else if (res.method === 'historic') {
						this.channelMethod = 'historic';
						rawData = res.appliedQuery && res.appliedQuery.body && res.appliedQuery.body.from !== 0 ? this.appendData(data) : data;
						markersData = this.setMarkersData(data);
					}
					this.setState({
						rawData: rawData,
						markersData: markersData
					}, function () {
						// Pass the historic or streaming data in index method
						res.allMarkers = rawData;
						var generatedData = this.props.markerOnIndex ? this.props.markerOnIndex(res) : this.defaultMarkerOnIndex(res);
						this.setState({
							resultMarkup: generatedData
						});
						if (this.streamFlag) {
							this.streamMarkerInterval();
						}
					}.bind(this));
				}.bind(this));
			}

			// append data if pagination is applied

		}, {
			key: 'appendData',
			value: function appendData(data) {
				var rawData = this.state.rawData;
				var hits = rawData.hits.hits.concat(data.hits.hits);
				rawData.hits.hits = _.uniqBy(hits, '_id');;
				return rawData;
			}

			// append stream boolean flag and also start time of stream

		}, {
			key: 'streamDataModify',
			value: function streamDataModify(rawData, res) {
				if (res.data) {
					res.data.stream = true;
					res.data.streamStart = new Date();
					if (res.data._deleted) {
						var hits = rawData.hits.hits.filter(function (hit) {
							return hit._id !== res.data._id;
						});
						rawData.hits.hits = hits;
					} else {
						var prevData = rawData.hits.hits.filter(function (hit) {
							return hit._id === res.data._id;
						});
						var _hits = rawData.hits.hits.filter(function (hit) {
							return hit._id !== res.data._id;
						});
						rawData.hits.hits = _hits;
						rawData.hits.hits.push(res.data);
					}
				}
				return {
					rawData: rawData,
					res: res,
					streamFlag: true
				};
			}

			// tranform the raw data to marker data

		}, {
			key: 'setMarkersData',
			value: function setMarkersData(data) {
				var self = this;
				if (data && data.hits && data.hits.hits) {
					return data.hits.hits;
				} else {
					return [];
				}
			}

			// default markup

		}, {
			key: 'defaultMarkerOnIndex',
			value: function defaultMarkerOnIndex(res) {
				var result = void 0;
				if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
					result = res.allMarkers.hits.hits.map(function (marker, index) {
						return _react2.default.createElement(
							'div',
							{ key: index, className: 'makerInfo' },
							JSON.stringify(marker)
						);
					});
				}
				return result;
			}
		}, {
			key: 'nextPage',
			value: function nextPage() {
				var channelOptionsObj = _ChannelManager.manager.channels[this.channelId].previousSelectedSensor['channel-options-' + this.channelId];
				var obj = {
					key: 'channel-options-' + this.channelId,
					value: {
						size: this.props.requestSize,
						from: channelOptionsObj.from + this.props.requestSize
					}
				};
				_ChannelManager.manager.nextPage(this.channelId);
			}
		}, {
			key: 'listComponent',
			value: function listComponent() {
				var _this2 = this;

				var node = this.refs.ListContainer;
				if (node) {
					node.addEventListener('scroll', function () {
						if ($(node).scrollTop() + $(node).innerHeight() >= node.scrollHeight) {
							_this2.nextPage();
						}
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ ref: 'ListContainer', className: 'map-container reactiveComponent appbaseMapComponent listResult', style: this.props.containerStyle },
					this.state.resultMarkup
				);
			}
		}]);

		return ListResult;
	}(_react.Component);

	ListResult.propTypes = {
		markerOnIndex: _react2.default.PropTypes.func,
		requestSize: _react2.default.PropTypes.number,
		requestOnScroll: _react2.default.PropTypes.bool
	};
	ListResult.defaultProps = {
		requestSize: 20,
		requestOnScroll: true,
		containerStyle: {
			height: '700px',
			overflow: 'auto'
		}
	};

	// context type
	ListResult.contextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ReactiveMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _ImmutableQuery = __webpack_require__(8);

	var _ChannelManager = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helper = __webpack_require__(16);

	var ReactiveMap = exports.ReactiveMap = function (_Component) {
		_inherits(ReactiveMap, _Component);

		function ReactiveMap(props, context) {
			_classCallCheck(this, ReactiveMap);

			var _this = _possibleConstructorReturn(this, (ReactiveMap.__proto__ || Object.getPrototypeOf(ReactiveMap)).call(this, props));

			_this.state = {};
			_this.appbaseRef = helper.setConfigObject(_this.props.config);
			_ImmutableQuery.queryObject.setConfig(_this.props.config.appbase);
			_ChannelManager.manager.setConfig(_this.props.config.appbase);
			return _this;
		}

		_createClass(ReactiveMap, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return { appbaseConfig: this.props.config };
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'section',
					{ className: 'col s12 col-xs-12', style: { 'padding': 0 } },
					this.props.children
				);
			}
		}]);

		return ReactiveMap;
	}(_react.Component);

	ReactiveMap.defaultProps = {
		config: _react2.default.PropTypes.any.isRequired
	};

	ReactiveMap.childContextTypes = {
		appbaseConfig: _react2.default.PropTypes.any.isRequired
	};

/***/ }
/******/ ])
});
;