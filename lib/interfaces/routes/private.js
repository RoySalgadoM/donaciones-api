'use strict';

module.exports = {
  name: 'private',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/private',
        config: {
          auth: 'jwt',
          description: 'Example of a private resource',
          tags: ['api'],
        },
        handler: (request) => {
          return "Access granted!"
        }
      }
    ]);
  }
};