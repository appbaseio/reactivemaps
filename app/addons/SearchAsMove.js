import React, { Component } from "react";
import { AppbaseSensorHelper } from "@appbaseio/reactivebase";
import ItemCheckboxList from "./ItemCheckboxList";

export default class SearchAsMove extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [{
				key: "Search as I move the map",
				value: true,
				status: props.searchAsMoveDefault
			}]
		};

		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		if (this.props.searchAsMoveDefault && this.props.searchAsMoveDefault === true) {
			this.handleSelect(this.props.searchAsMoveDefault);
		}
	}

	// Handler function when a value is selected
	handleSelect(value) {
		const flag = value === true ? true : (!!(value && value.length));
		this.props.searchAsMoveChange(flag);
	}

	render() {
		const listComponent = (<ItemCheckboxList
			showTags={false}
			items={this.state.items}
			onSelect={this.handleSelect}
			showCount={this.props.showCount}
		/>);

		return (
			<div className="rbc-checkbox row clearfix">
				{listComponent}
			</div>
		);
	}

}

SearchAsMove.propTypes = {};

// Default props value
SearchAsMove.defaultProps = {
	fieldName: "SearchAsMove",
	searchAsMoveDefault: false
};
