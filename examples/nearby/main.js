import { default as React, Component } from "react";
import { Img } from "../HelperComponent/Img.js";
var ReactDOM = require("react-dom");
import { AppbaseSensorHelper as helper } from "@appbaseio/reactivebase";
import {
	ReactiveBase,
	MultiList,
	ReactiveList,
	GeoDistanceSlider,
	ReactiveMap
} from "../../app/app.js";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: "map"
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.onData = this.onData.bind(this);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
		this.DEFAULT_IMAGE = "http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg";
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row">
			<span className="imgContainer col s2">
				<Img src={marker._source.member.photo} />
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

	onData(markerData) {
		const marker = markerData._source;
		return (
			<a className="full_row single-record single_record_for_clone"
				href={marker.event ? marker.event.event_url : ""}
				target="_blank"
				key={markerData._id}>
				<div className="img-container">
					<Img key={markerData._id} src={marker.member ? marker.member.photo : this.DEFAULT_IMAGE} />
				</div>
				<div className="text-container full_row">
					<div className="text-head text-overflow full_row">
						<span className="text-head-info text-overflow">
							{marker.member ? marker.member.member_name : ""} is going to {marker.event ? marker.event.event_name : ""}
						</span>
						<span className="text-head-city">{marker.group ? marker.group.group_city : ""}</span>
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
					app="reactivemap_demo"
					credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
					type="meetupdata1"
					>
					<div className="col s12 m6 col-xs-12 col-sm-6">
						<div className="row h-100">
							<div className="col s12 m6 col-xs-12 col-sm-6">
								<MultiList
									appbaseField="group.group_topics.topic_name_raw"
									componentId="TopicSensor"
									showCount={true}
									size={100}
									title="Topics"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s12 col-xs-12">
								<GeoDistanceSlider
									componentId="GeoDistanceSlider"
									appbaseField="location"
									range={{
										start: 1,
										end: 200
									}}
									defaultSelected={{
										location: "SOMA sanfrancisco",
										distance: 50
									}}
									unit="mi"
									title="Geo Distance Search"
									placeholder="Search Location"
								/>
							</div>
						</div>
					</div>
					<div className="col s12 m6 h-100 col-xs-12 col-sm-6">
						<select className="browser-default form-control" onChange={this.handleSelect} value={this.state.view} name="chooseView" id="chooseView">
							<option value="map" key="map">Map</option>
							<option value="list" key="list">List</option>
						</select>
						<div className={this.state.view !== "map" ? "invisible" : ""} >
							<ReactiveMap
								appbaseField="location"
								historicalData={true}
								setMarkerCluster={false}
								defaultMapStyle="Light Monochrome"
								autoCenter={true}
								showSearchAsMove={true}
								showMapStyles={true}
								title="Reactive Maps"
								showPopoverOn = "click"
								onPopoverTrigger = {this.onPopoverTrigger}
								defaultZoom = {13}
								defaultCenter={{ lat: 37.74, lon: -122.45 }}
								react={{
									and: ["TopicSensor", "GeoDistanceSlider"]
								}}
							/>
						</div>
						<div className={this.state.view !== "list" ? "invisible" : "h-100"}>
							<ReactiveList
								componentId="SearchResult"
								appbaseField="location"
								containerStyle={{
									height: "100%"
								}}
								title="Result List"
								from={0}
								size={20}
								requestOnScroll={true}
								onData={this.onData}
								react={{
									and: ["TopicSensor", "GeoDistanceSlider"]
								}}
							/>
						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById("map"));
