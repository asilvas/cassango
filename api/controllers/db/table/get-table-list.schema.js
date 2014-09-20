'use strict';

exports.serverLogger = {
  action: require('./get-table-list'),
  spec: {
    method: 'GET',
    path: '/db/{dbId}/table/list',
    nickname: 'get-table-list',
    summary: 'Get Tables',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../resources/db-id')
    ]
  }
};
