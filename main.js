import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
var config = require('./config.js');
// sensors
import {AppbaseList} from './app/sensors/AppbaseList';
import {AppbaseSlider} from './app/sensors/AppbaseSlider';
import {AppbaseSearch} from './app/sensors/AppbaseSearch';
// actuators
import {AppbaseMap} from './app/actuators/AppbaseMap';
// middleware
import {ReactiveMap} from './app/middleware/ReactiveMap';

class Main extends Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	    this.state = {
	    	city: 'group.group_city.raw',
	    	zoom: 13,
	    	topic: 'group.group_topics.topic_name_raw',
	    	selectedSensor: {}
	    };
	}
	onIndex(data) {

	}
	onDelete(data) {

	}
	onSelect(data) {
		var selectedSensor = this.state.selectedSensor;
		selectedSensor[data.key] = data.value;
		var extraQuery = {
			'term': selectedSensor
		};
		this.setState({
			'selectedSensor': selectedSensor,
			'extraQuery': extraQuery
		});
	}
	render() {
		var divStyle = {
			height: "100%"
		};
		var includeGeo = this.state.selectedSensor[this.state.city] ? false : true;
          
		return (
			<div className="row m-0" style={divStyle}>
				<ReactiveMap config={config} />
				<div className="col s6">
					<div className="row" style={divStyle}>
						<div className="col s6">
							<h5> Cities (Single Select) </h5>
							<AppbaseList onSelect={this.onSelect} fieldName={this.state.city} showCount={true} size={1000} multipleSelect={false} includeGeo={false} />
						</div>
						<div className="col s6">
							<h5> Topics (Multiple Select)</h5>
							<AppbaseList fieldName={this.state.topic} 
							selectedSensor={this.state.selectedSensor} 
							cityField={this.state.city}  
							multipleSelect={true} 
							showCount={true} includeGeo={includeGeo} />
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider fieldName="guests" />
					</div><br/><br/><br/>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch fieldName="venue_name_ngrams"
						 	extraQuery={this.state.extraQuery}  />
					</div>
				</div>
				<div className="col s6" style={divStyle}>
					<AppbaseMap
						fieldName="location"
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						markerCluster={false}
						onDelete={this.onDelete}
						searchComponent="appbase"
						searchField="venue_name_ngrams"
						onIndex={this.onIndex} 
						extraQuery={this.state.extraQuery} />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));