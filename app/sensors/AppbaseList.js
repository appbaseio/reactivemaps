import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {ItemCheckboxList} from './component/ItemCheckboxList.js';
import {ItemList} from './component/ItemList.js';
import {queryObject} from '../middleware/ImmutableQuery.js';
import {manager} from '../middleware/ChannelManager.js';
import {StaticSearch} from './component/StaticSearch.js';
var helper = require('../middleware/helper.js');

export class AppbaseList extends Component {

	constructor(props, context) {
		super(props);
		this.state = {
			items: [],
			storedItems: [],
			rawData: {
				hits: {
					hits: []
				}
			},
			defaultSelectAll: false
		};
		this.previousSelectedSensor = {};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.filterBySearch = this.filterBySearch.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.type = this.props.multipleSelect ? 'Terms' : 'Term';
	}
	componentWillMount() {
		this.defaultSelected = this.props.defaultSelected;
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
		var channelObj = manager.create(this.context.appbaseConfig, depends);
		channelObj.emitter.addListener(channelObj.channelId, function(res) {
			let data = res.data;
			let rawData;
			if(res.method === 'stream') {
				rawData = this.state.rawData;
				rawData.hits.hits.push(res.data);
			} else if(res.method === 'historic') {
				rawData = data;
			}
			this.setState({
				rawData: rawData
			});
			this.setData(rawData);
		}.bind(this));
	}
	setData(data) {
		if(data.aggregations && data.aggregations[this.props.inputData] && data.aggregations[this.props.inputData].buckets) {
			this.addItemsToList(data.aggregations[this.props.inputData].buckets);
		}
	}
	addItemsToList(newItems) {
		newItems = newItems.map((item) => {
			item.key = item.key.toString();
			item.status = this.defaultSelected && this.defaultSelected.indexOf(item.key) > -1 ? true : false;
			return item
		});
		this.setState({
			items: newItems,
			storedItems: newItems
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
	// selectAll
	selectAll(value, defaultSelected, cb) {
		let items = this.state.items.filter((item) => {item.status = value; return item; });
		if(value) {
			this.defaultSelected = defaultSelected;
		}
		this.setState({
			items: items,
			storedItems: items,
			defaultSelectAll: value
		}, cb);
	}
	// filter
	filterBySearch(value) {
		if(value) {
			let items = this.state.storedItems.filter(function(item) {
				return item.key && item.key.toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
			this.setState({
				items: items
			});
		} else {
			this.setState({
				items: this.state.storedItems
			});
		}
	}

	render() {
		// Checking if component is single select or multiple select
		let listComponent,
			searchComponent = null,
			title =null,
			titleExists = false;
		if (this.props.multipleSelect) {
			listComponent = <ItemCheckboxList
				items={this.state.items}
				onSelect={this.handleSelect}
				onRemove={this.handleRemove}
				showCount={this.props.showCount}
				selectAll={this.selectAll}
				defaultSelected={this.props.defaultSelected}
				includeSelectAll={this.props.includeSelectAll}/>
		}
		else {
			listComponent = <ItemList
				items={this.state.items}
				onSelect={this.handleSelect}
				onRemove={this.handleRemove}
				showCount={this.props.showCount}
				defaultSelected={this.props.defaultSelected}/>
		}

		// set static search
		if(this.props.staticSearch) {
			searchComponent = <StaticSearch
				placeholder={this.props.searchPlaceholder}
				changeCallback={this.filterBySearch}
			/>
		}

		if(this.props.title) {
			titleExists = true;
			title = (<h4 className="componentTitle col s12 col-xs-12">{this.props.title}</h4>);
		}

		let listClass = 'reactiveComponent listComponent staticSearch-'+this.props.staticSearch+' title-'+titleExists;

		return (
			<div className={"col s12 col-xs-12 card thumbnail "+listClass} style={this.props.defaultStyle}>
				{title}
				{searchComponent}
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
	includeSelectAll: React.PropTypes.bool
};
// Default props value
AppbaseList.defaultProps = {
	showCount: true,
	multipleSelect: true,
	sort: 'count',
	size: 60,
	staticSearch: false,
	title: null,
	searchPlaceholder: 'Search',
	includeSelectAll: false,
	defaultStyle: {
		height: '500px',
		overflow: 'auto'
	}
};

// context type
AppbaseList.contextTypes = {
	appbaseConfig: React.PropTypes.any.isRequired
};