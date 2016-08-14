import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');

export const ReactiveMap  = ({config}) => {
  helper.setConfigObject(config);
  queryObject.setConfig(config.appbase);
  return false;
};