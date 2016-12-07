import {default as React, Component} from 'react';
import { render } from 'react-dom';
import { manager } from '../middleware/ChannelManager.js';
var helper = require('../middleware/helper.js');

export class AppbaseButtonGroup extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			selected: null
		};
		this.type = 'match';
		this.handleChange = this.handleChange.bind(this);
		this.defaultQuery = this.defaultQuery.bind(this);
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
		if(this.props.defaultSelected) {
			this.handleChange(this.props.defaultSelected);
		}
	}

	// set the query type and input data
	setQueryInfo() {
		let obj = {
			key: this.props.sensorId,
			value: {
				queryType: this.type,
				inputData: this.props.inputData,
				defaultQuery: this.defaultQuery
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	}

	// build query for this sensor only
	defaultQuery(value) {
		return {
			'term': {
				[this.props.inputData]: value
			}
		};
	}

	// use this only if want to create actuators
	// Create a channel which passes the depends and receive results whenever depends changes
	createChannel() {
		let depends = this.props.depends ? this.props.depends : {};
		var channelObj = manager.create(this.context.appbaseConfig, depends);

	}

	// handle the input change and pass the value inside sensor info
	handleChange(record) {
		this.setState({
			'selected': record
		});
		var obj = {
			key: this.props.sensorId,
			value: record
		};
		// pass the selected sensor value with sensorId as key,
		let isExecuteQuery = true;
		helper.selectedSensor.set(obj, isExecuteQuery);
	}
	renderButtons() {
		let buttons;
		let selectedText = this.state.selected && this.state.selected.text ? this.state.selected.text : '';
		if(this.props.data) {
			buttons = this.props.data.map((record, i) => {
				return (
					<button key={i} className={"ab-buttonGroup-button btn "+ (selectedText === record.text ? 'red' : '')}
						onClick={() => this.handleChange(record)} title={record.title ? record.title: record.text}>
						{record.text}
					</button>
				);
			});
		}
		return buttons;
	}
	// render
	render() {
		let title, titleExists;
		if(this.props.title) {
			titleExists = true;
			title = (<h4 className="componentTitle col s12 col-xs-12">{this.props.title}</h4>);
		}
		return (
			<div className={"col s12 col-xs-12 card thumbnail ab-buttonGroupComponent reactiveComponent"} style={this.props.defaultStyle}>
				<div className="row">
					{title}
					<div className="col s12 col-xs-12">
						{this.renderButtons()}
					</div>
				</div>
			</div>
		);
	}
}

AppbaseButtonGroup.propTypes = {
	inputData: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	data: React.PropTypes.any.isRequired
};
// Default props value
AppbaseButtonGroup.defaultProps = {
	placeholder: "Search...",
	size: 10
};

// context type
AppbaseButtonGroup.contextTypes = {
	appbaseConfig: React.PropTypes.any.isRequired
};