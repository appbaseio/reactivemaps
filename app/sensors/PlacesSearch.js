import { default as React, Component } from 'react';
import {
	AppbaseChannelManager as manager,
	AppbaseSensorHelper as helper
} from '@appbaseio/reactivebase';

import classNames from 'classnames';
import axios from 'axios';
import Select from 'react-select';

export class PlacesSearch extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			currentValue: '',
			currentDistance: 0,
			value: 0
		};
		this.type = 'match';
		this.locString = '';
		this.result = {
			options: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.defaultQuery = this.defaultQuery.bind(this);
		this.handleValuesChange = this.handleValuesChange.bind(this);
		this.handleResults = this.handleResults.bind(this);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
		if(this.props.autoLocation) {
			this.getUserLocation();
		}
	}

	getUserLocation() {
		navigator.geolocation.getCurrentPosition((location) => {
			this.locString = location.coords.latitude + ', ' + location.coords.longitude;
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locString}`)
				.then(res => {
					let currentValue = res.data.results[0].formatted_address;
					this.result.options.push({
						'value': currentValue,
						'label': currentValue
					});
					this.setState({
						currentValue: currentValue
					}, this.executeQuery.bind(this));
				});
		});
	}

	// set the query type and input data
	setQueryInfo() {
		let obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				inputData: this.props.appbaseField,
				defaultQuery: this.defaultQuery
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	}

	// build query for this sensor only
	defaultQuery(value) {
		if(value && value.currentValue != '' && value.location != '') {
			return {
				[this.type]: {
					[this.props.appbaseField]: value.location,
					'distance': value.currentDistance
				}
			}
		} else {
			return;
		}
	}

	// get coordinates
	getCoordinates(value) {
		if(value && value != '') {
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}`)
				.then(res => {
					let location = res.data.results[0].geometry.location;
					this.locString = location.lat + ', ' + location.lng;
					this.executeQuery();
				});
		} else {
			helper.selectedSensor.set(null, true);
		}
	}

	// execute query after changing location or distanc
	executeQuery() {
		if (this.state.currentValue != '' && this.locString) {
			var obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					location: this.locString
				}
			};
			helper.selectedSensor.set(obj, true);
		}
	}

	// use this only if want to create actuators
	// Create a channel which passes the actuate and receive results whenever actuate changes
	createChannel() {
		let actuate = this.props.actuate ? this.props.actuate : {};
		var channelObj = manager.create(this.context.appbaseRef, this.context.type, actuate);
	}

	// handle the input change and pass the value inside sensor info
	handleChange(input) {
		if (input) {
			let inputVal = input.value;
			this.setState({
				'currentValue': inputVal
			});
			this.getCoordinates(inputVal);
		}
		else {
			this.setState({
				'currentValue': ''
			});
		}
	}

	// Handle function when value slider option is changing
	handleValuesChange(component, value) {
		this.setState({
			value: value,
		});
	}

	// Handle function when slider option change is completed
	handleResults(component, value) {
		value = value + this.props.unit;
		this.setState({
			currentDistance: value
		}, this.executeQuery.bind(this));
	}

	loadOptions(input, callback) {
		this.callback = callback;
		if (input) {
			let googleMaps = this.googleMaps || window.google.maps;
			this.autocompleteService = new googleMaps.places.AutocompleteService();
			let options = {
				input: input
			}
			this.result = {
				options: []
			};
			this.autocompleteService.getPlacePredictions(options, res => {
				res.map(place => {
					this.result.options.push({
						'value': place.description,
						'label': place.description
					});
				})
				this.callback(null, this.result);
			});
		} else {
			this.callback(null, this.result);
		}
	}

	// render
	render() {
		let title = null;
		if(this.props.title) {
			title = (<h4 className="rbc-title">{this.props.title}</h4>);
		}

		let cx = classNames({
			'rbc-title-active': this.props.title,
			'rbc-title-inactive': !this.props.title,
			'rbc-placeholder-active': this.props.placeholder,
			'rbc-placeholder-inactive': !this.props.placeholder
		});

		return (
			<div className={`rbc rbc-placessearch clearfix card thumbnail col s12 col-xs-12 ${cx}`}>
				<div className="row">
					{title}
					<div className="col s12 col-xs-12">
						<Select.Async
							value={this.state.currentValue}
							loadOptions={this.loadOptions}
							placeholder={this.props.placeholder}
							onChange={this.handleChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

PlacesSearch.propTypes = {
	appbaseField: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string
};
// Default props value
PlacesSearch.defaultProps = {
	placeholder: "Search...",
	autoLocation: true
};

// context type
PlacesSearch.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
