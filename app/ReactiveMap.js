import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');

export class ReactiveMap extends Component {

  constructor(props) {
    super(props);
    helper.setConfigObject(this.props.config);
    queryObject.setConfig(this.props.config.appbase);
  }
  render() {
    return false;
  }

}