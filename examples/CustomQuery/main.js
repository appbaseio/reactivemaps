import {
	default as React, Component } from 'react';
var ReactDOM = require('react-dom');

import {
	ReactiveBase,
	TextField,
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
					app="reactivemap_demo"
					credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
					type="meetupdata1"
					>
					<div className="col s6">
						<div className="row h-100">
							<div className="col s12">
								<TextField
									componentId="InputSensor"
									title="Cities"
									placeholder="Search City (i.e London)"
									customQuery={this.cityQuery}
								/>
							</div>
						</div>

						<div className="row">
							<GeoDistanceDropdown
								componentId="GeoSensor"
								appbaseField="location"
								title="Geo Distance"
								data={[{
									start: 1,
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
							appbaseField="location"
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={true}
							size={100}
							showSearchAsMove={true}
							showMapStyles={true}
							title="Meetupblast"
							react={{
								"and": ["InputSensor", "GeoSensor"]
							}}
						/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));
