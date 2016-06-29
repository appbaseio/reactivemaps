import { default as React, Component } from 'react'
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './AppbaseMap'

class Main extends Component {
	onIndex(data) {
		
	}
	onDelete(data) {

	}
	render() {
		return (
			<AppbaseMap
				config={config}
				fieldName="venue"
				defaultZoom={13}
				defaultCenter={{ lat: 37.74, lng: -122.45 }}
				historicalData={true}
				markerCluster={true}
				onDelete={this.onDelete}
				searchComponent={true}
				onIndex={this.onIndex} />
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));