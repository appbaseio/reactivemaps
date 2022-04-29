import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { Navbar, Logo, Button, H1, H2, H3, GithubButton, Title, Grid } from '@appbaseio/designkit';

import {
	Base,
	Layout,
	banner,
	SecondaryLink,
	Row,
	Section,
	titleRow,
	vcenter,
	hideMobile,
	showMobile,
	showMobileFlex,
} from '../styles';
import ActionCard from '../styles/ActionCard';
import ImageCard from '../styles/ImageCard';
import SupportGrid from '../components/SupportGrid';
import BannerRow from '../components/BannerRow';
import Footer from '../components/Footer';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			githubStarCount: 3000,
		};
	}

	componentDidMount() {
		// To fetch reactive search github stars
		fetch('https://api.github.com/repos/appbaseio/reactivesearch')
			.then(res => res.json())
			.then((res) => {
				this.setState({
					githubStarCount: res.stargazers_count,
				});
			})
			.catch(e => console.log(e)); // eslint-disable-line
		window.scrollTo(0, 0);
	}

	render() {
		const { githubStarCount } = this.state;
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
							<li>
								<Link to="/tools">TOOLS</Link>
							</li>
							<li className={showMobileFlex}>
								<a href="https://github.com/appbaseio/reactivesearch">GITHUB</a>
							</li>
							<li className="button">
								<Button href="https://appbase.io/pricing/#premium-support" bold uppercase dark>
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

					<div className={banner}>
						<Layout>
							<H1 light>Build Geolocation Apps</H1>
							<p>Elasticsearch UI components for reactive Map UIs.</p>

							<div className="button-row">
								<GithubButton
									count={githubStarCount}
									href="https://github.com/appbaseio/reactivesearch"
								/>
								<Button
									href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
									bold
									uppercase
									big
									primary
								>
									Get Started
								</Button>
								<SecondaryLink href="https://github.com/appbaseio/reactivesearch/tree/dev/packages/maps">
									Learn More
								</SecondaryLink>
							</div>

							<div className="bg-image">
								<div className="pulsating-circle" />
								<div
									className="pulsating-circle"
									style={{ left: '70%', bottom: '400px' }}
								/>
							</div>
						</Layout>
					</div>

					<Row>
						<Layout>
							<div className={hideMobile}>
								<img src="components.png" width="100%" alt="Components" />
							</div>
							<div className={vcenter}>
								<H2>UI Components for every occasion</H2>
								<img
									className={showMobile}
									src="components-mobile.png"
									srcSet="components-mobile@2x.png 2x"
									width="100%"
									alt="Components"
									style={{ marginTop: 30 }}
								/>
								<p>
									Build the perfect geolocation experience with 30+ prebuilt
									components. Or bring your own UI components into the fold.
								</p>
								<div className="button-row">
									<Button
										href="https://docs.appbase.io/docs/reactivesearch/v3/map/geodistanceslider/"
										bold
										uppercase
										big
										primary
									>
										View Components
									</Button>
									<SecondaryLink
										href="https://docs.appbase.io/docs/reactivesearch/v3/advanced/reactivecomponent/"
										primary
									>
										Bring your components
									</SecondaryLink>
								</div>
								<p>
									Get{' '}
									<a href="/reactivemaps/resources/ReactiveMaps_Playground.sketch">
										our designer templates
									</a>{' '}
									for sketch.
								</p>
							</div>
						</Layout>
					</Row>

					<Section>
						<Layout>
							<H2>Up to 10x Time Savings</H2>
							<p>Focus on design and user experience, let us handle the details.</p>

							<Grid
								size={3}
								mdSize={2}
								smSize={1}
								gutter="50px"
								style={{ marginTop: '60px' }}
							>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/1.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>
										Already have your own components? Bring them to Reactive
										Maps.
									</p>
									<SecondaryLink
										primary
										href="https://docs.appbase.io/docs/reactivesearch/v3/advanced/reactivecomponent/"
									>
										Read More
									</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/2.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Configurable styles</Title>
									<p>
										Styled components with rich theming and CSS injection
										support.
									</p>
									<SecondaryLink
										href="https://docs.appbase.io/docs/reactivesearch/v3/theming/overview/"
										primary
									>
										Read More
									</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/3.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Create cross platform apps</Title>
									<p>
										Reactive Maps components are also available for Flutter.
									</p>
									<SecondaryLink
										href="https://docs.appbase.io/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/"
										primary
									>
										Read More
									</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/4.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Elasticsearch compatible</Title>
									<p>
										Connect to an Elasticsearch (v6 and above) or an OpenSearch (v1 and above) index hosted anywhere.
									</p>
									<SecondaryLink
										href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivebase/"
										primary
									>
										Read More
									</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/5.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Customizable queries</Title>
									<p>
										Components come with good query defaults, that can be
										customized with Elasticsearch query DSL.
									</p>
									<SecondaryLink
										href="https://docs.appbase.io/docs/reactivesearch/v3/advanced/customqueries/"
										primary
									>
										Read More
									</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon>
										<img src="icons/6.png" alt="Icon" />
									</ActionCard.Icon>
									<Title>Easy to secure</Title>
									<p>
										Use appbase.io to with a fine-grained access control policy. Also works with your Elasticsearch cluster hosted elsewhere.
									</p>
									<SecondaryLink
										href="https://www.appbase.io/product/access-control/"
										primary
									>
										Read More
									</SecondaryLink>
								</ActionCard>
							</Grid>
						</Layout>
					</Section>

					<BannerRow />

					<Section>
						<Layout>
							<div className={titleRow}>
								<H3>Check our demos</H3>
								<Button bold uppercase primary href="/reactivemaps/demos">
									SEE MORE
								</Button>
							</div>
							<Grid
								size={4}
								mdSize={2}
								smSize={1}
								gutter="15px"
								smGutter="0px"
								style={{ marginBottom: '50px' }}
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

							</Grid>

							<div className={titleRow}>
								<H3>Featured Articles</H3>
								<Button
									target="_blank"
									bold
									uppercase
									primary
									href="https://medium.appbase.io"
								>
									SEE MORE
								</Button>
							</div>
							<Grid size={2} mdSize={1} gutter="10px" smGutter="0px">
								<div>
									<ImageCard src="demos/blog-1.png" big>
										<div>
											<Title>
												Building an Airbnb clone with React and
												Elasticsearch
											</Title>
											<p style={{ maxWidth: 360 }}>
												Learn to create an airbnb like app with the forces
												of Reactivesearch and Reactivemaps combined.
											</p>
										</div>
										<div>
											<SecondaryLink
												primary
												href="https://blog.reactivesearch.io/geo-search-with-react-and-elasticsearch"
												target="_blank"
											>
												Read all about it
											</SecondaryLink>
										</div>
									</ImageCard>
								</div>
								{/* <div>
									<ImageCard src="demos/blog-1.png" big>
										<div>
											<Title>
												Building an Airbnb clone with React and
												Elasticsearch
											</Title>
											<p style={{ maxWidth: 360 }}>
												Learn to create an airbnb like app with the forces
												of Reactivesearch and Reactivemaps combined.
											</p>
										</div>
										<div>
											<SecondaryLink
												primary
												href="https://medium.com/@meghpararajkumar/8eb91e7e85e2"
												target="_blank"
											>
												Read all about it
											</SecondaryLink>
										</div>
									</ImageCard>
								</div> */}
							</Grid>
						</Layout>
					</Section>

					<Section>
						<Layout>
							<H2>Get started in minutes</H2>
							<Button
								href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/"
								bold
								uppercase
								style={{ margin: '25px 0 30px' }}
								big
								primary
							>
								BUILD MY FIRST APP
							</Button>

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

export default Home;
