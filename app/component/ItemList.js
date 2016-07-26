import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Style = require('../Style.js');

export class ItemList extends Component {
  constructor(props) {
    super(props);
    var self = this;
    this.state = {
      selectedItem: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value) {
    this.props.onRemove(this.state.selectedItem);
    this.props.onSelect(value);
    this.setState({
      selectedItem: value
    });
  }
  render() {
    var scrollStyle = {
      overflow: "auto",
      height: "400px",
      width: "100%",
      margin: "5px",
    };
    let items = this.props.items;
    let FacetItems = [];
    items.forEach(function (item) {
      FacetItems.push(<FacetItem  key={item.key} value={item.key} doc_count={item.doc_count} countField={this.props.showCount} handleClick={this.handleClick} selected={this.state.selectedItem}/>)
    }.bind(this));
    return (
      <div style={scrollStyle}>
        {FacetItems}
      </div>
    );
  }
}
class FacetItem extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.handleClick(this.props.value);
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
    let count;
    if (this.props.countField) {
      count = <span> ({this.props.doc_count}) </span>
    }
    return (
      <div onClick={this.handleClick.bind(this) } style={this.props.value === this.props.selectedItem ? selectedStyle : defaultStyle}>
        <a href="#">
          <span> {this.props.value} </span>
          {count}
        </a>
      </div>
    );
  }
}