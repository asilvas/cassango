'use strict';

var Table = require('../../../../engine/table');

module.exports = function (req, res, next) {
  Table.createOrUpdate(req.locals.db, req.params.tableId, req.body, function(err, table) {
    if (err) {
      return void next(err);
    }

    res.end();
  });
};
