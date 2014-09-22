'use strict';

var Command = require('../../../../../engine/command');

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

  var cmd = Command.putDocument({ db: req.params.dbId, table: req.params.tableId, partKey: req.params.partKey, rowKey: req.params.rowKey, content: req.body });

  req.app.engine.transLog.write(cmd, function(err) {
    if (err) {
      return next(err);
    }

    res.end();
  });
};
