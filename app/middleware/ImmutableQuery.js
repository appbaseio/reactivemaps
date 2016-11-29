var {EventEmitter} = require('fbemitter');
export var emitter = new EventEmitter();
var helper = require('./helper.js');

class ImmutableQuery {
	constructor() {
		this.shouldArray = [];
		this.mustArray = [];
		this.filterArray = [];
		this.config = [];
		this.aggs = {};
		this.queryListener();
	}
	setConfig(config) {
		this.config = config;
	}
	addShouldClause(key, value, type, isExecuteQuery=true, includeGeo=false, queryLevel="must") {
		if(value===undefined || value===null){
			return;
		}
		var obj = eval(`this.get${type}Object(key, value)`);
		var arr = queryLevel === 'should' ? this.shouldArray : this.mustArray;
		arr.push(obj);
		return this.buildQuery(includeGeo, isExecuteQuery);
	}

	removeShouldClause(key, value, type, isExecuteQuery=false, includeGeo=false, queryLevel="must") {
		if(value===undefined || value===null){
			return;
		}
		var arr = queryLevel === 'must' ? this.mustArray : this.shouldArray;
		var index = this.getArrayIndex(arr, key, value, type);
		if(index >= 0) {
			arr.splice(index, 1);
		}
		return this.buildQuery(includeGeo, isExecuteQuery);
	}
	updateGeoFilter(key, boundingBoxCoordinates, geoFlag) {
		if(typeof geoFlag !== 'undefined' && !geoFlag) {}
		else {
			var geoObject = JSON.parse(`{"${key}":` + JSON.stringify(boundingBoxCoordinates) + '}');
			this.filterArray[0] = { geo_bounding_box: geoObject };
		}
		var geoFlag = typeof geoFlag !== 'undefined' ? geoFlag : true;
		return this.buildQuery(geoFlag);
	}
	addAggregation(key, size, sort) {
		let order, type;
		if(sort=="count"){
			order = "desc";
			type = "_count";
		}
		else if(sort=="asc"){
			order = "asc";
			type = "_term";
		}
		else{
			order = "desc";
			type = "_term";
		}
		let orderQuery = `{
			"${type}" : "${order}"
		}`;
		this.aggs = JSON.parse(`{
			"${key}": {
				"terms": {
					"field": "${key}",
					"size": ${size},
					"order": ${orderQuery}
				}
			}
		}`);
		var mustArray = JSON.parse(JSON.stringify(this.mustArray));
		mustArray = mustArray.filter((query) => {
			return !query.hasOwnProperty('terms');
		});
		var query = {
			type: this.config.type,
			body: {
				"size": 100,
				"aggs": this.aggs,
				"query": {
					"bool": {
						"must": mustArray
					}
				}
			}
		};
		return query;
	}
	buildQuery(includeGeo, isExecuteQuery) {
		var shouldArray = JSON.parse(JSON.stringify(this.shouldArray));
		var mustObject = {
			bool: {
				must: this.mustArray
			}
		};
		shouldArray.push(mustObject);
		if(includeGeo) {
			var geoFilter = {
				bool: {
					filter: this.filterArray
				}
			};
			shouldArray.unshift(geoFilter)
		}
		this.query = {
			type: this.config.type,
			body: {
				"size": 100,
				"aggs": this.aggs,
				"query": {
					"bool": {
						"should": shouldArray,
						"minimum_should_match": 1
					}
				}
			}
		};
		if(isExecuteQuery) {
			emitter.emit('change', this.query);
		}
		return this.query;
	}
	getTermObject(key, value) {
		var term = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
		return { term };
	}
	getTermsObject(key, value) {
		var terms = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
		return { terms };
	}
	getMatchObject(key, value) {
		value = value.toLowerCase();
		var match = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
		return { match };
	}
	getRangeObject(key, value) {
		var rangeObj = {
			"gte": value.min,
			"lte": value.max
		};
		var range = JSON.parse(`{"${key}":` + JSON.stringify(rangeObj) + '}');
		return { range };
	}
	getArrayIndex(array, key, value, type) {
		var obj = eval(`this.get${type}Object(key, value)`);
		var encode64 = btoa(JSON.stringify(obj));
		for (var i = 0; i < array.length; i++) {
			if (btoa(JSON.stringify(array[i])) === encode64) {
				return i;
			}
		}
		return -1;
	}
	// Listener for query change
	queryListener() {
		emitter.addListener('change', function(query) {
			this.executeQuery(query)
		}.bind(this));
	}
	// Execute query on query change
	executeQuery(reqObject) {
		// delete aggrefation query if exists
		if(reqObject.body && reqObject.body.hasOwnProperty('aggs')) {
			delete reqObject.body.aggs;
		}
		// apply search query and emit queryResult
		helper.appbaseRef.search(reqObject).on('data', function(data) {
			emitter.emit('queryResult', data);
		}).on('error', function(error) {
			console.log(error);
		});
	}
}

export const queryObject = new ImmutableQuery();
