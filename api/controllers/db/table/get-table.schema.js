'use strict';

exports.serverLogger = {
  action: require('./get-table'),
  spec: {
    method: 'GET',
    path: '/db/{dbId}/table/{tableId}',
    nickname: 'get-table',
    summary: 'Get Table configuration',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../resources/db-id'),
      require('../../../resources/table-id')
    ]
  }
};
