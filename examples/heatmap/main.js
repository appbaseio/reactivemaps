import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import { Img } from '../HelperComponent/Img.js';
import { Polygon } from "react-google-maps";
var HeatmapCreator = require('./HeatmapCreator.js');
var HeatmapWorker = require('./worker.js');

import { ReactiveBase } from '@appbaseio/reactivebase';
import { ReactiveMap } from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.polygonData = [];
		this.markers = {
			hits: {
				hits: []
			}
		};
		this.simulationFlag = true;
		this.mapOnIdle = this.mapOnIdle.bind(this);
		this.onData = this.onData.bind(this);
		this.popoverContent = this.popoverContent.bind(this);
	}

	popoverContent(marker) {
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

	// get the markers create polygon accordingly
	onData(res) {
		this.markers = res.allMarkers;
		this.passExistingData(res);
		console.log('Applying polgon', res.mode);
		return this.generatePolyColor();
	}

	passExistingData(res) {
		if(res.mode === 'streaming') {
			this.simulationFlag = false;
		}
		HeatmapWorker.heatmapExistingData(this.markers);
	}

	// get the mapBounds Create polygon
	mapOnIdle(refMap, res) {
		this.simulationFlag = true;
		this.boundingBoxCoordinates = res.boundingBoxCoordinates;
		this.polygonGrid = HeatmapCreator.createGridLines(res.mapBounds, 0);
		this.polygonData = this.polygonGrid.map((grid) => {
			return grid.cell;
		})
		setTimeout(() => {
			if(this.simulationFlag) {
				HeatmapWorker.init(this.props.config, this.props.mapping.location, res.boundingBoxCoordinates);
			}
		}, 10*1000);
		return this.generatePolyColor();
	}

	generatePolyColor() {
		if(this.polygonGrid.length && this.markers && this.markers.hits && this.markers.hits.hits.length) {
			let polygonGrid = this.polygonGrid.map((polygon) => {
				polygon.markers = this.markers.hits.hits.filter((hit) => {
					let markerPosition = [hit._source[this.props.mapping.location].lat, hit._source[this.props.mapping.location].lon];
					return HeatmapCreator.isInside(markerPosition, polygon.boundaries);
				});
				return polygon;
			});
			let polygonData = HeatmapCreator.fillColor(polygonGrid);
			return this.applyPoloygon(polygonData);
		}
	}

	applyPoloygon(polygonData) {
		let polygons = polygonData.map((polyProp, index) => {
		  let options = {
			options: polyProp
		  };
		  return (<Polygon key={index} {...options}  />);
		});
		return {
			polygons: polygons
		};
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
					<div className="col s12 h-100">
					<ReactiveMap
						appbaseField="location"
						requestSize={5}
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						setMarkerCluster={false}
						searchComponent="appbase"
						searchField={this.props.mapping.venue}
						mapStyle={this.props.mapStyle}
						autoCenter={true}
						showSearchAsMove={true}
						searchAsMoveDefault={false}
						showMapStyles={true}
						title="Heatmap"
						showPopoverOn = "click"
						popoverContent = {this.popoverContent}
						onData = {this.onData}
						onIdle = {this.mapOnIdle}
						streamingMarkerTime={10}
						stream={true}
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
		location: 'location'
	},
	config: {
		"appbase": {
			"app": "heatmap-app",
			"username": "SIhtMbkv4",
			"password": "ad153ba9-4475-40e7-be53-69389c4f7f68",
			"type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
