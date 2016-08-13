var Appbase = require('appbase-js');
let config;
module.exports = {
	setConfigObject: function(configObject){
		config = configObject;
	},
	appbaseRef: function () {
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