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
                path: "/api/deliveries",
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
                path: "/api/deliveries/pendings",
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: "Count deliveries pendings",
                    notes: "Count deliveries pendings",
                    tags: ["api", "Deliveries"],
                    validate: {
                        
                    },
                },
                handler: async (req, h) => {
                    return await DeliveryController.getPendients(req, h);
                },
            },
            {
                method: "GET",
                path: "/api/deliveries/{id}",
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
                path: "/api/deliveries",
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
                path: "/api/deliveries/{id}",
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
                    return await DeliveryController.update(req, h);
                },
            },
            {
                method: "PATCH",
                path: "/api/deliveries/start/{id}",
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
                path: "/api/deliveries/end/{id}",
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
                            routes: Joi.array().items(Joi.object({
                                _id: Joi.string().required().custom((value, helpers) => {
                                    if (value.length == 24 || value.length == 12) {
                                        return value;
                                    } else {
                                        return helpers.message("El id no es válido");
                                    }
                                }
                                ).messages({
                                    "string.empty": `El id es requerido`,
                                    "any.required": `El id es requerido`
                                }),
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
                                status: Joi.string().required().messages({
                                    "string.empty": `El status es requerido`,
                                    "any.required": `El status es requerido`,
                                }),
                                annexes: Joi.object({
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
                                dateEnd: Joi.date().required().messages({
                                    "date.empty": `La fecha es requerida`,
                                    "any.required": `La fecha es requerida`,
                                }),
                            })).required().messages({
                                "array.empty": `Las rutas son requeridas`,
                                "any.required": `Las rutas son requeridas`,
                            }),
                            dateEnd: Joi.date().required().messages({
                                "date.empty": `La fecha es requerida`,
                                "any.required": `La fecha es requerida`,
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
                path: "/api/deliveries/cancel/{id}",
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
                            dateEnd: Joi.date().required().messages({
                                "date.empty": `La fecha es requerida`,
                                "any.required": `La fecha es requerida`,
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