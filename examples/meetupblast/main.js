import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	SingleList,
	MultiList
} from '@appbaseio/reactivebase';

import { ReactiveMap } from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
		this.topicQuery = this.topicQuery.bind(this);
	}

	cityQuery(value) {
		if(value) {
			let field = 'group.group_city.group_city_simple';
			let match = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { match: match };
		} else return null;
	}

	topicQuery(value) {
		if(value) {
			let field = 'group.group_topics.topic_name.topic_name_simple';
			let query = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { terms: query };
		} else return null;
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
					<div className="col s6">
						<div className="row h-100">
							<div className="col s6">
								<SingleList
									componentId="CitySensor"
									appbaseField={this.props.mapping.city}
									defaultSelected="London"
									showCount={true}
									size={100}
									includeGeo={false}
									showSearch={true}
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
							<div className="col s6">
								<MultiList
									appbaseField={this.props.mapping.topic}
									componentId="TopicSensor"
									showCount={true}
									size={100}
									includeGeo={true}
									title="Topics"
									actuate={{
										CitySensor: {
											"operation": "must",
											"defaultQuery": this.cityQuery
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="col s6 h-100">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							size={100}
							showSearchAsMove={true}
							showMapStyles={true}
							title="Meetupblast"
							actuate={{
								CitySensor: {"operation": "must", defaultQuery: this.cityQuery},
								TopicSensor: {"operation": "must", defaultQuery: this.topicQuery}
							}}
							/>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'group.group_city.group_city_simple',
		topic: 'group.group_topics.topic_name.topic_name_simple',
		venue: 'venue_name_ngrams',
		location: 'venue'
	},
	config: {
		"appbase": {
			"app": "meetup2",
			"username": "qz4ZD8xq1",
			"password": "a0edfc7f-5611-46f6-8fe1-d4db234631f3",
			"type": "meetup"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
