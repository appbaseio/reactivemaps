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
    this.selectedSensor = {};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.topicUpdate = this.topicUpdate.bind(this);
    this.type = this.props.multipleSelect ? 'Terms' : 'Term';
  }
  // Get the items from Appbase when component is mounted
  componentDidMount() {
    this.getItems();
  }
  componentDidUpdate() {
    this.topicUpdate();
  }
  // update topics on selecting city
  topicUpdate() {
    if(this.props.selectedSensor && this.props.cityField && this.props.selectedSensor.hasOwnProperty(this.props.cityField) && this.props.selectedSensor[this.props.cityField] !== this.selectedSensor[this.props.cityField]) {
      this.selectedSensor = JSON.parse(JSON.stringify(this.props.selectedSensor));
      console.log(this.props.fieldName, this.props.selectedSensor);
      this.getItems();
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
    if(this.props.onSelect) {
      var obj = {
        key: this.props.fieldName,
        value: value
      };
      this.props.onSelect(obj);
    }
    queryObject.addShouldClause(this.props.fieldName, value, this.type, this.props.includeGeo);
  }
  // Handler function when a value is deselected or removed
  handleRemove(value, isExecuteQuery=false) {
    queryObject.removeShouldClause(this.props.fieldName, value, this.type, isExecuteQuery, this.props.includeGeo);
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