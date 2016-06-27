var Appbase = require('appbase-js');

module.exports = {
	getRequestObject: function (type, venue) {
		return ({
			type: type,
			body: {
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

	getAppbaseRef: function (appname, username, password) {
		return (
			new Appbase({
				url: 'https://scalr.api.appbase.io',
				appname: appname,
				username: username,
				password: password
    		})
		);
	}
};