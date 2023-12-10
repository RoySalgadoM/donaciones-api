'use strict';

module.exports = class {

  constructor(id = null, name, date, status, chain, products, generalAnnexes, user) {  
    this.id = id;
    this.name = name;
    this.date = date;
    this.status = status;
    this.chain = chain;
    this.products = products;
    this.generalAnnexes = generalAnnexes;
    this.user = user;
  }
};