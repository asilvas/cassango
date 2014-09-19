'use strict';

var Command = require('../../../../engine/command');

module.exports = function (req, res, next) {
  var cmd = Command.putDocument({ db: 'testDB', table: req.params.tableId, content: req.body });

  req.app.engine.transLog.write(cmd, function(err) {
    if (err) {
      return next(err);
    }

    res.end();
  });
};
