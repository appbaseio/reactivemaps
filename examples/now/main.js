import { default as React, Component } from 'react';
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
				<img className="responsive-img" src={marker._source.photourl} alt={marker._source.shout}/>
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.username}</strong>
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
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
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
								size={1000} 
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
			</div>
		);
	}
}

Main.defaultProps = {
 	mapStyle: "Blue Water",
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
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));