'use strict';

module.exports = function (req, res, next) {
  var err = {};
  
  if (!req.locals.db) {
    err.status = 404;
    err.message = 'No db found called "' + req.params.dbId + '"';
    return void next(err);
  }

  var tables = {};
  console.log(req.locals);
  Object.keys(req.locals.db.tables).forEach(function(tableId) {
    var table = req.locals.db.tables[tableId];
    tables[tableId] = table.config;
  });

  // only return configs
  res.json(tables);
};
