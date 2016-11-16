'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactiveMap = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ImmutableQuery = require('./ImmutableQuery.js');

var _ChannelManager = require('./ChannelManager.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helper = require('./helper.js');

var ReactiveMap = exports.ReactiveMap = function ReactiveMap(_ref) {
  var config = _ref.config;

  helper.setConfigObject(config);
  _ImmutableQuery.queryObject.setConfig(config.appbase);
  _ChannelManager.manager.setConfig(config.appbase);
  return false;
};