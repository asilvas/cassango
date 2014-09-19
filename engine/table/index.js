module.exports = Table;

function Table(db, tableId) {
  this.db = db;
  this.indexes = {};
}

var p = Table.prototype;

p.loadDefinition = function(cb) {

};
