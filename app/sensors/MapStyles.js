import { default as React, Component } from "react";
import { render } from "react-dom";
const helper = require("../middleware/helper.js");

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
			helper.mapStyles.forEach((style, index) => {
				if (style.key === this.props.defaultSelected) {
					selectedValue = index;
				}
			});
		}
		this.setState({
			items: helper.mapStyles,
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
		const style = helper.mapStyles[this.state.selectedValue].value;
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
