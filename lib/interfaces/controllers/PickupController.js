'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/pickup/ChangeStatus');
const Create = require('../../application/use_cases/pickup/Create');
const Get = require('../../application/use_cases/pickup/Get');
const GetById = require('../../application/use_cases/pickup/GetById');

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
    async get(req, h) {
        try {
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const { page, rowsPerPage, order, orderBy, filter, filterBy } = req.query;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Get({ page, rowsPerPage, order, orderBy, filter, filterBy, role, userId }, serviceLocator);

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

    async start(req, h) {
        try {
            const { id } = req.params;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await ChangeStatus({ id, status: 'started' }, serviceLocator);

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
    async end(req, h) {
        try {
            const { id } = req.params;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await ChangeStatus({ id, status: 'ended' }, serviceLocator);

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
    async cancel(req, h) {
        try {
            const { id } = req.params;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await ChangeStatus({ id, status: 'cancelled' }, serviceLocator);

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
