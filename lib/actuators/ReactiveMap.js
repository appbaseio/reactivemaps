'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ReactiveMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require('react-google-maps');

var _InfoBox = require('react-google-maps/lib/addons/InfoBox');

var _InfoBox2 = _interopRequireDefault(_InfoBox);

var _MarkerClusterer = require('react-google-maps/lib/addons/MarkerClusterer');

var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

var _SearchAsMove = require('../addons/SearchAsMove');

var _MapStyles = require('../addons/MapStyles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactivebase = require('@appbaseio/reactivebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash');

var ReactiveMap = exports.ReactiveMap = function (_Component) {
	_inherits(ReactiveMap, _Component);

	function ReactiveMap(props, context) {
		_classCallCheck(this, ReactiveMap);

		var _this = _possibleConstructorReturn(this, (ReactiveMap.__proto__ || Object.getPrototypeOf(ReactiveMap)).call(this, props));

		_this.state = {
			markers: [],
			selectedMarker: null,
			streamingStatus: 'Intializing..',
			center: _this.props.defaultCenter,
			query: {},
			rawData: {
				hits: {
					hits: []
				}
			},
			externalData: {},
			mapBounds: null
		};
		_this.previousSelectedSensor = {};
		_this.handleSearch = _this.handleSearch.bind(_this);
		_this.searchAsMoveChange = _this.searchAsMoveChange.bind(_this);
		_this.mapStyleChange = _this.mapStyleChange.bind(_this);
		_this.queryStartTime = 0;
		_this.reposition = false;
		return _this;
	}

	_createClass(ReactiveMap, [{
		key: 'getMapStyle',
		value: function getMapStyle(styleName) {
			var selectedStyle = _MapStyles.mapStylesCollection.filter(function (style) {
				return style.key === styleName;
			});

			if (selectedStyle.length) {
				return selectedStyle[0].value;
			} else {
				return null;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.streamProp = this.props.stream;
			this.sizeProp = this.props.size;
			this.initialize();
		}
	}, {
		key: 'initialize',
		value: function initialize() {
			var updateExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			this.createChannel(updateExecute);
			this.setGeoQueryInfo();
			var currentMapStyle = this.getMapStyle(this.props.defaultMapStyle);
			this.setState({
				currentMapStyle: currentMapStyle
			});
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			var _this2 = this;

			setTimeout(function () {
				if (_this2.streamProp != _this2.props.stream) {
					_this2.streamProp = _this2.props.stream;
					_this2.removeChannel();
					_this2.initialize();
				}
				if (_this2.sizeProp != _this2.props.size) {
					_this2.sizeProp = _this2.props.size;
					_this2.removeChannel();
					_this2.initialize(true);
				}
			}, 300);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.defaultMapStyle != this.props.defaultMapStyle) {
				this.mapStyleChange(this.getMapStyle(nextProps.defaultMapStyle));
			}
		}

		// stop streaming request and remove listener when component will unmount

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.removeChannel();
		}
	}, {
		key: 'removeChannel',
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
		key: 'createChannel',
		value: function createChannel() {
			var updateExecute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			// Set the actuate - add self aggs query as well with actuate
			var actuate = this.props.actuate ? this.props.actuate : {};
			actuate['geoQuery'] = { operation: "must" };
			actuate.streamChanges = { operation: 'must' };
			// create a channel and listen the changes
			var channelObj = _reactivebase.AppbaseChannelManager.create(this.context.appbaseRef, this.context.type, actuate, this.props.size, this.props.from, this.props.stream);
			this.channelId = channelObj.channelId;
			this.channelListener = channelObj.emitter.addListener(channelObj.channelId, function (res) {
				var data = res.data;
				// implementation to prevent initialize query issue if old query response is late then the newer query
				// then we will consider the response of new query and prevent to apply changes for old query response.
				// if queryStartTime of channel response is greater than the previous one only then apply changes
				if (!this.state.mapBounds) {
					checkAndGo.call(this);
				} else {
					if (this.props.autoMapRender) {
						checkAndGo.call(this);
					} else {
						if (data.hits.hits.length) {
							checkAndGo.call(this);
						}
					}
				}
				function checkAndGo() {
					if (res.mode === 'historic' && res.startTime > this.queryStartTime) {
						this.afterChannelResponse(res);
					} else if (res.mode === 'streaming') {
						this.afterChannelResponse(res);
					}
				}
			}.bind(this));
			var obj = {
				key: 'streamChanges',
				value: ''
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
		}
	}, {
		key: 'afterChannelResponse',
		value: function afterChannelResponse(res) {
			var data = res.data;
			var rawData = void 0,
			    markersData = void 0;
			this.streamFlag = false;
			if (res.mode === 'streaming') {
				this.channelMethod = 'streaming';
				var modData = this.streamDataModify(this.state.rawData, res);
				rawData = modData.rawData;
				res = modData.res;
				this.streamFlag = true;
				markersData = this.setMarkersData(rawData);
			} else if (res.mode === 'historic') {
				this.channelMethod = 'historic';
				this.queryStartTime = res.startTime;
				rawData = data;
				markersData = this.setMarkersData(data);
			}
			this.reposition = true;
			this.setState({
				rawData: rawData,
				markersData: markersData
			}, function () {
				// Pass the historic or streaming data in index method
				res.allMarkers = rawData;
				res.mapRef = this.refs.map;
				if (this.props.onData) {
					var generatedData = this.props.onData(res);
					this.setState({
						externalData: generatedData
					});
				}
				if (this.streamFlag) {
					this.streamMarkerInterval();
				}
			}.bind(this));
		}

		// append stream boolean flag and also start time of stream

	}, {
		key: 'streamDataModify',
		value: function streamDataModify(rawData, res) {
			if (res.data) {
				res.data.stream = true;
				res.data.streamStart = new Date();
				if (res.data._deleted) {
					var hits = rawData.hits.hits.filter(function (hit) {
						return hit._id !== res.data._id;
					});
					rawData.hits.hits = hits;
				} else {
					var prevData = rawData.hits.hits.filter(function (hit) {
						return hit._id === res.data._id;
					});
					if (prevData && prevData.length) {
						var preCord = prevData[0]._source[this.props.appbaseField];
						var newCord = res.data._source[this.props.appbaseField];
						res.data.angleDeg = this.bearing(preCord.lat, preCord.lon, newCord.lat, newCord.lon);
					}
					var _hits = rawData.hits.hits.filter(function (hit) {
						return hit._id !== res.data._id;
					});
					rawData.hits.hits = _hits;
					rawData.hits.hits.push(res.data);
				}
			}
			return {
				rawData: rawData,
				res: res,
				streamFlag: true
			};
		}
	}, {
		key: 'bearing',
		value: function bearing(lat1, lng1, lat2, lng2) {
			var dLon = this._toRad(lng2 - lng1);
			var y = Math.sin(dLon) * Math.cos(this._toRad(lat2));
			var x = Math.cos(this._toRad(lat1)) * Math.sin(this._toRad(lat2)) - Math.sin(this._toRad(lat1)) * Math.cos(this._toRad(lat2)) * Math.cos(dLon);
			var brng = this._toDeg(Math.atan2(y, x));
			return (brng + 360) % 360;
		}
	}, {
		key: '_toRad',
		value: function _toRad(deg) {
			return deg * Math.PI / 180;
		}
	}, {
		key: '_toDeg',
		value: function _toDeg(rad) {
			return rad * 180 / Math.PI;
		}

		// tranform the raw data to marker data

	}, {
		key: 'setMarkersData',
		value: function setMarkersData(data) {
			var self = this;
			if (data && data.hits && data.hits.hits) {
				var markersData = data.hits.hits.map(function (hit, index) {
					hit._source.mapPoint = self.identifyGeoData(hit._source[self.props.appbaseField]);
					return hit;
				});
				markersData = markersData.filter(function (hit, index) {
					return hit._source.mapPoint && !(hit._source.mapPoint.lat === 0 && hit._source.mapPoint.lng === 0);
				});
				markersData = this.sortByDistance(markersData);
				markersData = markersData.map(function (marker) {
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

	}, {
		key: 'sortByDistance',
		value: function sortByDistance(data) {
			var _this3 = this;

			var modifiedData = data.map(function (record) {
				record.distance = _this3.findDistance(data, record);
				return record;
			});
			modifiedData = _.orderBy(modifiedData, 'distance');
			return modifiedData;
		}
	}, {
		key: 'findDistance',
		value: function findDistance(data, record) {
			record.distance = 0;
			var modifiednData = data.map(function (to) {
				record.distance += getDistance(record._source.mapPoint.lat, record._source.mapPoint.lng, to._source.mapPoint.lat, to._source.mapPoint.lng);
			});
			function getDistance(lat1, lon1, lat2, lon2) {
				var R = 6371; // Radius of the earth in km
				var dLat = deg2rad(lat2 - lat1); // deg2rad below
				var dLon = deg2rad(lon2 - lon1);
				var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				var d = R * c; // Distance in km
				return d;
			}
			function deg2rad(deg) {
				return deg * (Math.PI / 180);
			}
			return record.distance;
		}

		// set the query type and input data

	}, {
		key: 'setGeoQueryInfo',
		value: function setGeoQueryInfo() {
			var obj = {
				key: 'geoQuery',
				value: {
					queryType: 'geo_bounding_box',
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
		key: 'updateExecute',
		value: function updateExecute() {
			setTimeout(function () {
				var obj = {
					key: 'updateExecute',
					value: Math.random()
				};
				_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, true);
			}, 1000);
		}

		// Show InfoWindow and re-renders component

	}, {
		key: 'handleMarkerClick',
		value: function handleMarkerClick(marker) {
			marker.showInfo = true;
			this.reposition = false;
			this.setState({
				rerender: true
			});
		}

		// Close infowindow

	}, {
		key: 'handleMarkerClose',
		value: function handleMarkerClose(marker) {
			marker.showInfo = false;
			this.reposition = false;
			this.setState(this.state);
		}

		// render infowindow

	}, {
		key: 'renderInfoWindow',
		value: function renderInfoWindow(ref, marker) {
			var onPopoverTrigger = this.props.onPopoverTrigger ? this.props.onPopoverTrigger(marker) : 'Popver';
			return _react2.default.createElement(
				_reactGoogleMaps.InfoWindow,
				{
					zIndex: 500,
					key: ref + '_info_window',
					onCloseclick: this.handleMarkerClose.bind(this, marker) },
				_react2.default.createElement(
					'div',
					null,
					onPopoverTrigger
				)
			);
		}

		// Handle function which is fired when map is moved and reaches to idle position

	}, {
		key: 'handleOnIdle',
		value: function handleOnIdle() {
			var mapBounds = this.refs.map.getBounds();
			if (mapBounds) {
				var north = mapBounds.getNorthEast().lat();
				var south = mapBounds.getSouthWest().lat();
				var east = mapBounds.getNorthEast().lng();
				var west = mapBounds.getSouthWest().lng();
				var boundingBoxCoordinates = {
					"top_left": [west, north],
					"bottom_right": [east, south]
				};
				var stateObj = {
					mapBounds: mapBounds
				};
				if (this.props.onIdle) {
					var generatedData = this.props.onIdle(this.refs.map, {
						boundingBoxCoordinates: boundingBoxCoordinates,
						mapBounds: mapBounds
					});
					stateObj.externalData = generatedData;
				}
				if (this.searchAsMove && !this.searchQueryProgress) {
					this.setValue(boundingBoxCoordinates, this.searchAsMove);
				}
				this.setState(stateObj);
			}
		}

		// Handle function which is fired when map is dragged

	}, {
		key: 'handleOnDrage',
		value: function handleOnDrage() {
			this.storeCenter = null;
		}

		// set value

	}, {
		key: 'setValue',
		value: function setValue(value) {
			var isExecuteQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var obj = {
				key: 'geoQuery',
				value: value
			};
			_reactivebase.AppbaseSensorHelper.selectedSensor.set(obj, isExecuteQuery);
		}

		// on change of selectiong

	}, {
		key: 'searchAsMoveChange',
		value: function searchAsMoveChange(value) {
			this.searchAsMove = value;
			if (value && this.refs.map) {
				this.handleOnIdle();
			}
		}

		// mapStyle changes

	}, {
		key: 'mapStyleChange',
		value: function mapStyleChange(style) {
			this.setState({
				currentMapStyle: style
			});
		}

		// Handler function for bounds changed which udpates the map center

	}, {
		key: 'handleBoundsChanged',
		value: function handleBoundsChanged() {
			var _this4 = this;

			if (!this.searchQueryProgress) {
				// this.setState({
				//   center: this.refs.map.getCenter()
				// });
			} else {
				setTimeout(function () {
					_this4.searchQueryProgress = false;
				}, 1000 * 1);
			}
		}

		// Handler function which is fired when an input is selected from autocomplete google places

	}, {
		key: 'handlePlacesChanged',
		value: function handlePlacesChanged() {
			var places = this.refs.searchBox.getPlaces();
			// this.setState({
			//   center: places[0].geometry.location
			// });
		}

		// Handler function which is fired when an input is selected from Appbase geo search field

	}, {
		key: 'handleSearch',
		value: function handleSearch(location) {
			// this.setState({
			//   center: new google.maps.LatLng(location.value.lat, location.value.lon)
			// });
		}
	}, {
		key: 'identifyGeoData',
		value: function identifyGeoData(input) {
			var type = Object.prototype.toString.call(input);
			var convertedGeo = null;
			if (type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
				convertedGeo = {
					lat: Number(input.lat),
					lng: Number(input.lon)
				};
			} else if (type === '[object Array]' && input.length === 2) {
				convertedGeo = {
					lat: Number(input[0]),
					lng: Number(input[1])
				};
			}
			return convertedGeo;
		}

		// Check if stream data exists in markersData
		// and if exists the call streamToNormal.

	}, {
		key: 'streamMarkerInterval',
		value: function streamMarkerInterval() {
			var _this5 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				this.isStreamDataExists = true;
				setTimeout(function () {
					return _this5.streamToNormal();
				}, this.props.streamTTL * 1000);
			} else {
				this.isStreamDataExists = false;
			}
		}

		// Check the difference between current time and attached stream time
		// if difference is equal to streamTTL then delete stream and starStream property of marker

	}, {
		key: 'streamToNormal',
		value: function streamToNormal() {
			var _this6 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				markersData = markersData.map(function (hit, index) {
					if (hit.stream && hit.streamStart) {
						var currentTime = new Date();
						var timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
						if (timeDiff >= _this6.props.streamTTL) {
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
		key: 'chooseIcon',
		value: function chooseIcon(hit) {
			var icon = hit.external_icon ? hit.external_icon : hit.stream ? this.props.streamMarkerImage : this.props.defaultMarkerImage;
			var isSvg = (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) === 'object' && icon.hasOwnProperty('path') ? true : false;
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
		key: 'combineProps',
		value: function combineProps(hit) {
			var externalProps = void 0,
			    markerProp = {};
			if (this.state.externalData && this.state.externalData.markers && this.state.externalData.markers[hit._id]) {
				externalProps = this.state.externalData.markers[hit._id];
				for (var external_p in externalProps) {
					hit["external_" + external_p] = externalProps[external_p];
					markerProp[external_p] = externalProps[external_p];
				}
			}
			markerProp.icon = this.chooseIcon(hit);
			return markerProp;
		}
	}, {
		key: 'generateMarkers',
		value: function generateMarkers() {
			var _this7 = this;

			var self = this;
			var markersData = this.state.markersData;
			var response = {
				markerComponent: [],
				defaultCenter: null,
				convertedGeo: []
			};
			if (markersData && markersData.length) {
				response.markerComponent = markersData.map(function (hit, index) {
					var field = self.identifyGeoData(hit._source[self.props.appbaseField]);
					// let icon = !this.props.autoMarkerPosition ? iconPath : RotateIcon.makeIcon(iconPath).setRotation({deg: deg}).getUrl();
					// let icon = self.chooseIcon(hit);
					if (field) {
						var _ret = function () {
							response.convertedGeo.push(field);
							var position = {
								position: field
							};
							var ref = 'marker_ref_' + index;
							var popoverEvent = void 0;
							if (_this7.props.showPopoverOn) {
								popoverEvent = {};
								var eventName = _this7.props.showPopoverOn.split('');
								eventName[0] = eventName[0].toUpperCase();
								eventName = eventName.join('');
								popoverEvent['on' + eventName] = _this7.handleMarkerClick.bind(_this7, hit);
							} else {
								popoverEvent = {};
								popoverEvent['onClick'] = _this7.handleMarkerClick.bind(_this7, hit);
							}
							var defaultFn = function defaultFn() {};
							var events = {
								onClick: _this7.props.markerOnClick ? _this7.props.markerOnClick : defaultFn,
								onDblclick: _this7.props.markerOnDblclick ? _this7.props.markerOnDblclick : defaultFn,
								onMouseover: _this7.props.onMouseover ? _this7.props.onMouseover : defaultFn,
								onMouseout: _this7.props.onMouseout ? _this7.props.onMouseout : defaultFn
							};
							var timenow = new Date();
							return {
								v: _react2.default.createElement(
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
								)
							};
						}();

						if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					}
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
		key: 'externalData',
		value: function externalData() {
			var recordList = [];
			if (this.state.externalData) {
				for (var record in this.state.externalData) {
					if (record !== 'markers') {
						recordList = recordList.concat(this.state.externalData[record]);
					}
				}
			}
			return recordList;
		}
	}, {
		key: 'mapEvents',
		value: function mapEvents(eventName) {
			if (this.props[eventName]) {
				var externalData = this.props[eventName](this.refs.map);
				if (externalData) {
					this.setState({
						externalData: externalData
					});
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this8 = this;

			var self = this;
			var markerComponent, showSearchAsMove, showMapStyles;
			var appbaseSearch = void 0,
			    title = null,
			    center = null;
			var centerComponent = {};
			var otherOptions;
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
			if (this.channelMethod === 'streaming' && !this.props.streamAutoCenter) {
				streamCenterFlag = false;
			}
			if (!this.searchAsMove && this.props.autoCenter && this.reposition && streamCenterFlag) {
				center = generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.storeCenter ? this.storeCenter : this.state.center;
				this.storeCenter = center;
				this.reposition = false;
				centerComponent.center = center;
			} else {
				if (this.storeCenter) {
					center = this.storeCenter;
					centerComponent.center = center;
				} else {
					center = null;
				}
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
					'h4',
					{ className: 'rbc-title col s12 m8 col-xs-12 col-sm-8' },
					this.props.title
				);
			}

			var cx = (0, _classnames2.default)({
				'rbc-title-active': this.props.title,
				'rbc-title-inactive': !this.props.title
			});

			return _react2.default.createElement(
				'div',
				{ className: 'rbc rbc-reactivemap col s12 col-xs-12 card thumbnail ' + cx, style: this.props.componentStyle },
				title,
				showMapStyles,
				_react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
					containerElement: _react2.default.createElement('div', { className: 'rbc-container col s12 col-xs-12', style: this.props.containerStyle }),
					googleMapElement: _react2.default.createElement(
						_reactGoogleMaps.GoogleMap,
						_extends({ ref: 'map',
							options: {
								styles: this.state.currentMapStyle
							}
						}, centerComponent, this.props, {
							onDragstart: function onDragstart() {
								_this8.handleOnDrage();
								_this8.mapEvents('onDragstart');
							},
							onIdle: function onIdle() {
								return _this8.handleOnIdle();
							},
							onClick: function onClick() {
								return _this8.mapEvents('onClick');
							},
							onDblclick: function onDblclick() {
								return _this8.mapEvents('onDblclick');
							},
							onDrag: function onDrag() {
								return _this8.mapEvents('onDrag');
							},
							onDragend: function onDragend() {
								return _this8.mapEvents('onDragend');
							},
							onMousemove: function onMousemove() {
								return _this8.mapEvents('onMousemove');
							},
							onMouseout: function onMouseout() {
								return _this8.mapEvents('onMouseout');
							},
							onMouseover: function onMouseover() {
								return _this8.mapEvents('onMouseover');
							},
							onResize: function onResize() {
								return _this8.mapEvents('onResize');
							},
							onRightclick: function onRightclick() {
								return _this8.mapEvents('onRightclick');
							},
							onTilesloaded: function onTilesloaded() {
								return _this8.mapEvents('onTilesloaded');
							},
							onBoundsChanged: function onBoundsChanged() {
								return _this8.mapEvents('onBoundsChanged');
							},
							onCenterChanged: function onCenterChanged() {
								return _this8.mapEvents('onCenterChanged');
							},
							onProjectionChanged: function onProjectionChanged() {
								return _this8.mapEvents('onProjectionChanged');
							},
							onTiltChanged: function onTiltChanged() {
								return _this8.mapEvents('onTiltChanged');
							},
							onZoomChanged: function onZoomChanged() {
								return _this8.mapEvents('onZoomChanged');
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

var validation = {
	defaultZoom: function defaultZoom(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 20) {
			return new Error('zoom value should be an integer between 0 and 20.');
		}
	},
	validCenter: function validCenter(props, propName, componentName) {
		if (isNaN(props[propName])) {
			return new Error(propName + ' value must be number');
		} else {
			if (propName === 'lat' && (props[propName] < -90 || props[propName] > 90)) {
				return new Error(propName + ' value should be between -90 and 90.');
			} else if (propName === 'lng' && (props[propName] < -180 || props[propName] > 180)) {
				return new Error(propName + ' value should be between -180 and 180.');
			}
		}
	},
	fromValidation: function fromValidation(props, propName, componentName) {
		if (props[propName] < 0) {
			return new Error(propName + ' value should be greater than or equal to 0.');
		}
	},
	streamTTL: function streamTTL(props, propName, componentName) {
		if (props[propName] < 0 || props[propName] > 1000) {
			return new Error(propName + ' should be a positive integer between 0 and 1000, counted in seconds for a streaming update to be visible.');
		}
	}
};

ReactiveMap.propTypes = {
	appbaseField: _react2.default.PropTypes.string.isRequired,
	onIdle: _react2.default.PropTypes.func,
	onData: _react2.default.PropTypes.func,
	onPopoverTrigger: _react2.default.PropTypes.func,
	setMarkerCluster: _react2.default.PropTypes.bool,
	autoMarkerPosition: _react2.default.PropTypes.bool,
	showMarkers: _react2.default.PropTypes.bool,
	streamTTL: validation.streamTTL,
	size: _reactivebase.AppbaseSensorHelper.sizeValidation,
	from: validation.fromValidation,
	autoMapRender: _react2.default.PropTypes.bool, // usecase?
	componentStyle: _react2.default.PropTypes.object,
	containerStyle: _react2.default.PropTypes.object,
	autoCenter: _react2.default.PropTypes.bool,
	showSearchAsMove: _react2.default.PropTypes.bool,
	setSearchAsMove: _react2.default.PropTypes.bool,
	defaultMapStyle: _react2.default.PropTypes.oneOf(['Standard', 'Blue Essence', 'Blue Water', 'Flat Map', 'Light Monochrome', 'Midnight Commander', 'Unsaturated Browns']),
	title: _react2.default.PropTypes.string,
	streamAutoCenter: _react2.default.PropTypes.bool,
	defaultMarkerImage: _react2.default.PropTypes.string,
	streamMarkerImage: _react2.default.PropTypes.string,
	stream: _react2.default.PropTypes.bool,
	defaultZoom: validation.defaultZoom,
	showPopoverOn: _react2.default.PropTypes.oneOf(['click', 'mouseover']),
	defaultCenter: _react2.default.PropTypes.shape({
		lat: validation.validCenter,
		lng: validation.validCenter
	})
};

ReactiveMap.defaultProps = {
	setMarkerCluster: true,
	autoCenter: true,
	showSearchAsMove: true,
	setSearchAsMove: false,
	showMapStyles: true,
	defaultMapStyle: 'Standard',
	from: 0,
	size: 100,
	streamTTL: 5,
	streamAutoCenter: false,
	autoMarkerPosition: false,
	showMarkers: true,
	autoMapRender: true,
	defaultMarkerImage: 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/historic-pin.png',
	streamMarkerImage: 'https://cdn.rawgit.com/appbaseio/reactivemaps/6500c73a/dist/images/stream-pin.png',
	componentStyle: {},
	containerStyle: {
		height: '700px'
	},
	stream: false,
	defaultZoom: 13,
	defaultCenter: {
		"lat": 37.74,
		"lng": -122.45
	}
};

ReactiveMap.contextTypes = {
	appbaseRef: _react2.default.PropTypes.any.isRequired,
	type: _react2.default.PropTypes.any.isRequired
};