var {EventEmitter} = require('fbemitter');
export var emitter = new EventEmitter();

class ImmutableQuery {

  constructor() {
    this.shouldArray = [];
  }
  addShouldClause(key, value) {
    this.shouldArray.push(this.getTermQuery(key, value));
    return this.buildQuery();
  }
  removeShouldClause(key, value) {
    var index = this.getShouldArrayIndex(key, value);
    this.shouldArray.splice(index, 1);
    return this.buildQuery();
  }
  buildQuery(geo) {
    this.query = {
      "query": {
        "bool": {
          "should": this.shouldArray
        }
      }
    };
    emitter.emit('change', this.query);
    if(!geo)
      emitter.emit('change', this.query);
    return this.query;
  }
  getTermQuery(key, value) {
    var term = JSON.parse(`{"${key}":"` + value + '"}');
    return { term };
  }
  getShouldArrayIndex(key, value){
    var array = this.shouldArray 
    var encode64 = btoa(JSON.stringify(this.getTermQuery(key,value)));
    for(var i = 0; i < array.length; i++) {
        if (btoa(JSON.stringify(array[i])) === encode64){
          return i;
        }
    }
    return -1;
  }
}

export const queryObject = new ImmutableQuery();