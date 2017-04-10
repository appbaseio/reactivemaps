import { default as React } from 'react';
var ReactDOM = require('react-dom');
import {
	ReactiveBase,
	SingleList,
	MultiList,
	ReactiveMap
} from '../../app/app.js';

const Main = () => {
	return (
		<div className="row m-0 h-100">
			<ReactiveBase
				app="reactivemap-demo"
				credentials="qMzzgez0t:a9138c3f-f246-4cd8-ba3d-0b99f9550c05"
				type="meetupdata1"
				>
				<div className="col s6">
					<div className="row h-100">
						<div className="col s6">
							<SingleList
								componentId="CitySensor"
								appbaseField="group.group_city.raw"
								defaultSelected="London"
								showCount={true}
								size={100}
								showSearch={true}
								title="Cities"
								searchPlaceholder="Search City"
							/>
						</div>
						<div className="col s6">
							<MultiList
								appbaseField="group.group_topics.topic_name_raw"
								componentId="TopicSensor"
								showCount={true}
								size={100}
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
						appbaseField="location"
						autoCenter
						showSearchAsMove
						showMapStyles
						title="Meetupblast"
						size={100}
						defaultMapStyle="Light Monochrome"
						setMarkerCluster={false}
						react={{
							and: ["CitySensor", "TopicSensor"]
						}}
					/>
				</div>
			</ReactiveBase>
		</div>
	);
}

ReactDOM.render(<Main />, document.getElementById('map'));
