'use strict';

module.exports = function (req, res, next) {
  var err = {};
  
  if (!req.locals.db) {
    err.status = 404;
    err.message = 'No database found called "' + req.params.dbId + '"';
    return void next(err);
  }

  // only return config
  res.json(req.locals.db.config);
};
