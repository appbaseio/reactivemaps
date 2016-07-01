import { default as React, Component } from 'react'
import { render } from 'react-dom'

class Item extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    checklistActions.toggleItem(this.props.item_id);
  }
  render() {
    // var status = (this.props.complete) ? 'complete' : 'pending';
    return (
      <div onClick={this.handleClick}>
        <input type="checkbox" />
        <label >{this.props.value}</label>
      </div>
    );
  }
}