export default class Model {

    constructor(data = []) {
      this.$collection = []

      if (data.length) {
        this.record(data);
      }
    }
  
    record(data) {
      this.$collection.push( ...data )
    }
    all() { 
      // map will return a new array, Object.assign will merge 2 objects
      // so this merges the entry with an empty object.
      // therefore completely detached from original data
      return this.$collection.map(entry => Object.assign({}, entry));
    }
    update() { }
    find() { }
  }