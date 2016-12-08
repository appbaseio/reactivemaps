import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import { Marker } from "react-google-maps";
import {
		ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList
	} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.markerOnIndex = this.markerOnIndex.bind(this);
		this.result = {
			markers: [],
			heatmapPoints: []
		};
		this.heatmap = null;
	}
	markerOnIndex(res) {
		if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
			this.heatmapCreation(res);
			return this.markerCreation(res);
		}
	}
	markerIcons(markerData) {
		let icon = null;
		if(markerData.clouds.all > 20 && markerData.clouds.all < 70) {
			icon = 'dist/images/cloud-32.png';
		}
		else if(markerData.clouds.all > 70) {
			icon = 'dist/images/too-cloud-32.png';
		}
		if(markerData.rain) {
			icon = 'dist/images/rain-32.png';
		}
		if(markerData.snow) {
			icon = 'dist/images/snow-32.png';
		}
		return icon;
	}
	identifyGeoData(input) {
		let type = Object.prototype.toString.call(input);
		let convertedGeo = null;
		if(type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
			convertedGeo = {
				lat: Number(input.lat),
				lng: Number(input.lon)
			};
		}
		else if(type === '[object Array]' && input.length === 2) {
			convertedGeo = {
				lat: Number(input[0]),
				lng: Number(input[1])
			};
		}
		return convertedGeo;
	}
	markerCreation(res) {
		let markers = [];
		res.allMarkers.hits.hits.forEach((hit, index) => {
			let icon = this.markerIcons(hit._source);
			if(icon) {
				let field = this.identifyGeoData(hit._source[this.props.mapping.location]);
				let position = {
					position: field
				};
				let markerObj = (
					<Marker 
						{...position}
						key={hit._id}
						zIndex={1}
						icon={icon}>
					</Marker>
				);
				markers.push(markerObj);
			}
		});
		return {
			extraMarkers: markers
		};
	}
	heatmapCreation(res) {
		if(this.heatmap) {
			this.heatmap.getData().clear();
		}
		res.allMarkers.hits.hits.forEach((markerData, index) => {
			let location = markerData._source[this.props.mapping.location];
			this.result.markers.forEach((result_marker, index) => {
				if(location.lat === result_marker.lat && location.lon === result_marker.lon) {
					this.result.markers.splice(index, 1);
				}
			});
			let temp = markerData._source.main.temp < 0 ? 0 : markerData._source.main.temp;
			let point = {
				location: new google.maps.LatLng(location.lat, location.lon),
				weight: temp
			};
			this.result.markers.push({lat: location.lat, lon: location.lon, weight: point.weight});
			this.result.heatmapPoints.push(point);
		});
		this.heatmap = new google.maps.visualization.HeatmapLayer({
			data: this.result.heatmapPoints,
			map: res.mapRef.props.map,
			radius: 30
		});
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config}>
					<div className="col s12 h-100">
						<AppbaseMap
							inputData={this.props.mapping.location}
							defaultZoom={4}
							defaultCenter={{ lat: 40.673940, lng: -101.314026 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							markerOnIndex={this.markerOnIndex}
							autoCenter={false}
							size={100}
							searchAsMoveComponent={true}
							searchAsMoveDefault={true}
							MapStylesComponent={true}
							allowMarkers={false}
							title="Weather"
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
		city: 'name',
		location: 'coord'
	},
	config: {
		"appbase": {
			"appname": "weather",
			"username": "dmgyKySw5",
			"password": "162202d3-43f7-4e01-95f2-f9f3e1b02bb5",
			"type": "city"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
