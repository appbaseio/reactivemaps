import React, { Component } from 'react';
import { 
	ReactiveBase,
	MultiList,
	AppbaseSensorHelper as helper } from '@appbaseio/reactivebase';
import { ReactiveMap } from '../app.js';
import { Img } from './Img.js';

const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';
const historyPin = require('./placeholder.svg');

export default class SingleListDefault extends Component {
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

	itemMarkup(marker, markerData) {
		return (
			<a className="full_row single-record single_record_for_clone"
				href={marker.event ? marker.event.event_url : ''}
				target="_blank"
				key={markerData._id}>
				<div className="img-container">
					<Img key={markerData._id} src={marker.member ? marker.member.photo : this.DEFAULT_IMAGE} />
				</div>
				<div className="text-container full_row">
					<div className="text-head text-overflow full_row">
						<span className="text-head-info text-overflow">
							{marker.member ? marker.member.member_name : ''} is going to {marker.event ? marker.event.event_name : ''}
						</span>
						<span className="text-head-city">{marker.group ? marker.group.group_city : ''}</span>
					</div>
					<div className="text-description text-overflow full_row">
						<ul className="highlight_tags">
							{
								marker.group.group_topics.map(function(tag,i){
									return (<li key={i}>{tag.topic_name}</li>)
								})
							}
						</ul>
					</div>
				</div>
			</a>
		);
	}

	render() {
		return (
			<ReactiveBase
				app="meetup_demo"
				username="LPpISlEBe"
				password="2a8935f5-0f63-4084-bc3e-2b2b4d1a8e02"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<MultiList
							componentId="CitySensor"
							appbaseField={this.props.mapping.city}
							title="MultiList"
							size={100}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
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
							}}
							{...this.props}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

SingleListDefault.defaultProps = {
	mapping: {
		city: 'group.group_city.raw',
		location: 'location'
	}
};
