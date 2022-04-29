import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { Navbar, Logo, Button, H1, Title, Grid } from '@appbaseio/designkit';

import { Base, Layout, SecondaryLink, Section, titleText, showMobileFlex } from '../styles';
import ImageCard from '../styles/ImageCard';
import Footer from '../components/Footer';

export default class Demos extends Component {
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
							<li>
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
							<H1>Built with Reactive Maps</H1>
							<p className={titleText}>
								Check out our demo apps powered by Reactivemaps
							</p>
							<Grid
								size={4}
								mdSize={2}
								smSize={1}
								gutter="15px"
								smGutter="0px"
								style={{ margin: '50px 0' }}
							>
								<ImageCard src="demos/airbeds.png">
									<div>
										<Title>Airbeds</Title>
										<p>
											An airbnb inspired app for browsing housing areas in
											Seattle
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://opensource.appbase.io/reactivesearch/demos/airbeds/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/datalayer.png">
									<div>
										<Title>Datalayers</Title>
										<p>
											Demo combining the dark forces of datalayer and
											Reactivemaps
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://opensource.appbase.io/reactivesearch/demos/datalayer/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/meetup.png">
									<div>
										<Title>Meetup Blast</Title>
										<p>
											A kickass meetup inspired search app built with
											Reactivemaps
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://opensource.appbase.io/reactivesearch/demos/meetup/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/bus.png">
									<div>
										<Title>Board the bus</Title>
										<p>
											Catch realtime bus transportation demo in action with
											Reactivemaps
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://opensource.appbase.io/reactivesearch/demos/transport/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/weather.png">
									<div>
										<Title>Weather Slam</Title>
										<p>
											Showing weather data with search as move capabilites
											powered by Reactivemaps
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://opensource.appbase.io/reactivesearch/demos/weather/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/airbeds-2.png">
									<div>
										<Title>Airbeds Seattle</Title>
										<p>
											An airbnb inspired app for browsing housing areas in
											Seattle
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://hopeful-wilson-e64d4d.netlify.com/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/earthquake.png">
									<div>
										<Title>Earthquake Reporter</Title>
										<p>Earthquake reporter built with Reactivemaps for web</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://silly-euler-31f3ec.netlify.com/"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="demos/earthquake-mobile.png">
									<div>
										<Title>Earthquake Mobile</Title>
										<p>
											Earthquake reporter built with Reactivemaps and React
											Native.
										</p>
									</div>
									<div>
										<SecondaryLink
											primary
											href="https://snack.expo.io/@metagrover/earthquake-reporter"
										>
											Check Demo
										</SecondaryLink>
									</div>
								</ImageCard>
							</Grid>
						</Layout>
					</Section>

					<Footer />
				</Base>
			</ThemeProvider>
		);
	}
}
