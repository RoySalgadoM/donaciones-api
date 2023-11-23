'use strict';

const UsersController = require('../controllers/UsersController');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/users',
        options: {
          description: 'List all users',
          tags: ['api'],
        },
        handler: UsersController.findUsers,
      },
      {
        method: 'POST',
        path: '/users',
        options: {
          description: 'Create a user',
          tags: ['api'],
        },
        handler: UsersController.createUser,
      },
      {
        method: 'GET',
        path: '/users/{id}',
        options: {
          description: 'Get a user by its {id}',
          tags: ['api'],
        },
        handler: UsersController.getUser,
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        options: {
          description: 'Delete a user',
          tags: ['api'],
        },
        handler: UsersController.deleteUser,
      },
    ]);
  }
};