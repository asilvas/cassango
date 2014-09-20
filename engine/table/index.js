var fs = require('fs');
var path = require('path');

module.exports = Table;

function Table(db, tableId) {
  this.db = db;
  this.tableId = tableId;
  this.path = path.join(db.path, 'table', tableId);
  this.configFn = path.join(this.path, 'config.json');
  this.config = {};
}

Table.queryTables = function(db, cb) {
  fs.readdir(path.join(db.path, 'table'), function(err, ids) {
    // todo: only return validated folders -- they could be files
    cb(err, ids);
  });
};

Table.createOrUpdate = function(db, tableId, opts, cb) {
  var table = db.tables[tableId];
  if (!table) {
    // create anew
    table = new Table(db, tableId);
    db.tables[tableId] = table;
  }
  table.config = opts; // replace config
  try {
    fs.mkdirSync(table.path);
  } catch (ex) {
    if (ex.toString().indexOf('EEXIST') < 0) {
      throw ex;
    }
    // ignore other failures for now since we allow failure if already exists
  }
  table.saveConfig(cb);
};

var p = Table.prototype;

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
