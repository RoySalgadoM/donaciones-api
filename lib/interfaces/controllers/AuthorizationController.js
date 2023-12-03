'use strict';
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const JwtAccessTokenManager = require("../../infrastructure/security/JwtAccessTokenManager")
const jwtCustom = new JwtAccessTokenManager();
const jwt = require('jsonwebtoken');
const environment = require('../../infrastructure/config/environment');
const MAX_TOKEN_AGE = 60 * 60 * 1000; // 1 hour

module.exports = {

  async authenticate(decoded, request) {
    try {
      console.log("Starting JWT Validation");
      let publicKey = fs.readFileSync(environment.publicKeyRoute);

      let decodedAndVerified = jwt.verify(request.auth.token, publicKey);
      if (decodedAndVerified) {
        return { isValid: true, credentials: decodedAndVerified.email };
      } else {
        console.error("Invalid authentication");
        return { isValid: false };
      }

    } catch (e) {
      console.error(e);
      return { isValid: false };
    }
  },
  async getToken(payload) {
    try {

      let uuid = uuidv4();
      payload.uuid = uuid;
      let privateKey = await fs.readFileSync(environment.privateKeyRoute);
      let tokenGen = await jwtCustom.sign(
        payload,
        privateKey
      );

      return tokenGen;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async verifyToken(token) {
    try {
      let publicKey = fs.readFileSync(environment.publicKeyRoute);
      let decoded = jwt.verify(token, publicKey);
      return decoded;
    } catch (e) {
      throw e;
    }
  }
};