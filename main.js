import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {Img} from './app/sensors/component/Img.js';
import {ReactiveMap, 
		AppbaseMap, 
		AppbaseSearch, 
		AppbaseSlider, 
		AppbaseList} from './app/app.js';

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
		console.log(res);
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
				<div className="col s12 m6">
					<div className="row h-100">
						<div className="col s12 m6">
							<AppbaseList
								sensorId="CitySensor"
								inputData={this.props.mapping.city} 
								defaultSelected="London"
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false}
								staticSearch={true}
								title="Cities"
								searchPlaceholder="Search City"
							/>
						</div>
						<div className="col s12 m6">
							<AppbaseList
								inputData={this.props.mapping.topic} 
								sensorId="TopicSensor"
								showCount={true}
								size={100} 
								multipleSelect={true} 
								includeGeo={true} 
								title="Topics"
								depends={{
									CitySensor: {
										"operation": "must",
										"defaultQuery": this.topicDepends
									}
								}}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<AppbaseSlider 
								sensorId="RangeSensor"
								inputData={this.props.mapping.guests} 
								depends={{
									CitySensor: {
										"operation": "must",
										"defaultQuery": this.topicDepends
									}
								}}
								title="guests"
								maxThreshold={5} />
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<AppbaseSearch
								inputData={this.props.mapping.venue}
								sensorId="VenueSensor"
								searchRef="CityVenue"
								placeholder="Search Venue"
								depends={{
									'CitySensor': {
										"operation": "must",
										"doNotExecute": {true}
									}
								}}
							/>
						</div>
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
						title="Reactive Maps"
						showPopoverOn = "onClick"
						popoverContent = {this.popoverContent}
						markerOnIndex = {this.markerOnIndex}
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
 	mapStyle: "Midnight Commander",
 	mapping: {
		city: 'group.group_city.raw',
		topic: 'group.group_topics.topic_name_raw',
		venue: 'venue_name_ngrams',
		guests: 'guests',
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