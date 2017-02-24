const config = {
	mapping: {
		location: "location"
	},
	GeoDistanceSlider: {
		defaultSelected: {
			location: 'London',
			distance: 5
		},
		"locationLatLng": "51.5073509, -0.1277583",
		"unit": "mi"
	},
	ReactiveMap: {
		size: 1,
		from: 0
	},
	ReactiveBase: {
		app: "ReactiveMapTest",
		username: "J9GnR18lo",
		password: "348fb7b0-52e5-4b24-8306-9efeaba5ee09",
		type: "meetupdata"
	}
};
const expectedValues = {
	appliedQuery: {
		"body": {
			"query": {
				"bool": {
					"must": [{
						"geo_distance": {
							[config.mapping.location]: config.GeoDistanceSlider.locationLatLng,
							"distance": config.GeoDistanceSlider.defaultSelected.distance+config.GeoDistanceSlider.unit
						}
					}]
				}
			},
			"sort": [{
				"_geo_distance": {
					"order": "asc",
					"unit": config.GeoDistanceSlider.unit,
					"location": config.GeoDistanceSlider.locationLatLng
				}
			}],
			"size": config.ReactiveMap.size,
			"from": config.ReactiveMap.from
		},
		"type": config.ReactiveBase.type
	},
	resultLength: 1
}
module.exports = {
	config: config,
	expectedValues: expectedValues
};
