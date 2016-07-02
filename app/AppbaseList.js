import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Appbase = require('appbase-js');
var helper = require('./helper.js');
import {List} from './component/List.js';
import {Tags} from './component/Tags.js';
var Waypoint = require('react-waypoint');

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
    this.handleListClick = this.handleListClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }
  subscribeToUpdates() {
    var requestObject = helper.getMatchAllQuery(this.props.config, this.props.fieldName, 1, this.props.size, true);
    var self = this;
    self.setState({
      streamingStatus: 'Listening...'
    });
    if (this.streamingInstance) {
      this.streamingInstance.stop();
    }
    this.streamingInstance = this.appbaseRef.searchStream(requestObject).on('data', function (stream) {
      var updated = self.state.items;
      updated[stream._id] = eval(`stream._source.${self.props.fieldName}`);
      self.setState({
        items: updated
      });
    }).on('error', function (error) {
      console.log(error);
    });
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
  handleListClick(_id) {
    // var updated = this.state.items
    // delete updated[_id]
    // this.props.onSelected(_id, this.state.items[_id]);
    var updated = this.state.selectedItems;
    updated[_id] = this.state.items[_id];
    this.setState({
      selectedItems: updated
    });
  }
  handleTagClick(){
    console.log("clicked")
  }
  render() {
    return (
      <div>
        <Tags items={this.state.selectedItems} onClick={this.handleTagClick} />
        <List items={this.state.items} onClick={this.handleListClick}/>
        <Waypoint
          onEnter={this.handleWaypointEnter.bind(this) }
          />
      </div>

    );
  }

}
AppbaseList.defaultProps = {
  size: 60,
};