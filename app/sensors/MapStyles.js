import { default as React, Component } from 'react';
import { render } from 'react-dom';
var helper = require('../middleware/helper.js');

export class MapStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.setState({
      items: helper.mapStyles,
      selectedValue: 0
    }, this.themeChanged);
  }
  // Handler function when a value is selected
  handleSelect(event) {
    this.setState({
      selectedValue: event.target.value
    }, this.themeChanged);
  }
  themeChanged() {
    if(this.props.sensorOnSelect) {
      var obj = {
        key: this.props.fieldName,
        value: helper.mapStyles[this.state.selectedValue].value
      };
      this.props.sensorOnSelect(obj);
    }
  }
  render() {
    let options = this.state.items.map(function(item, index) {
      return <option value={index} key={index}>{item.key}</option>;
    });
    return (
      <div className="input-field">
        <select className="browser-default" onChange={this.handleSelect} value={this.state.selectedValue} name="mapStyles" id="mapStyles">
          {options}
        </select>
      </div>
    );
  }

}

MapStyles.propTypes = {  
};
// Default props value
MapStyles.defaultProps = {
  fieldName: 'MapStyles'
};