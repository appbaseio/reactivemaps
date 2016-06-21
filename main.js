var React = require('react');
var ReactDOM = require('react-dom');

import {AppbaseMap} from './Map.jsx'
console.log(AppbaseMap);
var config = {
    appname: "surge_price",
    username: "s7I79Hzeb",
    password: "79b87fc5-9629-4842-8bc1-a5108474e178",
    type: "coordinates"
}

class Main extends AppbaseMap {
	render() {
		return(
			<AppbaseMap username={config.username} password={config.password} defaultZoom={13} defaultCenter={{lat: 37.74, lng: -122.45}}/>
		);
	}
}
ReactDOM.render(<Main />, document.getElementById('hello'));