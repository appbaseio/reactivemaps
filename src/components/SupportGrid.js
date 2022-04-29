import React from 'react';
import { Grid, Card, Title } from '@appbaseio/designkit';

export default () => (
	<Grid
		size={4}
		lgSize={2}
		smSize={1}
		gutter="20px"
		lgGutter="12px"
		smGutter="0px"
		style={{ marginTop: '60px' }}
	>
		<Card big href="https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/">
			<img src="support/Documentation.svg" alt="Documentation" />
			<Title>Documentation</Title>
			<p>
				Dive in to learn all about <span style={{ color: '#0033FF' }}>Reactive X</span>{' '}
				development for all platforms.
			</p>
		</Card>
		<Card
			big
			href="https://medium.appbase.io"
		>
			<img src="support/Tutorials.svg" alt="Tutorials" />
			<Title>Tutorials</Title>
			<p>Go from scratch to a full app with these tutorial guides.</p>
		</Card>
		<Card big href="https://appbase.io/pricing/#premium-support">
			<img src="support/Support.png" srcSet="support/Support@2x.png 2x" alt="Support" />
			<Title>Support</Title>
			<p>
				Get first-class support from appbase.io for your{' '}
				<span style={{ color: '#0033FF' }}>Reactive X</span> app.
			</p>
		</Card>
		<Card big href="https://github.com/appbaseio/reactivesearch/discussions">
			<img src="support/Gitter.svg" alt="Gitter" />
			<Title>Github Discussions</Title>
			<p>Ask questions on Github discussions.</p>
		</Card>
	</Grid>
);
