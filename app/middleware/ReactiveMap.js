import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
import {manager} from './ChannelManager.js';
var helper = require('./helper.js');

export const ReactiveMap  = ({config}) => {
  helper.setConfigObject(config);
  queryObject.setConfig(config.appbase);
  manager.setConfig(config.appbase);
  return false;
};