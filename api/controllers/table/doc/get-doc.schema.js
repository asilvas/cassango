'use strict';

exports.serverLogger = {
  action: require('./get-doc'),
  spec: {
    method: 'GET',
    path: '/table/{tableId}/doc/{docId}',
    nickname: 'get-doc',
    summary: 'Get Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../resources/table-id'),
      require('../../../resources/doc-id')
    ]
  }
};
