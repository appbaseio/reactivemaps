import { default as React, Component } from "react";
import { render } from "react-dom";

export class Img extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  src: this.props.src
		};
		this.stopImg = false;
	}

	componentDidMount() {
		const self = this;
		this.img = new Image();
		const defaultSrc = "https://s-media-cache-ak0.pinimg.com/216x146/27/b2/da/27b2da4789262e3b828a8ec6587dd8aa.jpg";
		this.img.onerror = function () {
			self.setState({
				src: defaultSrc
			}, () => {

			});
		};
		this.img.src = this.state.src;
	}

	componentWillUnmount() {
		this.stopImg = true;
	}

	render() {
		return <img className="responsive-img img-responsive" src={this.state.src} />;
	}
}
