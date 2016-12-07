'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppbaseMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactGoogleMaps = require('react-google-maps');

var _InfoBox = require('react-google-maps/lib/addons/InfoBox');

var _InfoBox2 = _interopRequireDefault(_InfoBox);

var _MarkerClusterer = require('react-google-maps/lib/addons/MarkerClusterer');

var _MarkerClusterer2 = _interopRequireDefault(_MarkerClusterer);

var _ImmutableQuery = require('../middleware/ImmutableQuery.js');

var _ChannelManager = require('../middleware/ChannelManager.js');

var _AppbaseSearch = require('../sensors/AppbaseSearch');

var _SearchAsMove = require('../sensors/SearchAsMove');

var _MapStyles = require('../sensors/MapStyles');

var _RotateIcon = require('../helper/RotateIcon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helper = require('../middleware/helper.js');
var Style = require('../helper/Style.js');

var AppbaseMap = exports.AppbaseMap = function (_Component) {
	_inherits(AppbaseMap, _Component);

	function AppbaseMap(props, context) {
		_classCallCheck(this, AppbaseMap);

		var _this = _possibleConstructorReturn(this, (AppbaseMap.__proto__ || Object.getPrototypeOf(AppbaseMap)).call(this, props));

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
			externalData: {}
		};
		_this.previousSelectedSensor = {};
		_this.handleSearch = _this.handleSearch.bind(_this);
		_this.searchAsMoveChange = _this.searchAsMoveChange.bind(_this);
		_this.mapStyleChange = _this.mapStyleChange.bind(_this);
		_this.queryStartTime = 0;
		_this.reposition = false;
		return _this;
	}

	_createClass(AppbaseMap, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.createChannel();
			this.setGeoQueryInfo();
			var currentMapStyle = helper.getMapStyle(this.props.mapStyle);
			this.setState({
				currentMapStyle: currentMapStyle
			});
		}
		// Create a channel which passes the depends and receive results whenever depends changes

	}, {
		key: 'createChannel',
		value: function createChannel() {
			// Set the depends - add self aggs query as well with depends
			var depends = this.props.depends ? this.props.depends : {};
			depends['geoQuery'] = { operation: "must" };
			// create a channel and listen the changes
			var channelObj = _ChannelManager.manager.create(this.context.appbaseConfig, depends, this.props.requestSize);
			channelObj.emitter.addListener(channelObj.channelId, function (res) {
				var data = res.data;
				// implementation to prevent initialize query issue if old query response is late then the newer query 
				// then we will consider the response of new query and prevent to apply changes for old query response.
				// if queryStartTime of channel response is greater than the previous one only then apply changes
				if (res.method === 'historic' && res.startTime > this.queryStartTime) {
					this.afterChannelResponse(res);
				} else if (res.method === 'stream') {
					this.afterChannelResponse(res);
				}
			}.bind(this));
		}
	}, {
		key: 'afterChannelResponse',
		value: function afterChannelResponse(res) {
			var data = res.data;
			var rawData = void 0,
			    markersData = void 0;
			this.streamFlag = false;
			if (res.method === 'stream') {
				this.channelMethod = 'stream';
				var modData = this.streamDataModify(this.state.rawData, res);
				rawData = modData.rawData;
				res = modData.res;
				this.streamFlag = true;
				markersData = this.setMarkersData(rawData);
			} else if (res.method === 'historic') {
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
				var generatedData = this.props.markerOnIndex(res);
				this.setState({
					externalData: generatedData
				});
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
						var preCord = prevData[0]._source[this.props.inputData];
						var newCord = res.data._source[this.props.inputData];
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
					hit._source.mapPoint = self.identifyGeoData(hit._source[self.props.inputData]);
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
			var _this2 = this;

			var modifiedData = data.map(function (record) {
				record.distance = _this2.findDistance(data, record);
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
					inputData: this.props.inputData
				}
			};
			helper.selectedSensor.setSensorInfo(obj);
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
			var popoverContent = this.props.popoverContent ? this.props.popoverContent(marker) : 'Popver';
			return _react2.default.createElement(
				_reactGoogleMaps.InfoWindow,
				{
					zIndex: 500,
					key: ref + '_info_window',
					onCloseclick: this.handleMarkerClose.bind(this, marker) },
				_react2.default.createElement(
					'div',
					null,
					popoverContent
				)
			);
		}
		// Handle function which is fired when map is moved and reaches to idle position

	}, {
		key: 'handleOnIdle',
		value: function handleOnIdle() {
			var mapBounds = this.refs.map.getBounds();
			var north = mapBounds.getNorthEast().lat();
			var south = mapBounds.getSouthWest().lat();
			var east = mapBounds.getNorthEast().lng();
			var west = mapBounds.getSouthWest().lng();
			var boundingBoxCoordinates = {
				"top_left": [west, north],
				"bottom_right": [east, south]
			};
			var generatedData = this.props.onIdle(this.refs.map, {
				boundingBoxCoordinates: boundingBoxCoordinates,
				mapBounds: mapBounds
			});
			this.setState({
				externalData: generatedData
			});
			if (this.searchAsMove && !this.searchQueryProgress) {
				this.setValue(boundingBoxCoordinates, this.searchAsMove);
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
			helper.selectedSensor.set(obj, isExecuteQuery);
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
			var _this3 = this;

			if (!this.searchQueryProgress) {
				// this.setState({
				//   center: this.refs.map.getCenter()
				// });
			} else {
				setTimeout(function () {
					_this3.searchQueryProgress = false;
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
			var _this4 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				this.isStreamDataExists = true;
				setTimeout(function () {
					return _this4.streamToNormal();
				}, this.props.streamActiveTime * 1000);
			} else {
				this.isStreamDataExists = false;
			}
		}
		// Check the difference between current time and attached stream time
		// if difference is equal to streamActiveTime then delete stream and starStream property of marker

	}, {
		key: 'streamToNormal',
		value: function streamToNormal() {
			var _this5 = this;

			var markersData = this.state.markersData;
			var isStreamData = markersData.filter(function (hit) {
				return hit.stream && hit.streamStart;
			});
			if (isStreamData.length) {
				markersData = markersData.map(function (hit, index) {
					if (hit.stream && hit.streamStart) {
						var currentTime = new Date();
						var timeDiff = (currentTime.getTime() - hit.streamStart.getTime()) / 1000;
						if (timeDiff >= _this5.props.streamActiveTime) {
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
			var icon = hit.external_icon ? hit.external_icon : hit.stream ? this.props.streamPin : this.props.historicPin;
			var isSvg = (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) === 'object' && icon.hasOwnProperty('path') ? true : false;
			if (isSvg) {
				icon = JSON.parse(JSON.stringify(icon));
				if (this.props.rotateOnUpdate) {
					var deg = hit.angleDeg ? hit.angleDeg : 0;
					icon.rotation = deg;
				}
			}
			return icon;
		}
		// here we accepts marker props which we received from markerOnIndex and apply those external props in Marker component

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
			var _this6 = this;

			var self = this;
			var markersData = this.state.markersData;
			var response = {
				markerComponent: [],
				defaultCenter: null,
				convertedGeo: []
			};
			if (markersData && markersData.length) {
				response.markerComponent = markersData.map(function (hit, index) {
					var field = self.identifyGeoData(hit._source[self.props.inputData]);
					// let icon = !this.props.rotateOnUpdate ? iconPath : RotateIcon.makeIcon(iconPath).setRotation({deg: deg}).getUrl();
					// let icon = self.chooseIcon(hit);
					if (field) {
						response.convertedGeo.push(field);
						var position = {
							position: field
						};
						var ref = 'marker_ref_' + index;
						var popoverEvent = void 0;
						if (_this6.props.showPopoverOn) {
							popoverEvent = {};
							popoverEvent[_this6.props.showPopoverOn] = _this6.handleMarkerClick.bind(_this6, hit);
						} else {
							popoverEvent = {};
							popoverEvent['onClick'] = _this6.handleMarkerClick.bind(_this6, hit);
						}
						var timenow = new Date();
						return _react2.default.createElement(
							_reactGoogleMaps.Marker,
							_extends({}, position, {
								key: hit._id,
								zIndex: 1,
								ref: ref
							}, self.combineProps(hit), {
								onClick: function onClick() {
									return self.props.markerOnClick(hit._source);
								},
								onDblclick: function onDblclick() {
									return self.props.markerOnDblclick(hit._source);
								},
								onMouseover: function onMouseover() {
									return self.props.markerOnMouseover(hit._source);
								},
								onMouseout: function onMouseout() {
									return self.props.markerOnMouseout(hit._source);
								}
							}, popoverEvent),
							hit.showInfo ? self.renderInfoWindow(ref, hit) : null
						);
					}
				});
				if (response.convertedGeo[0]) {
					response.defaultCenter = {
						lat: response.convertedGeo[0].lat,
						lng: response.convertedGeo[0].lng
					};
				}
			}
			if (!this.props.allowMarkers) {
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
			var _this7 = this;

			var self = this;
			var markerComponent, searchComponent, searchAsMoveComponent, MapStylesComponent;
			var appbaseSearch = void 0,
			    titleExists = void 0,
			    title = null;
			var searchComponentProps = {};
			var otherOptions;
			var generatedMarkers = this.generateMarkers();
			if (this.props.markerCluster) {
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
			if (this.channelMethod === 'stream' && !this.props.streamAutoCenter) {
				streamCenterFlag = false;
			}
			if (!this.searchAsMove && this.props.autoCenter && this.reposition && streamCenterFlag) {
				searchComponentProps.center = generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.storeCenter ? this.storeCenter : this.state.center;
				this.storeCenter = searchComponentProps.center;
				this.reposition = false;
			} else {
				if (this.storeCenter) {
					searchComponentProps.center = this.storeCenter;
				} else {
					delete searchComponentProps.center;
				}
			}
			// include searchasMove component
			if (this.props.searchAsMoveComponent) {
				searchAsMoveComponent = _react2.default.createElement(_SearchAsMove.SearchAsMove, { searchAsMoveDefault: this.props.searchAsMoveDefault, searchAsMoveChange: this.searchAsMoveChange });
			}
			// include mapStyle choose component
			if (this.props.MapStylesComponent) {
				MapStylesComponent = _react2.default.createElement(_MapStyles.MapStyles, { defaultSelected: this.props.mapStyle, mapStyleChange: this.mapStyleChange });
			}
			// include title if exists
			if (this.props.title) {
				titleExists = true;
				title = _react2.default.createElement(
					'h4',
					{ className: 'componentTitle col s12 m8 col-xs-12 col-sm-8' },
					this.props.title
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'map-container reactiveComponent appbaseMapComponent col s12 col-xs-12 card thumbnail' },
				title,
				_react2.default.createElement(
					'span',
					{ className: 'col s12 m4 col-xs-12 col-sm-4' },
					MapStylesComponent
				),
				_react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
					containerElement: _react2.default.createElement('div', { className: 'containerElement col s12 col-xs-12', style: this.props.containerStyle }),
					googleMapElement: _react2.default.createElement(
						_reactGoogleMaps.GoogleMap,
						_extends({ ref: 'map',
							options: {
								styles: this.state.currentMapStyle
							}
						}, searchComponentProps, this.props, {
							onDragstart: function onDragstart() {
								_this7.handleOnDrage();
								_this7.mapEvents('onDragstart');
							},
							onIdle: function onIdle() {
								return _this7.handleOnIdle();
							},
							onClick: function onClick() {
								return _this7.mapEvents('onClick');
							},
							onDblclick: function onDblclick() {
								return _this7.mapEvents('onDblclick');
							},
							onDrag: function onDrag() {
								return _this7.mapEvents('onDrag');
							},
							onDragend: function onDragend() {
								return _this7.mapEvents('onDragend');
							},
							onMousemove: function onMousemove() {
								return _this7.mapEvents('onMousemove');
							},
							onMouseout: function onMouseout() {
								return _this7.mapEvents('onMouseout');
							},
							onMouseover: function onMouseover() {
								return _this7.mapEvents('onMouseover');
							},
							onResize: function onResize() {
								return _this7.mapEvents('onResize');
							},
							onRightclick: function onRightclick() {
								return _this7.mapEvents('onRightclick');
							},
							onTilesloaded: function onTilesloaded() {
								return _this7.mapEvents('onTilesloaded');
							},
							onBoundsChanged: function onBoundsChanged() {
								return _this7.mapEvents('onBoundsChanged');
							},
							onCenterChanged: function onCenterChanged() {
								return _this7.mapEvents('onCenterChanged');
							},
							onProjectionChanged: function onProjectionChanged() {
								return _this7.mapEvents('onProjectionChanged');
							},
							onTiltChanged: function onTiltChanged() {
								return _this7.mapEvents('onTiltChanged');
							},
							onZoomChanged: function onZoomChanged() {
								return _this7.mapEvents('onZoomChanged');
							}
						}),
						searchComponent,
						markerComponent,
						this.externalData()
					)
				}),
				searchAsMoveComponent,
				_react2.default.createElement(
					'div',
					{ className: 'col s12 text-center center-align' },
					_react2.default.createElement('img', { width: '200px', height: 'auto', src: 'http://opensource.appbase.io/reactive-maps/dist/images/logo.png' })
				)
			);
		}
	}]);

	return AppbaseMap;
}(_react.Component);

AppbaseMap.propTypes = {
	inputData: _react2.default.PropTypes.string.isRequired,
	searchField: _react2.default.PropTypes.string,
	searchComponent: _react2.default.PropTypes.string,
	onIdle: _react2.default.PropTypes.func,
	markerOnDelete: _react2.default.PropTypes.func,
	markerOnIndex: _react2.default.PropTypes.func,
	markerCluster: _react2.default.PropTypes.bool,
	historicalData: _react2.default.PropTypes.bool,
	rotateOnUpdate: _react2.default.PropTypes.bool,
	allowMarkers: _react2.default.PropTypes.bool,
	streamActiveTime: _react2.default.PropTypes.number,
	requestSize: _react2.default.PropTypes.number
};
AppbaseMap.defaultProps = {
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
	historicPin: 'http://opensource.appbase.io/reactive-maps/dist/images/historic-pin.png',
	streamPin: 'http://opensource.appbase.io/reactive-maps/dist/images/stream-pin.png',
	markerOnClick: function markerOnClick() {},
	markerOnDblclick: function markerOnDblclick() {},
	markerOnMouseover: function markerOnMouseover() {},
	markerOnMouseout: function markerOnMouseout() {},
	markerOnIndex: function markerOnIndex() {},
	onIdle: function onIdle() {},
	containerStyle: {
		height: '700px'
	}
};
AppbaseMap.contextTypes = {
	appbaseConfig: _react2.default.PropTypes.any.isRequired
};