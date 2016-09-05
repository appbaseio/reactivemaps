import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
var config = require('./config.js');
var helper = require('./app/middleware/helper.js');

// sensors
import {AppbaseList} from './app/sensors/AppbaseList';
import {AppbaseSlider} from './app/sensors/AppbaseSlider';
import {AppbaseSearch} from './app/sensors/AppbaseSearch';
import {SearchAsMove} from './app/sensors/SearchAsMove';
import {MapStyles} from './app/sensors/MapStyles';
// actuators
import {AppbaseMap} from './app/actuators/AppbaseMap';
// middleware
import {ReactiveMap} from './app/middleware/ReactiveMap';
import {queryObject} from './app/middleware/ImmutableQuery.js';

class Main extends Component {
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={config} />
				<div className="col s6">
					<div className="row h-100">
						<div className="col s6">
							<h5> Cities (Single Select) </h5>
							<AppbaseList
								defaultSelected="London"
								fieldName={this.props.mapping.city} 
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false} 
								sensorName="CitySensor"
							/>
						</div>
						<div className="col s6">
							<h5> Topics (Multiple Select) </h5>
							<AppbaseList
								fieldName={this.props.mapping.topic} 
								showCount={true} 
								size={100} 
								multipleSelect={true} 
								includeGeo={true} 
								sensorName="TopicSensor"
								depends={{
									CitySensor: ["topicFilterByCity"]
								}}
							/>
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider fieldName="guests" max="10" />
					</div><br/><br/><br/>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch
							fieldName={this.props.mapping.venue}
							sensorName="VenueSensor"
							depends={{
								'CitySensor': ['searchFilterByCity']
							}}  />
					</div>
					<div className="col s12">
						<h5> Map styles </h5>
						<MapStyles 
							defaultSelected={this.props.mapStyle}
							sensorName="MapStyleSensor"
							/>
					</div>
					<div className="col s12">
						<h5> Search with move </h5>					
						<SearchAsMove  
							sensorName="SearchAsMoveSensor" />
					</div>
				</div>
				<div className="col s6 h-100">
					<AppbaseMap
						fieldName={this.props.mapping.location}
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						markerCluster={false}
						searchComponent="appbase"
						mapStyle={this.props.mapStyle}
						depends={{
							CitySensor: ["reposition"],
							SearchAsMoveSensor: ["SearchAsMove"],
							MapStyleSensor: ["MapStyles"]
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
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));