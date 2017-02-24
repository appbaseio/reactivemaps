import React from 'react';
import {GeoDistanceSliderTest} from './GeoDistanceSlider';
import {expectedValues} from './config';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('GeoDistanceSlider test', () => {
	var response = null;
	beforeAll(() => {
		return GeoDistanceSliderTest().then((res) => {
			response = res;
			return response;
		}).catch((err) => {
			console.log(err);
		});
	});

	test('Response should exists', ()=> {
		expect(response).toBeTruthy();
	})

	test('Query should match', () => {
		expect(response.appliedQuery).toMatchObject(expectedValues.appliedQuery);
	});

	test('result length', () => {
		expect(response.newData.length).toBe(expectedValues.resultLength);
	});

});
