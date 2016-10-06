import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {Img} from '../../app/sensors/component/Img.js';
var HeatmapCreator = require('./HeatmapCreator.js');
import {ReactiveMap, 
		AppbaseMap, 
		AppbaseSearch, 
		AppbaseSlider, 
		AppbaseList} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	polygonData: [],
	    	markers: {
	    		hits: {
	    			hits: []
	    		}
	    	}
	    };
	    this.mapOnIdle = this.mapOnIdle.bind(this);
	    this.markerOnIndex = this.markerOnIndex.bind(this);
	    this.topicDepends = this.topicDepends.bind(this);
	    this.popoverContent = this.popoverContent.bind(this);
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
			<span className="imgContainer col s2">
				<Img src={marker._source.member.photo}  />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}
	markerOnIndex(res) {
		this.setState({markers: res.allMarkers}, this.generatePolyColor.bind(this));
	}
	mapOnIdle(res) {
		let gridCenterPointsArray = HeatmapCreator.createGridLines(res.mapBounds, 0);
		let polygonData = gridCenterPointsArray.map((grid) => {
			return grid.cell;
		})
		this.setState({polygonData: polygonData, polygonGrid: gridCenterPointsArray}, this.generatePolyColor.bind(this));
	}
	generatePolyColor() {
		if(this.state.polygonGrid.length && this.state.markers && this.state.markers.hits && this.state.markers.hits.hits.length) {
			let polygonGrid = this.state.polygonGrid.map((polygon) => {
				polygon.markers = this.state.markers.hits.hits.filter((hit) => {
					let markerPosition = [hit._source[this.props.mapping.location].lat, hit._source[this.props.mapping.location].lon];
					return HeatmapCreator.isInside(markerPosition, polygon.boundaries);
				});
				return polygon;
			});
			let polygonData = HeatmapCreator.fillColor(polygonGrid);
			this.setState({
				polygonData: polygonData
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
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						markerCluster={false}
						searchComponent="appbase"
						searchField={this.props.mapping.venue}
						mapStyle={this.props.mapStyle}
						autoCenter={true}
						searchAsMoveComponent={true}
						searchAsMoveDefault={true}
						MapStylesComponent={true}
						title="Heatmap"
						showPopoverOn = "onClick"
						popoverContent = {this.popoverContent}
						markerOnIndex = {this.markerOnIndex}
						mapOnIdle = {this.mapOnIdle}
						polygonData = {this.state.polygonData}
						/>
				</div>
			</div>
		);
	}
}

Main.defaultProps = {
 	mapStyle: "MapBox",
 	mapping: {
		location: 'location'
	},
	config: {
		"appbase": {
			"appname": "map_demo",
			"username": "aT29UsiAp",
			"password": "e0d26007-d818-4559-8244-c3c2fbad45ad",
			"type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));