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
        key: "Search As Map Move",
        value: true
      }]
    });
  }
  // Handler function when a value is selected
  handleSelect(value) {
    if(this.props.sensorOnSelect) {
      var obj = {
        key: this.props.fieldName,
        value: true
      };
      this.props.sensorOnSelect(obj);
    }
  }
  // Handler function when a value is deselected or removed
  handleRemove(value, isExecuteQuery=false) {
    if(this.props.sensorOnSelect) {
      var obj = {
        key: this.props.fieldName,
        value: false
      };
      this.props.sensorOnSelect(obj);
    }
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