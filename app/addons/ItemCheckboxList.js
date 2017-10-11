import React, { Component } from "react";

export default class ItemCheckboxList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: []
		};

		this.handleListClick = this.handleListClick.bind(this);
		this.handleListClickAll = this.handleListClickAll.bind(this);

		if (props.defaultSelected) {
			this.state = {
				selectedItems: props.defaultSelected
			};
			this.updateAction();
			this.props.onSelect(this.state.selectedItems);
		}
	}

	// remove selected types if not in the list
	componentDidUpdate() {
		let updated = null;
		if (this.state.selectedItems) {
			updated = JSON.parse(JSON.stringify(this.state.selectedItems));
		}
		if (updated && updated.length && this.props.items && this.props.items.length) {
			updated = updated.filter((item) => {
				const updatedFound = this.props.items.filter(propItem => propItem.key === item);
				return !!updatedFound.length;
			});
			if (updated.length !== this.state.selectedItems.length) {
				const isExecutable = !updated.length;
				this.props.onRemove(this.state.selectedItems, isExecutable);
				this.setState({
					selectedItems: updated
				});
				if (updated.length) {
					this.props.onSelect(updated);
				}
			}
		}
	}

	updateAction() {
		if (!this.state.selectedItems.length) {
			this.props.onSelect(null);
		}
	}

	// handler function for select all
	handleListClickAll(value, selectedStatus) {
		this.props.selectAll(selectedStatus);
		let selectedItems = this.props.items.map(item => item.key);
		selectedItems = selectedStatus ? selectedItems : [];
		this.setState({
			selectedItems
		}, () => {
			this.updateAction.bind(this);
			this.props.onSelect(this.state.selectedItems);
		});
	}

	// Handler function when a checkbox is clicked
	handleListClick(value, selectedStatus) {
		// If the checkbox selectedStatus is true, then update selectedItems array
		if (selectedStatus) {
			this.props.onRemove(this.state.selectedItems, false);
			const updated = this.state.selectedItems;
			updated.push(value);
			this.setState({
				selectedItems: updated
			}, this.updateAction.bind(this));
			// Pass the props to parent components to add to the Query
			if (this.state.selectedItems.length) {
				this.props.onSelect(this.state.selectedItems);
			}
		}
	}

	render() {
		const items = this.props.items;
		const ListItemsArray = [];
		// Build the array for the checkboxList items
		items.forEach((item, index) => {
			try {
				item.keyRef = item.key.replace(/ /g, "_");
			} catch (e) {
				item.keyRef = index;
				console.log(item, e);
			}
			ListItemsArray.push(<ListItem
				key={item.keyRef}
				value={item.key}
				doc_count={item.doc_count}
				countField={this.props.showCount}
				handleClick={this.handleListClick}
				status={item.status || false}
				ref={`ref${item.keyRef}`}
			/>);
		});
		// include select all if set from parent
		if (this.props.includeSelectAll && items && items.length) {
			ListItemsArray.unshift(
				<ListItem
					key="selectall"
					value="Select All"
					countField={false}
					handleClick={this.handleListClickAll}
					status={this.props.defaultSelectall || false}
				/>
			);
		}

		return (
			<div className="rbc-list-container col s12 col-xs-12">
				<div className="row">
					{ListItemsArray}
				</div>
			</div>
		);
	}
}

class ListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialStatus: props.status,
			status: props.status || false
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	handleClick() {
		this.setState({
			status: !this.state.status
		});
		this.props.handleClick(this.props.value, !this.state.status);
	}

	handleCheckboxChange(event) {
		this.setState({
			status: event.target.checked
		});
	}

	render() {
		let count;
		// Check if the user has set to display countField
		if (this.props.countField) {
			count = <span> ({this.props.doc_count}) </span>;
		}
		return (
			<div onClick={this.handleClick} className="rbc-list-item rbc-checkbox-item col s12 col-xs-12">
				<input
					type="checkbox"
					checked={this.state.status}
					onChange={this.handleCheckboxChange}
				/>
				<label> {this.props.value} {count}</label>
			</div>
		);
	}
}
