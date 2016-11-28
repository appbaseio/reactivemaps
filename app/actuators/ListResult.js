import {
	default as React, Component } from 'react';
import { render } from 'react-dom';
import { queryObject, emitter } from '../middleware/ImmutableQuery.js';
import { manager } from '../middleware/ChannelManager.js';

var helper = require('../middleware/helper.js');

export class ListResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			query: {},
			rawData: {
				hits: {
					hits: []
				}
			},
			resultMarkup: []
		};
		this.nextPage = this.nextPage.bind(this);
	}
	componentDidMount() {
		this.createChannel();
		this.listComponent();
	}

	// Create a channel which passes the depends and receive results whenever depends changes
	createChannel() {
		// Set the depends - add self aggs query as well with depends
		let depends = this.props.depends ? this.props.depends : {};
		// create a channel and listen the changes
		var channelObj = manager.create(depends, this.props.requestSize);
		this.channelId = channelObj.channelId;
		channelObj.emitter.addListener(channelObj.channelId, function(res) {
			let data = res.data;
			let rawData, markersData;
			this.streamFlag = false;
			if (res.method === 'stream') {
				this.channelMethod = 'stream';
				let modData = this.streamDataModify(this.state.rawData, res);
				rawData = modData.rawData;
				res = modData.res;
				this.streamFlag = true;
				markersData = this.setMarkersData(rawData);
			} else if (res.method === 'historic') {
				this.channelMethod = 'historic';
				rawData = res.appliedQuery && res.appliedQuery.body && res.appliedQuery.body.from !== 0 ? this.appendData(data) : data;
				markersData = this.setMarkersData(data);
			}
			this.setState({
				rawData: rawData,
				markersData: markersData
			}, function() {
				// Pass the historic or streaming data in index method
				res.allMarkers = rawData;
				let generatedData = this.props.markerOnIndex ? this.props.markerOnIndex(res) : this.defaultMarkerOnIndex(res);
				this.setState({
					resultMarkup: generatedData
				});
				if (this.streamFlag) {
					this.streamMarkerInterval();
				}
			}.bind(this));
		}.bind(this));
	}

	// append data if pagination is applied
	appendData(data) {
		let rawData = this.state.rawData;
		let hits = rawData.hits.hits.concat(data.hits.hits);
		rawData.hits.hits = _.uniqBy(hits, '_id');;
		return rawData;
	}

	// append stream boolean flag and also start time of stream
	streamDataModify(rawData, res) {
		if (res.data) {
			res.data.stream = true;
			res.data.streamStart = new Date();
			if (res.data._deleted) {
				let hits = rawData.hits.hits.filter((hit) => {
					return hit._id !== res.data._id;
				});
				rawData.hits.hits = hits;
			} else {
				let prevData = rawData.hits.hits.filter((hit) => {
					return hit._id === res.data._id;
				});
				let hits = rawData.hits.hits.filter((hit) => {
					return hit._id !== res.data._id;
				});
				rawData.hits.hits = hits;
				rawData.hits.hits.push(res.data);
			}
		}
		return {
			rawData: rawData,
			res: res,
			streamFlag: true
		};
	}

	// tranform the raw data to marker data
	setMarkersData(data) {
		var self = this;
		if (data && data.hits && data.hits.hits) {
			let markersData = data.hits.hits.filter((hit, index) => {
				return hit._source.hasOwnProperty(self.props.inputData) && !(hit._source[self.props.inputData].lat === 0 && hit._source[self.props.inputData].lon === 0);
			});
			markersData = _.orderBy(markersData, [self.props.inputData.lat], ['desc']);
			markersData = markersData.map((marker) => {
				marker.showInfo = false;
				return marker;
			})
			return markersData;
		} else {
			return [];
		}
	}

	// default markup
	defaultMarkerOnIndex(res) {
		let result;
		if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
			result = res.allMarkers.hits.hits.map((marker, index) => {
				return (<div key={index} className="makerInfo">{JSON.stringify(marker)}</div>);
			});
		}
		return result;
	}
	nextPage() {
		let channelOptionsObj = manager.channels[this.channelId].previousSelectedSensor['channel-options-' + this.channelId];
		let obj = {
			key: 'channel-options-' + this.channelId,
			value: {
				size: this.props.requestSize,
				from: channelOptionsObj.from + this.props.requestSize
			}
		};
		manager.nextPage(this.channelId);
		// helper.selectedSensor.set(obj, true);
	}
	listComponent() {
		let node = this.refs.ListContainer;
		if (node) {
			node.addEventListener('scroll', () => {
				if ($(node).scrollTop() + $(node).innerHeight() >= node.scrollHeight) {
					this.nextPage();
				}
			});
		}
	}
	render() {
		return (
			<div ref="ListContainer" className="map-container reactiveComponent appbaseMapComponent listResult">
				{this.state.resultMarkup}
			</div >
		)
	}
}
ListResult.propTypes = {
	inputData: React.PropTypes.string.isRequired,
	markerOnIndex: React.PropTypes.func,
	streamActiveTime: React.PropTypes.number,
	requestSize: React.PropTypes.number,
	requestOnScroll: React.PropTypes.bool
};
ListResult.defaultProps = {
	requestSize: 20,
	streamActiveTime: 5,
	requestOnScroll: true
};
