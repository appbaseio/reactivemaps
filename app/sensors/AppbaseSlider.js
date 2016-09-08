import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from '../middleware/ImmutableQuery.js';
import InputRange from 'react-input-range';
var helper = require('../middleware/helper.js');
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
    this.type = 'range';
    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.handleResults = this.handleResults.bind(this);
  }
  componentDidMount() {
    this.setQueryInfo();
  }
  // Handle function when value slider option is changing
  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }
  // set the query type and input data
  setQueryInfo() {
    var obj = {
        key: this.props.sensorId,
        value: {
          queryType: this.type,
          inputData: this.props.inputData
        }
    };
    helper.selectedSensor.setSensorInfo(obj);
  }
  // Handle function when slider option change is completed
  handleResults(component, values) {
    var real_values = {
      from: values.min,
      to: values.max
    }
    var obj = {
      key: this.props.sensorId,
      value: real_values
    };
    helper.selectedSensor.set(obj, true);
  
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
  inputData: React.PropTypes.string.isRequired,
  minThreshold: React.PropTypes.number,
  maxThreshold: React.PropTypes.number,
  values: React.PropTypes.object,  
};

AppbaseSlider.defaultProps = {
  minThreshold: 0,
  maxThreshold: 10,
  values: {
    min: 0,
    max: 10,
  },
};