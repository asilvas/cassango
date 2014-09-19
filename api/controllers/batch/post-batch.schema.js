'use strict';

exports.batch = {
  action: require('./post-batch'),
  spec: {
    method: 'POST',
    path: '/batch',
    nickname: 'batch',
    summary: 'A request containing one or more sub requests',
    description: 'Performs a batch operation.',
    notes: '*** EXPERIMENTAL, USE AT YOUR OWN RISK *** For full documentation, see: http://batch-request.socialradar.com/',
    parameters: [{
      name: 'json',
      description: 'See documentation for usage: http://batch-request.socialradar.com/',
      defaultValue: JSON.stringify({
        test: {
          url: '/v1/features'
        }
      }),
      type: 'string',
      required: true,
      paramType: 'body'
    }]
  }
};
