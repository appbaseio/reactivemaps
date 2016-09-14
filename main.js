import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap, 
		AppbaseMap, 
		AppbaseSearch, 
		AppbaseSlider, 
		AppbaseList} from './app/app.js';

class Main extends Component {
	constructor(props) {
	    super(props);
	    this.topicDepends = this.topicDepends.bind(this);
	}
	topicDepends(value) {
		if(this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
	    	return { Match: match };
    	} else return null;
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
				<div className="col s12 m6">
					<div className="row h-100">
						<div className="col s12 m6">
							<h5> Cities (Single Select) </h5>
							<AppbaseList
								sensorId="CitySensor"
								inputData={this.props.mapping.city} 
								defaultSelected="London"
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false}
							/>
						</div>
						<div className="col s12 m6">
							<h5> Topics (Multiple Select) </h5>
							<AppbaseList
								inputData={this.props.mapping.topic} 
								sensorId="TopicSensor"
								showCount={true}
								size={100} 
								multipleSelect={true} 
								includeGeo={true} 
								depends={{
									CitySensor: {
										"operation": "must",
										"defaultQuery": this.topicDepends
									}
								}}
							/>
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider 
							sensorId="RangeSensor"
							inputData="guests"
							max="10" />
					</div>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch
							inputData={this.props.mapping.venue}
							sensorId="VenueSensor"
							searchRef="CityVenue"
							depends={{
								'CitySensor': {
									"operation": "must",
									"doNotExecute": {true}
								}
							}}
						/>
					</div>
				</div>
				<div className="col s12 m6 h-100">
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
						depends={{
							CitySensor: {"operation": "must"},
							TopicSensor: {"operation": "must"},
							RangeSensor: {"operation": "must"},
							VenueSensor: {"operation": "must"}
						}}
						/>
				</div>
			</div>
		);
	}
}

Main.defaultProps = {
 	mapStyle: "Blue Water",
 	mapping: {
		city: 'group.group_city.raw',
		topic: 'group.group_topics.topic_name_raw',
		venue: 'venue_name_ngrams',
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