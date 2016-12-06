import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {queryObject} from './ImmutableQuery.js';
import {manager} from './ChannelManager.js';
var helper = require('./helper.js');

export class ReactiveMap extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.appbaseRef = helper.setConfigObject(this.props.config);
		queryObject.setConfig(this.props.config.appbase);
		manager.setConfig(this.props.config.appbase);
	}
	setAppbaseRef(child) {
		// if(Object.prototype.toString.call(child) === '[object Array]') {
		// 	return React.Children.map(child, internal => {
		// 		return this.setAppbaseRef(internal.props.children);
		// 	})
		// } else if(child && child.type && child.type.name && child.type.name.indexOf('Appbase') > -1){
		// 	return React.cloneElement(child, {
		// 		appbaseRef: this.appbaseRef
		// 	})
		// } else {
		// 	return child;
		// }
		if(Object.prototype.toString.call(child) === '[object Array]') {
			return React.Children.map(child, internal => {
				if(internal.props.children) {
					return this.setAppbaseRef(internal.props.children);
				} else {
					let obj = (internal && internal.type && internal.type.name && internal.type.name.indexOf('Appbase') > -1) ? { appbaseRef: this.appbaseRef} : {};
					return React.cloneElement(internal, obj);
				}
			});
		} else {
			let obj = (child && child.type && child.type.name && child.type.name.indexOf('Appbase') > -1) ? { appbaseRef: this.appbaseRef} : {};
			return React.cloneElement(child, obj);
		}
	}
	renderChildren() {
		// return this.setAppbaseRef(this.props.children);
		return React.Children.map(this.props.children, child => {
			return React.cloneElement(child)
		});
	}
	render() {
		return (
			<section className="col s12 col-xs-12" style={{'padding': 0}}>
				{this.renderChildren()}
			</section>
		);
	}
}

ReactiveMap.defaultProps = {
	config: React.PropTypes.any.isRequired,
};