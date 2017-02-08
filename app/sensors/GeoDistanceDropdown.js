import { default as React, Component } from 'react';
import {
	AppbaseChannelManager as manager,
	AppbaseSensorHelper as helper
} from '@appbaseio/reactivebase';

import classNames from 'classnames';
import axios from 'axios';
import Slider from 'rc-slider';
import Select from 'react-select';

export class GeoDistanceDropdown extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			selected: {},
			currentValue: '',
			userLocation: ''
		};
		this.type = 'geo_distance_range';
		this.locString = '';
		this.unit = this.props.unit;
		this.result = {
			options: []
		};
		this.sortInfo = {
			type: '_geo_distance',
			order: 'asc',
			unit: this.unit
		};

		if (this.props.defaultSelected) {
			let selected = this.props.data.filter(item => item.label === this.props.defaultSelected);
			if (selected[0]) {
				this.state.selected = selected[0];
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.defaultQuery = this.defaultQuery.bind(this);
		this.handleDistanceChange = this.handleDistanceChange.bind(this);
		this.renderValue = this.renderValue.bind(this);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	componentWillReceiveProps(nextProps) {
		setTimeout(() => {
			if (nextProps.defaultSelected != this.props.defaultSelected) {
				let selected = nextProps.data.filter(item => item.label === this.props.defaultSelected);
				if (selected[0]) {
					this.setState({
						selected: selected[0]
					})
				}
			}
			if (nextProps.unit != this.unit) {
				this.unit = nextProps.unit;
				this.executeQuery();
			}
		}, 300);
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
		this.getUserLocation();
	}

	getUserLocation() {
		navigator.geolocation.getCurrentPosition((location) => {
			this.locString = location.coords.latitude + ', ' + location.coords.longitude;

			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locString}`)
				.then(res => {
					let currentValue = res.data.results[0].formatted_address;
					this.result.options.push({
						value: currentValue,
						label: currentValue
					});
					this.setState({
						currentValue: currentValue,
						userLocation: currentValue
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
				appbaseField: this.props.appbaseField,
				defaultQuery: this.defaultQuery
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	}

	// build query for this sensor only
	defaultQuery(value) {
		if(value && value.start >= 0 && value.end >=0 && value.location != '') {
			return {
				[this.type]: {
					[this.props.appbaseField]: value.location,
					"from": value.start + this.unit,
					"to": value.end + this.unit
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

	// execute query after changing location or distance
	executeQuery() {
		if (this.state.currentValue != '' && this.state.selected && this.locString) {
			var obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString
				}
			};
			let sortObj = {
				key: this.props.componentId,
				value: {
					[this.sortInfo.type]: {
						[this.props.appbaseField]: this.locString,
						'order': this.sortInfo.order,
						'unit': this.unit
					}
				}
			};
			helper.selectedSensor.setSortInfo(sortObj);
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
						label: place.description,
						value: place.description
					});
				});
				if (this.result.options[0]["label"] != "Use my current location") {
					this.result.options.unshift({
						label: "Use my current location",
						value: this.state.userLocation
					});
				}
				this.callback(null, this.result);
			});
		} else {
			this.callback(null, this.result);
		}
	}

	handleDistanceChange(input) {
		this.setState({
			selected: {
				start: input.start,
				end: input.end,
				label: input.label
			}
		}, this.executeQuery.bind(this));
	}

	renderValue(option) {
		return <span>{option.value}</span>;
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
			<div className={`rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 ${cx}`}>
				<div className="row">
					{title}
					<div className="rbc-search-container col s12 col-xs-12">
						<Select.Async
							value={this.state.currentValue}
							loadOptions={this.loadOptions}
							placeholder={this.props.placeholder}
							onChange={this.handleChange}
							filterOption={() => true}
							valueRenderer={this.renderValue}
							/>
					</div>
					<div className="col s12 col-xs-12">
						<Select
							value={this.state.selected.label ? this.state.selected : ''}
							options={this.props.data}
							clearable={false}
							searchable={false}
							onChange={this.handleDistanceChange}
							placeholder="Select Distance"
							/>
					</div>
				</div>
			</div>
		);
	}
}

GeoDistanceDropdown.propTypes = {
	appbaseField: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	unit: React.PropTypes.string,
	data: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			start: helper.validateThreshold,
			end: helper.validateThreshold,
			label: React.PropTypes.string.isRequired
		})
	)
};
// Default props value
GeoDistanceDropdown.defaultProps = {
	unit: 'mi',
	placeholder: "Search..."
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
