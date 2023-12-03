'use strict';

const bcrypt = require("bcrypt");

const environment = require('../../../infrastructure/config/environment');

module.exports = async ({ message }) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(message, environment.salt, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    }).catch(console.error);
}
