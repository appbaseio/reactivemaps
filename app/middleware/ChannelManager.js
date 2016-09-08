var {EventEmitter} = require('fbemitter');
var helper = require('./helper.js');

class channelManager {
  constructor() {
    this.emitter = new EventEmitter();
    this.channels = {};
    this.receive = this.receive.bind(this);
  }
  setConfig(config) {
    this.config = config;
  }
  
  // Receive: This method will be executed whenever dependency value changes
  // It receives which dependency changes and which channeldId should be affected.
  receive(depend, channelId) {
    let self = this;
    let channelObj = this.channels[channelId];
    let queryObj = this.queryBuild(channelObj.depends, channelObj.previousSelectedSensor);
    // apply search query and emit queryResult
    helper.appbaseRef.search(queryObj).on('data', function(data) {
      self.emitter.emit(channelId, data);
    }).on('error', function(error) {
      console.log(error);
    });
  }

  // queryBuild
  // Builds the query by using depends object and values of sensor
  queryBuild(depends, previousSelectedSensor) {
    let aggs = null;
    let mustArray = [];
    let shouldArray = [];
    for(let depend in depends) {
      if(depend !== 'aggs') {
        let queryObj = null;
        if(depends[depend].defaultQuery) {
          queryObj = depends[depend].defaultQuery(previousSelectedSensor[depend]);
        } else {
          queryObj = singleQuery(depend);
        }
        if(queryObj) {
          if(depends[depend].operation === 'must') {
            mustArray.push(queryObj);
          }
          else if(depends[depend].operation === 'should') {
            shouldArray.push(queryObj);
          }
        }
      } else {
        aggs = aggsQuery(depend);
      }
    }  
    
    function singleQuery(depend) {
      let sensorInfo = helper.selectedSensor.get(depend, 'sensorInfo');
      let s_query = null
      if(previousSelectedSensor[depend]) {
        s_query = {}
        s_query[sensorInfo.queryType] = {};
        s_query[sensorInfo.queryType][sensorInfo.inputData] = previousSelectedSensor[depend];
      }
      return s_query;
    }
    
    function aggsQuery(depend) {
      let aggsObj = depends[depend];
      let order, type;
      if(aggsObj.sort=="count"){
        order = "desc";
        type = "_count";
      }
      else if(aggsObj.sort=="asc"){
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
      return JSON.parse(`{
        "${aggsObj.key}": {
          "terms": {
            "field": "${aggsObj.key}",
            "size": ${aggsObj.size},
            "order": ${orderQuery}
          }
        }
      }`);
    }
    if(mustArray.length) {
        let mustObject = {
          bool: {
            must: mustArray
          }
        };
        shouldArray.push(mustObject);
    }
    let query = {
      type: this.config.type,
      body: {
        "size": 100,
        "query": {
          "bool": {
            "should": shouldArray,
            "minimum_should_match": 1
          }
        }
      }
    };
    if(aggs) {
      query.body.aggs = aggs;
    }
    return query;
  }

  // Create the channel by passing depends
  // if depends are same it will create single channel for them
  create(depends) {
    let channelId = btoa(JSON.stringify(depends));
    if(!this.channels.hasOwnProperty(channelId)) {
      this.channels[channelId] = {
        depends: depends,
        previousSelectedSensor: {}
      };
      helper.watchForDependencyChange(depends, this.channels[channelId].previousSelectedSensor, this.receive, channelId)
    }
    setTimeout(() => {
      if(depends.hasOwnProperty('aggs')) {
        this.receive('aggs', channelId)
      }
    }, 100);
    return {
      channelId: channelId,
      emitter: this.emitter
    }; 
  }

};
export const manager = new channelManager();