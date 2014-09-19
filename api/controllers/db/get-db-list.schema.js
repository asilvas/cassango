'use strict';

exports.serverLogger = {
  action: require('./get-db-list'),
  spec: {
    method: 'GET',
    path: '/db/list',
    nickname: 'get-db-list',
    summary: 'Get Databases',
    description: '...',
    notes: '...',
    parameters: [

    ]
  }
};
