import React from 'react';
import { BannerRow, H2, Button } from '@appbaseio/designkit';

import { SecondaryLink } from '../styles';

export default () => (
	<BannerRow>
		<BannerRow.Column>
			<div>
				<H2 light>Build a live app in 5 easy steps</H2>
				<p>
					Go from scratch to creating a data-driven Maps UI with our quickstart guide.
				</p>
				<div className="button-row">
					<Button
						href="https://opensource.appbase.io/reactive-manual/getting-started/reactivesearch.html"
						bold
						uppercase
						big
						primary
					>
						Get Started
					</Button>
					<SecondaryLink href="https://opensource.appbase.io/reactive-manual">
						Learn More
					</SecondaryLink>
				</div>
			</div>
		</BannerRow.Column>
		<BannerRow.Column>
			<div>
				<H2 light>Get dedicated support</H2>
				<p>
					We offer production support for ReactiveMaps. Want to bring your dream project to life? Work with us.
				</p>
				<div className="button-row">
					<Button href="https://appbase.io/support" bold uppercase big dark>
						<img src="support.svg" style={{ marginRight: 8 }} alt="support" /> SUPPORT PLANS
					</Button>
					<SecondaryLink href="/learn">Get in touch</SecondaryLink>
				</div>
			</div>
		</BannerRow.Column>
	</BannerRow>
);
