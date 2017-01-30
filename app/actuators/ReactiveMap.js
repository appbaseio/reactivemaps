import { default as React, Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, InfoWindow } from "react-google-maps";
import InfoBox from 'react-google-maps/lib/addons/InfoBox';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { SearchAsMove } from '../addons/SearchAsMove';
import { MapStyles, mapStylesCollection } from '../addons/MapStyles';
import classNames from 'classnames';
import {
	DataSearch,
	AppbaseChannelManager as manager,
	AppbaseSensorHelper as helper
} from '@appbaseio/reactivebase';

export class ReactiveMap extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			markers: [],
			selectedMarker: null,
			streamingStatus: 'Intializing..',
			center: this.props.defaultCenter,
			query: {},
			rawData: {
				hits: {
					hits: []
				}
			},
			externalData: {}
		};
		this.previousSelectedSensor = {};
		this.handleSearch = this.handleSearch.bind(this);
		this.searchAsMoveChange = this.searchAsMoveChange.bind(this);
		this.mapStyleChange = this.mapStyleChange.bind(this);
		this.queryStartTime = 0;
		this.reposition = false;
	}

	getMapStyle(styleName) {
		let selectedStyle = mapStylesCollection.filter(function(style) {
			return style.key === styleName;
		});

		if (selectedStyle.length) {
			return selectedStyle[0].value;
		} else {
			return null;
		}
	}

	componentDidMount() {
		this.createChannel();
		this.setGeoQueryInfo();
		let currentMapStyle = this.getMapStyle(this.props.mapStyle);
		this.setState({
			currentMapStyle: currentMapStyle
		});
	}

	// stop streaming request and remove listener when component will unmount
	componentWillUnmount() {
		if(this.channelId) {
			manager.stopStream(this.channelId);
		}
		if(this.channelListener) {
			this.channelListener.remove();
		}
	}

	// Create a channel which passes the depends and receive results whenever depends changes
	createChannel() {
		// Set the depends - add self aggs query as well with depends
		let depends = this.props.depends ? this.props.depends : {};
		depends['geoQuery'] = { operation: "must" };
		// create a channel and listen the changes
		var channelObj = manager.create(this.context.appbaseRef, this.context.type, depends, this.props.requestSize);
		this.channelId = channelObj.channelId;
		this.channelListener = channelObj.emitter.addListener(channelObj.channelId, function(res) {
			let data = res.data;
			// implementation to prevent initialize query issue if old query response is late then the newer query
			// then we will consider the response of new query and prevent to apply changes for old query response.
			// if queryStartTime of channel response is greater than the previous one only then apply changes
			if(this.props.clearOnEmpty) {
				checkAndGo.call(this);
			} else {
				if(data.hits.hits.length) {
					checkAndGo.call(this);
				}
			}
			function checkAndGo() {
				if(res.mode === 'historic' && res.startTime > this.queryStartTime) {
					this.afterChannelResponse(res);
				} else if(res.mode === 'streaming') {
					this.afterChannelResponse(res);
				}
			}
		}.bind(this));
	}

	afterChannelResponse(res) {
		let data = res.data;
		let rawData, markersData;
		this.streamFlag = false;
		if(res.mode === 'streaming') {
			this.channelMethod = 'streaming';
			let modData = this.streamDataModify(this.state.rawData, res);
			rawData = modData.rawData;
			res = modData.res;
			this.streamFlag = true;
			markersData = this.setMarkersData(rawData);
		} else if(res.mode === 'historic') {
			this.channelMethod = 'historic';
			this.queryStartTime = res.startTime;
			rawData = data;
			markersData = this.setMarkersData(data);
		}
		this.reposition = true;
		this.setState({
			rawData: rawData,
			markersData: markersData
		}, function() {
			// Pass the historic or streaming data in index method
			res.allMarkers = rawData;
			res.mapRef = this.refs.map;
			let generatedData = this.props.onData(res);
			this.setState({
				externalData: generatedData
			});
			if(this.streamFlag) {
				this.streamMarkerInterval();
			}
		}.bind(this));
	}

	// append stream boolean flag and also start time of stream
	streamDataModify(rawData, res) {
		if(res.data) {
			res.data.stream = true;
			res.data.streamStart = new Date();
			if(res.data._deleted) {
				let hits = rawData.hits.hits.filter((hit) => {
					return hit._id !== res.data._id;
				});
				rawData.hits.hits = hits;
			} else {
				let prevData = rawData.hits.hits.filter((hit) => {
					return hit._id === res.data._id;
				});
				if(prevData && prevData.length) {
					let preCord = prevData[0]._source[this.props.appbaseField];
					let newCord = res.data._source[this.props.appbaseField];
					res.data.angleDeg = this.bearing(preCord.lat, preCord.lon, newCord.lat, newCord.lon);
				}
				let hits = rawData.hits.hits.filter((hit) => {
					return hit._id !== res.data._id;
				});
				rawData.hits.hits = hits;
				rawData.hits.hits.push(res.data);
			}
		}
		return {
			rawData: rawData,
			res: res,
			streamFlag: true
		};
	}

	bearing (lat1,lng1,lat2,lng2) {
		var dLon = this._toRad(lng2-lng1);
		var y = Math.sin(dLon) * Math.cos(this._toRad(lat2));
		var x = Math.cos(this._toRad(lat1))*Math.sin(this._toRad(lat2)) - Math.sin(this._toRad(lat1))*Math.cos(this._toRad(lat2))*Math.cos(dLon);
		var brng = this._toDeg(Math.atan2(y, x));
		return ((brng + 360) % 360);
	}

	_toRad(deg) {
		 return deg * Math.PI / 180;
	}

	_toDeg(rad) {
		return rad * 180 / Math.PI;
	}

	// tranform the raw data to marker data
	setMarkersData(data) {
		var self = this;
		if(data && data.hits && data.hits.hits) {
			let markersData = data.hits.hits.map((hit, index) => {
				hit._source.mapPoint = self.identifyGeoData(hit._source[self.props.appbaseField]);
				return hit;
			});
			markersData = markersData.filter((hit, index) => {
				return hit._source.mapPoint && !(hit._source.mapPoint.lat === 0 && hit._source.mapPoint.lng === 0);
			});
			markersData = this.sortByDistance(markersData);
			markersData = markersData.map((marker) => {
				marker.showInfo = false;
				return marker;
			});
			return markersData;
		} else {
			return [];
		}
	}

	// centrialize the map
	// calculate the distance from each marker to other marker,
	// summation of all the distance and sort by distance in ascending order
	sortByDistance(data) {
		let modifiedData = data.map((record) => {
			record.distance = this.findDistance(data, record);
			return record;
		});
		modifiedData = _.orderBy(modifiedData, 'distance');
		return modifiedData;
	}

	findDistance(data, record) {
		record.distance = 0;
		let modifiednData = data.map((to) => {
			record.distance += getDistance(record._source.mapPoint.lat, record._source.mapPoint.lng, to._source.mapPoint.lat, to._source.mapPoint.lng);
		});
		function getDistance(lat1,lon1,lat2,lon2) {
			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2-lat1);  // deg2rad below
			var dLon = deg2rad(lon2-lon1);
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
					Math.sin(dLon/2) * Math.sin(dLon/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c; // Distance in km
			return d;
		}
		function deg2rad(deg) {
			return deg * (Math.PI/180)
		}
		return record.distance;
	}

	// set the query type and input data
	setGeoQueryInfo() {
		var obj = {
				key: 'geoQuery',
				value: {
					queryType: 'geo_bounding_box',
					inputData: this.props.appbaseField
				}
		};

		helper.selectedSensor.setSensorInfo(obj);
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
		var popoverContent = this.props.popoverContent ? this.props.popoverContent(marker) : 'Popver';
		return (
			<InfoWindow
				zIndex = {500}
				key={`${ref}_info_window`}
				onCloseclick={this.handleMarkerClose.bind(this, marker)} >
				<div>
					{popoverContent}
				</div>
			</InfoWindow>
		);
	}

	// Handle function which is fired when map is moved and reaches to idle position
	handleOnIdle() {
		var mapBounds = this.refs.map.getBounds();
		var north = mapBounds.getNorthEast().lat();
		var south = mapBounds.getSouthWest().lat();
		var east = mapBounds.getNorthEast().lng();
		var west = mapBounds.getSouthWest().lng();
		var boundingBoxCoordinates = {
			"top_left": [west, north],
			"bottom_right": [east, south]
		};
		let generatedData = this.props.onIdle(this.refs.map, {
			boundingBoxCoordinates: boundingBoxCoordinates,
			mapBounds: mapBounds
		});
		this.setState({
			externalData: generatedData
		});
		if(this.searchAsMove && !this.searchQueryProgress) {
			this.setValue(boundingBoxCoordinates, this.searchAsMove);
		}
	}

	// Handle function which is fired when map is dragged
	handleOnDrage() {
		this.storeCenter = null;
	}

	// set value
	setValue(value, isExecuteQuery=false) {
		var obj = {
			key: 'geoQuery',
			value: value
		};
		helper.selectedSensor.set(obj, isExecuteQuery);
	}

	// on change of selectiong
	searchAsMoveChange(value) {
		this.searchAsMove = value;
		if(value && this.refs.map) {
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
		if(!this.searchQueryProgress) {
			// this.setState({
			//   center: this.refs.map.getCenter()
			// });
		} else {
			setTimeout(()=> {
				this.searchQueryProgress = false;
			}, 1000*1);
		}
	}

	// Handler function which is fired when an input is selected from autocomplete google places
	handlePlacesChanged() {
		const places = this.refs.searchBox.getPlaces();
		// this.setState({
		//   center: places[0].geometry.location
		// });
	}

	// Handler function which is fired when an input is selected from Appbase geo search field
	handleSearch(location) {
		// this.setState({
		//   center: new google.maps.LatLng(location.value.lat, location.value.lon)
		// });
	}

	identifyGeoData(input) {
		let type = Object.prototype.toString.call(input);
		let convertedGeo = null;
		if(type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
			convertedGeo = {
				lat: Number(input.lat),
				lng: Number(input.lon)
			};
		}
		else if(type === '[object Array]' && input.length === 2) {
			convertedGeo = {
				lat: Number(input[0]),
				lng: Number(input[1])
			};
		}
		return convertedGeo;
	}

	// Check if stream data exists in markersData
	// and if exists the call streamToNormal.
	streamMarkerInterval() {
		let markersData = this.state.markersData;
		let isStreamData = markersData.filter((hit) => hit.stream && hit.streamStart);
		if(isStreamData.length) {
			this.isStreamDataExists = true;
			setTimeout(() => this.streamToNormal(), this.props.streamActiveTime*1000);
		} else {
			this.isStreamDataExists = false;
		}
	}

	// Check the difference between current time and attached stream time
	// if difference is equal to streamActiveTime then delete stream and starStream property of marker
	streamToNormal() {
		let markersData = this.state.markersData;
		let isStreamData = markersData.filter((hit) => hit.stream && hit.streamStart);
		if(isStreamData.length) {
			markersData = markersData.map((hit, index) => {
				if(hit.stream && hit.streamStart) {
					let currentTime = new Date();
					let timeDiff = (currentTime.getTime() - hit.streamStart.getTime())/1000;
					if(timeDiff >= this.props.streamActiveTime) {
						delete hit.stream;
						delete hit.streamStart;
					}
				}
				return hit;
			});
			this.setState({
				markersData: markersData
			});
		} else {
			this.isStreamDataExists = false;
		}
	}

	chooseIcon(hit) {
		let icon = hit.external_icon ? hit.external_icon : (hit.stream ? this.props.streamPin : this.props.historicPin);
		let isSvg = typeof icon === 'object' && icon.hasOwnProperty('path') ? true : false;
		if(isSvg) {
			icon = JSON.parse(JSON.stringify(icon));
			if(this.props.rotateOnUpdate) {
				let deg = hit.angleDeg ? hit.angleDeg : 0;
				icon.rotation = deg;
			}
		}
		return icon;
	}

	// here we accepts marker props which we received from onData and apply those external props in Marker component
	combineProps(hit) {
		let externalProps, markerProp = {};
		if(this.state.externalData && this.state.externalData.markers && this.state.externalData.markers[hit._id]) {
			externalProps = this.state.externalData.markers[hit._id]
			for(let external_p in externalProps) {
				hit["external_"+external_p] = externalProps[external_p];
				markerProp[external_p] = externalProps[external_p];
			}
		}
		markerProp.icon = this.chooseIcon(hit);
		return markerProp;
	}

	generateMarkers() {
		var self = this;
		let markersData = this.state.markersData;
		let response = {
			markerComponent: [],
			defaultCenter: null,
			convertedGeo: []
		};
		if(markersData && markersData.length) {
			response.markerComponent = markersData.map((hit, index) => {
				let field = self.identifyGeoData(hit._source[self.props.appbaseField]);
				// let icon = !this.props.rotateOnUpdate ? iconPath : RotateIcon.makeIcon(iconPath).setRotation({deg: deg}).getUrl();
				// let icon = self.chooseIcon(hit);
				if(field) {
					response.convertedGeo.push(field);
					let position = {
						position: field
					};
					let ref = `marker_ref_${index}`;
					let popoverEvent;
					if(this.props.showPopoverOn) {
						popoverEvent = {};
						popoverEvent[this.props.showPopoverOn] = this.handleMarkerClick.bind(this, hit);
					} else {
						popoverEvent = {};
						popoverEvent['onClick'] = this.handleMarkerClick.bind(this, hit);
					}
					let timenow = new Date();
					return (
						<Marker {...position}
							key={hit._id}
							zIndex={1}
							ref={ref}
							{...self.combineProps(hit)}
							onClick={() => self.props.markerOnClick(hit._source)}
							onDblclick={() => self.props.markerOnDblclick(hit._source)}
							onMouseover={() => self.props.markerOnMouseover(hit._source)}
							onMouseout={() => self.props.markerOnMouseout(hit._source)}
							{...popoverEvent}>
							{hit.showInfo ? self.renderInfoWindow(ref, hit) : null}
						</Marker>
					)
				}
			});
			if(response.convertedGeo[0]) {
				response.defaultCenter = {
					lat: response.convertedGeo[0].lat,
					lng: response.convertedGeo[0].lng
				};
			}
		}
		if(!this.props.allowMarkers) {
			response.markerComponent = [];
		}
		return response;
	}

	externalData() {
		let recordList = [];
		if(this.state.externalData) {
			for(let record in this.state.externalData) {
				if(record !== 'markers') {
					recordList = recordList.concat(this.state.externalData[record]);
				}
			}
		}
		return recordList;
	}

	mapEvents(eventName) {
		if(this.props[eventName]) {
			let externalData = this.props[eventName](this.refs.map);
			if(externalData) {
				this.setState({
					externalData: externalData
				});
			}
		}
	}

	render() {
		var self = this;
		var markerComponent, searchComponent, searchAsMoveComponent, MapStylesComponent;
		let appbaseSearch, title = null;
		var searchComponentProps = {};
		var otherOptions;
		var generatedMarkers = this.generateMarkers();
		if (this.props.markerCluster) {
			markerComponent = <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
				{generatedMarkers.markerComponent}
			</MarkerClusterer>;
		}
		else {
			markerComponent = generatedMarkers.markerComponent;
		}
		// Auto center using markers data
		var streamCenterFlag = true;
		if(this.channelMethod === 'streaming' && !this.props.streamAutoCenter) {
			streamCenterFlag = false;
		}
		if(!this.searchAsMove && this.props.autoCenter && this.reposition && streamCenterFlag) {
			searchComponentProps.center =  generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : (this.storeCenter ? this.storeCenter : this.state.center);
			this.storeCenter = searchComponentProps.center;
			this.reposition = false;
		} else {
			if(this.storeCenter) {
				searchComponentProps.center = this.storeCenter;
			} else {
				delete searchComponentProps.center;
			}
		}
		// include searchasMove component
		if(this.props.searchAsMoveComponent) {
			searchAsMoveComponent = <SearchAsMove searchAsMoveDefault={this.props.searchAsMoveDefault} searchAsMoveChange={this.searchAsMoveChange} />;
		}
		// include mapStyle choose component
		if(this.props.MapStylesComponent) {
			MapStylesComponent = <MapStyles defaultSelected={this.props.mapStyle} mapStyleChange={this.mapStyleChange} />;
		}
		// include title if exists
		if(this.props.title) {
			title = (<h4 className="rmc-title col s12 m8 col-xs-12 col-sm-8">{this.props.title}</h4>);
		}

		let cx = classNames({
			'rmc-title-active': this.props.title,
			'rmc-title-inactive': !this.props.title
		});

		return(
			<div className={`rmc rmc-reactivemap col s12 col-xs-12 card thumbnail ${cx}`}>
				{title}
				<span className="col s12 m4 col-xs-12 col-sm-4">
					{MapStylesComponent}
				</span>
				<GoogleMapLoader
					containerElement={
						<div className="rmc-container col s12 col-xs-12"  style={this.props.containerStyle} />
					}
					googleMapElement={
						<GoogleMap ref = "map"
							options = {{
								styles: this.state.currentMapStyle
							}}
							{...searchComponentProps}
							{...this.props}
								onDragstart = {() => {
									this.handleOnDrage()
									this.mapEvents('onDragstart');
								}
							}
							onIdle = {() => this.handleOnIdle()}
							onClick = {() => this.mapEvents('onClick')}
							onDblclick = {() => this.mapEvents('onDblclick')}
							onDrag = {() => this.mapEvents('onDrag')}
							onDragend = {() => this.mapEvents('onDragend')}
							onMousemove = {() => this.mapEvents('onMousemove')}
							onMouseout = {() => this.mapEvents('onMouseout')}
							onMouseover = {() => this.mapEvents('onMouseover')}
							onResize = {() => this.mapEvents('onResize')}
							onRightclick = {() => this.mapEvents('onRightclick')}
							onTilesloaded = {() => this.mapEvents('onTilesloaded')}
							onBoundsChanged = {() => this.mapEvents('onBoundsChanged')}
							onCenterChanged = {() => this.mapEvents('onCenterChanged')}
							onProjectionChanged = {() => this.mapEvents('onProjectionChanged')}
							onTiltChanged = {() => this.mapEvents('onTiltChanged')}
							onZoomChanged = {() => this.mapEvents('onZoomChanged')}
						>
							{searchComponent}
							{markerComponent}
							{this.externalData()}
						</GoogleMap>
					}
				/>
				{searchAsMoveComponent}
				<div className="col s12 text-center center-align">
					<img width='200px' height='auto' src="dist/images/logo.png" />
				</div>
			</div >
		);
	}
}

ReactiveMap.propTypes = {
	appbaseField: React.PropTypes.string.isRequired,
	searchField: React.PropTypes.string,
	searchComponent: React.PropTypes.string,
	onIdle: React.PropTypes.func,
	markerOnDelete: React.PropTypes.func,
	onData: React.PropTypes.func,
	markerCluster: React.PropTypes.bool,
	historicalData: React.PropTypes.bool,
	rotateOnUpdate: React.PropTypes.bool,
	allowMarkers: React.PropTypes.bool,
	streamActiveTime: React.PropTypes.number,
	requestSize: React.PropTypes.number,
	clearOnEmpty: React.PropTypes.bool
};

ReactiveMap.defaultProps = {
	historicalData: true,
	markerCluster: true,
	searchComponent: "google",
	autoCenter: false,
	searchAsMoveComponent: false,
	searchAsMoveDefault: false,
	MapStylesComponent: false,
	mapStyle: 'Standard',
	title: null,
	requestSize: 100,
	streamActiveTime: 5,
	streamAutoCenter: true,
	rotateOnUpdate: false,
	allowMarkers: true,
	clearOnEmpty: true,
	historicPin: 'dist/images/historic-pin.png',
	streamPin: 'dist/images/stream-pin.png',
	markerOnClick: function() {},
	markerOnDblclick: function() {},
	markerOnMouseover: function() {},
	markerOnMouseout: function() {},
	onData: function() {},
	onIdle: function() {},
	containerStyle: {
		height: '700px'
	}
};

ReactiveMap.contextTypes = {
	appbaseRef: React.PropTypes.any.isRequired,
	type: React.PropTypes.any.isRequired
};
