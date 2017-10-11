import _isEqual from "lodash/isEqual";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint max-lines: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import classNames from "classnames";
import { AppbaseChannelManager as manager, AppbaseSensorHelper as helper, PoweredBy } from "@appbaseio/reactivebase";

import SearchAsMove from "../addons/SearchAsMove";
import { MapStyles, mapStylesCollection } from "../addons/MapStyles";
import * as ReactiveMapHelper from "../helper/ReactiveMapHelper";

var MapComponent = withGoogleMap(function (props) {
	var children = props.children,
	    onMapMounted = props.onMapMounted,
	    allProps = _objectWithoutProperties(props, ["children", "onMapMounted"]);

	return React.createElement(
		GoogleMap,
		_extends({ ref: onMapMounted }, allProps),
		children
	);
});

var ReactiveMap = function (_Component) {
	_inherits(ReactiveMap, _Component);

	function ReactiveMap(props) {
		_classCallCheck(this, ReactiveMap);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			markers: [],
			selectedMarker: null,
			streamingStatus: "Initializing..",
			defaultCenter: _this.props.defaultCenter ? _this.props.defaultCenter : { lat: 37.74, lon: -122.45 },
			center: _this.props.defaultCenter,
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
		_this.geoRelatedEvents = ["onDragend", "onZoomChanged"];
		_this.previousSelectedSensor = {};
		_this.searchAsMoveChange = _this.searchAsMoveChange.bind(_this);
		_this.mapStyleChange = _this.mapStyleChange.bind(_this);
		_this.geoCustomQuery = _this.geoCustomQuery.bind(_this);
		_this.handleMarkerClose = _this.handleMarkerClose.bind(_this);
		_this.queryStartTime = 0;
		_this.reposition = false;
		_this.mapDefaultHeight = "700px";
		return _this;
	}

	ReactiveMap.prototype.componentDidMount = function componentDidMount() {
		this.streamProp = this.props.stream;
		this.sizeProp = this.props.size;
		this.initialize();
	};

	ReactiveMap.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (!_isEqual(this.props.react, nextProps.react)) {
			this.setReact(nextProps);
			manager.update(this.channelId, this.react, nextProps.size, nextProps.from, nextProps.stream);
		}

		if (nextProps.defaultMapStyle !== this.props.defaultMapStyle) {
			this.mapStyleChange(this.getMapStyle(nextProps.defaultMapStyle));
		}
	};

	// stop streaming request and remove listener when component will unmount


	ReactiveMap.prototype.componentWillUnmount = function componentWillUnmount() {
		this.removeChannel();
	};

	ReactiveMap.prototype.removeChannel = function removeChannel() {
		if (this.channelId) {
			manager.stopStream(this.channelId);
			this.channelId = null;
		}
		if (this.channelListener) {
			this.channelListener.remove();
		}
	};

	ReactiveMap.prototype.initialize = function initialize() {
		var updateExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		this.setGeoQueryInfo();
		this.setReact(this.props);
		this.createChannel(updateExecute);
		var currentMapStyle = this.getMapStyle(this.props.defaultMapStyle);
		this.initialMapBoundQuery = !!this.props.defaultCenter;
		this.applyGeoQuery = this.props.applyGeoQuery ? this.props.applyGeoQuery : this.props.setSearchAsMove;
		this.setState({
			currentMapStyle: currentMapStyle
		});
	};

	ReactiveMap.prototype.getMapStyle = function getMapStyle(styleName) {
		var selectedStyle = mapStylesCollection.filter(function (style) {
			return style.key === styleName;
		});

		if (selectedStyle.length) {
			return selectedStyle[0].value;
		}
		return null;
	};

	ReactiveMap.prototype.setReact = function setReact(props) {
		// Set the actuate - add self aggregation query as well with actuate
		var react = Object.assign({}, props.react);
		var reactOr = ["geoQuery"];
		var reactAnd = ["streamChanges"];
		this.react = helper.setupReact(react, reactAnd);
		this.react = ReactiveMapHelper.setupOrReact(this.react, reactOr);
	};

	// Create a channel which passes the actuate and receive results whenever actuate changes


	ReactiveMap.prototype.createChannel = function createChannel() {
		var _this2 = this;

		// create a channel and listen the changes
		var channelObj = manager.create(this.context.appbaseRef, this.context.type, this.react, this.props.size, this.props.from, this.props.stream);
		this.channelId = channelObj.channelId;
		this.channelListener = channelObj.emitter.addListener(channelObj.channelId, function (res) {
			var data = res.data;
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
					if (this.props.onAllData) {
						var modifiedData = helper.prepareResultData(res);
						this.props.onAllData(modifiedData.res, modifiedData.err);
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

			initialize.call(_this2);
		});
		var obj = {
			key: "streamChanges",
			value: ""
		};
		helper.selectedSensor.set(obj, true);
	};

	ReactiveMap.prototype.afterChannelResponse = function afterChannelResponse(res) {
		var _this3 = this;

		var getResult = ReactiveMapHelper.afterChannelResponse(res, this.state.rawData, this.props.dataField, this.state.markersData);
		this.reposition = true;
		this.streamFlag = getResult.streamFlag;
		this.queryStartTime = getResult.queryStartTime ? getResult.queryStartTime : 0;
		this.setState({
			rawData: getResult.rawData,
			markersData: getResult.markersData
		}, function () {
			if (_this3.props.onAllData) {
				// Pass the historic or streaming data in index method
				res.allMarkers = getResult.rawData;
				var modifiedData = JSON.parse(JSON.stringify(res));
				modifiedData.newData = getResult.newData;
				modifiedData.currentData = getResult.currentData;
				delete modifiedData.data;
				modifiedData = helper.prepareResultData(modifiedData, res.data);
				if (_this3.props.onAllData) {
					if (modifiedData.res) {
						modifiedData.res.mapRef = _this3.mapRef;
					}
					var generatedData = _this3.props.onAllData(modifiedData.res, modifiedData.err);
					_this3.setState({
						externalData: generatedData
					});
				}
			}
			if (_this3.streamFlag) {
				_this3.streamMarkerInterval();
			}
		});
	};

	// set the query type and input data


	ReactiveMap.prototype.setGeoQueryInfo = function setGeoQueryInfo() {
		var obj = {
			key: "geoQuery",
			value: {
				queryType: "geo_bounding_box",
				inputData: this.props.dataField,
				customQuery: this.geoCustomQuery
			}
		};
		var obj1 = {
			key: "updateExecute",
			value: {
				queryType: "random",
				inputData: this.props.dataField
			}
		};

		helper.selectedSensor.setSensorInfo(obj);
		helper.selectedSensor.setSensorInfo(obj1);
	};

	ReactiveMap.prototype.geoCustomQuery = function geoCustomQuery(value) {
		var query = null;
		if (value && (this.initialMapBoundQuery || this.searchAsMove)) {
			var _geo_bounding_box;

			query = {
				geo_bounding_box: (_geo_bounding_box = {}, _geo_bounding_box[this.props.dataField] = value, _geo_bounding_box)
			};
			if (this.geoRelatedEventsChange) {
				this.geoRelatedEventsChange = false;
			} else if (this.applyGeoQuery) {
				this.applyGeoQuery = false;
			}
			this.initialMapBoundQuery = false;
		}
		return query;
	};

	ReactiveMap.prototype.updateExecute = function updateExecute() {
		setTimeout(function () {
			var obj = {
				key: "updateExecute",
				value: Math.random()
			};
			helper.selectedSensor.set(obj, true);
		}, 1000);
	};

	// Show InfoWindow and re-renders component


	ReactiveMap.prototype.handleMarkerClick = function handleMarkerClick(marker) {
		var _this4 = this;

		marker.showInfo = true;
		this.reposition = false;
		this.setState({
			rerender: true
		}, function () {
			if (_this4.props.popoverTTL) {
				_this4.watchPopoverTTL(marker);
			}
		});
	};

	// Close info window


	ReactiveMap.prototype.handleMarkerClose = function handleMarkerClose(marker) {
		marker.showInfo = false;
		this.reposition = false;
		this.setState(this.state);
	};

	// watch and close popover on timeout


	ReactiveMap.prototype.watchPopoverTTL = function watchPopoverTTL(marker) {
		var _this5 = this;

		this.popoverTTLStore = this.popoverTTLStore ? this.popoverTTLStore : {};
		if (this.popoverTTLStore[marker._type + marker._id]) {
			this.clearTTL(marker._type + marker._id);
		} else {
			this.popoverTTLStore[marker._type + marker._id] = setTimeout(function () {
				_this5.handleMarkerClose(marker);
				_this5.clearTTL(marker._type + marker._id);
			}, this.props.popoverTTL * 1000);
		}
	};

	ReactiveMap.prototype.clearTTL = function clearTTL(id) {
		clearTimeout(this.popoverTTLStore[id]);
		delete this.popoverTTLStore[id];
	};

	// render info window


	ReactiveMap.prototype.renderInfoWindow = function renderInfoWindow(ref, marker) {
		var _this6 = this;

		var onPopoverTrigger = this.props.onPopoverTrigger ? this.props.onPopoverTrigger(marker) : "Popver";
		return React.createElement(
			InfoWindow,
			{
				zIndex: 500,
				key: ref + "_info_window",
				onCloseClick: function onCloseClick() {
					return _this6.handleMarkerClose(marker);
				}
			},
			React.createElement(
				"div",
				null,
				onPopoverTrigger
			)
		);
	};

	// Handle function which is fired when map is moved and reaches to idle position


	ReactiveMap.prototype.handleOnIdle = function handleOnIdle() {
		var mapBounds = this.mapRef ? this.mapRef.getBounds() : null;
		if (mapBounds) {
			var north = mapBounds.getNorthEast().lat();
			var south = mapBounds.getSouthWest().lat();
			var east = mapBounds.getNorthEast().lng();
			var west = mapBounds.getSouthWest().lng();
			var boundingBoxCoordinates = {
				top_left: [west, north],
				bottom_right: [east, south]
			};
			var stateObj = {
				mapBounds: mapBounds
			};
			if (this.props.onIdle) {
				var generatedData = this.props.onIdle(this.mapRef, {
					boundingBoxCoordinates: boundingBoxCoordinates,
					mapBounds: mapBounds
				});
				stateObj.externalData = generatedData;
			}
			if (this.initialMapBoundQuery || this.applyGeoQuery || this.geoRelatedEventsChange && this.searchAsMove && !this.searchQueryProgress) {
				var flag = this.initialMapBoundQuery ? true : this.applyGeoQuery ? this.applyGeoQuery : this.searchAsMove;
				this.setValue(boundingBoxCoordinates, flag);
			}
			if (!_isEqual({ mapBounds: this.state.mapBounds }, stateObj)) {
				this.setState(stateObj);
			}
		}
	};

	// Handle function which is fired when map is dragged


	ReactiveMap.prototype.handleOnDrage = function handleOnDrage() {
		this.storeCenter = null;
	};

	// set value


	ReactiveMap.prototype.setValue = function setValue(value) {
		var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var obj = {
			key: "geoQuery",
			value: value
		};
		helper.selectedSensor.set(obj, isExecuteQuery);
	};

	// on change of selecting


	ReactiveMap.prototype.searchAsMoveChange = function searchAsMoveChange(value) {
		this.searchAsMove = value;
		if (value && this.mapRef) {
			this.geoRelatedEventsChange = true;
			this.handleOnIdle();
		}
	};

	// mapStyle changes


	ReactiveMap.prototype.mapStyleChange = function mapStyleChange(style) {
		this.setState({
			currentMapStyle: style
		});
	};

	// Handler function for bounds changed which udpates the map center


	ReactiveMap.prototype.handleBoundsChanged = function handleBoundsChanged() {
		var _this7 = this;

		if (!this.searchQueryProgress) {
			// this.setState({
			//   center: this.mapRef.getCenter()
			// });
		} else {
			setTimeout(function () {
				_this7.searchQueryProgress = false;
			}, 1000 * 1);
		}
	};

	// Check if stream data exists in markersData
	// and if exists the call streamToNormal.


	ReactiveMap.prototype.streamMarkerInterval = function streamMarkerInterval() {
		var _this8 = this;

		var markersData = this.state.markersData;
		var isStreamData = markersData.filter(function (hit) {
			return hit.stream && hit.streamStart;
		});
		if (isStreamData.length) {
			this.isStreamDataExists = true;
			setTimeout(function () {
				return _this8.streamToNormal();
			}, this.props.streamTTL * 1000);
		} else {
			this.isStreamDataExists = false;
		}
	};

	// Check the difference between current time and attached stream time
	// if difference is equal to streamTTL then delete stream and starStream property of marker


	ReactiveMap.prototype.streamToNormal = function streamToNormal() {
		var _this9 = this;

		var markersData = this.state.markersData;
		var isStreamData = markersData.filter(function (hit) {
			return hit.stream && hit.streamStart;
		});
		if (isStreamData.length) {
			markersData = markersData.map(function (hit) {
				if (hit.stream && hit.streamStart) {
					var currentTime = new Date();
					var timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
					if (timeDiff >= _this9.props.streamTTL) {
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
	};

	ReactiveMap.prototype.getIcon = function getIcon(hit) {
		return hit.stream ? this.props.streamMarkerImage : this.props.defaultMarkerImage;
	};

	ReactiveMap.prototype.chooseIcon = function chooseIcon(hit) {
		var icon = hit.external_icon ? hit.external_icon : this.getIcon(hit);
		icon = this.props.onData ? this.props.onData(hit) : icon;
		var isSvg = !!((typeof icon === "undefined" ? "undefined" : _typeof(icon)) === "object" && "path" in icon);
		if (isSvg) {
			icon = JSON.parse(JSON.stringify(icon));
			if (this.props.autoMarkerPosition) {
				var deg = hit.angleDeg ? hit.angleDeg : 0;
				icon.rotation = deg;
			}
		}
		return icon;
	};

	// here we accepts marker props which we received from onAllData and apply those external props in Marker component


	ReactiveMap.prototype.combineProps = function combineProps(hit) {
		var externalProps = void 0;
		var markerProp = {};
		if (this.state.externalData && this.state.externalData.markers && this.state.externalData.markers[hit._id]) {
			externalProps = this.state.externalData.markers[hit._id];
			Object.keys(externalProps).forEach(function (externalP) {
				hit["external_" + externalP] = externalProps[externalP];
				markerProp[externalP] = externalProps[externalP];
			});
		}
		markerProp.icon = this.chooseIcon(hit);
		return markerProp;
	};

	ReactiveMap.prototype.generateMarkers = function generateMarkers() {
		var _this10 = this;

		var self = this;
		var markersData = this.state.markersData;
		var response = {
			markerComponent: [],
			defaultCenter: null,
			convertedGeo: []
		};
		if (markersData && markersData.length) {
			markersData = markersData.filter(function (hit) {
				return ReactiveMapHelper.identifyGeoData(hit._source[self.props.dataField]);
			});
			response.markerComponent = markersData.map(function (hit, index) {
				var field = ReactiveMapHelper.identifyGeoData(hit._source[self.props.dataField]);
				response.convertedGeo.push(field);
				var position = {
					position: field
				};
				var ref = "marker_ref_" + index;
				var popoverEvent = void 0;
				if (_this10.props.showPopoverOn) {
					popoverEvent = {};
					var eventName = _this10.props.showPopoverOn.split("");
					eventName[0] = eventName[0].toUpperCase();
					eventName = eventName.join("");
					popoverEvent["on" + eventName] = _this10.handleMarkerClick.bind(_this10, hit);
				} else {
					popoverEvent = {};
					popoverEvent.onClick = _this10.handleMarkerClick.bind(_this10, hit);
				}
				var defaultFn = function defaultFn() {};
				var events = {
					onClick: _this10.props.markerOnClick ? _this10.props.markerOnClick : defaultFn,
					onDblClick: _this10.props.markerOnDblClick ? _this10.props.markerOnDblClick : defaultFn,
					onMouseOver: _this10.props.onMouseOver ? _this10.props.onMouseOver : defaultFn,
					onMouseOut: _this10.props.onMouseOut ? _this10.props.onMouseOut : defaultFn
				};
				return React.createElement(
					Marker,
					_extends({}, position, {
						key: hit._id,
						zIndex: 1,
						ref: ref
					}, self.combineProps(hit), {
						onClick: function onClick() {
							return events.onClick(hit._source);
						},
						onDblClick: function onDblClick() {
							return events.onDblClick(hit._source);
						},
						onMouseOver: function onMouseOver() {
							return events.onMouseOver(hit._source);
						},
						onMouseOut: function onMouseOut() {
							return events.onMouseOut(hit._source);
						}
					}, popoverEvent),
					hit.showInfo ? self.renderInfoWindow(ref, hit) : null
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
	};

	ReactiveMap.prototype.externalData = function externalData() {
		var _this11 = this;

		var recordList = [];
		if (this.state.externalData) {
			Object.keys(this.state.externalData).forEach(function (record) {
				if (record !== "markers") {
					recordList = recordList.concat(_this11.state.externalData[record]);
				}
			});
		}
		return recordList;
	};

	ReactiveMap.prototype.mapEvents = function mapEvents(eventName) {
		if (this.geoRelatedEvents.indexOf(eventName) > -1) {
			this.geoRelatedEventsChange = true;
		}
		if (this.props[eventName]) {
			var externalData = this.props[eventName](this.mapRef);
			if (externalData) {
				this.setState({
					externalData: externalData
				});
			}
		}
	};

	ReactiveMap.prototype.getStoreCenter = function getStoreCenter() {
		return this.storeCenter ? this.storeCenter : this.state.center;
	};

	ReactiveMap.prototype.render = function render() {
		var _this12 = this;

		var markerComponent = void 0,
		    showSearchAsMove = void 0,
		    showMapStyles = void 0;
		var title = null,
		    center = null;
		var centerComponent = {};
		var generatedMarkers = this.generateMarkers();
		if (this.props.setMarkerCluster) {
			markerComponent = React.createElement(
				MarkerClusterer,
				{ averageCenter: true, enableRetinaIcons: true, gridSize: 60 },
				generatedMarkers.markerComponent
			);
		} else {
			markerComponent = generatedMarkers.markerComponent;
		}
		// Auto center using markers data
		var streamCenterFlag = true;
		if (this.channelMethod === "streaming" && !this.props.streamAutoCenter) {
			streamCenterFlag = false;
		}
		if (this.props.autoCenter && this.reposition && streamCenterFlag) {
			center = generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.getStoreCenter();
			this.storeCenter = center;
			this.reposition = false;
			centerComponent.center = ReactiveMapHelper.normalizeCenter(center);
		} else if (this.storeCenter) {
			center = this.storeCenter;
			centerComponent.center = ReactiveMapHelper.normalizeCenter(center);
		} else {
			center = null;
		}

		// include searchasMove component
		if (this.props.showSearchAsMove) {
			showSearchAsMove = React.createElement(SearchAsMove, { searchAsMoveDefault: this.props.setSearchAsMove, searchAsMoveChange: this.searchAsMoveChange });
		}
		// include mapStyle choose component
		if (this.props.showMapStyles) {
			showMapStyles = React.createElement(MapStyles, { defaultSelected: this.props.defaultMapStyle, mapStyleChange: this.mapStyleChange });
		}
		// include title if exists
		if (this.props.title) {
			title = React.createElement(
				"h4",
				{ className: "rbc-title col s12 m8 col-xs-12 col-sm-8" },
				this.props.title
			);
		}

		var cx = classNames({
			"rbc-title-active": this.props.title,
			"rbc-title-inactive": !this.props.title
		}, this.props.className);

		return React.createElement(
			"div",
			{ className: "rbc rbc-reactivemap col s12 col-xs-12 card thumbnail " + cx, style: ReactiveMapHelper.mapPropsStyles(this.props.style, "component") },
			title,
			showMapStyles,
			React.createElement(
				MapComponent,
				_extends({
					onMapMounted: function onMapMounted(ref) {
						_this12.mapRef = ref;
					},
					containerElement: React.createElement("div", {
						className: "rbc-container",
						style: ReactiveMapHelper.mapPropsStyles(this.props.style, "map", this.mapDefaultHeight)
					}),
					mapElement: React.createElement("div", { style: { height: "100%" } })
				}, centerComponent, ReactiveMapHelper.normalizeProps(this.props), {
					options: {
						styles: this.state.currentMapStyle
					},
					defaultCenter: ReactiveMapHelper.normalizeCenter(this.state.defaultCenter),
					onDragStart: function onDragStart() {
						_this12.handleOnDrage();
						_this12.mapEvents("onDragStart");
					},
					onIdle: function onIdle() {
						return _this12.handleOnIdle();
					},
					onClick: function onClick() {
						return _this12.mapEvents("onClick");
					},
					onDblClick: function onDblClick() {
						return _this12.mapEvents("onDblClick");
					},
					onDrag: function onDrag() {
						return _this12.mapEvents("onDrag");
					},
					onDragEnd: function onDragEnd() {
						return _this12.mapEvents("onDragEnd");
					},
					onMouseMove: function onMouseMove() {
						return _this12.mapEvents("onMouseMove");
					},
					onMouseOut: function onMouseOut() {
						return _this12.mapEvents("onMouseOut");
					},
					onMouseOver: function onMouseOver() {
						return _this12.mapEvents("onMouseOver");
					},
					onResize: function onResize() {
						return _this12.mapEvents("onResize");
					},
					onRightClick: function onRightClick() {
						return _this12.mapEvents("onRightClick");
					},
					onTilesLoaded: function onTilesLoaded() {
						return _this12.mapEvents("onTilesLoaded");
					},
					onBoundsChanged: function onBoundsChanged() {
						return _this12.mapEvents("onBoundsChanged");
					},
					onCenterChanged: function onCenterChanged() {
						return _this12.mapEvents("onCenterChanged");
					},
					onProjectionChanged: function onProjectionChanged() {
						return _this12.mapEvents("onProjectionChanged");
					},
					onTiltChanged: function onTiltChanged() {
						return _this12.mapEvents("onTiltChanged");
					},
					onZoomChanged: function onZoomChanged() {
						return _this12.mapEvents("onZoomChanged");
					}
				}),
				markerComponent,
				this.externalData()
			),
			showSearchAsMove,
			React.createElement(PoweredBy, null)
		);
	};

	return ReactiveMap;
}(Component);

export default ReactiveMap;


ReactiveMap.propTypes = {
	dataField: PropTypes.string.isRequired,
	onIdle: PropTypes.func,
	onAllData: PropTypes.func,
	onData: PropTypes.func,
	onPopoverTrigger: PropTypes.func,
	setMarkerCluster: PropTypes.bool,
	autoMarkerPosition: PropTypes.bool,
	showMarkers: PropTypes.bool,
	streamTTL: ReactiveMapHelper.validation.streamTTL,
	popoverTTL: ReactiveMapHelper.validation.popoverTTL,
	size: helper.sizeValidation,
	from: ReactiveMapHelper.validation.fromValidation,
	autoMapRender: PropTypes.bool,
	style: PropTypes.object,
	autoCenter: PropTypes.bool,
	showSearchAsMove: PropTypes.bool,
	setSearchAsMove: PropTypes.bool,
	defaultMapStyle: PropTypes.oneOf(["Standard", "Blue Essence", "Blue Water", "Flat Map", "Light Monochrome", "Midnight Commander", "Unsaturated Browns"]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	streamAutoCenter: PropTypes.bool,
	defaultMarkerImage: PropTypes.string,
	streamMarkerImage: PropTypes.string,
	stream: PropTypes.bool,
	defaultZoom: ReactiveMapHelper.validation.defaultZoom,
	applyGeoQuery: PropTypes.bool,
	showPopoverOn: PropTypes.oneOf(["click", "mouseover"]),
	defaultCenter: PropTypes.shape({
		lat: ReactiveMapHelper.validation.validCenter,
		lon: ReactiveMapHelper.validation.validCenter
	}),
	react: PropTypes.object,
	markerOnClick: PropTypes.func,
	markerOnDblClick: PropTypes.func,
	onMouseOver: PropTypes.func,
	onMouseOut: PropTypes.func,
	showMapStyles: PropTypes.bool,
	className: PropTypes.string
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
	defaultMarkerImage: "https://opensource.appbase.io/reactivemaps/dist/images/historic-pin.png",
	streamMarkerImage: "https://opensource.appbase.io/reactivemaps/dist/images/stream-pin.png",
	style: {},
	stream: false,
	applyGeoQuery: false,
	defaultZoom: 13
};

ReactiveMap.contextTypes = {
	appbaseRef: PropTypes.any.isRequired,
	type: PropTypes.any.isRequired
};