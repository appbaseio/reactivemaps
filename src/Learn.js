import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Logo,
    Button,
    H1,
    H2,
    Title,
    BannerRow,
    Card,
    Grid,
    Footer,
} from '@appbaseio/designkit';

import {
    Base,
    Layout,
    SecondaryLink,
    Section,
    titleText,
    stepCard,
} from './styles';

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
                            <li><Link to="/tools">TOOLS</Link></li>
                            <li className="active"><Link to="/learn">LEARN</Link></li>
                            <li className="button"><Button bold uppercase primary><img src="/support-white.svg" style={{ marginRight: 8 }} alt="support"/> SUPPORT</Button></li>
                        </Navbar.List>
                    </Navbar>

                    <Section>
                        <Layout>
                            <H1>Quickstart</H1>
                            <p className={titleText}>Use our step-by-step guide to get started with ReactiveMaps in minutes, or check out our docs.</p>

                            <Grid size={3} mdSize={2} smSize={1} gutter="12px" style={{ marginTop: 60 }}>
                                <div className={stepCard}>
                                    <span className="count">1</span>
                                    <div>
                                        <Title>Download NodeJS</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>

                                <div className={stepCard}>
                                    <span className="count">2</span>
                                    <div>
                                        <Title>Install on your device</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>

                                <div className={stepCard}>
                                    <span className="count">3</span>
                                    <div>
                                        <Title>Get the command line tool</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>

                                <div className={stepCard}>
                                    <span className="count">4</span>
                                    <div>
                                        <Title>Create your first project</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>

                                <div className={stepCard}>
                                    <span className="count">5</span>
                                    <div>
                                        <Title>Preview your project</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>

                                <div className={stepCard}>
                                    <span className="count">6</span>
                                    <div>
                                        <Title>Start coding!</Title>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla nemo quidem natus? Ea natus adipisci illum temporibus quia voluptate suscipit dolores facilis cupiditate, esse sequi ducimus a quasi quae?</p>
                                    </div>
                                    <div>
                                        <SecondaryLink primary>Download</SecondaryLink>
                                    </div>
                                </div>
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
                            <H2>Need Help?</H2>
                            <p>Resources to get help with Reactive Maps.</p>

                            <Grid size={4} lgSize={2} smSize={1} gutter="20px" lgGutter="12px" style={{ marginTop: '60px' }}>
                                <Card big href="https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/">
                                    <img
                                        src="/support/Documentation.svg"
                                        alt="Documentation"
                                    />
                                    <Title>Documentation</Title>
                                    <p>Dive in to learn all about <span style={{ color: '#0033FF' }}>Reactive X</span> development for all platforms.</p>
                                </Card>
                                <Card big href="https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/">
                                    <img
                                        src="/support/Tutorials.svg"
                                        alt="Tutorials"
                                    />
                                    <Title>Tutorials</Title>
                                    <p>Go from scratch to a full app with these tutorial guides.</p>
                                </Card>
                                <Card big href="https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/">
                                    <img
                                        src="/support/Support.png"
                                        srcSet="support/Support@2x.png 2x"
                                        alt="Support"
                                    />
                                    <Title>Support</Title>
                                    <p>Get first-class support from appbase.io for your <span style={{ color: '#0033FF' }}>Reactive X</span> app.</p>
                                </Card>
                                <Card big>
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
