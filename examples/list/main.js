import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import { Img } from '../HelperComponent/Img.js';
import {
	ReactiveBase,
	SingleList,
	MultiList,
	RangeSlider,
	DataSearch,
	ResultList
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.topicactuate = this.topicactuate.bind(this);
		this.onData = this.onData.bind(this);
		this.DEFAULT_IMAGE = 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg';
	}

	topicactuate(value) {
		if (this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
			return { Match: match };
		} else return null;
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

	onData(res) {
		let result, combineData = res.currentData;
		if(res.mode === 'historic') {
			combineData = res.currentData.concat(res.newData);
		}
		if (combineData) {
			result = combineData.map((markerData, index) => {
				let marker = markerData._source;
				return this.itemMarkup(marker, markerData);
			});
		}
		return result;
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
					<div className="col s12 m6">
						<div className="row h-100">
							<div className="col s12 m6">
								<SingleList
									componentId="CitySensor"
									appbaseField={this.props.mapping.city}
									defaultSelected="London"
									showCount={true}
									size={1000}
									showSearch={true}
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
							<div className="col s12 m6">
								<MultiList
									appbaseField={this.props.mapping.topic}
									componentId="TopicSensor"
									showCount={true}
									size={100}
									title="Topics"
									actuate={{
										CitySensor: {
											"operation": "must",
											"customQuery": this.topicactuate
										}
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								<RangeSlider
									componentId="RangeSensor"
									appbaseField={this.props.mapping.guests}
									actuate={{
										CitySensor: {
											"operation": "must",
											"customQuery": this.topicactuate
										}
									}}
									title="guests"
									startThreshold={0}
									endThreshold={5}
									stepValue={1} />
							</div>
						</div>
						<div className="row">
							<div className="col s12">
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
						</div>
					</div>
					<div className="col s12 m6 h-100">
						<ResultList
							appbaseField={this.props.mapping.topic}
							containerStyle={{height: '100%'}}
							onData={this.onData}
							from={0}
							size={10}
							requestOnScroll={true}
							title="Results"
							actuate={{
								CitySensor: {"operation": "must"},
								TopicSensor: {"operation": "must"},
								RangeSensor: {"operation": "must"},
								VenueSensor: {"operation": "must"}
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
		city: 'group.group_city.raw',
		topic: 'group.group_topics.topic_name_raw.raw',
		venue: 'venue_name_ngrams',
		guests: 'guests'
	},
	config: {
		"appbase": {
			"app": "meetup_demo",
			"username": "LPpISlEBe",
			"password": "2a8935f5-0f63-4084-bc3e-2b2b4d1a8e02",
			"type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
