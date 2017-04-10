import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	ReactiveMap
} from '../../app/app.js';
var $ = require('jquery');

class Main extends Component {
	constructor(props) {
		super(props);
		this.eventLists = [
			'onClick',
			'onDblclick',
			'onDrag',
			'onDragstart',
			'onDragend',
			'onMousemove',
			'onMouseout',
			'onMouseover',
			'onResize',
			'onRightclick',
			'onTilesloaded',
			'onBoundsChanged',
			'onCenterChanged',
			'onProjectionChanged',
			'onTiltChanged',
			'onZoomChanged'
		];
		this.onIdle = this.onIdle.bind(this);
		this.onMouseover = this.onMouseover.bind(this);
		this.onMouseout = this.onMouseout.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onDblclick = this.onDblclick.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragstart = this.onDragstart.bind(this);
		this.onDragend = this.onDragend.bind(this);
		this.onMousemove = this.onMousemove.bind(this);
		this.onMouseout = this.onMouseout.bind(this);
		this.onMouseover = this.onMouseover.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onRightclick = this.onRightclick.bind(this);
		this.onTilesloaded = this.onTilesloaded.bind(this);
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.onCenterChanged = this.onCenterChanged.bind(this);
		this.onProjectionChanged = this.onProjectionChanged.bind(this);
		this.onTiltChanged = this.onTiltChanged.bind(this);
		this.onZoomChanged = this.onZoomChanged.bind(this);
	}
	renderEventName() {
		return this.eventLists.map((eventName, index) => {
			return (<li key={index} ref={"event-"+eventName}>{eventName}</li>);
		});
	}
	onIdle(mapRef) {
		this.eventActive('event-onIdle');
	}
	onMouseover(mapRef) {
		this.eventActive('event-onMouseover');
	}
	onMouseout(mapRef) {
		this.eventActive('event-onMouseout');
	}
	onClick(mapRef) {
		this.eventActive('event-onClick');
	}
	onDblclick(mapRef) {
		this.eventActive('event-onDblclick');
	}
	onDrag(mapRef) {
		this.eventActive('event-onDrag');
	}
	onDragstart(mapRef) {
		this.eventActive('event-onDragstart');
	}
	onDragend(mapRef) {
		this.eventActive('event-onDragend');
	}
	onMousemove(mapRef) {
		this.eventActive('event-onMousemove');
	}
	onMouseout(mapRef) {
		this.eventActive('event-onMouseout');
	}
	onMouseover(mapRef) {
		this.eventActive('event-onMouseover');
	}
	onResize(mapRef) {
		this.eventActive('event-onResize');
	}
	onRightclick(mapRef) {
		this.eventActive('event-onRightclick');
	}
	onTilesloaded(mapRef) {
		this.eventActive('event-onTilesloaded');
	}
	onBoundsChanged(mapRef) {
		this.eventActive('event-onBoundsChanged');
	}
	onCenterChanged(mapRef) {
		this.eventActive('event-onCenterChanged');
	}
	onProjectionChanged(mapRef) {
		this.eventActive('event-onProjectionChanged');
	}
	onTiltChanged(mapRef) {
		this.eventActive('event-onTiltChanged');
	}
	onZoomChanged(mapRef) {
		this.eventActive('event-onZoomChanged');
	}
	onClick(mapRef) {
		this.eventActive('event-onClick');
	}
	eventActive(eventRef) {
		$(this.refs[eventRef]).addClass('active');
		setTimeout(() => {
			$(this.refs[eventRef]).removeClass('active');
		}, 1500);
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveBase
					app="checkin"
					credentials="6PdfXag4h:b614d8fa-03d8-4005-b6f1-f2ff31cd0f91"
					type="city"
					>
					<div className="col s12 m9 h-100">
						<ReactiveMap
							appbaseField="location"
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={true}
							showSearchAsMove={true}
							title="Events Example"
							showMapStyles={true}
							onIdle={this.onIdle}
							onMouseover={this.onMouseover}
							onMouseout={this.onMouseout}
							onClick={this.onClick}
							onDblclick={this.onDblclick}
							onDrag={this.onDrag}
							onDragstart={this.onDragstart}
							onDragend={this.onDragend}
							onMousemove={this.onMousemove}
							onMouseout={this.onMouseout}
							onMouseover={this.onMouseover}
							onResize={this.onResize}
							onRightclick={this.onRightclick}
							onBoundsChanged={this.onBoundsChanged}
							onCenterChanged={this.onCenterChanged}
							onProjectionChanged={this.onProjectionChanged}
							onTiltChanged={this.onTiltChanged}
							onZoomChanged={this.onZoomChanged}
						/>
					</div>
					<div className="col s12 m3">
						<ul>
							{this.renderEventName()}
						</ul>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('map'));
