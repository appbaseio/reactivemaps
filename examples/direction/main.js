import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');

import { 
	ReactiveBase,
	ReactiveMap,
	PlacesSearch
} from '../../app/app.js';

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
					app="reactivemap_demo"
					credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
					type="meetupdata1"
					>
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 col-xs-12">
								<PlacesSearch
									appbaseField="venue_name_ngrams"
									componentId="OriginSensor"
									placeholder="Search Venue"
									title="Origin"
									customQuery={this.originQuery}
								/>
							</div>
							<div className="col s12 col-xs-12">
								<PlacesSearch
									appbaseField="venue_name_ngrams"
									componentId="DestinationSensor"
									placeholder="Search Venue"
									autoLocation={false}
									title="Destination"
									customQuery={this.destinationQuery}
								/>
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<ReactiveMap
							appbaseField="location"
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={false}
							showMapStyles={true}
							autoMapRender={false}
							title="Reactive Maps"
							onIdle={this.onIdle}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								"and": ["OriginSensor", "DestinationSensor"]
							}}
						/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));
