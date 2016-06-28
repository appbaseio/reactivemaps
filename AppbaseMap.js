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
            selectedMarker: null
        }
    }

    callStaticUpdates(appbaseRef, requestObject) {
        var self = this;
        appbaseRef.search(requestObject).on('data', function (data) {
            let myNewState=[];
            data.hits.hits.map(function (hit, index) {
                let positionMarker = {
                    position: { lat: hit._source[self.props.fieldName].lat, lng: hit._source[self.props.fieldName].lon }
                }
                myNewState.push(positionMarker)
            })
            self.setState({
                markers: myNewState
            }, function () {
                self.callRealtimeUpdates(appbaseRef, requestObject);
            });
        }).on('error', function (error) {
            console.log("in error")
            console.log(error)
        });
    }

    callRealtimeUpdates(appbaseRef, requestObject) {
        var self = this;
        appbaseRef.searchStream(requestObject).on('data', function (stream) {
            console.log(stream)
            let positionMarker = {
                position: { lat: stream._source[self.props.fieldName].lat, lng: stream._source[self.props.fieldName].lon }
            }
            let myNewState = self.state.markers;
            if (stream._deleted == true) {
                var deleteIndex = myNewState.indexOf(positionMarker);
                myNewState.splice(deleteIndex, 1);
                self.props.onDelete(positionMarker);
            }
            else {
                myNewState.push(positionMarker)
                self.props.onIndex(positionMarker);
            }
            self.setState({
                markers: myNewState
            });
        }).on('error', function (error) {
            console.log(error)
        });
    }

    listentoUpdates(appbaseRef, requestObject) {
        if (this.props.historicalData == true) {
            this.callStaticUpdates(appbaseRef, requestObject);
        }
        else {
            this.callRealtimeUpdates(appbaseRef, requestObject)
        }
    }

    handleBoundsChanged() {
        var mapBounds = this.refs.map.getBounds();
        var north = mapBounds.getNorthEast().lat();
        var south = mapBounds.getSouthWest().lat();
        var east = mapBounds.getNorthEast().lng();
        var west = mapBounds.getSouthWest().lng();
        var boundingBoxCoordinates = {
            "top_left": [west, north],
            "bottom_right": [east, south]
        }
        var appbaseRef = helper.getAppbaseRef(this.props.config.appbase.appname, this.props.config.appbase.username, this.props.config.appbase.password);
        var requestObject = helper.getRequestObject(this.props.config.appbase.type, boundingBoxCoordinates);
        this.listentoUpdates(appbaseRef, requestObject);
    }

    render() {
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
            </section >
        )
    }

}
