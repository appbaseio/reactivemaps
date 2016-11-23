import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap,
        AppbaseMap,
        AppbaseSearch,
        AppbaseSlider,
        AppbaseList} from '../../app/app.js';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row m-0 h-100">
                <ReactiveMap config={this.props.config} />
                <div className="col s12 h-100">
                    <AppbaseMap
                        inputData={this.props.mapping.location}
                        defaultZoom={5}
                        defaultCenter={{ lat: 40.673940, lng: -101.314026 }}
                        historicalData={true}
                        markerCluster={false}
                        searchComponent="appbase"
                        searchField={this.props.mapping.venue}
                        mapStyle={this.props.mapStyle}
                        autoCenter={false}
                        size={100}
                        searchAsMoveComponent={true}
                        searchAsMoveDefault={true}
                        MapStylesComponent={true}
                        title="Meetupblast"
                        />
                </div>
            </div>
        );
    }
}

Main.defaultProps = {
    mapStyle: "Light Monochrome",
    mapping: {
        city: 'name',
        location: 'coord'
    },
    config: {
        "appbase": {
            "appname": "weather",
            "username": "dmgyKySw5",
            "password": "162202d3-43f7-4e01-95f2-f9f3e1b02bb5",
            "type": "city"
        }
    }
};

ReactDOM.render(<Main />, document.getElementById('map'));
