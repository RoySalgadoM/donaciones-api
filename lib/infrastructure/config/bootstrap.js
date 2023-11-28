'use strict';

require('dotenv').config();

const constants = require('./constants');
const environment = require('./environment');

module.exports = {

  async init() {
    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require('../orm/mongoose/mongoose');
    }

    let user = {
      "_id": {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
      "name": "Roy",
      "lastname": "Salgado",
      "secondSurname": "Martinez",
      "email": "roy21rasm@gmail.com",
      "password": "$2b$05$PCxBNi11jjHmuflBI3jmxe9sVe.KPz92HlWWHDpio740B.w2LpWVm",
      "recoverCode": "2OCHFV",
      "phone": "7771144520",
      "status": true,
      "role": {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
    }

    let role = {
      "_id": {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
      "name": "Administrador",
    }

    let linkPerson = {
      "_id": {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
      "name": "Miriam",
      "lastname": "Saucedo",
      "secondSurname": "Bustamante",
      "email": "",
      "phone": "7771144520",
    }

    let neighborhood = {
      "_id": {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
      "street": "Calle 1",
      "number": "123",
      "city": "Cuernavaca",
      "state": "Morelos",
      "cp": "62440",
      linkPerson: {
        "$oid": "655ee1fe277a5b4a11c24d89"
      },
    }


  }
};
