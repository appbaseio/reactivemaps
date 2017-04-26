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
		this.onData = this.onData.bind(this);
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

	// return icon image path
	onData(hit) {
		return this.props.markerIcons[hit._source.category] ? this.props.markerIcons[hit._source.category] : 'dist/images/historic-pin.png';
	}

	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveBase
					app="checkinNew1"
					credentials="lyqUBfULs:baec1429-ebd4-42fe-b11e-cf94934816de"
					type="checkinNew1"
					>
					<div className="col s12 m9 h-100">
						<ReactiveMap
							appbaseField="location"
							defaultZoom={13}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							showSearchAsMove
							title="Foursquare check-ins"
							showPopoverOn = "click"
							onPopoverTrigger = {this.onPopoverTrigger}
							onData = {this.onData}
							showMapStyles
							react={{
								and: ["CitySensor", "CategorySensor"]
							}}
							/>
					</div>
					<div className="col s12 m3">
						<div className="row h-100">
							<div className="col s12">
								<SingleList
									componentId="CitySensor"
									appbaseField="city.raw"
									defaultSelected="new york"
									showCount
									size={100}
									showSearch
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
							<div className="col s12">
								<MultiList
									appbaseField="category.raw"
									componentId="CategorySensor"
									showCount={true}
									size={100}
									title="Categories"
									react={{
										and: "CitySensor"
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
