import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './app/AppbaseMap';
import {AppbaseList} from './app/AppbaseList';
import {AppbaseSlider} from './app/AppbaseSlider';
import {AppbaseSearch} from './app/AppbaseSearch';
import {ReactiveMap} from './app/ReactiveMap';

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
				<ReactiveMap config={config} />
				<div className="col s6">
					<div className="row" style={divStyle}>
						<div className="col s6">
							<h5> Countries (Multiple Select) </h5>
							<AppbaseList fieldName="country_name" showCount={true} size={20}/>
						</div>
						<div className="col s6">
							<h5> Topics (Single Select)</h5>
							<AppbaseList fieldName="group.group_topics.topic_name_raw" multipleSelect={false} showCount={true} />
						</div>
					</div>
					<div className="col s12">
						<h5> Range of guests </h5>
						<AppbaseSlider fieldName="guests" />
					</div><br/><br/><br/>
					<div className="col s12">
						<h5> Select Venue </h5>					
						<AppbaseSearch fieldName="venue_name_ngrams" />
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
						onIndex={this.onIndex} />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));