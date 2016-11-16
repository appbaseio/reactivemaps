'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    this.receive = this.receive.bind(this);
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
      var self = this;
      var channelObj = this.channels[channelId];
      var queryObj = this.queryBuild(channelObj.depends, channelObj.previousSelectedSensor, channelObj.size);
      var validQuery = true;
      try {
        validQuery = !queryObj.body.aggs && queryObj.body.query.bool.should.length === 0 ? false : true;
      } catch (e) {}

      if (validQuery) {
        // apply search query and emit historic queryResult
        helper.appbaseRef.search(queryObj).on('data', function (data) {
          var obj = {
            method: 'historic',
            data: data
          };
          self.emitter.emit(channelId, obj);
        }).on('error', function (error) {
          console.log(error);
        });
        // apply searchStream query and emit streaming data
        if (this.streamRef[channelId]) {
          this.streamRef[channelId].stop();
        }
        this.streamRef[channelId] = helper.appbaseRef.searchStream(queryObj).on('data', function (data) {
          var obj = {
            method: 'stream',
            data: data
          };
          self.emitter.emit(channelId, obj);
        }).on('error', function (error) {
          console.log(error);
        });
      } else {
        var obj = {
          method: 'historic',
          data: {
            _shards: {},
            hits: {
              hits: []
            }
          }
        };
        self.emitter.emit(channelId, obj);
      }
    }

    // queryBuild
    // Builds the query by using depends object and values of sensor

  }, {
    key: 'queryBuild',
    value: function queryBuild(depends, previousSelectedSensor, size) {
      var aggs = null;
      var mustArray = [];
      var shouldArray = [];
      for (var depend in depends) {
        if (depend !== 'aggs') {
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
        } else {
          aggs = aggsQuery(depend);
        }
      }

      function singleQuery(depend) {
        var sensorInfo = helper.selectedSensor.get(depend, 'sensorInfo');
        var s_query = null;
        if (previousSelectedSensor[depend]) {
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
        var orderQuery = '{ \n        "' + type + '" : "' + order + '" \n      }';
        return JSON.parse('{\n        "' + aggsObj.key + '": {\n          "terms": {\n            "field": "' + aggsObj.key + '",\n            "size": ' + aggsObj.size + ',\n            "order": ' + orderQuery + '\n          }\n        }\n      }');
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
          "size": size,
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
      return query;
    }

    // Create the channel by passing depends
    // if depends are same it will create single channel for them

  }, {
    key: 'create',
    value: function create(depends) {
      var _this = this;

      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      var channelId = btoa(JSON.stringify(depends));
      if (!this.channels.hasOwnProperty(channelId)) {
        this.channels[channelId] = {
          depends: depends,
          size: size,
          previousSelectedSensor: {}
        };
        helper.watchForDependencyChange(depends, this.channels[channelId].previousSelectedSensor, this.receive, channelId);
      }
      setTimeout(function () {
        if (depends.hasOwnProperty('aggs')) {
          _this.receive('aggs', channelId);
        }
      }, 100);
      return {
        channelId: channelId,
        emitter: this.emitter
      };
    }
  }]);

  return channelManager;
}();

;
var manager = exports.manager = new channelManager();