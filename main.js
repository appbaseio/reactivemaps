var React = require('react');
var ReactDOM = require('react-dom');
var config = require('./config.js');
import {AppbaseMap} from './Map.jsx'

console.log(config);


class Main extends AppbaseMap {
	render() {
		return(
			<AppbaseMap config={config} defaultZoom={13} defaultCenter={{lat: 37.74, lng: -122.45}}/>
		);
	}
}
ReactDOM.render(<Main />, document.getElementById('hello'));