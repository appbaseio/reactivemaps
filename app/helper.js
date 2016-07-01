var Appbase = require('appbase-js');

module.exports = {
	getRequestObject: function (config, fieldName, boundingBoxCoordinates, streaming) {
    var geo_bounding_box = JSON.parse(`{"${fieldName}":` + JSON.stringify(boundingBoxCoordinates) + '}');
		var _source = !streaming ?  `${fieldName}` : null;
		return ({
			type: config.appbase.type,
			body: {
				"size": 100,
				"_source": [_source],
				"query": {
					"filtered": {
						"query": {
							"match_all": {}
						},
						"filter": {
							geo_bounding_box
						}
					}
				}
			}
		});
	},

	getAppbaseRef: function (config) {
		return (
			new Appbase({
				url: 'https://scalr.api.appbase.io',
				appname: config.appbase.appname,
				username: config.appbase.username,
				password: config.appbase.password
    		})
		);
	}
};