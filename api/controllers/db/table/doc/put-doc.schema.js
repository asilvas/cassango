'use strict';

exports.serverLogger = {
  action: require('./put-doc'),
  spec: {
    method: 'PUT',
    path: '/db/{dbId}/table/{tableId}/doc/{docId}',
    nickname: 'put-doc',
    summary: 'Replace Document',
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
          oldField: 'oldValue',
          someOtherField: 'oldValue'
        }),
        type: 'string',
        required: true,
        paramType: 'body'
      }
    ]
  }
};
