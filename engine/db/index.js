var fs = require('fs');
var path = require('path');

module.exports = Db;

function Db(engine, dbId) {
  this.engine = engine;
  this.dbId = dbId;
  this.path = path.join(engine.storage.path, 'db', dbId);
  this.configFn = path.join(this.path, 'config.json');
  this.config = {};
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
  db.saveConfig(cb);
};

var p = Db.prototype;

p.start = function(cb) {
  var self = this;
  fs.readFile(this.configFn, { encoding: 'utf8'}, function(err, data) {
    self.config = JSON.parse(data);
    cb(err, self.config);
  })
};

p.saveConfig = function(cb) {
  fs.writeFile(this.configFn, JSON.stringify(this.config), { flag: 'w' }, cb || function() {});
};
