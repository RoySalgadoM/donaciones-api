'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/chain/ChangeStatus');
const Create = require('../../application/use_cases/chain/Create');
const Get = require('../../application/use_cases/chain/Get');
const GetById = require('../../application/use_cases/chain/GetById');
const Update = require('../../application/use_cases/chain/Update');

module.exports = {

  async create(req, h) {
    try {
      const { name, address, nameLinkPerson, phones} = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Create({ name, address, nameLinkPerson, phones }, serviceLocator);

      if (result.error) {
        return Boom.badRequest(result.message);
      }

      let response = {
        statusCode: 200,
        message: result.message,
        data: result.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },
  async update(req, h) {
    try {
      const { id } = req.params;
      const { name, address, nameLinkPerson, phones } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Update({ id, name, address, nameLinkPerson, phones }, serviceLocator);

      if (result.error) {
        return Boom.badRequest(result.message);
      }

      let response = {
        statusCode: 200,
        message: result.message,
        data: result.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },
  async changeStatus(req, h) {
    try {
      const { id } = req.params;
      const { status } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await ChangeStatus({ id, status }, serviceLocator);

      if (result.error) {
        return Boom.badRequest(result.message);
      }

      let response = {
        statusCode: 200,
        message: result.message,
        data: result.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },
  async getById(req, h) {
    try {
      const { id } = req.params;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await GetById({ id }, serviceLocator);

      if (result.error) {
        return Boom.badRequest(result.message);
      }

      let response = {
        statusCode: 200,
        message: result.message,
        data: result.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },
  async get(req, h) {
    try {
      const { page, rowsPerPage, order, orderBy, filter, filterBy } = req.query;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Get({ page, rowsPerPage, order, orderBy, filter, filterBy }, serviceLocator);

      if (result.error) {
        return Boom.badRequest(result.message);
      }

      let response = {
        statusCode: 200,
        message: result.message,
        data: result.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },

};
