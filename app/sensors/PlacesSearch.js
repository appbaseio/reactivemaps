import React, { Component } from "react";
import {
	TYPES,
	AppbaseSensorHelper as helper
} from "@appbaseio/reactivebase";
import classNames from "classnames";
import axios from "axios";
import Select from "react-select";

export default class PlacesSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLocation: "",
			currentValue: "",
			currentDistance: 0,
			value: 0
		};
		this.type = "match";
		this.locString = "";
		this.result = {
			options: []
		};
		this.queryInfo = {
			type: "geo_distance",
			unit: "mi",
			start: 0,
			end: 10
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadOptions = this.loadOptions.bind(this);
		this.handleValuesChange = this.handleValuesChange.bind(this);
		this.handleResults = this.handleResults.bind(this);
		this.customQuery = this.customQuery.bind(this);
		this.setDefaultLocation = this.setDefaultLocation.bind(this);
		this.urlParams = helper.URLParams.get(this.props.componentId);
	}

	componentWillMount() {
		this.googleMaps = window.google.maps;
	}

	componentWillReceiveProps(nextProps) {
		this.checkDefault(nextProps);
	}

	// Set query information
	componentDidMount() {
		this.setQueryInfo();
		this.getUserLocation(this.setDefaultLocation);
		this.checkDefault(this.props);
		this.listenFilter();
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

	checkDefault(props) {
		this.urlParams = helper.URLParams.get(props.componentId);
		this.defaultValue = this.urlParams !== null ? this.urlParams : props.defaultSelected;
		this.changeValue(this.defaultValue);
	}

	changeValue(defaultValue) {
		if (this.defaultSelected != defaultValue) {
			this.defaultSelected = defaultValue;
			if(this.defaultSelected !== null) {
				const isExists = this.result.options.length ? this.result.options.every(item => item.value !== this.defaultSelected && item.label !== this.defaultSelected) : false;
				
				if(!isExists) {
					this.result.options.push({
						value: this.defaultSelected,
						label: this.defaultSelected
					});
				}
			}
			this.handleChange({
				value: this.defaultSelected
			});
		}
	}

	setDefaultLocation() {
		this.result.options.push({
			value: this.state.userLocation,
			label: "Use my current location"
		});
		if (this.props.autoLocation && !this.props.URLParams) {
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
				inputData: this.props.appbaseField,
				customQuery: this.props.customQuery ? this.props.customQuery : this.customQuery,
				reactiveId: this.context.reactiveId,
				allowFilter: this.props.allowFilter,
				component: "PlacesSearch"
			}
		};
		helper.selectedSensor.setSensorInfo(obj);
	}

	// build query for this sensor only
	customQuery(value) {
		let query = null;
		if (value && value.location) {
			query = {
				[this.queryInfo.type]: {
					[this.props.appbaseField]: this.parseValue(value.location),
					distance: this.queryInfo.end + this.queryInfo.unit
				}
			};
		}
		return query;
	}

	parseValue(location) {
		location = location.split(',');
		return {
			lat: Number(location[0]),
			lon: Number(location[1])
		};
	}

	// get coordinates
	getCoordinates(value) {
		if (value && value !== "") {
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}`)
				.then((res) => {
					const location = res.data.results[0].geometry.location;
					this.locString = `${location.lat}, ${location.lng}`;
					this.executeQuery();
				});
		} else {
			helper.selectedSensor.set(null, true);
		}
	}

	// execute query after changing location or distanc
	executeQuery() {
		if (this.state.currentValue !== "" && this.locString) {
			const obj = {
				key: this.props.componentId,
				value: {
					currentValue: this.state.currentValue,
					location: this.locString
				}
			};
			if(this.props.onValueChange) {
				this.props.onValueChange(obj.value);
			}
			helper.URLParams.update(this.props.componentId, this.state.currentValue, this.props.URLParams);
			helper.selectedSensor.set(obj, true);
		}
	}

	// handle the input change and pass the value inside sensor info
	handleChange(input) {
		if (input && input.value) {
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

	// Handle function when value slider option is changing
	handleValuesChange(component, value) {
		this.setState({
			value
		});
	}

	// Handle function when slider option change is completed
	handleResults(component, value) {
		value += this.props.unit;
		this.setState({
			currentDistance: value
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
				res.map((place) => {
					this.result.options.push({
						value: place.description,
						label: place.description
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
			<div className={`rbc rbc-placessearch clearfix card thumbnail col s12 col-xs-12 ${cx}`} style={this.props.componentStyle}>
				<div className="row">
					{title}
					<div className="col s12 col-xs-12">
						<Select.Async
							value={this.state.currentValue}
							loadOptions={this.loadOptions}
							placeholder={this.props.placeholder}
							onChange={this.handleChange}
							valueRenderer={this.renderValue}
						/>
					</div>
				</div>
			</div>
		);
	}
}

PlacesSearch.propTypes = {
	componentId: React.PropTypes.string.isRequired,
	appbaseField: React.PropTypes.string.isRequired,
	title: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	customQuery: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	autoLocation: React.PropTypes.bool,
	onValueChange: React.PropTypes.func,
	componentStyle: React.PropTypes.object,
	URLParams: React.PropTypes.bool,
	allowFilter: React.PropTypes.bool,
	unit: React.PropTypes.oneOf(["mi", "miles", "yd", "yards", "ft", "feet", "in", "inch", "km", "kilometers", "m", "meters", "cm", "centimeters", "mm", "millimeters", "NM", "nmi", "nauticalmiles"])
};
// Default props value
PlacesSearch.defaultProps = {
	placeholder: "Search..",
	autoLocation: true,
	componentStyle: {},
	URLParams: false,
	allowFilter: true
};

// context type
PlacesSearch.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired,
	reactiveId: React.PropTypes.number
};

PlacesSearch.types = {
	componentId: TYPES.STRING,
	appbaseField: TYPES.STRING,
	title: TYPES.STRING,
	customQuery: TYPES.FUNCTION,
	placeholder: TYPES.STRING,
	autoLocation: TYPES.BOOLEAN,
	componentStyle: TYPES.OBJECT,
	unit: TYPES.STRING,
	URLParams: TYPES.BOOLEAN,
	allowFilter: TYPES.BOOLEAN
};
