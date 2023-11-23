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
                                    "string.empty": `email is required`,
                                    "string.max": `email should have a maximum length of {#limit}`,
                                }),
                                password: Joi.string().required().messages({
                                    "string.empty": `password is required`,
                                    "string.max": `password should have a maximum length of {#limit}`,
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
                                    "string.empty": `email is required`,
                                    "string.max": `email should have a maximum length of {#limit}`,
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
                                    "string.empty": `recoverCode is required`,
                                    "string.max": `recoverCode should have a maximum length of {#limit}`,
                                }),
                                password: Joi.string().required().messages({
                                    "string.empty": `password is required`,
                                    "string.max": `password should have a maximum length of {#limit}`,
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
                    auth: false,
                    description: 'Change password',
                    tags: ['api', 'Core'],
                    validate: {
                        payload: Joi.object()
                            .keys({
                                email: Joi.string().required().messages({
                                    "string.empty": `email is required`,
                                    "string.max": `email should have a maximum length of {#limit}`,
                                }),
                                password: Joi.string().required().messages({
                                    "string.empty": `password is required`,
                                    "string.max": `password should have a maximum length of {#limit}`,
                                }),
                                newPassword: Joi.string().required().messages({
                                    "string.empty": `newPassword is required`,
                                    "string.max": `newPassword should have a maximum length of {#limit}`,
                                }),
                            })
                            .unknown(false),
                    },
                },
                handler: CoreController.changePassword,
            }
        ]);
    }
};