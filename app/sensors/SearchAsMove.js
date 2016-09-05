import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {queryObject} from '../middleware/ImmutableQuery.js';
var helper = require('../middleware/helper.js');

export class SearchAsMove extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.selectedSensor = {};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    this.setState({
      items: [{
        key: "Search as I move the map",
        value: true
      }]
    });
  }
  // Handler function when a value is selected
  handleSelect(value) {
    var obj = {
        key: this.props.sensorName,
        value: true
    };
    helper.selectedSensor.set(obj, true);
  }
  // Handler function when a value is deselected or removed
  handleRemove(value, isExecuteQuery=false) {
    var obj = {
        key: this.props.sensorName,
        value: false
    };
    helper.selectedSensor.set(obj, true);
  }
  render() {
    let listComponent;
    listComponent = <ItemCheckboxList
      showTags={false}
      items={this.state.items}
      onSelect={this.handleSelect}
      onRemove={this.handleRemove}
      showCount={this.props.showCount} />
    return (
      <div>
        {listComponent}
      </div>
    );
  }

}

SearchAsMove.propTypes = {  
};
// Default props value
SearchAsMove.defaultProps = {
  fieldName: 'SearchAsMove'
};