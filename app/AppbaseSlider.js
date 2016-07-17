import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
import InputRange from 'react-input-range';
var Style = require('./Style.js');

export class AppbaseSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: {
        min: 0,
        max: 20,
      },
      minThreshold: 0,
      maxThreshold:20
    };
  }
  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }
  handleResults(component, values) {
    queryObject.addShouldClause(this.props.fieldName, values, "Range");
  }
  render() {
    return (
      <div style={Style.divContainer}>
        <InputRange
          maxValue={this.state.maxThreshold}
          minValue={this.state.minThreshold}
          value={this.state.values}
          onChange={this.handleValuesChange.bind(this) }          
          onChangeComplete={this.handleResults.bind(this) }
          />
      </div>
    );
  }

}