'use strict';

exports.serverLogger = {
  action: require('./delete-doc'),
  spec: {
    method: 'DELETE',
    path: '/table/{tableId}/doc/{docId}',
    nickname: 'delete-doc',
    summary: 'Delete Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../resources/table-id'),
      require('../../../resources/doc-id')
    ]
  }
};
