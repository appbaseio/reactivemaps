import React, { Component } from "react";
import {
	TYPES,
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
		this.urlParams = helper.URLParams.get(this.props.componentId, false, true);
		this.defaultSelected = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		if (this.defaultSelected) {
			const selected = this.props.data.filter(item => item.label === this.defaultSelected);
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
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	// Set query information
	componentDidMount() {
		this.unit = this.props.unit;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
		this.listenFilter();
	}

	componentWillUpdate() {
		const defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		if(!_.isEqual(this.defaultSelected, defaultValue)) {
			this.defaultSelected = defaultValue;
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

	// stop streaming request and remove listener when component will unmount
	componentWillUnmount() {
		if(this.filterListener) {
			this.filterListener.remove();
		}
	}

	listenFilter() {
		this.filterListener = helper.sensorEmitter.addListener("clearFilter", (data) => {
			if(data === this.props.componentId) {
				this.defaultValue = null;
				this.changeValue(this.defaultValue);
			}
		});
	}

	checkDefault() {
		this.urlParams = helper.URLParams.get(this.props.componentId, false, true);
		const defaultValue = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		this.changeValue(defaultValue);
	}

	changeValue(defaultValue) {
		if(defaultValue && defaultValue.location) {
			let currentValue = defaultValue.location;
			this.result.options.push({
				value: currentValue,
				label: currentValue
			});
			this.setState({
				currentValue
			}, this.getCoordinates(currentValue, this.handleResults));
		}
		else if(defaultValue && defaultValue.label) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(defaultValue.label);
		}
		else if(defaultValue === null) {
			this.setState({
				selected: null,
				currentValue: ""
			}, this.executeQuery)
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
				customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery,
				reactiveId: this.context.reactiveId,
				allowFilter: this.props.allowFilter,
				component: "GeoDistanceDropdown"
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
						cb.call(this, this.defaultSelected.label);
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
			helper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
			helper.selectedSensor.set(obj, true);
		} else if(this.state.selected === null && this.state.currentValue === "") {
			const obj = {
				key: this.props.componentId,
				value: null
			};
			helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
			helper.selectedSensor.set(obj, true);
		}
	}

	setURLValue(){
		return JSON.stringify({
			location: this.state.currentValue,
			label: this.state.selected.label
		});
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
			helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
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
			<div className={`rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 ${cx}`} style={this.props.componentStyle}>
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
							value={this.state.selected && this.state.selected.label ? this.state.selected : ""}
							options={this.props.data}
							clearable={false}
							searchable={false}
							onChange={this.handleDistanceChange}
							placeholder={this.props.placeholderDropdown}
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
	title: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	customQuery: React.PropTypes.func,
	defaultSelected: React.PropTypes.shape({
		label: React.PropTypes.string,
		location: React.PropTypes.string
	}),
	placeholder: React.PropTypes.string,
	placeholderDropdown: React.PropTypes.string,
	autoLocation: React.PropTypes.bool,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	data: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			start: helper.validateThreshold,
			end: helper.validateThreshold,
			label: React.PropTypes.string.isRequired
		})
	),
	onValueChange: React.PropTypes.func,
	componentStyle: React.PropTypes.object,
	URLParams: React.PropTypes.bool,
	allowFilter: React.PropTypes.bool
};

// Default props value
GeoDistanceDropdown.defaultProps = {
	unit: "mi",
	placeholder: "Search...",
	placeholderDropdown: "Select Distance",
	autoLocation: true,
	componentStyle: {},
	URLParams: false,
	allowFilter: true
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired,
	reactiveId: React.PropTypes.number
};

GeoDistanceDropdown.types = {
	componentId: TYPES.STRING,
	appbaseField: TYPES.STRING,
	appbaseFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	data: TYPES.ARRAY,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	placeholderDropdown: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	componentStyle: TYPES.OBJECT,
	URLParams: TYPES.BOOLEAN,
	allowFilter: TYPES.BOOLEAN
};
