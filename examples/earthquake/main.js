import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	SingleList,
	RangeSlider,
	GeoDistanceSlider,
	ToggleButton
} from '@appbaseio/reactivebase';

import {
	ReactiveMap
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.placeQuery = this.placeQuery.bind(this);
		this.magQuery = this.magQuery.bind(this);
	}

	placeQuery(value) {
		if(value) {
			let field = 'place';
			let match = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { match: match };
		} else return null;
	}

	magQuery(value) {
		if(value) {
			let field = 'mag';
			let range = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { range: range };
		} else return null;
	}

	yearQuery(value) {
		if(value) {
			let field = 'time';
			let range = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { range: range };
		} else return null;
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row">
			<div className="infoContainer col s12 col-xs-12">
				<div className="description">
					<p>
						Earthquake (at)&nbsp;
						<strong>{marker._source.place}</strong>&nbsp;
						of maginutde: <code>{marker._source.mag}</code>&nbsp;
						in the year {marker._source.time}.
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveBase
					app={this.props.config.appbase.app}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					type={this.props.config.appbase.type}
					>
					<div className="col s12 m8 h-100 col-xs-12 col-sm-8">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={8}
							defaultCenter={{ lat: 35.272, lng: 138.582 }}
							historicalData={true}
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							showSearchAsMove={true}
							title="Earthquake"
							showPopoverOn = "click"
							onPopoverTrigger = {this.onPopoverTrigger}
							actuate={{
								PlaceSensor: {"operation": "must"},
								RangeSensor: {"operation": "must"},
								YearSensor: {"operation": "must"},
							}}
							/>
					</div>
					<div className="col s12 m4 col-xs-12 col-sm-4">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<SingleList
									componentId="PlaceSensor"
									appbaseField={this.props.mapping.venue}
									defaultSelected="Japan"
									showCount={true}
									size={1000}
									showSearch={true}
									title="Places"
									searchPlaceholder="Search Place"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<RangeSlider
									componentId="RangeSensor"
									appbaseField={this.props.mapping.mag}
									actuate={{
										PlaceSensor: {
											"operation": "must",
											"defaultQuery": this.placeQuery
										}
									}}
									defaultSelected={
										{
											"start": 1,
											"end": 9
										}
									}
									range={{
										start: 1,
										end: 10
									}}
									title="Magnitude"
									stepValue={1} />
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<RangeSlider
									componentId="YearSensor"
									appbaseField={this.props.mapping.time}
									actuate={{
										PlaceSensor: {
											"operation": "must",
											"defaultQuery": this.placeQuery
										}
									}}
									defaultSelected={
										{
											"start": 1901,
											"end": 2015
										}
									}
									range={{
										start: 1900,
										end: 2016
									}}
									title="Year"
									stepValue={1} />
							</div>
						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		mag: 'mag',
		venue: 'place.raw',
		location: 'location',
		time: 'time'
	},
	config: {
		"appbase": {
			"app": "earthquake",
			"username": "OrXIHcgHn",
			"password": "d539c6e7-ed14-4407-8214-c227b0600d8e",
			"type": "places"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
