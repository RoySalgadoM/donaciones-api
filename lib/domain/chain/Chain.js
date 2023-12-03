'use strict';

module.exports = class {

  constructor(id = null, name, address, nameLinkPerson, phones, status) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.nameLinkPerson = nameLinkPerson;
    this.phones = phones;
    this.status = status;
  }
};