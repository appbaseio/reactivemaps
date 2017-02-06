import React, { Component } from 'react';
import { ReactiveBase, DataSearch, SingleList } from '@appbaseio/reactivebase';
import { GoogleSearch, ReactiveMap } from '../app.js';
import { Img } from './Img.js';
import { AppbaseSensorHelper as helper } from '@appbaseio/reactivebase';

const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';
const historyPin = require('./placeholder.svg');

export default class ReactiveMapDefault extends Component {
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
				app="meetup_demo"
				username="LPpISlEBe"
				password="2a8935f5-0f63-4084-bc3e-2b2b4d1a8e02"
				theme="rbc-blue"
			>
				<div className="row">
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
							historicPin={historyPin}
							popoverContent = {this.popoverContent}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							actuate={{
								CitySensor: {"operation": "must"},
								VenueSensor: {"operation": "must"}
							}}
							{...this.props}
						/>
					</div>
					<div className="col s6">
						<div>
							<DataSearch
								appbaseField={this.props.mapping.venue}
								componentId="VenueSensor"
								searchRef="CityVenue"
								placeholder="Search Venue"
								actuate={{
									'CitySensor': {
										"operation": "must",
										"doNotExecute": {true}
									}
								}}
							/>
						</div>
						<div>
							<SingleList
								componentId="CitySensor"
								appbaseField={this.props.mapping.city}
								showCount={true}
								size={10}
								title="Input Filter"
								searchPlaceholder="Search City"
								includeSelectAll={true}
							/>
						</div>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

ReactiveMapDefault.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		topic: 'group.group_topics.topic_name_raw.raw',
		location: 'location',
		venue: 'venue_name_ngrams',
		city: 'group.group_city.raw'
	},
	config: {
		"appbase": {
			"app": "meetup2",
			"username": "qz4ZD8xq1",
			"password": "a0edfc7f-5611-46f6-8fe1-d4db234631f3",
			"type": "meetup"
		}
	}
};
