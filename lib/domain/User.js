'use strict';

module.exports = class {

  constructor(id = null, name, lastname, secondSurname, email, password, role, recoverCode ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.recoverCode = recoverCode;
  }

};