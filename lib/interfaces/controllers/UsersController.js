'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/user/ChangeStatus');
const Create = require('../../application/use_cases/user/Create');
const Get = require('../../application/use_cases/user/Get');
const GetById = require('../../application/use_cases/user/GetById');
const Update = require('../../application/use_cases/user/Update');

module.exports = {

  async create(req, h) {
    try {
      const { name, lastname, secondSurname, email, password, role, phone } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const user = await Create({ name, lastname, secondSurname, email, password, role, phone }, serviceLocator);

      if (user.error) {
        return Boom.badRequest(user.message);
      }

      let response = {
        statusCode: 200,
        message: user.message,
        data: user.data
      }

      return h.response(response);

    } catch (error) {
      return Boom.badImplementation(error);
    }
  },
  async update(req, h) {
    try {
      const { id } = req.params;
      const { name, lastname, secondSurname, role, phone } = req.payload;

      const serviceLocator = req.server.app.serviceLocator;
      const user = await Update({ id, name, lastname, secondSurname, role, phone }, serviceLocator);

      if (user.error) {
        return Boom.badRequest(user.message);
      }

      let response = {
        statusCode: 200,
        message: user.message,
        data: user.data
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

};
