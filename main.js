import { default as React, Component } from 'react'
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './app/AppbaseMap';
import {AppbaseList} from './app/AppbaseList';
import {AppbaseSlider} from './app/AppbaseSlider';
import {AppbaseSearch} from './app/AppbaseSearch';

class Main extends Component {
	onIndex(data) {

	}
	onDelete(data) {

	}
	render() {
		var divStyle = {
			height: "100%",
		};
		return (
			<div className="row" style={divStyle}>
				<div className="col s6">
					<div className="row" style={divStyle}>
						<div className="col s6">
							<h5> Number of guests (Multiple Select) </h5>
							<AppbaseList config={config} fieldName="guests" showCount={true} size={20}/>
						</div>
						<div className="col s6">
							<h5> Number of guests (Single Select)</h5>
							<AppbaseList config={config} fieldName="guests" multipleSelect={false} showCount={true} />
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider fieldName="guests" config={config} />
					</div><br/><br/><br/>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch fieldName="venue.venue_name" config={config} />
					</div>
				</div>
				<div className="col s6" style={divStyle}>
					<AppbaseMap
						config={config}
						fieldName="location"
						defaultZoom={13}
						defaultCenter={{ lat: 37.74, lng: -122.45 }}
						historicalData={true}
						markerCluster={false}
						onDelete={this.onDelete}
						searchComponent="google"
						onIndex={this.onIndex} />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));