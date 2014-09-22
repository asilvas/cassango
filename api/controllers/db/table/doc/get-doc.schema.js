'use strict';

exports.serverLogger = {
  action: require('./get-doc'),
  spec: {
    method: 'GET',
    path: '/db/{dbId}/table/{tableId}/doc/{partKey}/{rowKey}',
    nickname: 'get-doc',
    summary: 'Get Document',
    description: '...',
    notes: '...',
    parameters: [
      require('../../../../resources/db-id'),
      require('../../../../resources/table-id'),
      require('../../../../resources/part-key'),
      require('../../../../resources/row-key')
    ]
  }
};
