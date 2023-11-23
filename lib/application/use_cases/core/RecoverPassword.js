'use strict';
const Hash = require('../bcrypt/Hash');

module.exports = async ({ recoverCode, password }, { userRepository }) => {

    let hashedPassword = await Hash({ message: password });

    return await userRepository.getByCodeAndUpdate(recoverCode, hashedPassword);
};
