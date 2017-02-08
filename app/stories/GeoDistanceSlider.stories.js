import React, { Component } from 'react';
import { ReactiveBase, AppbaseSensorHelper as helper } from '@appbaseio/reactivebase';
import { GeoDistanceSlider, ReactiveMap } from '../app.js';

import { Img } from './Img.js';
const historyPin = require('./placeholder.svg');

export default class GeoDistanceSliderDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{'margin': '0', 'maxWidth': '300px'}}>
			<span className="imgContainer col s2" style={{'padding': '0'}}>
				<Img src={marker._source.member.photo}  />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{'margin': '5px 0', 'lineHeight': '18px'}}>is going to&nbsp;
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
				app={this.props.config.appbase.app}
				username={this.props.config.appbase.username}
				password={this.props.config.appbase.password}
				type={this.props.config.appbase.type}
				theme="rbc-blue"
			>
				<div className="row">
					<div className="col s6">
						<GeoDistanceSlider
							componentId="GeoDistanceSlider"
							appbaseField={this.props.mapping.location}
							range={{
								"start": 0,
								"end": 60
							}}
							{...this.props}
						/>
					</div>
					<div className="col s6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData={true}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Reactive Maps"
							showPopoverOn = "click"
							historicPin={historyPin}
							onPopoverTrigger = {this.onPopoverTrigger}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							actuate={{
								GeoDistanceSlider: {"operation": "must"}
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

GeoDistanceSliderDefault.defaultProps = {
	mapping: {
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
