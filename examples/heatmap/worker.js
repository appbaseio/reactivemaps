module.exports = {
	importFrom: function() {
		var config = {
			url: 'https://scalr.api.appbase.io',
			"appname": "map_demo",
			"username": "aT29UsiAp",
			"password": "e0d26007-d818-4559-8244-c3c2fbad45ad"
		};
		this.importApp = new Appbase(config);
		return this.importApp;
	},
	type: 'meetupdata1',
	insertionProcess: false,
	// initialize
	init: function(config, field, mapBounds) {
		let importAppbaseRef = this.importFrom();
		let geo_query = {
			location: mapBounds
		};
		this.heatmapAppConfig = config;
		this.searchObj = {
			type: this.type,
			sort: [{
				mtime: {"order": "desc"}
			}],
			body: {
				query: {
					bool: {
						should: [{
							geo_bounding_box: geo_query
						}]
					}
				}
			}
		};
		this.searchQuery(0, 100);
	},
	// apply search query
	// and store data in importedData props to use it in startOperation function to index in heatmap app
	searchQuery: function(from, size) {
		this.searchObj.body.from = from;
		this.searchObj.body.size = size;
		this.importApp.search(this.searchObj).on('data', function(data) {
			this.hitLength = data.hits.hits.length;
			this.importedData = data.hits.hits;
			this.startOperation();
		}.bind(this));
	},
	// get more data
	nextPage: function() {
		this.searchObj.body.from += 100;
		this.searchQuery(this.searchObj.body.from, this.searchObj.body.size);
	},
	// this function contains the logic of insert node and delete node
	startOperation: function() {
		// initialize
		let heatmapAppConfig = this.heatmapAppConfig;
		let timer = 2000;
		this.heatmapApp = new Appbase({
			url: 'https://scalr.api.appbase.io',
			appname: heatmapAppConfig.appbase.app,
			username: heatmapAppConfig.appbase.username,
			password: heatmapAppConfig.appbase.password
		});

		// if insertNode process is already stopped then start it again
		if(!this.insertionProcess) {
			this.insertIndexCount = 0;
			insertNode.apply(this);
		}

		// delete existing record
		function deleteNode(index) {
			let requestObject = {
				type: heatmapAppConfig.appbase.type,
				id: this.heatmapData[index]._id.toString()
			};
			this.heatmapApp.delete(requestObject).on('data', function(response) {
				console.log('Deleted', index);
			}).on('error', function(error) {
				console.log(error);
			});
		}

		// insert new record in heatmap app and delete that record from importedData props
		function insertNode(index=0) {
			if(this.importedData && this.importedData[index] && this.importedData[index]._source) {
				this.insertIndexCount++;
				this.insertionProcess = true;
				let requestObject = {
					type: this.type
				};
				requestObject.body = this.importedData[index]._source;

				// index process and call insertNode after interval.
				this.heatmapApp.index(requestObject).on('data', function(response) {
					this.importedData.splice(index, 1);
					console.log(" Indexed ", index);
					setTimeout(() => {
						if(this.importedData.length) {
							insertNode.call(this, this.pickRandom(0, this.importedData.length));
						} else {
							this.insertionProcess = false;
							if(this.hitLength > 98) {
								this.nextPage();
							} else {
								this.searchObj.body.from = -100;
								this.nextPage();
							}
						}
					}, timer);
					// delete node while index is even number
					if((this.insertIndexCount%2) === 0) {
						if(this.heatmapData && this.heatmapData.length) {
							deleteNode.call(this, this.pickRandom(0, this.heatmapData.length));
						}
					}
				}.bind(this)).on('error', function(error) {
					this.insertionProcess = false;
					console.log(error);
				}.bind(this));
			} else {
				this.insertionProcess = false;
			}
		}
	},
	heatmapExistingData: function(markers) {
		this.heatmapData = markers;
	},
	pickRandom: function(min, max) {
		max = max-1;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
