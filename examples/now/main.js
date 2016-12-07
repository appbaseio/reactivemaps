import { default as React, Component } from 'react';
import {Img} from '../../app/sensors/component/Img.js';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
		this.categoryQuery = this.categoryQuery.bind(this);
		this.markerOnIndex = this.markerOnIndex.bind(this);
	}
	cityQuery(value) {
		if(value) {
			let field = 'city';
			let match = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { match: match };
		} else return null;
	}
	categoryQuery(value) {
		let query = {
			bool: {
				should: []
			}
		};
		if(value && value.length) {
			let field = 'category';
			let queryBunch = value.map((val) => { return createMatchQuery(field, val); });
			query = {
				bool: {
					should: queryBunch,
					minimum_should_match: 1
				}
			};
			return query;
		} else {
			return query;
		}

		function createMatchQuery(field, val) {
			let match = JSON.parse(`{"${field}":` + JSON.stringify(val) + '}');
			return { match: match };
		}
	}
	popoverContent(marker) {
		console.log(marker);
		return (<div className="popoverComponent row">
			<span className="imgContainer col s2">
				<Img src={marker._source.photourl} />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.username}</strong>
					<span className="category">{marker._source.category}</span>
				</div>
				<div className="description">
					<p>is going to&nbsp;
						<a href={marker._source.url} target="_blank">
							{marker._source.venue}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}
	markerOnIndex(res) {
		let markers = {};
		res.allMarkers.hits.hits.forEach((hit, index) => {
			markers[hit._id] = {};
			let icon = this.props.markerIcons[hit._source.category] ? this.props.markerIcons[hit._source.category] : 'dist/images/historic-pin.png';
			markers[hit._id].icon = icon;
		});
		return {
			markers: markers
		};
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config}>
					<div className="col s12 m9 h-100">
						<AppbaseMap
							inputData={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							title="Foursquare checkins"
							showPopoverOn = "onClick"
							popoverContent = {this.popoverContent}
							markerOnIndex = {this.markerOnIndex}
							MapStylesComponent={true}
							depends={{
								CitySensor: {"operation": "must", defaultQuery: this.cityQuery},
								CategorySensor: {"operation": "must", defaultQuery: this.categoryQuery}
							}}
							/>
					</div>
					<div className="col s12 m3">
						<div className="row h-100">
							<div className="col s12">
								<AppbaseList
									sensorId="CitySensor"
									inputData={this.props.mapping.city}
									defaultSelected="london"
									showCount={true}
									size={100}
									multipleSelect={false}
									includeGeo={false}
									staticSearch={true}
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
							<div className="col s12">
								<AppbaseList
									inputData={this.props.mapping.topic}
									sensorId="CategorySensor"
									showCount={true}
									size={100}
									multipleSelect={true}
									includeGeo={true}
									title="Categories"
									depends={{
										CitySensor: {"operation": "must", defaultQuery: this.cityQuery}
									}}
								/>
							</div>
						</div>
					</div>
				</ReactiveMap>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'city',
		topic: 'category.raw',
		venue: 'venue_name_ngrams',
		location: 'location'
	},
	config: {
		"appbase": {
			"appname": "checkin",
			"username": "6PdfXag4h",
			"password": "b614d8fa-03d8-4005-b6f1-f2ff31cd0f91",
			"type": "city"
		}
	},
	markerIcons: {
		'Train Station': 'dist/images/railway_station-32.png',
		'Pub': 'dist/images/bar-32.png',
		'Hotel': 'dist/images/hotel-32.png',
		'Coffee Shop': 'dist/images/cafe-32.png',
		'Theater': 'dist/images/theater-32.png',
		'Office': 'dist/images/theater-32.png',
		'Neighborhood': 'dist/images/theater-32.png',
		'Park': 'dist/images/Bicycle_parking-32.png',
		'Metro': 'dist/images/Metro_station-32.png',
		'Art Gallery': 'dist/images/museum-32.png',
		'Cafe': 'dist/images/cafe-32.png',
		'Bar': 'dist/images/cafe-32.png',
		'Café': 'dist/images/cafe-32.png',
		'Sandwiches': 'dist/images/cafe-32.png',
		'Bookstore': 'dist/images/library-32.png',
		'Music Venue': 'dist/images/music-32.png',
		'Cheese Shop': 'dist/images/grocery-32.png',
		'TV Station': 'dist/images/cinema-32.png',
		'Fried Chicken': 'dist/images/cafe-32.png',
		'Burgers': 'dist/images/cafe-32.png',
		'Concert Hall': 'dist/images/cinema-32.png',
		'Advertising Agency': 'dist/images/theater-32.png',
		'Grocery Store':  'dist/images/grocery-32.png',
		'High School':   'dist/images/school-32.png',
		'School':   'dist/images/school-32.png',
		'Church': 'dist/images/church-32.png',
		'Pie Shop':  'dist/images/grocery-32.png',
		'Dance Studio': 'dist/images/music-32.png',
		'Sports Bar': 'dist/images/sport-32.png',
		'Diner': 'dist/images/cafe-32.png',
		'Dinner': 'dist/images/cafe-32.png',
		'Lunch': 'dist/images/cafe-32.png',
		'Department Store': 'dist/images/grocery-32.png',
		'Market': 'dist/images/grocery-32.png'
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
