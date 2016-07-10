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
    this.config = config.appbase;
  }
  addShouldClause(key, value, type) {
    var obj = eval(`this.get${type}Object(key, value)`);
    this.shouldArray[0] = obj;
    return this.buildQuery();
  }
  updateGeoFilter(key, boundingBoxCoordinates) {
    var geoObject = JSON.parse(`{"${key}":` + JSON.stringify(boundingBoxCoordinates) + '}');
    this.filterArray[0] = { geo_bounding_box: geoObject };
    return this.buildQuery(true);
  }
  addAggregation(key, size=10) {
    this.aggs = JSON.parse(`{
      "${key}": {
        "terms": {
          "field": "${key}",
          "size": ${size}
        }
      }
    }`);
    return this.buildQuery();
  }
  removeShouldClause(key, value, type) {
    var index = this.getShouldArrayIndex(key, value, type);
    this.shouldArray.splice(index, 1);
    return this.buildQuery();
  }
  buildQuery(geo) {
    this.query = {
      type: this.config.type,
      body: {
        "size": 100,
        "aggs": this.aggs,
        "query": {
          "bool": {
            "must": this.shouldArray,
            "filter": this.filterArray
          }
        }
      }
    };
    if (!geo)
      emitter.emit('change', this.query);
    return this.query;
  }
  getTermObject(key, value) {
    var term = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
    return { term };
  }
  getRangeObject(key, value) {
    var rangeObj = {
      "gte": value.min,
      "lte": value.max
    };
    var range = JSON.parse(`{"${key}":` + JSON.stringify(rangeObj) + '}');
    console.log(JSON.stringify(range));
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