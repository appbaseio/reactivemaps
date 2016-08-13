var Appbase = require('appbase-js');

module.exports = {
	getAppbaseRef: function (config) {
		return (
			new Appbase({
				url: 'https://scalr.api.appbase.io',
				appname: config.appbase.appname,
				username: config.appbase.username,
				password: config.appbase.password
    		})
		);
	},
};