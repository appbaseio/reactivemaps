"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Img = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Img = exports.Img = function (_Component) {
	_inherits(Img, _Component);

	function Img(props) {
		_classCallCheck(this, Img);

		var _this = _possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).call(this, props));

		_this.state = {
			src: _this.props.src
		};
		_this.stopImg = false;
		return _this;
	}

	_createClass(Img, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var self = this;
			this.img = new Image();
			var defaultSrc = "https://s-media-cache-ak0.pinimg.com/216x146/27/b2/da/27b2da4789262e3b828a8ec6587dd8aa.jpg";
			this.img.onerror = function () {
				self.setState({
					src: defaultSrc
				}, function () {});
			};
			this.img.src = this.state.src;
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.stopImg = true;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement("img", { className: "responsive-img img-responsive", src: this.state.src });
		}
	}]);

	return Img;
}(_react.Component);