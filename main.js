import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
var config = require('./config.js');
// sensors
import {AppbaseList} from './app/sensors/AppbaseList';
import {AppbaseSlider} from './app/sensors/AppbaseSlider';
import {AppbaseSearch} from './app/sensors/AppbaseSearch';
import {SearchAsMove} from './app/sensors/SearchAsMove';
// actuators
import {AppbaseMap} from './app/actuators/AppbaseMap';
// middleware
import {ReactiveMap} from './app/middleware/ReactiveMap';
import {queryObject} from './app/middleware/ImmutableQuery.js';
var fancyMap = require('./app/helper/fancyMapStyles.js');

class Main extends Component {
	constructor(props) {
		super(props);
		this.sensorOnSelect = this.sensorOnSelect.bind(this);
		this.state = {
			mapping: {
				city: 'group.group_city.raw',
	    		topic: 'group.group_topics.topic_name_raw',
	    		venue: 'venue_name_ngrams',
	    		location: 'location'
	    	},
	    	zoom: 13,
	    	selectedSensor: {}
	    };
	}

	// Events - related to actuators
	// 1. Event after marker is created on map
	onIndexMarker(data) {}
	// 2. Event after marker is deleted on map
	onDeleteMarker(data) {}
	// 3. Event on click of marker
	markerOnClick(data) {
		alert('Click');
		console.log(data);
	}
	// 4. Event on double click of marker
	markerOnDblclick(data) {
		alert('double clicked');
		console.log(data);
	}
	// 5. Event on mouse enter of marker
	markerOnMouseover(data) {
		console.log('Mouse enter');
		console.log(data);
	}
	// 6. Event on mouse leave of marker
	markerOnMouseout(data) {
		console.log('Mouse leave');
		console.log(data);
	}

	// Events - related to sensors
	// 1. Event on selection of sensor value
	// Store selected values in selectedSensor state
	// according to that create extraquery which we can use in venue to filter by that query
	// venue should be filter by cityname
	sensorOnSelect(data) {
		var selectedSensor = this.state.selectedSensor;
		selectedSensor[data.key] = data.value;
		var stateObj = {
			'selectedSensor': selectedSensor
		};
		this.setState(stateObj);
	}
	render() {
		var divStyle = {
			height: "100%"
		};
		var includeGeo = this.state.selectedSensor[this.state.mapping.city] ? false : true;
		return (
			<div className="row m-0" style={divStyle}>
				<ReactiveMap config={config} />
				<div className="col s6">
					<div className="row" style={divStyle}>
						<div className="col s6">
							<h5> Cities (Single Select) </h5>
							<AppbaseList
								defaultSelected="London"
								fieldName={this.state.mapping.city} 
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false} 
								sensorOnSelect={this.sensorOnSelect} 
								selectedSensor={this.state.selectedSensor}
								depends={{'topic': this.state.mapping.topic}}  />
						</div>
						<div className="col s6">
							<h5> Topics (Multiple Select)</h5>
							<AppbaseList
								fieldName={this.state.mapping.topic} 
								multipleSelect={true} 
								showCount={true} includeGeo={includeGeo} 
								sensorOnSelect={this.sensorOnSelect} 
								selectedSensor={this.state.selectedSensor}
								depends={{'city': this.state.mapping.city}} />
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider fieldName="guests" />
					</div><br/><br/><br/>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch
							fieldName={this.state.mapping.venue}
							selectedSensor={this.state.selectedSensor}
							depends={{'city': this.state.mapping.city}}  />
					</div>
					<div className="col s12">
						<SearchAsMove  
							sensorOnSelect={this.sensorOnSelect}/>
					</div>
				</div>
				<div className="col s6" style={divStyle}>
					<AppbaseMap
						fieldName={this.state.mapping.location}
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						markerCluster={false}
						onDeleteMarker={this.onDeleteMarker}
						onIndexMarker={this.onIndexMarker}
						markerOnClick={this.markerOnClick}
						markerOnDblclick={this.markerOnDblclick}
						markerOnMouseover={this.markerOnMouseover}
						markerOnMouseout={this.markerOnMouseout}
						searchComponent="appbase"
						searchField={this.state.mapping.venue}
						selectedSensor={this.state.selectedSensor}
						depends={{'city': this.state.mapping.city, 'SearchAsMove': 'SearchAsMove'}}
						defaultOptions={{
				          styles: fancyMap
				        }}
						/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));