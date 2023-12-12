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
        path: "/api/users",
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
                "string.empty": `El nombre es requerido`,
                "any.required": `El nombre es requerido`,
              }),
              lastname: Joi.string().required().messages({
                "string.empty": `EL apellido paterno es requerido`,
                "any.required": `EL apellido paterno es requerido`,
              }),
              secondSurname: Joi.string().optional().allow(""),
              email: Joi.string().email().required().messages({
                "string.empty": `El correo es requerido`,
                "string.email": `El correo no es válido`,
                "any.required": `El correo es requerido`,
              }),
              password: Joi.string().required().messages({
                "string.empty": `La contraseña es requerida`,
                "any.required": `La contraseña es requerida`,
              }),
              role: Joi.string().required().messages({
                "string.empty": `El rol es requerido`,
                "any.required": `La rol es requerido`,
              }),
              phone: Joi.string().required().messages({
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
          return await UsersController.create(req, h);
        },
      },
      {
        method: "PUT",
        path: "/api/users/{id}",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Update an user",
          notes: "Update an user",
          tags: ["api", "Users"],
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
              lastname: Joi.string().required().messages({
                "string.empty": `EL apellido paterno es requerido`,
                "any.required": `EL apellido paterno es requerido`,
              }),
              secondSurname: Joi.string().optional().allow(""),
              role: Joi.string().required().messages({
                "string.empty": `El rol es requerido`,
                "any.required": `La rol es requerido`,
              }),
              phone: Joi.string().required().messages({
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
          return await UsersController.update(req, h);
        },
      },
      {
        method: "PATCH",
        path: "/api/users/{id}",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Update the user status",
          notes: "Update the user status",
          tags: ["api", "Users"],
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
          return await UsersController.changeStatus(req, h);
        },
      },
      {
        method: "GET",
        path: "/api/users/{id}",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Get user by id",
          notes: "Get user by id",
          tags: ["api", "Users"],
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
          return await UsersController.getById(req, h);
        },
      },
      {
        method: "GET",
        path: "/api/users",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Get all users",
          notes: "Get all users",
          tags: ["api", "Users"],
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
          return await UsersController.get(req, h);
        },
      },
      {
        method: "GET",
        path: "/api/employees",
        config: {
          auth: {
            strategies: ["jwt"],
          },
          description: "Get all employees",
          notes: "Get all employees",
          tags: ["api", "Users"],
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
          return await UsersController.getEmployees(req, h);
        },
      },
    ]);
  },


};