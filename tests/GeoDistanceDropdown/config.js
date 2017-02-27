const data = [{ start: 1, end: 100, label: "Less than 100 miles" },
	{ start: 101, end: 200, label: "Between 100 and 200 miles" },
	{ start: 201, end: 500, label: "Between 200 and 500 miles" },
	{ start: 501, end: 1000, label: "Above 500 miles" }
];
const config = {
	mapping: {
		location: "location"
	},
	GeoDistanceDropdown: {
		data: data,
		defaultSelected: {
			location: 'London',
			label: data[0].label
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
						"geo_distance_range": {
							[config.mapping.location]: config.GeoDistanceDropdown.locationLatLng,
							"from": config.GeoDistanceDropdown.data[0].start + config.GeoDistanceDropdown.unit,
							"to": config.GeoDistanceDropdown.data[0].end + config.GeoDistanceDropdown.unit
						}
					}]
				}
			},
			"sort": [{
				"_geo_distance": {
					"order": "asc",
					"unit": config.GeoDistanceDropdown.unit,
					"location": config.GeoDistanceDropdown.locationLatLng
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
