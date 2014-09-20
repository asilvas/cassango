'use strict';

module.exports = function (req, res, next, dbId) {
  var db = req.app.engine.dbs[dbId];

  if (!db) {
    var err = {};
    err.status = 404;
    err.message = 'No database found called "' + dbId + '"';
    return void next(err);
  }

  res.locals.db = db;

  next();
};

