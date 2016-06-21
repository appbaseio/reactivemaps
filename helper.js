var Appbase = require('appbase-js');

module.exports = {
	createRequestObject : function(type) {
		return({
			type: type,
        	body: {
            	"query": {
        	    	"match_all": {}
           		} 
        	}
		});
        
	},

	createAppbaseRef : function(appname, username, password){
		return (
			new Appbase({
		        url: 'https://scalr.api.appbase.io',
		        appname: appname,
		        username: username,
		        password: password
    		})
		);
	}
}




