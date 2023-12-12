'use strict';

const DeliveryController = require('../controllers/DeliveryController');
const Joi = require("joi");

module.exports = {
    name: 'deliveries',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: "GET",
                path: "/deliveries",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get all deliveries",
                    notes: "Get all deliveries",
                    tags: ["api", "Deliveries"],
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
                        }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.get(req, h);
                },
            },
            {
                method: "GET",
                path: "/deliveries/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get delivery by id",
                    notes: "Get delivery by id",
                    tags: ["api", "Deliveries"],
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
                    return await DeliveryController.getById(req, h);
                },
            },
            {
                method: "POST",
                path: "/deliveries",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Create a new delivery",
                    notes: "Create a new delivery",
                    tags: ["api", "Deliveries"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
                        payload: Joi.object({
                            name: Joi.string().required().messages({
                                "string.empty": `El nombre es requerido`,
                                "any.required": `El nombre es requerido`,
                            }),
                            routes: Joi.array().required().messages({
                                "array.empty": `Las rutas son requeridas`,
                                "any.required": `Las rutas son requeridas`,
                            }),
                            user: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `El usuario es requerido`,
                                "any.required": `El usuario es requerido`,
                            }),
                            date: Joi.date().required().messages({
                                "date.empty": `La fecha es requerida`,
                                "any.required": `La fecha es requerida`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.create(req, h);
                },
            },
            {
                method: "PUT",
                path: "/deliveries/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Update a delivery",
                    notes: "Update a deliveries",
                    tags: ["api", "Deliveries"],
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
                            chain: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `La cadena es requerida`,
                                "any.required": `La cadena es requerida`,
                            }),
                            products: Joi.array().items(Joi.object({
                                id: Joi.string().required().custom((value, helpers) => {
                                    if (value.length == 24 || value.length == 12) {
                                        return value;
                                    } else {
                                        return helpers.message("El id del producto no es válido");
                                    }
                                }).messages({
                                    "string.empty": `El id del producto es requerido`,
                                    "any.required": `El id del producto es requerido`,
                                }),
                                name: Joi.string().required().messages({
                                    "string.empty": `El nombre del producto es requerido`,
                                    "any.required": `El nombre del producto es requerido`,
                                }),
                                quantity: Joi.number().required().messages({
                                    "number.empty": `La cantidad es requerida`,
                                    "any.required": `La cantidad es requerida`,
                                }),
                            })).required().messages({
                                "array.empty": `Los productos son requeridos`,
                                "any.required": `Los productos son requeridos`,
                            }),
                            user: Joi.string().required().custom((value, helpers) => {
                                if (value.length == 24 || value.length == 12) {
                                    return value;
                                } else {
                                    return helpers.message("El id no es válido");
                                }
                            }).messages({
                                "string.empty": `El usuario es requerido`,
                                "any.required": `El usuario es requerido`,
                            }),
                            date: Joi.date().required().messages({
                                "date.empty": `La fecha es requerida`,
                                "any.required": `La fecha es requerida`,
                            }),
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.update(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/deliveries/start/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Start pickup",
                    notes: "Start pickup",
                    tags: ["api", "Pickups"],
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
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.start(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/deliveries/end/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "End pickup",
                    notes: "End pickup",
                    tags: ["api", "Pickups"],
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
                            products: Joi.array().items(Joi.object({
                                id: Joi.string().required().custom((value, helpers) => {
                                    if (value.length == 24 || value.length == 12) {
                                        return value;
                                    } else {
                                        return helpers.message("El id del producto no es válido");
                                    }
                                }).messages({
                                    "string.empty": `El id del producto es requerido`,
                                    "any.required": `El id del producto es requerido`,
                                }),
                                name: Joi.string().required().messages({
                                    "string.empty": `El nombre del producto es requerido`,
                                    "any.required": `El nombre del producto es requerido`,
                                }),
                                annexes: Joi.object({
                                    commentary: Joi.string().optional(),
                                    photos: Joi.array().items(
                                        Joi.string().required().messages({
                                            "string.empty": `La foto es requerida`,
                                            "any.required": `La foto es requerida`,
                                        })
                                    ).optional()
                                }).optional(),
                            })).required().messages({
                                "array.empty": `Los productos son requeridos`,
                                "any.required": `Los productos son requeridos`,
                            }),
                        }).options({ abortEarly: false }),

                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.end(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/deliveries/cancel/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "End pickup",
                    notes: "End pickup",
                    tags: ["api", "Pickups"],
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
                            generalAnnexes: Joi.object({
                                commentary: Joi.string().required().messages({
                                    "string.empty": `El comentario es requerido`,
                                    "any.required": `El comentario es requerido`,
                                }),
                                photos: Joi.array().items(Joi.string().required().messages({
                                    "string.empty": `La foto es requerida`,
                                    "any.required": `La foto es requerida`,
                                })).optional(),
                            }).required().messages({
                                "object.empty": `Los anexos son requeridos`,
                                "any.required": `Los anexos son requeridos`,
                            }),
                        }).options({ abortEarly: false }),
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.cancel(req, h);
                },
            },
        ]);
    },




};