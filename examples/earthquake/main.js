import { default as React, Component } from 'react';
import {Img} from '../../app/sensors/component/Img.js';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList} from '../../app/app.js';

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

	popoverContent(marker) {
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
				<ReactiveMap config={this.props.config}>
					<div className="col s12 m8 h-100 col-xs-12 col-sm-8">
						<AppbaseMap
							inputData={this.props.mapping.location}
							defaultZoom={8}
							defaultCenter={{ lat: 35.272, lng: 138.582 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.place}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							title="Earthquake"
							showPopoverOn = "onClick"
							popoverContent = {this.popoverContent}
							depends={{
								PlaceSensor: {"operation": "must", defaultQuery: this.placeQuery},
								RangeSensor: {"operation": "must", defaultQuery: this.magQuery},
								YearSensor: {"operation": "must", defaultQuery: this.yearQuery},
							}}
							/>
					</div>
					<div className="col s12 m4 col-xs-12 col-sm-4">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<AppbaseList
									sensorId="PlaceSensor"
									inputData={this.props.mapping.venue}
									defaultSelected="Japan"
									showCount={true}
									size={1000}
									multipleSelect={false}
									includeGeo={false}
									staticSearch={true}
									title="Places"
									searchPlaceholder="Search Place"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<AppbaseSlider
									sensorId="RangeSensor"
									inputData={this.props.mapping.mag}
									depends={{
										PlaceSensor: {
											"operation": "must",
											"defaultQuery": this.placeQuery
										}
									}}
									title="Magnitude"
									maxThreshold={10}
									minThreshold={0} />
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<AppbaseSlider
									sensorId="YearSensor"
									inputData={this.props.mapping.time}
									depends={{
										PlaceSensor: {
											"operation": "must",
											"defaultQuery": this.placeQuery
										}
									}}
									title="Year"
									maxThreshold={2016}
									minThreshold={1900} />
							</div>
						</div>
					</div>
				</ReactiveMap>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		mag: 'mag',
		place: 'place',
		venue: 'place.raw',
		location: 'location',
		time: 'time'
	},
	config: {
		"appbase": {
			"appname": "earthquake",
			"username": "OrXIHcgHn",
			"password": "d539c6e7-ed14-4407-8214-c227b0600d8e",
			"type": "places"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
