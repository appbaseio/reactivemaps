function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { ReactiveBase, ReactiveMap, PlacesSearch } from "../app";

var PlacesSearchDefault = function (_Component) {
	_inherits(PlacesSearchDefault, _Component);

	function PlacesSearchDefault(props) {
		_classCallCheck(this, PlacesSearchDefault);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.originQuery = _this.originQuery.bind(_this);
		_this.destinationQuery = _this.destinationQuery.bind(_this);
		_this.executeQuery = _this.executeQuery.bind(_this);
		_this.onIdle = _this.onIdle.bind(_this);
		_this.origin = null;
		_this.destination = null;
		_this.mapRef = null;
		_this.directionsDisplay = new google.maps.DirectionsRenderer();
		_this.directionsService = new google.maps.DirectionsService();
		return _this;
	}

	PlacesSearchDefault.prototype.onIdle = function onIdle(res) {
		this.mapRef = res.props.map;
	};

	PlacesSearchDefault.prototype.originQuery = function originQuery(value) {
		this.origin = value;
		this.executeQuery();
	};

	PlacesSearchDefault.prototype.destinationQuery = function destinationQuery(value) {
		this.destination = value;
		this.executeQuery();
	};

	PlacesSearchDefault.prototype.executeQuery = function executeQuery() {
		var _this2 = this;

		if (this.mapRef && this.origin && this.destination) {
			this.directionsDisplay.setMap(this.mapRef);
			this.directionsService.route({
				origin: this.origin.location,
				destination: this.destination.location,
				travelMode: google.maps.TravelMode.DRIVING
			}, function (response, status) {
				if (status === "OK") {
					_this2.directionsDisplay.setDirections(response);
				} else {
					window.alert("Directions request failed due to " + status);
				}
			});
		}
	};

	PlacesSearchDefault.prototype.render = function render() {
		return React.createElement(
			"div",
			{ className: "row m-0 h-100" },
			React.createElement(
				ReactiveBase,
				{
					app: "reactivemap_demo",
					credentials: "y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18",
					type: "meetupdata1"
				},
				React.createElement(
					"div",
					{ className: "col s12 m6 col-xs-12 col-sm-6" },
					React.createElement(
						"div",
						{ className: "row h-100" },
						React.createElement(
							"div",
							{ className: "col s12 col-xs-12" },
							React.createElement(PlacesSearch, {
								dataField: this.props.mapping.venue,
								componentId: "OriginSensor",
								placeholder: "Search Venue",
								title: "Origin",
								onValueChange: this.originQuery
							})
						),
						React.createElement(
							"div",
							{ className: "col s12 col-xs-12" },
							React.createElement(PlacesSearch, {
								dataField: this.props.mapping.venue,
								componentId: "DestinationSensor",
								placeholder: "Search Venue",
								autoLocation: false,
								title: "Destination",
								onValueChange: this.destinationQuery
							})
						)
					)
				),
				React.createElement(
					"div",
					{ className: "col s12 m6 h-100 col-xs-12 col-sm-6" },
					React.createElement(ReactiveMap, {
						dataField: this.props.mapping.location,
						historicalData: true,
						setMarkerCluster: false,
						defaultMapStyle: "Light Monochrome",
						autoMapRender: false,
						autoCenter: false,
						showSearchAsMove: true,
						showMapStyles: true,
						title: "Reactive Maps",
						onIdle: this.onIdle,
						defaultZoom: 13,
						defaultCenter: { lat: 37.74, lon: -122.45 },
						size: 100
					})
				)
			)
		);
	};

	return PlacesSearchDefault;
}(Component);

export default PlacesSearchDefault;


PlacesSearchDefault.defaultProps = {
	mapping: {
		venue: "venue_name_ngrams",
		location: "location"
	}
};