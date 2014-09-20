'use strict';

exports.serverLogger = {
  action: require('./delete-doc'),
  spec: {
    method: 'DELETE',
    path: '/db/{dbId}/table/{tableId}/doc/{docId}',
    nickname: 'delete-doc',
    summary: 'Delete Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../../resources/db-id'),
      require('../../../../resources/table-id'),
      require('../../../../resources/doc-id')
    ]
  }
};
