'use strict';

var flipr = require('flipr');

module.exports = setupFlipr;

var options = {
  folderPath: __dirname,
  envLocalFileName: 'local.yaml',
  envFileNameMask: '%s.yaml',
  envFileNameMap: {
    dev: 'dev',
    development: 'dev',
    test: 'test',
    qa: 'test',
    staging: 'prod',
    master: 'prod',
    prod: 'prod',
    production: 'prod'
  },
  envVariable: 'NODE_ENV'
};

function setupFlipr(cb) {
  var middleware = flipr.init(options);
  flipr(function(err, config){
    if(err)
      return void cb(err);
    cb(null, middleware, config);
  });
}