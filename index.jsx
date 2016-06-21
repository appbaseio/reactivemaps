import { default as React, Component } from 'react'
import { render } from 'react-dom'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/addons/InfoBox'
var Appbase = require('appbase-js');
var config = {
    appname: "surge_price",
    username: "s7I79Hzeb",
    password: "79b87fc5-9629-4842-8bc1-a5108474e178",
    type: "coordinates"
}
var appbaseRef = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: config.appname,
    username: config.username,
    password: config.password
})
var requestObject = {
  type: config.type,
  body: {
    "query": {
      "match_all": {}
    }
  }
}
  

class Map extends Component {

    state = {
        markers: [],
        selectedMarker: null
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
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
                defaultZoom={13}
                defaultCenter={{lat: 37.74, lng: -122.45}}
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

render(<Map />, document.getElementById('hello'));