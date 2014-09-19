'use strict';

exports.serverLogger = {
  action: require('./patch-db'),
  spec: {
    method: 'PATCH',
    path: '/db/{dbId}',
    nickname: 'patch-db',
    summary: 'Upsert DB. No, it won\'t wipe out data.',
    description: '...',
    notes: '...',
    parameters: [
      require('../../resources/db-id'),
      {
        name: 'config',
        description: 'DB configuration',
        defaultValue: JSON.stringify({
          users: {}
        }),
        type: 'string',
        required: true,
        paramType: 'body'
      }
    ]
  }
};
