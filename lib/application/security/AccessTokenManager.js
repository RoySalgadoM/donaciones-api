module.exports = class {

  async verify(decoded, request, MAX_TOKEN_AGE) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async sign (payload, key) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};