import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.topicDepends = this.topicDepends.bind(this);
		this.popoverContent = this.popoverContent.bind(this);
		this.markerOnIndex =  this.markerOnIndex.bind(this);
	}
	topicDepends(value) {
		if(this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
			return { Match: match };
		} else return null;
	}
	popoverContent(marker) {
		console.log(marker);
		return (<div className="popoverComponent row">
			<div className="infoContainer col s12">
				<div className="nameContainer">
					<strong>{marker._id}</strong>
				</div>
				<div>
					<p>{marker._source.detail}</p>
				</div>
			</div>
		</div>);
	}
	markerOnIndex(res) {
		let markers = {};
		res.allMarkers.hits.hits.forEach((hit, index) => {
			markers[hit._id] = {};
			let icon;
			switch(hit._source.vehicle) {
				case 'Bus':
					icon = this.props.markerIcons.Bus;
				break;
				case 'Train':
					icon = this.props.markerIcons.Train;
				break;
			}
			markers[hit._id].icon = icon;
		});
		return {
			markers: markers
		};
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config}>
					<div className="col s12 m3">
						<div className="row h-100">
							<div className="col s12">
								<AppbaseList
									sensorId="RoutesSensor"
									inputData={this.props.mapping.routes}
									showCount={false}
									defaultSelected={['Bus-12', 'Bus-14', 'Bus-22', 'Bus-43', 'Train-1']}
									size={1000}
									multipleSelect={true}
									includeSelectAll={true}
									includeGeo={false}
									staticSearch={true}
									title="Bus"
									searchPlaceholder="Search Bus"
								/>
							</div>

						</div>
					</div>
					<div className="col s12 m9 h-100">
						<AppbaseMap
							inputData={this.props.mapping.location}
							defaultZoom={11}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="SF Transport"
							showPopoverOn = "onClick"
							popoverContent = {this.popoverContent}
							markerOnIndex = {this.markerOnIndex}
							streamAutoCenter={false}
							rotateOnUpdate={true}
							historicPin= 'dist/images/bus.png'
							streamPin= 'dist/images/bus.png'
							depends={{
								RoutesSensor: {"operation": "must"}
							}}
							/>
					</div>
				</ReactiveMap>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Standard",
	mapping: {
		routes: 'tag.raw',
		vehicle: 'vehicle.raw',
		location: 'location'
	},
	config: {
		"appbase": {
			"appname": "bus",
			"username": "UzOKXiRYK",
			"password": "000fb7ce-c92e-4f78-b3b7-0d4e33964134",
			"type": "sftransport"
		}
	},
	markerIcons: {
		Bus: {
			path: `M122 1923 c-34 -3 -55 -9 -59 -19 -3 -7 -11 -14 -18 -14 -7 0 -15 -8
					-17 -17 -3 -10 -4 -405 -4 -878 1 -807 2 -863 19 -888 9 -15 26 -27 37 -27 19
					0 96 -27 154 -54 29 -14 40 -13 81 4 38 17 120 47 149 56 20 6 33 19 39 39 8
					25 12 1620 4 1720 -1 17 -6 31 -12 33 -5 2 -13 11 -17 21 -10 27 -164 37 -356
					24z m6 -392 c2 -55 -1 -98 -7 -104 -7 -7 -7 -14 0 -23 5 -7 9 -52 7 -105 -3
					-93 -3 -94 -28 -94 -25 0 -25 1 -28 99 -2 73 1 102 10 108 10 6 10 8 1 8 -10
					0 -13 26 -13 98 0 54 3 102 7 106 4 4 16 6 28 4 18 -3 20 -11 23 -97z m340 -1
					c2 -77 0 -97 -13 -106 -14 -11 -14 -12 0 -18 13 -5 15 -22 13 -103 -3 -97 -3
					-98 -28 -98 -25 0 -25 1 -28 99 -2 73 1 102 10 108 10 6 10 8 1 8 -10 0 -13
					26 -13 98 0 54 3 102 7 106 4 4 16 6 28 4 18 -3 20 -11 23 -98z m-343 -770 l0
					-205 -27 -3 -27 -3 0 211 0 211 27 -3 27 -3 0 -205z m342 -2 l3 -208 -30 0
					-29 0 0 211 0 210 27 -3 27 -3 2 -207z`,
			fillColor: '#000000',
			fillOpacity: 0.8,
			scale: 0.010,
			strokeWeight: 1
		},
		Train: {
			path: `M122 1923 c-34 -3 -55 -9 -59 -19 -3 -7 -11 -14 -18 -14 -7 0 -15 -8
					-17 -17 -3 -10 -4 -405 -4 -878 1 -807 2 -863 19 -888 9 -15 26 -27 37 -27 19
					0 96 -27 154 -54 29 -14 40 -13 81 4 38 17 120 47 149 56 20 6 33 19 39 39 8
					25 12 1620 4 1720 -1 17 -6 31 -12 33 -5 2 -13 11 -17 21 -10 27 -164 37 -356
					24z m6 -392 c2 -55 -1 -98 -7 -104 -7 -7 -7 -14 0 -23 5 -7 9 -52 7 -105 -3
					-93 -3 -94 -28 -94 -25 0 -25 1 -28 99 -2 73 1 102 10 108 10 6 10 8 1 8 -10
					0 -13 26 -13 98 0 54 3 102 7 106 4 4 16 6 28 4 18 -3 20 -11 23 -97z m340 -1
					c2 -77 0 -97 -13 -106 -14 -11 -14 -12 0 -18 13 -5 15 -22 13 -103 -3 -97 -3
					-98 -28 -98 -25 0 -25 1 -28 99 -2 73 1 102 10 108 10 6 10 8 1 8 -10 0 -13
					26 -13 98 0 54 3 102 7 106 4 4 16 6 28 4 18 -3 20 -11 23 -98z m-343 -770 l0
					-205 -27 -3 -27 -3 0 211 0 211 27 -3 27 -3 0 -205z m342 -2 l3 -208 -30 0
					-29 0 0 211 0 210 27 -3 27 -3 2 -207z`,
			fillColor: 'red',
			fillOpacity: 0.8,
			scale: 0.010,
			strokeWeight: 1
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
