import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Waypoint = require('react-waypoint');
var Style = require('../Style.js');

export class ItemCheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }
  handleListClick(value, status) {
    var updated = this.state.selectedItems;
    if (status) {
      updated.push(value);
      this.setState({
        selectedItems: updated
      });
      this.props.onSelect(value);
    }
    else {
      this.handleTagClick(value);
    }
  }
  handleTagClick(value) {
    var checkboxElement = eval(`this.refs.ref${value}`)
    checkboxElement.state.status = false;
    var updated = this.state.selectedItems;
    let index = updated.indexOf(value);
    updated.splice(index, 1);
    this.setState({
      selectedItems: updated
    });
    this.props.onRemove(value);
  }
  render() {
    let items = this.props.items;
    let selectedItems = this.state.selectedItems;
    var ListItemsArray = [];
    var TagItemsArray = [];
    Object.keys(items).forEach(function (key) {
      ListItemsArray.push(<ListItem key={key} value={key} doc_count={items[key]} handleClick={this.handleListClick} status={false} ref={"ref" + key} />);
    }.bind(this));
    selectedItems.forEach(function (item) {
      TagItemsArray.push(<Tag key={item} value={item} onClick={this.handleTagClick} />);
    }.bind(this));
    return (
      <div>
        {TagItemsArray}
        <div style={Style.divScroll}>
          {ListItemsArray}
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status || false,
    };
  }
  handleClick() {
    this.setState({
      status: !this.state.status
    });
    this.props.handleClick(this.props.value, !this.state.status);
  }
  handleCheckboxChange(event) {
    this.setState({
      status: event.target.checked
    });
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this) } style={Style.divListItem}>
        <input type="checkbox" checked={this.state.status} onChange={this.handleCheckboxChange.bind(this) } />
        <label >{this.props.value} ({this.props.doc_count})</label>
      </div>
    );
  }
}

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span onClick={this.props.onClick.bind(null, this.props.value) } style={Style.divListTag}>
        <span>{this.props.value}</span>
        <span><b>&nbsp; x</b></span>
      </span>
    );
  }
}