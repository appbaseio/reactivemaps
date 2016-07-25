import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Appbase = require('appbase-js');
var helper = require('./helper.js');
import {List} from './component/List.js';
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
    var requestObject = helper.getMatchAllQuery(this.props.config, this.props.fieldName, pageNumber, this.props.size, false);
    var self = this;
    this.appbaseRef.search(requestObject).on('data', function (data) {
      self.addItemsToList(data.hits.hits);
      self.subscribeToUpdates();
    }).on('error', function (error) {
      console.log(error)
    });
  }
  addItemsToList(newItems) {
    var updated = this.state.items;
    var self = this;
    newItems.map(function (item) {
      updated[item._id] = eval(`item._source.${self.props.fieldName}`);
    });
    this.setState({ items: updated });
  }
  handleWaypointEnter() {
    this.getItems(this.pageNumber);
    this.pageNumber++;
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
        <List items={this.state.items} onSelect={this.handleSelect} onRemove={this.handleRemove} onPageEnd={this.handleWaypointEnter.bind(this)} />
      </div>

    );
  }

}
AppbaseList.defaultProps = {
  size: 60,
};