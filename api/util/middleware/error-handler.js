/*jshint unused:vars*/
//This is needed to keep the next param in the errorHandler function
//For some reason, the middleware won't function correctly without it.
'use strict';

var _ = require('lodash');
var hostname = require('os').hostname();
var processId = process.pid;
var uuid = require('uuid');

module.exports = function errorHandler(err, req, res, next) {
  var requestId = req.id || req.header('x-request-id') || uuid.v4();
  var errDefault = {
    name: err.name || 'HttpError',
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    detail: _.assign({}, err.detail || {}, {
      original: err,
      diagnostics: _.assign({}, err.detail && err.detail.diagnostics || {}, {
        request: {
          id: requestId,
          url: req.url,
          method: req.method,
          headers: _.omit(req.headers, ['authorization', 'cookie']),
          jwt: req.jwt || null
        },
        server: {
          host: hostname,
          pid: processId
        }
      })
    })
  };

  if (_.isString(err))
    err = _.merge(errDefault, { message: err });
  else if (_.isNumber(err))
    err = _.merge(errDefault, { status: err });
  else if (_.isArray(err))
    err = errDefault;
  else
    err = _.merge(errDefault, _.pick(err, [
      'stack',
      'code',
      'userMessage',
      'userLocale'
    ]));

  //send error to the client, without stack information
  var omitStack = _.partialRight(_.omit, 'stack');
  var errWithoutStack = _.cloneDeep(err, omitStack);
  errWithoutStack.detail = omitStack(errWithoutStack.detail);
  res.send(errWithoutStack.status, { error: errWithoutStack });

  //log the error
  var logTitle = 'wsb-api-error';
  if (err.status >= 500) {
    console.error({
      title: logTitle,
      description: 'delivered server-error response to client',
      content: err
    });
  } else {
    console.log({
      title: logTitle,
      description: 'delivered error response to client',
      content: errWithoutStack
    });
  }
};
