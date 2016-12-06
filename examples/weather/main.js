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
		this.markerOnIndex = this.markerOnIndex.bind(this);
		this.result = {
			markers: [],
			heatmapPoints: []
		};
		this.heatmap = null;
	}
	markerOnIndex(res) {
		if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
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
				let point = {
					location: new google.maps.LatLng(location.lat, location.lon),
					weight: markerData._source.main.temp
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
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
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
						title="Meetupblast"
						/>
				</div>
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
