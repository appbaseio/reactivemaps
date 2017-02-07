import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');

import { ReactiveBase } from '@appbaseio/reactivebase';
import { ReactiveMap } from '../../app/app.js';
import { GoogleSearch } from '../../app/sensors/GoogleSearch.js';

const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';

class Main extends Component {
	constructor(props) {
		super(props);
		this.originQuery = this.originQuery.bind(this);
		this.destinationQuery = this.destinationQuery.bind(this);
		this.executeQuery = this.executeQuery.bind(this);
		this.onIdle = this.onIdle.bind(this);
		this.origin = null;
		this.destination = null;
		this.mapRef = null;
		this.directionsDisplay = new google.maps.DirectionsRenderer;
		this.directionsService = new google.maps.DirectionsService;
	}

	originQuery(value) {
		this.origin = value;
		this.executeQuery();
	}

	destinationQuery(value) {
		this.destination = value;
		this.executeQuery();
	}

	executeQuery() {
		if(this.mapRef && this.origin && this.destination) {
			this.directionsDisplay.setMap(this.mapRef);
			this.directionsService.route({
				origin: this.origin.location,
				destination: this.destination.location,
				travelMode: google.maps.TravelMode['DRIVING']
			},
			function(response, status) {
				if (status == 'OK') {
					this.directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			}.bind(this));
		}
	}

	onIdle(res) {
		this.mapRef = res.props.map;
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
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<GoogleSearch
									appbaseField={this.props.mapping.venue}
									componentId="OriginSensor"
									placeholder="Search Venue"
									title="Origin"
									APIkey={mapsAPIKey}
								/>
							</div>
							<div className="col s12 col-xs-12">
								<GoogleSearch
									appbaseField={this.props.mapping.venue}
									componentId="DestinationSensor"
									placeholder="Search Venue"
									autoLocation={false}
									title="Destination"
									APIkey={mapsAPIKey}
								/>
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData={true}
							setMarkerCluster={false}
							mapStyle={this.props.mapStyle}
							autoCenter={false}
							showSearchAsMove={true}
							showMapStyles={true}
							autoMapRender={false}
							title="Reactive Maps"
							onIdle={this.onIdle}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							size={100}
							actuate={{
								OriginSensor: {"operation": "must", defaultQuery: this.originQuery},
								DestinationSensor: {"operation": "must", defaultQuery: this.destinationQuery}
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
		city: 'group.group_city.raw',
		topic: 'group.group_topics.topic_name_raw.raw',
		venue: 'venue_name_ngrams',
		guests: 'guests',
		location: 'location'
	},
	config: {
		"appbase": {
		   "app": "reactivemap_demo",
		   "username": "y4pVxY2Ok",
		   "password": "c92481e2-c07f-4473-8326-082919282c18",
		   "type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
