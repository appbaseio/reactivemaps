'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppbaseList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ItemCheckboxList = require('./component/ItemCheckboxList.js');

var _ItemList = require('./component/ItemList.js');

var _ImmutableQuery = require('../middleware/ImmutableQuery.js');

var _ChannelManager = require('../middleware/ChannelManager.js');

var _StaticSearch = require('./component/StaticSearch.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helper = require('../middleware/helper.js');

var AppbaseList = exports.AppbaseList = function (_Component) {
  _inherits(AppbaseList, _Component);

  function AppbaseList(props) {
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
      var channelObj = _ChannelManager.manager.create(depends);
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
      this.addItemsToList(eval('data.aggregations["' + this.props.inputData + '"].buckets'));
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
          'h2',
          { className: 'componentTitle col s12' },
          this.props.title
        );
      }

      var listClass = 'reactiveComponent listComponent staticSearch-' + this.props.staticSearch + ' title-' + titleExists;

      return _react2.default.createElement(
        'div',
        { className: listClass },
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
  includeSelectAll: false
};