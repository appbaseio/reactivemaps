var Appbase = require('appbase-js');

module.exports = {
	getRequestObject: function (type, venue) {
		return ({
			type: type,
			body: {
				"size": 1000,
				"query": {
					"filtered": {
						"query": {
							"match_all": {}
						},
						"filter": {
							"geo_bounding_box": {
								"venue": venue
							}
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