import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from "react-google-maps";
import InfoBox from 'react-google-maps/lib/addons/InfoBox';
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import {queryObject, emitter} from '../middleware/ImmutableQuery.js';
import {manager} from '../middleware/ChannelManager.js';
import {AppbaseSearch} from '../sensors/AppbaseSearch';
import {SearchAsMove} from '../sensors/SearchAsMove';
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
  }
  componentDidMount() {
    this.createChannel();
    this.setGeoQueryInfo();
  }
  // Create a channel which passes the depends and receive results whenever depends changes
  createChannel() {
    // Set the depends - add self aggs query as well with depends
    let depends = this.props.depends ? this.props.depends : {};
    depends['geoQuery'] = { operation: "should" };
    // create a channel and listen the changes
    var channelObj = manager.create(depends);
    channelObj.emitter.addListener(channelObj.channelId, function(data) {
      this.setState({
        rawData: data
      }, this.getNewMarkers);
    }.bind(this));
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
  getNewMarkers() {
    var self = this;
    this.searchQueryProgress = true;
    var data = this.state.rawData;
    self.searchQueryProgress = true;
    let newMarkersArray = [];
    var totalPosition = {lat: 0, lng: 0};
    var markersData = data.hits.hits.filter((hit, index) => {
      return hit._source.hasOwnProperty(self.props.inputData) && !(hit._source[self.props.inputData].lat === 0 && hit._source[self.props.inputData].lon === 0);
    });
    markersData = _.orderBy(markersData, [self.props.inputData.lat], ['desc']);
    newMarkersArray = markersData.map((hit, index) => {
      let field = hit._source[self.props.inputData];
      let position = {
        position: {
          lat: field.lat,
          lng: field.lon
        }
      }
      totalPosition.lat += field.lat;
      totalPosition.lng += field.lon;
      return (
        <Marker {...position} key={index} zIndex={1}
          onClick={() => self.props.markerOnClick(hit._source)} 
          onDblclick={() => self.props.markerOnDblclick(hit._source)} 
          onMouseover={() => self.props.markerOnMouseover(hit._source)}
          onMouseout={() => self.props.markerOnMouseout(hit._source)} />
      )
    });
    if(markersData.length) {
      var median = parseInt(markersData.length/2, 10);
      var selectedMarker = markersData[median];
      var defaultCenter = {
        lat: selectedMarker._source[self.props.inputData].lat,
        lng: selectedMarker._source[self.props.inputData].lon
      };
      console.log(defaultCenter.lat, defaultCenter.lng, newMarkersArray.length);
      self.setState({
        markers: newMarkersArray,
        center: defaultCenter
      }, function () {
        setTimeout(() => {
          this.searchQueryProgress = false;
        }, 500);
      });
    } else {
      self.setState({
        markers: newMarkersArray
      }, function () {
        setTimeout(() => {
          this.searchQueryProgress = false;
        }, 500);
      });
    }
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
  render() {
    var markerComponent, searchComponent, searchAsMoveComponent;
    let appbaseSearch;
    var searchComponentProps = {};
    var otherOptions;
    if (this.props.markerCluster) {
      markerComponent = <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
        {this.state.markers}
      </MarkerClusterer>;
    }
    else {
      markerComponent = this.state.markers;
    }
    if(this.props.autoCenter) {
      searchComponentProps.center = this.state.center;
      console.log(searchComponentProps.center);
    }
    if(this.props.searchAsMove) {
      searchAsMoveComponent = <SearchAsMove searchAsMoveChange={this.searchAsMoveChange} />;
    }
    if (this.props.searchComponent === "appbase") {
      appbaseSearch = <AppbaseSearch
        inputData={this.props.searchField}
        config={this.props.config}
        handleSearch={this.handleSearch}
        latField="location.lat"
        lonField="location.lon"
        placeholder="Search location.."
        isGeoSearch={true}
        extraQuery={this.props.extraQuery} />
      searchComponentProps.onBoundsChanged = ::this.handleBoundsChanged;
    } else if (this.props.searchComponent === "google") {
      searchComponent = <SearchBox
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={:: this.handlePlacesChanged}
        ref = "searchBox"
        placeholder = "Search location"
        style = { Style.inputStyle }
      />;
      searchComponentProps.onBoundsChanged = ::this.handleBoundsChanged;
  }
  return(
    <div className="map-container" style={Style.fullHeightDiv}>
      {appbaseSearch}
      <GoogleMapLoader
        containerElement={
          <div {...this.props} style={Style.fullHeightDiv} />
        }
        googleMapElement={<GoogleMap ref = "map"
          options = {{
            styles: helper.getMapStyle(this.props.mapStyle)
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
  searchAsMove: false,
  mapStyle: 'MapBox',
  markerOnClick: function() {},
  markerOnDblclick: function() {},
  markerOnMouseover: function() {},
  markerOnMouseout: function() {}
};