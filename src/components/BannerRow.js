import React from 'react';
import { BannerRow, H2, Button } from '@appbaseio/designkit';

import { SecondaryLink } from '../styles';

export default () => (
	<BannerRow>
		<BannerRow.Column>
			<div>
				<H2 light>Build a live app in 5 easy steps</H2>
				<p>
					Go from scratch to creating a data-driven Maps application with our quickstart
					guide for beginners.
				</p>
				<div className="button-row center">
					<Button
						href="/reactivemaps/learn"
						bold
						uppercase
						big
						primary
					>
						Get Started
					</Button>
					<SecondaryLink href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/">
						Learn More
					</SecondaryLink>
				</div>
			</div>
		</BannerRow.Column>
		<BannerRow.Column>
			<div>
				<H2 light>Get dedicated support</H2>
				<p>
					We offer production support for ReactiveMaps. Work with us to bring your dream
					project to life.
				</p>
				<div className="button-row center">
					<Button href="https://appbase.io/pricing/#premium-support" bold uppercase big dark>
						<img src="support.svg" style={{ marginRight: 10 }} alt="support" />
						SUPPORT PLANS
					</Button>
					<SecondaryLink href="https://appbase.io/contact">Get in touch</SecondaryLink>
				</div>
			</div>
		</BannerRow.Column>
	</BannerRow>
);
