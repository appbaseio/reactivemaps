import { default as React, Component } from 'react';
import { render } from 'react-dom';
var Style = require('../../helper/Style.js');

export class ItemCheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }
  // remove selected types if not in the list
  componentDidUpdate() {
    var updated = JSON.parse(JSON.stringify(this.state.selectedItems));
    if(updated.length && this.props.items) {
      console.log(updated, this.props.items);
      updated = updated.filter((item)=> {
        let updatedFound = this.props.items.filter((propItem) => {
          return propItem.key === item;
        });
        return updatedFound.length ? true : false;
      });
      if(updated.length !== this.state.selectedItems.length) {
        var isExecutable = updated.length ? false : true;
        this.props.onRemove(this.state.selectedItems, isExecutable);
        this.setState({
          'selectedItems': updated
        });
        if(updated.length) {
          this.props.onSelect(updated);
        }
      }
    }
  }
  // Handler function when a checkbox is clicked
  handleListClick(value, selectedStatus) {
    // If the checkbox selectedStatus is true, then update selectedItems array
    if (selectedStatus) {
      this.props.onRemove(this.state.selectedItems, false);
      var updated = this.state.selectedItems;
      updated.push(value);
      this.setState({
        selectedItems: updated
      });
      // Pass the props to parent components to add to the Query
      if(this.state.selectedItems.length) {
        this.props.onSelect(this.state.selectedItems);
      }
    }
    // If the checkbox selectedStatus is false
    // Call handleTagClick to remove it from the selected Items
    else {
      this.handleTagClick(value);
    }
  }
  // Handler function when a cancel button on tag is clicked to remove it
  handleTagClick(value) {
    // Pass the older value props to parent components to remove older list in terms query
    var isExecutable = this.state.selectedItems.length === 1 ? true:false;
    this.props.onRemove(this.state.selectedItems, isExecutable);
    var keyRef = value.replace(/ /g,'_');
    var checkboxElement = eval(`this.refs.ref${keyRef}`);
    checkboxElement.state.status = false;
    var updated = this.state.selectedItems;
    let index = updated.indexOf(value);
    updated.splice(index, 1);
    this.setState({
      selectedItems: updated
    });
    // Pass the removed value props to parent components to add updated list in terms query
    if(this.state.selectedItems.length) {
      this.props.onSelect(this.state.selectedItems);
    }
  }
  render() {
    let items = this.props.items;
    let selectedItems = this.state.selectedItems;
    var ListItemsArray = [];
    var TagItemsArray = [];
    // Build the array for the checkboxList items
    items.forEach(function (item) {
      item.keyRef = item.key.replace(/ /g,'_');
      ListItemsArray.push(<ListItem
        key={item.keyRef}
        value={item.key}
        doc_count={item.doc_count}
        countField={this.props.showCount}
        handleClick={this.handleListClick}
        status={false}
        ref={"ref" + item.keyRef} />);
    }.bind(this));
    // Build the array of Tags for selected items
    if(this.props.showTags) {
      selectedItems.forEach(function (item) {
        TagItemsArray.push(<Tag
          key={item}
          value={item}
          onClick={this.handleTagClick} />);
      }.bind(this));
    }
    return (
      <div>
        {TagItemsArray}
        <div style={Style.divScroll}>
          {ListItemsArray}
        </div>
      </div>
    );
  }
}

ItemCheckboxList.defaultProps = {
  showTags: true
};

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status || false,
    };
  }
  handleClick() {
    this.setState({
      status: !this.state.status
    });
    this.props.handleClick(this.props.value, !this.state.status);
  }
  handleCheckboxChange(event) {
    this.setState({
      status: event.target.checked
    });
  }
  render() {
    let count;
    // Check if the user has set to display countField 
    if (this.props.countField) {
      count = <label> ({this.props.doc_count}) </label>;
    }
    return (
      <div onClick={this.handleClick.bind(this) } style={Style.divListItem}>
        <input type="checkbox"
          checked={this.state.status}
          onChange={this.handleCheckboxChange.bind(this) } />
        <label >{this.props.value}</label>
        {count}
      </div>
    );
  }
}

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span onClick={this.props.onClick.bind(null, this.props.value) } style={Style.divListTag}>
        <span>{this.props.value}</span>
        <span><b>&nbsp; x</b></span>
      </span>
    );
  }
}