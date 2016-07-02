import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Appbase = require('appbase-js');
var helper = require('./helper.js');
import {List} from './component/List.js';
var Waypoint = require('react-waypoint');

export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selectedItems: [],
      streamingStatus: 'Intializing..'
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
    this.streamingInstance;
    this.pageNumber = 0;
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

  render() {
    return (
      <div>
        <List items={this.state.items} />
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