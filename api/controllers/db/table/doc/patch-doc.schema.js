'use strict';

exports.serverLogger = {
  action: require('./patch-doc'),
  spec: {
    method: 'PATCH',
    path: '/db/{dbId}/table/{tableId}/doc/{docId}',
    nickname: 'patch-doc',
    summary: 'Upsert Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../../resources/db-id'),
      require('../../../../resources/table-id'),
      require('../../../../resources/doc-id'),
      {
        name: 'document',
        description: 'Document data',
        defaultValue: JSON.stringify({
          oldField: 'newValue',
          newField: 'newValue'
        }),
        type: 'string',
        required: true,
        paramType: 'body'
      }
    ]
  }
};
