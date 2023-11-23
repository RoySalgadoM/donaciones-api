'use strict';

module.exports = class {

  persist(domainUser) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  merge(domainUser) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  remove(userId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  get(userId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByEmail(email) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  find() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByEmailAndPassword(email, password) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  updateRecoverCode(email, recoverCode) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByCodeAndUpdate(code, updated) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByEmailAndPasswordAndUpdate(code, updated) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
