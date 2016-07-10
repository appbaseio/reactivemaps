import { default as React, Component } from 'react'
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './app/AppbaseMap';
import {AppbaseList} from './app/AppbaseList';
import {AppbaseSlider} from './app/AppbaseSlider';
import {AppbaseFacet} from './app/AppbaseFacet';
import {AppbaseSearch} from './app/AppbaseSearch';

class Main extends Component {
	onIndex(data) {

	}
	onDelete(data) {

	}
	render() {
		var divStyle = {
			height: "100%",
			width: "100%"
		};
		return (
			<div style={divStyle}>
				<AppbaseMap
					config={config}
					fieldName="location"
					defaultZoom={13}
					defaultCenter={{ lat: 37.74, lng: -122.45 }}
					historicalData={true}
					markerCluster={false}
					onDelete={this.onDelete}
					searchComponent={true}
					onIndex={this.onIndex} />
				<AppbaseList config={config} fieldName="country_name" />
				<AppbaseSlider fieldName="guests" config={config} />
				<AppbaseFacet fieldName="guests" config={config} />
				<AppbaseSearch fieldName="guests" config={config} />				
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));