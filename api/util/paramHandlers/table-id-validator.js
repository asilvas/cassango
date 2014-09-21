'use strict';

module.exports = function (req, res, next, tableId) {
  var err = {};

  if (!req.locals.db) {
    err.status = 404;
    err.message = 'Cannot find table when no database specified';
    return void next(err);
  }

  req.locals.table = req.locals.db.tables[tableId];

  next();
};

