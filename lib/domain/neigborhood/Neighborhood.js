'use strict';

module.exports = class {

  constructor(id = null, name, reference, nameLinkPerson, phones, status) {
    this.id = id;
    this.name = name;
    this.reference = reference;
    this.nameLinkPerson = nameLinkPerson;
    this.phones = phones;
    this.status = status;
  }
};