'use strict';

module.exports = function (req, res, next, dbId) {
  req.locals.db = req.app.engine.dbs[dbId];

  next();
};

