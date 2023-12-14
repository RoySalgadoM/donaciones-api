'use strict';

const Boom = require('@hapi/boom');
const ChangeStatus = require('../../application/use_cases/delivery/Start');
const Create = require('../../application/use_cases/delivery/Create');
const Get = require('../../application/use_cases/delivery/Get');
const GetById = require('../../application/use_cases/delivery/GetById');
const End = require('../../application/use_cases/delivery/End');
const Cancel = require('../../application/use_cases/delivery/Cancel');
const Update = require('../../application/use_cases/delivery/Update');

const MongooseDelivery = require('../../infrastructure/orm/mongoose/schemas/Delivery');
const objectId = require('mongoose').Types.ObjectId;

module.exports = {

    async create(req, h) {
        try {
            const { name, routes, user, date } = req.payload;
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Create({ name, routes, user, date, role, userId }, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para crear una entrega"){
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
    async update(req, h) {
        try {
            const { id } = req.params;
            const { name, routes, user, date } = req.payload;
            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Update({ id, name, routes, user, date, role, userId }, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para editar una entrega"){
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
    async getPendients(req, h) {
        try {
            let userId = req.auth.artifacts.decoded.payload.id;

            let totalPendings = await MongooseDelivery.count({ "user._id": objectId(userId), status: { $in: ['Pendiente'] } });

            let response = {
                statusCode: 200,
                message: "Se ha obtenido el total de entregas pendientes",
                data: {
                    count: totalPendings
                }
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
                if(result.message === "El usuario no tiene permisos para iniciar una entrega"){
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
            const { routes, dateEnd } = req.payload;

            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await End({ id, routes, dateEnd, role, userId}, serviceLocator);

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
            const { generalAnnexes, dateEnd } = req.payload;

            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Cancel({ id, generalAnnexes, dateEnd, role, userId }, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para cancelar la entrega a una colonia"){
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
    async cancelRoute(req, h) {
        try {
            const { id } = req.params;
            const { generalAnnexes } = req.payload;

            let role = req.auth.artifacts.decoded.payload.role;
            let userId = req.auth.artifacts.decoded.payload.id;

            const serviceLocator = req.server.app.serviceLocator;
            const result = await Cancel({ id, generalAnnexes, role, userId }, serviceLocator);

            if (result.error) {
                if(result.message === "El usuario no tiene permisos para cancelar una entrega"){
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

};
