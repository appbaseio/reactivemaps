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
        "size": 10,
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
    var field = `hit._source.${this.props.fieldName}`
    this.appbaseRef.search(requestObject).on('data', function (data) {
      var options = [];
      data.hits.hits.map(function(hit){
        options.push({value: eval(field), label: eval(field)});
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
  render() {
    return (
      <Select.Async
        name="appbase-search"
        loadOptions={this.getItems.bind(this)}
        />
    );
  }
}