class ImmutableQuery {

  constructor() {
    this.shouldArray = [];
  }
  addShouldClause(key, value) {
    this.shouldArray.push(this.getTermQuery(key, value));
    console.log(this.getTermQuery(key, value))
    return this.buildQuery();
  }
  removeShouldClause(key, value) {
    this.shouldArray.push(this.getTermQuery(key, value));
    console.log(this.getTermQuery(key, value))
    return this.buildQuery();
  }
  buildQuery() {
    this.query = {
      "query": {
        "bool": {
          "should": this.shouldArray
        }
      }
    };
    console.log(JSON.stringify(this.query));
    return this.query;
  }
  getTermQuery(key, value) {
    var term = JSON.parse(`{"${key}":` + value + '}');
    return { term };
  }
}

export const queryObject = new ImmutableQuery();