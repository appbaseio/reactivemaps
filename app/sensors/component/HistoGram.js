import { default as React, Component } from 'react';
import { render } from 'react-dom';
import ReactTooltip from 'react-tooltip'

export class HistoGramComponent extends Component {
	constructor(props) {
		super(props);
		this.style = {
			barContainer: {
				position: 'relative',
				height: '50px',
				width: '100%'
			}
		}
	}
	createBars() {
		var max = _.max(this.props.data);
		let dataLength = this.props.data.length;
		let bars = null;
		let data = this.props.data.map((val) => {
			let res = {
				height: 0,
				count: 0,
				width: 100/dataLength
			};
			try {
				res.height = (100*val)/max;
				res.count = val;
				res.width = 100/dataLength;
			} catch (e) {
				console.log(e);
			}
			return res;
		});
		if(dataLength) {
			bars = data.map((val, index) => {
				return (<Bar key={index} element={val} />)
			});
		}
		return bars;
	}
	render() {
		let bars = this.createBars();
		return (
			<div className="barContainer col s12 col-xs-12" style={this.style.barContainer}>
				{bars}
			 </div>
		);
	}
}

export class Bar extends Component {
	constructor(props) {
		super(props);
		this.style = {
			bar: {
				display: 'block',
				width: '100%',
				height: '100%'
			}
		};
	}
	render() {
		let element = this.props.element;
		let barStyle = {
			height: element.height+'%',
			width: element.width+'%',
			display: 'inline-block',
			background: '#efefef',
			position: 'relative'
		};
		return (
			<span className="barChild" style={barStyle} >
				<span className="bar" style={this.style.bar}
					data-tip={element.count}
					title={element.count} />
				<ReactTooltip />
			</span>
		);
	}
}
