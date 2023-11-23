'use strict';

const HelloController = require('../controllers/HelloController');

module.exports = {
  name: 'hello',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/hello',
        config: {
          auth: false,
          description: 'Return "Hello World!"',
          tags: ['api'],
        },
        handler: HelloController.sayHelloWorld,
      },
      {
        method: 'GET',
        path: '/hello/{name}',
        config:{
          auth: false,
          description: 'Return "Hello {name}!"',
          tags: ['api'],
        },
        handler: HelloController.sayHelloPerson,
      }
    ]);
  }
};