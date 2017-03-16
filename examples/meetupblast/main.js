import { default as React, Component } from 'react';
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
					app="reactivemap-demo"
					credentials="SL8fiQ1fg:71ea4254-49ba-4685-8276-e44da225c141"
					type="meetup"
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
									react={{
										and: "CitySensor"
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
							setMarkerCluster={false}
							defaultMapStyle={this.props.mapStyle}
							autoCenter={true}
							size={100}
							showSearchAsMove={true}
							showMapStyles={true}
							title="Meetupblast"
							react={{
								and: ["CitySensor", "TopicSensor"]
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
		topic: 'group.group_topics.topic_name_raw.raw',
		location: 'location',
		city: 'group.group_city.raw'
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
