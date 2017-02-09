import { default as React, Component } from 'react';
import {Img} from '../HelperComponent/Img.js';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	SingleList,
	MultiList,
	ReactiveMap
} from '../../app/app.js';


class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
		this.categoryQuery = this.categoryQuery.bind(this);
		this.onData = this.onData.bind(this);
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

	onPopoverTrigger(marker) {
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
						<a href={'https://'+marker._source.url} target="_blank">
							{marker._source.venue}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	onData(res) {
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
				<ReactiveBase
					app={this.props.config.appbase.app}
					username={this.props.config.appbase.username}
					password={this.props.config.appbase.password}
					type={this.props.config.appbase.type}
					>
					<div className="col s12 m9 h-100">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							showSearchAsMove={true}
							title="Foursquare checkins"
							showPopoverOn = "click"
							onPopoverTrigger = {this.onPopoverTrigger}
							onData = {this.onData}
							showMapStyles={true}
							actuate={{
								CitySensor: {"operation": "must", customQuery: this.cityQuery},
								CategorySensor: {"operation": "must", customQuery: this.categoryQuery}
							}}
							/>
					</div>
					<div className="col s12 m3">
						<div className="row h-100">
							<div className="col s12">
								<SingleList
									componentId="CitySensor"
									appbaseField={this.props.mapping.city}
									showCount={true}
									size={100}
									multipleSelect={false}
									includeGeo={false}
									showSearch={true}
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
							<div className="col s12">
								<MultiList
									appbaseField={this.props.mapping.topic}
									componentId="CategorySensor"
									showCount={true}
									size={100}
									multipleSelect={true}
									includeGeo={true}
									title="Categories"
									actuate={{
										CitySensor: {"operation": "must", customQuery: this.cityQuery}
									}}
								/>
							</div>
						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'city',
		topic: 'category.raw',
		location: 'location'
	},
	config: {
		"appbase": {
			"app": "checkinNew",
			"username": "FUNb872sF",
			"password": "03616fcc-e4a1-4598-9401-3ad2d7f7f5ce",
			"type": "checkinData"
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
