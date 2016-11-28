import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {Img} from '../../app/sensors/component/Img.js';
import {ReactiveMap,
        AppbaseMap,
        AppbaseSearch,
        AppbaseSlider,
        AppbaseList,
        ListResult} from '../../app/app.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.topicDepends = this.topicDepends.bind(this);
        this.popoverContent = this.popoverContent.bind(this);
        this.markerOnIndex = this.markerOnIndex.bind(this);
        this.DEFAULT_IMAGE = 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg';
    }
    topicDepends(value) {
        if(this.props.mapping.city && value) {
            let match = JSON.parse(`{"${this.props.mapping.city}":` + JSON.stringify(value) + '}');
            return { Match: match };
        } else return null;
    }
    popoverContent(marker) {
        console.log(marker);
        return (<div className="popoverComponent row">
            <span className="imgContainer col s2">
                <Img src={marker._source.member.photo}  />
            </span>
            <div className="infoContainer col s10">
                <div className="nameContainer">
                    <strong>{marker._source.member.member_name}</strong>
                </div>
                <div className="description">
                    <p>is going to&nbsp;
                        <a href={marker._source.event.event_url} target="_blank">
                            {marker._source.event.event_name}
                        </a>
                    </p>
                </div>
            </div>
        </div>);
    }
    markerOnIndex(res) {
        let result;
        if(res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
          result = res.allMarkers.hits.hits.map((markerData, index) => {
            let marker = markerData._source;
            return (
                <a className="full_row single-record single_record_for_clone"
                    href={marker.event ? marker.event.event_url : ''}
                    target="_blank"
                    key={markerData._id}>
                    <div className="img-container">
                        <Img key={markerData._id} src={marker.member ? marker.member.photo : this.DEFAULT_IMAGE} />
                    </div>
                    <div className="text-container full_row">
                        <div className="text-head text-overflow full_row">
                            <span className="text-head-info text-overflow">
                                {marker.member ? marker.member.member_name : ''} is going to {marker.event ? marker.event.event_name : ''}
                            </span>
                            <span className="text-head-city">{marker.group ? marker.group.group_city : ''}</span>
                        </div>
                    </div>
                </a>
            );
          });
        }
        return result;
    }
    render() {
        return (
            <div className="row m-0 h-100">
                <ReactiveMap config={this.props.config} />
                <div className="col s12 m6">
                    <div className="row h-100">
                        <div className="col s12 m6">
                            <AppbaseList
                                sensorId="CitySensor"
                                inputData={this.props.mapping.city}
                                defaultSelected="London"
                                showCount={true}
                                size={1000}
                                multipleSelect={false}
                                includeGeo={false}
                                staticSearch={true}
                                title="Cities"
                                searchPlaceholder="Search City"
                            />
                        </div>
                        <div className="col s12 m6">
                            <AppbaseList
                                inputData={this.props.mapping.topic}
                                sensorId="TopicSensor"
                                showCount={true}
                                size={100}
                                multipleSelect={true}
                                includeGeo={true}
                                title="Topics"
                                depends={{
                                    CitySensor: {
                                        "operation": "must",
                                        "defaultQuery": this.topicDepends
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppbaseSlider
                                sensorId="RangeSensor"
                                inputData={this.props.mapping.guests}
                                depends={{
                                    CitySensor: {
                                        "operation": "must",
                                        "defaultQuery": this.topicDepends
                                    }
                                }}
                                title="guests"
                                maxThreshold={5} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppbaseSearch
                                inputData={this.props.mapping.venue}
                                sensorId="VenueSensor"
                                searchRef="CityVenue"
                                placeholder="Search Venue"
                                depends={{
                                    'CitySensor': {
                                        "operation": "must",
                                        "doNotExecute": {true}
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 h-100">
                    <ListResult
                        inputData={this.props.mapping.location}
                        title="Reactive Maps"
                        markerOnIndex={this.markerOnIndex}
                        depends={{
                            CitySensor: {"operation": "must"},
                            TopicSensor: {"operation": "must"},
                            RangeSensor: {"operation": "must"},
                            VenueSensor: {"operation": "must"}
                        }}
                        />
                </div>
            </div>
        );
    }
}

Main.defaultProps = {
    mapStyle: "Light Monochrome",
    mapping: {
        city: 'group.group_city.raw',
        topic: 'group.group_topics.topic_name_raw.raw',
        venue: 'venue_name_ngrams',
        guests: 'guests',
        location: 'location'
    },
    config: {
        "appbase": {
            "appname": "meetup_demo",
            "username": "LPpISlEBe",
            "password": "2a8935f5-0f63-4084-bc3e-2b2b4d1a8e02",
            "type": "meetupdata1"
        }
    }
};

ReactDOM.render(<Main />, document.getElementById('map'));
