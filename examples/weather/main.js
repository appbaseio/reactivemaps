import {
	default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import { Marker } from "react-google-maps";
import {
	ReactiveBase,
	ReactiveMap
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.onAllData = this.onAllData.bind(this);
		this.result = {
			markers: [],
			heatmapPoints: []
		};
		this.heatmap = null;
	}

	onAllData(res) {
		if (res) {
			let markers = {};
			let combineData = res.currentData;
			if (res.mode === 'historic') {
				combineData = res.currentData.concat(res.newData);
			} else if (res.mode === 'streaming') {
				combineData = helper.combineStreamData(res.currentData, res.newData);
			}
			this.heatmapCreation(res, combineData);
			return this.markerCreation(combineData);
		}
		return null;
	}

	markerIcons(markerData) {
		let icon = null;
		if (markerData.clouds.all > 20 && markerData.clouds.all < 70) {
			icon = 'dist/images/cloud-32.png';
		} else if (markerData.clouds.all > 70) {
			icon = 'dist/images/too-cloud-32.png';
		}
		if (markerData.rain) {
			icon = 'dist/images/rain-32.png';
		}
		if (markerData.snow) {
			icon = 'dist/images/snow-32.png';
		}
		return icon;
	}

	identifyGeoData(input) {
		let type = Object.prototype.toString.call(input);
		let convertedGeo = null;
		if (type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
			convertedGeo = {
				lat: Number(input.lat),
				lng: Number(input.lon)
			};
		} else if (type === '[object Array]' && input.length === 2) {
			convertedGeo = {
				lat: Number(input[0]),
				lng: Number(input[1])
			};
		}
		return convertedGeo;
	}

	markerCreation(hits) {
		let markers = [];
		hits.forEach((hit, index) => {
			let icon = this.markerIcons(hit._source);
			if (icon) {
				let field = this.identifyGeoData(hit._source["coord"]);
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

	heatmapCreation(res, hits) {
		if (this.heatmap) {
			this.heatmap.getData().clear();
		}
		
		hits.forEach((markerData, index) => {
			let location = markerData._source["coord"];
			this.result.markers.forEach((result_marker, index) => {
				if (location.lat === result_marker.lat && location.lon === result_marker.lon) {
					this.result.markers.splice(index, 1);
				}
			});
			let temp = markerData._source.main.temp < 0 ? 0 : markerData._source.main.temp;
			let point = {
				location: new google.maps.LatLng(location.lat, location.lon),
				weight: temp
			};
			this.result.markers.push({ lat: location.lat, lon: location.lon, weight: point.weight });
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
				<ReactiveBase
					app="weather"
					credentials="dmgyKySw5:162202d3-43f7-4e01-95f2-f9f3e1b02bb5"
					type="city"
					>
					<div className="col s12 h-100">
						<ReactiveMap
							appbaseField="coord"
							defaultZoom={4}
							defaultCenter={{ lat: 40.673940, lon: -101.314026 }}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							onAllData={this.onAllData}
							autoCenter={false}
							size={100}
							showSearchAsMove={true}
							setSearchAsMove={true}
							showMapStyles={true}
							showMarkers={false}
							title="Weather"
							/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));
