var Appbase = require('appbase-js');
export let appbaseRef;
export let appbaseConfig;
export function setConfigObject(config){
	appbaseConfig = config.appbase;
	appbaseRef = new Appbase({
		url: 'https://scalr.api.appbase.io',
		appname: config.appbase.appname,
		username: config.appbase.username,
		password: config.appbase.password
	});
};