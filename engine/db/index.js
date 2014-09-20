var fs = require('fs');
var path = require('path');
var async = require('async');
var Table = require('../table');

module.exports = Db;

function Db(engine, dbId) {
  this.engine = engine;
  this.dbId = dbId;
  this.path = path.join(engine.storage.path, 'db', dbId);
  this.configFn = path.join(this.path, 'config.json');
  this.config = {};
  this.tables = {};
}

Db.queryDbs = function(engine, cb) {
  fs.readdir(path.join(engine.storage.path, 'db'), function(err, dbIds) {
    // todo: only return validated folders -- they could be files
    cb(err, dbIds);
  });
};

Db.createOrUpdate = function(engine, dbId, opts, cb) {
  var db = engine.dbs[dbId];
  if (!db) {
    // create anew
    db = new Db(engine, dbId);
    engine.dbs[dbId] = db;
  }
  db.config = opts; // replace config
  try {
    fs.mkdirSync(db.path);
  } catch (ex) {
    if (ex.toString().indexOf('EEXIST') < 0) {
      throw ex;
    }
    // ignore other failures for now since we allow failure if already exists
  }
  try {
    fs.mkdirSync(path.join(db.path, 'table'));
  } catch (ex) {
    if (ex.toString().indexOf('EEXIST') < 0) {
      throw ex;
    }
    // ignore other failures for now since we allow failure if already exists
  }
  db.saveConfig(cb);
};

var p = Db.prototype;

p.start = function(cb) {
  var self = this;
  fs.readFile(this.configFn, { encoding: 'utf8'}, function(err, data) {
    self.config = JSON.parse(data);

    try {
      fs.mkdirSync(path.join(self.path, 'table'));
    } catch (ex) {
      if (ex.toString().indexOf('EEXIST') < 0) {
        throw ex;
      }
      // ignore other failures for now since we allow failure if already exists
    }

    var tasks = [];

    // query & load tables
    Table.queryTables(self, function(err, ids) {
      ids.forEach(function(id) {
        var table = new Table(self, id);
        self.tables[id] = table;
        tasks.push((function(table) {
          return function(cb) {
            table.start(cb); // return after table has started
          }
        })(table));
      });
    });

    async.parallel(tasks, cb);
  })
};

p.saveConfig = function(cb) {
  fs.writeFile(this.configFn, JSON.stringify(this.config), { flag: 'w' }, cb || function() {});
};
