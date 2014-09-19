var util = require('util');
var assert = require('assert');

module.exports = Command;

function Command(obj_or_json) {
  if (typeof obj_or_json === 'string') {
    this.fromJSON(obj_or_json);
  } else if (typeof obj_or_json === 'object') {
    this.command = obj_or_json.command;
    this.content = obj_or_json.content;
    this.validate();
  }
}

Command.fromJSON = function(json) {
  return new Command(json);
};

Command.putDocument = function(opts) {
  return new Command({
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
  return JSON.stringify({ command: this.command, content: this.content });
};

p.validate = function() {
  assert.ok(this.command);
  assert.ok(this.content);

  // todo: more validation needed
};

// todo: add support for protobuf