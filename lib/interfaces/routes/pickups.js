'use strict';

const PickupController = require('../controllers/PickupController');
const Joi = require("joi");

module.exports = {
    name: 'pickups',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: "GET",
                path: "/pickups",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get all pickups",
                    notes: "Get all pickups",
                    tags: ["api", "Pickups"],
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
                    return await PickupController.get(req, h);
                },
            },
            {
                method: "GET",
                path: "/pickups/{id}",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Get pickups by id",
                    notes: "Get pickups by id",
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
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await PickupController.getById(req, h);
                },
            },
            {
                method: "POST",
                path: "/pickups",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Create a new pickup",
                    notes: "Create a new pickup",
                    tags: ["api", "Pickups"],
                    validate: {
                        headers: Joi.object({
                            authorization: Joi.string(),
                        }).unknown(),
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
                        }).options({ abortEarly: false }),
                        failAction: async (request, h, err) => {
                            console.log(err);
                            throw err;
                        },
                    },
                },
                handler: async (req, h) => {
                    return await PickupController.create(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/pickups/start/{id}",
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
                    return await PickupController.start(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/pickups/end/{id}",
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
                                annexes: Joi.object({
                                    commentary: Joi.string().required().messages({
                                        "string.empty": `El comentario es requerido`,
                                        "any.required": `El comentario es requerido`,
                                    }),
                                    photos: Joi.array().items(Joi.string().required().messages({
                                        "string.empty": `La foto es requerida`,
                                        "any.required": `La foto es requerida`,
                                    })).required().messages({
                                        "array.empty": `Las fotos son requeridas`,
                                        "any.required": `Las fotos son requeridas`,
                                    }),
                                }).required().messages({
                                    "object.empty": `Los anexos son requeridos`,
                                    "any.required": `Los anexos son requeridos`,
                                }),
                            })).required().messages({
                                "array.empty": `Los productos son requeridos`,
                                "any.required": `Los productos son requeridos`,
                            }),
                        }).options({ abortEarly: false }),

                    },
                },
                handler: async (req, h) => {
                    return await PickupController.end(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/pickups/cancel/{id}",
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
                                })).required().messages({
                                    "array.empty": `Las fotos son requeridas`,
                                    "any.required": `Las fotos son requeridas`,
                                }),
                            }).required().messages({
                                "object.empty": `Los anexos son requeridos`,
                                "any.required": `Los anexos son requeridos`,
                            }),
                        }).options({ abortEarly: false }),
                    },
                },
                handler: async (req, h) => {
                    return await PickupController.cancel(req, h);
                },
            },
        ]);
    },




};