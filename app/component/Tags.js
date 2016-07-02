import { default as React, Component } from 'react'
import { render } from 'react-dom'

export class Tags extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items = this.props.items;
    var itemsComponent = [];
    Object.keys(items).forEach(function (key) {
      itemsComponent.push(<Item key={key} value={items[key]} _id={key} onClick={this.props.onClick} />);
    }.bind(this));
    return (
      <div >
        {itemsComponent}
      </div>
    );
  }
}

class Item extends Component {
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