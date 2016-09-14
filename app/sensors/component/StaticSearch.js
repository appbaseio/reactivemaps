import { default as React, Component } from 'react';
import { render } from 'react-dom';

export class StaticSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate() {
  }
  handleChange(event) {
    let value = event.target.value;
    this.setState({
      searchValue: value
    }, function () { 
      this.props.changeCallback(this.state.searchValue); 
    }.bind(this));
  }
  render() {
    return (
      <div className="col s12">
        <input type="text" className="col s12"
          value={this.state.searchValue}
          placeholder={this.props.placeholder} 
          onChange={this.handleChange} />
      </div>
    );
  }
}