var {EventEmitter} = require('fbemitter');
export var emitter = new EventEmitter();

class ImmutableQuery {
  constructor() {
    this.shouldArray = [];
    this.filterArray = [];
    this.config = [];
  }
  setConfig(config) {
    this.config = config.appbase;
  }
  addShouldClause(key, value) {
    this.shouldArray.push(this.getKeyValueObject(key, value));
    return this.buildQuery();
  }
  updateGeoFilter(key, boundingBoxCoordinates) {
    var geoObject = JSON.parse(`{"${key}":` + JSON.stringify(boundingBoxCoordinates) + '}');
    this.filterArray[0] = { geo_bounding_box: geoObject };
    return this.buildQuery(true);
  }
  removeShouldClause(key, value) {
    var index = this.getShouldArrayIndex(key, value);
    this.shouldArray.splice(index, 1);
    return this.buildQuery();
  }
  buildQuery(geo) {
    this.query = {
      type: this.config.type,
      body: {
        "size": 100,
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
  getKeyValueObject(key, value) {
    var term = JSON.parse(`{"${key}":` + JSON.stringify(value) + '}');
    return { term };
  }
  getShouldArrayIndex(key, value) {
    var array = this.shouldArray
    var encode64 = btoa(JSON.stringify(this.getKeyValueObject(key, value)));
    for (var i = 0; i < array.length; i++) {
      if (btoa(JSON.stringify(array[i])) === encode64) {
        return i;
      }
    }
    return -1;
  }
}

export const queryObject = new ImmutableQuery();