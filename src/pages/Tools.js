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
							<Logo light href="/">
								<Logo.Icon>
									<img src="/icon.svg" alt="Icon" />
								</Logo.Icon>
								<Logo.Light>Reactive</Logo.Light>
								<Logo.Dark>Maps</Logo.Dark>
							</Logo>
						</Navbar.Logo>
						<Navbar.List>
							<li className="active">
								<Link to="/tools">TOOLS</Link>
							</li>
							<li>
								<Link to="/learn">LEARN</Link>
							</li>
							<li className="button">
								<Button href="https://appbase.io/support" bold uppercase dark>
									<img
										src="/support.svg"
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
								Everything to build amazing apps lorem ipsum orem ipsum dolor sit
								amet.
							</p>

							<GithubButton
								count="1,673"
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
									<img src="/tools/Search.svg" alt="Reactivesearch for web" />
									<p className={brand}>
										Reactive <span className={boldFont}>Search</span> for web
									</p>
								</div>
								<div>
									<img
										src="/tools/ReactiveNative.svg"
										alt="Reactivesearch for mobile"
									/>
									<p className={brand}>
										Reactive <span className={boldFont}>Search</span> for mobile
									</p>
								</div>
								<div>
									<img src="/tools/ReactiveMaps.svg" alt="Reactivemaps" />
									<p className={brand}>
										Reactive <span className={boldFont}>Maps</span>
									</p>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
						<Layout>
							<Grid size={2} mdSize={1} gutter="30px" className={tabCenter}>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2>
										Reactive <span className={boldFont}>Search</span>
									</H2>
									<p>
										A React UI components library for building Airbnb / Yelp
										like search interfaces.
									</p>

									<ul className={featureList}>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink
											href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/web"
											primary
										>
											Learn More
										</SecondaryLink>
									</div>
								</div>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										src="/tools/Devices.png"
										srcSet="/tools/Devices@2x.png 2x"
										alt="Reactivesearch"
									/>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#F0F0F5' }}>
						<Layout>
							<Grid size={2} mdSize={1} gutter="30px" className={tabCenter}>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										width="100%"
										src="/tools/Native.png"
										srcSet="/tools/Native@2x.png 2x"
										alt="Reactivesearch Native"
									/>
								</div>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2>
										Reactive <span className={boldFont}>Search Native</span>
									</H2>
									<p>
										A React UI components library for building Airbnb / Yelp
										like search interfaces.
									</p>

									<ul className={featureList}>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://hackernoon.com/building-an-e-commerce-search-app-with-react-native-2c87760a2315"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink
											href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/native"
											primary
										>
											Learn More
										</SecondaryLink>
									</div>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#193244' }}>
						<Layout>
							<Grid size={2} mdSize={1} gutter="30px" className={tabCenter}>
								<div className={vcenter} style={{ margin: 0, padding: '0 20px' }}>
									<H2 light>
										Reactive <span className={boldFont}>Maps</span>
									</H2>
									<p style={{ color: '#fff' }}>
										A React UI components library for building Airbnb / Yelp
										like search interfaces.
									</p>

									<ul className={featureList}>
										<li style={{ color: '#fff' }}>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li style={{ color: '#fff' }}>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
										<li style={{ color: '#fff' }}>
											Lorem ipsum dolor, sit amet consectetur adipisicing
											elit. Dolorem ut sequi facere tempore mollitia. Illum!
										</li>
									</ul>

									<div className="button-row">
										<Button
											href="https://opensource.appbase.io/reactive-manual/getting-started/reactivemaps.html"
											bold
											uppercase
											big
											success
										>
											Get Started
										</Button>
										<SecondaryLink href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/maps">
											Learn More
										</SecondaryLink>
									</div>
								</div>
								<div style={{ margin: 0 }} className={hideTab}>
									<img
										width="100%"
										src="/tools/ReactiveMaps.png"
										alt="Reactivemaps"
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
								src="/tools/ToolsIllustration.png"
								srcSet="/tools/ToolsIllustration@2x.png 2x"
								alt="appbase.io"
							/>
							<H2 light>Work with us to build your app</H2>
							<div className={hcenter}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Maecenas venenatis vel nisi ac tincidunt. In vel egestas enim.
									In bibendum dui eget tristique maximus.
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
											src="/support.svg"
											style={{ marginRight: 8 }}
											alt="support"
										/>{' '}
										SUPPORT
									</Button>
									<SecondaryLink href="/learn">Learn</SecondaryLink>
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
