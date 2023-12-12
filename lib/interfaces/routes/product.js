'use strict';

const ProductsController = require('../controllers/ProductsController');
const Joi = require("joi");

module.exports = {
    name: 'product',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: "POST",
                path: "/api/products",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Create a new product",
                    notes: "Create a new product",
                    tags: ["api", "Products"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        payload: Joi.object({
                            name: Joi.string().required().messages({
                                "string.empty": `El nombre es requerido`,
                                "any.required": `El nombre es requerido`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ProductsController.create(req, h);
                },
            },
            {
                method: "PUT",
                path: "/api/products/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update an product",
                    notes: "Update an product",
                    tags: ["api", "Products"],
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
                            })
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ProductsController.update(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/api/products/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update the product status",
                    notes: "Update the product status",
                    tags: ["api", "Products"],
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
                    return await ProductsController.changeStatus(req, h);
                },
            },
            {
                method: "GET",
                path: "/api/products/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get product by id",
                    notes: "Get product by id",
                    tags: ["api", "Products"],
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
                    return await ProductsController.getById(req, h);
                },
            },
            {
                method: "GET",
                path: "/api/products",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get all products",
                    notes: "Get all products",
                    tags: ["api", "Products"],
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
                            status: Joi.string().required().messages({
                                "string.empty": `El status es requerido`,
                                "any.required": `El status es requerido`,
                            }),
                        }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await ProductsController.get(req, h);
                },
            },
        ]);
    },


};