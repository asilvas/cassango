'use strict';

module.exports = function (req, res) {
  var db = req.app.engine.dbs[req.path.dbId];

  if (!db) {
    res.writeHead(404);
    return void res.end('Db not found');
  }
  // only return config
  res.json(db.config);
};
