import React from 'react';
import { Footer, Title } from '@appbaseio/designkit';

export default () => (
	<Footer>
		<Footer.Brand>
			<img
				width="100%"
				src="https://opensource.appbase.io/reactivesearch/images/logo.svg"
				alt="appbase.io"
			/>
		</Footer.Brand>
		<Footer.Links>
			<Footer.List>
				<Title>Documentation</Title>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/">
						Quick Start Guide
					</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://docs.appbase.io/docs/reactivesearch/v3/map/geodistanceslider/">
						Map Components
					</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://docs.appbase.io/docs/reactivesearch/v3/search/searchbox/">
						Search Components
					</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://docs.appbase.io/docs/reactivesearch/v3/result/reactivelist/">
						Result Components
					</a>
				</li>
			</Footer.List>

			<Footer.List>
				<Title>Community</Title>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://github.com/appbaseio/reactivesearch/discussions">GitHub</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/questions/tagged/reactivesearch">Stackoverflow</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/appbaseio">Twitter</a>
				</li>
			</Footer.List>

			<Footer.List>
				<Title>Helpful Tools</Title>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://opensource.appbase.io/dejavu/">Data Browser</a>
				</li>
                <li>
                    <a href="https://github.com/appbaseio/reactivesearch-api">ReactiveSearch API server
                    </a>
                </li>
			</Footer.List>

			<Footer.List>
				<Title className="heading">More</Title>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="https://medium.appbase.io/">Medium Publication</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="http://docs.appbase.io/">Appbase.io Docs</a>
				</li>
				<li>
					<a target="_blank" rel="noopener noreferrer" href="mailto:support@appbase.io">Support Email</a>
				</li>
			</Footer.List>
		</Footer.Links>
	</Footer>
);
