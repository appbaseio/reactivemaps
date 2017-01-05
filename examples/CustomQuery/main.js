import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	TextField
} from '@appbaseio/reactivebase';

import {
	ReactiveMap,
	GeoDistanceDropdown
} from '../../app/app.js';

const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
	}

	cityQuery(value) {
		if(value) {
			return {
				match: {
					'group.group_city.group_city_simple': value
				}
			};
		} else return null;
	}

	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveBase
					appname={this.props.config.appbase.appname}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					type={this.props.config.appbase.type}
					>
					<div className="col s6">
						<div className="row h-100">
							<div className="col s12">
								<TextField
									sensorId="InputSensor"
									title="Cities"
									placeholder="Search City (i.e London)"
								/>
							</div>
						</div>

						<div className="row">
							<GeoDistanceDropdown
								sensorId="GeoSensor"
								appbaseField={this.props.mapping.location}
								title="Geo Distance"
								APIkey={mapsAPIKey}
								distanceOptions={[2,5,10,15]}
								unit="mi"
							/>
						</div>
					</div>
					<div className="col s6 h-100">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							size={100}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Meetupblast"
							depends={{
								InputSensor: {"operation": "must", defaultQuery: this.cityQuery},
								GeoSensor: {"operation": "must"}
							}}
							/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'group.group_city.group_city_simple',
		location: 'venue'
	},
	config: {
		"appbase": {
			"appname": "meetup2",
			"username": "qz4ZD8xq1",
			"password": "a0edfc7f-5611-46f6-8fe1-d4db234631f3",
			"type": "meetup"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));