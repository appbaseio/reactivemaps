import React from 'react';
import { ReactiveBase, GeoDistanceDropdown, ReactiveMap } from '../../app/app.js';
import {config} from './config';
import { mount } from 'enzyme';
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyC-v0oz7Pay_ltypZbKasABXGiY9NlpCIY';
GoogleMapsLoader.VERSION = 3.14;
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
var google;

function testComponent(cb) {
	const onData = function(res, err) {
		cb(res, err);
	}
	const component = mount(
		<ReactiveBase
				app={config.ReactiveBase.app}
				username={config.ReactiveBase.username}
				password={config.ReactiveBase.password}
				type={config.ReactiveBase.type}
			>
			<div className="row">
				<div className="col s6 col-xs-6">
					<GeoDistanceDropdown
						componentId="CitySensor"
						appbaseField={config.mapping.location}
						title="GeoDistanceDropdown"
						defaultSelected={config.GeoDistanceDropdown.defaultSelected}
						unit={config.GeoDistanceDropdown.unit}
						data={config.GeoDistanceDropdown.data}
					/>
				</div>
				<div className="col s6 col-xs-6">
					<ReactiveMap
						componentId="SearchResult"
						appbaseField={config.mapping.location}
						onData={onData}
						size={config.ReactiveMap.size}
						react={{
							'and': ["CitySensor"]
						}}
					/>
				</div>
			</div>
		</ReactiveBase>
	);
}
export var GeoDistanceDropdownTest = function() {
	return new Promise((resolve, reject) => {
		GoogleMapsLoader.load(function(googleLoad) {
			google = googleLoad;
			window.google = googleLoad;
			start();
		});
		function start() {
			testComponent(function(res,err) {
				if (err) {
					reject(err);
				} else if (res) {
					resolve(res);
				}
			});
		}
	});
}
