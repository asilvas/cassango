'use strict';

module.exports = function (req, res) {
  // only return config
  res.json(res.locals.table.config);
};
