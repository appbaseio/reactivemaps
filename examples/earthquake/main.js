import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	MultiList,
	RangeSlider,
	ReactiveMap
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
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
					app="earthquake"
					credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
					type="places"
					>
					<div className="col s12 m8 h-100 col-xs-12 col-sm-8">
						<ReactiveMap
							appbaseField="location"
							defaultZoom={8}
							defaultCenter={{ lat: 35.272, lon: 138.582 }}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							showSearchAsMove
							title="Earthquake"
							showPopoverOn = "click"
							onPopoverTrigger = {this.onPopoverTrigger}
							react={{
								"and":["PlaceSensor", "RangeSensor", "YearSensor"]
							}}
						/>
					</div>
					<div className="col s12 m4 col-xs-12 col-sm-4">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<MultiList
									componentId="PlaceSensor"
									appbaseField="place.raw"
									defaultSelected={["Japan"]}
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
									appbaseField="mag"
									react={{
										"and": "PlaceSensor"
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
									appbaseField="time"
									react={{
										"and": "PlaceSensor"
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

ReactDOM.render(<Main />, document.getElementById('map'));
