import { default as React, Component } from 'react';
import { render } from 'react-dom';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }
  handleListClick(_id, value) {
    console.log(_id)
    var updated = this.state.selectedItems;
    updated[_id] = value;
    this.setState({
      selectedItems: updated
    });
  }
  handleTagClick(_id) {
    var updated = this.state.selectedItems;
    delete updated[_id];
    this.setState({
      selectedItems: updated
    });
  }
  render() {
    let items = this.props.items;
    let selectedItems = this.state.selectedItems;    
    var ListItemsArray = [];
    var TagItemsArray = [];
    Object.keys(items).forEach(function (key) {
      ListItemsArray.push(<ListItem key={key} value={items[key]} _id={key} onClick={this.handleListClick} />);
    }.bind(this));
    Object.keys(selectedItems).forEach(function (key) {
      TagItemsArray.push(<Tag key={key} value={selectedItems[key]} _id={key} onClick={this.handleTagClick} />);
    }.bind(this));
    return (
      <div>
        {TagItemsArray}
        {ListItemsArray}
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }
  handleClick(){
    this.setState({
      status: !this.state.status
    });
    this.props.onClick(this.props._id, this.props.value);
  }
  render() {
    var divStyle = {
      margin: "5px",
      padding: "3px"
    };
    return (
      <div onClick={this.handleClick.bind(this) } style={divStyle}>
        <label ><input type="checkbox" checked={this.state.status} />{this.props.value}</label>
      </div>
    );
  }
}

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var divStyle = {
      backgroundColor: "#ddd",
      margin: "5px",
      padding: "5px"
    };
    return (
      <span onClick={this.props.onClick.bind(null, this.props._id) } style={divStyle}>
        <span>{this.props.value}</span>
        <span><b>&nbsp; x</b></span>
      </span>
    );
  }
}