import React, { Component } from "react";
import {
	ReactiveBase,
	ReactiveMap,
	MultiRange
} from "../app";
import ResponsiveStory from "./ResponsiveStory";

const historyPin = require("./placeholder.svg");

export default class MultiRangeDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row">
			<div className="infoContainer col s12 col-xs-12">
				<div className="description">
					<p>
						Earthquake (at)&nbsp;
						<strong>{marker._source.place}</strong>&nbsp;
						of maginutde: <code>{marker._source.mag}</code>&nbsp;
						in the year {marker._source.time}.
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="earthquake"
				credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<MultiRange
							componentId="EarthquakeSensor"
							dataField={this.props.mapping.mag}
							title="MultiRange"
							data={
							[{ start: 3, end: 3.9, label: "Minor" },
								{ start: 4, end: 4.9, label: "Light" },
								{ start: 5, end: 5.9, label: "Moderate" },
								{ start: 6, end: 6.9, label: "Strong" },
								{ start: 7, end: 7.9, label: "Major" },
								{ start: 8, end: 10, label: "Great" }]
							}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ReactiveMap
							dataField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							historicPin={historyPin}
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: "EarthquakeSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

MultiRangeDefault.defaultProps = {
	mapping: {
		mag: "mag",
		location: "location"
	}
};
