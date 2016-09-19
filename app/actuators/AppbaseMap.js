import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, InfoWindow } from "react-google-maps";
import InfoBox from 'react-google-maps/lib/addons/InfoBox';
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import {queryObject, emitter} from '../middleware/ImmutableQuery.js';
import {manager} from '../middleware/ChannelManager.js';
import {AppbaseSearch} from '../sensors/AppbaseSearch';
import {SearchAsMove} from '../sensors/SearchAsMove';
import {MapStyles} from '../sensors/MapStyles';

var helper = require('../middleware/helper.js');
var Style = require('../helper/Style.js');

export class AppbaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      selectedMarker: null,
      streamingStatus: 'Intializing..',
      center: this.props.defaultCenter,
      query: {},
      rawData: {}
    };
    this.previousSelectedSensor = {};
    this.handleSearch = this.handleSearch.bind(this);
    this.searchAsMoveChange = this.searchAsMoveChange.bind(this);
    this.mapStyleChange = this.mapStyleChange.bind(this);
    this.reposition = true;
  }
  componentDidMount() {
    this.createChannel();
    this.setGeoQueryInfo();
    let currentMapStyle = helper.getMapStyle(this.props.mapStyle);
    this.setState({
      currentMapStyle: currentMapStyle
    });
  }
  // Create a channel which passes the depends and receive results whenever depends changes
  createChannel() {
    // Set the depends - add self aggs query as well with depends
    let depends = this.props.depends ? this.props.depends : {};
    depends['geoQuery'] = { operation: "should" };
    // create a channel and listen the changes
    var channelObj = manager.create(depends);
    channelObj.emitter.addListener(channelObj.channelId, function(data) {
      let markersData = this.setMarkersData(data);
      this.setState({
        rawData: data,
        markersData: markersData
      }, this.getNewMarkers);
    }.bind(this));
  }
  setMarkersData(data) {
    var self = this;
    if(data && data.hits && data.hits.hits) {
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
  // set the query type and input data
  setGeoQueryInfo() {
    var obj = {
        key: 'geoQuery',
        value: {
          queryType: 'geo_bounding_box',
          inputData: this.props.inputData
        }
    };
    helper.selectedSensor.setSensorInfo(obj);
  }
  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    marker.showInfo = true;
    console.log(marker);
    this.setState({
      rerender: true
    }, this.getNewMarkers);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.reposition = false;
    this.setState(this.state);
  }
  renderInfoWindow(ref, marker) {
    var popoverContent = this.props.popoverContent ? this.props.popoverContent(marker) : 'Popver';
    return (
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        <div>
          {popoverContent}
        </div>  
      </InfoWindow>
    );
    
  }
  getNewMarkers() {
  }
  startStreaming() {
    var self = this;
    let query = this.state.query;
    self.setState({
      streamingStatus: 'Listening...'
    });
    // Stop the previous instance of the streaming
    if (this.streamingInstance) {
      this.streamingInstance.stop()
    };
    this.streamingInstance = helper.appbaseRef.searchStream(query).on('data', function (stream) {
      let positionMarker = {
        position: {
          lat: stream._source[self.props.inputData].lat,
          lng: stream._source[self.props.inputData].lon
        }
      }
      // Using a different color marker for realtime markers
      let newMarker = <Marker {...positionMarker}
        key={Date.now() }
        icon="images/map.png"
        zIndex={100} />
      let newMarkersArray = self.state.markers;
      // If the marker is deleted, remove it from the map
      if (stream._deleted == true) {
        var deleteIndex = newMarkersArray.indexOf(newMarker);
        newMarkersArray.splice(deleteIndex, 1);
        self.props.markerOnDelete(positionMarker);
      }
      else {
        newMarkersArray.push(newMarker)
        self.props.markerOnIndex(positionMarker);
      }
      self.setState({
        markers: newMarkersArray,
        streamingStatus: 'Listening...'
      });
    }).on('error', function (error) {
      console.log(error)
    });
  }
  // Handle function which is fired when map is moved and reaches to idle position
  handleOnIdle() {
    if(this.searchAsMove && !this.searchQueryProgress) {
      var mapBounds = this.refs.map.getBounds();
      var north = mapBounds.getNorthEast().lat();
      var south = mapBounds.getSouthWest().lat();
      var east = mapBounds.getNorthEast().lng();
      var west = mapBounds.getSouthWest().lng();
      var boundingBoxCoordinates = {
        "top_left": [west, north],
        "bottom_right": [east, south]
      };
      this.setValue(boundingBoxCoordinates, this.searchAsMove);
    }
  }
  // set value
  setValue(value, isExecuteQuery=false) {
    var obj = {
        key: 'geoQuery',
        value: value
    };
    helper.selectedSensor.set(obj, isExecuteQuery);
  }
  // on change of selectiong 
  searchAsMoveChange(value) {
    this.searchAsMove = value;
  }
  // mapStyle changes
  mapStyleChange(style) {
    this.setState({
      currentMapStyle: style
    });
  }
  // Handler function for bounds changed which udpates the map center
  handleBoundsChanged() {
    if(!this.searchQueryProgress) {
      // this.setState({
      //   center: this.refs.map.getCenter()
      // });
    } else {
      setTimeout(()=> {
        this.searchQueryProgress = false;
      }, 1000*1);
    }
  }
  // Handler function which is fired when an input is selected from autocomplete google places 
  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    // this.setState({
    //   center: places[0].geometry.location
    // });
  }
  // Handler function which is fired when an input is selected from Appbase geo search field
  handleSearch(location) {
    // this.setState({
    //   center: new google.maps.LatLng(location.value.lat, location.value.lon)
    // });
  }
  identifyGeoData(input) {
    let type = Object.prototype.toString.call(input);
    let convertedGeo = null;
    if(type === '[object Object]' && input.hasOwnProperty('lat') && input.hasOwnProperty('lon')) {
      convertedGeo = {
        lat: input.lat,
        lng: input.lon
      };
    }
    else if(type === '[object Array]' && input.length === 2) {
      convertedGeo = {
        lat: input[0],
        lng: input[1]
      };
      console.log(input[0], input[1]);
    }
    return convertedGeo;
  }
  generateMarkers() {
    var self = this;
    let markersData = this.state.markersData;
    let response = {
      markerComponent: [],
      defaultCenter: null,
      convertedGeo: []
    };
    if(markersData) {
      response.markerComponent = markersData.map((hit, index) => {
        let field = self.identifyGeoData(hit._source[self.props.inputData]);
        if(field) {
          response.convertedGeo.push(field);
          let position = {
            position: field
          };
          let ref = `marker_ref_${index}`;
          let popoverEvent;
          if(this.props.showPopoverOn) {
            popoverEvent = {};
            popoverEvent[this.props.showPopoverOn] = this.handleMarkerClick.bind(this, hit);
          } else {
            popoverEvent = {};
            popoverEvent['onClick'] = this.handleMarkerClick.bind(this, hit);
          }
          return (
            <Marker {...position} 
              key={index} 
              zIndex={1}
              ref={ref}
              onClick={() => self.props.markerOnClick(hit._source)}
              onDblclick={() => self.props.markerOnDblclick(hit._source)} 
              onMouseover={() => self.props.markerOnMouseover(hit._source)}
              onMouseout={() => self.props.markerOnMouseout(hit._source)} 
              {...popoverEvent}>
              {hit.showInfo ? self.renderInfoWindow(ref, hit) : null}
            </Marker>
          )
        }
      });
      var median = parseInt(response.convertedGeo.length/2, 10);
      var selectedMarker = response.convertedGeo[median];
      response.defaultCenter = {
        lat: selectedMarker.lat,
        lng: selectedMarker.lng
      };
      
    }
    return response;
  }
  render() {
    var self = this;
    var markerComponent, searchComponent, searchAsMoveComponent, MapStylesComponent;
    let appbaseSearch, titleExists, title = null;
    var searchComponentProps = {};
    var otherOptions;
    var generatedMarkers = this.generateMarkers();
    if (this.props.markerCluster) {
      markerComponent = <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
        {generatedMarkers.markerComponent}
      </MarkerClusterer>;
    }
    else {
      markerComponent = generatedMarkers.markerComponent;
    }
    // Auto center using markers data
    if(!this.searchAsMove && this.props.autoCenter && this.reposition) {
      searchComponentProps.center =  generatedMarkers.defaultCenter ? generatedMarkers.defaultCenter : this.state.center;
    } else {
      delete searchComponentProps.center;
      this.reposition = true;
    }
    // include searchasMove component 
    if(this.props.searchAsMoveComponent) {
      searchAsMoveComponent = <SearchAsMove searchAsMoveChange={this.searchAsMoveChange} />;
    }
    // include mapStyle choose component 
    if(this.props.MapStylesComponent) {
      MapStylesComponent = <MapStyles defaultSelected={this.props.mapStyle} mapStyleChange={this.mapStyleChange} />;
    }
    // include title if exists
    if(this.props.title) {
      titleExists = true;
      title = (<h2 className="componentTitle col s12">{this.props.title}</h2>);
    }
  return(
    <div className="map-container reactiveComponent appbaseMapComponent">
      {title}
      <GoogleMapLoader
        containerElement={
          <div {...this.props} className="containerElement" />
        }
        googleMapElement={<GoogleMap ref = "map"
          options = {{
            styles: this.state.currentMapStyle
          }}
          {...searchComponentProps}
          {...this.props}
          onIdle = {:: this.handleOnIdle}>
          {searchComponent}
          {markerComponent}

      </GoogleMap>}/>
      <div style= { Style.divStatusStyle } ref= "status" > { this.state.streamingStatus } </div >
      <div style={Style.divAppbaseStyle} >
        Powered by <img width='200px' height='auto' src="http://slashon.appbase.io/img/Appbase.png" /> 
      </div>                
      {searchAsMoveComponent}
      {MapStylesComponent}
    </div >
    )
  }
}
AppbaseMap.propTypes = {
  inputData: React.PropTypes.string.isRequired,
  searchField: React.PropTypes.string,
  searchComponent: React.PropTypes.string,
  markerOnDelete: React.PropTypes.func,
  markerOnIndex: React.PropTypes.func,
  markerCluster: React.PropTypes.bool,
  historicalData: React.PropTypes.bool
};
AppbaseMap.defaultProps = {
  historicalData: true,
  markerCluster: true,
  searchComponent: "google",
  autoCenter: false,
  searchAsMoveComponent: false,
  MapStylesComponent: false,
  mapStyle: 'MapBox',
  title: null,
  markerOnClick: function() {},
  markerOnDblclick: function() {},
  markerOnMouseover: function() {},
  markerOnMouseout: function() {}
};