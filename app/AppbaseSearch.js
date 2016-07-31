import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
import Select from 'react-select';
var helper = require('./helper.js');

export class AppbaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentValue: {}
    };
    this.appbaseRef = helper.getAppbaseRef(this.props.config);
  }
  // Builds the query for the search by taking search input as query input
  // For autocomplete to work, field should be mapped to Ngram 
  getQuery(input) {
    return JSON.parse(`{
      "type": "${this.props.config.appbase.type}",
      "body": {
        "from": 0,
        "size": ${this.props.size},
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
  // Fetch the items from Appbase
  getItems(input, callback) {
    var self = this;
    var requestObject = this.getQuery(input);
    var searchField = `hit._source.${this.props.fieldName}`;
    this.appbaseRef.search(requestObject).on('data', function (data) {
      var options = [];
      // Check if this is Geo search or field tag search
      if (self.props.isGeoSearch) {
        // If it is Geo, we return the location field
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
      options = self.removeDuplicates(options, "label");
      callback(null, {
        options: options
      });
    }).on('error', function (error) {
      console.log(error);
    });
  }
  // Search results often contain duplicate results, so display only unique values
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  // When user has selected a search value
  handleSearch(currentValue) {
    // If it is Geo Search, we pass the props to the parent component
    if (this.props.isGeoSearch)
      this.props.handleSearch(currentValue);
    else {
      // Remove the previous attached search value from ImmutableQuery
      if (this.state.currentValue) {
        queryObject.removeShouldClause(this.props.fieldName, this.state.currentValue.value, "Match");
      }
      // Add the new search value to the ImmutableQuery
      if (currentValue)
        queryObject.addShouldClause(this.props.fieldName, currentValue.value, "Match");
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
// Default props value
AppbaseSearch.defaultProps = {
  placeholder: "Search...",
  isGeoSearch: false,
  size: 10,
};