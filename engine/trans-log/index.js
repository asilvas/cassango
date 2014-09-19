var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var mkdirp = require('mkdirp');

module.exports = TransLog;

function TransLog(engine) {

  this.engine = engine;

}

var p = TransLog.prototype;

p.start = function(cb) {

  // create new transaction log

  this.logPath = path.join(this.engine.storage.path, 'trans-log');
  this.id = uuid.v4();
  this.marker = '\r\n---' + this.id + '---\r\n';
  this.logFilename = path.join(this.logPath, this.id + '.log');
  var self = this;
  mkdirp(this.logPath, function (err) {
    self.file = fs.open(self.logFilename, 'w', function(err, fd) {
      if (err) {
        return void cb(err);
      }
      self.fileHandle = fd;

      cb();
    });
  });

};

p.write = function(cmd, cb) {
  var json = cmd.toJSON();
  var buf = new Buffer(json + this.marker, 'utf8');
  var self = this;
  fs.write(this.fileHandle, buf, 0, buf.length, null, cb);

};

p.readAll = function(cb) {

  //todo: read all available transaction logs



};