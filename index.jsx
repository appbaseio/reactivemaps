
import { default as React, Component } from 'react'
import { render } from 'react-dom'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/addons/InfoBox'
var Appbase = require('appbase-js');
var config = require('./config.json')
var appbaseRef = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: config.appbase.appname,
    username: config.appbase.username,
    password: config.appbase.password
})
var requestObject = {
      type: config.appbase.type,
      body: {
        "query": {
          "match_all": {}
        }
      }
    });
  }

class Map extends Component {

    state = {
        markers: [
            { position: { lat: 61.5, lng: 23.766667 }}
        ],
        selectedMarker: null
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        appbaseRef.search(requestObject).on('data', function(stream) {


        }).on('error', function(error) {
            console.log(error)
        });
    }

    handleMarkerClick(index, event) {
        console.log('hi')
        var temp = [
            { position: { lat: 61.52, lng: 23.76 }}
        ]
        this.setState({
            markers: temp
        })
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
                defaultZoom={16}
                defaultCenter={{lat: 61.5, lng: 23.766667}}
              >
                {this.state.markers.map((marker, index) => {
                    return (
                        <Marker {...marker} onClick={this.handleMarkerClick.bind(this, index)} key={index} />
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