import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');

import {
	ReactiveBase,
	TextField,
	ReactiveMap,
	GeoDistanceDropdown,
	PlacesSearch,
	SelectedFilters,
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{ margin: "0", maxWidth: "300px" }}>
			<span className="imgContainer col s2" style={{ padding: "0" }}>
				<Img src={marker._source.member.photo} />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{ margin: "5px 0", lineHeight: "18px" }}>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="reactivemap_demo"
				credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
				type="meetupdata1"
				theme="rbc-blue"
			>
				<div className="row">
					<SelectedFilters componentId="SelectedFilters" />
					<div className="col s6 col-xs-6">
						<GeoDistanceDropdown
							componentId="GeoDistanceDropdown"
							appbaseField={this.props.mapping.location}
							URLParams={true}
							unit="mi"
							data={
								[{ start: 1, end: 100, label: "Less than 100 miles" },
								{ start: 101, end: 200, label: "Between 100 and 200 miles" },
								{ start: 201, end: 500, label: "Between 200 and 500 miles" },
								{ start: 501, end: 1000, label: "Above 500 miles" }]
							}
							placeholder="Search Location"
						/>
					</div>
					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: "GeoDistanceDropdown"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

Main.defaultProps = {
	mapping: {
		location: "location"
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
