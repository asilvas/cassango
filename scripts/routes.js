'use strict';

var express = require('express');
var registerRoutes = require('../api/util/register-routes');
var http = require('http');
var https = require('https');

process.env.APP_NAME = 'cassango';

module.exports = routes;

http.globalAgent.maxSockets = 1000;
https.globalAgent.maxSockets = 1000;

function routes(app) {

  app.use('/public', express.static(__dirname + '/api/static/public'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  app.enable('trust proxy');

  //We use all instead of use because we need req
  //properties set up by app.param handlers.
  //MUST be before route wireup.
  //app.all('*', middleware);

  registerRoutes(app);

  app.use(require('../api/util/middleware/error-handler'));
}
