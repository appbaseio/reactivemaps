
import { default as React, Component } from 'react'
import { render } from 'react-dom'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/addons/InfoBox'


class Map extends Component {

    state = {
        markers: [
            { position: { lat: 61.5, lng: 23.766667 }},
            { position: { lat: 61.501, lng: 23.77 }}
        ],
        selectedMarker: null
    }

    constructor(props) {
        super(props)
    }

    handleMarkerClick(index, event) {
        this.setState({
            selectedMarker: index
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
                        <Marker {...marker} onClick={this.handleMarkerClick.bind(this, index)} key={index}>
                            { this.state.selectedMarker === index ? (
                                <InfoBox key={index} options={{ boxClass: 'infobox', }} >
                                        <div>
                                            <div>
                                                Hello world
                                            </div>
                                            <p>Foo</p>
                                            <ul>
                                                <li>Bar</li>
                                            </ul>
                                        </div>
                                    </InfoBox>
                                ) : null }
                        </Marker>
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