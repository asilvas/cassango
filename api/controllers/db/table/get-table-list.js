'use strict';

module.exports = function (req, res) {
  var tables = {};
  console.log(req.locals);
  Object.keys(req.locals.db.tables).forEach(function(tableId) {
    var table = req.locals.tables[tableId];
    tables[tableId] = table.config;
  });

  // only return configs
  res.json(tables);
};
