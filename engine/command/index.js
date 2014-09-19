var util = require('util');
var assert = require('assert');

module.exports = Command;

function Command(obj_or_json) {
  if (typeof obj_or_json === 'string') {
    this.fromJSON(obj_or_json);
  } else if (typeof obj_or_json === 'object') {
    this.time = obj_or_json.time || new Date().getTime();
    this.db = obj_or_json.db;
    this.table = obj_or_json.table;
    this.command = obj_or_json.command;
    this.content = obj_or_json.content;
    this.validate();
  } else {
    this.time = new Date().getTime();
  }
}

Command.fromJSON = function(json) {
  return new Command(json);
};

Command.putDocument = function(opts) {
  return new Command({
    time: new Date().getTime(),
    db: opts.db,
    table: opts.table,
    command: 'PutDocument',
    content: opts.content
  });
};

var p = Command.prototype;

p.fromJSON = function(json) {
  util._extend(this, JSON.parse(json));
  this.validate();
};

p.toJSON = function() {
  return JSON.stringify({ time: this.time, db: this.db, table: this.table, command: this.command, content: this.content });
};

p.validate = function() {
  assert.ok(this.time);
  assert.ok(this.db);
  assert.ok(this.table);
  assert.ok(this.command);
  assert.ok(this.content);

  // todo: more validation needed
};

// todo: add support for protobuf