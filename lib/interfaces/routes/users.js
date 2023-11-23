'use strict';

const UsersController = require('../controllers/UsersController');
const Joi = require("joi");

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: "POST",
        path: "/users",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Create a new user",
          notes: "Create a new user",
          tags: ["api", "Users"],
          validate: {
            headers: Joi.object({
              authorization: Joi.string(),
            }).unknown(),
            payload: Joi.object({
              name: Joi.string().required().messages({
                "string.empty": `Name is required`,
              }),
              lastname: Joi.string().required().messages({
                "string.empty": `Lastname is required`,
              }),
              secondSurname: Joi.string().optional(),
              email: Joi.string().email().required().messages({
                "string.empty": `Email is required`,
                "string.email": `Email is not valid`,
              }),
              password: Joi.string().required().messages({
                "string.empty": `Password is required`,
              }),
              role: Joi.string().required().custom((value, helpers) => {
                if (value.length == 24 || value.length == 12) {
                  return value;
                } else {
                  return helpers.message("The role id is not valid");
                }
              }),
              phone: Joi.string().required().messages({
                "string.empty": `Phone is required`
              }),
            }).options({ abortEarly: false }),
            failAction: async (request, h, err) => {
              console.log(err);
              throw err;
            },
          },
        },
        handler: async (req, h) => {
          return await UsersController.create(req, h);
        },
      },
    ]);
  }
};