'use strict';

const ChainsController = require('../controllers/ChainsController');
const Joi = require("joi");

module.exports = {
    name: 'chain',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: "POST",
                path: "/api/chains",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Create a new chain",
                    notes: "Create a new chain",
                    tags: ["api", "Chains"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        payload: Joi.object({
                            name: Joi.string().required().messages({
                                "string.empty": `El nombre es requerido`,
                                "any.required": `El nombre es requerido`,
                            }),
                            address: Joi.string().required().messages({
                                "string.empty": `La dirección es requerida`,
                                "any.required": `La dirección es requerida`,
                            }),
                            nameLinkPerson: Joi.string().required().messages({
                                "string.empty": `El nombre de la persona de enlace es requerido`,
                                "any.required": `El nombre de la persona de enlace es requerido`,
                            }),
                            phones: Joi.array().items(Joi.string().required()).required().messages({
                                "string.empty": `El teléfono es requerido`,
                                "any.required": `El teléfono es requerido`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ChainsController.create(req, h);
                },
            },
            {
                method: "PUT",
                path: "/api/chains/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update an chain",
                    notes: "Update an chain",
                    tags: ["api", "Chains"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        params: Joi.object({
                            id: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `El id es requerido`,
                                "any.required": `El id es requerido`
                            }),
                        }),
                        payload: Joi.object({
                            name: Joi.string().required().messages({
                                "string.empty": `El nombre es requerido`,
                                "any.required": `El nombre es requerido`,
                            }),
                            address: Joi.string().required().messages({
                                "string.empty": `La dirección es requerida`,
                                "any.required": `La dirección es requerida`,
                            }),
                            nameLinkPerson: Joi.string().required().messages({
                                "string.empty": `El nombre de la persona de enlace es requerido`,
                                "any.required": `El nombre de la persona de enlace es requerido`,
                            }),
                            phones: Joi.array().items(Joi.string().required()).required().messages({
                                "string.empty": `El teléfono es requerido`,
                                "any.required": `El teléfono es requerido`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ChainsController.update(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/api/chains/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update the chain status",
                    notes: "Update the chain status",
                    tags: ["api", "Chains"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        params: Joi.object({
                            id: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `El id es requerido`,
                                "any.required": `El id es requerido`
                            }),
                        }),
                        payload: Joi.object({
                            status: Joi.boolean().required().messages({
                                "boolean.empty": `El status es requerido`,
                                "any.required": `El status es requerido`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ChainsController.changeStatus(req, h);
                },
            },
            {
                method: "GET",
                path: "/api/chains/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get chain by id",
                    notes: "Get chain by id",
                    tags: ["api", "Chains"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        params: Joi.object({
                            id: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `El id es requerido`,
                                "any.required": `El id es requerido`
                            }),
                        }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ChainsController.getById(req, h);
                },
            },
            {
                method: "GET",
                path: "/api/chains",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get all chains",
                    notes: "Get all chains",
                    tags: ["api", "Chains"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        query: Joi.object({
                            page: Joi.number().required().messages({
                                "number.empty": `La página es requerida`,
                                "any.required": `La página es requerida`,
                            }),
                            rowsPerPage: Joi.number().required().messages({
                                "number.empty": `Los registros por página son requeridos`,
                                "any.required": `Los registros por página son requeridos`,
                            }),
                            order: Joi.string().optional(),
                            orderBy: Joi.string().optional(),
                            filter: Joi.string().optional(),
                            filterBy: Joi.string().optional(),
                        }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ChainsController.get(req, h);
                },
            },
        ]);
    },


};