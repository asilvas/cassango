module.exports = State;

function State(engine) {
  this.engine = engine;
  this.indexes = {};
}

var p = State.prototype;

