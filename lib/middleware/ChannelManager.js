'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('fbemitter');

var EventEmitter = _require.EventEmitter;

var helper = require('./helper.js');

var channelManager = function () {
	function channelManager() {
		_classCallCheck(this, channelManager);

		this.emitter = new EventEmitter();
		this.channels = {};
		this.streamRef = {};
		this.queryOptions = {};
		this.appbaseConfig = {};
		this.receive = this.receive.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	_createClass(channelManager, [{
		key: 'setConfig',
		value: function setConfig(config) {
			this.config = config;
		}

		// Receive: This method will be executed whenever dependency value changes
		// It receives which dependency changes and which channeldId should be affected.

	}, {
		key: 'receive',
		value: function receive(depend, channelId) {
			var _this = this;

			var queryOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var self = this;
			var channelObj = this.channels[channelId];
			var queryObj = void 0;
			if (!queryOptions) {
				queryObj = this.queryBuild(channelObj.depends, channelObj.previousSelectedSensor, channelObj.size, channelObj.from);
				this.queryOptions[channelId] = channelObj.previousSelectedSensor['channel-options-' + channelId];
			} else {
				queryObj = this.queryBuild(channelObj.depends, queryOptions, channelObj.size, channelObj.from);
			}
			var validQuery = true;
			try {
				validQuery = !queryObj.body.aggs && queryObj.body.query.bool.should.length === 0 ? false : true;
			} catch (e) {}

			if (validQuery) {
				(function () {
					var channelResponse = {
						startTime: new Date().getTime(),
						appliedQuery: queryObj
					};
					var appbaseRef = _this.appbaseConfig[channelId];
					if (appbaseRef) {
						// apply search query and emit historic queryResult
						appbaseRef.search(queryObj).on('data', function (data) {
							channelResponse.method = 'historic';
							channelResponse.data = data;
							self.emitter.emit(channelId, channelResponse);
						}).on('error', function (error) {
							console.log(error);
						});
						// apply searchStream query and emit streaming data
						if (_this.streamRef[channelId]) {
							_this.streamRef[channelId].stop();
						}
						_this.streamRef[channelId] = appbaseRef.searchStream(queryObj).on('data', function (data) {
							var obj = {
								method: 'stream',
								data: data,
								appliedQuery: queryObj
							};
							self.emitter.emit(channelId, obj);
						}).on('error', function (error) {
							console.log(error);
						});
					} else {
						console.error('appbaseRef is not set for ' + channelId);
					}
				})();
			} else {
				var obj = {
					method: 'historic',
					data: {
						_shards: {},
						hits: {
							hits: []
						}
					},
					appliedQuery: queryObj
				};
				self.emitter.emit(channelId, obj);
			}
		}

		// queryBuild
		// Builds the query by using depends object and values of sensor

	}, {
		key: 'queryBuild',
		value: function queryBuild(depends, previousSelectedSensor, size) {
			var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

			var aggs = null;
			var mustArray = [];
			var shouldArray = [];
			var requestOptions = {};
			var sortObj = [];
			for (var depend in depends) {
				if (depend === 'aggs') {
					aggs = aggsQuery(depend);
				} else if (depend.indexOf('channel-options-') > -1) {
					requestOptions = previousSelectedSensor[depend];
				} else {
					var queryObj = null;
					if (depends[depend].defaultQuery) {
						queryObj = depends[depend].defaultQuery(previousSelectedSensor[depend]);
					} else {
						queryObj = singleQuery(depend);
					}
					if (queryObj) {
						if (depends[depend].operation === 'must') {
							mustArray.push(queryObj);
						} else if (depends[depend].operation === 'should') {
							shouldArray.push(queryObj);
						}
					}
				}
				var sortField = sortAvailbale(depend);
				if (sortField) {
					sortObj.push(sortField);
				}
			}

			// check if sortinfo is availbale
			function sortAvailbale(depend) {
				var sortInfo = helper.selectedSensor.get(depend, 'sortInfo');
				return sortInfo;
			}

			// build single query or if default query present in sensor itself use that
			function singleQuery(depend) {
				var sensorInfo = helper.selectedSensor.get(depend, 'sensorInfo');
				var s_query = null;
				if (sensorInfo && sensorInfo.defaultQuery) {
					s_query = sensorInfo.defaultQuery(previousSelectedSensor[depend]);
				} else if (previousSelectedSensor[depend]) {
					s_query = {};
					s_query[sensorInfo.queryType] = {};
					s_query[sensorInfo.queryType][sensorInfo.inputData] = previousSelectedSensor[depend];
				}
				return s_query;
			}

			function aggsQuery(depend) {
				var aggsObj = depends[depend];
				var order = void 0,
				    type = void 0;
				if (aggsObj.sort == "count") {
					order = "desc";
					type = "_count";
				} else if (aggsObj.sort == "asc") {
					order = "asc";
					type = "_term";
				} else {
					order = "desc";
					type = "_term";
				}
				var orderQuery = '{ \n\t\t\t\t"' + type + '" : "' + order + '" \n\t\t\t}';
				return JSON.parse('{\n\t\t\t\t"' + aggsObj.key + '": {\n\t\t\t\t\t"terms": {\n\t\t\t\t\t\t"field": "' + aggsObj.key + '",\n\t\t\t\t\t\t"size": ' + aggsObj.size + ',\n\t\t\t\t\t\t"order": ' + orderQuery + '\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}');
			}
			if (mustArray.length) {
				var mustObject = {
					bool: {
						must: mustArray
					}
				};
				shouldArray.push(mustObject);
			}

			var query = {
				type: this.config.type,
				body: {
					"query": {
						"bool": {
							"should": shouldArray,
							"minimum_should_match": 1
						}
					}
				}
			};
			if (aggs) {
				query.body.aggs = aggs;
			}
			if (sortObj && sortObj.length) {
				query.body.sort = sortObj;
			}
			// apply request options
			if (requestOptions && Object.keys(requestOptions).length) {
				for (var reqOption in requestOptions) {
					query.body[reqOption] = requestOptions[reqOption];
				}
			}
			return query;
		}
	}, {
		key: 'nextPage',
		value: function nextPage(channelId) {
			var channelObj = this.channels[channelId];
			var queryOptions = JSON.parse(JSON.stringify(this.channels[channelId].previousSelectedSensor));
			var channelOptionsObj = channelObj.previousSelectedSensor['channel-options-' + channelId];
			var options = {
				size: this.queryOptions[channelId].size,
				from: this.queryOptions[channelId].from + this.queryOptions[channelId].size
			};
			queryOptions['channel-options-' + channelId] = JSON.parse(JSON.stringify(options));
			// queryOptions['channel-options-'+channelId].from += 1;
			this.queryOptions[channelId] = options;
			this.receive('channel-options-' + channelId, channelId, queryOptions);
		}

		// Create the channel by passing depends
		// if depends are same it will create single channel for them

	}, {
		key: 'create',
		value: function create(config, depends) {
			var _this2 = this;

			var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
			var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

			var channelId = btoa(JSON.stringify(depends));
			var optionValues = {
				size: size,
				from: from
			};
			this.queryOptions[channelId] = optionValues;
			this.appbaseConfig[channelId] = this.setAppbaseRef(config);
			depends['channel-options-' + channelId] = optionValues;
			var previousSelectedSensor = _defineProperty({}, 'channel-options-' + channelId, optionValues);
			var obj = {
				key: 'channel-options-' + channelId,
				value: optionValues
			};
			helper.selectedSensor.set(obj);
			if (!this.channels.hasOwnProperty(channelId)) {
				this.channels[channelId] = {
					depends: depends,
					size: size,
					from: from,
					previousSelectedSensor: previousSelectedSensor
				};
				helper.watchForDependencyChange(depends, this.channels[channelId].previousSelectedSensor, this.receive, channelId);
			}
			setTimeout(function () {
				if (depends.hasOwnProperty('aggs')) {
					_this2.receive('aggs', channelId);
				}
			}, 100);
			return {
				channelId: channelId,
				emitter: this.emitter
			};
		}

		// set appbase ref

	}, {
		key: 'setAppbaseRef',
		value: function setAppbaseRef(config) {
			return new Appbase({
				url: 'https://scalr.api.appbase.io',
				appname: config.appbase.appname,
				username: config.appbase.username,
				password: config.appbase.password
			});
		}
	}]);

	return channelManager;
}();

;
var manager = exports.manager = new channelManager();