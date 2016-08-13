import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {ItemList} from './component/ItemList.js';
import {queryObject} from './ImmutableQuery.js';
var helper = require('./helper.js');

export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  // Get the items from Appbase when component is mounted
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    var requestObject = queryObject.addAggregation(this.props.fieldName,
      this.props.size,
      this.props.sort);
    var self = this;
    helper.appbaseRef.search(requestObject).on('data', function (data) {
      self.addItemsToList(eval(`data.aggregations["${self.props.fieldName}"].buckets`));
    }).on('error', function (error) {
      console.log(error);
    });
  }
  addItemsToList(newItems) {
    this.setState({
      items: newItems
    });
  }
  // Handler function when a value is selected
  handleSelect(value) {
    queryObject.addShouldClause(this.props.fieldName, value, "Term");
  }
  // Handler function when a value is deselected or removed
  handleRemove(value) {
    queryObject.removeShouldClause(this.props.fieldName, value, "Term");
  }
  render() {
    // Checking if component is single select or multiple select
    let listComponent;
    if (this.props.multipleSelect) {
      listComponent = <ItemCheckboxList
        items={this.state.items}
        onSelect={this.handleSelect}
        onRemove={this.handleRemove}
        showCount={this.props.showCount} />
    }
    else {
      listComponent = <ItemList
        items={this.state.items}
        onSelect={this.handleSelect}
        onRemove={this.handleRemove}
        showCount={this.props.showCount} />
    }

    return (
      <div>
        {listComponent}
      </div>
    );
  }

}
// Default props value
AppbaseList.defaultProps = {
  showCount: true,
  multipleSelect: true,
  sort: 'count',
  size: 60,
};