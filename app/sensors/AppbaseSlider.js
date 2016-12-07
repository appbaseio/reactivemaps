import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from '../middleware/ImmutableQuery.js';
import {manager} from '../middleware/ChannelManager.js';
import {HistoGramComponent} from './component/HistoGram.js';
import Slider from 'rc-slider';
var helper = require('../middleware/helper.js');
var Style = require('../helper/Style.js');

export class AppbaseSlider extends Component {

	constructor(props, context) {
		super(props);
		let minThreshold = this.props.minThreshold ? this.props.minThreshold : 0;
		let maxThreshold = this.props.maxThreshold ? this.props.maxThreshold : 5;
		let values = {};
		values.min = this.props.values.min < this.props.minThreshold ? this.props.minThreshold :  this.props.values.min;
		values.max = this.props.values.max < this.props.maxThreshold ? this.props.maxThreshold :  this.props.values.max;
		this.state = {
			values: values,
			minThreshold: minThreshold,
			maxThreshold: maxThreshold,
			currentValues: [],
			counts: [],
			rawData: {
				hits: {
					hits: []
				}
			}
		};
		this.type = 'range';
		this.handleValuesChange = this.handleValuesChange.bind(this);
		this.handleResults = this.handleResults.bind(this);
	}
	// Get the items from Appbase when component is mounted
	componentDidMount() {
		this.setQueryInfo();
		this.createChannel();
	}
	// Handle function when value slider option is changing
	handleValuesChange(component, values) {
		this.setState({
			values: values,
		});
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
			this.setData(data);
		}.bind(this));
	}
	setData(data) {
		try {
			this.addItemsToList(eval(`data.aggregations["${this.props.inputData}"].buckets`));
		} catch(e) {
			console.log(e);
		}
	}
	addItemsToList(newItems) {
		newItems = _.orderBy(newItems, ['key'], ['asc']);
		let itemLength = newItems.length;
		let min = this.props.minThreshold ? this.props.minThreshold : newItems[0].key;
		let max = this.props.maxThreshold ? this.props.maxThreshold : newItems[itemLength-1].key;
		if(itemLength > 1) {
			let rangeValue = {
				counts: this.countCalc(min, max, newItems),
				minThreshold: min,
				maxThreshold: max,
				values: {
					min: min,
					max: max
				}
			};
			this.setState(rangeValue, function() {
				this.handleResults(null, rangeValue.values);
			}.bind(this));
		}
	}
	countCalc(min, max, newItems) {
		let counts = [];
		for(let i = min; i <= max; i++) {
			let item = _.find(newItems, {'key': i});
			let val =  item ? item.doc_count : 0;
			counts.push(val);
		}
		return counts;
	}
	// Handle function when slider option change is completed
	handleResults(textVal, value) {
		let values;
		if(textVal) {
			values = {
				min: textVal[0],
				max: textVal[1]
			};
		} else {
			values = value;
		}
		var real_values = {
			from: values.min,
			to: values.max
		}
		var obj = {
			key: this.props.sensorId,
			value: real_values
		};
		helper.selectedSensor.set(obj, true);
		this.setState({
			currentValues: values,
			values: values
		});
	}
	render() {
		 let title =null,
			histogram = null,
			titleExists = false;

		if(this.props.title) {
			titleExists = true;
			title = (<h4 className="componentTitle col s12 col-xs-12">{this.props.title}</h4>);
		}
		if(this.state.counts && this.state.counts.length) {
			histogram = (<HistoGramComponent data={this.state.counts} />);
		}

		return (
			<div className="reactiveComponent sliderComponent card thumbnail col s12 col-xs-12">
				{title}
				{histogram}
				<div className="inputRangeContainer col s12 col-xs-12" style={{'margin': '25px 0'}}>
					<Slider range 
						defaultValue={[this.state.values.min, this.state.values.max]}
						min={this.state.minThreshold}
						max={this.state.maxThreshold}
						onAfterChange={this.handleResults}
					/>
				</div>
			</div>
		);
	}

}

AppbaseSlider.propTypes = {
	inputData: React.PropTypes.string.isRequired,
	minThreshold: React.PropTypes.number,
	maxThreshold: React.PropTypes.number,
	values: React.PropTypes.object,
};

AppbaseSlider.defaultProps = {
	values: {
		min: 0,
		max: 10
	},
	sort: 'count',
	size: 60,
	title: null
};

// context type
AppbaseSlider.contextTypes = {
	appbaseConfig: React.PropTypes.any.isRequired
};
