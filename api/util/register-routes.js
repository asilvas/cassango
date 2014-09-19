'use strict';

var Swagger = require('../swagger');

module.exports = function(app) {
  var swagger = new Swagger();
  swagger.setupSwagger(app);
};