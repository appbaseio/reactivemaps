import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { Navbar, Logo, Button, H1, H2, GithubButton, Grid } from '@appbaseio/designkit';

import {
	Base,
	Layout,
	SecondaryLink,
	brand,
	Section,
	vcenter,
	hcenter,
	hideMobile,
	hideTab,
	tabCenter,
	titleText,
	featureList,
	boldFont,
	showMobileFlex,
} from '../styles';
import Footer from '../components/Footer';

class Tools extends Component {
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
					<Navbar bold dark>
						<Navbar.Logo>
							<Logo light href="/reactivemaps">
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
							<li className="active">
								<Link to="/tools">TOOLS</Link>
							</li>
							<li className={showMobileFlex}>
								<a href="https://github.com/appbaseio/reactivesearch">GITHUB</a>
							</li>
							<li className="button">
								<Button href="https://appbase.io/support" bold uppercase dark>
									<img
										src="support.svg"
										style={{ marginRight: 8 }}
										alt="support"
									/>{' '}
									SUPPORT
								</Button>
							</li>
						</Navbar.List>
					</Navbar>

					<Section style={{ backgroundColor: '#00101B' }}>
						<Layout>
							<H1 light>
								Reactive <span className={boldFont}>X</span>
							</H1>
							<p style={{ color: '#C1C2C3', marginBottom: 40 }} className={titleText}>
								All of our companion Reactive UI component kits.
							</p>

							<GithubButton
								count="1,711"
								href="https://github.com/appbaseio/reactivesearch"
							/>

							<Grid
								size={3}
								smSize={1}
								gutter="30px"
								smGutter="30px"
								style={{ marginTop: 72 }}
								className={hideMobile}
							>
								<div>
									<img src="tools/Search.svg" alt="Reactivesearch for web" />
									<p className={brand}>
										Reactive <span className={boldFont}>Search</span> for web
									</p>
								</div>
								<div>
									<img src="tools/ReactiveMaps.svg" alt="Reactivemaps" />
									<p className={brand}>
										Reactive <span className={boldFont}>Maps</span> for web
									</p>
								</div>
								<div>
									<img
										src="tools/ReactiveNative.svg"
										alt="Reactivesearch for mobile"
									/>
									<p className={brand}>
										Reactive <span className={boldFont}>X</span> for mobile
									</p>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
						<Layout>
							<Grid
								size={2}
								mdSize={1}
								gutter="30px"
								smGutter="0px"
								className={tabCenter}
							>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2>
										<img
											src="tools/Search.svg"
											alt="Reactivesearch for web"
											style={{
												height: '44px',
												marginRight: '15px',
												top: '2px',
												position: 'relative',
											}}
										/>
										Reactive <span className={boldFont}>Search</span>
									</H2>
									<p>
										An Elasticsearch components library for building search UIs.
									</p>

									<ul className={featureList}>
										<li>
											20+ pre-built React UI components with configurable
											styles and queries.
										</li>
										<li>Bring your own UI components.</li>
										<li>
											Used in production for B2B, e-commerce, and SaaS search.
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html"
											target="_blank"
											rel="noopener noreferrer"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink
											href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/web"
											target="_blank"
											rel="noopener noreferrer"
											primary
										>
											Learn More
										</SecondaryLink>
									</div>
								</div>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										src="tools/Devices.png"
										srcSet="/tools/Devices@2x.png 2x"
										alt="Reactivesearch"
									/>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#193244' }}>
						<Layout>
							<Grid
								size={2}
								mdSize={1}
								gutter="30px"
								smGutter="0px"
								className={tabCenter}
							>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										width="100%"
										src="tools/ReactiveMaps.png"
										alt="Reactivemaps"
									/>
								</div>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2 light>
										<img
											src="tools/ReactiveMaps.svg"
											alt="Reactivesearch for web"
											style={{
												height: '44px',
												marginRight: '15px',
												top: '2px',
												position: 'relative',
											}}
										/>
										Reactive <span className={boldFont}>Maps</span>
									</H2>
									<p style={{ color: '#fff' }}>
										An Elasticsearch components library for building geolocation
										apps.
									</p>

									<ul className={featureList}>
										<li style={{ color: '#fff' }}>
											Works with ReactiveSearch components, and adds
											geospatial components for Maps.
										</li>
										<li style={{ color: '#fff' }}>
											Bring your own UI components.
										</li>
										<li style={{ color: '#fff' }}>
											Built on top of Google Maps. It can be extended to build
											routes, places and location streaming apps.
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://opensource.appbase.io/reactive-manual/getting-started/reactivemaps.html"
											target="_blank"
											rel="noopener noreferrer"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink
											href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/maps"
											target="_blank"
											rel="noopener noreferrer"
										>
											Learn More
										</SecondaryLink>
									</div>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#F0F0F5' }}>
						<Layout>
							<Grid
								size={2}
								mdSize={1}
								gutter="30px"
								smGutter="0px"
								className={tabCenter}
							>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2>
										<img
											src="tools/ReactiveNative.svg"
											alt="Reactivesearch for web"
											style={{
												height: '44px',
												marginRight: '15px',
												top: '2px',
												position: 'relative',
											}}
										/>
										Reactive<span className={boldFont}>Search Native</span>
									</H2>
									<p>
										Elasticsearch UI components for React Native targeting
										Android and iOS apps.
									</p>

									<ul className={featureList}>
										<li>
											Over 10 pre-built UI components that maintain design
											parity with web components.
										</li>
										<li>Bring your own UI components.</li>
										<li>
											Currently in preview. Hit us at
											<a
												href="https://gitter.com/appbaseio/reactivesearch"
												rel="noopener noreferrer"
												target="_blank"
											>
												Gitter
											</a>{' '}
											or
											<a
												href="https://github.com/appbaseio/reactivesearch"
												rel="noopener noreferrer"
												target="_blank"
											>
												Github
											</a>{' '}
											for issues.
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://hackernoon.com/building-an-e-commerce-search-app-with-react-native-2c87760a2315"
											target="_blank"
											rel="noopener noreferrer"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink
											href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/native"
											target="_blank"
											rel="noopener noreferrer"
											primary
										>
											Learn More
										</SecondaryLink>
									</div>
								</div>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										width="100%"
										src="tools/Native.png"
										srcSet="/tools/Native@2x.png 2x"
										alt="Reactivesearch Native"
									/>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#000C26' }}>
						<Layout>
							<H2 light>Build better reactive apps with appbase.io</H2>
							<img
								style={{ margin: '60px auto 0', width: '80%' }}
								src="tools/ToolsIllustration.png"
								srcSet="/tools/ToolsIllustration@2x.png 2x"
								alt="appbase.io"
							/>
							<H2 light>Work with us to build your app</H2>
							<div className={hcenter}>
								<p style={{ maxWidth: 450, margin: '20px auto 40px' }}>
									We offer production support for ReactiveMaps. Work with us to
									bring your dream project to life.
								</p>
								<div className="button-row">
									<Button
										href="https://appbase.io/support"
										bold
										uppercase
										big
										dark
									>
										<img
											src="support.svg"
											style={{ marginRight: 10 }}
											alt="support"
										/>
										SUPPORT PLANS
									</Button>
									<SecondaryLink href="https://appbase.io/">
										Elasticsearch Hosting
									</SecondaryLink>
								</div>
							</div>
						</Layout>
					</Section>

					<Footer />
				</Base>
			</ThemeProvider>
		);
	}
}

export default Tools;
