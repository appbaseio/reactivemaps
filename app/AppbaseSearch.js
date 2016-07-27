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
  getQuery(input) {
    return JSON.parse(`{
      "type": "${this.props.config.appbase.type}",
      "body": {
        "from": 0,
        "size": 5,
        "query": {
          "multi_match": {
            "query": "${input}",
            "fields": "${this.props.fieldName}",
            "operator": "and"
          }
        }
      }
    }`);
  }
  getItems(input, callback) {
    var requestObject = this.getQuery(input);
    var self = this;
    var searchField = `hit._source.${this.props.fieldName}`;
    var latField = `hit._source.${this.props.latField}`;
    var lonField = `hit._source.${this.props.lonField}`;
    this.appbaseRef.search(requestObject).on('data', function (data) {
      var options = [];
      data.hits.hits.map(function (hit) {
        var location = {
          lat: eval(latField),
          lon: eval(lonField)
        };
        options.push({ value: location, label: eval(searchField) });
      });
      callback(null, {
        options: options
      });
    }).on('error', function (error) {
      console.log(error);
    });
    setTimeout(function () {

    }, 500);
  }
  handleSearch(value){
    this.setState({
      value: value
    });
    this.props.handleSearch(value);
  }
  render() {
    return (
      <Select.Async
        name="appbase-search"
        value={this.state.value}
        loadOptions={this.getItems.bind(this) }
        onChange={this.handleSearch.bind(this)}
        {...this.props}
        />
    );
  }
}
AppbaseSearch.defaultProps = {
    placeholder: "Search..."
};