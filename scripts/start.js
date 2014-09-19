'use strict';

var routes = require('./routes');
var express = require('express');
var config = require('../config');
var Engine = require('../engine');
var http = require('http');

module.exports = function() {

  var app = express();

  config(function(err, middleware, staticConfig) {
    if (err) {
      logger.error({
        title: 'Flipr failed to load config.',
        description: 'Configuration is required to run. If we cannot load config, we cannot run the app.',
        content: err
      });
      return;
    }
    app.fliprMiddleware = middleware;
    app.config = staticConfig;

    routes(app);

    app.engine = new Engine(staticConfig);

    app.engine.start(function(err) {

      var server = http.createServer(app);
      server.listen(app.config.listener.port, function(){
        var port = server.address().port;
        var host = 'localhost:' + port;

        console.log('Listening on: ' + port);
        process.title = 'CASSANGO @ http://' + host + '/';
      });

    });
  });
};

