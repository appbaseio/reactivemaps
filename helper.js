var Appbase = require('appbase-js');

module.exports = {
	createRequestObject : function(type) {
		return({
			type: type,
        	body: {
		        "query": {
		          "filtered" : {
		            "query" : {
		              "match_all" : {}
		            },
		            "filter" : {
		              "geo_bounding_box" : {
			                "venue" : {
			                    "top_left" : [-123.0,38.94],
			                    "bottom_right" : [-122.0, 36.54]
			                }
		               }
		            }
		          }
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




