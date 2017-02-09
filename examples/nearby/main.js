import { default as React, Component } from 'react';
import { Img } from '../HelperComponent/Img.js';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	MultiList,
	ResultList,
	GeoDistanceSlider,
	ReactiveMap
} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'map'
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.topicactuate = this.topicactuate.bind(this);
		this.onData = this.onData.bind(this);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
		this.DEFAULT_IMAGE = 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg';
	}

	topicactuate(value) {
		if(this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
			return { Match: match };
		} else return null;
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row">
			<span className="imgContainer col s2">
				<Img src={marker._source.member.photo}  />
			</span>
			<div className="infoContainer col s10">
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
								marker.group.group_topics.map(function(tag,i) {
									return (<li key={i}>{tag.topic_name}</li>)
								})
							}
						</ul>
						<span className="sort-info">
							{markerData.sort[0]}
						</span>
					</div>
				</div>
			</a>
		);
	}

	onData(res) {
		let result, combineData = res.currentData;
		if(res.mode === 'historic' && res.currentData) {
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

	// Handler function when a value is selected
	handleSelect(event) {
		this.setState({
			view: event.target.value
		});
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
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 m6 col-xs-12 col-sm-6">
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
							<div className="col s12 col-xs-12">
								<GeoDistanceSlider
									componentId="GeoDistanceSlider"
									appbaseField={this.props.mapping.location}
									range={{
										start: 1,
										end: 200
									}}
									defaultSelected={50}
									unit="mi"
									title="Geo Distance Search"
									placeholder="Search Location" />
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<select className="browser-default form-control" onChange={this.handleSelect} value={this.state.view} name="chooseView" id="chooseView">
							<option value='map' key='map'>Map</option>
							<option value='list' key='list'>List</option>
						</select>
						<div className={this.state.view !== 'map' ? 'invible' : ''}>
							<ReactiveMap
								appbaseField={this.props.mapping.location}
								historicalData={true}
								setMarkerCluster={false}
								defaultMapStyle={this.props.mapStyle}
								autoCenter={true}
								showSearchAsMove={true}
								showMapStyles={true}
								title="Reactive Maps"
								showPopoverOn = "click"
								onPopoverTrigger = {this.onPopoverTrigger}
								onData = {this.onData}
								defaultZoom = {13}
								defaultCenter={{ lat: 37.74, lng: -122.45 }}
								actuate={{
									TopicSensor: {"operation": "must"},
									GeoDistanceSlider: {"operation": "must"}
								}}
							/>
						</div>
						<div className={this.state.view !== 'list' ? 'invible' : 'h-100'}>
							<ResultList
								componentId="SearchResult"
								appbaseField={this.props.mapping.location}
								containerStyle={{height: '100%'}}
								title="Result List"
								from={0}
								size={20}
								requestOnScroll={true}
								onData={this.onData}
								actuate={{
									TopicSensor: {"operation": "must"},
									GeoDistanceSlider: {"operation": "must"}
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
		topic: 'group.group_topics.topic_name_raw.raw',
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
