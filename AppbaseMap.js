import { default as React, Component } from 'react'
import { render } from 'react-dom'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/addons/InfoBox'
var Appbase = require('appbase-js');
var helper = require('./helper.js')

export class AppbaseMap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            selectedMarker: null,
            streamingStatus: 'Intializing..'
        }
        this.appbaseRef = helper.getAppbaseRef(this.props.config);
    }

    startStreaming(requestObject) {
        var self = this;
        self.setState({
            streamingStatus: 'Listening...'
        });
        this.appbaseRef.searchStream(requestObject).on('data', function (stream) {
            console.log(stream)
            let positionMarker = {
                position: { lat: stream._source[self.props.fieldName].lat, lng: stream._source[self.props.fieldName].lon }
            }
            let newMarkersArray = self.state.markers;
            if (stream._deleted == true) {
                var deleteIndex = newMarkersArray.indexOf(positionMarker);
                newMarkersArray.splice(deleteIndex, 1);
                self.props.onDelete(positionMarker);
            }
            else {
                newMarkersArray.push(positionMarker)
                self.props.onIndex(positionMarker);
            }
            self.setState({
                markers: newMarkersArray,
                streamingStatus: 'Listening...'
            });
        }).on('error', function (error) {
            console.log(error)
        });
    }

    getNewMarkers(boundingBoxCoordinates) {
        var requestObject = helper.getRequestObject(this.props.config, this.props.fieldName, boundingBoxCoordinates);
        var self = this;

        if (this.props.historicalData == true) {
            this.appbaseRef.search(requestObject).on('data', function (data) {
                let newMarkersArray=[];
                data.hits.hits.map(function (hit, index) {
                    let positionMarker = {
                        position: { lat: hit._source[self.props.fieldName].lat, lng: hit._source[self.props.fieldName].lon }
                    }
                    newMarkersArray.push(positionMarker)
                })
                self.setState({
                    markers: newMarkersArray
                }, function () {
                    self.startStreaming(requestObject);
                });
            }).on('error', function (error) {
                console.log(error)
            });
        }
        else {
            this.startStreaming(requestObject)
        }
    }

    handleBoundsChanged() {
        this.setState({
            streamingStatus: 'Fetching...'
        });
        var mapBounds = this.refs.map.getBounds();
        var north = mapBounds.getNorthEast().lat();
        var south = mapBounds.getSouthWest().lat();
        var east = mapBounds.getNorthEast().lng();
        var west = mapBounds.getSouthWest().lng();
        var boundingBoxCoordinates = {
            "top_left": [west, north],
            "bottom_right": [east, south]
        }
        this.getNewMarkers(boundingBoxCoordinates);
    }

    render() {
        var divStatusStyle = {
            position: 'absolute',
            top: '15px',
            right: '15px',
        };
        return (
            <section style={{ height: "100%" }}>
                <GoogleMapLoader
                    containerElement={
                        <div {...this.props} style={{ height: "100%" }} />
                    }
                    googleMapElement={
                        <GoogleMap ref = "map"
                            {...this.props}
                            onIdle = {:: this.handleBoundsChanged}>
                            {this.state.markers.map((marker, index) => {
                                return (
                                    <Marker {...marker} key={index} />
                                )
                            })}
                        </GoogleMap>
                    }
                />
                <div style={divStatusStyle} ref="status" > {this.state.streamingStatus} </div>
            </section >
        )
    }

}

AppbaseMap.defaultProps = {
    historicalData: true,
};