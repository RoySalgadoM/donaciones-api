'use strict';

module.exports = class {

  create(name) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  update(id, name) {
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
};
