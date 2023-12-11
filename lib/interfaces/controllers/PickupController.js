'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/pickup/ChangeStatus');
const Create = require('../../application/use_cases/pickup/Create');
const Get = require('../../application/use_cases/pickup/Get');
const GetById = require('../../application/use_cases/pickup/GetById');
const End = require('../../application/use_cases/pickup/End');

module.exports = {

    async create(req, h) {
        try {
            const { name, chain, products, user, date } = req.payload;
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Create({ name, chain, products, user, date, role, userId }, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para crear una recolección"){
                    return Boom.forbidden(result.message);
                }
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
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const { id } = req.params;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await GetById({ id, role, userId }, serviceLocator);

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
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await ChangeStatus({ id, status: 'En proceso' , role, userId}, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para iniciar una recolección"){
                    return Boom.forbidden(result.message);
                }
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
            const { products } = req.payload;

            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await End({ id, products, role, userId, status: 'Finalizada'}, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para finalizar una recolección"){
                    return Boom.forbidden(result.message);
                }
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
