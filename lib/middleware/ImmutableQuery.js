'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('fbemitter');

var EventEmitter = _require.EventEmitter;
var emitter = exports.emitter = new EventEmitter();
var helper = require('./helper.js');

var ImmutableQuery = function () {
	function ImmutableQuery() {
		_classCallCheck(this, ImmutableQuery);

		this.shouldArray = [];
		this.mustArray = [];
		this.filterArray = [];
		this.config = [];
		this.aggs = {};
		this.queryListener();
	}

	_createClass(ImmutableQuery, [{
		key: 'setConfig',
		value: function setConfig(config) {
			this.config = config;
		}
	}, {
		key: 'addShouldClause',
		value: function addShouldClause(key, value, type) {
			var isExecuteQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
			var includeGeo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
			var queryLevel = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "must";

			if (value === undefined || value === null) {
				return;
			}
			var obj = eval('this.get' + type + 'Object(key, value)');
			var arr = queryLevel === 'should' ? this.shouldArray : this.mustArray;
			arr.push(obj);
			return this.buildQuery(includeGeo, isExecuteQuery);
		}
	}, {
		key: 'removeShouldClause',
		value: function removeShouldClause(key, value, type) {
			var isExecuteQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
			var includeGeo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
			var queryLevel = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "must";

			if (value === undefined || value === null) {
				return;
			}
			var arr = queryLevel === 'must' ? this.mustArray : this.shouldArray;
			var index = this.getArrayIndex(arr, key, value, type);
			if (index >= 0) {
				arr.splice(index, 1);
			}
			return this.buildQuery(includeGeo, isExecuteQuery);
		}
	}, {
		key: 'updateGeoFilter',
		value: function updateGeoFilter(key, boundingBoxCoordinates, geoFlag) {
			if (typeof geoFlag !== 'undefined' && !geoFlag) {} else {
				var geoObject = JSON.parse('{"' + key + '":' + JSON.stringify(boundingBoxCoordinates) + '}');
				this.filterArray[0] = { geo_bounding_box: geoObject };
			}
			var geoFlag = typeof geoFlag !== 'undefined' ? geoFlag : true;
			return this.buildQuery(geoFlag);
		}
	}, {
		key: 'addAggregation',
		value: function addAggregation(key, size, sort) {
			var order = void 0,
			    type = void 0;
			if (sort == "count") {
				order = "desc";
				type = "_count";
			} else if (sort == "asc") {
				order = "asc";
				type = "_term";
			} else {
				order = "desc";
				type = "_term";
			}
			var orderQuery = '{\n\t\t\t"' + type + '" : "' + order + '"\n\t\t}';
			this.aggs = JSON.parse('{\n\t\t\t"' + key + '": {\n\t\t\t\t"terms": {\n\t\t\t\t\t"field": "' + key + '",\n\t\t\t\t\t"size": ' + size + ',\n\t\t\t\t\t"order": ' + orderQuery + '\n\t\t\t\t}\n\t\t\t}\n\t\t}');
			var mustArray = JSON.parse(JSON.stringify(this.mustArray));
			mustArray = mustArray.filter(function (query) {
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
	}, {
		key: 'buildQuery',
		value: function buildQuery(includeGeo, isExecuteQuery) {
			var shouldArray = JSON.parse(JSON.stringify(this.shouldArray));
			var mustObject = {
				bool: {
					must: this.mustArray
				}
			};
			shouldArray.push(mustObject);
			if (includeGeo) {
				var geoFilter = {
					bool: {
						filter: this.filterArray
					}
				};
				shouldArray.unshift(geoFilter);
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
			if (isExecuteQuery) {
				emitter.emit('change', this.query);
			}
			return this.query;
		}
	}, {
		key: 'getTermObject',
		value: function getTermObject(key, value) {
			var term = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
			return { term: term };
		}
	}, {
		key: 'getTermsObject',
		value: function getTermsObject(key, value) {
			var terms = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
			return { terms: terms };
		}
	}, {
		key: 'getMatchObject',
		value: function getMatchObject(key, value) {
			value = value.toLowerCase();
			var match = JSON.parse('{"' + key + '":' + JSON.stringify(value) + '}');
			return { match: match };
		}
	}, {
		key: 'getRangeObject',
		value: function getRangeObject(key, value) {
			var rangeObj = {
				"gte": value.min,
				"lte": value.max
			};
			var range = JSON.parse('{"' + key + '":' + JSON.stringify(rangeObj) + '}');
			return { range: range };
		}
	}, {
		key: 'getArrayIndex',
		value: function getArrayIndex(array, key, value, type) {
			var obj = eval('this.get' + type + 'Object(key, value)');
			var encode64 = btoa(JSON.stringify(obj));
			for (var i = 0; i < array.length; i++) {
				if (btoa(JSON.stringify(array[i])) === encode64) {
					return i;
				}
			}
			return -1;
		}
		// Listener for query change

	}, {
		key: 'queryListener',
		value: function queryListener() {
			emitter.addListener('change', function (query) {
				this.executeQuery(query);
			}.bind(this));
		}
		// Execute query on query change

	}, {
		key: 'executeQuery',
		value: function executeQuery(reqObject) {
			// delete aggrefation query if exists
			if (reqObject.body && reqObject.body.hasOwnProperty('aggs')) {
				delete reqObject.body.aggs;
			}
			// apply search query and emit queryResult
			helper.appbaseRef.search(reqObject).on('data', function (data) {
				emitter.emit('queryResult', data);
			}).on('error', function (error) {
				console.log(error);
			});
		}
	}]);

	return ImmutableQuery;
}();

var queryObject = exports.queryObject = new ImmutableQuery();