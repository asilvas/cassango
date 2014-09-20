'use strict';

module.exports = function (req, res, next, tableId) {
  var err = {};

  if (!res.locals.db) {
    err.status = 404;
    err.message = 'Cannot find table when no database specified';
    return void next(err);
  }

  var table = res.locals.db.tables[tableId];
  if (!table) {
    err.status = 404;
    err.message = 'No table found called "' + tableId + '"';
    return void next(err);
  }

  res.locals.table = table;

  next();
};

