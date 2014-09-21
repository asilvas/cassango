'use strict';

module.exports = function (req, res, next) {
  var err = {};
  
  if (!req.locals.db) {
    err.status = 404;
    err.message = 'No db found called "' + req.params.dbId + '"';
    return void next(err);
  }

  if (!req.locals.table) {
    err.status = 404;
    err.message = 'No table found called "' + req.params.tableId + '"';
    return void next(err);
  }

  // only return config
  res.json(req.locals.table.config);
};
