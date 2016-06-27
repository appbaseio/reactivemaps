import { default as React, Component } from 'react'
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './AppbaseMap'

class Main extends Component {
	onIndex() {

	}
	onDelete() {

	}
	render() {
		return (
			<AppbaseMap config={config} defaultZoom={13} defaultCenter={{ lat: 37.74, lng: -122.45 }} historicalData={true} onDelete={this.onDelete} onIndex={this.onIndex}/>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('hello'));