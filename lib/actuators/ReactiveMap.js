"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require("react-google-maps");

var _MarkerClusterer = require("react-google-maps/lib/addons/MarkerClusterer");

var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactivebase = require("@appbaseio/reactivebase");

var _SearchAsMove = require("../addons/SearchAsMove");

var _MapStyles = require("../addons/MapStyles");

var _ReactiveMapHelper = require("../helper/ReactiveMapHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-lines: 0 */


var ReactiveMap = function (_Component) {
	_inherits(ReactiveMap, _Component);

	function ReactiveMap(props) {
		_classCallCheck(this, ReactiveMap);

		var _this = _possibleConstructorReturn(this, (ReactiveMap.__proto__ || Object.getPrototypeOf(ReactiveMap)).call(this, props));

		_this.state = {
			markers: [],
			selectedMarker: null,
			streamingStatus: "Intializing..",
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
		return _this;
	}

	_createClass(ReactiveMap, [{
		key: "getMapStyle",
		value: function getMapStyle(styleName) {
			var selectedStyle = _MapStyles.mapStylesCollection.filter(function (style) {
				return style.key === styleName;
			});

			if (selectedStyle.length) {
				return selectedStyle[0].value;
			}
			return null;
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.streamProp = this.props.stream;
			this.sizeProp = this.props.size;
			this.initialize();
		}
	}, {
		key: "initialize",
		value: function initialize() {
			var updateExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			this.setGeoQueryInfo();
			this.createChannel(updateExecute);
			var currentMapStyle = this.getMapStyle(this.props.defaultMapStyle);
			this.applyGeoQuery = this.props.applyGeoQuery ? this.props.applyGeoQuery : this.props.setSearchAsMove;
			this.setState({
				currentMapStyle: currentMapStyle
			});
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.defaultMapStyle !== this.props.defaultMapStyle) {
				this.mapStyleChange(this.getMapStyle(nextProps.defaultMapStyle));
			}
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate() {
			var _this2 = this;

			setTimeout(function () {
				if (_this2.streamProp !== _this2.props.stream) {
					_this2.streamProp = _this2.props.stream;
					_this2.removeChannel();
					_this2.initialize();
				}
				if (_this2.sizeProp !== _this2.props.size) {
					_this2.sizeProp = _this2.props.size;
					_this2.removeChannel();
					_this2.initialize(true);
				}
			}, 300);
		}

		// stop streaming request and remove listener when component will unmount

	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.removeChannel();
		}
	}, {
		key: "removeChannel",
		value: function removeChannel() {
			if (this.channelId) {
				_reactivebase.AppbaseChannelManager.stopStream(this.channelId);
				this.channelId = null;
			}
			if (this.channelListener) {
				this.channelListener.remove();
			}
		}

		// Create a channel which passes the actuate and receive results whenever actuate changes

	}, {
		key: "createChannel",
		value: function createChannel() {
			var _this3 = this;

			// Set the actuate - add self aggs query as well with actuate
			var react = this.props.react ? this.props.react : {};
			if (react && react.and) {
				if (typeof react.and === "string") {
					react.and = [react.and];
				}
			} else {
				react.and = [];
			}
			react.and.push("geoQuery");
			react.and.push("streamChanges");
			// create a channel and listen the changes
			var channelObj = _reactivebase.AppbaseChannelManager.create(this.context.appbaseRef, this.context.type, react, this.props.size, this.props.from, this.props.stream);
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
						if (this.props.onData) {
							var modifiedData = _reactivebase.AppbaseSensorHelper.prepareResultData(res);
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

				initialize.call(_this3);
			});
			var obj = {
				key: "streamChanges",
				value: ""
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
		}
	}, {
		key: "afterChannelResponse",
		value: function afterChannelResponse(res) {
			var _this4 = this;

			var getResult = (0, _ReactiveMapHelper.afterChannelResponse)(res, this.state.rawData, this.props.appbaseField, this.state.markersData);
			this.reposition = true;
			this.streamFlag = getResult.streamFlag;
			this.queryStartTime = getResult.queryStartTime;
			this.setState({
				rawData: getResult.rawData,
				markersData: getResult.markersData
			}, function () {
				if (_this4.props.onData) {
					// Pass the historic or streaming data in index method
					res.allMarkers = getResult.rawData;
					var modifiedData = JSON.parse(JSON.stringify(res));
					modifiedData.newData = getResult.newData;
					modifiedData.currentData = getResult.currentData;
					delete modifiedData.data;
					modifiedData = _reactivebase.AppbaseSensorHelper.prepareResultData(modifiedData, res.data);
					if (_this4.props.onData) {
						if (modifiedData.res) {
							modifiedData.res.mapRef = _this4.mapRef;
						}
						var generatedData = _this4.props.onData(modifiedData.res, modifiedData.err);
						_this4.setState({
							externalData: generatedData
						});
					}
				}
				if (_this4.streamFlag) {
					_this4.streamMarkerInterval();
				}
			});
		}

		// set the query type and input data

	}, {
		key: "setGeoQueryInfo",
		value: function setGeoQueryInfo() {
			var obj = {
				key: "geoQuery",
				value: {
					queryType: "geo_bounding_box",
					inputData: this.props.appbaseField,
					customQuery: this.geoCustomQuery
				}
			};
			var obj1 = {
				key: "updateExecute",
				value: {
					queryType: "random",
					inputData: this.props.appbaseField
				}
			};
			var obj1 = {
				key: 'updateExecute',
				value: {
					queryType: 'random',
					inputData: this.props.appbaseField
				}
			};

			_reactivebase.AppbaseSensorHelper.selectedSensor.setSensorInfo(obj);
			_reactivebase.AppbaseSensorHelper.selectedSensor.setSensorInfo(obj1);
		}
	}, {
		key: "geoCustomQuery",
		value: function geoCustomQuery(value) {
			var query = null;
			if (value) {
				query = {
					geo_bounding_box: _defineProperty({}, this.props.appbaseField, value)
				};
				if (this.geoRelatedEventsChange) {
					this.geoRelatedEventsChange = false;
				} else if (this.applyGeoQuery) {
					this.applyGeoQuery = false;
				}
			}
			return query;
		}
	}, {
		key: "updateExecute",
		value: function updateExecute() {
			setTimeout(function () {
				var obj = {
					key: "updateExecute",
					value: Math.random()
				};
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}, 1000);
		}

		// Show InfoWindow and re-renders component

	}, {
		key: "handleMarkerClick",
		value: function handleMarkerClick(marker) {
			marker.showInfo = true;
			this.reposition = false;
			this.setState({
				rerender: true
			});
		}

		// Close infowindow

	}, {
		key: "handleMarkerClose",
		value: function handleMarkerClose(marker) {
			marker.showInfo = false;
			this.reposition = false;
			this.setState(this.state);
		}

		// render infowindow

	}, {
		key: "renderInfoWindow",
		value: function renderInfoWindow(ref, marker) {
			var _this5 = this;

			var onPopoverTrigger = this.props.onPopoverTrigger ? this.props.onPopoverTrigger(marker) : "Popver";
			return _react2.default.createElement(
				_reactGoogleMaps.InfoWindow,
				{
					zIndex: 500,
					key: ref + "_info_window",
					onCloseclick: function onCloseclick() {
						return _this5.handleMarkerClose(marker);
					}
				},
				_react2.default.createElement(
					"div",
					null,
					onPopoverTrigger
				)
			);
		}

		// Handle function which is fired when map is moved and reaches to idle position

	}, {
		key: "handleOnIdle",
		value: function handleOnIdle() {
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
				if (this.applyGeoQuery || this.geoRelatedEventsChange && this.searchAsMove && !this.searchQueryProgress) {
					var flag = this.applyGeoQuery ? this.applyGeoQuery : this.searchAsMove;
					this.setValue(boundingBoxCoordinates, flag);
				}
				this.setState(stateObj);
			}
		}

		// Handle function which is fired when map is dragged

	}, {
		key: "handleOnDrage",
		value: function handleOnDrage() {
			this.storeCenter = null;
		}

		// set value

	}, {
		key: "setValue",
		value: function setValue(value) {
			var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var obj = {
				key: "geoQuery",
				value: value
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, isExecuteQuery);
		}

		// on change of selectiong

	}, {
		key: "searchAsMoveChange",
		value: function searchAsMoveChange(value) {
			this.searchAsMove = value;
			if (value && this.mapRef) {
				this.handleOnIdle();
			}
		}

		// mapStyle changes

	}, {
		key: "mapStyleChange",
		value: function mapStyleChange(style) {
			this.setState({
				currentMapStyle: style
			});
		}

		// Handler function for bounds changed which udpates the map center

	}, {
		key: "handleBoundsChanged",
		value: function handleBoundsChanged() {
			var _this6 = this;

			if (!this.searchQueryProgress) {
				// this.setState({
				//   center: this.mapRef.getCenter()
				// });
			} else {
				setTimeout(function () {
					_this6.searchQueryProgress = false;
				}, 1000 * 1);
			}
		}

		// Check if stream data exists in markersData
		// and if exists the call streamToNormal.

	}, {
		key: "streamMarkerInterval",
		value: function streamMarkerInterval() {
			var _this7 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				this.isStreamDataExists = true;
				setTimeout(function () {
					return _this7.streamToNormal();
				}, this.props.streamTTL * 1000);
			} else {
				this.isStreamDataExists = false;
			}
		}

		// Check the difference between current time and attached stream time
		// if difference is equal to streamTTL then delete stream and starStream property of marker

	}, {
		key: "streamToNormal",
		value: function streamToNormal() {
			var _this8 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				markersData = markersData.map(function (hit) {
					if (hit.stream && hit.streamStart) {
						var currentTime = new Date();
						var timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
						if (timeDiff >= _this8.props.streamTTL) {
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
	}, {
		key: "getIcon",
		value: function getIcon(hit) {
			return hit.stream ? this.props.streamMarkerImage : this.props.defaultMarkerImage;
		}
	}, {
		key: "chooseIcon",
		value: function chooseIcon(hit) {
			var icon = hit.external_icon ? hit.external_icon : this.getIcon(hit);
			var isSvg = !!((typeof icon === "undefined" ? "undefined" : _typeof(icon)) === "object" && "path" in icon);
			if (isSvg) {
				icon = JSON.parse(JSON.stringify(icon));
				if (this.props.autoMarkerPosition) {
					var deg = hit.angleDeg ? hit.angleDeg : 0;
					icon.rotation = deg;
				}
			}
			return icon;
		}

		// here we accepts marker props which we received from onData and apply those external props in Marker component

	}, {
		key: "combineProps",
		value: function combineProps(hit) {
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
		}
	}, {
		key: "generateMarkers",
		value: function generateMarkers() {
			var _this9 = this;

			var self = this;
			var markersData = this.state.markersData;
			var response = {
				markerComponent: [],
				defaultCenter: null,
				convertedGeo: []
			};
			if (markersData && markersData.length) {
				markersData = markersData.filter(function (hit) {
					return (0, _ReactiveMapHelper.identifyGeoData)(hit._source[self.props.appbaseField]);
				});
				response.markerComponent = markersData.map(function (hit, index) {
					var field = (0, _ReactiveMapHelper.identifyGeoData)(hit._source[self.props.appbaseField]);
					response.convertedGeo.push(field);
					var position = {
						position: field
					};
					var ref = "marker_ref_" + index;
					var popoverEvent = void 0;
					if (_this9.props.showPopoverOn) {
						popoverEvent = {};
						var eventName = _this9.props.showPopoverOn.split("");
						eventName[0] = eventName[0].toUpperCase();
						eventName = eventName.join("");
						popoverEvent["on" + eventName] = _this9.handleMarkerClick.bind(_this9, hit);
					} else {
						popoverEvent = {};
						popoverEvent.onClick = _this9.handleMarkerClick.bind(_this9, hit);
					}
					var defaultFn = function defaultFn() {};
					var events = {
						onClick: _this9.props.markerOnClick ? _this9.props.markerOnClick : defaultFn,
						onDblclick: _this9.props.markerOnDblclick ? _this9.props.markerOnDblclick : defaultFn,
						onMouseover: _this9.props.onMouseover ? _this9.props.onMouseover : defaultFn,
						onMouseout: _this9.props.onMouseout ? _this9.props.onMouseout : defaultFn
					};
					return _react2.default.createElement(
						_reactGoogleMaps.Marker,
						_extends({}, position, {
							key: hit._id,
							zIndex: 1,
							ref: ref
						}, self.combineProps(hit), {
							onClick: function onClick() {
								return events.onClick(hit._source);
							},
							onDblclick: function onDblclick() {
								return events.onDblclick(hit._source);
							},
							onMouseover: function onMouseover() {
								return events.onMouseover(hit._source);
							},
							onMouseout: function onMouseout() {
								return events.onMouseout(hit._source);
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
		}
	}, {
		key: "externalData",
		value: function externalData() {
			var _this10 = this;

			var recordList = [];
			if (this.state.externalData) {
				Object.keys(this.state.externalData).forEach(function (record) {
					if (record !== "markers") {
						recordList = recordList.concat(_this10.state.externalData[record]);
					}
				});
			}
			return recordList;
		}
	}, {
		key: "mapEvents",
		value: function mapEvents(eventName) {
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
		}
	}, {
		key: "getStoreCenter",
		value: function getStoreCenter() {
			return this.storeCenter ? this.storeCenter : this.state.center;
		}
	}, {
		key: "render",
		value: function render() {
			var _this11 = this;

			var markerComponent = void 0,
			    showSearchAsMove = void 0,
			    showMapStyles = void 0;
			var title = null,
			    center = null;
			var centerComponent = {};
			var generatedMarkers = this.generateMarkers();
			if (this.props.setMarkerCluster) {
				markerComponent = _react2.default.createElement(
					_MarkerClusterer2.default,
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
				centerComponent.center = center;
			} else if (this.storeCenter) {
				center = this.storeCenter;
				centerComponent.center = center;
			} else {
				center = null;
			}
			// include searchasMove component
			if (this.props.showSearchAsMove) {
				showSearchAsMove = _react2.default.createElement(_SearchAsMove.SearchAsMove, { searchAsMoveDefault: this.props.setSearchAsMove, searchAsMoveChange: this.searchAsMoveChange });
			}
			// include mapStyle choose component
			if (this.props.showMapStyles) {
				showMapStyles = _react2.default.createElement(_MapStyles.MapStyles, { defaultSelected: this.props.defaultMapStyle, mapStyleChange: this.mapStyleChange });
			}
			// include title if exists
			if (this.props.title) {
				title = _react2.default.createElement(
					"h4",
					{ className: "rbc-title col s12 m8 col-xs-12 col-sm-8" },
					this.props.title
				);
			}

			var cx = (0, _classnames2.default)({
				"rbc-title-active": this.props.title,
				"rbc-title-inactive": !this.props.title
			});

			return _react2.default.createElement(
				"div",
				{ className: "rbc rbc-reactivemap col s12 col-xs-12 card thumbnail " + cx, style: this.props.componentStyle },
				title,
				showMapStyles,
				_react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
					containerElement: _react2.default.createElement("div", { className: "rbc-container col s12 col-xs-12", style: this.props.containerStyle }),
					googleMapElement: _react2.default.createElement(
						_reactGoogleMaps.GoogleMap,
						_extends({
							ref: function ref(map) {
								_this11.mapRef = map;
							},
							options: {
								styles: this.state.currentMapStyle
							}
						}, centerComponent, this.props, {
							onDragstart: function onDragstart() {
								_this11.handleOnDrage();
								_this11.mapEvents("onDragstart");
							},
							onIdle: function onIdle() {
								return _this11.handleOnIdle();
							},
							onClick: function onClick() {
								return _this11.mapEvents("onClick");
							},
							onDblclick: function onDblclick() {
								return _this11.mapEvents("onDblclick");
							},
							onDrag: function onDrag() {
								return _this11.mapEvents("onDrag");
							},
							onDragend: function onDragend() {
								return _this11.mapEvents("onDragend");
							},
							onMousemove: function onMousemove() {
								return _this11.mapEvents("onMousemove");
							},
							onMouseout: function onMouseout() {
								return _this11.mapEvents("onMouseout");
							},
							onMouseover: function onMouseover() {
								return _this11.mapEvents("onMouseover");
							},
							onResize: function onResize() {
								return _this11.mapEvents("onResize");
							},
							onRightclick: function onRightclick() {
								return _this11.mapEvents("onRightclick");
							},
							onTilesloaded: function onTilesloaded() {
								return _this11.mapEvents("onTilesloaded");
							},
							onBoundsChanged: function onBoundsChanged() {
								return _this11.mapEvents("onBoundsChanged");
							},
							onCenterChanged: function onCenterChanged() {
								return _this11.mapEvents("onCenterChanged");
							},
							onProjectionChanged: function onProjectionChanged() {
								return _this11.mapEvents("onProjectionChanged");
							},
							onTiltChanged: function onTiltChanged() {
								return _this11.mapEvents("onTiltChanged");
							},
							onZoomChanged: function onZoomChanged() {
								return _this11.mapEvents("onZoomChanged");
							}
						}),
						markerComponent,
						this.externalData()
					)
				}),
				showSearchAsMove,
				_react2.default.createElement(_reactivebase.PoweredBy, null)
			);
		}
	}]);

	return ReactiveMap;
}(_react.Component);

exports.default = ReactiveMap;


ReactiveMap.propTypes = {
	appbaseField: _react2.default.PropTypes.string.isRequired,
	onIdle: _react2.default.PropTypes.func,
	onData: _react2.default.PropTypes.func,
	onPopoverTrigger: _react2.default.PropTypes.func,
	setMarkerCluster: _react2.default.PropTypes.bool,
	autoMarkerPosition: _react2.default.PropTypes.bool,
	showMarkers: _react2.default.PropTypes.bool,
	streamTTL: _ReactiveMapHelper.validation.streamTTL,
	size: _reactivebase.AppbaseSensorHelper.sizeValidation,
	from: _ReactiveMapHelper.validation.fromValidation,
	autoMapRender: _react2.default.PropTypes.bool, // usecase?
	componentStyle: _react2.default.PropTypes.object,
	containerStyle: _react2.default.PropTypes.object,
	autoCenter: _react2.default.PropTypes.bool,
	showSearchAsMove: _react2.default.PropTypes.bool,
	setSearchAsMove: _react2.default.PropTypes.bool,
	defaultMapStyle: _react2.default.PropTypes.oneOf(["Standard", "Blue Essence", "Blue Water", "Flat Map", "Light Monochrome", "Midnight Commander", "Unsaturated Browns"]),
	title: _react2.default.PropTypes.string,
	streamAutoCenter: _react2.default.PropTypes.bool,
	defaultMarkerImage: _react2.default.PropTypes.string,
	streamMarkerImage: _react2.default.PropTypes.string,
	stream: _react2.default.PropTypes.bool,
	defaultZoom: _ReactiveMapHelper.validation.defaultZoom,
	applyGeoQuery: _react2.default.PropTypes.bool,
	showPopoverOn: _react2.default.PropTypes.oneOf(["click", "mouseover"]),
	defaultCenter: _react2.default.PropTypes.shape({
		lat: _ReactiveMapHelper.validation.validCenter,
		lng: _ReactiveMapHelper.validation.validCenter
	}),
	react: _react2.default.PropTypes.object,
	markerOnClick: _react2.default.PropTypes.func,
	markerOnDblclick: _react2.default.PropTypes.func,
	onMouseover: _react2.default.PropTypes.func,
	onMouseout: _react2.default.PropTypes.func,
	showMapStyles: _react2.default.PropTypes.bool
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
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};