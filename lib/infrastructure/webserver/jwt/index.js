'use strict';
const hapiAuthJWT = require("hapi-auth-jwt2");
const AuthorizationController = require('../../../interfaces/controllers/AuthorizationController');

module.exports = {
  name: 'oauth',
  version: '1.0.0',
  register: (server) => {

    server.register(hapiAuthJWT);
    server.auth.strategy("jwt", "jwt", {
      verify: AuthorizationController.authenticate,
      tokenType: "bearer",
      complete: true,
    });
    server.auth.default("jwt");
  }
};
