import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');
import Select from 'react-select';

export class AppbaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentValue: {}
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
    this.appbaseRef.search(requestObject).on('data', function (data) {
      var options = [];
      if (self.props.isGeoSearch) {
        var latField = `hit._source.${self.props.latField}`;
        var lonField = `hit._source.${self.props.lonField}`;
        data.hits.hits.map(function (hit) {
          var location = {
            lat: eval(latField),
            lon: eval(lonField)
          };
          options.push({ value: location, label: eval(searchField) });
        });
      } else {
        data.hits.hits.map(function (hit) {
          options.push({ value: eval(searchField), label: eval(searchField) });
        });
      }
      callback(null, {
        options: options
      });
    }).on('error', function (error) {
      console.log(error);
    });
  }
  handleSearch(currentValue) {
    if (this.props.isGeoSearch)
      this.props.handleSearch(currentValue);
    else {
      if (this.state.currentValue)
        queryObject.removeShouldClause(this.props.fieldName, this.state.currentValue.value, "Term", true);
      if (currentValue)
        queryObject.addShouldClause(this.props.fieldName, currentValue.value, "Term");
    }
    this.setState({
      currentValue: currentValue
    });
  }
  render() {
    return (
      <Select.Async
        name="appbase-search"
        value={this.state.currentValue}
        loadOptions={this.getItems.bind(this) }
        onChange={this.handleSearch.bind(this) }
        {...this.props}
        />
    );
  }
}
AppbaseSearch.defaultProps = {
    placeholder: "Search..."
};