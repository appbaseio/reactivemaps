'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactivebase = require('@appbaseio/reactivebase');

var _app = require('../app.js');

var _Img = require('./Img.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var historyPin = require('./placeholder.svg');

var GeoDistanceDropdownDefault = function (_Component) {
	_inherits(GeoDistanceDropdownDefault, _Component);

	function GeoDistanceDropdownDefault(props) {
		_classCallCheck(this, GeoDistanceDropdownDefault);

		var _this = _possibleConstructorReturn(this, (GeoDistanceDropdownDefault.__proto__ || Object.getPrototypeOf(GeoDistanceDropdownDefault)).call(this, props));

		_this.popoverContent = _this.popoverContent.bind(_this);
		return _this;
	}

	_createClass(GeoDistanceDropdownDefault, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			_reactivebase.AppbaseSensorHelper.ResponsiveStory();
		}
	}, {
		key: 'popoverContent',
		value: function popoverContent(marker) {
			return _react2.default.createElement(
				'div',
				{ className: 'popoverComponent row', style: { 'margin': '0', 'maxWidth': '300px' } },
				_react2.default.createElement(
					'span',
					{ className: 'imgContainer col s2', style: { 'padding': '0' } },
					_react2.default.createElement(_Img.Img, { src: marker._source.member.photo })
				),
				_react2.default.createElement(
					'div',
					{ className: 'infoContainer col s10' },
					_react2.default.createElement(
						'div',
						{ className: 'nameContainer' },
						_react2.default.createElement(
							'strong',
							null,
							marker._source.member.member_name
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'description' },
						_react2.default.createElement(
							'p',
							{ style: { 'margin': '5px 0', 'lineHeight': '18px' } },
							'is going to\xA0',
							_react2.default.createElement(
								'a',
								{ href: marker._source.event.event_url, target: '_blank' },
								marker._source.event.event_name
							)
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactivebase.ReactiveBase,
				{
					app: this.props.config.appbase.app,
					username: this.props.config.appbase.username,
					password: this.props.config.appbase.password,
					type: this.props.config.appbase.type,
					theme: 'rbc-blue'
				},
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col s6' },
						_react2.default.createElement(_app.GeoDistanceDropdown, _extends({
							componentId: 'GeoDistanceDropdown',
							appbaseField: this.props.mapping.location
						}, this.props))
					),
					_react2.default.createElement(
						'div',
						{ className: 'col s6' },
						_react2.default.createElement(_app.ReactiveMap, {
							appbaseField: this.props.mapping.location,
							historicalData: true,
							setMarkerCluster: false,
							defaultMapStyle: 'Light Monochrome',
							autoCenter: true,
							searchAsMoveComponent: true,
							MapStylesComponent: true,
							title: 'Reactive Maps',
							showPopoverOn: 'click',
							historicPin: historyPin,
							popoverContent: this.popoverContent,
							defaultZoom: 13,
							defaultCenter: { lat: 37.74, lng: -122.45 },
							actuate: {
								GeoDistanceDropdown: { "operation": "must" }
							}
						})
					)
				)
			);
		}
	}]);

	return GeoDistanceDropdownDefault;
}(_react.Component);

exports.default = GeoDistanceDropdownDefault;


GeoDistanceDropdownDefault.defaultProps = {
	mapping: {
		location: 'location'
	},
	config: {
		"appbase": {
			"app": "reactivemap_demo",
			"username": "y4pVxY2Ok",
			"password": "c92481e2-c07f-4473-8326-082919282c18",
			"type": "meetupdata1"
		}
	}
};