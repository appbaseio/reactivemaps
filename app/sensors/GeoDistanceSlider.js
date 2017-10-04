/* eslint max-lines: 0 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
	TYPES,
	AppbaseSensorHelper as helper,
	AppbaseChannelManager as manager
} from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Slider from "rc-slider";
import Select from "react-select";

import _ from "lodash";

export default class GeoDistanceSlider extends Component {
	constructor(props) {
		super(props);
		this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId, false, true) : null;
		this.defaultSelected = this.urlParams !== null ? this.urlParams : this.props.defaultSelected;
		let value = this.defaultSelected && this.defaultSelected.distance ?
			this.defaultSelected.distance < this.props.range.start ?
			this.props.range.start : this.defaultSelected.distance : this.props.range.start;
		value = parseInt(value, 10);
		if (this.defaultSelected) {
			this.defaultSelected.distance = parseInt(this.defaultSelected.distance, 10);
		}
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

	// Set query information
	componentWillMount() {
		this.previousQuery = null;	// initial value for onQueryChange
		this.googleMaps = window.google.maps;
		this.getUserLocation();
		this.setQueryInfo();
		this.checkDefault();
		this.listenFilter();
	}

	componentWillUpdate() {
		if(!_.isEqual(this.defaultSelected, this.defaultSelected)) {
			this.defaultSelected = this.defaultSelected;
			this.checkDefault();
		}
	}

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
		this.urlParams = this.props.URLParams ? helper.URLParams.get(this.props.componentId, false, true) : null;
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
		else if(defaultValue && defaultValue.distance) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(defaultValue.distance);
		}
		else if(defaultValue === null) {
			this.setState({
				currentDistance: null,
				currentValue: ""
			}, this.executeQuery)
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
		const getQuery = (value) => {
			const currentQuery = this.props.customQuery ? this.props.customQuery(value) : this.customQuery(value);
			if (this.props.onQueryChange && JSON.stringify(this.previousQuery) !== JSON.stringify(currentQuery)) {
				this.props.onQueryChange(this.previousQuery, currentQuery);
			}
			this.previousQuery = currentQuery;
			return currentQuery;
		};
		const obj = {
			key: this.props.componentId,
			value: {
				queryType: this.type,
				dataField: this.props.dataField,
				customQuery: getQuery,
				reactiveId: this.context.reactiveId,
				showFilter: this.props.showFilter,
				filterLabel: this.props.filterLabel ? this.props.filterLabel : this.props.componentId,
				component: "GeoDistanceSlider",
				defaultSelected: this.urlParams !== null ? this.urlParams : this.props.defaultSelected
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
					[this.props.dataField]: value.location,
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
						cb(this.defaultSelected.distance);
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
						[this.props.dataField]: this.locString,
						order: this.sortInfo.order,
						unit: this.sortInfo.unit
					}
				}
			};

			const execQuery = () => {
				if(this.props.onValueChange) {
					this.props.onValueChange({
						input: this.state.currentValue,
						distance: this.state.currentDistance,
						location: this.locString,
						unit: this.props.unit
					});
				}
				helper.selectedSensor.setSortInfo(sortObj);
				if(this.props.URLParams) {
					helper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: this.state.currentValue,
					distance: this.state.currentDistance,
					location: this.locString,
					unit: this.props.unit
				})
				.then(() => {
					execQuery();
				})
				.catch((e) => {
					console.warn(`${this.props.componentId} - beforeValueChange rejected the promise with`, e);
				});
			} else {
				execQuery();
			}
		} else if(this.state.currentDistance === null && this.state.currentValue === "") {
			const execNullQuery = () => {
				if(this.props.onValueChange) {
					this.props.onValueChange(null);
				}
				const obj = {
					key: this.props.componentId,
					value: null
				};
				if(this.props.URLParams) {
					helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			}

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange(null)
				.then(() => {
					execNullQuery();
				})
				.catch((e) => {
					console.warn(`${this.props.componentId} - beforeValueChange rejected the promise with`, e);
				});
			} else {
				execNullQuery();
			}
		}
	}

	setURLValue(){
		let distance = this.state.currentDistance.split(this.props.unit);
		distance = distance[0];
		return JSON.stringify({
			location: this.state.currentValue,
			distance
		});
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

			const execQuery = () => {
				if(this.props.onValueChange) {
					this.props.onValueChange({
						input: null,
						distance: this.state.currentDistance,
						location: null,
						unit: this.props.unit
					});
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: null,
					distance: this.state.currentDistance,
					location: null,
					unit: this.props.unit
				})
				.then(() => {
					execQuery();
				})
				.catch((e) => {
					console.warn(`${this.props.componentId} - beforeValueChange rejected the promise with`, e);
				});
			} else {
				execQuery();
			}
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
		}, this.props.className);

		return (
			<div className={`rbc rbc-geodistanceslider clearfix card thumbnail col s12 col-xs-12 ${cx}`} style={this.props.style}>
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
							defaultValue={this.state.value}
							min={this.props.range.start}
							max={this.props.range.end}
							onAfterChange={this.handleResults}
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
	componentId: PropTypes.string.isRequired,
	dataField: PropTypes.string.isRequired,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	customQuery: PropTypes.func,
	defaultSelected: PropTypes.shape({
		distance: PropTypes.number,
		location: PropTypes.string
	}),
	placeholder: PropTypes.string,
	unit: PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	stepValue: helper.stepValidation,
	range: PropTypes.shape({
		start: helper.validateThreshold,
		end: helper.validateThreshold
	}),
	rangeLabels: PropTypes.shape({
		start: PropTypes.string,
		end: PropTypes.string
	}),
	autoLocation: PropTypes.bool,
	beforeValueChange: PropTypes.func,
	onValueChange: PropTypes.func,
	style: PropTypes.object,
	URLParams: PropTypes.bool,
	showFilter: PropTypes.bool,
	filterLabel: PropTypes.string,
	className: PropTypes.string,
	onQueryChange: PropTypes.func
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
	style: {},
	URLParams: false,
	showFilter: true
};

// context type
GeoDistanceSlider.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired,
	reactiveId: PropTypes.number
};

GeoDistanceSlider.types = {
	componentId: TYPES.STRING,
	dataField: TYPES.STRING,
	dataFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	range: TYPES.OBJECT,
	rangeLabels: TYPES.OBJECT,
	stepValue: TYPES.NUMBER,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	style: TYPES.OBJECT,
	beforeValueChange: TYPES.FUNCTION,
	onValueChange: TYPES.FUNCTION,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING,
	className: TYPES.STRING,
	onQueryChange: TYPES.FUNCTION
};
