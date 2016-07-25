import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Appbase = require('appbase-js');
var helper = require('./helper.js');
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {queryObject} from './ImmutableQuery.js';
export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      streamingStatus: 'Intializing..'
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
    this.streamingInstance;
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);    
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    var requestObject = queryObject.addAggregation(this.props.fieldName);
    var self = this;
    this.appbaseRef.search(requestObject).on('data', function (data) {
      self.addItemsToList(eval(`data.aggregations.${self.props.fieldName}.buckets`));
    }).on('error', function (error) {
      console.log(error);
    });
  }
  addItemsToList(newItems) {
    var updated = this.state.items;
    var self = this;
    newItems.map(function (item) {
      updated[item.key] = item.doc_count;
    });
    this.setState({ items: updated });
  }
  handleSelect(value){
    value = value.toString()
    queryObject.addShouldClause(this.props.fieldName, value, "Term");    
  }
  handleRemove(value){
    queryObject.removeShouldClause(this.props.fieldName, value, "Term");    
  }
  render() {
    return (
      <div>
        <ItemCheckboxList items={this.state.items} onSelect={this.handleSelect} onRemove={this.handleRemove} />
      </div>

    );
  }

}
AppbaseList.defaultProps = {
  size: 60,
};