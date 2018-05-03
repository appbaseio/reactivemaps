import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { Navbar, Logo, Button, H1, H2, Title, Grid } from '@appbaseio/designkit';

import { Base, Layout, SecondaryLink, Section, titleText, stepCard } from '../styles';
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
							<Logo href="/">
								<Logo.Icon>
									<img src="/icon.svg" alt="Icon" />
								</Logo.Icon>
								<Logo.Light>Reactive</Logo.Light>
								<Logo.Dark>Maps</Logo.Dark>
							</Logo>
						</Navbar.Logo>
						<Navbar.List>
							<li>
								<Link to="/tools">TOOLS</Link>
							</li>
							<li className="active">
								<Link to="/learn">LEARN</Link>
							</li>
							<li className="button">
								<Button href="https://appbase.io/support" bold uppercase primary>
									<img
										src="/support-white.svg"
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
							<H1>Quickstart</H1>
							<p className={titleText}>
								Use our step-by-step guide to get started with ReactiveMaps in
								minutes, or check out our docs.
							</p>

							<Grid
								size={3}
								mdSize={2}
								smSize={1}
								gutter="12px"
								style={{ marginTop: 60 }}
							>
								<div className={stepCard}>
									<span className="count">1</span>
									<div>
										<Title>Download NodeJS</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">2</span>
									<div>
										<Title>Install on your device</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">3</span>
									<div>
										<Title>Get the command line tool</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">4</span>
									<div>
										<Title>Create your first project</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">5</span>
									<div>
										<Title>Preview your project</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
									</div>
								</div>

								<div className={stepCard}>
									<span className="count">6</span>
									<div>
										<Title>Start coding!</Title>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Et nulla nemo quidem natus? Ea natus adipisci illum
											temporibus quia voluptate suscipit dolores facilis
											cupiditate, esse sequi ducimus a quasi quae?
										</p>
									</div>
									<div>
										<SecondaryLink primary>Download</SecondaryLink>
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
