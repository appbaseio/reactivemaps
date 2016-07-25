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
      selectedItems: {},
      streamingStatus: 'Intializing..'
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
    this.streamingInstance;
    this.pageNumber = 0;
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);    
  }
  getItems(pageNumber) {
    var requestObject = queryObject.addAggregation(this.props.fieldName);
    var self = this;
    this.appbaseRef.search(requestObject).on('data', function (data) {
      self.addItemsToList(data.hits.hits);
    }).on('error', function (error) {
      console.log(error);
    });
  }
  addItemsToList(newItems) {
    var updated = this.state.items;
    var self = this;
    newItems.map(function (item) {
      updated[eval(`item._source.${self.props.fieldName}`)] = eval(`item._source.${self.props.fieldName}`);
    });
    this.setState({ items: updated });
  }
  handleSelect(_id, value){
    value = value.toString()
    queryObject.addShouldClause(this.props.fieldName, value, "Term");    
  }
  handleRemove(_id, value){
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