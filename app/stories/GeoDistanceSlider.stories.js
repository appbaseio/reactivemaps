import React, { Component } from 'react';
import { ReactiveBase } from '@appbaseio/reactivebase';
import { GeoDistanceSlider, ReactiveMap } from '../app.js';
import { Img } from './Img.js';
import { AppbaseSensorHelper as helper } from '@appbaseio/reactivebase';

const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';
const historyPin = require('./placeholder.svg');

export default class GeoDistanceSliderDefault extends Component {
	constructor(props) {
		super(props);
		this.popoverContent = this.popoverContent.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	popoverContent(marker) {
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
							APIkey={mapsAPIKey}
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
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Reactive Maps"
							showPopoverOn = "onClick"
							historicPin={historyPin}
							popoverContent = {this.popoverContent}
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
	mapStyle: "Light Monochrome",
	mapping: {
		topic: 'group.group_topics.topic_name_raw.raw',
		location: 'location',
		venue: 'venue_name_ngrams'
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
