function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { default as React, Component } from "react";
import { render } from "react-dom";

export var Img = function (_Component) {
	_inherits(Img, _Component);

	function Img(props) {
		_classCallCheck(this, Img);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			src: _this.props.src
		};
		_this.stopImg = false;
		return _this;
	}

	Img.prototype.componentDidMount = function componentDidMount() {
		var self = this;
		this.img = new Image();
		var defaultSrc = "https://s-media-cache-ak0.pinimg.com/216x146/27/b2/da/27b2da4789262e3b828a8ec6587dd8aa.jpg";
		this.img.onerror = function () {
			self.setState({
				src: defaultSrc
			}, function () {});
		};
		this.img.src = this.state.src;
	};

	Img.prototype.componentWillUnmount = function componentWillUnmount() {
		this.stopImg = true;
	};

	Img.prototype.render = function render() {
		return React.createElement("img", { className: "responsive-img img-responsive", src: this.state.src });
	};

	return Img;
}(Component);