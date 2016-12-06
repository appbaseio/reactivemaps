import { default as React, Component } from 'react';
import {Img} from '../../app/sensors/component/Img.js';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList,
		GoogleSearch
	} from '../../app/app.js';
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
				<ReactiveMap config={this.props.config}>
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<GoogleSearch
									inputData={this.props.mapping.venue}
									sensorId="OriginSensor"
									placeholder="Search Venue"
									title="Origin"
									APIkey={mapsAPIKey}
								/>
							</div>
							<div className="col s12 col-xs-12">
								<GoogleSearch
									inputData={this.props.mapping.venue}
									sensorId="DestinationSensor"
									placeholder="Search Venue"
									autoLocation={false}
									title="Destination"
									APIkey={mapsAPIKey}
								/>
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<AppbaseMap
							inputData={this.props.mapping.location}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Reactive Maps"
							showPopoverOn = "onClick"
							popoverContent = {this.popoverContent}
							markerOnIndex = {this.markerOnIndex}
							onIdle={this.onIdle}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							depends={{
								OriginSensor: {"operation": "must", defaultQuery: this.originQuery},
								DestinationSensor: {"operation": "must", defaultQuery: this.destinationQuery}
							}}
						/>
					</div>
				</ReactiveMap>
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
		   "appname": "reactivemap_demo",
		   "username": "y4pVxY2Ok",
		   "password": "c92481e2-c07f-4473-8326-082919282c18",
		   "type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));