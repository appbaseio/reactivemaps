import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');
import Select from 'react-select';

export class AppbaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
  }
  getItems(input, callback) {
    console.log("Hello")
    setTimeout(function () {
      callback(null, {
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ],
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    }, 500);
  }
  render() {
    return (
      <Select.Async
        name="appbase-search"
        loadOptions={this.getItems}
        />
    );
  }
}