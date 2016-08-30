var {EventEmitter} = require('fbemitter');
export var emitter = new EventEmitter();

class ImmutableQuery {
  constructor() {
    this.shouldArray = [];
    this.filterArray = [];
    this.config = [];
    this.aggs = {};
  }
  setConfig(config) {
    this.config = config;
  }
  addShouldClause(key, value, type, includeGeo=false) {
    if(value===undefined || value===null){
      return;
    }
    var obj = eval(`this.get${type}Object(key, value)`);
    this.shouldArray.push(obj);
    return this.buildQuery(includeGeo, true);
  }

  removeShouldClause(key, value, type, isExecuteQuery=false, includeGeo=false) {
    if(value===undefined || value===null){
      return;
    }
    var index = this.getShouldArrayIndex(key, value, type); 
    if(index >= 0) {
      this.shouldArray.splice(index, 1);
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
    return this.buildQuery();
  }
  buildQuery(includeGeo, isExecuteQuery) {
    this.query = {
      type: this.config.type,
      body: {
        "size": 100,
        "aggs": this.aggs,
        "query": {
          "bool": {
            "must": this.shouldArray
          }
        }
      }
    };
    if (!includeGeo) 
      emitter.emit('change', this.query);
    else {
      this.query.body.query.bool.filter = this.filterArray;
      if(isExecuteQuery) {
        emitter.emit('change', this.query);
      }
    }
    console.log(JSON.stringify(this.query, null, 4));
    return this.query;
  }
  getTermObject(key, value) {
    var term = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
    return { term };
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
  getShouldArrayIndex(key, value, type) {
    var array = this.shouldArray;
    var obj = eval(`this.get${type}Object(key, value)`);
    var encode64 = btoa(JSON.stringify(obj));
    for (var i = 0; i < array.length; i++) {
      if (btoa(JSON.stringify(array[i])) === encode64) {
        return i;
      }
    }
    return -1;
  }
}

export const queryObject = new ImmutableQuery();