import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
import InputRange from 'react-input-range';
var Style = require('./Style.js');

export class AppbaseSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: this.props.values,
      minThreshold: this.props.minThreshold,
      maxThreshold: this.props.maxThreshold,
      currentValues: [],
    };
  }
  // Handle function when value slider option is changing
  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }
  // Handle function when slider option change is completed
  handleResults(component, values) {
    // Remove the last Range query
    queryObject.removeShouldClause(this.props.fieldName, this.state.currentValues, "Range", true);
    // Add new should query    
    queryObject.addShouldClause(this.props.fieldName, values, "Range");
    this.setState({
      currentValues: values
    });
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

}AppbaseSlider.defaultProps = {
  minThreshold: 0,
  maxThreshold: 20,
  values: {
    min: 0,
    max: 20,
  },
};