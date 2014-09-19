'use strict';
//POST /batch

var batchRequest = require('batch-request');
var config = require('../../../config/index')['batch-request'];

module.exports = batchRequest(config);
