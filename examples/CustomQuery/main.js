import {
	default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	TextField
} from '@appbaseio/reactivebase';

import {
	ReactiveMap,
	GeoDistanceDropdown
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
	}

	cityQuery(value) {
		if (value) {
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
				<ReactiveBase
					app={this.props.config.appbase.app}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					type={this.props.config.appbase.type}
					>
					<div className="col s6">
						<div className="row h-100">
							<div className="col s12">
								<TextField
									componentId="InputSensor"
									title="Cities"
									placeholder="Search City (i.e London)"
								/>
							</div>
						</div>

						<div className="row">
							<GeoDistanceDropdown
								componentId="GeoSensor"
								appbaseField={this.props.mapping.location}
								title="Geo Distance"
								APIkey={mapsAPIKey}
								data={[{
									start: 0,
									end: 2,
									label: '0-2 mi'
								}, {
									start: 2,
									end: 5,
									label: '2-5 mi'
								}, {
									start: 5,
									end: 10,
									label: '5-10 mi'
								}, {
									start: 10,
									end: 15,
									label: '10-15 mi'
								}]}
								unit="mi"
							/>
						</div>
					</div>
					<div className="col s6 h-100">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							size={100}
							showSearchAsMove={true}
							showMapStyles={true}
							title="Meetupblast"
							actuate={{
								InputSensor: {"operation": "must", defaultQuery: this.cityQuery},
								GeoSensor: {"operation": "must"}
							}}
							/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'group.group_city.group_city_simple',
		location: 'location'
	},
	config: {
		"appbase": {
			"app": "reactivemap_demo",
			"username": "y4pVxY2Ok",
			"password": "c92481e2-c07f-4473-8326-082919282c18",
			"type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
