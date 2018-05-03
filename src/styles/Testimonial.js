import React, { Component } from 'react';
import styled from 'react-emotion';

const Wrapper = styled('div')`
	display: grid;
	grid-template-rows: repeat(6, 60px);
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 30px;
	margin-top: ${props => (props.small ? 0 : '50px')};
`;

const Card = styled('div')`
	background-color: ${props => props.color || '#fefffe'};
	border-radius: 2px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
	padding: 25px;
	position: relative;
	grid-row: ${props => (props.row ? `span ${props.row}` : 'span 3')};

	h3 {
		color: ${props => (props.color ? '#fff' : '#424242')};
	}

	p {
		width: 100%;
		color: ${props => (props.color ? '#fff' : '#74767E')};
		font-size: 14px;
		line-height: 22px;
		padding-top: ${props => (props.small ? 0 : '60px')};
	}
`;

const Author = styled('div')`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: ${props => (props.small ? 'static' : 'absolute')};
	width: ${props => (props.small ? '100%' : 'calc(100% - 50px)')};
	top: 25px;

	img {
		border-radius: 50%;
		height: 50px;
		width: 50px;
	}

	& > div {
		width: ${props => (props.small ? '100%' : 'calc(100% - 70px)')};
		text-align: left;

		h3 {
			margin: 4px 0 2px;
			font-size: 16px;
		}

		p {
			margin: 0;
			padding: 0;
		}
	}
`;

export default class Testimonial extends Component {
	static Card = ({ children, ...props }) => (
		<Card {...props}>
			{React.Children.map(children, child =>
				React.cloneElement(child, { small: props.small ? 1 : 0 }))}
		</Card>
	);
	static Author = ({ children, ...props }) => <Author {...props}>{children}</Author>;

	render() {
		return <Wrapper>{this.props.children}</Wrapper>;
	}
}
