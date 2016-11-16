'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticSearch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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
        { className: 'col s12 staticSearchContainer inputBox' },
        _react2.default.createElement(
          'span',
          { className: 'add-on' },
          _react2.default.createElement('i', { className: 'fa fa-search' })
        ),
        _react2.default.createElement('input', { type: 'text', className: 'col s12',
          value: this.state.searchValue,
          placeholder: this.props.placeholder,
          onChange: this.handleChange })
      );
    }
  }]);

  return StaticSearch;
}(_react.Component);