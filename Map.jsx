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

    callStaticUpdates(appbaseRef, requestObject) {
        var self = this;
        appbaseRef.search(requestObject).on('data', function(data) {
            console.log(JSON.stringify(data))
            data.hits.hits.map(function(hit, index){
                console.log(hit._source.location);
                let positionMarker = {
                    position: {lat: hit._source.venue.lat, lng: hit._source.venue.lon}
                }
                let myNewState = self.state.markers;
                myNewState.push(positionMarker)
                self.setState({
                    markers: myNewState 
                }, function() {
                    self.callRealtimeUpdates(appbaseRef, requestObject);
                });
            })
        }).on('error', function(error) {
            console.log("in error")
            console.log(error)
        });
    }

    callRealtimeUpdates(appbaseRef, requestObject) {
        var self = this;        
        appbaseRef.searchStream(requestObject).on('data', function(stream) {            
            console.log(stream)
            let positionMarker = {
                position: {lat: stream._source.venue.lat, lng: stream._source.venue.lon}
            }
            let myNewState = self.state.markers;
            if(stream._deleted == true){
                var deleteIndex = myNewState.indexOf(positionMarker);
                myNewState.splice(deleteIndex, 1);
                self.props.onDelete;
            }
            else{
                myNewState.push(positionMarker)
                self.props.onIndex;
            }
            self.setState({
                markers: myNewState 
            });
        }).on('error', function(error) {
            console.log(error)
        });
    }

    listentoUpdates(appbaseRef, requestObject) {
        if(this.props.historicalData == true){
            this.callStaticUpdates(appbaseRef, requestObject);
        }
        else{
            this.callRealtimeUpdates(appbaseRef, requestObject)
        }
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
