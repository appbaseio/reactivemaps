import { default as React, Component } from "react";
import { render } from "react-dom";
import {
	AppbaseSensorHelper
} from "@appbaseio/reactivebase";

export const mapStylesCollection = [{
	key: "Standard",
	value: require("../helper/map-styles/Standard.js")
}, {
	key: "Blue Essence",
	value: require("../helper/map-styles/BlueEssence.js")
}, {
	key: "Blue Water",
	value: require("../helper/map-styles/BlueWater.js")
}, {
	key: "Flat Map",
	value: require("../helper/map-styles/FlatMap.js")
}, {
	key: "Light Monochrome",
	value: require("../helper/map-styles/LightMonochrome.js")
}, {
	key: "Midnight Commander",
	value: require("../helper/map-styles/MidnightCommander.js")
}, {
	key: "Unsaturated Browns",
	value: require("../helper/map-styles/UnsaturatedBrowns.js")
}];

export class MapStyles extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			items: []
		};
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		let selectedValue = 0;
		if (this.props.defaultSelected) {
			mapStylesCollection.forEach((style, index) => {
				if (style.key === this.props.defaultSelected) {
					selectedValue = index;
				}
			});
		}
		this.setState({
			items: mapStylesCollection,
			selectedValue
		}, this.themeChanged);
	}

	// Handler function when a value is selected
	handleSelect(event) {
		this.setState({
			selectedValue: event.target.value
		}, () => {
			this.themeChanged(true);
		});
	}

	themeChanged(isExecute = false) {
		const style = mapStylesCollection[this.state.selectedValue].value;
		this.props.mapStyleChange(style);
	}

	render() {
		const options = this.state.items.map((item, index) => <option value={index} key={index}>{item.key}</option>);
		return (
			<div className="input-field col rbc-mapstyles pull-right right">
				<select className="browser-default form-control" onChange={this.handleSelect} value={this.state.selectedValue} name="mapStyles" id="mapStyles">
					{options}
				</select>
			</div>
		);
	}
}

MapStyles.propTypes = {
};

// Default props value
MapStyles.defaultProps = {
	fieldName: "MapStyles"
};
