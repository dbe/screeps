// Interface:
// .get(key) -> value :: int
// .inc(key) -> newValue :: int
// .dec(key) -> newValue :: int
// Map which keeps counts with convieniet increment and decrement methods which automatically intialize a key to 0 if it didn't exist before.

class CountMap {
  constructor () {
    this.map = {};
  }

  get (key) {
    return this.map[key];
  }

  inc (key) {
    if (this.map[key] === undefined) {
      this.map[key] = 0;
    }

    return ++this.map[key];
  }

  dec (key) {
    if (this.map[key] === undefined) {
      this.map[key] = 0;
    }

    return --this.map[key];
  }
}

export default CountMap;
