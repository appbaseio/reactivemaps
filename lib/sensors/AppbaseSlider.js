'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppbaseSlider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ImmutableQuery = require('../middleware/ImmutableQuery.js');

var _ChannelManager = require('../middleware/ChannelManager.js');

var _HistoGram = require('./component/HistoGram.js');

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helper = require('../middleware/helper.js');
var Style = require('../helper/Style.js');

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