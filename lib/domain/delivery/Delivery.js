'use strict';

module.exports = class {

  constructor(id = null, name, routes, user, date, generalAnnexes, status) {  
    this.id = id;
    this.name = name;
    this.routes = routes;
    this.user = user;
    this.date = date;
    this.generalAnnexes = generalAnnexes;
    this.status = status;
  }
};