'use strict';

var Db = require('../../../engine/db');

module.exports = function (req, res, next) {
  Db.createOrUpdate(req.app.engine, req.params.dbId, req.body, function(err, db) {
    if (err) {
      return void next(err);
    }

    res.end();
  });
};
