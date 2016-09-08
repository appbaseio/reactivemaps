import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {ItemList} from './component/ItemList.js';
import {queryObject} from '../middleware/ImmutableQuery.js';
import {manager} from '../middleware/ChannelManager.js';
var helper = require('../middleware/helper.js');

export class AppbaseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.previousSelectedSensor = {};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.type = this.props.multipleSelect ? 'Terms' : 'Term';
  }
  // Get the items from Appbase when component is mounted
  componentDidMount() {
    this.setQueryInfo();
    this.createChannel();
  }
  // set the query type and input data
  setQueryInfo() {
    var obj = {
        key: this.props.sensorId,
        value: {
          queryType: this.type,
          inputData: this.props.inputData
        }
    };
    helper.selectedSensor.setSensorInfo(obj);
  }
  // Create a channel which passes the depends and receive results whenever depends changes
  createChannel() {
    // Set the depends - add self aggs query as well with depends
    let depends = this.props.depends ? this.props.depends : {};
    depends['aggs'] = {
      key: this.props.inputData,
      sort: this.props.sort,
      size: this.props.size
    };
    // create a channel and listen the changes
    var channelObj = manager.create(depends);
    channelObj.emitter.addListener(channelObj.channelId, function(data) {
      this.setData(data);
    }.bind(this));
  }
  setData(data) {
    this.addItemsToList(eval(`data.aggregations["${this.props.inputData}"].buckets`));
  }
  addItemsToList(newItems) {
    this.setState({
      items: newItems
    });
  }
  // Handler function when a value is selected
  handleSelect(value) {
    this.setValue(value, true)
  }
  // Handler function when a value is deselected or removed
  handleRemove(value, isExecuteQuery=false) {
    this.setValue(value, isExecuteQuery)
  }
  // set value
  setValue(value, isExecuteQuery=false) {
    var obj = {
        key: this.props.sensorId,
        value: value
    };
    helper.selectedSensor.set(obj, isExecuteQuery);
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
        showCount={this.props.showCount} 
        defaultSelected={this.props.defaultSelected}/>
    }

    return (
      <div>
        {listComponent}
      </div>
    );
  }

}
AppbaseList.propTypes = {
  inputData: React.PropTypes.string.isRequired,
  size: React.PropTypes.number,
  showCount: React.PropTypes.bool,
  multipleSelect: React.PropTypes.bool,
  sort: React.PropTypes.string,   
};
// Default props value
AppbaseList.defaultProps = {
  showCount: true,
  multipleSelect: true,
  sort: 'count',
  size: 60,
};