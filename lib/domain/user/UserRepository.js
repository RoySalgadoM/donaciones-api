'use strict';

module.exports = class {

  create(name, lastname, secondSurname, email, password, role, phone) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  update(id, name, lastname, secondSurname, role, phone) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  changeStatus(id, status) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(id) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  get(page, rowsPerPage, order, orderBy, filter, filterBy) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByEmail(email) {
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
