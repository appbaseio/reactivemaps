import { default as React, Component } from 'react'
import { render } from 'react-dom'
var Appbase = require('appbase-js');
var helper = require('./helper.js')
import {List} from './component/List.js'
export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItems: [],
      streamingStatus: 'Intializing..'
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
    this.streamingInstance;
  }
  componentDidMount() {
    this.getItems();
  }
  subscribeToUpdates() {
    var requestObject = helper.getMatchAllQuery(this.props.config, this.props.fieldName, 1, true);
    var self = this;
    self.setState({
      streamingStatus: 'Listening...'
    });
    if (this.streamingInstance) {
      this.streamingInstance.stop();
    }
    this.streamingInstance = this.appbaseRef.searchStream(requestObject).on('data', function (stream) {
      var updated = self.state.items;
      updated.unshift(JSON.stringify(stream._source.location));
      self.setState({
        items: updated
      });
    }).on('error', function (error) {
      console.log(error);
    });
  }

  getItems() {
    var requestObject = helper.getMatchAllQuery(this.props.config, this.props.fieldName, "1", false);
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
    newItems.map(function (item) {
      updated.push(JSON.stringify(item._source));
    });
    this.setState({ items: updated });
  }

  render() {
    return (
      <div>
        <List items={this.state.items} />
      </div>

    );
  }

}