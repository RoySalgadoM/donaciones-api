'use strict';

const constants = require('./constants');

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
module.exports = (() => {

  const env = process.env.NODE_ENV || 'dev';
  const rootPath = process.cwd();

  const environment = {
    database: {
      dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || 'mongodb://localhost:27017/donaciones',
    },
    email: {
      user: process.env.EMAIL_USER || 'donaciones492@gmail.com',
      password: process.env.EMAIL_KEY || 'hwbkhnbmxccqqvjm',
    },
    env: env,
    privateKeyRoute: `${rootPath}//lib//infrastructure//security//certs//${env}//jwt//private.key`,
    publicKeyRoute: `${rootPath}//lib//infrastructure//security//certs//${env}//jwt//public.key`,
    salt: "$2b$05$PCxBNi11jjHmuflBI3jmxe"
  };

  if (process.env.NODE_ENV === 'test') {
    environment.database = {
      driver: constants.SUPPORTED_DATABASE.IN_MEMORY
    }
  }

  return environment;
})();
