/* eslint max-lines: 0 */
import React, { Component } from "react";
import {
	AppbaseSensorHelper as helper,
	AppbaseChannelManager as manager
} from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Slider from "rc-slider";
import Select from "react-select";

const _ = require("lodash");

export default class GeoDistanceSlider extends Component {
	constructor(props) {
		super(props);
		const value = this.props.defaultSelected && this.props.defaultSelected.distance ?
			this.props.defaultSelected.distance < this.props.range.start ?
			this.props.range.start : this.props.defaultSelected.distance : this.props.range.start;
		this.state = {
			currentValue: "",
			currentDistance: value + this.props.unit,
			userLocation: "",
			value
		};
		this.type = "geo_distance";
		this.locString = "";
		this.result = {
			options: []
		};
		this.sortInfo = {
			type: "_geo_distance",
			order: "asc",
			unit: "mi"
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.customQuery = this.customQuery.bind(this);
		this.getUserLocation = this.getUserLocation.bind(this);
		this.setDefaultLocation = this.setDefaultLocation.bind(this);
		this.handleValuesChange = this.handleValuesChange.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.unitFormatter = this.unitFormatter.bind(this);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	// Set query information
	componentDidMount() {
		this.defaultSelected = this.props.defaultSelected;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
	}

	componentWillUpdate() {
		if(!_.isEqual(this.defaultSelected, this.props.defaultSelected)) {
			this.defaultSelected = this.props.defaultSelected;
			this.checkDefault();
		}
	}

	componentWillUnmount() {
		if (this.channelId) {
			manager.stopStream(this.channelId);
		}
		if (this.channelListener) {
			this.channelListener.remove();
		}
	}

	checkDefault() {
		if(this.props.defaultSelected && this.props.defaultSelected.location) {
			let currentValue = this.props.defaultSelected.location;
			this.result.options.push({
				value: currentValue,
				label: currentValue
			});
			this.setState({
				currentValue
			}, this.getCoordinates(currentValue, this.handleResults));
		}
		else if(this.props.defaultSelected && this.props.defaultSelected.distance) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(this.props.defaultSelected.distance);
		}
		else {
			this.getUserLocation(this.setDefaultLocation);
		}
	}

	getUserLocation(cb) {
		navigator.geolocation.getCurrentPosition((location) => {
			this.locString = `${location.coords.latitude}, ${location.coords.longitude}`;

			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locString}`)
				.then((res) => {
					const userLocation = res.data.results[0].formatted_address;
					this.setState({
						userLocation
					});
				})
				.then(() => {
					if (cb) {
						cb();
					}
				});
		});
	}

	setDefaultLocation() {
		this.result.options.push({
			value: this.state.userLocation,
			label: "Use my current location"
		});
		if (this.props.autoLocation) {
			this.setState({
				currentValue: this.state.userLocation
			}, () => {
				this.executeQuery();
			});
		}
	}

	// set the query type and input data
	setQueryInfo() {
		const obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				appbaseField: this.props.appbaseField,
				customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	}

	// build query for this sensor only
	customQuery(value) {
		let query = null;
		if (value && value.currentValue !== "" && value.location !== "") {
			query = {
				[this.type]: {
					[this.props.appbaseField]: value.location,
					distance: value.currentDistance
				}
			};
		}
		return query;
	}

	// get coordinates
	getCoordinates(value, cb) {
		if (value && value !== "") {
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}`)
				.then((res) => {
					const location = res.data.results[0].geometry.location;
					this.locString = `${location.lat}, ${location.lng}`;
					if(cb) {
						cb(this.props.defaultSelected.distance);
					} else {
						this.executeQuery();
					}
				});
		} else {
			helper.selectedSensor.set(null, true);
		}
	}

	// execute query after changing location or distanc
	executeQuery() {
		if (this.state.currentValue !== "" && this.state.currentDistance && this.locString) {
			const obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					currentDistance: this.state.currentDistance,
					location: this.locString
				}
			};
			const sortObj = {
				key: this.props.componentId,
				value: {
					[this.sortInfo.type]: {
						[this.props.appbaseField]: this.locString,
						order: this.sortInfo.order,
						unit: this.sortInfo.unit
					}
				}
			};
			if(this.props.onValueChange) {
				this.props.onValueChange(obj.value);
			}
			helper.selectedSensor.setSortInfo(sortObj);
			helper.selectedSensor.set(obj, true);
		}
	}

	// handle the input change and pass the value inside sensor info
	handleChange(input, cb) {
		if (input) {
			const inputVal = input.value;
			this.setState({
				currentValue: inputVal
			});
			this.getCoordinates(inputVal, cb);
		} else {
			this.setState({
				currentValue: ""
			});
			const obj = {
				key: this.props.componentId,
				value: null
			};
			if(this.props.onValueChange) {
				this.props.onValueChange(obj.value);
			}
			helper.selectedSensor.set(obj, true);
		}
	}

	unitFormatter(v) {
		return `${v} ${this.props.unit}`;
	}

	// Handle function when value slider option is changing
	handleValuesChange(component, value) {
		this.setState({
			value
		});
	}

	// Handle function when slider option change is completed
	handleResults(value) {
		const distValue = value + this.props.unit;
		this.setState({
			value,
			currentDistance: distValue
		}, this.executeQuery.bind(this));
	}

	loadOptions(input, callback) {
		this.callback = callback;
		if (input) {
			const googleMaps = this.googleMaps || window.google.maps;
			this.autocompleteService = new googleMaps.places.AutocompleteService();
			const options = {
				input
			};
			this.result = {
				options: []
			};
			this.autocompleteService.getPlacePredictions(options, (res) => {
				res.forEach((place) => {
					this.result.options.push({
						label: place.description,
						value: place.description
					});
				});
				if (this.state.userLocation.length && this.result.options[0].label !== "Use my current location") {
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

	renderValue(option) {
		return <span>{option.value}</span>;
	}

	// render
	render() {
		let title = null,
			marks = {};

		if (this.props.title) {
			title = (<h4 className="rbc-title">{this.props.title}</h4>);
		}

		if (this.props.rangeLabels.start || this.props.rangeLabels.end) {
			marks = {
				[this.props.range.start]: this.props.rangeLabels.start,
				[this.props.range.end]: this.props.rangeLabels.end
			};
		}

		const cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder,
			"rbc-labels-active": this.props.rangeLabels.start || this.props.rangeLabels.end,
			"rbc-labels-inactive": !this.props.rangeLabels.start && !this.props.rangeLabels.end
		});

		return (
			<div className={`rbc rbc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 ${cx}`} style={this.props.componentStyle}>
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

					<div className="rbc-rangeslider-container col s12 col-xs-12">
						<Slider
							tipFormatter={this.unitFormatter}
							value={this.state.value}
							min={this.props.range.start}
							max={this.props.range.end}
							onChange={this.handleResults}
							marks={marks}
							step={this.props.stepValue}
						/>
					</div>
				</div>
			</div>
		);
	}
}

GeoDistanceSlider.propTypes = {
	componentId: React.PropTypes.string.isRequired,
	appbaseField: React.PropTypes.string.isRequired,
	title: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	customQuery: React.PropTypes.func,
	defaultSelected: React.PropTypes.shape({
		distance: React.PropTypes.number,
		location: React.PropTypes.string
	}),
	placeholder: React.PropTypes.string,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	stepValue: helper.stepValidation,
	range: React.PropTypes.shape({
		start: helper.validateThreshold,
		end: helper.validateThreshold
	}),
	rangeLabels: React.PropTypes.shape({
		start: React.PropTypes.string,
		end: React.PropTypes.string
	}),
	autoLocation: React.PropTypes.bool,
	onValueChange: React.PropTypes.func,
	componentStyle: React.PropTypes.object
};

// Default props value
GeoDistanceSlider.defaultProps = {
	stepValue: 1,
	unit: "mi",
	placeholder: "Search...",
	range: {
		start: 0,
		end: 10
	},
	rangeLabels: {
		start: null,
		end: null
	},
	autoLocation: true,
	componentStyle: {}
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
