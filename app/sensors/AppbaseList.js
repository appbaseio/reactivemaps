import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {ItemList} from './component/ItemList.js';
import {queryObject} from '../middleware/ImmutableQuery.js';
var helper = require('../middleware/helper.js');

export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.previousSelectedSensor = {};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.customDependChange = this.customDependChange.bind(this);
    this.type = this.props.multipleSelect ? 'Terms' : 'Term';
  }
  // Get the items from Appbase when component is mounted
  componentDidMount() {
    this.getItems();
  }
  componentDidUpdate() {
    var depends = this.props.depends;
    var selectedSensor = this.props.selectedSensor;
    if(depends && selectedSensor) {
      helper.watchForDependencyChange(depends, selectedSensor, this.previousSelectedSensor, this.customDependChange);
    }
  }
  // Custom event after dependency changes
  customDependChange(depend) {
    switch(depend) {
      case 'city' :
        this.getItems();
      break;
    }
  }
  getItems() {
    var requestObject = queryObject.addAggregation(this.props.fieldName,
      this.props.size,
      this.props.sort);
    var self = this;
    helper.appbaseRef.search(requestObject).on('data', function (data) {
      self.addItemsToList(eval(`data.aggregations["${self.props.fieldName}"].buckets`));
    }).on('error', function (error) {
      console.log(error);
    });
  }
  addItemsToList(newItems) {
    this.setState({
      items: newItems
    });
  }
  // Handler function when a value is selected
  handleSelect(value) {
    if(this.props.sensorOnSelect) {
      var obj = {
        key: this.props.fieldName,
        value: value
      };
      this.props.sensorOnSelect(obj);
    }
    var isExecuteQuery = true;
    queryObject.addShouldClause(this.props.fieldName, value, this.type, isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
  }
  // Handler function when a value is deselected or removed
  handleRemove(value, isExecuteQuery=false) {
    queryObject.removeShouldClause(this.props.fieldName, value, this.type, isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
  }
  render() {
    // Checking if component is single select or multiple select
    let listComponent;
    if (this.props.multipleSelect) {
      listComponent = <ItemCheckboxList
        items={this.state.items}
        onSelect={this.handleSelect}
        onRemove={this.handleRemove}
        showCount={this.props.showCount} />
    }
    else {
      listComponent = <ItemList
        items={this.state.items}
        onSelect={this.handleSelect}
        onRemove={this.handleRemove}
        showCount={this.props.showCount} 
        defaultSelected={this.props.defaultSelected}/>
    }

    return (
      <div>
        {listComponent}
      </div>
    );
  }

}
AppbaseList.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  size: React.PropTypes.number,
  showCount: React.PropTypes.bool,
  multipleSelect: React.PropTypes.bool,
  sort: React.PropTypes.string,   
};
// Default props value
AppbaseList.defaultProps = {
  showCount: true,
  multipleSelect: true,
  sort: 'count',
  size: 60,
};