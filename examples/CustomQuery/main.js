import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList,
		InputField
	} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
	}
	cityQuery(value) {
		if(value) {
			return { 
				match: {
					'group.group_city.group_city_simple': value
				}
			};
		} else return null;
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config}>
					<div className="col s6">
						<div className="row h-100">
							<div className="col s12">
								<InputField
									sensorId="InputSensor"
									title="Cities"
									placeholder="Search City (i.e London)"
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
							size={100}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Meetupblast"
							depends={{
								InputSensor: {"operation": "must", defaultQuery: this.cityQuery},
							}}
							/>
					</div>
				</ReactiveMap>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'group.group_city.group_city_simple',
		location: 'venue'
	},
	config: {
		"appbase": {
			"appname": "meetup2",
			"username": "qz4ZD8xq1",
			"password": "a0edfc7f-5611-46f6-8fe1-d4db234631f3",
			"type": "meetup"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
