'use strict';

const fs = require("fs");
const jwt = require('jsonwebtoken');

const AccessTokenManager = require('../../application/security/AccessTokenManager');
const environment = require('../config/environment');
module.exports = class extends AccessTokenManager {
  async verify(decoded, request, MAX_TOKEN_AGE) {
    if (!decoded) {
      console.error(`Invalid JWT token. jwt.decode() failure.`);
      return new Error('Authorization header contains an invalid JWT token.');
    }

    let privateKey = fs.readFileSync(environment.privateKeyRoute);

    return new Promise(function (resolve, reject) {
      jwt.verify(request.auth.token, privateKey, {
        maxAge: MAX_TOKEN_AGE
      },
        function (err, decodedAndVerified) {
          if (err) {
            console.error(`Invalid JWT token. jwt.verify() failed: ${err}.`);
            if (err instanceof jwt.TokenExpiredError) {
              reject(new Error(`Authorization header contains a JWT token that expired at ${err.expiredAt.toISOString()}.`));
            } else {
              reject(new Error('Authorization header contains an invalid JWT token.'));
            }
          }

          // Done - all JWT token claims can now be trusted
          resolve(decodedAndVerified);
        });
    });
  }

  async sign(payload, key) {
    return await jwt.sign(payload, key, { algorithm: 'RS512' })
  }

};