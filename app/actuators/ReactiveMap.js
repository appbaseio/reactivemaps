/* eslint max-lines: 0 */
import React, { Component } from "react";
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import classNames from "classnames";
import {
	AppbaseChannelManager as manager,
	AppbaseSensorHelper as helper,
	PoweredBy
} from "@appbaseio/reactivebase";
import { SearchAsMove } from "../addons/SearchAsMove";
import { MapStyles, mapStylesCollection } from "../addons/MapStyles";
import { identifyGeoData, validation, afterChannelResponse } from "../helper/ReactiveMapHelper";

export default class ReactiveMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			selectedMarker: null,
			streamingStatus: "Intializing..",
			center: this.props.defaultCenter,
			query: {},
			rawData: {
				hits: {
					hits: []
				}
			},
			currentData: [],
			externalData: {},
			mapBounds: null
		};
		this.geoRelatedEvents = ["onDragend", "onZoomChanged"];
		this.previousSelectedSensor = {};
		this.searchAsMoveChange = this.searchAsMoveChange.bind(this);
		this.mapStyleChange = this.mapStyleChange.bind(this);
		this.geoCustomQuery = this.geoCustomQuery.bind(this);
		this.handleMarkerClose = this.handleMarkerClose.bind(this);
		this.queryStartTime = 0;
		this.reposition = false;
	}

	getMapStyle(styleName) {
		const selectedStyle = mapStylesCollection.filter(style => style.key === styleName);

		if (selectedStyle.length) {
			return selectedStyle[0].value;
		}
		return null;
	}

	componentDidMount() {
		this.streamProp = this.props.stream;
		this.sizeProp = this.props.size;
		this.initialize();
	}

	initialize(updateExecute = false) {
		this.setGeoQueryInfo();
		this.createChannel(updateExecute);
		const currentMapStyle = this.getMapStyle(this.props.defaultMapStyle);
		this.applyGeoQuery = this.props.applyGeoQuery ? this.props.applyGeoQuery : this.props.setSearchAsMove;
		this.setState({
			currentMapStyle
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultMapStyle !== this.props.defaultMapStyle) {
			this.mapStyleChange(this.getMapStyle(nextProps.defaultMapStyle));
		}
	}

	componentWillUpdate() {
		setTimeout(() => {
			if (this.streamProp !== this.props.stream) {
				this.streamProp = this.props.stream;
				this.removeChannel();
				this.initialize();
			}
			if (this.sizeProp !== this.props.size) {
				this.sizeProp = this.props.size;
				this.removeChannel();
				this.initialize(true);
			}
		}, 300);
	}

	// stop streaming request and remove listener when component will unmount
	componentWillUnmount() {
		this.removeChannel();
	}

	removeChannel() {
		if (this.channelId) {
			manager.stopStream(this.channelId);
			this.channelId = null;
		}
		if (this.channelListener) {
			this.channelListener.remove();
		}
	}

	// Create a channel which passes the actuate and receive results whenever actuate changes
	createChannel() {
		// Set the actuate - add self aggs query as well with actuate
		const react = this.props.react ? this.props.react : {};
		if (react && react.and && typeof react.and === "string") {
			react.and = [react.and];
		} else {
			react.and = [];
		}
		react.and.push("geoQuery");
		react.and.push("streamChanges");
		// create a channel and listen the changes
		const channelObj = manager.create(this.context.appbaseRef, this.context.type, react, this.props.size, this.props.from, this.props.stream);
		this.channelId = channelObj.channelId;
		this.channelListener = channelObj.emitter.addListener(channelObj.channelId, (res) => {
			const data = res.data;
			// implementation to prevent initialize query issue if old query response is late then the newer query
			// then we will consider the response of new query and prevent to apply changes for old query response.
			// if queryStartTime of channel response is greater than the previous one only then apply changes

			function checkAndGo() {
				if (res.mode === "historic" && res.startTime > this.queryStartTime) {
					this.afterChannelResponse(res);
				} else if (res.mode === "streaming") {
					this.afterChannelResponse(res);
				}
			}

			function initialize() {
				if (res.error && res.startTime > this.queryStartTime) {
					if (this.props.onData) {
						const modifiedData = helper.prepareResultData(res);
						this.props.onData(modifiedData.res, modifiedData.err);
					}
				} else if (res.appliedQuery) {
					if (!this.state.mapBounds) {
						checkAndGo.call(this);
					} else if (this.props.autoMapRender) {
						checkAndGo.call(this);
					} else if (data.hits.hits.length) {
						checkAndGo.call(this);
					}
				}
			}

			initialize.call(this);
		});
		const obj = {
			key: "streamChanges",
			value: ""
		};
		helper.selectedSensor.set(obj, true);
	}

	afterChannelResponse(res) {
		const getResult = afterChannelResponse(res, this.state.rawData, this.props.appbaseField, this.state.markersData);
		this.reposition = true;
		this.streamFlag = getResult.streamFlag;
		this.queryStartTime = getResult.queryStartTime;
		this.setState({
			rawData: getResult.rawData,
			markersData: getResult.markersData
		}, () => {
			if (this.props.onData) {
				// Pass the historic or streaming data in index method
				res.allMarkers = getResult.rawData;
				let modifiedData = JSON.parse(JSON.stringify(res));
				modifiedData.newData = getResult.newData;
				modifiedData.currentData = getResult.currentData;
				delete modifiedData.data;
				modifiedData.mapRef = this.mapRef;
				modifiedData = helper.prepareResultData(modifiedData, res.data);
				if (this.props.onData) {
					const generatedData = this.props.onData(modifiedData.res, modifiedData.err);
					this.setState({
						externalData: generatedData
					});
				}
			}
			if (this.streamFlag) {
				this.streamMarkerInterval();
			}
		});
	}

	// set the query type and input data
	setGeoQueryInfo() {
		const obj = {
			key: "geoQuery",
			value: {
				queryType: "geo_bounding_box",
				inputData: this.props.appbaseField,
				customQuery: this.geoCustomQuery
			}
		};
		const obj1 = {
			key: "updateExecute",
			value: {
				queryType: "random",
				inputData: this.props.appbaseField
			}
		};

		helper.selectedSensor.setSensorInfo(obj);
		helper.selectedSensor.setSensorInfo(obj1);
	}

	geoCustomQuery(value) {
		let query = null;
		if (value) {
			query = {
				geo_bounding_box: {
					[this.props.appbaseField]: value
				}
			};
			if (this.geoRelatedEventsChange) {
				this.geoRelatedEventsChange = false;
			} else if (this.applyGeoQuery) {
				this.applyGeoQuery = false;
			}
		}
		return query;
	}

	updateExecute() {
		setTimeout(() => {
			const obj = {
				key: "updateExecute",
				value: Math.random()
			};
			helper.selectedSensor.set(obj, true);
		}, 1000);
	}

	// Show InfoWindow and re-renders component
	handleMarkerClick(marker) {
		marker.showInfo = true;
		this.reposition = false;
		this.setState({
			rerender: true
		});
	}

	// Close infowindow
	handleMarkerClose(marker) {
		marker.showInfo = false;
		this.reposition = false;
		this.setState(this.state);
	}

	// render infowindow
	renderInfoWindow(ref, marker) {
		const onPopoverTrigger = this.props.onPopoverTrigger ? this.props.onPopoverTrigger(marker) : "Popver";
		return (
			<InfoWindow
				zIndex={500}
				key={`${ref}_info_window`}
				onCloseclick={() => this.handleMarkerClose(marker)}
			>
				<div>
					{onPopoverTrigger}
				</div>
			</InfoWindow>
		);
	}

	// Handle function which is fired when map is moved and reaches to idle position
	handleOnIdle() {
		const mapBounds = this.mapRef ? this.mapRef.getBounds() : null;
		if (mapBounds) {
			const north = mapBounds.getNorthEast().lat();
			const south = mapBounds.getSouthWest().lat();
			const east = mapBounds.getNorthEast().lng();
			const west = mapBounds.getSouthWest().lng();
			const boundingBoxCoordinates = {
				top_left: [west, north],
				bottom_right: [east, south]
			};
			const stateObj = {
				mapBounds
			};
			if (this.props.onIdle) {
				const generatedData = this.props.onIdle(this.mapRef, {
					boundingBoxCoordinates,
					mapBounds
				});
				stateObj.externalData = generatedData;
			}
			if (this.applyGeoQuery || (this.geoRelatedEventsChange && this.searchAsMove && !this.searchQueryProgress)) {
				const flag = this.applyGeoQuery ? this.applyGeoQuery : this.searchAsMove;
				this.setValue(boundingBoxCoordinates, flag);
			}
			this.setState(stateObj);
		}
	}

	// Handle function which is fired when map is dragged
	handleOnDrage() {
		this.storeCenter = null;
	}

	// set value
	setValue(value, isExecuteQuery = false) {
		const obj = {
			key: "geoQuery",
			value
		};
		helper.selectedSensor.set(obj, isExecuteQuery);
	}

	// on change of selectiong
	searchAsMoveChange(value) {
		this.searchAsMove = value;
		if (value && this.mapRef) {
			this.handleOnIdle();
		}
	}

	// mapStyle changes
	mapStyleChange(style) {
		this.setState({
			currentMapStyle: style
		});
	}

	// Handler function for bounds changed which udpates the map center
	handleBoundsChanged() {
		if (!this.searchQueryProgress) {
			// this.setState({
			//   center: this.mapRef.getCenter()
			// });
		} else {
			setTimeout(() => {
				this.searchQueryProgress = false;
			}, 1000 * 1);
		}
	}

	// Check if stream data exists in markersData
	// and if exists the call streamToNormal.
	streamMarkerInterval() {
		const markersData = this.state.markersData;
		const isStreamData = markersData.filter(hit => hit.stream && hit.streamStart);
		if (isStreamData.length) {
			this.isStreamDataExists = true;
			setTimeout(() => this.streamToNormal(), this.props.streamTTL * 1000);
		} else {
			this.isStreamDataExists = false;
		}
	}

	// Check the difference between current time and attached stream time
	// if difference is equal to streamTTL then delete stream and starStream property of marker
	streamToNormal() {
		let markersData = this.state.markersData;
		const isStreamData = markersData.filter(hit => hit.stream && hit.streamStart);
		if (isStreamData.length) {
			markersData = markersData.map((hit) => {
				if (hit.stream && hit.streamStart) {
					const currentTime = new Date();
					const timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
					if (timeDiff >= this.props.streamTTL) {
						delete hit.stream;
						delete hit.streamStart;
					}
				}
				return hit;
			});
			this.setState({
				markersData
			});
		} else {
			this.isStreamDataExists = false;
		}
	}

	getIcon(hit) {
		return hit.stream ? this.props.streamMarkerImage : this.props.defaultMarkerImage;
	}

	chooseIcon(hit) {
		let icon = hit.external_icon ? hit.external_icon : this.getIcon(hit);
		const isSvg = !!(typeof icon === "object" && ("path" in icon));
		if (isSvg) {
			icon = JSON.parse(JSON.stringify(icon));
			if (this.props.autoMarkerPosition) {
				const deg = hit.angleDeg ? hit.angleDeg : 0;
				icon.rotation = deg;
			}
		}
		return icon;
	}

	// here we accepts marker props which we received from onData and apply those external props in Marker component
	combineProps(hit) {
		let externalProps;
		const markerProp = {};
		if (this.state.externalData && this.state.externalData.markers && this.state.externalData.markers[hit._id]) {
			externalProps = this.state.externalData.markers[hit._id];
			Object.keys(externalProps).forEach((externalP) => {
				hit[`external_${externalP}`] = externalProps[externalP];
				markerProp[externalP] = externalProps[externalP];
			});
		}
		markerProp.icon = this.chooseIcon(hit);
		return markerProp;
	}

	generateMarkers() {
		const self = this;
		let markersData = this.state.markersData;
		const response = {
			markerComponent: [],
			defaultCenter: null,
			convertedGeo: []
		};
		if (markersData && markersData.length) {
			markersData = markersData.filter((hit) => {
				return identifyGeoData(hit._source[self.props.appbaseField]);
			});
			response.markerComponent = markersData.map((hit, index) => {
				const field = identifyGeoData(hit._source[self.props.appbaseField]);
				response.convertedGeo.push(field);
				const position = {
					position: field
				};
				const ref = `marker_ref_${index}`;
				let popoverEvent;
				if (this.props.showPopoverOn) {
					popoverEvent = {};
					let eventName = this.props.showPopoverOn.split("");
					eventName[0] = eventName[0].toUpperCase();
					eventName = eventName.join("");
					popoverEvent[`on${eventName}`] = this.handleMarkerClick.bind(this, hit);
				} else {
					popoverEvent = {};
					popoverEvent.onClick = this.handleMarkerClick.bind(this, hit);
				}
				const defaultFn = function() {};
				const events = {
					onClick: this.props.markerOnClick ? this.props.markerOnClick : defaultFn,
					onDblclick: this.props.markerOnDblclick ? this.props.markerOnDblclick : defaultFn,
					onMouseover: this.props.onMouseover ? this.props.onMouseover : defaultFn,
					onMouseout: this.props.onMouseout ? this.props.onMouseout : defaultFn
				};
				return (
					<Marker
						{...position}
						key={hit._id}
						zIndex={1}
						ref={ref}
						{...self.combineProps(hit)}
						onClick={() => events.onClick(hit._source)}
						onDblclick={() => events.onDblclick(hit._source)}
						onMouseover={() => events.onMouseover(hit._source)}
						onMouseout={() => events.onMouseout(hit._source)}
						{...popoverEvent}
					>
						{hit.showInfo ? self.renderInfoWindow(ref, hit) : null}
					</Marker>
				);
			});
			if (response.convertedGeo[0]) {
				response.defaultCenter = {
					lat: response.convertedGeo[0].lat,
					lng: response.convertedGeo[0].lng
				};
			}
		}
		if (!this.props.showMarkers) {
			response.markerComponent = [];
		}
		return response;
	}

	externalData() {
		let recordList = [];
		if (this.state.externalData) {
			Object.keys(this.state.externalData).forEach((record) => {
				if (record !== "markers") {
					recordList = recordList.concat(this.state.externalData[record]);
				}
			});
		}
		return recordList;
	}

	mapEvents(eventName) {
		if (this.geoRelatedEvents.indexOf(eventName) > -1) {
			this.geoRelatedEventsChange = true;
		}
		if (this.props[eventName]) {
			const externalData = this.props[eventName](this.mapRef);
			if (externalData) {
				this.setState({
					externalData
				});
			}
		}
	}

	getStoreCenter() {
		return this.storeCenter ? this.storeCenter : this.state.center;
	}

	render() {
		let markerComponent,
			showSearchAsMove,
			showMapStyles;
		let title = null,
			center = null;
		const centerComponent = {};
		const generatedMarkers = this.generateMarkers();
		if (this.props.setMarkerCluster) {
			markerComponent = (<MarkerClusterer averageCenter enableRetinaIcons gridSize={60} >
				{generatedMarkers.markerComponent}
			</MarkerClusterer>);
		} else {
			markerComponent = generatedMarkers.markerComponent;
		}
		// Auto center using markers data
		let streamCenterFlag = true;
		if (this.channelMethod === "streaming" && !this.props.streamAutoCenter) {
			streamCenterFlag = false;
		}
		if (this.props.autoCenter && this.reposition && streamCenterFlag) {
			center = generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.getStoreCenter();
			this.storeCenter = center;
			this.reposition = false;
			centerComponent.center = center;
		} else if (this.storeCenter) {
			center = this.storeCenter;
			centerComponent.center = center;
		} else {
			center = null;
		}
		// include searchasMove component
		if (this.props.showSearchAsMove) {
			showSearchAsMove = <SearchAsMove searchAsMoveDefault={this.props.setSearchAsMove} searchAsMoveChange={this.searchAsMoveChange} />;
		}
		// include mapStyle choose component
		if (this.props.showMapStyles) {
			showMapStyles = <MapStyles defaultSelected={this.props.defaultMapStyle} mapStyleChange={this.mapStyleChange} />;
		}
		// include title if exists
		if (this.props.title) {
			title = (<h4 className="rbc-title col s12 m8 col-xs-12 col-sm-8">{this.props.title}</h4>);
		}

		const cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title
		});

		return (
			<div className={`rbc rbc-reactivemap col s12 col-xs-12 card thumbnail ${cx}`} style={this.props.componentStyle}>
				{title}
				{showMapStyles}
				<GoogleMapLoader
					containerElement={
						<div className="rbc-container col s12 col-xs-12" style={this.props.containerStyle} />
					}
					googleMapElement={
						<GoogleMap
							ref={
								(map) => {
									this.mapRef = map;
								}
							}
							options={{
								styles: this.state.currentMapStyle
							}}
							{...centerComponent}
							{...this.props}
							onDragstart={() => {
								this.handleOnDrage();
								this.mapEvents("onDragstart");
							}
							}
							onIdle={() => this.handleOnIdle()}
							onClick={() => this.mapEvents("onClick")}
							onDblclick={() => this.mapEvents("onDblclick")}
							onDrag={() => this.mapEvents("onDrag")}
							onDragend={() => this.mapEvents("onDragend")}
							onMousemove={() => this.mapEvents("onMousemove")}
							onMouseout={() => this.mapEvents("onMouseout")}
							onMouseover={() => this.mapEvents("onMouseover")}
							onResize={() => this.mapEvents("onResize")}
							onRightclick={() => this.mapEvents("onRightclick")}
							onTilesloaded={() => this.mapEvents("onTilesloaded")}
							onBoundsChanged={() => this.mapEvents("onBoundsChanged")}
							onCenterChanged={() => this.mapEvents("onCenterChanged")}
							onProjectionChanged={() => this.mapEvents("onProjectionChanged")}
							onTiltChanged={() => this.mapEvents("onTiltChanged")}
							onZoomChanged={() => this.mapEvents("onZoomChanged")}
						>
							{markerComponent}
							{this.externalData()}
						</GoogleMap>
					}
				/>
				{showSearchAsMove}
				<PoweredBy />
			</div >
		);
	}
}

ReactiveMap.propTypes = {
	appbaseField: React.PropTypes.string.isRequired,
	onIdle: React.PropTypes.func,
	onData: React.PropTypes.func,
	onPopoverTrigger: React.PropTypes.func,
	setMarkerCluster: React.PropTypes.bool,
	autoMarkerPosition: React.PropTypes.bool,
	showMarkers: React.PropTypes.bool,
	streamTTL: validation.streamTTL,
	size: helper.sizeValidation,
	from: validation.fromValidation,
	autoMapRender: React.PropTypes.bool, // usecase?
	componentStyle: React.PropTypes.object,
	containerStyle: React.PropTypes.object,
	autoCenter: React.PropTypes.bool,
	showSearchAsMove: React.PropTypes.bool,
	setSearchAsMove: React.PropTypes.bool,
	defaultMapStyle: React.PropTypes.oneOf(["Standard", "Blue Essence", "Blue Water", "Flat Map", "Light Monochrome", "Midnight Commander", "Unsaturated Browns"]),
	title: React.PropTypes.string,
	streamAutoCenter: React.PropTypes.bool,
	defaultMarkerImage: React.PropTypes.string,
	streamMarkerImage: React.PropTypes.string,
	stream: React.PropTypes.bool,
	defaultZoom: validation.defaultZoom,
	applyGeoQuery: React.PropTypes.bool,
	showPopoverOn: React.PropTypes.oneOf(["click", "mouseover"]),
	defaultCenter: React.PropTypes.shape({
		lat: validation.validCenter,
		lng: validation.validCenter
	}),
	react: React.PropTypes.object,
	markerOnClick: React.PropTypes.func,
	markerOnDblclick: React.PropTypes.func,
	onMouseover: React.PropTypes.func,
	onMouseout: React.PropTypes.func,
	showMapStyles: React.PropTypes.bool
};

ReactiveMap.defaultProps = {
	setMarkerCluster: true,
	autoCenter: true,
	showSearchAsMove: true,
	setSearchAsMove: false,
	showMapStyles: true,
	defaultMapStyle: "Standard",
	from: 0,
	size: 100,
	streamTTL: 5,
	streamAutoCenter: false,
	autoMarkerPosition: false,
	showMarkers: true,
	autoMapRender: true,
	defaultMarkerImage: "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png",
	streamMarkerImage: "https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png",
	componentStyle: {},
	containerStyle: {
		height: "700px"
	},
	stream: false,
	applyGeoQuery: false,
	defaultZoom: 13,
	defaultCenter: {
		lat: 37.74,
		lng: -122.45
	}
};

ReactiveMap.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
