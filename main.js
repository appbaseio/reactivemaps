import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import { Img } from './examples/HelperComponent/Img.js';
import {
	ReactiveBase,
	SingleList,
	MultiList,
	RangeSlider,
	DataSearch,
	ToggleButton
} from '@appbaseio/reactivebase';

import { ReactiveMap } from './app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.topicDepends = this.topicDepends.bind(this);
		this.popoverContent = this.popoverContent.bind(this);
	}

	topicDepends(value) {
		if (this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
			return { Match: match };
		} else return null;
	}

	popoverContent(marker) {
		console.log(marker);
		return (<div className="popoverComponent row">
			<span className="imgContainer col s2 col-xs-2">
				<Img src={marker._source.member.photo} />
			</span>
			<div className="infoContainer col s10 col-xs-10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	onData(res) {}

	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveBase
					app={this.props.config.appbase.app}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					>
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 m6 col-xs-12 col-sm-6">
								<SingleList
									sensorId="CitySensor"
									appbaseField={this.props.mapping.city}
									defaultSelected="London"
									showCount={true}
									size={1000}
									includeGeo={false}
									showSearch={true}
									title="Cities"
									searchPlaceholder="Filter City"
								/>
							</div>
							<div className="col s12 m6 col-xs-12 col-sm-6">
								<MultiList
									appbaseField={this.props.mapping.topic}
									sensorId="TopicSensor"
									showCount={true}
									size={100}
									includeGeo={true}
									title="Topics"
									actuate={{
										CitySensor: {
											"operation": "must",
											"defaultQuery": this.topicDepends
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Reactive Maps"
							showPopoverOn = "onClick"
							popoverContent = {this.popoverContent}
							onData = {this.onData}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							actuate={{
								CitySensor: {"operation": "must"},
								TopicSensor: {"operation": "must"},
								RangeSensor: {"operation": "must"},
								VenueSensor: {"operation": "must"},
								GuestSensor: {"operation": "should"}
							}}
						/>

						<div id="searchVenue">
							<DataSearch
								appbaseField={this.props.mapping.venue}
								sensorId="VenueSensor"
								placeholder="Search Venue"
								actuate={{
									'CitySensor': {
										"operation": "must",
										"doNotExecute": {true}
									}
								}}
							/>
						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'group.group_city.raw',
		topic: 'group.group_topics.topic_name_raw.raw',
		venue: 'venue_name_ngrams',
		guests: 'guests',
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
