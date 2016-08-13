import { default as React, Component } from 'react';
import { render } from 'react-dom';
var helper = require('./helper.js');

export class ReactiveMap extends Component {

  constructor(props) {
    super(props);
    helper.setConfigObject(this.props.config);
  }
  render() {
    return false;
  }

}