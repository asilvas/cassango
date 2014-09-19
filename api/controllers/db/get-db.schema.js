'use strict';

exports.serverLogger = {
  action: require('./get-db'),
  spec: {
    method: 'GET',
    path: '/db/{dbId}',
    nickname: 'get-db',
    summary: 'Get Database configuration',
    description: '...',
    notes: '...',
    parameters: [
      require('../../resources/db-id')
    ]
  }
};
