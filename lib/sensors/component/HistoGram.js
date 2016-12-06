'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Bar = exports.HistoGramComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactTooltip = require('react-tooltip');

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