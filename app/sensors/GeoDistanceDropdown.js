import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
	TYPES,
	AppbaseSensorHelper as helper
} from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Select from "react-select";

import _ from "lodash";

export default class GeoDistanceDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			currentValue: null,
			userLocation: null
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
		this.urlParams = props.URLParams ? helper.URLParams.get(props.componentId, false, true) : null;
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

	// Set query information
	componentWillMount() {
		this.previousQuery = null;	// initial value for onQueryChange
		this.googleMaps = window.google.maps;
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
				currentValue: {
					value: currentValue,
					label: currentValue
				}
			}, this.getCoordinates(currentValue, this.handleResults));
		}
		else if(defaultValue && defaultValue.label) {
			this.getUserLocation(this.setDefaultLocation);
			this.handleResults(defaultValue.label);
		}
		else if(defaultValue === null) {
			this.setState({
				selected: null,
				currentValue: null
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
					if (res.data.results) {
						const userLocation = res.data.results[0].formatted_address;
						this.setState({
							userLocation
						});
					}
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
				currentValue: {
					value: this.state.userLocation,
					label: this.state.userLocation
				}
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
				component: "GeoDistanceDropdown",
				defaultSelected: this.urlParams !== null ? this.urlParams : this.props.defaultSelected
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
					[this.props.dataField]: value.location,
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
					if (res.data.results) {
						const location = res.data.results[0].geometry.location;
						this.locString = `${location.lat}, ${location.lng}`;
						if(cb) {
							cb.call(this, this.defaultSelected.label);
						} else {
							this.executeQuery();
						}
					}
				});
		} else {
			helper.selectedSensor.set(null, true);
		}
	}

	// execute query after changing location or distance
	executeQuery() {
		if (this.state.currentValue && this.state.selected && this.locString) {
			const obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue.value,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString,
					unit: this.unit
				}
			};

			const execQuery = () => {
				if(this.props.onValueChange) {
					this.props.onValueChange({
						input: this.state.currentValue.value,
						start: this.state.selected.start,
						end: this.state.selected.end,
						location: this.locString,
						unit: this.unit
					});
				}
				helper.selectedSensor.setSortInfo(sortObj);
				if(this.props.URLParams) {
					helper.URLParams.update(this.props.componentId, this.setURLValue(), this.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			const sortObj = {
				key: this.props.componentId,
				value: {
					[this.sortInfo.type]: {
						[this.props.dataField]: this.locString,
						order: this.sortInfo.order,
						unit: this.unit
					}
				}
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: this.state.currentValue,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: this.locString,
					unit: this.unit
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
		} else if(!this.state.selected && !this.state.currentValue) {
			const execNullQuery = () => {
				const obj = {
					key: this.props.componentId,
					value: null
				};
				if(this.props.onValueChange) {
					this.props.onValueChange(null);
				}
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
		return JSON.stringify({
			location: this.state.currentValue.value,
			label: this.state.selected.label
		});
	}

	// handle the input change and pass the value inside sensor info
	handleChange(input) {
		if (input) {
			this.setState({
				currentValue: input
			});
			this.getCoordinates(input.value);
		} else {
			this.setState({
				currentValue: null
			});
			const obj = {
				key: this.props.componentId,
				value: null
			};

			const execQuery = () => {
				if(this.props.onValueChange) {
					this.props.onValueChange({
						input: null,
						start: this.state.selected.start,
						end: this.state.selected.end,
						location: null,
						unit: this.unit
					});
				}
				if(this.props.URLParams) {
					helper.URLParams.update(this.props.componentId, null, this.props.URLParams);
				}
				helper.selectedSensor.set(obj, true);
			};

			if (this.props.beforeValueChange) {
				this.props.beforeValueChange({
					input: null,
					start: this.state.selected.start,
					end: this.state.selected.end,
					location: null,
					unit: this.unit
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

		const data = this.props.data.map(item => {
			item.value = item.label;
			return item;
		});

		const cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title,
			"rbc-placeholder-active": this.props.placeholder,
			"rbc-placeholder-inactive": !this.props.placeholder
		}, this.props.className);

		return (
			<div className={`rbc rbc-geodistancedropdown clearfix card thumbnail col s12 col-xs-12 ${cx}`} style={this.props.style}>
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
							name="distance"
							placeholder={this.props.placeholderDropdown}
							value={this.state.selected && this.state.selected.label ? this.state.selected : ""}
							options={data}
							onChange={this.handleDistanceChange}
							clearable={false}
							searchable={false}
						/>
					</div>
				</div>
			</div>
		);
	}
}

GeoDistanceDropdown.propTypes = {
	componentId: PropTypes.string.isRequired,
	dataField: PropTypes.string.isRequired,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	customQuery: PropTypes.func,
	defaultSelected: PropTypes.shape({
		label: PropTypes.string,
		location: PropTypes.string
	}),
	placeholder: PropTypes.string,
	placeholderDropdown: PropTypes.string,
	autoLocation: PropTypes.bool,
	unit: PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"]),
	data: PropTypes.arrayOf(
		PropTypes.shape({
			start: helper.validateThreshold,
			end: helper.validateThreshold,
			label: PropTypes.string.isRequired
		})
	),
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
GeoDistanceDropdown.defaultProps = {
	unit: "mi",
	placeholder: "Search...",
	placeholderDropdown: "Select Distance",
	autoLocation: true,
	style: {},
	URLParams: false,
	showFilter: true
};

// context type
GeoDistanceDropdown.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired,
	reactiveId: PropTypes.number
};

GeoDistanceDropdown.types = {
	componentId: TYPES.STRING,
	dataField: TYPES.STRING,
	dataFieldType: TYPES.GEO_POINT,
	title: TYPES.STRING,
	data: TYPES.ARRAY,
	unit: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	defaultSelected: TYPES.OBJECT,
	placeholder: TYPES.STRING,
	placeholderDropdown: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	beforeValueChange: TYPES.FUNCTION,
	onValueChange: TYPES.FUNCTION,
	style: TYPES.OBJECT,
	URLParams: TYPES.BOOLEAN,
	showFilter: TYPES.BOOLEAN,
	filterLabel: TYPES.STRING,
	className: TYPES.STRING,
	onQueryChange: TYPES.FUNCTION
};
