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
								sensorId="CitySensor"
								inputData={this.props.mapping.city} 
								defaultSelected="London"
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false}
							/>
						</div>
						<div className="col s6">
							<h5> Topics (Multiple Select) </h5>
							<AppbaseList
								inputData={this.props.mapping.topic} 
								sensorId="TopicSensor"
								showCount={true}
								size={100} 
								multipleSelect={true} 
								includeGeo={true} 
								depends={{
									CitySensor: "must"
								}}
							/>
						</div>
					</div>
				</div>
				<div className="col s6 h-100">
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
						depends={{
							CitySensor: "must",
							TopicSensor: "must"
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