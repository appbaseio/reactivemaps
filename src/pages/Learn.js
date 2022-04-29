import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { Navbar, Logo, Button, H1, H2, Title, Grid } from '@appbaseio/designkit';

import {
	Base,
	Layout,
	SecondaryLink,
	Section,
	titleText,
	stepCard,
	showMobileFlex,
} from '../styles';
import SupportGrid from '../components/SupportGrid';
import BannerRow from '../components/BannerRow';
import Footer from '../components/Footer';

class Learn extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<ThemeProvider
				theme={{
					primaryColor: '#0033FF',
				}}
			>
				<Base>
					<Navbar bold>
						<Navbar.Logo>
							<Logo href="/reactivemaps">
								<Logo.Icon>
									<img src="icon.svg" alt="Icon" />
								</Logo.Icon>
								<Logo.Light>Reactive</Logo.Light>
								<Logo.Dark>Maps</Logo.Dark>
							</Logo>
						</Navbar.Logo>
						<Navbar.List>
							<li className="active">
								<Link to="/learn">LEARN</Link>
							</li>
							<li>
								<Link to="/tools">TOOLS</Link>
							</li>
							<li className={showMobileFlex}>
								<a href="https://github.com/appbaseio/reactivesearch">GITHUB</a>
							</li>
							<li className="button">
								<Button href="https://appbase.io/pricing/#premium-support" bold uppercase primary>
									<img
										src="support-white.svg"
										style={{ marginRight: 8 }}
										alt="support"
									/>{' '}
									SUPPORT
								</Button>
							</li>
						</Navbar.List>
					</Navbar>

					<Section>
						<Layout>
							<H1>Get Started with Reactive Maps</H1>
							<p className={titleText}>
								Use our step-by-step guide to learn all about Reactive Maps, or
								check out our{' '}
								<a
									rel="noopener noreferrer"
									href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
									target="_blank"
								>
									docs
								</a>.
							</p>

							<Grid
								size={3}
								mdSize={2}
								smSize={1}
								gutter="12px"
								smGutter="0px"
								style={{ marginTop: 60 }}
							>
								<div className={stepCard}>
									<span className="count">1</span>
									<div>
										<Title>Install Reactive X</Title>
										<p>
											ReactiveSearch is a set of Elasticsearch components for
											building data-driven UIs.
										</p>
										<p>
											ReactiveMaps is an extension of ReactiveSearch that
											provides map focused UI components.
										</p>
									</div>
									<div className="full">
										<pre>
											<code>npm install @appbaseio/reactivesearch</code>
										</pre>
										<pre>
											<code>npm install @appbaseio/reactivemaps</code>
										</pre>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">2</span>
									<div>
										<Title>Add Google Maps JS</Title>
										<p>
											ReactiveMaps use Google Maps to render the map
											component. You can add the following script in the
											&lt;head&gt; element of your main .html file.
										</p>
										<p>
											Get the{' '}
											<a
												rel="noopener noreferrer"
												href="https://developers.google.com/maps/documentation/javascript/get-api-key"
												target="_blank"
											>
												API Key
											</a>{' '}
											and info on how to add the Maps script.
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											rel="noopener noreferrer"
											href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
											target="_blank"
										>
											Step-by-step installation guide
										</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">3</span>
									<div>
										<Title>Connect to your ES index</Title>
										<p>
											ReactiveMaps components can connect to an Elasticsearch
											index (hosted anywhere) for performing geospatial
											queries.
										</p>
										<p>
											Get a free trial and create a cluster with{' '}
											<a
												rel="noopener noreferrer"
												href="https://appbase.io"
												target="_blank"
											>
												appbase.io
											</a>, or{' '}
											<a
												rel="noopener noreferrer"
												href="https://docs.appbase.io/docs/hosting/byoc/"
												target="_blank"
											>
												learn more
											</a>{' '}
											on how to connect with your Elasticsearch.
										</p>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">4</span>
									<div>
										<Title>Create or import dataset</Title>
										<p>
											Use Dejavu, an open-source databrowser from appbase.io
											to create, view, edit and import dataset into your
											Elasticsearch index.
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											rel="noopener noreferrer"
											href="https://dejavu.appbase.io"
											target="_blank"
										>
											Dejavu
										</SecondaryLink>
										<SecondaryLink
											primary
											rel="noopener noreferrer"
											href="https://docs.appbase.io/docs/reactivesearch/v3/overview/importing/#importing-custom-data"
											target="_blank"
											style={{ marginLeft: '1rem' }}
										>
											Import data
										</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">5</span>
									<div>
										<Title>UI Components</Title>
										<p>
											Add UI components for{' '}
											<a
												rel="noopener noreferrer"
												href="https://docs.appbase.io/docs/reactivesearch/v3/map/geodistanceslider/"
												target="_blank"
											>
												Maps
											</a>,{' '}
											<a
												rel="noopener noreferrer"
												href="https://docs.appbase.io/docs/reactivesearch/v3/list/singlelist/"
												target="_blank"
											>
												List
											</a>,{' '}
											<a
												rel="noopener noreferrer"
												href="https://docs.appbase.io/docs/reactivesearch/v3/range/singlerange/"
												target="_blank"
											>
												Range
											</a>,{' '}
											<a
												rel="noopener noreferrer"
												href="https://docs.appbase.io/docs/reactivesearch/v3/search/searchbox/"
												target="_blank"
											>
												Search
											</a>,{' '}
											<a
												rel="noopener noreferrer"
												href="https://opensource.appbase.io/reactive-manual/result-components/resultlist.html"
												target="_blank"
											>
												Results
											</a>.
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											rel="noopener noreferrer"
											href="https://docs.appbase.io/docs/reactivesearch/v3/map/geodistanceslider/"
											target="_blank"
										>
											Component Docs
										</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">6</span>
									<div>
										<Title>Maps for Flutter</Title>
										<p>
											ReactiveMaps is also available for Flutter.
										</p>
									</div>
									<div>
										<SecondaryLink primary rel="noopener noreferrer" href="https://docs.appbase.io/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/">
											Quickstart with Flutter
										</SecondaryLink>
									</div>
								</div>
							</Grid>
						</Layout>
					</Section>

					<BannerRow />

					<Section>
						<Layout>
							<H2>Need Help?</H2>
							<p>Resources to get help with Reactive Maps.</p>

							<SupportGrid />
						</Layout>
					</Section>

					<Footer />
				</Base>
			</ThemeProvider>
		);
	}
}

export default Learn;
