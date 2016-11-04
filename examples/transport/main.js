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
					<strong>Bus: {marker._source.VEHICLE_TAG}</strong>
				</div>
			</div>
		</div>);
	}
	markerOnIndex(res) {
		// console.log(res);
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
				<div className="col s12 m3">
					<div className="row h-100">
						<div className="col s12">
							<AppbaseList
								sensorId="RoutesSensor"
								inputData={this.props.mapping.routes}
								defaultSelected={1040}
								showCount={true}
								size={1000}
								multipleSelect={false}
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
						defaultZoom={13}
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
			</div>
		);
	}
}

Main.defaultProps = {
 	mapStyle: "MapBox",
 	mapping: {
 		routes: 'VEHICLE_TAG',
		location: 'location1'
	},
	config: {
		"appbase": {
			"appname": "bus",
			"username": "UzOKXiRYK",
			"password": "000fb7ce-c92e-4f78-b3b7-0d4e33964134",
			"type": "sfbus"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
