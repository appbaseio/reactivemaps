import React, { Component } from "react";
import {
	AppbaseSensorHelper as helper
} from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Select from "react-select";

const _ = require("lodash");

export default class GeoDistanceDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			currentValue: "",
			userLocation: ""
		};
		this.type = "geo_distance_range";
		this.locString = "";
		this.unit = this.props.unit;
		this.result = {
			options: []
		};
		this.sortInfo = {
			type: "_geo_distance",
			order: "asc",
			unit: this.unit
		};
		this.allowedUnit = ["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"];

		if (this.props.defaultSelected) {
			const selected = this.props.data.filter(item => item.label === this.props.defaultSelected);
			if (selected[0]) {
				this.state.selected = selected[0];
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.customQuery = this.customQuery.bind(this);
		this.getUserLocation = this.getUserLocation.bind(this);
		this.setDefaultLocation = this.setDefaultLocation.bind(this);
		this.handleDistanceChange = this.handleDistanceChange.bind(this);
		this.renderValue = this.renderValue.bind(this);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	// Set query information
	componentDidMount() {
		this.defaultSelected = this.props.defaultSelected;
		this.unit = this.props.unit;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
	}

	componentWillUpdate() {
		if(!_.isEqual(this.defaultSelected, this.props.defaultSelected)) {
			this.defaultSelected = this.props.defaultSelected;
			this.checkDefault();
		}
		if(this.props.unit !== this.unit) {
			const selected = this.allowedUnit.filter(item => item === this.props.unit);
			if (selected[0]) {
				this.unit = this.props.unit;
				this.executeQuery();
			}
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
		else if(this.props.defaultSelected && this.props.defaultSelected.label) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(this.props.defaultSelected.label);
		}
		else {
			this.getUserLocation(this.setDefaultLocation);
		}
	}


	handleResults(distance) {
		const selected = this.props.data.filter(item => item.label === distance);
		if (selected[0]) {
			this.setState({
				selected: selected[0]
			}, this.executeQuery);
		}
	}

	getUserLocation(cb) {
		navigator.geolocation.getCurrentPosition((location) => {
			this.locString = `${location.coords.latitude}, ${location.coords.longitude}`;

			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locString}`)
				.then((res) => {
					const currentValue = res.data.results[0].formatted_address;
					this.setState({
						userLocation: currentValue
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
			label: this.state.userLocation
		});
		this.setState({
			currentValue: this.state.userLocation
		}, () => {
			this.executeQuery();
		});
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
		if (value && value.start >= 0 && value.end >= 0 && value.location !== "") {
			query = {
				[this.type]: {
					[this.props.appbaseField]: value.location,
					from: value.start + this.unit,
					to: value.end + this.unit
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
						cb.call(this, this.props.defaultSelected.label);
					} else {
						this.executeQuery();
					}
				});
		} else {
			helper.selectedSensor.set(null, true);
		}
	}

	// execute query after changing location or distance
	executeQuery() {
		if (this.state.currentValue !== "" && this.state.selected && this.locString) {
			const obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString,
					unit: this.unit
				}
			};
			const sortObj = {
				key: this.props.componentId,
				value: {
					[this.sortInfo.type]: {
						[this.props.appbaseField]: this.locString,
						order: this.sortInfo.order,
						unit: this.unit
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
	handleChange(input) {
		if (input) {
			const inputVal = input.value;
			this.setState({
				currentValue: inputVal
			});
			this.getCoordinates(inputVal);
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

		if (this.props.title) {
			title = (<h4 className="rbc-title">{this.props.title}</h4>);
		}

		const cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder
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
							value={this.state.selected.label ? this.state.selected : ""}
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
	componentId: React.PropTypes.string.isRequired,
	appbaseField: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
	customQuery: React.PropTypes.func,
	defaultSelected: React.PropTypes.shape({
		label: React.PropTypes.string,
		location: React.PropTypes.string
	}),
	placeholder: React.PropTypes.string,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	data: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			start: helper.validateThreshold,
			end: helper.validateThreshold,
			label: React.PropTypes.string.isRequired
		})
	),
	onValueChange: React.PropTypes.func
};

// Default props value
GeoDistanceDropdown.defaultProps = {
	unit: "mi",
	placeholder: "Search..."
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
