'use strict';

var glob = require('glob');
var express = require('express');
var swagger = require('swagger-node-express');
var fs = require('fs');
var path = require('path');
var cookie = require('cookie');

function Swagger() {
}

Swagger.prototype.setupSwagger = function(app) {
  this.swaggerInstance = swagger.createNew();

  app.set('x-powered-by', 'CASSANGO');

  app.use(function(req, res, next) { req.locals = {}; next(); }); // todo: is this needed?
  app.param('dbId', require('./util/paramHandlers/db-id-validator'));
  app.param('tableId', require('./util/paramHandlers/table-id-validator'));

  this.swaggerInstance.setAppHandler(app);

  this.addModels();

  this.addResources();

  // Add any custom headers here.
  this.swaggerInstance.setHeaders = function(res) {
    res.header('Content-Type', 'application/json; charset=utf-8');
  };

  this.swaggerInstance.configureSwaggerPaths('', '/api-docs', '');
  this.swaggerInstance.configure('/', 'v1');

  // Serve up swagger ui at /docs via static route
  var p = __dirname + '/swagger-ui/';

  var docsHandler = express.static(p);
  var swaggerIndexHtml;

  app.get('/', function(req, res) {
    res.redirect(302, '/docs/');
  });

  /* For the swagger root file, instead of pulling in a templating engine for 1 use case, we'll just do a simple
     string replace for now. Can always improve later.
  */
  app.get('/docs/', function(req, res) {
    if (/\/docs$/.test(req.url) === true) { // express static barfs on root url w/o trailing slash
      return res.redirect(302, req.url + '/');
    }

    if (!swaggerIndexHtml) {
      // block for documentation...
      swaggerIndexHtml = fs.readFileSync(path.resolve(__dirname, './swagger-ui/index.html'), 'utf8');
    }

    res.end(swaggerIndexHtml);
  });

  app.get('/docs*', function(req, res, next) {

    // take off leading /docs so that connect locates file correctly
    var url = '/docs';
    req.url = req.url.substr(url.length);

    return docsHandler(req, res, next);
  });
};

Swagger.prototype.addResources = function() {
  var self = this;
  var resourcePaths = glob.sync('./controllers/**/*.schema.js', {
    cwd: __dirname
  });

  resourcePaths.forEach(function(resourcePath) {
    var resource = require(resourcePath);
    self.swaggerInstance.discover(resource);
  });
};

Swagger.prototype.addModels = function() {
  var self = this;

  try {
    //Have to do models.models because addModels
    //expects it in that format.
    var models = {
      models: require('./models')
    };
    self.swaggerInstance.addModels(models);
  } catch (e) {
    //We don't want to throw any errors if models
    //don't exist.
  }

};

module.exports = Swagger;
