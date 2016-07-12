import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');

export class AppbaseFacet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: [],
      items: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
  }
  componentDidMount() {
    this.getItems();
  }

  handleClick(value) {
    this.setState({
      selectedItem: value
    }, function () {
      console.log(value);
    });
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
      updated.push(<FacetItem key={item.key} value={item.key} count={item.doc_count} handleClick={self.handleClick} selected={self.state.selectedItem}/>)
    });
    this.setState({ items: updated });
  }
  render() {
    let items = this.state.items;
    var scrollStyle = {
      overflow: "auto",
      height: "400px",
      width: "100%",
      margin: "5px",
    };
    return (
      <div style={scrollStyle}>
        {items}
      </div>
    );
  }
}

class FacetItem extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.handleClick(this.props.value, this.props.count);
  }
  render() {
    var defaultStyle = {
      margin: "5px",
      padding: "3px",
      
    };
    var selectedStyle = {
      margin: "5px",
      padding: "3px",
      fontWeight: "bold",
    };
    return (
      <div onClick={this.handleClick.bind(this) } style={this.props.value === this.props.selectedItem ? selectedStyle : defaultStyle}>
        <a href="#">
          <span> {this.props.value} -> </span>
          <span> {this.props.count} </span>
        </a>
      </div>
    );
  }
}