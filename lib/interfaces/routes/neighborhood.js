'use strict';

const NeighborhoodsController = require('../controllers/NeighborhoodsController');
const Joi = require("joi");

module.exports = {
    name: 'neighborhood',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: "POST",
                path: "/neighborhoods",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Create a new neighborhood",
                    notes: "Create a new neighborhood",
                    tags: ["api", "Neighborhoods"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        payload: Joi.object({
                            name: Joi.string().required().messages({
                                "string.empty": `El nombre es requerido`,
                                "any.required": `El nombre es requerido`,
                            }),
                            reference: Joi.string().required().messages({
                                "string.empty": `La referencia es requerida`,
                                "any.required": `La referencia es requerida`,
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
                    return await NeighborhoodsController.create(req, h);
                },
            },
            {
                method: "PUT",
                path: "/neighborhoods/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update an neighborhood",
                    notes: "Update an neighborhood",
                    tags: ["api", "Neighborhoods"],
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
                            reference: Joi.string().required().messages({
                                "string.empty": `La referencia es requerida`,
                                "any.required": `La referencia es requerida`,
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
                    return await NeighborhoodsController.update(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/neighborhoods/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update the neighborhood status",
                    notes: "Update the neighborhood status",
                    tags: ["api", "Neighborhoods"],
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
                    return await NeighborhoodsController.changeStatus(req, h);
                },
            },
            {
                method: "GET",
                path: "/neighborhoods/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get neighborhood by id",
                    notes: "Get neighborhood by id",
                    tags: ["api", "Neighborhoods"],
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
                    return await NeighborhoodsController.getById(req, h);
                },
            },
            {
                method: "GET",
                path: "/neighborhoods",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get all neighborhoods",
                    notes: "Get all neighborhoods",
                    tags: ["api", "Neighborhoods"],
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
                    return await NeighborhoodsController.get(req, h);
                },
            },
        ]);
    },


};