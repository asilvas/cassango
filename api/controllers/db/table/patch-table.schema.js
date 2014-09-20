'use strict';

exports.serverLogger = {
  action: require('./patch-table'),
  spec: {
    method: 'PATCH',
    path: '/db/{dbId}/table/{tableId}',
    nickname: 'patch-table',
    summary: 'Upsert Table. No, it won\'t wipe out data.',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../resources/db-id'),
      require('../../../resources/table-id'),
      {
        name: 'config',
        description: 'Table configuration',
        defaultValue: JSON.stringify({
          something_goes_here: 'maybe'
        }),
        type: 'string',
        required: true,
        paramType: 'body'
      }
    ]
  }
};
