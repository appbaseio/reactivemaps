import React from 'react';
import {GeoDistanceDropdownTest} from './GeoDistanceDropdown';
import {expectedValues} from './config';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('GeoDistanceDropdown test', () => {
	var response = null;
	beforeAll(() => {
		return GeoDistanceDropdownTest().then((res) => {
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
