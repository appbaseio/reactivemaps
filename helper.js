var Appbase = require('appbase-js');

module.exports = {
	getRequestObject: function (config, fieldName, boundingBoxCoordinates) {
    var geo_bounding_box = JSON.parse(`{"${fieldName}":` + JSON.stringify(boundingBoxCoordinates) + '}');
		return ({
			type: config.appbase.type,
			body: {
				"size": 1000,
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