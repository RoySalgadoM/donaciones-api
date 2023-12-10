'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/product/ChangeStatus');
const Create = require('../../application/use_cases/product/Create');
const Get = require('../../application/use_cases/product/Get');
const GetById = require('../../application/use_cases/product/GetById');
const Update = require('../../application/use_cases/product/Update');

module.exports = {

  async create(req, h) {
    try {
      const { name } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Create({ name }, serviceLocator);

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
      const { name } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Update({ id, name }, serviceLocator);

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
      const { page, rowsPerPage, order, orderBy, filter, filterBy, status } = req.query;

      const serviceLocator = req.server.app.serviceLocator;
      const result = await Get({ page, rowsPerPage, order, orderBy, filter, filterBy, status }, serviceLocator);

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
