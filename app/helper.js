var Appbase = require('appbase-js');
export let appbaseRef;
export function setConfigObject(config){
	appbaseRef = new Appbase({
		url: 'https://scalr.api.appbase.io',
		appname: config.appbase.appname,
		username: config.appbase.username,
		password: config.appbase.password
	});
};