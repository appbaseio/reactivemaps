import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap, 
		AppbaseMap, 
		AppbaseSearch, 
		AppbaseSlider, 
		AppbaseList} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
	    super(props);
	    this.cityQuery = this.cityQuery.bind(this);
	}
	cityQuery(value) {
		if(value) {
			let field = 'city';
			let match = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
	    	return { match: match };
    	} else return null;
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
				<div className="col s6">
					<div className="row h-100">
						<div className="col s6">
							<h5> Cities (Single Select) </h5>
							<AppbaseList
								sensorId="CitySensor"
								inputData={this.props.mapping.city} 
								defaultSelected="london"
								showCount={true} 
								size={1000} 
								multipleSelect={false} 
								includeGeo={false}
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
						searchAsMoveComponent={true}
						MapStylesComponent={true}
						depends={{
							CitySensor: {"operation": "must", defaultQuery: this.cityQuery}
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
		city: 'city',
		topic: 'group.group_topics.topic_name.topic_name_simple',
		venue: 'venue_name_ngrams',
		location: 'location'
	},
	config: {
		"appbase": {
			"appname": "checkin",
		    "username": "6PdfXag4h",
		    "password": "b614d8fa-03d8-4005-b6f1-f2ff31cd0f91",
		    "type": "city"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));