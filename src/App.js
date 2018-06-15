import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import {
	Navbar,
	Logo,
	Button,
	H1,
	H2,
	H3,
	GithubButton,
	Title,
	BannerRow,
	Card,
	Grid,
	Footer,
} from '@appbaseio/designkit';

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
} from './styles';
import ActionCard from './ActionCard';
import Testimonial from './Testimonial';
import ImageCard from './ImageCard';

class App extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
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
							<li><Link to="/tools">TOOLS</Link></li>
							<li><Link to="/learn">LEARN</Link></li>
							<li className="button"><Button bold uppercase dark><img src="/support.svg" style={{ marginRight: 8 }} alt="support"/> SUPPORT</Button></li>
						</Navbar.List>
					</Navbar>

					<div className={banner}>
						<Layout>
							<H1 light>Build Geolocation Apps</H1>
							<p>Reactive Maps is a data-driven UI components library for building Map UIs.</p>

							<div className="button-row">
								<GithubButton count="1,668" />
								<Button bold uppercase big primary>Get Started</Button>
								<SecondaryLink>Learn More</SecondaryLink>
							</div>

							<div className="bg-image">
								<div className="pulsating-circle" />
								<div className="pulsating-circle" style={{ left: '70%', bottom: '400px' }} />
							</div>
						</Layout>
					</div>

					<Row>
						<Layout>
							<div className={hideMobile}>
								<img src="/components.png" width="100%" alt="Components"/>
							</div>
							<div className={vcenter}>
								<H2>UI Components for every occasion</H2>
								<img className={showMobile} src="/components-mobile.png" srcSet="/components-mobile@2x.png 2x" width="100%" alt="Components" style={{ marginTop: 30 }} />
								<p>Build the perfect search experience using our UI components or by creating your own. 30+ prebuilt components with customizable queries and configurable styles.</p>
								<p>Get our designer templates for sketch.</p>

								<div className="button-row">
									<Button bold uppercase big primary>View Components</Button>
									<SecondaryLink primary>Create your own</SecondaryLink>
								</div>
							</div>
						</Layout>
					</Row>

					<Section>
						<Layout>
							<H2>Up to 10x Time Savings</H2>
							<p>Focus on the design and user experience, let us handle the details.</p>

							<Grid size={3} mdSize={2} smSize={1} gutter="50px" style={{ marginTop: '60px' }}>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/1.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/2.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/3.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/4.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/5.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
								<ActionCard>
									<ActionCard.Icon><img src="/icons/6.png" alt="Icon"/></ActionCard.Icon>
									<Title>Works with existing UIs</Title>
									<p>Already have your own components? Bring them to ReactiveSearch.</p>
									<SecondaryLink primary>Read More</SecondaryLink>
								</ActionCard>
							</Grid>
						</Layout>
					</Section>

					<BannerRow>
						<BannerRow.Column>
							<div>
								<H2 light>Build a live app in 5 minutes</H2>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis vel nisi ac tincidunt. In vel egestas enim. In bibendum dui eget tristique maximus.</p>
								<div className="button-row">
									<Button bold uppercase big primary>Get Started</Button>
									<SecondaryLink>Docs</SecondaryLink>
								</div>
							</div>
						</BannerRow.Column>
						<BannerRow.Column>
							<div>
								<H2 light>Work with us to build your app</H2>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis vel nisi ac tincidunt. In vel egestas enim. In bibendum dui eget tristique maximus.</p>
								<div className="button-row">
									<Button bold uppercase big dark><img src="/support.svg" style={{ marginRight: 8 }} alt="support"/> SUPPORT</Button>
									<SecondaryLink>Learn</SecondaryLink>
								</div>
							</div>
						</BannerRow.Column>
					</BannerRow>

					<Section>
						<Layout>
							<div className={titleRow}>
								<H3>Check our demos</H3>
								<Button bold uppercase primary>SEE MORE</Button>
							</div>
							<Grid size={4} mdSize={2} smSize={1} gutter="15px" style={{ marginBottom: '50px' }}>
								<ImageCard src="/project.png">
									<div>
										<Title>Carry</Title>
										<p>Lorem ipsum dolo. Nunc ac turpis metus.</p>
									</div>
									<div>
										<SecondaryLink primary>Check Demo</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="/project.png">
									<div>
										<Title>Carry</Title>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
									</div>
									<div>
										<SecondaryLink primary>Check Demo</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="/project.png">
									<div>
										<Title>Carry</Title>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
									</div>
									<div>
										<SecondaryLink primary>Check Demo</SecondaryLink>
									</div>
								</ImageCard>
								<ImageCard src="/project.png">
									<div>
										<Title>Carry</Title>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
									</div>
									<div>
										<SecondaryLink primary>Check Demo</SecondaryLink>
									</div>
								</ImageCard>
							</Grid>

							<div className={titleRow}>
								<H3>Featured</H3>
								<Button bold uppercase primary>SEE MORE</Button>
							</div>
							<Grid size={2} mdSize={1} gutter="10px">
								<div>
									<ImageCard src="/project.png" big>
										<div>
											<Title>Carry</Title>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
										</div>
										<div>
											<SecondaryLink primary>Check Demo</SecondaryLink>
										</div>
									</ImageCard>
								</div>

								<div>
									<Grid size={2} smSize={1} gutter="10px">
										<ImageCard src="/project.png">
											<div>
												<Title>Carry</Title>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
											</div>
											<div>
												<SecondaryLink primary>Check Demo</SecondaryLink>
											</div>
										</ImageCard>
										<ImageCard src="/project.png">
											<div>
												<Title>Carry</Title>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac turpis metus.</p>
											</div>
											<div>
												<SecondaryLink primary>Check Demo</SecondaryLink>
											</div>
										</ImageCard>
									</Grid>
								</div>
							</Grid>
						</Layout>
					</Section>

					<Section style={{ backgroundColor: '#fff' }}>
						<Layout>
							<H2>Built by the Reactive community</H2>

							<Testimonial>
								<Testimonial.Card row={6} color="#66A1FF">
									<Testimonial.Author>
										<img src="https://appbase.io/static/images/customers/heitorcorrea.jpg" alt="Heitor Correa" />
										<div>
											<h3>1 Heitor Correa</h3>
											<p>CTO, Hariken</p>
										</div>
									</Testimonial.Author>
									<p style={{ fontSize: '1.3rem', lineHeight: '2rem' }}>Having appbase.io by our side has been like having a specialist inside the team. They are saving us at least 40 hours every month.</p>
								</Testimonial.Card>

								<Testimonial.Card row={3}>
									<Testimonial.Author>
										<img src="https://appbase.io/static/images/customers/charliewood.jpg" alt="Heitor Correa" />
										<div>
											<h3>Charlie Wood</h3>
											<p>CTO, Numerous App</p>
										</div>
									</Testimonial.Author>
									<p style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>Great customer support from @appbaseio, which we use for in-app search.</p>
								</Testimonial.Card>

								<Testimonial.Card row={4} color="#893FF3">
									<Testimonial.Author>
										<img src="https://appbase.io/static/images/customers/kishanpatel.jpg" alt="Heitor Correa" />
										<div>
											<h3>Kishan Patel</h3>
											<p>CTO, Lyearn</p>
										</div>
									</Testimonial.Author>
									<p style={{ fontSize: '1.2rem', lineHeight: '1.8rem' }}>We use Reactivesearch for powering our search at Lyearn. It has saved us at least a month of work.</p>
								</Testimonial.Card>

								<Testimonial.Card row={3} small color="#52D65B">
									<p style={{ fontSize: '1.1rem', lineHeight: '1.6rem' }}>The time savings have been off the charts in getting our search up and running!</p>
									<Testimonial.Author>
										<p>Rob Whitley, Co-Founder, Salespipe</p>
									</Testimonial.Author>
								</Testimonial.Card>

								<Testimonial.Card row={2}>
									<Testimonial.Author>
										<img src="https://appbase.io/static/images/customers/patrickhogan.jpg" alt="Heitor Correa" />
										<div>
											<h3>Patrick Hogan</h3>
											<p>CEO, Tenfold</p>
										</div>
									</Testimonial.Author>
									<p style={{ fontSize: '1.1rem', lineHeight: '1.6rem' }}>Appbase is fast, like Usain Bolt.</p>
								</Testimonial.Card>

							</Testimonial>
						</Layout>
					</Section>

					<Section>
						<Layout>
							<H2>Get started in minutes</H2>
							<Button bold uppercase style={{ margin: '25px 0 30px' }} big primary>BUILD MY FIRST APP</Button>

							<H2>Need Help?</H2>
							<p>Resources to get help with Reactive Maps.</p>

							<Grid size={4} lgSize={2} smSize={1} gutter="20px" lgGutter="12px" style={{ marginTop: '60px' }}>
								<Card big href="https://opensource.appbase.io/reactive-manual">
									<img
										src="/support/Documentation.svg"
										alt="Documentation"
									/>
									<Title>Documentation</Title>
									<p>Dive in to learn all about <span style={{ color: '#0033FF' }}>Reactive X</span> development for all platforms.</p>
								</Card>
								<Card big href="https://opensource.appbase.io/reactive-manual">
									<img
										src="/support/Tutorials.svg"
										alt="Tutorials"
									/>
									<Title>Tutorials</Title>
									<p>Go from scratch to a full app with these tutorial guides.</p>
								</Card>
								<Card big href="https://opensource.appbase.io/reactive-manual">
									<img
										src="/support/Support.png"
										srcSet="support/Support@2x.png 2x"
										alt="Support"
									/>
									<Title>Support</Title>
									<p>Get first-class support from appbase.io for your <span style={{ color: '#0033FF' }}>Reactive X</span> app.</p>
								</Card>
								<Card big href="https://opensource.appbase.io/reactive-manual">
									<img
										src="/support/Gitter.svg"
										alt="Gitter"
									/>
									<Title>Gitter</Title>
									<p>Join our community on Gitter. We're always around and happy to help.</p>
								</Card>
							</Grid>
						</Layout>
					</Section>

					<Footer>
						<Footer.Brand>
							<img width="100%" src="https://opensource.appbase.io/reactivesearch/images/logo.svg" alt="appbase.io" />
						</Footer.Brand>
						<Footer.Links>
							<Footer.List>
								<Title>Documentation</Title>
								<li><a href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html">Quick Start</a></li>
								<li><a href="https://opensource.appbase.io/reactive-manual/base-components/textfield.html">Base Components</a></li>
								<li><a href="https://opensource.appbase.io/reactive-manual/list-components/singlelist.html">List Components</a></li>
								<li><a href="https://opensource.appbase.io/reactive-manual/search-components/categorysearch.html">Search Components</a></li>
								<li><a href="https://opensource.appbase.io/reactive-manual/result-components/resultlist.html">Result Components</a></li>
							</Footer.List>

							<Footer.List>
								<Title>Community</Title>
								<li><a href="https://github.com/appbaseio/reactivesearch/">GitHub</a></li>
								<li><a href="http://slack.appbase.io">Slack</a></li>
								<li><a href="https://twitter.com/appbaseio">Twitter</a></li>
							</Footer.List>

							<Footer.List>
								<Title>Helpful Tools</Title>
								<li><a href="https://opensource.appbase.io/dejavu/">Data Browser</a></li>
								<li><a href="https://opensource.appbase.io/mirage/">GUI Query Builder</a></li>
							</Footer.List>

							<Footer.List>
								<Title className="heading">More</Title>
								<li><a href="https://medium.appbase.io/">Blog</a></li>
								<li><a href="http://docs.appbase.io/">Appbase.io Docs</a></li>
								<li><a href="https://gitter.im/appbaseio/reactivesearch">Gitter</a></li>
								<li><a href="mailto:support@appbase.io">Support Email</a></li>
							</Footer.List>
						</Footer.Links>
					</Footer>
				</Base>
			</ThemeProvider>
		);
	}
}

export default App;
