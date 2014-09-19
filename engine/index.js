var TransLog = require('./trans-log');
var State = require('./state');
var path = require('path');
var del = require('del');
var mkdirp = require('mkdirp');
var async = require('async');
var Db = require('./db');

module.exports = Engine;


function Engine(config) {

  this.config = config;
  this.dbs = {};
  this.state = new State(this);
  this.storage = {
    path: path.join(config.storage.path, 'cassango', config.node.id)
  };

  this.transLog = new TransLog(this);

}

var p = Engine.prototype;

p.start = function(cb) {
  var self = this;
  self.dbs = [];
  async.series([
    function(cb) {
      mkdirp(self.storage.path, cb);
    },
    function(cb) {
      mkdirp(path.join(self.storage.path, 'db'), cb);
    },
    function(cb) {
      Db.queryDbs(self, function(err, dbIds) {
        dbIds.forEach(function(id) {
          self.dbs[id] = new Db(self, id);
        });

        cb(err);
      });
    },
    function(cb) {
      var tasks = [];
      Object.keys(self.dbs).forEach(function(dbId) {
        var db = self.dbs[dbId];
        tasks.push((function(db) {
          return function(cb) {
            db.start(cb);
          };
        })(db));
      });

      // start all db's
      async.parallel(tasks, cb);
    },
    function(cb) {
      self.transLog.start(cb);
    }
  ], function(err, results) {
    cb(err);
  });

};
