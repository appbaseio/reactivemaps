import {default as React, Component} from 'react';
import { render } from 'react-dom';
import { manager } from '../middleware/ChannelManager.js';
var helper = require('../middleware/helper.js');

export class InputField extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			currentValue: ''
		};
		this.type = 'match';
		this.handleChange = this.handleChange.bind(this);
		this.defaultQuery = this.defaultQuery.bind(this);
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
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
	handleChange(event) {
		let inputVal = event.target.value;
		this.setState({
			'currentValue': inputVal
		});
		var obj = {
			key: this.props.sensorId,
			value: inputVal
		};

		// pass the selected sensor value with sensorId as key,
		let isExecuteQuery = true;
		helper.selectedSensor.set(obj, isExecuteQuery);
	}

	// render
	render() {
		return (
			<div className="appbaseSearchComponent reactiveComponent">
				<input type="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.state.currentValue} />
			</div>
		);
	}
}

InputField.propTypes = {
	inputData: React.PropTypes.string,
	placeholder: React.PropTypes.string
};
// Default props value
InputField.defaultProps = {
	placeholder: "Search...",
	size: 10
};

// context type
InputField.contextTypes = {
	appbaseConfig: React.PropTypes.any.isRequired
};