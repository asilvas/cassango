'use strict';

exports.serverLogger = {
  action: require('./put-doc'),
  spec: {
    method: 'PUT',
    path: '/db/{dbId}/table/{tableId}/doc/{partKey}/{rowKey}',
    nickname: 'put-doc',
    summary: 'Replace Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../../resources/db-id'),
      require('../../../../resources/table-id'),
      require('../../../../resources/part-key'),
      require('../../../../resources/row-key'),
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
