import { default as React, Component } from 'react'
import { render } from 'react-dom'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/addons/InfoBox'
var Appbase = require('appbase-js');
var helper = require('./helper.js')

export class AppbaseMap extends Component {
    state = {
        markers: [],
        selectedMarker: null
    }

    constructor(props) {
        super(props)
    }

    callStreamingSearch(appbaseRef, requestObject) {
        var self = this;
        appbaseRef.searchStream(requestObject).on('data', function(stream) {
            console.log(stream)
            let positionMarker = {
                position: {lat: stream._source.location[1], lng: stream._source.location[0]}
            }
            let myNewState = self.state.markers;
            myNewState.push(positionMarker)
            self.setState({
                markers: myNewState 
            });
        }).on('error', function(error) {
            console.log(error)
        });
    }

    listentoUpdates(appbaseRef, requestObject) {
        if(this.props.historicalData == false){

        }
        else
            this.callStreamingSearch(appbaseRef, requestObject);
    }

    componentDidMount() {
       var self = this;
       var requestObject = helper.createRequestObject(self.props.config.appbase.type)
       var appbaseRef = helper.createAppbaseRef(self.props.config.appbase.appname, self.props.config.appbase.username, self.props.config.appbase.password);

       this.listentoUpdates(appbaseRef, requestObject);
       
    }

    render() {
      return (
        <section style={{height: "100%"}}>
        <GoogleMapLoader
        containerElement={
          <div {...this.props} style={{ height: "100%" }} />
      }
      googleMapElement={
          <GoogleMap
          ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
          {...this.props}
          >
          {this.state.markers.map((marker, index) => {
            console.log("inside the render------", this.state.markers)
            return (
                <Marker {...marker} key={index} />
                )
        })}
          </GoogleMap>
      }
      />
      </section>
      )
    }

}
