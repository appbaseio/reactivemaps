import { default as React, Component } from 'react';
import {
	AppbaseChannelManager as manager,
	AppbaseSensorHelper as helper
} from '@appbaseio/reactivebase';

import classNames from 'classnames';
import axios from 'axios';
import Slider from 'rc-slider';
import Select from 'react-select';

export class GeoDistanceSlider extends Component {
	constructor(props, context) {
		super(props);
		let value = this.props.value < this.props.minThreshold ? this.props.minThreshold :  this.props.value;
		this.state = {
			currentValue: '',
			currentDistance: this.props.value + this.props.unit,
			value: value
		};
		this.type = 'geo_distance';
		this.locString = '';
		this.result = {
			options: []
		};
		this.sortInfo = {
			type: '_geo_distance',
			order: 'asc',
			unit: 'mi'
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.defaultQuery = this.defaultQuery.bind(this);
		this.handleValuesChange = this.handleValuesChange.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.unitFormatter = this.unitFormatter.bind(this);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
		this.getUserLocation();
	}

	componentWillReceiveProps(nextProps) {
		setTimeout(() => {
			this.handleResults(nextProps.value);
		}, 300);
	}

	componentWillUnmount() {
		if(this.channelId) {
			manager.stopStream(this.channelId);
		}
		if(this.channelListener) {
			this.channelListener.remove();
		}
	}

	getUserLocation() {
		navigator.geolocation.getCurrentPosition((location) => {
			this.locString = location.coords.latitude + ', ' + location.coords.longitude;

			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locString}&key=${this.props.APIkey}`)
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
			key: this.props.sensorId,
			value: {
				queryType: this.type,
				appbaseField: this.props.appbaseField,
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
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${this.props.APIkey}`)
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
		if (this.state.currentValue != '' && this.state.currentDistance && this.locString) {
			var obj = {
				key: this.props.sensorId,
				value: {
					currentValue: this.state.currentValue,
					currentDistance: this.state.currentDistance,
					location: this.locString
				}
			};
			let sortObj = {
				key: this.props.sensorId,
				value: {
					[this.sortInfo.type]: {
						[this.props.appbaseField]: this.locString,
						'order': this.sortInfo.order,
						'unit': this.sortInfo.unit
					}
				}
			};
			helper.selectedSensor.setSortInfo(sortObj);
			helper.selectedSensor.set(obj, true);
		}
	}

	// use this only if want to create actuators
	// Create a channel which passes the depends and receive results whenever depends changes
	createChannel() {
		let depends = this.props.depends ? this.props.depends : {};
		var channelObj = manager.create(this.context.appbaseRef, this.context.type, depends);
		this.channelId = channelObj.channelId;
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

	unitFormatter(v) {
		return v+' '+this.props.unit;
	}

	// Handle function when value slider option is changing
	handleValuesChange(component, value) {
		this.setState({
			value: value,
		});
	}

	// Handle function when slider option change is completed
	handleResults(value) {
		let distValue = value + this.props.unit;
		this.setState({
			value: value,
			currentDistance: distValue
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
			title = (<h4 className="rmc-title">{this.props.title}</h4>);
		}

		let cx = classNames({
			'rmc-title-active': this.props.title,
			'rmc-title-inactive': !this.props.title,
			'rmc-placeholder-active': this.props.placeholder,
			'rmc-placeholder-inactive': !this.props.placeholder
		});

		return (
			<div className={`rmc rmc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 ${cx}`}>
				<div className="row">
					{title}
					<div className="col s12 col-xs-12">
						<Select.Async
							value={this.state.currentValue}
							loadOptions={this.loadOptions}
							placeholder={this.props.placeholder}
							onChange={this.handleChange}
							/>

						<div className="col s12 col-xs-12"
							style={{'padding': '20px 0'}}
							>
							<Slider
								tipFormatter={this.unitFormatter}
								value={this.state.value}
								min={this.props.minThreshold}
								max={this.props.maxThreshold}
								onChange={this.handleResults}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

GeoDistanceSlider.propTypes = {
	appbaseField: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string
};
// Default props value
GeoDistanceSlider.defaultProps = {
	value: 1,
	unit: 'km',
	placeholder: "Search...",
	size: 10
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
