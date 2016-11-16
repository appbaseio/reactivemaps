'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Style = require('../../helper/Style.js');

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
        { className: 'listContainer' },
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
    key: 'render',
    value: function render() {
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
      var activeClass = this.props.value === this.props.selectedItem ? 'active' : '';
      return _react2.default.createElement(
        'div',
        { onClick: this.props.handleClick.bind(null, this.props.value), className: 'listItem' },
        _react2.default.createElement(
          'a',
          { href: 'javascript:void(0)', className: activeClass },
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
  }]);

  return ItemRow;
}(_react.Component);