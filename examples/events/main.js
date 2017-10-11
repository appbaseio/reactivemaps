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
			'onDblClick',
			'onDrag',
			'onDragStart',
			'onDragEnd',
			'onMouseMove',
			'onMouseOut',
			'onMouseOver',
			'onResize',
			'onRightClick',
			'onTilesLoaded',
			'onBoundsChanged',
			'onCenterChanged',
			'onProjectionChanged',
			'onTiltChanged',
			'onZoomChanged'
		];
		this.onIdle = this.onIdle.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onDblClick = this.onDblClick.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onRightClick = this.onRightClick.bind(this);
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
	onMouseOver(mapRef) {
		this.eventActive('event-onMouseOver');
	}
	onMouseOut(mapRef) {
		this.eventActive('event-onMouseOut');
	}
	onClick(mapRef) {
		this.eventActive('event-onClick');
	}
	onDblClick(mapRef) {
		this.eventActive('event-onDblClick');
	}
	onDrag(mapRef) {
		this.eventActive('event-onDrag');
	}
	onDragStart(mapRef) {
		this.eventActive('event-onDragDtart');
	}
	onDragEnd(mapRef) {
		this.eventActive('event-onDragEnd');
	}
	onMouseMove(mapRef) {
		this.eventActive('event-onMouseMove');
	}
	onMouseOut(mapRef) {
		this.eventActive('event-onMouseOut');
	}
	onMouseOver(mapRef) {
		this.eventActive('event-onMouseOver');
	}
	onResize(mapRef) {
		this.eventActive('event-onResize');
	}
	onRightClick(mapRef) {
		this.eventActive('event-onRightClick');
	}
	onTilesloaded(mapRef) {
		this.eventActive('event-onTilesLoaded');
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
							dataField="location"
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={true}
							showSearchAsMove={true}
							title="Events Example"
							showMapStyles={true}
							onIdle={this.onIdle}
							onMouseOver={this.onMouseOver}
							onMouseOut={this.onMouseOut}
							onClick={this.onClick}
							onDblClick={this.onDblClick}
							onDrag={this.onDrag}
							onDragStart={this.onDragStart}
							onDragEnd={this.onDragEnd}
							onMouseMove={this.onMouseMove}
							onMouseOut={this.onMouseOut}
							onMouseOver={this.onMouseOver}
							onResize={this.onResize}
							onRightClick={this.onRightClick}
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
