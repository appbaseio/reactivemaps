import React, { Component } from "react";
import {
	ReactiveBase,
	DataSearch,
	SingleList,
	ReactiveMap,
	PlacesSearch,
	AppbaseSensorHelper as helper
} from "../app.js";

import { Img } from "./Img.js";
const historyPin = require("./placeholder.svg");

export default class ReactiveMapDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
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
				app="meetup2"
				credentials="qz4ZD8xq1:a0edfc7f-5611-46f6-8fe1-d4db234631f3"
				type="meetup"
				theme="rbc-blue"
			>
				<div className="row reverse-labels">
					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							historicPin={historyPin}
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: ["CitySensor", "VenueSensor"]
							}}
							{...this.props}
						/>
					</div>
					<div className="col s6 col-xs-6">
						<div>
							<DataSearch
								appbaseField={this.props.mapping.venue}
								componentId="VenueSensor"
								placeholder="Search Venue"
								actuate={{
									CitySensor: {
										operation: "must",
										doNotExecute: { true }
									}
								}}
							/>
						</div>
						<div>
							<SingleList
								componentId="CitySensor"
								appbaseField={this.props.mapping.city}
								showCount
								size={10}
								title="Input Filter"
								searchPlaceholder="Search City"
								includeSelectAll
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
		location: "location",
		venue: "venue_name_ngrams",
		city: "group.group_city.raw"
	}
};
