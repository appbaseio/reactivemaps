import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from '../middleware/ImmutableQuery.js';
import InputRange from 'react-input-range';
var Style = require('../helper/Style.js');

export class AppbaseSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: this.props.values,
      minThreshold: this.props.minThreshold,
      maxThreshold: this.props.maxThreshold,
      currentValues: [],
    };
    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.handleResults = this.handleResults.bind(this);
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
    queryObject.removeShouldClause(this.props.fieldName, this.state.currentValues, "Range", this.props.isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
    // Add new should query    
    queryObject.addShouldClause(this.props.fieldName, values, "Range", this.props.isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
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
          onChange={this.handleValuesChange}
          onChangeComplete={this.handleResults}
          {...this.props}
          />
      </div>
    );
  }

}

AppbaseSlider.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  minThreshold: React.PropTypes.number,
  maxThreshold: React.PropTypes.number,
  values: React.PropTypes.object,  
};

AppbaseSlider.defaultProps = {
  minThreshold: 0,
  maxThreshold: 1000,
  values: {
    min: 0,
    max: 1000,
  },
};