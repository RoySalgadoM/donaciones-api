'use strict';

const Joi = require("joi");
const CoreController = require('../controllers/CoreController');

module.exports = {
    name: 'core',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'POST',
                path: '/login',
                config: {
                    auth: false,
                    description: 'Login to get an access token',
                    tags: ['api', 'Core'],
                    validate: {
                        payload: Joi.object()
                            .keys({
                                email: Joi.string().required().messages({
                                    "string.empty": `El correo es requerido`,
                                    "any.required": `El correo es requerido`,
                                }),
                                password: Joi.string().required().messages({
                                    "string.empty": `La contraseña es requerida`,
                                    "any.required": `La contraseña es requerida`,
                                }),
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.login,
            },
            {
                method: 'POST',
                path: '/reqRecoverPassword',
                config: {
                    auth: false,
                    description: 'Req recover password',
                    tags: ['api', 'Core'],
                    validate: {
                        payload: Joi.object()
                            .keys({
                                email: Joi.string().required().messages({
                                    "string.empty": `El correo es requerido`,
                                    "any.required": `El correo es requerido`,
                                })
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.reqRecoverPassword,
            },
            {
                method: 'POST',
                path: '/recoverPassword',
                config: {
                    auth: false,
                    description: 'Recover password',
                    tags: ['api', 'Core'],
                    validate: {
                        payload: Joi.object()
                            .keys({
                                recoverCode: Joi.string().required().messages({
                                    "string.empty": `El código de recuperación es requerido`,
                                    "any.required": `El código de recuperación es requerido`,
                                }),
                                password: Joi.string().required().messages({
                                    "string.empty": `La contraseña es requerida`,
                                    "any.required": `La contraseña es requerida`,
                                }),
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.recoverPassword,
            },
            {
                method: 'POST',
                path: '/changePassword',
                config: {
                    auth: {
                        strategies: ["jwt"],
                    },
                    description: 'Change password',
                    tags: ['api', 'Core'],
                    validate: {
                        payload: Joi.object()
                            .keys({
                                password: Joi.string().required().messages({
                                    "string.empty": `La contraseña es requerida`,
                                    "any.required": `La contraseña es requerida`,
                                }),
                                newPassword: Joi.string().required().messages({
                                    "string.empty": `La nueva contraseña es requerida`,
                                    "any.required": `La nueva contraseña es requerida`,
                                }),
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.changePassword,
            },
            {
                method: 'GET',
                path: '/verifyToken',
                config: {
                    auth: false,
                    description: 'Verify the token',
                    tags: ['api', 'Core'],
                    validate: {
                        query: Joi.object()
                            .keys({
                                token: Joi.string().required().messages({
                                    "string.empty": `El token es requerido`,
                                    "any.required": `El token es requerido`,
                                }),
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.verifyToken,
            }
        ]);
    }
};