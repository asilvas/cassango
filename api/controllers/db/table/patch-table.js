'use strict';

var Table = require('../../../../engine/table');

module.exports = function (req, res, next) {
  var err = {};
  
  if (!req.locals.db) {
    err.status = 404;
    err.message = 'No db found called "' + req.params.dbId + '"';
    return void next(err);
  }

  Table.createOrUpdate(req.locals.db, req.params.tableId, req.body, function(err, table) {
    if (err) {
      return void next(err);
    }

    res.end();
  });
};
