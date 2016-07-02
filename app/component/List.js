import { default as React, Component } from 'react'
import { render } from 'react-dom'

export class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items = this.props.items;
    var itemsComponent = []
    Object.keys(items).forEach(function (key) {
      itemsComponent.push(<Item key={key} value={items[key]} _id={key} onClick={this.props.onClick} />);
    }.bind(this));
    return (
      <div>
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
      margin: "5px",
      padding: "3px"
    };
    // var status = (this.props.complete) ? 'complete' : 'pending';
    return (
      <div onClick={this.props.onClick.bind(null, this.props._id) } style={divStyle}>
        <label ><input type="checkbox" />{this.props.value}</label>
      </div>
    );
  }
}