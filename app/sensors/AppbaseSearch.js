import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from '../middleware/ImmutableQuery.js';
import Select from 'react-select';
var helper = require('../middleware/helper.js');
var watchForDependencyChange = require('../middleware/WatchForDependencyChange.js');

export class AppbaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentValue: {}
    };
    this.getItems = this.getItems.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.customDependChange = this.customDependChange.bind(this);
    this.previousSelectedSensor = {};
  }
  componentDidUpdate() {
    var depends = this.props.depends;
    var selectedSensor = this.props.selectedSensor;
    if(depends && selectedSensor) {
      watchForDependencyChange.init(depends, selectedSensor, this.previousSelectedSensor, this.customDependChange);
    }
  }
  
  // Custom event after dependency changes
  customDependChange(depend) {
    switch(depend) {
      case 'city' :
        this.extraQuery = queryObject.getTermObject(this.previousSelectedSensor[depend].key, this.previousSelectedSensor[depend].value);
      break;
    }
  }

  // Builds the query for the search by taking search input as query input
  // For autocomplete to work, field should be mapped to Ngram 
  getQuery(input) {
    var query = JSON.parse(`{
      "type": "${helper.appbaseConfig.type}",
      "body": {
        "from": 0,
        "size": ${this.props.size},
        "query": {
          "bool": {
            "must": [{
              "multi_match": {
                "query": "${input}",
                "fields": "${this.props.fieldName}",
                "operator": "and"
              }
            }]
          }
        }
      }
    }`);
    if(this.extraQuery) {
      query.body.query.bool.must = query.body.query.bool.must.concat(this.extraQuery);
    }
    return query;
  }
  // Fetch the items from Appbase
  getItems(input, callback) {
    let self = this;
    let requestObject = this.getQuery(input);
    let searchField = `hit._source.${this.props.fieldName}`;
    helper.appbaseRef.search(requestObject).on('data', function (data) {
      let options = [];
      // Check if this is Geo search or field tag search
      if (self.props.isGeoSearch) {
        // If it is Geo, we return the location field
        let latField = `hit._source.${self.props.latField}`;
        let lonField = `hit._source.${self.props.lonField}`;
        data.hits.hits.map(function (hit) {
          let location = {
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
        queryObject.removeShouldClause(this.props.fieldName, this.state.currentValue.value, "Match", this.props.isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
      }
      // Add the new search value to the ImmutableQuery
      if (currentValue)
        queryObject.addShouldClause(this.props.fieldName, currentValue.value, "Match", this.props.isExecuteQuery, this.props.includeGeo, this.props.queryLevel);
    }
    this.setState({
      currentValue: currentValue
    });
  }
  render() {
    return (
      <Select.Async
        className="appbase-select"
        name="appbase-search"
        value={this.state.currentValue}
        loadOptions={this.getItems}
        onChange={this.handleSearch}
        {...this.props}
        />
    );
  }
}
AppbaseSearch.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  isGeoSearch: React.PropTypes.bool,
  size: React.PropTypes.number,
};
// Default props value
AppbaseSearch.defaultProps = {
  placeholder: "Search...",
  isGeoSearch: false,
  size: 10,
};