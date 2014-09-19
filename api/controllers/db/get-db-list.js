'use strict';

module.exports = function (req, res) {
  var dbs = {};
  Object.keys(req.app.engine.dbs).forEach(function(dbId) {
    var db = req.app.engine.dbs[dbId];
    dbs[dbId] = db.config;
  });

  // only return configs
  res.json(dbs);
};
