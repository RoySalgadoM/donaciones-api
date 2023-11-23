'use strict';

const Hash = require('../bcrypt/Hash');

module.exports = async ({ name, lastname, secondSurname, email, password, role, phone }, { userRepository }) => {
    let hashedPassword = await Hash({ message: password });
    return await userRepository.create(name, lastname, secondSurname, email, hashedPassword, role, phone);
};
