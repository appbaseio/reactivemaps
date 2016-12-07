import { default as React, Component } from 'react';
import {Img} from '../../app/sensors/component/Img.js';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList,
		DistanceSensor,
		ListResult
	} from '../../app/app.js';
const mapsAPIKey = 'AIzaSyAXev-G9ReCOI4QOjPotLsJE-vQ1EX7i-A';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'map'
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.topicDepends = this.topicDepends.bind(this);
		this.markerOnIndex = this.markerOnIndex.bind(this);
		this.popoverContent = this.popoverContent.bind(this);
		this.DEFAULT_IMAGE = 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg';
	}
	topicDepends(value) {
		if(this.props.mapping.city && value) {
			let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
			return { Match: match };
		} else return null;
	}
	popoverContent(marker) {
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
								marker.group.group_topics.map(function(tag,i){
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
	markerOnIndex(res) {
		let result;
		if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
			result = res.allMarkers.hits.hits.map((markerData, index) => {
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
				<ReactiveMap config={this.props.config}>
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 m6 col-xs-12 col-sm-6">
								<AppbaseList
									inputData={this.props.mapping.topic}
									sensorId="TopicSensor"
									showCount={true}
									size={100}
									multipleSelect={true}
									includeGeo={true}
									title="Topics"
									depends={{
										CitySensor: {
											"operation": "must",
											"defaultQuery": this.topicDepends
										}
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<DistanceSensor
									sensorId="DistanceSensor"
									APIkey={mapsAPIKey}
									inputData={this.props.mapping.location}
									minThreshold={1}
									maxThreshold={60}
									value={50}
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
							<AppbaseMap
								inputData={this.props.mapping.location}
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
								popoverContent = {this.popoverContent}
								markerOnIndex = {this.markerOnIndex}
								defaultZoom = {13}
								defaultCenter={{ lat: 37.74, lng: -122.45 }}
								depends={{
									TopicSensor: {"operation": "must"},
									DistanceSensor: {"operation": "must"}
								}}
							/>
						</div>
						<div className={this.state.view !== 'list' ? 'invible' : 'h-100'}>
							<ListResult
								containerStyle={{height: '100%'}}
								requestSize={50}
								markerOnIndex={this.markerOnIndex}
								depends={{
									TopicSensor: {"operation": "must"},
									DistanceSensor: {"operation": "must"}
								}}
							/>
						</div>
					</div>
				</ReactiveMap>
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
		   "appname": "reactivemap_demo",
		   "username": "y4pVxY2Ok",
		   "password": "c92481e2-c07f-4473-8326-082919282c18",
		   "type": "meetupdata1"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
