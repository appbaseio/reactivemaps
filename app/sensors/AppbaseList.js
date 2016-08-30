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
      items: [],
      selectedSensor: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.type = this.props.multipleSelect ? 'Terms' : 'Term';
  }
  // Get the items from Appbase when component is mounted
  componentDidMount() {
    this.getItems();
  }
  componentDidUpdate() {
    console.log(this.state.selectedSensor, this.props.selectedSensor);
    if(this.props.selectedSensor && this.props.selectedSensor.hasOwnProperty(this.props.cityField) && this.props.selectedSensor[this.props.cityField] !== this.state.selectedSensor[this.props.cityField]) {
      try {
        this.setState({
          'selectedSensor': JSON.parse(JSON.stringify(this.props.selectedSensor))
        });
        this.getItems();
      } catch(e) {}
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
    // queryObject.updateGeoFilter(null, null, false);
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
    // let isExecuteQuery = this.props.multipleSelect ? true : false;
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
        showCount={this.props.showCount} />
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